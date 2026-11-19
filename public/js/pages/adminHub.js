// MediSlot AI - Admin Operations Hub (Clean, Practical & Live-Database Connected)
window.AdminHubPage = {
  currentTab: 'overview', // 'overview', 'appointments', 'doctors', 'patients'
  metrics: null,
  doctors: [],
  appointments: [],
  patients: [],

  render() {
    return `
      <div class="flex flex-col w-full pb-20">
        <div class="px-4 sm:px-gutter py-space-lg flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
          
          <!-- Admin Header -->
          <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md sm:p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div>
              <div class="inline-flex items-center gap-1.5 bg-red-100 text-red-800 px-3 py-0.5 rounded-full border border-[#1E293B] font-label-sm text-xs font-bold uppercase mb-2">
                <span class="w-2 h-2 rounded-full bg-red-600"></span>
                <span>System Administration</span>
              </div>
              <h1 class="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-extrabold">MediSlot Clinical Operations Hub</h1>
              <p class="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">
                Comprehensive healthcare operations: Clinician roster, patient directory, master scheduling, and system capacity.
              </p>
            </div>

            <div class="flex items-center gap-2 self-start md:self-auto">
              <button onclick="AdminHubPage.loadAllData()" class="bg-primary text-white border-2 border-[#1E293B] px-4 py-2 rounded-full font-label-md text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[18px]">refresh</span>
                <span>Refresh Hub</span>
              </button>
            </div>
          </div>

          <!-- Real Essential Statistics Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-space-sm sm:gap-space-md">
            <div class="bg-primary-fixed border-2 border-[#1E293B] rounded-xl p-space-sm sm:p-space-md shadow-[3px_3px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-on-primary-fixed">Active Clinicians</span>
              <div id="admin-stat-doctors" class="font-headline-xl text-2xl sm:text-3xl font-extrabold text-on-primary-fixed mt-1">--</div>
              <span class="text-xs text-on-primary-fixed-variant font-semibold">On-duty faculty</span>
            </div>
            <div class="bg-[#D1FAE5] border-2 border-[#1E293B] rounded-xl p-space-sm sm:p-space-md shadow-[3px_3px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-[#065F46]">Registered Patients</span>
              <div id="admin-stat-patients" class="font-headline-xl text-2xl sm:text-3xl font-extrabold text-[#065F46] mt-1">--</div>
              <span class="text-xs text-[#047857] font-semibold">Active health charts</span>
            </div>
            <div class="bg-secondary-fixed border-2 border-[#1E293B] rounded-xl p-space-sm sm:p-space-md shadow-[3px_3px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-on-secondary-fixed">Total Bookings</span>
              <div id="admin-stat-appts" class="font-headline-xl text-2xl sm:text-3xl font-extrabold text-on-secondary-fixed mt-1">--</div>
              <span class="text-xs text-on-secondary-fixed-variant font-semibold">Recorded in database</span>
            </div>
            <div class="bg-tertiary-fixed border-2 border-[#1E293B] rounded-xl p-space-sm sm:p-space-md shadow-[3px_3px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-on-tertiary-fixed">Slot Utilization</span>
              <div id="admin-stat-util" class="font-headline-xl text-2xl sm:text-3xl font-extrabold text-on-tertiary-fixed mt-1">--</div>
              <span class="text-xs text-on-tertiary-fixed-variant font-semibold">Booked capacity</span>
            </div>
          </div>

          <!-- Tab Navigation Container -->
          <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md sm:p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col gap-space-md">
            
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-space-sm border-b-2 border-[#1E293B]">
              <button onclick="AdminHubPage.setTab('overview')" class="admin-tab-btn px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] ${this.currentTab === 'overview' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface'}" data-tab="overview">
                Master Appointments
              </button>
              <button onclick="AdminHubPage.setTab('doctors')" class="admin-tab-btn px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] ${this.currentTab === 'doctors' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface'}" data-tab="doctors">
                Clinicians Roster
              </button>
              <button onclick="AdminHubPage.setTab('patients')" class="admin-tab-btn px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] ${this.currentTab === 'patients' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface'}" data-tab="patients">
                Patient Directory
              </button>
              <button onclick="AdminHubPage.setTab('roles')" class="admin-tab-btn px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] ${this.currentTab === 'roles' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface'}" data-tab="roles">
                Role Permissions
              </button>
            </div>

            <!-- Tab Content Workspace -->
            <div id="admin-tab-content">
              <!-- Dynamically populated -->
            </div>

          </div>

        </div>
      </div>
    `;
  },

  async afterRender() {
    await this.loadAllData();
  },

  setTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      const t = btn.getAttribute('data-tab');
      if (t === tab) {
        btn.className = 'admin-tab-btn px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] bg-primary text-white';
      } else {
        btn.className = 'admin-tab-btn px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] bg-surface-container-low text-on-surface hover:bg-surface-container';
      }
    });
    this.renderCurrentTab();
  },

  async loadAllData() {
    await Promise.all([
      this.loadMetrics(),
      this.loadDoctors(),
      this.loadAppointments(),
      this.loadPatients()
    ]);
    this.renderCurrentTab();
  },

  async loadMetrics() {
    try {
      const data = await MediSlotStore.fetchAdminMetrics();
      if (data.success && data.metrics) {
        this.metrics = data.metrics;
        const m = data.metrics;
        const docEl = document.getElementById('admin-stat-doctors');
        const patEl = document.getElementById('admin-stat-patients');
        const apptEl = document.getElementById('admin-stat-appts');
        const utilEl = document.getElementById('admin-stat-util');
        if (docEl) docEl.innerText = m.totalClinicians || 0;
        if (patEl) patEl.innerText = m.totalPatients || 0;
        if (apptEl) apptEl.innerText = m.totalBookings || 0;
        if (utilEl) utilEl.innerText = m.capacityUtilization || '0%';
      }
    } catch (e) {
      console.error('[AdminHub] Error loading metrics:', e);
    }
  },

  async loadDoctors() {
    try {
      const data = await MediSlotStore.fetchAdminDoctors();
      if (data.success && data.doctors) {
        this.doctors = data.doctors;
      }
    } catch (e) {
      console.error('[AdminHub] Error loading doctors:', e);
    }
  },

  async loadAppointments() {
    try {
      const data = await MediSlotStore.fetchAdminAppointments();
      if (data.success && data.appointments) {
        this.appointments = data.appointments;
      }
    } catch (e) {
      console.error('[AdminHub] Error loading appointments:', e);
    }
  },

  async loadPatients() {
    try {
      const data = await MediSlotStore.fetchAdminPatients();
      if (data.success && data.patients) {
        this.patients = data.patients;
      }
    } catch (e) {
      console.error('[AdminHub] Error loading patients:', e);
    }
  },

  renderCurrentTab() {
    const container = document.getElementById('admin-tab-content');
    if (!container) return;

    if (this.currentTab === 'overview') {
      this.renderAppointmentsTab(container);
    } else if (this.currentTab === 'doctors') {
      this.renderDoctorsTab(container);
    } else if (this.currentTab === 'patients') {
      this.renderPatientsTab(container);
    } else if (this.currentTab === 'roles') {
      this.renderRolesTab(container);
    }
  },

  renderAppointmentsTab(container) {
    const appts = this.appointments || [];
    container.innerHTML = `
      <div class="flex flex-col gap-space-sm">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 class="font-headline-sm text-base font-bold text-on-surface">Master Appointment Oversight</h3>
            <p class="font-body-sm text-xs text-on-surface-variant">Real-time appointments scheduled across all clinicians and clinics.</p>
          </div>
          <span class="text-xs font-mono font-bold bg-surface-container px-2.5 py-1 rounded border border-[#1E293B]">
            Total: ${appts.length} Bookings
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr class="bg-surface-container border-b-2 border-[#1E293B] text-xs font-bold uppercase tracking-wider text-on-surface">
                <th class="py-3 px-space-md">Code</th>
                <th class="py-3 px-space-md">Patient</th>
                <th class="py-3 px-space-md">Doctor & Specialty</th>
                <th class="py-3 px-space-md">Date & Time</th>
                <th class="py-3 px-space-md">Consult Mode</th>
                <th class="py-3 px-space-md">Status</th>
                <th class="py-3 px-space-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y-2 divide-[#1E293B]/20 text-xs font-medium">
              ${appts.length === 0 ? '<tr><td colspan="7" class="p-6 text-center text-outline">No appointments in database.</td></tr>' : 
                appts.map(a => {
                  const statusBg = 
                    a.status === 'confirmed' ? 'bg-primary-fixed text-on-primary-fixed' :
                    a.status === 'checked_in' ? 'bg-secondary text-white' :
                    a.status === 'completed' ? 'bg-[#D1FAE5] text-[#065F46]' :
                    'bg-red-100 text-red-800';

                  return `
                    <tr class="hover:bg-surface-container-low transition-colors">
                      <td class="py-3 px-space-md font-mono font-bold text-on-surface">${a.booking_code}</td>
                      <td class="py-3 px-space-md font-bold text-on-surface">
                        ${a.patient_name}
                        <span class="text-outline block text-[10px] font-mono">${a.patient_mrn || ''}</span>
                      </td>
                      <td class="py-3 px-space-md">
                        <span class="font-bold block">${a.doctor_name}</span>
                        <span class="text-secondary text-[11px]">${a.doctor_specialty}</span>
                      </td>
                      <td class="py-3 px-space-md font-semibold">
                        ${a.appointment_date} <br/>
                        <span class="text-outline font-normal">${a.appointment_time}</span>
                      </td>
                      <td class="py-3 px-space-md">
                        ${a.consult_mode === 'telehealth' ? '📹 Telehealth' : '🏥 In-Person'}
                      </td>
                      <td class="py-3 px-space-md">
                        <span class="px-2 py-0.5 rounded-full text-xs font-bold border border-[#1E293B] ${statusBg}">
                          ${a.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td class="py-3 px-space-md text-right">
                        ${a.status !== 'cancelled' ? `
                          <button onclick="AdminHubPage.cancelAppointment(${a.id})" class="text-xs text-error font-bold hover:underline">
                            Cancel Slot
                          </button>
                        ` : `<span class="text-outline">Released</span>`}
                      </td>
                    </tr>
                  `;
                }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderDoctorsTab(container) {
    const docs = this.doctors || [];
    container.innerHTML = `
      <div class="flex flex-col gap-space-sm">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 class="font-headline-sm text-base font-bold text-on-surface">Doctor Management</h3>
            <p class="font-body-sm text-xs text-on-surface-variant">Active clinician credentials, clinic assignments, and consultation fees.</p>
          </div>
          <span class="text-xs font-mono font-bold bg-surface-container px-2.5 py-1 rounded border border-[#1E293B]">
            ${docs.length} Clinicians Registered
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr class="bg-surface-container border-b-2 border-[#1E293B] text-xs font-bold uppercase tracking-wider text-on-surface">
                <th class="py-3 px-space-md">Clinician Name</th>
                <th class="py-3 px-space-md">Specialty & Clinic</th>
                <th class="py-3 px-space-md">Experience</th>
                <th class="py-3 px-space-md">Rating</th>
                <th class="py-3 px-space-md">Visit Fee</th>
                <th class="py-3 px-space-md">Appointments</th>
                <th class="py-3 px-space-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y-2 divide-[#1E293B]/20 text-xs font-medium">
              ${docs.map(d => `
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-3 px-space-md font-bold text-on-surface">
                    <div class="flex items-center gap-2">
                      <img src="${d.avatar_url}" class="w-8 h-8 rounded-full border border-[#1E293B] object-cover" alt="${d.name}"/>
                      <div>
                        <span>${d.name}</span>
                        <span class="text-[10px] text-outline block font-normal">${d.title}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-space-md text-on-surface-variant font-semibold">
                    ${d.specialty} <br/>
                    <span class="text-outline text-[11px] font-normal">${d.clinic}</span>
                  </td>
                  <td class="py-3 px-space-md">${d.experience_yrs} yrs</td>
                  <td class="py-3 px-space-md font-bold text-tertiary">★ ${d.rating}</td>
                  <td class="py-3 px-space-md font-extrabold text-primary">$${d.fee}</td>
                  <td class="py-3 px-space-md font-bold">${d.appointment_count || 0}</td>
                  <td class="py-3 px-space-md text-right">
                    <button onclick="MediSlotModals.showDoctorProfile(${d.id})" class="text-xs bg-surface-container border border-[#1E293B] px-2.5 py-1 rounded font-bold hover:bg-surface-container-highest">
                      View Profile
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderPatientsTab(container) {
    const pats = this.patients || [];
    container.innerHTML = `
      <div class="flex flex-col gap-space-sm">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 class="font-headline-sm text-base font-bold text-on-surface">Patient Directory</h3>
            <p class="font-body-sm text-xs text-on-surface-variant">Verified patient records, medical record numbers (MRN), and insurance details.</p>
          </div>
          <span class="text-xs font-mono font-bold bg-surface-container px-2.5 py-1 rounded border border-[#1E293B]">
            ${pats.length} Patients
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr class="bg-surface-container border-b-2 border-[#1E293B] text-xs font-bold uppercase tracking-wider text-on-surface">
                <th class="py-3 px-space-md">Patient Name</th>
                <th class="py-3 px-space-md">MRN</th>
                <th class="py-3 px-space-md">Email & Phone</th>
                <th class="py-3 px-space-md">Insurance Carrier</th>
                <th class="py-3 px-space-md">Total Visits</th>
              </tr>
            </thead>
            <tbody class="divide-y-2 divide-[#1E293B]/20 text-xs font-medium">
              ${pats.map(p => `
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-3 px-space-md font-bold text-on-surface">
                    ${p.name}
                    <span class="text-outline block text-[10px] font-normal">DOB: ${p.dob}</span>
                  </td>
                  <td class="py-3 px-space-md font-mono font-bold text-primary">${p.mrn}</td>
                  <td class="py-3 px-space-md text-on-surface-variant">
                    ${p.email} <br/>
                    <span class="text-outline font-normal">${p.phone}</span>
                  </td>
                  <td class="py-3 px-space-md font-semibold">
                    ${p.insurance_provider} <br/>
                    <span class="text-[10px] font-mono text-outline font-normal">ID: ${p.insurance_id}</span>
                  </td>
                  <td class="py-3 px-space-md font-bold">${p.appointment_count || 0}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderRolesTab(container) {
    container.innerHTML = `
      <div class="flex flex-col gap-space-md">
        <div>
          <h3 class="font-headline-sm text-base font-bold text-on-surface">Role-Based Access Control (RBAC)</h3>
          <p class="font-body-sm text-xs text-on-surface-variant">Configured security permissions across user roles.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div class="p-4 rounded-xl border-2 border-[#1E293B] bg-primary-fixed/20 shadow-[2px_2px_0px_#1E293B] flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[22px]">person</span>
              <h4 class="font-headline-sm text-sm font-bold">Patient Role</h4>
            </div>
            <p class="text-xs text-on-surface-variant">Authorized to search clinicians, schedule appointments, self check-in, reschedule, cancel visits, and review personal care history.</p>
            <span class="text-[11px] font-mono font-bold bg-white p-1 rounded border border-[#1E293B]/30 mt-auto">Demo: alex.morgan@healthmail.com</span>
          </div>

          <div class="p-4 rounded-xl border-2 border-[#1E293B] bg-secondary-fixed/20 shadow-[2px_2px_0px_#1E293B] flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-[22px]">stethoscope</span>
              <h4 class="font-headline-sm text-sm font-bold">Doctor Role</h4>
            </div>
            <p class="text-xs text-on-surface-variant">Authorized to view daily clinic queue, review patient intake details, update encounter status (Check in / Completed), toggle availability slots, and launch telehealth video.</p>
            <span class="text-[11px] font-mono font-bold bg-white p-1 rounded border border-[#1E293B]/30 mt-auto">Demo: sarah.jenkins@stanfordhealth.org</span>
          </div>

          <div class="p-4 rounded-xl border-2 border-[#1E293B] bg-red-50 shadow-[2px_2px_0px_#1E293B] flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-red-600 text-[22px]">admin_panel_settings</span>
              <h4 class="font-headline-sm text-sm font-bold">Administrator Role</h4>
            </div>
            <p class="text-xs text-on-surface-variant">Full clinic oversight: Master appointment cancel/override, doctor roster inspection, patient directory review, and system capacity monitoring.</p>
            <span class="text-[11px] font-mono font-bold bg-white p-1 rounded border border-[#1E293B]/30 mt-auto">Demo: admin@medislot.ai</span>
          </div>
        </div>
      </div>
    `;
  },

  async cancelAppointment(apptId) {
    if (!confirm('Are you sure you want to cancel this appointment as Administrator? The slot will be released back to the clinic.')) return;
    try {
      const res = await MediSlotStore.cancelAppointment(apptId, 'Administrative cancellation by clinic operations');
      if (res.success) {
        showToast('Appointment cancelled and slot released.', 'info');
        await this.loadAllData();
      } else {
        showToast(res.error || 'Failed to cancel', 'error');
      }
    } catch (e) {
      showToast('Error: ' + e.message, 'error');
    }
  }
};
