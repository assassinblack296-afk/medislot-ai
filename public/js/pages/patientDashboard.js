// MediSlot AI - Patient Portal & Care Records (Clean, Uncluttered & Live)
window.PatientDashboardPage = {
  render() {
    const p = MediSlotStore.patient;

    return `
      <div class="flex flex-col w-full pb-20">
        <div class="px-4 sm:px-gutter py-space-lg flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
          
          <!-- WELCOME HERO BANNER -->
          <div class="relative overflow-hidden bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div class="flex flex-col gap-space-xs">
              <div class="flex flex-wrap items-center gap-space-sm">
                <span class="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-tertiary-fixed border-2 border-[#1E293B] text-on-tertiary-fixed font-label-sm text-label-sm shadow-[2px_2px_0px_#1E293B] font-bold">
                  <span class="material-symbols-outlined text-[15px]">badge</span> MRN: ${p.mrn}
                </span>
                <span class="text-xs text-on-surface-variant font-semibold">Insurance: ${p.insuranceProvider}</span>
              </div>
              <h1 class="font-headline-lg text-3xl sm:text-headline-lg text-on-surface tracking-tight flex items-center gap-2 mt-1 font-bold">
                Welcome back, ${p.name}!
              </h1>
              <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Manage your medical consultations, schedule appointments with top specialists, and review past care summaries.
              </p>
            </div>

            <div class="flex items-center gap-space-sm self-start md:self-auto">
              <a href="#book-appointment" class="flex items-center gap-2 px-space-md py-2.5 bg-primary text-on-primary font-label-md text-label-md font-bold rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                <span class="material-symbols-outlined text-[18px]">calendar_today</span>
                <span>Book New Consultation</span>
              </a>
            </div>
          </div>

          <!-- 3 STREAMLINED STAT CARDS (Direct from Database) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <div class="bg-primary-fixed border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex items-center justify-between">
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-fixed font-bold">Total Appointments</span>
                <span class="font-headline-xl text-headline-xl text-on-primary-fixed font-extrabold" id="stat-total">--</span>
                <span class="font-body-sm text-body-sm text-on-primary-fixed-variant font-semibold">All clinic encounters</span>
              </div>
              <div class="w-12 h-12 rounded-full bg-white border-2 border-[#1E293B] flex items-center justify-center text-primary font-bold shadow-[2px_2px_0px_#1E293B]">
                <span class="material-symbols-outlined text-[24px]">calendar_month</span>
              </div>
            </div>

            <div class="bg-[#D1FAE5] border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex items-center justify-between">
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm uppercase tracking-wider text-[#065F46] font-bold">Upcoming Visits</span>
                <span class="font-headline-xl text-headline-xl text-[#065F46] font-extrabold" id="stat-upcoming">--</span>
                <span class="font-body-sm text-body-sm text-[#047857] font-semibold">Scheduled and confirmed</span>
              </div>
              <div class="w-12 h-12 rounded-full bg-white border-2 border-[#1E293B] flex items-center justify-center text-[#065F46] font-bold shadow-[2px_2px_0px_#1E293B]">
                <span class="material-symbols-outlined text-[24px]">schedule</span>
              </div>
            </div>

            <div class="bg-tertiary-fixed border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex items-center justify-between">
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-fixed font-bold">Completed Visits</span>
                <span class="font-headline-xl text-headline-xl text-on-tertiary-fixed font-extrabold" id="stat-completed">--</span>
                <span class="font-body-sm text-body-sm text-on-tertiary-fixed-variant font-semibold">Attended consultations</span>
              </div>
              <div class="w-12 h-12 rounded-full bg-white border-2 border-[#1E293B] flex items-center justify-center text-tertiary font-bold shadow-[2px_2px_0px_#1E293B]">
                <span class="material-symbols-outlined text-[24px]">check_circle</span>
              </div>
            </div>
          </div>

          <!-- NEXT UPCOMING APPOINTMENT -->
          <div class="flex flex-col gap-space-xs">
            <div class="flex items-center justify-between px-space-xs mb-1">
              <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Next Scheduled Visit</h2>
            </div>
            <div id="featured-appointment-card">
              <div class="p-8 text-center bg-surface-container-low border-2 border-[#1E293B] rounded-xl text-outline">
                Loading upcoming appointment...
              </div>
            </div>
          </div>

          <!-- RECOMMENDED SPECIALISTS -->
          <div class="flex flex-col gap-space-md mt-space-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm px-space-xs">
              <div>
                <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Recommended Specialists</h2>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Top-rated faculty clinicians available for consultation.</p>
              </div>
              <a href="#find-doctors" class="font-label-md text-label-md text-primary hover:text-secondary flex items-center gap-1 font-bold underline">
                View All Specialists <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md" id="dashboard-recommended-doctors">
              <!-- Dynamically populated -->
            </div>
          </div>

          <!-- CARE RECORDS TABLE -->
          <div class="flex flex-col gap-space-xs mt-space-sm">
            <div class="flex items-center justify-between px-space-xs mb-1">
              <h2 class="font-headline-md text-headline-md text-on-surface font-bold">All Consultations & History</h2>
              <div class="flex items-center gap-2">
                <button onclick="PatientDashboardPage.exportCareSummary()" class="text-xs font-bold text-on-surface bg-surface-container px-3 py-1.5 rounded-full border border-[#1E293B] flex items-center gap-1 hover:bg-surface-container-high">
                  <span class="material-symbols-outlined text-[16px]">download</span> Export Records
                </button>
                <button onclick="PatientDashboardPage.loadAppointments()" class="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                  <span class="material-symbols-outlined text-[16px]">refresh</span> Refresh
                </button>
              </div>
            </div>

            <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl shadow-[4px_4px_0px_#1E293B] overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr class="bg-surface-container border-b-2 border-[#1E293B] text-xs uppercase font-bold text-on-surface">
                    <th class="py-3 px-space-md">Date & Time</th>
                    <th class="py-3 px-space-md">Clinician</th>
                    <th class="py-3 px-space-md">Reason for Visit</th>
                    <th class="py-3 px-space-md">Consult Mode</th>
                    <th class="py-3 px-space-md">Status</th>
                    <th class="py-3 px-space-md text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y-2 divide-[#1E293B]/20" id="recent-records-tbody">
                  <tr><td colspan="6" class="p-4 text-center text-outline">Loading care records...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  async afterRender() {
    await this.loadAppointments();
    await this.loadRecommendedDoctors();
  },

  async loadAppointments() {
    try {
      const res = await fetch('/api/appointments?patientId=1');
      const data = await res.json();
      if (!data.success) return;

      const appts = data.all || [];
      const upcoming = data.upcoming || [];
      const completed = data.completed || [];

      // Update counters directly from real DB records
      const statTotal = document.getElementById('stat-total');
      const statUp = document.getElementById('stat-upcoming');
      const statComp = document.getElementById('stat-completed');
      if (statTotal) statTotal.innerText = appts.length;
      if (statUp) statUp.innerText = upcoming.length;
      if (statComp) statComp.innerText = completed.length;

      // Render Featured Upcoming
      const featuredCard = document.getElementById('featured-appointment-card');
      if (featuredCard) {
        if (upcoming.length === 0) {
          featuredCard.innerHTML = `
            <div class="p-8 text-center bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl shadow-[3px_3px_0px_#1E293B]">
              <span class="material-symbols-outlined text-4xl text-outline">event_available</span>
              <p class="font-headline-sm text-base font-bold text-on-surface mt-2">No upcoming appointments scheduled.</p>
              <p class="text-xs text-on-surface-variant mt-1">Book an appointment whenever you need care or a specialist review.</p>
              <a href="#find-doctors" class="mt-4 inline-block bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5">
                Find a Doctor
              </a>
            </div>
          `;
        } else {
          const next = upcoming[0];
          featuredCard.innerHTML = `
            <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
              <div class="flex items-center gap-space-md">
                <div class="w-16 h-16 rounded-full border-2 border-[#1E293B] overflow-hidden shrink-0 bg-primary-fixed shadow-[2px_2px_0px_#1E293B]">
                  <img src="${next.doctor_avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS75Y3hTNWY5IwCstLJLUr6QZZlz6X102tQsUOIkf4-WdIakpQ4f1HaoJu85lNz5ZU6AXWOe2ROpbOOdZAoZsxU-ip90PZLOOjodjQv-wvKqcpMtLq7zUxyTmk9muJiHBM4DonV6gebg0bHowkgng0v9NoJ1r8IxyEwLy0DaiEtvjktdgdUtnTN1T96iv3k_fnD3V9MITq7OpUd_BPf0QHgGv51gZBMrN51AQu6bQ'}" class="w-full h-full object-cover" alt="${next.doctor_name}"/>
                </div>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-headline-sm text-xl font-bold text-on-surface">${next.doctor_name}</span>
                    <span class="bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#1E293B]">${next.doctor_specialty}</span>
                  </div>
                  <span class="text-xs text-secondary font-bold block mt-0.5">${next.doctor_clinic}</span>
                  <span class="text-xs font-semibold text-on-surface-variant block mt-1">
                    📅 ${next.appointment_date} at ${next.appointment_time} • ${next.consult_mode === 'telehealth' ? '📹 Video Consult' : '🏥 In-Person Clinic (Suite 402)'}
                  </span>
                  <span class="text-xs text-outline block mt-0.5 font-mono">Pass Code: <strong>${next.booking_code}</strong></span>
                  ${next.symptoms ? `<p class="text-xs text-on-surface-variant mt-1 italic">"${next.symptoms}"</p>` : ''}
                </div>
              </div>

              <div class="flex items-center gap-2 flex-wrap self-end md:self-auto">
                <button onclick="PatientDashboardPage.selfCheckIn(${next.id})" class="bg-[#10B981] text-white border-2 border-[#1E293B] px-4 py-2 rounded-full text-xs font-bold shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5">
                  Self Check-In
                </button>
                <button onclick="MediSlotModals.showRescheduleModal(${next.id})" class="bg-surface-container text-on-surface border border-[#1E293B] px-3 py-2 rounded-full text-xs font-bold hover:bg-surface-container-high">
                  Reschedule
                </button>
                <button onclick="PatientDashboardPage.cancelAppointment(${next.id})" class="bg-surface-container text-error border border-[#1E293B] px-3 py-2 rounded-full text-xs font-bold hover:bg-red-50">
                  Cancel Visit
                </button>
              </div>
            </div>
          `;
        }
      }

      // Render Records Table
      const tbody = document.getElementById('recent-records-tbody');
      if (tbody) {
        if (appts.length === 0) {
          tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-outline">No records found.</td></tr>`;
        } else {
          tbody.innerHTML = appts.map(a => `
            <tr class="hover:bg-surface-container-low transition-colors text-xs font-medium">
              <td class="py-3 px-space-md font-bold text-on-surface">
                ${a.appointment_date} <br/>
                <span class="text-outline font-normal">${a.appointment_time}</span>
              </td>
              <td class="py-3 px-space-md font-bold text-on-surface">
                ${a.doctor_name} <br/>
                <span class="text-secondary font-semibold text-[11px]">${a.doctor_specialty}</span>
              </td>
              <td class="py-3 px-space-md text-on-surface-variant max-w-xs truncate">
                ${a.symptoms || 'Routine checkup'}
              </td>
              <td class="py-3 px-space-md">
                ${a.consult_mode === 'telehealth' ? '📹 Video' : '🏥 In-Person'}
              </td>
              <td class="py-3 px-space-md">
                <span class="px-2 py-0.5 rounded-full text-xs font-bold border border-[#1E293B] ${a.status === 'confirmed' ? 'bg-primary-fixed text-on-primary-fixed' :
              a.status === 'completed' || a.status === 'checked_in' ? 'bg-[#D1FAE5] text-[#065F46]' :
                'bg-red-100 text-red-800'
            }">
                  ${a.status.replace('_', ' ')}
                </span>
              </td>
              <td class="py-3 px-space-md text-right">
                <div class="flex items-center justify-end gap-1.5">
                  ${a.status === 'confirmed' ? `
                    <button onclick="MediSlotModals.showRescheduleModal(${a.id})" class="text-xs text-primary font-bold hover:underline">
                      Reschedule
                    </button>
                    <span class="text-outline">|</span>
                    <button onclick="PatientDashboardPage.cancelAppointment(${a.id})" class="text-xs text-error font-bold hover:underline">
                      Cancel
                    </button>
                  ` : `
                    <button onclick="MediSlotModals.showPdfSummaryModal(${a.id})" class="text-xs text-primary font-bold hover:underline">
                      View Pass
                    </button>
                  `}
                </div>
              </td>
            </tr>
          `).join('');
        }
      }
    } catch (e) {
      console.error('[PatientDashboard] Error loading appointments:', e);
    }
  },

  async loadRecommendedDoctors() {
    const doctors = await MediSlotStore.fetchDoctors();
    const container = document.getElementById('dashboard-recommended-doctors');
    if (!container || doctors.length === 0) return;

    container.innerHTML = doctors.slice(0, 3).map(doc => `
      <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex flex-col justify-between gap-space-md hover:-translate-y-1 transition-transform">
        <div class="flex items-start gap-3">
          <div class="relative w-14 h-14 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] overflow-hidden bg-primary-fixed shrink-0">
            <img src="${doc.avatar_url}" class="w-full h-full object-cover" alt="${doc.name}"/>
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-1">
              <h3 class="font-headline-sm text-sm font-bold text-on-surface truncate">${doc.name}</h3>
              <span class="material-symbols-outlined text-[#10B981] text-[16px]">verified</span>
            </div>
            <span class="font-label-sm text-xs text-primary font-bold truncate">${doc.specialty} • ${doc.clinic}</span>
            <div class="flex items-center gap-2 mt-1 text-xs">
              <span class="text-tertiary font-bold">★ ${doc.rating}</span>
              <span class="text-outline">(${doc.review_count})</span>
              <span class="font-extrabold text-on-surface">$${doc.fee}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-[#1E293B]/20">
          <span class="text-xs text-on-surface-variant font-semibold">Earliest: ${doc.earliest_slot}</span>
          <button onclick="MediSlotModals.bookDoctorDirect(${doc.id})" class="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold border border-[#1E293B] shadow-[1px_1px_0px_#1E293B] hover:-translate-y-0.5">
            Book
          </button>
        </div>
      </div>
    `).join('');
  },

  async selfCheckIn(apptId) {
    try {
      const res = await fetch(`/api/appointments/${apptId}/checkin`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Check-in confirmed! Proceed to Room 402 waiting area.', 'success');
        await this.loadAppointments();
      } else {
        showToast(data.error || 'Failed to check in', 'error');
      }
    } catch (e) {
      showToast('Check-in error: ' + e.message, 'error');
    }
  },

  async cancelAppointment(apptId) {
    if (!confirm('Are you sure you want to cancel this appointment? Your time slot will be released.')) return;
    try {
      const res = await fetch(`/api/appointments/${apptId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Patient cancelled from portal' })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Appointment cancelled successfully.', 'info');
        await this.loadAppointments();
      } else {
        showToast(data.error || 'Failed to cancel', 'error');
      }
    } catch (e) {
      showToast('Cancellation error: ' + e.message, 'error');
    }
  },

  exportCareSummary() {
    MediSlotModals.showPdfSummaryModal(1);
  }
};
