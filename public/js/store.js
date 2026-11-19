// MediSlot AI Global Reactive Store & API Client
window.MediSlotStore = {
  // Current active authenticated user
  currentUser: {
    id: 'usr_pat_90214',
    role: 'patient',
    name: 'Alex Morgan',
    email: 'alex.morgan@healthmail.com',
    phone: '+1 (555) 019-2834',
    mrn: 'MRN-90214'
  },

  setCurrentUser(user) {
    this.currentUser = user;
    if (user && user.role === 'patient') {
      this.patient = {
        id: user.id || 1,
        mrn: user.mrn || 'MRN-90214',
        name: user.name || user.full_name || 'Alex Morgan',
        email: user.email,
        phone: user.phone || '+1 (555) 019-2834',
        dob: user.dob || '1992-05-14',
        insuranceProvider: user.insuranceProvider || 'Blue Cross Blue Shield Gold PPO',
        insuranceId: user.insuranceId || 'BCBS-889104-Z'
      };
    }
    this.notify('user_changed', user);
    this.updateHeaderAuthUI();
  },

  updateHeaderAuthUI() {
    const container = document.getElementById('header-user-badge-container');
    if (!container) return;
    const user = this.currentUser;
    if (user) {
      const roleColor = user.role === 'admin' ? 'bg-[#EF4444] text-white' : user.role === 'doctor' ? 'bg-secondary text-white' : 'bg-primary text-white';
      const roleBadge = user.role === 'admin' ? 'Admin' : user.role === 'doctor' ? 'Doctor' : 'Patient';
      container.innerHTML = `
        <div class="relative flex items-center">
          <button onclick="MediSlotStore.toggleUserMenu()" class="flex items-center gap-space-xs bg-[#FFFDF5] border-2 border-[#1E293B] rounded-full p-1 pr-2.5 shadow-[2px_2px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform" type="button">
            <div class="w-7 h-7 rounded-full ${roleColor} flex items-center justify-center font-bold text-xs border border-[#1E293B] shrink-0">
              ${user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div class="flex flex-col text-left">
              <span class="font-headline-sm text-xs font-bold text-on-surface truncate max-w-[100px] leading-tight">${user.name || user.email}</span>
              <span class="text-[9px] font-extrabold uppercase tracking-wider ${user.role === 'admin' ? 'text-red-600' : user.role === 'doctor' ? 'text-secondary' : 'text-primary'}">${roleBadge}</span>
            </div>
            <span class="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
          
          <div id="header-user-dropdown" class="hidden absolute top-full right-0 mt-2 w-56 bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl shadow-[4px_4px_0px_#1E293B] p-2 flex flex-col gap-1 z-50">
            <div class="px-2 py-1.5 border-b border-[#1E293B]/20">
              <span class="text-[10px] text-outline font-bold uppercase tracking-wider">Signed in as</span>
              <p class="text-xs font-extrabold text-on-surface truncate">${user.email}</p>
            </div>
            ${user.role === 'patient' ? '<a href="#patient-portal" class="px-2 py-1.5 rounded-lg hover:bg-surface-container text-xs font-bold flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-primary">person</span> Patient Portal</a>' : ''}
            ${user.role === 'doctor' ? '<a href="#doctor-console" class="px-2 py-1.5 rounded-lg hover:bg-surface-container text-xs font-bold flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-secondary">stethoscope</span> Doctor Console</a>' : ''}
            ${user.role === 'admin' ? '<a href="#admin-hub" class="px-2 py-1.5 rounded-lg hover:bg-surface-container text-xs font-bold flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-red-500">admin_panel_settings</span> Admin Hub</a>' : ''}
            <button onclick="MediSlotStore.handleSignOut()" class="w-full text-left px-2 py-1.5 rounded-lg hover:bg-red-50 text-xs font-bold text-red-600 flex items-center gap-1.5" type="button">
              <span class="material-symbols-outlined text-[16px]">logout</span> Sign Out
            </button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <button onclick="Modals.openAuthModal()" class="flex items-center gap-1 bg-[#FFFDF5] text-on-surface border-2 border-[#1E293B] px-3 py-1.5 rounded-full shadow-[2px_2px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 font-label-md text-xs font-bold transition-all" type="button">
          <span class="material-symbols-outlined text-[18px] text-primary">login</span>
          <span>Sign In</span>
        </button>
      `;
    }
  },

  toggleUserMenu() {
    const el = document.getElementById('header-user-dropdown');
    if (el) el.classList.toggle('hidden');
  },

  async handleSignOut() {
    if (window.SupabaseService) {
      await window.SupabaseService.signOut();
    } else {
      this.setCurrentUser(null);
    }
    showToast('Signed out successfully.', 'info');
  },

  // Current active patient profile
  patient: {
    id: 1,
    mrn: 'MRN-90214',
    name: 'Alex Morgan',
    email: 'alex.morgan@healthmail.com',
    phone: '+1 (555) 019-2834',
    dob: '1992-05-14',
    insuranceProvider: 'Blue Cross Blue Shield Gold PPO',
    insuranceId: 'BCBS-889104-Z'
  },

  // Doctors cache
  doctors: [],
  selectedDoctor: null,

  // Booking Flow State
  bookingState: {
    currentStep: 2, // Default to Step 2 as shown in prototype, can go to 1, 3, 4, 5, 6
    doctorId: 1, // Dr. Sarah Jenkins default
    doctor: null,
    selectedDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    selectedSlotId: null,
    selectedSlotTime: '10:30 AM',
    selectedSlotType: 'regular',
    consultMode: 'in_person', // 'in_person' or 'telehealth'
    symptoms: 'Occasional mild heart flutters observed during aerobic treadmill sessions. Would like to review ECG readings and adjust beta-blocker dosage.',
    quickTags: ['Heart Fluttering'],
    specialNeeds: {
      wheelchair: false,
      translator: false
    },
    fee: 120.00,
    shieldTimer: 585, // 09:45 seconds
    shieldTimerInterval: null,
    confirmedAppointment: null
  },

  // Listeners for store changes
  listeners: [],
  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  },
  notify(event, payload) {
    this.listeners.forEach(fn => fn(event, payload));
  },

  // API Client Methods
  async fetchDoctors(params = {}) {
    try {
      const q = new URLSearchParams(params).toString();
      const res = await fetch(`/api/doctors?${q}`);
      const data = await res.json();
      if (data.success) {
        this.doctors = data.doctors;
        this.notify('doctors_updated', this.doctors);
        return data.doctors;
      }
      return [];
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
      return [];
    }
  },

  async fetchDoctor(id) {
    try {
      const res = await fetch(`/api/doctors/${id}`);
      const data = await res.json();
      if (data.success) {
        return data;
      }
      return null;
    } catch (err) {
      console.error('Failed to fetch doctor:', err);
      return null;
    }
  },

  async fetchSlots(doctorId, date) {
    try {
      const res = await fetch(`/api/slots?doctorId=${doctorId}&date=${date}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch slots:', err);
      return { success: false, morning: [], afternoon: [] };
    }
  },

  async lockSlot(slotId) {
    try {
      const res = await fetch('/api/slots/lock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId, durationSeconds: 600 })
      });
      return await res.json();
    } catch (err) {
      console.error('Failed to lock slot:', err);
      return { success: false };
    }
  },

  async createAppointment(appointmentData) {
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
      });
      const data = await res.json();
      if (data.success) {
        this.bookingState.confirmedAppointment = data.appointment;
        this.notify('appointment_created', data.appointment);
      }
      return data;
    } catch (err) {
      console.error('Failed to create appointment:', err);
      return { success: false, error: err.message };
    }
  },

  async fetchAppointments() {
    try {
      const res = await fetch('/api/appointments?patientId=1');
      return await res.json();
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      return { success: false, all: [], upcoming: [], completed: [], cancelled: [] };
    }
  },

  async fetchAppointment(id) {
    try {
      const res = await fetch(`/api/appointments/${id}`);
      return await res.json();
    } catch (err) {
      console.error('Failed to fetch appointment detail:', err);
      return { success: false };
    }
  },

  async rescheduleAppointment(id, newDate, newTime, newSlotId) {
    try {
      const res = await fetch(`/api/appointments/${id}/reschedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newDate, newTime, newSlotId })
      });
      const data = await res.json();
      if (data.success) {
        this.notify('appointment_updated', data.appointment);
      }
      return data;
    } catch (err) {
      console.error('Failed to reschedule:', err);
      return { success: false, error: err.message };
    }
  },

  async cancelAppointment(id, reason) {
    try {
      const res = await fetch(`/api/appointments/${id}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });
      const data = await res.json();
      if (data.success) {
        this.notify('appointment_cancelled', id);
      }
      return data;
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
      return { success: false, error: err.message };
    }
  },

  async checkinAppointment(id) {
    try {
      const res = await fetch(`/api/appointments/${id}/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        this.notify('appointment_checked_in', { id, ...data });
      }
      return data;
    } catch (err) {
      console.error('Failed to check in:', err);
      return { success: false, error: err.message };
    }
  },

  async fetchPrescriptions() {
    try {
      const res = await fetch('/api/prescriptions?patientId=1');
      return await res.json();
    } catch (err) {
      console.error('Failed to fetch prescriptions:', err);
      return { success: false, prescriptions: [] };
    }
  },

  async refillPrescription(id, pharmacy) {
    try {
      const res = await fetch(`/api/prescriptions/${id}/refill`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pharmacy })
      });
      return await res.json();
    } catch (err) {
      console.error('Failed to refill prescription:', err);
      return { success: false, error: err.message };
    }
  },

  async joinWaitlist(data) {
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      console.error('Failed to join waitlist:', err);
      return { success: false, error: err.message };
    }
  },

  async chatMediBot(message) {
    try {
      const res = await fetch('/api/medibot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) return data;
      }
    } catch (err) {
      console.warn('Network chat endpoint unavailable, using smart client-side concierge fallback:', err);
    }

    // Intelligent client-side triage concierge fallback
    const lower = (message || '').toLowerCase().trim();
    if (lower.includes('chest') || lower.includes('flutter') || lower.includes('palpitation') || lower.includes('heart') || lower.includes('blood pressure')) {
      return {
        success: true,
        reply: "For heart flutters, arrhythmias, or blood pressure concerns, I recommend consulting **Dr. Sarah Jenkins** (Senior Cardiologist at Stanford) or **Dr. Marcus Vance** (Metro Heart Institute). Would you like to view their earliest opening?",
        actionType: 'doctor_recommendation',
        suggestedDoctorId: 1,
        suggestedSpecialty: 'Cardiology'
      };
    } else if (lower.includes('skin') || lower.includes('rash') || lower.includes('mole') || lower.includes('acne') || lower.includes('derma')) {
      return {
        success: true,
        reply: "For skin evaluations, rashes, or early mole screening, **Dr. Sarah Chen** at St. Jude Pavilion currently has open priority slots today!",
        actionType: 'doctor_recommendation',
        suggestedDoctorId: 2,
        suggestedSpecialty: 'Dermatology'
      };
    } else if (lower.includes('headache') || lower.includes('migraine') || lower.includes('dizzy') || lower.includes('neuro') || lower.includes('brain')) {
      return {
        success: true,
        reply: "**Dr. Elena Rostova** at Cerebral Center & UCSF is our premier specialist in neurovascular care and chronic migraine treatment. She has open slots tomorrow at 9:00 AM.",
        actionType: 'doctor_recommendation',
        suggestedDoctorId: 4,
        suggestedSpecialty: 'Neurology'
      };
    } else if (lower.includes('joint') || lower.includes('knee') || lower.includes('bone') || lower.includes('back pain') || lower.includes('ortho')) {
      return {
        success: true,
        reply: "For orthopedic and joint rehabilitation reviews, **Dr. Marcus Chen** at Stanford Health Pavilion has an opening tomorrow at 11:15 AM.",
        actionType: 'doctor_recommendation',
        suggestedDoctorId: 5,
        suggestedSpecialty: 'Orthopedics'
      };
    } else if (lower.includes('child') || lower.includes('kid') || lower.includes('baby') || lower.includes('pediatric')) {
      return {
        success: true,
        reply: "**Dr. Julian Ramos** at Sunrise Kids Clinic is available today at 5:15 PM for compassionate, gentle pediatric physicals.",
        actionType: 'doctor_recommendation',
        suggestedDoctorId: 6,
        suggestedSpecialty: 'Pediatrics'
      };
    } else if (lower.includes('fasting') || lower.includes('eat') || lower.includes('water') || lower.includes('food')) {
      return {
        success: true,
        reply: "✦ **Pre-Consultation Fasting Rule**: For metabolic panels, please fast from solid food and sugary drinks for **6 hours prior** to your appointment. Clean water is highly encouraged.",
        actionType: 'prep_guidance'
      };
    } else if (lower.includes('carry') || lower.includes('document') || lower.includes('bring') || lower.includes('records')) {
      return {
        success: true,
        reply: "✦ **What to bring tomorrow**:\n1. Photo ID\n2. Blue Cross Blue Shield insurance card (ID: BCBS-889104-Z)\n3. Recent ECG or medication list\n4. Your MediSlot Pass Code: **MED-8491**",
        actionType: 'prep_guidance'
      };
    } else if (lower.includes('urgent') || lower.includes('scan') || lower.includes('cancellation')) {
      return {
        success: true,
        reply: "⚡ **Live Clinical Radar**: MediBot AI is monitoring real-time cancellations across 14 hospital networks. 2 urgent slots were released in the last 4 minutes!",
        actionType: 'slot_scan'
      };
    }

    return {
      success: true,
      reply: "Hi Alex! I'm MediBot AI, your clinical concierge. You can ask me about symptoms (cardio, dermatology, neurology), fasting guidelines, what documents to bring, or getting matched with a specialist.",
      actionType: 'info'
    };
  },

  async fetchDashboardStats() {
    try {
      const res = await fetch('/api/stats/dashboard');
      return await res.json();
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
      return { success: false };
    }
  },

  async fetchDoctorConsole() {
    try {
      const res = await fetch('/api/doctor-console/schedule');
      return await res.json();
    } catch (err) {
      console.error('Failed to fetch doctor console schedule:', err);
      return { success: false };
    }
  },

  async toggleDoctorSlot(slotId, status) {
    try {
      const res = await fetch('/api/doctor-console/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId, status })
      });
      return await res.json();
    } catch (err) {
      console.error('Failed to toggle slot:', err);
      return { success: false };
    }
  },

  async fetchAdminMetrics() {
    try {
      const res = await fetch('/api/admin/metrics');
      return await res.json();
    } catch (err) {
      console.error('Failed to fetch admin metrics:', err);
      return { success: false };
    }
  },

  // Booking Flow Helpers
  setBookingDoctor(doctor) {
    this.bookingState.doctor = doctor;
    this.bookingState.doctorId = doctor.id;
    this.bookingState.fee = doctor.fee;
    this.notify('booking_doctor_changed', doctor);
  },

  startShieldTimer(onTick) {
    if (this.bookingState.shieldTimerInterval) {
      clearInterval(this.bookingState.shieldTimerInterval);
    }
    this.bookingState.shieldTimer = 585; // 09:45
    this.bookingState.shieldTimerInterval = setInterval(() => {
      this.bookingState.shieldTimer--;
      if (this.bookingState.shieldTimer <= 0) {
        clearInterval(this.bookingState.shieldTimerInterval);
        this.bookingState.shieldTimer = 0;
      }
      const mins = Math.floor(this.bookingState.shieldTimer / 60);
      const secs = this.bookingState.shieldTimer % 60;
      const formatted = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
      if (onTick) onTick(formatted, this.bookingState.shieldTimer);
    }, 1000);
  }
};
