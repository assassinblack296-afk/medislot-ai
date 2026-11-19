const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const dataDir = isVercel ? path.join('/tmp', 'medislot-data') : path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'medislot.db');
const db = new DatabaseSync(dbPath);

// Enable WAL mode & foreign keys
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA journal_mode = WAL;');

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      specialty TEXT NOT NULL,
      clinic TEXT NOT NULL,
      address TEXT NOT NULL,
      experience_yrs INTEGER NOT NULL,
      rating REAL NOT NULL,
      review_count INTEGER NOT NULL,
      fee REAL NOT NULL,
      avatar_url TEXT NOT NULL,
      languages TEXT NOT NULL,
      procedures TEXT NOT NULL,
      bio TEXT NOT NULL,
      match_percentage INTEGER DEFAULT 95,
      earliest_slot TEXT DEFAULT 'Today, 2:15 PM',
      telehealth_available INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doctor_id INTEGER NOT NULL,
      slot_date TEXT NOT NULL,
      slot_time TEXT NOT NULL,
      session_period TEXT NOT NULL, -- 'morning' or 'afternoon'
      type TEXT NOT NULL DEFAULT 'regular', -- 'regular', 'ai_pick', 'fast_track'
      status TEXT NOT NULL DEFAULT 'available', -- 'available', 'locked', 'booked'
      locked_until INTEGER DEFAULT 0,
      FOREIGN KEY(doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mrn TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      dob TEXT NOT NULL,
      insurance_provider TEXT NOT NULL,
      insurance_id TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_code TEXT UNIQUE NOT NULL,
      patient_id INTEGER NOT NULL,
      doctor_id INTEGER NOT NULL,
      slot_id INTEGER,
      appointment_date TEXT NOT NULL,
      appointment_time TEXT NOT NULL,
      consult_mode TEXT NOT NULL DEFAULT 'in_person', -- 'in_person' or 'telehealth'
      symptoms TEXT,
      notes TEXT,
      special_needs TEXT,
      fee REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed', -- 'confirmed', 'checked_in', 'rescheduled', 'cancelled'
      queue_number TEXT,
      check_in_time TEXT,
      cancel_reason TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY(patient_id) REFERENCES patients(id) ON DELETE CASCADE,
      FOREIGN KEY(doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS prescriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER NOT NULL,
      doctor_id INTEGER NOT NULL,
      medication_name TEXT NOT NULL,
      dosage TEXT NOT NULL,
      instructions TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active', -- 'active', 'refill_requested', 'filled'
      last_filled_date TEXT NOT NULL,
      refill_order_date TEXT,
      pharmacy TEXT,
      FOREIGN KEY(patient_id) REFERENCES patients(id),
      FOREIGN KEY(doctor_id) REFERENCES doctors(id)
    );

    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_name TEXT NOT NULL,
      contact TEXT NOT NULL,
      specialty_requested TEXT NOT NULL,
      doctor_id INTEGER,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'patient',
      phone TEXT,
      mrn TEXT,
      created_at TEXT NOT NULL
    );
  `);

  // Seed default users if not exists
  const existingUsers = db.prepare('SELECT count(*) as count FROM users').get();
  if (existingUsers.count === 0) {
    const insertUser = db.prepare(`
      INSERT INTO users (email, password, name, role, phone, mrn, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const now = new Date().toISOString();
    insertUser.run('alex.morgan@healthmail.com', 'Password123!', 'Alex Morgan', 'patient', '+1 (555) 019-2834', 'MRN-90214', now);
    insertUser.run('sarah.jenkins@stanfordhealth.org', 'DoctorSecure2025!', 'Dr. Sarah Jenkins, MD', 'doctor', '+1 (650) 723-4000', null, now);
    insertUser.run('admin@medislot.ai', 'AdminMaster2025!', 'System Administrator', 'admin', '+1 (800) 555-SLOT', null, now);
  }
  const existingPatient = db.prepare('SELECT count(*) as count FROM patients').get();
  if (existingPatient.count === 0) {
    db.prepare(`
      INSERT INTO patients (mrn, name, email, phone, dob, insurance_provider, insurance_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      'MRN-90214',
      'Alex Morgan',
      'alex.morgan@healthmail.com',
      '+1 (555) 019-2834',
      '1992-05-14',
      'Blue Cross Blue Shield Gold PPO',
      'BCBS-889104-Z'
    );
  }

  // Seed doctors if table is empty
  const doctorCount = db.prepare('SELECT count(*) as count FROM doctors').get();
  if (doctorCount.count === 0) {
    const doctors = [
      {
        name: 'Dr. Sarah Jenkins',
        title: 'MD, FACC',
        specialty: 'Cardiology',
        clinic: 'Stanford Medical Center',
        address: 'Stanford Health Plaza, Suite 402, 300 Pasteur Dr, Palo Alto, CA',
        experience_yrs: 12,
        rating: 4.98,
        review_count: 340,
        fee: 120.00,
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS75Y3hTNWY5IwCstLJLUr6QZZlz6X102tQsUOIkf4-WdIakpQ4f1HaoJu85lNz5ZU6AXWOe2ROpbOOdZAoZsxU-ip90PZLOOjodjQv-wvKqcpMtLq7zUxyTmk9muJiHBM4DonV6gebg0bHowkgng0v9NoJ1r8IxyEwLy0DaiEtvjktdgdUtnTN1T96iv3k_fnD3V9MITq7OpUd_BPf0QHgGv51gZBMrN51AQu6bQ',
        languages: 'English, Spanish',
        procedures: 'Echo & Holter, ECG interpretation, Preventative Cardiology, Lipid Management',
        bio: 'Senior Clinical Faculty at Stanford Medicine specializing in arrhythmias, hypertension, and preventive cardiovascular wellness. Recognized for patient-centric communication and zero-wait precision care.',
        match_percentage: 98,
        earliest_slot: 'Today, 2:15 PM',
        telehealth_available: 1
      },
      {
        name: 'Dr. Sarah Chen',
        title: 'MD, FAAD',
        specialty: 'Dermatology',
        clinic: 'St. Jude Pavilion',
        address: 'St. Jude Pavilion, Building B, 450 Health Way, San Jose, CA',
        experience_yrs: 11,
        rating: 4.98,
        review_count: 340,
        fee: 130.00,
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO6yE8jhy_PRl2uPV90uMITJo2VWtg0mjqhns9Wj_kJ0qNX9Kw_YQ88YBd3iJV0FSOuAdt6ZtfdBtMZrm1I1MYSULg6pUiNq1O8T9Ek3nOqIIY80xPQMEm5KQSDU761AaZwVcosqPGyPuRcVRJOv3JUP6dreO4f9rrrcC0C2vBytVATyAQC1vz5ZPJByxR2S3ytPVNVLPZDk2_6AFvQCdgmJ4q-OE4t0MPSiA247c',
        languages: 'English, Mandarin',
        procedures: 'Dermoscopy, Mole Mapping, Pediatric Dermatology, Biopsies',
        bio: 'Chief of Clinical Dermatology at St. Jude Pavilion with extensive research in early melanoma detection and non-invasive laser therapeutics.',
        match_percentage: 96,
        earliest_slot: 'Today, 10:30 AM',
        telehealth_available: 1
      },
      {
        name: 'Dr. Marcus Vance',
        title: 'MD',
        specialty: 'Cardiology',
        clinic: 'Metro Heart Institute',
        address: 'Metro Heart Tower, 1100 Van Ness Ave, San Francisco, CA',
        experience_yrs: 14,
        rating: 4.92,
        review_count: 290,
        fee: 145.00,
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDryLmh0f8mvFJusuOvJs7ujONvPBJOnucl9-sdd1YWaJfwvpJQdnAbx5bIgtvPkPQtg2_eDDi8QwDP0yZg4jqDpro4GBsZVF48eoh1vJFanuLlcwqTfoLxQ84RndejtWmgqW9C3xYquzFB-bt60oqX2dAlaHlr-_LJ2yLh2-bEqzsOtLWUdrIelWuyhpjKzwIN1rh_UKxT07JLcLCHI1eyPw0NeM5eW5M86KfmnWQ',
        languages: 'English',
        procedures: 'Interventional Cardiology, Stress Testing, Angiography Review',
        bio: 'Leader in advanced cardiovascular intervention with 14 years clinical leadership and thousands of successful rhythm therapies.',
        match_percentage: 92,
        earliest_slot: 'Today, 3:30 PM',
        telehealth_available: 1
      },
      {
        name: 'Dr. Elena Rostova',
        title: 'MD, PhD',
        specialty: 'Neurology',
        clinic: 'Cerebral Center & UCSF',
        address: 'UCSF Medical Sciences Building, 505 Parnassus Ave, San Francisco, CA',
        experience_yrs: 12,
        rating: 4.90,
        review_count: 142,
        fee: 120.00,
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqX3V6WiTtRAeM0gyvaaGey1P-vxTEaec8f5UJ5zwgl9x5dxmLUwFez68pWV3q7O5d9hJQHNXNj1-xkYTmP9d9BWLvXOLsX2LOmAdru38Xi1bAbI3iekV5DJJSbqXnlze86ECfTtghmvX-DOsLpGOtBx9FgYw1jK9B4u4k4UA8x-1gdmzrCRBcACwGxj91eyTI-4JjPjSicS9chEM3FnAGbkz3n7UFbXA8G2t38Jo',
        languages: 'English, Russian, French',
        procedures: 'EEG, Neurovascular Ultrasound, Migraine Infusion Protocols',
        bio: 'Dual board-certified neurologist specializing in chronic migraine pathways, autonomic nervous system dysregulation, and neurovascular disorders.',
        match_percentage: 98,
        earliest_slot: 'Tomorrow, 9:00 AM',
        telehealth_available: 1
      },
      {
        name: 'Dr. Marcus Chen',
        title: 'MD',
        specialty: 'Orthopedics',
        clinic: 'Stanford Health Pavilion',
        address: 'Stanford Health Pavilion, 450 Broadway, Redwood City, CA',
        experience_yrs: 9,
        rating: 4.85,
        review_count: 89,
        fee: 110.00,
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG4NVohq65419uH_vBsiq62dAsfLwnI1Oj32Y-671h8uJzU1yMs0dufrQgL6horrI3c5JQEiY3Y4EzjpsDZ9ZyASmmhn9vtaxaCEu0dLkMl2jv4CfOIiVJI2QQl6PR5tHqEyzehC-hAABDhCS_Zw_sVGJRbKcer5GPBxcEJGXwT1vXN_zXA3pzTXUECQOqkbxp8MaoF7D9v7qRQWQwacqQw3pIsLOYF6DOQPfMWk',
        languages: 'English, Cantonese',
        procedures: 'Joint Arthroscopy, Sports Medicine, Spine Biomechanics, PRP Injections',
        bio: 'Orthopedic and metabolic specialist dedicated to minimally invasive musculoskeletal repair, athletic conditioning, and joint preservation.',
        match_percentage: 95,
        earliest_slot: 'Tomorrow, 11:15 AM',
        telehealth_available: 1
      },
      {
        name: 'Dr. Julian Ramos',
        title: 'MD, FAAP',
        specialty: 'Pediatrics',
        clinic: 'Sunrise Kids Clinic',
        address: 'Sunrise Health Center, 2200 University Ave, Berkeley, CA',
        experience_yrs: 11,
        rating: 4.95,
        review_count: 310,
        fee: 115.00,
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZtDEjhthP2pjJi7gcBrEd9tjfmaaO7j3r94w7-zkSRWc4Hcyk2C41fXuvKWwOVuPdYwPFG3C1DBzlmF3asCHelYlUvl52OCz19cV_Zb-ADYZYdedtBAZirDQfYmVgwCzRbPZWV8KEfaSKSfRhkXK-DBiu105RuOkSjnQ6V6UOeILPxhRz9j7VuXATZk5DJeUyW2B8KxlDrLtUB_ckEfT3Lp3-PEhOhoLPS-VpBhM',
        languages: 'English, Spanish',
        procedures: 'Developmental Milestones, Pediatric Allergy Triage, Well-Child Physicals',
        bio: 'Beloved pediatrician committed to playful, trauma-informed clinical consultations for infants, adolescents, and neurodivergent children.',
        match_percentage: 95,
        earliest_slot: 'Today, 5:15 PM',
        telehealth_available: 1
      },
      {
        name: 'Dr. Ananya Patel',
        title: 'MD',
        specialty: 'Cardiology',
        clinic: 'Palo Alto Clinic',
        address: 'Palo Alto Health Plaza, 795 El Camino Real, Palo Alto, CA',
        experience_yrs: 15,
        rating: 5.0,
        review_count: 208,
        fee: 135.00,
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9z7Bt0JrY_GncMFbABH22gT2aQ49jxeMB0CH2sjn4RXK06FQHxZR5R1h1FCN1YZP5tyWwhUiBbHRDQ1Cit4GR39iZGmyl735spIbOdGiP3Bhtn1v7trE1Tbw9LESxppHlwXz7ooLqGdZYf7LM7su7PQT1LwwN3SBqvhVyUZj-rvXGMR80eFzz2ulPd24_AR8AkMvQSSWluu2NvR_fUwYxepqIWiYUpGd9SoNHLq8',
        languages: 'English, Hindi, Gujarati',
        procedures: 'Cardio-Metabolic Wellness, Calcium Score Scans, Women’s Heart Health',
        bio: 'Specialist in preventative longevity, lifestyle medicine, and early biomarker tracking for comprehensive cardiovascular health.',
        match_percentage: 91,
        earliest_slot: 'Oct 26, 11:30 AM',
        telehealth_available: 1
      }
    ];

    const insertDoctor = db.prepare(`
      INSERT INTO doctors (
        name, title, specialty, clinic, address, experience_yrs, rating, review_count, fee,
        avatar_url, languages, procedures, bio, match_percentage, earliest_slot, telehealth_available
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    doctors.forEach(d => {
      insertDoctor.run(
        d.name, d.title, d.specialty, d.clinic, d.address, d.experience_yrs, d.rating,
        d.review_count, d.fee, d.avatar_url, d.languages, d.procedures, d.bio,
        d.match_percentage, d.earliest_slot, d.telehealth_available
      );
    });

    // Seed slots for the doctors across upcoming dates
    const allDoctors = db.prepare('SELECT id FROM doctors').all();
    const insertSlot = db.prepare(`
      INSERT INTO slots (doctor_id, slot_date, slot_time, session_period, type, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    // Standard slot times
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

    // Generate for next 14 days
    const today = new Date();
    for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
      const d = new Date(today);
      d.setDate(today.getDate() + dayOffset);
      const dateStr = d.toISOString().split('T')[0];

      allDoctors.forEach(doc => {
        morningTimes.forEach(slot => {
          insertSlot.run(doc.id, dateStr, slot.time, 'morning', slot.type, 'available');
        });
        afternoonTimes.forEach(slot => {
          insertSlot.run(doc.id, dateStr, slot.time, 'afternoon', slot.type, 'available');
        });
      });
    }
  }

  // Seed sample initial appointments for Alex Morgan (patient_id: 1)
  const apptCount = db.prepare('SELECT count(*) as count FROM appointments').get();
  if (apptCount.count === 0) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const insertAppt = db.prepare(`
      INSERT INTO appointments (
        booking_code, patient_id, doctor_id, slot_id, appointment_date, appointment_time,
        consult_mode, symptoms, notes, special_needs, fee, status, queue_number, check_in_time, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Upcoming Appointment with Dr. Sarah Jenkins
    insertAppt.run(
      'MED-8491',
      1,
      1, // Dr. Sarah Jenkins
      3,
      tomorrowStr,
      '10:30 AM',
      'in_person',
      'Occasional mild heart flutters observed during aerobic treadmill sessions. Would like to review ECG readings and adjust beta-blocker dosage.',
      'Pre-fasting required 6 hours prior for lipid and metabolic panel.',
      'Valet parking confirmed. No wheelchair required.',
      120.00,
      'confirmed',
      'Q-04',
      null,
      new Date().toISOString()
    );

    // Another upcoming telehealth visit with Dr. Marcus Chen
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 4);
    insertAppt.run(
      'MED-9032',
      1,
      5, // Dr. Marcus Chen
      null,
      nextWeek.toISOString().split('T')[0],
      '02:45 PM',
      'telehealth',
      'Knee soreness after marathon training; mobility assessment.',
      'Have MRI scans ready on screen.',
      'None',
      110.00,
      'confirmed',
      'Q-12',
      null,
      new Date().toISOString()
    );

    // Past Completed 1: Dr. Sarah Jenkins
    insertAppt.run(
      'MED-7182',
      1,
      1,
      null,
      '2024-10-12',
      '02:15 PM',
      'telehealth',
      'Bi-annual Blood Pressure Follow-up',
      'Blood pressure well controlled at 122/78 mmHg. Continued Metoprolol 25mg daily.',
      'None',
      120.00,
      'checked_in',
      'Q-09',
      '2024-10-12T14:05:00Z',
      '2024-10-01T10:00:00Z'
    );

    // Past Completed 2: Dr. Marcus Chen
    insertAppt.run(
      'MED-6641',
      1,
      5,
      null,
      '2024-09-28',
      '11:00 AM',
      'in_person',
      'Routine HbA1c Lab Panel & Dietary Review',
      'HbA1c steady at 5.4%. Maintain balanced low-glycemic Mediterranean nutrition.',
      'None',
      110.00,
      'checked_in',
      'Q-02',
      '2024-09-28T10:45:00Z',
      '2024-09-15T09:30:00Z'
    );

    // Past Completed 3: Dr. Ananya Patel
    insertAppt.run(
      'MED-5198',
      1,
      7,
      null,
      '2024-08-14',
      '09:30 AM',
      'in_person',
      'Annual Comprehensive Physical Exam',
      'Full preventative workup completed. Resting ECG clear. VO2 max test optimal.',
      'None',
      135.00,
      'checked_in',
      'Q-01',
      '2024-08-14T09:15:00Z',
      '2024-08-01T11:00:00Z'
    );
  }

  // Seed sample prescriptions
  const rxCount = db.prepare('SELECT count(*) as count FROM prescriptions').get();
  if (rxCount.count === 0) {
    const insertRx = db.prepare(`
      INSERT INTO prescriptions (
        patient_id, doctor_id, medication_name, dosage, instructions, status, last_filled_date, pharmacy
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertRx.run(
      1,
      1,
      'Metoprolol Tartrate',
      '25 mg Oral Tablet',
      'Take 1 tablet daily with food in morning for blood pressure regulation.',
      'refill_requested',
      '2024-09-20',
      'Walgreens Pharmacy #1043, Palo Alto'
    );

    insertRx.run(
      1,
      7,
      'Rosuvastatin Calcium',
      '10 mg Oral Tablet',
      'Take 1 tablet nightly at bedtime for cardiovascular lipid optimization.',
      'active',
      '2024-09-10',
      'CVS Health Pharmacy, Palo Alto'
    );

    insertRx.run(
      1,
      5,
      'CoQ10 Ubiquinol High Absorption',
      '200 mg Capsule',
      'Take 1 softgel daily with breakfast for mitochondrial and muscle support.',
      'active',
      '2024-10-01',
      'Stanford Health Outpatient Pharmacy'
    );
  }
}

// Run init
initDatabase();

module.exports = { db, initDatabase };
