const express = require('express');
const router = express.Router();
const { db } = require('./db');

// Helper to cleanup expired slot locks
function cleanupLocks() {
  const now = Math.floor(Date.now() / 1000);
  db.prepare(`
    UPDATE slots SET status = 'available', locked_until = 0
    WHERE status = 'locked' AND locked_until > 0 AND locked_until < ?
  `).run(now);
}

// -------------------------------------------------------------
// AUTHENTICATION (Database-backed credential validation)
// -------------------------------------------------------------

router.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)').get(email.trim());
    if (!user) {
      return res.status(401).json({ success: false, error: 'Account not found with this email.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, error: 'Incorrect password for this account.' });
    }

    res.json({
      success: true,
      message: 'Authentication successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone || '',
        mrn: user.mrn || `MRN-${user.id.toString().padStart(5, '0')}`
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/auth/signup', (req, res) => {
  try {
    const { email, password, name, role = 'patient', phone = '' } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = db.prepare('SELECT id FROM users WHERE LOWER(email) = ?').get(cleanEmail);
    if (existing) {
      return res.status(400).json({ success: false, error: 'An account with this email already exists.' });
    }

    const mrn = role === 'patient' ? `MRN-${Math.floor(10000 + Math.random() * 90000)}` : null;
    const now = new Date().toISOString();

    const insertResult = db.prepare(`
      INSERT INTO users (email, password, name, role, phone, mrn, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(cleanEmail, password, name.trim(), role, phone, mrn, now);

    const newUserId = insertResult.lastInsertRowid;

    // If patient, also insert into patients table
    if (role === 'patient') {
      db.prepare(`
        INSERT INTO patients (mrn, name, email, phone, dob, insurance_provider, insurance_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        mrn,
        name.trim(),
        cleanEmail,
        phone || '+1 (555) 000-0000',
        '1995-01-01',
        'Standard Healthcare PPO',
        `HLTH-${Math.floor(100000 + Math.random() * 900000)}`
      );
    }

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      user: {
        id: newUserId,
        email: cleanEmail,
        name: name.trim(),
        role: role,
        phone: phone,
        mrn: mrn
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// DOCTORS
// -------------------------------------------------------------

router.get('/doctors', (req, res) => {
  try {
    const { specialty, query, minRating, telehealth, sort, aiMatch } = req.query;
    let sql = 'SELECT * FROM doctors WHERE 1=1';
    const params = [];

    if (specialty && specialty.toLowerCase() !== 'all') {
      sql += ' AND LOWER(specialty) = LOWER(?)';
      params.push(specialty);
    }

    if (query && query.trim()) {
      const q = `%${query.trim().toLowerCase()}%`;
      sql += ` AND (
        LOWER(name) LIKE ? OR
        LOWER(specialty) LIKE ? OR
        LOWER(clinic) LIKE ? OR
        LOWER(procedures) LIKE ? OR
        LOWER(bio) LIKE ?
      )`;
      params.push(q, q, q, q, q);
    }

    if (minRating) {
      sql += ' AND rating >= ?';
      params.push(parseFloat(minRating));
    }

    if (telehealth === 'true' || telehealth === '1') {
      sql += ' AND telehealth_available = 1';
    }

    // Sort
    if (sort === 'rating') {
      sql += ' ORDER BY rating DESC, review_count DESC';
    } else if (sort === 'match' || aiMatch === 'true') {
      sql += ' ORDER BY match_percentage DESC, rating DESC';
    } else {
      sql += ' ORDER BY id ASC';
    }

    const doctors = db.prepare(sql).all(...params);
    res.json({ success: true, count: doctors.length, doctors });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/doctors/:id', (req, res) => {
  try {
    cleanupLocks();
    const doc = db.prepare('SELECT * FROM doctors WHERE id = ?').get(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }

    // Get earliest 8 open slots
    const todayStr = new Date().toISOString().split('T')[0];
    const availableSlots = db.prepare(`
      SELECT * FROM slots
      WHERE doctor_id = ? AND slot_date >= ? AND status = 'available'
      ORDER BY slot_date ASC, id ASC LIMIT 8
    `).all(req.params.id, todayStr);

    res.json({ success: true, doctor: doc, availableSlots });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// SLOTS & DOUBLE BOOKING SHIELD
// -------------------------------------------------------------

router.get('/slots', (req, res) => {
  try {
    cleanupLocks();
    const { doctorId, date } = req.query;
    if (!doctorId) {
      return res.status(400).json({ success: false, error: 'doctorId is required' });
    }
    const targetDate = date || new Date().toISOString().split('T')[0];

    let slots = db.prepare(`
      SELECT * FROM slots
      WHERE doctor_id = ? AND slot_date = ?
      ORDER BY id ASC
    `).all(doctorId, targetDate);

    // Auto-populate slots on-demand if not yet generated for this date
    if (slots.length === 0) {
      const morningTimes = [
        { time: '09:00 AM', type: 'regular' },
        { time: '09:45 AM', type: 'ai_pick' },
        { time: '10:30 AM', type: 'regular' },
        { time: '11:15 AM', type: 'regular' }
      ];
      const afternoonTimes = [
        { time: '02:00 PM', type: 'regular' },
        { time: '02:45 PM', type: 'fast_track' },
        { time: '03:30 PM', type: 'regular' },
        { time: '04:15 PM', type: 'regular' }
      ];
      const insertSlot = db.prepare(`
        INSERT INTO slots (doctor_id, slot_date, slot_time, session_period, type, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      morningTimes.forEach(s => insertSlot.run(doctorId, targetDate, s.time, 'morning', s.type, 'available'));
      afternoonTimes.forEach(s => insertSlot.run(doctorId, targetDate, s.time, 'afternoon', s.type, 'available'));

      slots = db.prepare(`
        SELECT * FROM slots
        WHERE doctor_id = ? AND slot_date = ?
        ORDER BY id ASC
      `).all(doctorId, targetDate);
    }

    const morning = slots.filter(s => s.session_period === 'morning');
    const afternoon = slots.filter(s => s.session_period === 'afternoon');

    res.json({
      success: true,
      doctorId: Number(doctorId),
      date: targetDate,
      total: slots.length,
      available: slots.filter(s => s.status === 'available').length,
      morning,
      afternoon
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Double-booking shield lock: holds a slot for 10 minutes (600s)
router.post('/slots/lock', (req, res) => {
  try {
    cleanupLocks();
    const { slotId, durationSeconds = 600 } = req.body;
    if (!slotId) {
      return res.status(400).json({ success: false, error: 'slotId is required' });
    }

    const slot = db.prepare('SELECT * FROM slots WHERE id = ?').get(slotId);
    if (!slot) {
      return res.status(404).json({ success: false, error: 'Slot not found' });
    }

    if (slot.status === 'booked') {
      return res.status(409).json({ success: false, error: 'Slot has already been booked by another patient.' });
    }

    const lockedUntil = Math.floor(Date.now() / 1000) + durationSeconds;
    db.prepare('UPDATE slots SET status = ?, locked_until = ? WHERE id = ?').run('locked', lockedUntil, slotId);

    res.json({
      success: true,
      message: 'Slot successfully reserved under Double-Booking Shield',
      slotId,
      lockedUntil,
      durationSeconds
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// APPOINTMENTS
// -------------------------------------------------------------

router.get('/appointments', (req, res) => {
  try {
    const patientId = req.query.patientId || 1;
    const appointments = db.prepare(`
      SELECT
        a.*,
        d.name as doctor_name,
        d.title as doctor_title,
        d.specialty as doctor_specialty,
        d.clinic as doctor_clinic,
        d.address as doctor_address,
        d.avatar_url as doctor_avatar
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.patient_id = ?
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `).all(patientId);

    const upcoming = appointments.filter(a => a.status === 'confirmed' || a.status === 'rescheduled');
    const completed = appointments.filter(a => a.status === 'checked_in');
    const cancelled = appointments.filter(a => a.status === 'cancelled');

    res.json({
      success: true,
      all: appointments,
      upcoming,
      completed,
      cancelled,
      counts: {
        total: appointments.length,
        upcoming: upcoming.length,
        completed: completed.length,
        cancelled: cancelled.length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/appointments/:id', (req, res) => {
  try {
    const appt = db.prepare(`
      SELECT
        a.*,
        d.name as doctor_name,
        d.title as doctor_title,
        d.specialty as doctor_specialty,
        d.clinic as doctor_clinic,
        d.address as doctor_address,
        d.avatar_url as doctor_avatar,
        p.name as patient_name,
        p.mrn as patient_mrn,
        p.email as patient_email,
        p.phone as patient_phone,
        p.insurance_provider
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      JOIN patients p ON a.patient_id = p.id
      WHERE a.id = ? OR a.booking_code = ?
    `).get(req.params.id, req.params.id);

    if (!appt) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    res.json({ success: true, appointment: appt });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/appointments', (req, res) => {
  try {
    const {
      patientId = 1,
      doctorId,
      slotId,
      appointmentDate,
      appointmentTime,
      consultMode = 'in_person',
      symptoms = '',
      notes = '',
      specialNeeds = '',
      fee = 120.00
    } = req.body;

    if (!doctorId) {
      return res.status(400).json({ success: false, error: 'Doctor ID is required' });
    }
    if (!appointmentDate || !appointmentTime) {
      return res.status(400).json({ success: false, error: 'Appointment date and time are required' });
    }

    // Check if slot exists and is already booked
    if (slotId) {
      const slot = db.prepare('SELECT * FROM slots WHERE id = ?').get(slotId);
      if (slot && slot.status === 'booked') {
        return res.status(409).json({ success: false, error: 'This time slot is already booked. Please pick another slot.' });
      }
      // Update slot to booked
      db.prepare("UPDATE slots SET status = 'booked', locked_until = 0 WHERE id = ?").run(slotId);
    }

    const bookingCode = 'MED-' + Math.floor(1000 + Math.random() * 9000);
    const queueNum = 'Q-' + Math.floor(1 + Math.random() * 30).toString().padStart(2, '0');
    const createdAt = new Date().toISOString();

    const insertResult = db.prepare(`
      INSERT INTO appointments (
        booking_code, patient_id, doctor_id, slot_id, appointment_date, appointment_time,
        consult_mode, symptoms, notes, special_needs, fee, status, queue_number, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      bookingCode,
      patientId,
      doctorId,
      slotId || null,
      appointmentDate,
      appointmentTime,
      consultMode,
      symptoms,
      notes,
      specialNeeds,
      fee,
      'confirmed',
      queueNum,
      createdAt
    );

    const createdAppt = db.prepare(`
      SELECT
        a.*,
        d.name as doctor_name,
        d.title as doctor_title,
        d.specialty as doctor_specialty,
        d.clinic as doctor_clinic,
        d.address as doctor_address,
        d.avatar_url as doctor_avatar
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.id = ?
    `).get(insertResult.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: 'Appointment successfully confirmed!',
      appointment: createdAppt
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/appointments/:id/reschedule', (req, res) => {
  try {
    const newDate = req.body.newDate || req.body.appointmentDate;
    const newTime = req.body.newTime || req.body.appointmentTime;
    const newSlotId = req.body.newSlotId || req.body.slotId;
    if (!newDate || !newTime) {
      return res.status(400).json({ success: false, error: 'New date and time are required' });
    }

    const appt = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
    if (!appt) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    // Free up old slot if existed
    if (appt.slot_id) {
      db.prepare("UPDATE slots SET status = 'available' WHERE id = ?").run(appt.slot_id);
    }

    // Book new slot if provided
    if (newSlotId) {
      db.prepare("UPDATE slots SET status = 'booked', locked_until = 0 WHERE id = ?").run(newSlotId);
    }

    db.prepare(`
      UPDATE appointments
      SET appointment_date = ?, appointment_time = ?, slot_id = ?, status = 'rescheduled'
      WHERE id = ?
    `).run(newDate, newTime, newSlotId || null, req.params.id);

    const updated = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);

    res.json({
      success: true,
      message: 'Appointment rescheduled successfully!',
      appointment: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/appointments/:id/cancel', (req, res) => {
  try {
    const { reason = 'Patient schedule conflict' } = req.body;
    const appt = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
    if (!appt) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    // Free up the slot
    if (appt.slot_id) {
      db.prepare("UPDATE slots SET status = 'available' WHERE id = ?").run(appt.slot_id);
    }

    db.prepare(`
      UPDATE appointments
      SET status = 'cancelled', cancel_reason = ?
      WHERE id = ?
    `).run(reason, req.params.id);

    res.json({
      success: true,
      message: 'Appointment cancelled. Your time slot was released back to the clinic queue.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/appointments/:id/checkin', (req, res) => {
  try {
    const appt = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
    if (!appt) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    const now = new Date().toISOString();
    const queueNumber = appt.queue_number || ('Q-' + Math.floor(1 + Math.random() * 20).toString().padStart(2, '0'));

    db.prepare(`
      UPDATE appointments
      SET status = 'checked_in', check_in_time = ?, queue_number = ?
      WHERE id = ?
    `).run(now, queueNumber, req.params.id);

    res.json({
      success: true,
      message: 'Self check-in complete! Proceed to Room 402 waiting area.',
      queueNumber,
      checkInTime: now
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// PRESCRIPTIONS & CARE RECORDS
// -------------------------------------------------------------

router.get('/prescriptions', (req, res) => {
  try {
    const patientId = req.query.patientId || 1;
    const rxs = db.prepare(`
      SELECT p.*, d.name as doctor_name, d.specialty as doctor_specialty
      FROM prescriptions p
      JOIN doctors d ON p.doctor_id = d.id
      WHERE p.patient_id = ?
      ORDER BY p.id ASC
    `).all(patientId);

    res.json({ success: true, prescriptions: rxs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/prescriptions/:id/refill', (req, res) => {
  try {
    const { pharmacy = 'Walgreens Pharmacy #1043, Palo Alto' } = req.body;
    const rx = db.prepare('SELECT * FROM prescriptions WHERE id = ?').get(req.params.id);
    if (!rx) {
      return res.status(404).json({ success: false, error: 'Prescription not found' });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    db.prepare(`
      UPDATE prescriptions
      SET status = 'refill_requested', refill_order_date = ?, pharmacy = ?
      WHERE id = ?
    `).run(todayStr, pharmacy, req.params.id);

    res.json({
      success: true,
      message: `Refill request submitted for ${rx.medication_name}. Sent to ${pharmacy}. Estimated ready time: 3 hours.`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// SMART WAITLIST
// -------------------------------------------------------------

// GET /waitlist — Fetch current waitlist entries
router.get('/waitlist', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT id, patient_name, contact, specialty_requested, doctor_id, created_at
      FROM waitlist
      ORDER BY created_at DESC
      LIMIT 50
    `).all();

    res.json({
      success: true,
      count: rows.length,
      waitlist: rows
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/waitlist', (req, res) => {
  try {
    const { patientName = 'Alex Morgan', contact, specialtyRequested = 'General Cardiology', doctorId = null } = req.body;
    if (!contact) {
      return res.status(400).json({ success: false, error: 'Phone number or email is required' });
    }

    db.prepare(`
      INSERT INTO waitlist (patient_name, contact, specialty_requested, doctor_id, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(patientName, contact, specialtyRequested, doctorId, new Date().toISOString());

    res.json({
      success: true,
      message: `Priority waitlist armed for ${contact}. MediBot will ping you the second a matching slot cancels!`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// MEDIBOT AI CHAT ASSISTANT
// -------------------------------------------------------------

router.post('/medibot/chat', (req, res) => {
  try {
    const { message = '' } = req.body;
    const lower = message.toLowerCase().trim();

    let reply = '';
    let actionType = 'info';
    let suggestedDoctorId = null;
    let suggestedSpecialty = null;

    if (!lower) {
      return res.json({
        reply: "Hi Alex! I'm MediBot AI, your clinical concierge. You can ask me about symptoms, doctor recommendations, fasting rules, or finding an urgent consultation slot.",
        actionType: 'info'
      });
    }

    if (lower.includes('chest') || lower.includes('flutter') || lower.includes('palpitation') || lower.includes('heart') || lower.includes('blood pressure')) {
      reply = "For heart flutters, arrhythmias, or blood pressure concerns, I recommend consulting **Dr. Sarah Jenkins** (Senior Cardiologist at Stanford) or **Dr. Marcus Vance** (Metro Heart Institute). Would you like me to reserve Dr. Jenkins's earliest slot today at 2:15 PM?";
      actionType = 'doctor_recommendation';
      suggestedDoctorId = 1;
      suggestedSpecialty = 'Cardiology';
    } else if (lower.includes('skin') || lower.includes('rash') || lower.includes('mole') || lower.includes('acne') || lower.includes('derma')) {
      reply = "For dermatological assessments, early mole screening, or skin rashes, **Dr. Sarah Chen** at St. Jude Pavilion currently has an instant opening today at 10:30 AM!";
      actionType = 'doctor_recommendation';
      suggestedDoctorId = 2;
      suggestedSpecialty = 'Dermatology';
    } else if (lower.includes('headache') || lower.includes('migraine') || lower.includes('dizzy') || lower.includes('neuro') || lower.includes('brain')) {
      reply = "**Dr. Elena Rostova** at Cerebral Center / UCSF is our leading specialist in neurovascular care and chronic migraine pathways. She has open slots tomorrow at 9:00 AM.";
      actionType = 'doctor_recommendation';
      suggestedDoctorId = 4;
      suggestedSpecialty = 'Neurology';
    } else if (lower.includes('joint') || lower.includes('knee') || lower.includes('bone') || lower.includes('back pain') || lower.includes('ortho')) {
      reply = "For joint mobility, sports injuries, or orthopedic reviews, **Dr. Marcus Chen** at Stanford Health has an opening tomorrow at 11:15 AM.";
      actionType = 'doctor_recommendation';
      suggestedDoctorId = 5;
      suggestedSpecialty = 'Orthopedics';
    } else if (lower.includes('child') || lower.includes('kid') || lower.includes('baby') || lower.includes('pediatric') || lower.includes('infant')) {
      reply = "**Dr. Julian Ramos** at Sunrise Kids Clinic is available today at 5:15 PM for gentle, playful pediatric consultations.";
      actionType = 'doctor_recommendation';
      suggestedDoctorId = 6;
      suggestedSpecialty = 'Pediatrics';
    } else if (lower.includes('fasting') || lower.includes('eat') || lower.includes('water') || lower.includes('bloodwork') || lower.includes('food')) {
      reply = "✦ **Pre-Consultation Fasting Rule**: For lipid and metabolic panels, please fast from all food and sugary liquids for **6 hours prior** to your appointment. Clean water is highly encouraged to ensure good vein hydration.";
      actionType = 'prep_guidance';
    } else if (lower.includes('carry') || lower.includes('document') || lower.includes('bring') || lower.includes('records')) {
      reply = "✦ **What to bring tomorrow**:\n1. Government photo ID\n2. Blue Cross Blue Shield insurance card (ID: BCBS-889104-Z)\n3. Recent ECG printouts or previous cardiology discharge files\n4. Your MediSlot Check-in Code: **MED-8491**";
      actionType = 'prep_guidance';
    } else if (lower.includes('urgent') || lower.includes('scan') || lower.includes('cancellation') || lower.includes('emergency')) {
      reply = "Several top specialists currently have open appointment slots today and tomorrow, including **Dr. Sarah Jenkins** (Cardiology) and **Dr. Sarah Chen** (Dermatology). You can view all real-time openings directly in our clinician directory.";
      actionType = 'slot_scan';
    } else if (lower.includes('valet') || lower.includes('parking') || lower.includes('address') || lower.includes('directions')) {
      reply = "Stanford Health Plaza is located at **300 Pasteur Dr, Palo Alto, Suite 402**. Complimentary patient valet parking is available at the East Pavilion entrance with your MediSlot booking confirmation.";
      actionType = 'directions';
    } else {
      reply = `I processed your inquiry: "${message}". Based on clinical triage protocols, I can match you with any of our 7 on-duty faculty specialists, assist with pre-visit prep, or expedite your slot in the priority queue. How can I best help you right now?`;
      actionType = 'general';
    }

    res.json({
      success: true,
      reply,
      actionType,
      suggestedDoctorId,
      suggestedSpecialty,
      disclaimer: "Medical Disclaimer: MediBot provides general informational guidance and appointment routing only. It does not provide medical diagnoses, treatment plans, or prescriptions. For medical emergencies, call 911 immediately.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// DASHBOARD & ADMIN TELEMETRY
// -------------------------------------------------------------

router.get('/stats/dashboard', (req, res) => {
  try {
    const patientId = 1;
    const appts = db.prepare('SELECT * FROM appointments WHERE patient_id = ?').all(patientId);
    const upcoming = appts.filter(a => a.status === 'confirmed' || a.status === 'rescheduled');
    const completed = appts.filter(a => a.status === 'checked_in');
    const cancelled = appts.filter(a => a.status === 'cancelled');

    // Next upcoming appointment
    const nextAppt = db.prepare(`
      SELECT
        a.*,
        d.name as doctor_name,
        d.title as doctor_title,
        d.specialty as doctor_specialty,
        d.clinic as doctor_clinic,
        d.address as doctor_address,
        d.avatar_url as doctor_avatar
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.patient_id = ? AND (a.status = 'confirmed' OR a.status = 'rescheduled')
      ORDER BY a.appointment_date ASC, a.appointment_time ASC
      LIMIT 1
    `).get(patientId);

    // Recommended doctors (top 3)
    const recommended = db.prepare(`
      SELECT * FROM doctors
      ORDER BY match_percentage DESC
      LIMIT 3
    `).all();

    res.json({
      success: true,
      stats: {
        total: appts.length,
        upcoming: upcoming.length,
        completed: completed.length,
        cancelled: cancelled.length
      },
      nextAppointment: nextAppt || null,
      recommendedDoctors: recommended
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update appointment status (for doctor and admin management)
router.post('/appointments/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['confirmed', 'checked_in', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: `Invalid status: ${status}. Must be one of ${validStatuses.join(', ')}` });
    }

    const appt = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
    if (!appt) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    // If cancelling, free up the slot
    if (status === 'cancelled' && appt.slot_id) {
      db.prepare("UPDATE slots SET status = 'available' WHERE id = ?").run(appt.slot_id);
    }

    db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, req.params.id);
    const updated = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);

    res.json({
      success: true,
      message: `Appointment status updated to ${status}`,
      appointment: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DOCTOR CONSOLE API
router.get('/doctor-console/schedule', (req, res) => {
  try {
    cleanupLocks();
    const doctorId = Number(req.query.doctorId) || 1; // Default: Dr. Sarah Jenkins
    const doctor = db.prepare('SELECT * FROM doctors WHERE id = ?').get(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const targetDate = req.query.date || todayStr;

    // Fetch all appointments for this doctor with patient details
    const allDoctorAppts = db.prepare(`
      SELECT a.*, p.name as patient_name, p.mrn as patient_mrn, p.phone as patient_phone, p.email as patient_email
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      WHERE a.doctor_id = ?
      ORDER BY a.appointment_date ASC, a.appointment_time ASC
    `).all(doctorId);

    // Filter today's appointments
    const todayAppointments = allDoctorAppts.filter(a => a.appointment_date === targetDate);

    // Fetch today's slots for this doctor
    const slots = db.prepare(`
      SELECT * FROM slots
      WHERE doctor_id = ? AND slot_date = ?
      ORDER BY id ASC
    `).all(doctorId, targetDate);

    const counts = {
      total: allDoctorAppts.length,
      todayTotal: todayAppointments.length,
      confirmed: allDoctorAppts.filter(a => a.status === 'confirmed').length,
      checked_in: allDoctorAppts.filter(a => a.status === 'checked_in').length,
      completed: allDoctorAppts.filter(a => a.status === 'completed').length,
      cancelled: allDoctorAppts.filter(a => a.status === 'cancelled').length
    };

    res.json({
      success: true,
      doctor,
      todayDate: targetDate,
      counts,
      todayAppointments,
      allAppointments: allDoctorAppts,
      slots
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/doctor-console/slots', (req, res) => {
  try {
    const { slotId, status } = req.body;
    if (!slotId || !status) {
      return res.status(400).json({ success: false, error: 'slotId and status are required' });
    }
    db.prepare('UPDATE slots SET status = ? WHERE id = ?').run(status, slotId);
    res.json({ success: true, message: `Slot status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADMIN HUB API
router.get('/admin/metrics', (req, res) => {
  try {
    const totalDoctors = db.prepare('SELECT count(*) as c FROM doctors').get().c;
    const totalPatients = db.prepare('SELECT count(*) as c FROM patients').get().c;
    const totalAppts = db.prepare('SELECT count(*) as c FROM appointments').get().c;
    const confirmedAppts = db.prepare("SELECT count(*) as c FROM appointments WHERE status = 'confirmed'").get().c;
    const completedAppts = db.prepare("SELECT count(*) as c FROM appointments WHERE status = 'completed' OR status = 'checked_in'").get().c;
    const cancelledAppts = db.prepare("SELECT count(*) as c FROM appointments WHERE status = 'cancelled'").get().c;
    const waitlistCount = db.prepare('SELECT count(*) as c FROM waitlist').get().c;
    const totalSlots = db.prepare('SELECT count(*) as c FROM slots').get().c;
    const bookedSlots = db.prepare("SELECT count(*) as c FROM slots WHERE status = 'booked'").get().c;

    const utilization = totalSlots > 0 ? Math.round((bookedSlots / totalSlots) * 100) : 0;

    res.json({
      success: true,
      metrics: {
        totalClinicians: totalDoctors,
        totalPatients,
        totalBookings: totalAppts,
        confirmedBookings: confirmedAppts,
        completedBookings: completedAppts,
        cancelledBookings: cancelledAppts,
        activeWaitlist: waitlistCount,
        capacityUtilization: `${utilization}%`
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Get all appointments across all doctors
router.get('/admin/appointments', (req, res) => {
  try {
    const appts = db.prepare(`
      SELECT 
        a.*,
        d.name as doctor_name,
        d.specialty as doctor_specialty,
        d.clinic as doctor_clinic,
        p.name as patient_name,
        p.mrn as patient_mrn,
        p.email as patient_email,
        p.phone as patient_phone
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      JOIN patients p ON a.patient_id = p.id
      ORDER BY a.appointment_date DESC, a.appointment_time ASC
    `).all();

    res.json({ success: true, count: appts.length, appointments: appts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Get all patients
router.get('/admin/patients', (req, res) => {
  try {
    const patients = db.prepare(`
      SELECT 
        p.*,
        (SELECT count(*) FROM appointments WHERE patient_id = p.id) as appointment_count
      FROM patients p
      ORDER BY p.id ASC
    `).all();

    res.json({ success: true, count: patients.length, patients });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin: Get all doctors with appointment counts
router.get('/admin/doctors', (req, res) => {
  try {
    const doctors = db.prepare(`
      SELECT 
        d.*,
        (SELECT count(*) FROM appointments WHERE doctor_id = d.id) as appointment_count
      FROM doctors d
      ORDER BY d.id ASC
    `).all();

    res.json({ success: true, count: doctors.length, doctors });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
