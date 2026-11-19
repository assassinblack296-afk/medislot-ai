// MediSlot AI - Doctor Console Operational View
window.DoctorConsolePage = {
  currentTab: 'today', // 'today', 'confirmed', 'checked_in', 'completed', 'slots'
  currentDate: new Date().toISOString().split('T')[0],
  scheduleData: null,

  render() {
    return `
      <div class="flex flex-col w-full pb-20">
        <div class="px-4 sm:px-gutter py-space-lg flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
          
          <!-- Doctor Header Banner -->
          <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md sm:p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col md:flex-row md:items-center justify-between gap-space-md" id="doctor-console-header">
            <div class="flex items-center gap-space-md">
              <div class="relative w-16 h-16 rounded-full border-2 border-[#1E293B] overflow-hidden bg-primary-fixed shadow-[3px_3px_0px_#1E293B] shrink-0">
                <img id="doc-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS75Y3hTNWY5IwCstLJLUr6QZZlz6X102tQsUOIkf4-WdIakpQ4f1HaoJu85lNz5ZU6AXWOe2ROpbOOdZAoZsxU-ip90PZLOOjodjQv-wvKqcpMtLq7zUxyTmk9muJiHBM4DonV6gebg0bHowkgng0v9NoJ1r8IxyEwLy0DaiEtvjktdgdUtnTN1T96iv3k_fnD3V9MITq7OpUd_BPf0QHgGv51gZBMrN51AQu6bQ" class="w-full h-full object-cover" alt="Doctor Profile"/>
                <div class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#10B981] border-2 border-[#1E293B]"></div>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2 flex-wrap">
                  <h1 id="doc-name" class="font-headline-lg text-xl sm:text-2xl text-on-surface font-extrabold">Dr. Sarah Jenkins, MD</h1>
                  <span id="doc-specialty-badge" class="bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#1E293B]">Cardiology</span>
                </div>
                <span id="doc-clinic" class="font-label-md text-secondary font-bold text-xs sm:text-sm mt-0.5">Stanford Medical Center • Suite 402</span>
                <span class="text-xs text-on-surface-variant font-mono mt-0.5" id="doc-meta">Staff ID: DOC-8812 • On-Duty</span>
              </div>
            </div>

            <!-- Quick Schedule Actions -->
            <div class="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <button onclick="DoctorConsolePage.launchTelehealthModal()" class="flex items-center gap-1.5 bg-secondary text-white font-label-md text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all">
                <span class="material-symbols-outlined text-[18px]">videocam</span>
                <span>Telehealth Room</span>
              </button>
              <button onclick="DoctorConsolePage.refreshSchedule()" class="flex items-center gap-1.5 bg-surface-container text-on-surface font-label-md text-xs sm:text-sm font-bold px-3 py-2 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container-high transition-all">
                <span class="material-symbols-outlined text-[18px]">refresh</span>
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <!-- Essential Daily Metrics -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-space-sm sm:gap-space-md" id="doctor-metric-cards">
            <div class="bg-primary-fixed border-2 border-[#1E293B] rounded-xl p-space-sm sm:p-space-md shadow-[3px_3px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-on-primary-fixed">Today's Appointments</span>
              <div class="font-headline-xl text-2xl sm:text-3xl font-extrabold text-on-primary-fixed mt-0.5" id="metric-today-count">--</div>
              <span class="text-xs text-on-primary-fixed-variant font-semibold">Total scheduled today</span>
            </div>
            <div class="bg-secondary-fixed border-2 border-[#1E293B] rounded-xl p-space-sm sm:p-space-md shadow-[3px_3px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-on-secondary-fixed">In Waiting Room</span>
              <div class="font-headline-xl text-2xl sm:text-3xl font-extrabold text-on-secondary-fixed mt-0.5" id="metric-queue-count">--</div>
              <span class="text-xs text-on-secondary-fixed-variant font-semibold">Checked in & ready</span>
            </div>
            <div class="bg-[#D1FAE5] border-2 border-[#1E293B] rounded-xl p-space-sm sm:p-space-md shadow-[3px_3px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-[#065F46]">Completed Today</span>
              <div class="font-headline-xl text-2xl sm:text-3xl font-extrabold text-[#065F46] mt-0.5" id="metric-completed-count">--</div>
              <span class="text-xs text-[#047857] font-semibold">Consultations completed</span>
            </div>
          </div>

          <!-- Main Schedule & Filter Hub -->
          <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md sm:p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col gap-space-md">
            
            <!-- Navigation Tabs & Date Selector -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm border-b-2 border-[#1E293B]">
              <!-- Filter Tabs: Streamlined to 3 Essential Views -->
              <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1" id="doctor-filter-tabs">
                <button onclick="DoctorConsolePage.setTab('today')" class="doctor-tab-btn px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] ${this.currentTab === 'today' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface'}" data-tab="today">
                  Today's Agenda & Waiting Room
                </button>
                <button onclick="DoctorConsolePage.setTab('upcoming')" class="doctor-tab-btn px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] ${this.currentTab === 'upcoming' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface'}" data-tab="upcoming">
                  Upcoming Consultations
                </button>
                <button onclick="DoctorConsolePage.setTab('slots')" class="doctor-tab-btn px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] ${this.currentTab === 'slots' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-container-low text-on-surface'}" data-tab="slots">
                  Availability & Slot Controls
                </button>
              </div>

              <!-- Date Picker Control -->
              <div class="flex items-center gap-2 self-start md:self-auto">
                <span class="text-xs font-bold text-on-surface-variant flex items-center gap-1">
                  <span class="material-symbols-outlined text-[16px]">calendar_today</span> Date:
                </span>
                <input type="date" id="doctor-date-picker" value="${this.currentDate}" onchange="DoctorConsolePage.onDateChange(this.value)" class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-lg px-2.5 py-1 text-xs font-bold shadow-[2px_2px_0px_#1E293B] focus:outline-none"/>
              </div>
            </div>

            <!-- Dynamic Agenda Content Container -->
            <div id="doctor-agenda-container" class="flex flex-col gap-3 min-h-[240px]">
              <div class="py-12 flex flex-col items-center justify-center text-outline gap-2">
                <span class="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
                <span class="text-xs font-bold">Loading schedule from clinical database...</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  },

  async afterRender() {
    // Determine which doctor to show based on logged-in user
    const user = window.MediSlotStore?.currentUser;
    if (user && user.role === 'doctor' && user.doctorId) {
      this.activeDoctorId = user.doctorId;
    } else {
      this.activeDoctorId = 1; // Default: Dr. Sarah Jenkins
    }

    await this.loadSchedule();

    // Subscribe to live Supabase updates if available
    if (window.SupabaseService && window.SupabaseService.subscribeToAppointments) {
      this._realtimeChannel = window.SupabaseService.subscribeToAppointments((payload) => {
        console.log('[DoctorConsole] Realtime update received:', payload.eventType);
        // Auto-refresh the schedule when any appointment changes
        this.loadSchedule();
        showToast('Patient schedule updated in real-time ↻', 'info');
      });
    }
  },

  async loadSchedule() {
    const data = await MediSlotStore.fetchDoctorConsole(this.activeDoctorId || 1, this.currentDate);
    if (!data || !data.success) {
      const container = document.getElementById('doctor-agenda-container');
      if (container) {
        container.innerHTML = `
          <div class="p-8 text-center text-on-surface-variant bg-surface-container-low rounded-xl border border-[#1E293B]">
            <span class="material-symbols-outlined text-4xl text-outline">event_busy</span>
            <p class="font-bold text-sm mt-2">Could not retrieve schedule data.</p>
            <button onclick="DoctorConsolePage.refreshSchedule()" class="mt-3 px-4 py-1.5 bg-primary text-white rounded-full font-bold text-xs border border-[#1E293B]">Retry</button>
          </div>
        `;
      }
      return;
    }

    this.scheduleData = data;

    // Update Doctor Header Info
    const doc = data.doctor;
    if (doc) {
      const nameEl = document.getElementById('doc-name');
      const clinicEl = document.getElementById('doc-clinic');
      const metaEl = document.getElementById('doc-meta');
      const avatarEl = document.getElementById('doc-avatar');
      const specEl = document.getElementById('doc-specialty-badge');
      if (nameEl) nameEl.innerText = `${doc.name}, ${doc.title}`;
      if (clinicEl) clinicEl.innerText = `${doc.clinic} • ${doc.address.split(',')[1] || 'Suite 402'}`;
      if (metaEl) metaEl.innerText = `Staff ID: DOC-88${doc.id.toString().padStart(2, '0')} • Rating: ${doc.rating} ★ • Fee: $${doc.fee}`;
      if (avatarEl && doc.avatar_url) avatarEl.src = doc.avatar_url;
      if (specEl) specEl.innerText = doc.specialty;
    }

    // Update Metrics
    const counts = data.counts || {};
    const todayEl = document.getElementById('metric-today-count');
    const confEl = document.getElementById('metric-confirmed-count');
    const queueEl = document.getElementById('metric-queue-count');
    const compEl = document.getElementById('metric-completed-count');
    if (todayEl) todayEl.innerText = counts.todayTotal || 0;
    if (confEl) confEl.innerText = counts.confirmed || 0;
    if (queueEl) queueEl.innerText = counts.checked_in || 0;
    if (compEl) compEl.innerText = counts.completed || 0;

    // Render Active Tab View
    this.renderActiveTab();
  },

  setTab(tab) {
    this.currentTab = tab;
    // Update tab styles
    document.querySelectorAll('.doctor-tab-btn').forEach(btn => {
      const t = btn.getAttribute('data-tab');
      if (t === tab) {
        btn.className = `doctor-tab-btn px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] ${
          t === 'slots' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-primary text-white'
        }`;
      } else {
        btn.className = 'doctor-tab-btn px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] bg-surface-container-low text-on-surface hover:bg-surface-container';
      }
    });
    this.renderActiveTab();
  },

  onDateChange(newDate) {
    this.currentDate = newDate;
    this.loadSchedule();
  },

  async refreshSchedule() {
    showToast('Refreshing clinic agenda...', 'info');
    await this.loadSchedule();
    showToast('Schedule up to date.', 'success');
  },

  renderActiveTab() {
    const container = document.getElementById('doctor-agenda-container');
    if (!container || !this.scheduleData) return;

    if (this.currentTab === 'slots') {
      this.renderSlotsTab(container);
      return;
    }

    let appointments = [];
    if (this.currentTab === 'today') {
      // Sort checked_in patients first to prioritize immediate queue, then confirmed, then others
      const todayList = (this.scheduleData.todayAppointments || []).slice();
      appointments = todayList.sort((a, b) => {
        if (a.status === 'checked_in' && b.status !== 'checked_in') return -1;
        if (b.status === 'checked_in' && a.status !== 'checked_in') return 1;
        if (a.status === 'confirmed' && b.status === 'completed') return -1;
        if (b.status === 'confirmed' && a.status === 'completed') return 1;
        return 0;
      });
    } else if (this.currentTab === 'upcoming') {
      // Future consultations
      appointments = (this.scheduleData.allAppointments || []).filter(a => a.appointment_date >= this.currentDate && a.status !== 'cancelled');
    } else {
      appointments = this.scheduleData.allAppointments || [];
    }

    if (appointments.length === 0) {
      container.innerHTML = `
        <div class="py-12 px-4 text-center bg-surface-container-low rounded-xl border border-[#1E293B] flex flex-col items-center gap-2">
          <span class="material-symbols-outlined text-4xl text-outline">event_available</span>
          <h4 class="font-headline-sm text-base font-bold text-on-surface">No appointments found</h4>
          <p class="font-body-sm text-xs text-on-surface-variant max-w-md">There are currently no patient visits listed under this section (${this.currentTab === 'today' ? "Today's Agenda" : "Upcoming Consultations"}).</p>
        </div>
      `;
      return;
    }

    container.innerHTML = appointments.map(a => this.renderAppointmentCard(a)).join('');
  },

  renderAppointmentCard(a) {
    const isToday = a.appointment_date === this.currentDate;
    const statusBg = 
      a.status === 'checked_in' ? 'bg-secondary text-white' :
      a.status === 'completed' ? 'bg-[#D1FAE5] text-[#065F46]' :
      a.status === 'cancelled' ? 'bg-red-100 text-red-800' :
      'bg-primary-fixed text-on-primary-fixed';

    const statusLabel = 
      a.status === 'checked_in' ? 'Checked In • In Queue' :
      a.status === 'completed' ? 'Completed' :
      a.status === 'cancelled' ? 'Cancelled' :
      'Confirmed';

    return `
      <div class="p-space-md rounded-xl border-2 border-[#1E293B] ${a.status === 'checked_in' ? 'bg-secondary-fixed/20 shadow-[4px_4px_0px_#1E293B]' : 'bg-surface-container-lowest shadow-[2px_2px_0px_#1E293B]'} flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        
        <!-- Left: Patient Details -->
        <div class="flex items-start sm:items-center gap-space-sm flex-1">
          <div class="w-12 h-12 rounded-full border-2 border-[#1E293B] ${a.status === 'checked_in' ? 'bg-secondary text-white' : 'bg-surface-container text-on-surface'} flex items-center justify-center font-extrabold text-sm shrink-0 shadow-[1px_1px_0px_#1E293B]">
            ${a.queue_number || 'Q'}
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-headline-sm text-[16px] font-bold text-on-surface truncate">${a.patient_name || 'Alex Morgan'}</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-bold border border-[#1E293B] ${statusBg}">
                ${statusLabel}
              </span>
              <span class="text-xs font-mono bg-surface-container px-1.5 py-0.5 rounded border border-[#1E293B]/40 text-on-surface-variant font-bold">
                ${a.booking_code}
              </span>
            </div>
            
            <div class="flex items-center gap-space-sm flex-wrap text-xs text-on-surface-variant mt-1">
              <span class="flex items-center gap-1 font-bold text-on-surface">
                <span class="material-symbols-outlined text-[15px] text-primary">schedule</span>
                ${a.appointment_date} • ${a.appointment_time}
              </span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[15px] text-secondary">
                  ${a.consult_mode === 'telehealth' ? 'videocam' : 'room'}
                </span>
                ${a.consult_mode === 'telehealth' ? 'Telehealth Video' : 'In-Person (Suite 402)'}
              </span>
              <span>•</span>
              <span>MRN: <strong class="text-on-surface font-mono">${a.patient_mrn || 'MRN-90214'}</strong></span>
            </div>

            <!-- Symptoms preview -->
            ${a.symptoms ? `
              <p class="text-xs text-on-surface-variant mt-1.5 line-clamp-1 italic bg-surface-container-low px-2 py-1 rounded border border-[#1E293B]/20">
                <strong class="font-bold text-on-surface not-italic">Chief Complaint:</strong> ${a.symptoms}
              </p>
            ` : ''}
          </div>
        </div>

        <!-- Right: Action Buttons -->
        <div class="flex items-center gap-1.5 flex-wrap self-end md:self-auto shrink-0">
          <button onclick="DoctorConsolePage.viewPatientDetails(${a.id})" class="bg-surface-container-lowest border border-[#1E293B] px-3 py-1.5 rounded-full text-xs font-bold shadow-[1px_1px_0px_#1E293B] hover:bg-surface-container transition-colors flex items-center gap-1" type="button">
            <span class="material-symbols-outlined text-[14px]">clinical_notes</span>
            <span>Intake Details</span>
          </button>

          ${a.status === 'confirmed' ? `
            <button onclick="DoctorConsolePage.updateStatus(${a.id}, 'checked_in')" class="bg-secondary text-white border-2 border-[#1E293B] px-3 py-1.5 rounded-full text-xs font-bold shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-transform flex items-center gap-1" type="button">
              <span class="material-symbols-outlined text-[14px]">how_to_reg</span>
              <span>Check In</span>
            </button>
          ` : ''}

          ${a.status === 'checked_in' ? `
            <button onclick="DoctorConsolePage.updateStatus(${a.id}, 'completed')" class="bg-[#10B981] text-white border-2 border-[#1E293B] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-transform flex items-center gap-1" type="button">
              <span class="material-symbols-outlined text-[14px]">task_alt</span>
              <span>Mark Completed</span>
            </button>
          ` : ''}

          ${a.consult_mode === 'telehealth' && a.status !== 'completed' && a.status !== 'cancelled' ? `
            <button onclick="DoctorConsolePage.launchTelehealthModal('${a.patient_name || 'Patient'}', '${a.booking_code}')" class="bg-primary text-white border-2 border-[#1E293B] px-3 py-1.5 rounded-full text-xs font-bold shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-transform flex items-center gap-1" type="button">
              <span class="material-symbols-outlined text-[14px]">videocam</span>
              <span>Open Room</span>
            </button>
          ` : ''}

          ${a.status !== 'completed' && a.status !== 'cancelled' ? `
            <button onclick="DoctorConsolePage.cancelAppointment(${a.id})" class="bg-surface-container text-red-600 border border-[#1E293B] px-2.5 py-1.5 rounded-full text-xs font-bold shadow-[1px_1px_0px_#1E293B] hover:bg-red-50 transition-colors" title="Cancel Appointment" type="button">
              <span class="material-symbols-outlined text-[14px]">close</span>
            </button>
          ` : ''}
        </div>

      </div>
    `;
  },

  renderSlotsTab(container) {
    const slots = this.scheduleData.slots || [];
    if (slots.length === 0) {
      container.innerHTML = `
        <div class="py-12 px-4 text-center bg-surface-container-low rounded-xl border border-[#1E293B]">
          <span class="material-symbols-outlined text-4xl text-outline">schedule</span>
          <h4 class="font-headline-sm text-base font-bold text-on-surface mt-2">No generated slots for ${this.currentDate}</h4>
          <p class="font-body-sm text-xs text-on-surface-variant">Slots populate automatically upon patient search or clinic schedule generation.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="flex flex-col gap-space-md">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-headline-sm text-base font-bold text-on-surface">Daily Slot Availability Controls</h4>
            <p class="font-body-sm text-xs text-on-surface-variant">Toggle slots to hold/block for admin time or open for public scheduling.</p>
          </div>
          <span class="text-xs font-mono font-bold bg-surface-container px-2.5 py-1 rounded border border-[#1E293B]">
            ${slots.filter(s => s.status === 'available').length} / ${slots.length} Open
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          ${slots.map(s => `
            <div class="p-3 rounded-xl border-2 border-[#1E293B] ${s.status === 'available' ? 'bg-[#D1FAE5]/50' : s.status === 'booked' ? 'bg-primary-fixed/40' : 'bg-tertiary-fixed/40'} flex flex-col justify-between gap-2 shadow-[2px_2px_0px_#1E293B]">
              <div class="flex items-center justify-between">
                <span class="font-headline-sm text-sm font-bold">${s.slot_time}</span>
                <span class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border border-[#1E293B] ${s.status === 'available' ? 'bg-[#10B981] text-white' : s.status === 'booked' ? 'bg-primary text-white' : 'bg-tertiary-fixed text-on-tertiary-fixed'}">
                  ${s.status}
                </span>
              </div>
              <div class="text-[11px] text-on-surface-variant capitalize">${s.session_period} • ${s.type.replace('_', ' ')}</div>
              ${s.status !== 'booked' ? `
                <button onclick="DoctorConsolePage.toggleSlot(${s.id}, '${s.status === 'available' ? 'locked' : 'available'}')" class="w-full text-center py-1 rounded-lg text-xs font-bold border border-[#1E293B] ${s.status === 'available' ? 'bg-surface-container hover:bg-tertiary-fixed' : 'bg-[#10B981] text-white'} shadow-[1px_1px_0px_#1E293B] transition-colors" type="button">
                  ${s.status === 'available' ? 'Hold / Block' : 'Open Slot'}
                </button>
              ` : `
                <span class="text-[11px] text-center text-outline font-bold py-1">Booked by Patient</span>
              `}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  async updateStatus(appointmentId, newStatus) {
    const res = await MediSlotStore.updateAppointmentStatus(appointmentId, newStatus);
    if (res.success) {
      showToast(`Appointment status updated to ${newStatus}!`, 'success');
      await this.loadSchedule();
    } else {
      showToast(res.error || 'Failed to update status', 'error');
    }
  },

  async toggleSlot(slotId, newStatus) {
    const res = await MediSlotStore.toggleDoctorSlot(slotId, newStatus);
    if (res.success) {
      showToast(`Slot status changed to ${newStatus}`, 'success');
      await this.loadSchedule();
    } else {
      showToast('Could not update slot', 'error');
    }
  },

  async cancelAppointment(appointmentId) {
    if (!confirm('Are you sure you want to cancel this appointment and release the slot?')) return;
    const res = await MediSlotStore.cancelAppointment(appointmentId, 'Doctor administrative schedule change');
    if (res.success) {
      showToast('Appointment cancelled and slot released.', 'warning');
      await this.loadSchedule();
    } else {
      showToast(res.error || 'Failed to cancel appointment', 'error');
    }
  },

  viewPatientDetails(appointmentId) {
    const appts = this.scheduleData.allAppointments || [];
    const appt = appts.find(a => a.id === appointmentId);
    if (!appt) return;

    MediSlotModals.open(`
      <div class="flex flex-col gap-space-md">
        <div class="flex items-center gap-space-sm pb-space-sm border-b-2 border-[#1E293B]">
          <div class="w-12 h-12 rounded-full bg-primary-fixed border-2 border-[#1E293B] flex items-center justify-center text-primary font-bold shadow-[2px_2px_0px_#1E293B]">
            <span class="material-symbols-outlined text-[24px]">person</span>
          </div>
          <div>
            <h3 class="font-headline-sm text-lg font-bold">${appt.patient_name || 'Alex Morgan'}</h3>
            <span class="text-xs text-on-surface-variant font-mono">MRN: ${appt.patient_mrn || 'MRN-90214'} • Phone: ${appt.patient_phone || 'N/A'}</span>
          </div>
        </div>

        <div class="bg-surface-container-low p-space-sm rounded-xl border border-[#1E293B] flex flex-col gap-2 text-xs">
          <div>
            <strong class="text-on-surface font-bold block mb-0.5">Appointment Schedule:</strong>
            <span class="text-on-surface-variant">${appt.appointment_date} at ${appt.appointment_time} (${appt.consult_mode === 'telehealth' ? 'Telehealth Video' : 'In-Person Suite 402'})</span>
          </div>
          <div>
            <strong class="text-on-surface font-bold block mb-0.5">Reported Symptoms / Chief Complaint:</strong>
            <p class="text-on-surface bg-surface-container-lowest p-2 rounded border border-[#1E293B]/20">${appt.symptoms || 'None recorded by patient.'}</p>
          </div>
          <div>
            <strong class="text-on-surface font-bold block mb-0.5">Clinical Intake Notes & Fasting:</strong>
            <p class="text-on-surface-variant">${appt.notes || 'Standard intake. Fasting requirements confirmed if bloodwork scheduled.'}</p>
          </div>
          <div>
            <strong class="text-on-surface font-bold block mb-0.5">Special Accommodations:</strong>
            <span class="text-on-surface-variant">${appt.special_needs || 'None requested.'}</span>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-2">
          ${appt.consult_mode === 'telehealth' && appt.status !== 'completed' ? `
            <button onclick="MediSlotModals.close(); DoctorConsolePage.launchTelehealthModal('${appt.patient_name}', '${appt.booking_code}')" class="flex-1 bg-primary text-white py-2 rounded-full font-bold text-xs border border-[#1E293B]">
              Launch Telehealth Room
            </button>
          ` : ''}
          <button onclick="MediSlotModals.close()" class="flex-1 bg-surface-container text-on-surface py-2 rounded-full font-bold text-xs border border-[#1E293B]">
            Close
          </button>
        </div>
      </div>
    `);
  },

  launchTelehealthModal(patientName = 'Alex Morgan', bookingCode = 'MED-8491') {
    const roomUrl = `https://meet.jit.si/MediSlot-Consult-${bookingCode}`;
    MediSlotModals.open(`
      <div class="flex flex-col gap-space-md text-center items-center">
        <div class="w-16 h-16 rounded-full bg-secondary-fixed border-2 border-[#1E293B] flex items-center justify-center text-secondary shadow-[3px_3px_0px_#1E293B]">
          <span class="material-symbols-outlined text-[32px]">videocam</span>
        </div>
        <div>
          <span class="bg-[#10B981] text-white text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#1E293B]">
            Telehealth Consultation
          </span>
          <h3 class="font-headline-sm text-lg font-bold mt-2">Stanford Telehealth Room</h3>
          <p class="text-xs text-on-surface-variant mt-1">Patient: <strong>${patientName}</strong> • Pass: <strong class="font-mono">${bookingCode}</strong></p>
        </div>

        <div class="bg-surface-container-low p-4 rounded-xl border border-[#1E293B] w-full text-left text-xs flex flex-col gap-2">
          <div class="flex items-center gap-1.5 text-on-surface font-bold">
            <span class="material-symbols-outlined text-[16px] text-[#10B981]">lock</span>
            <span>Encrypted HIPAA Telehealth Room Ready</span>
          </div>
          <p class="text-on-surface-variant">The patient receives this link automatically upon check-in. Click below to launch the video meeting in a secure tab.</p>
        </div>

        <div class="flex items-center gap-2 w-full pt-2">
          <a href="${roomUrl}" target="_blank" onclick="MediSlotModals.close(); showToast('Telehealth room launched in new tab', 'success');" class="flex-1 bg-secondary text-white py-2.5 rounded-full font-bold text-xs border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-center gap-1">
            <span class="material-symbols-outlined text-[16px]">open_in_new</span>
            <span>Enter Video Room</span>
          </a>
          <button onclick="MediSlotModals.close()" class="flex-1 bg-surface-container text-on-surface py-2.5 rounded-full font-bold text-xs border border-[#1E293B]">
            Close
          </button>
        </div>
      </div>
    `);
  }
};
