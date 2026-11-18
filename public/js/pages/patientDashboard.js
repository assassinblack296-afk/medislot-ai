// MediSlot AI - Patient Portal / Dashboard View
window.PatientDashboardPage = {
  render() {
    const p = MediSlotStore.patient;

    return `
      <div class="flex flex-col w-full pb-20">
        <div class="px-4 sm:px-gutter py-space-lg flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
          
          <!-- WELCOME HERO BANNER -->
          <div class="relative overflow-hidden bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <!-- Decorative Neo-Brutalist geometric shapes in background -->
            <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-secondary-fixed/50 border-2 border-[#1E293B] pointer-events-none -z-0"></div>
            <div class="absolute right-36 -top-4 w-12 h-12 bg-tertiary-fixed rotate-12 border-2 border-[#1E293B] pointer-events-none -z-0"></div>
            
            <div class="relative z-10 flex flex-col gap-space-xs">
              <div class="flex flex-wrap items-center gap-space-sm">
                <span class="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container-highest border-2 border-[#1E293B] text-on-surface font-label-sm text-label-sm shadow-[2px_2px_0px_#1E293B] font-bold">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-[#1E293B]"></span>
                  AI Schedule Optimizer: Active
                </span>
                <span class="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-tertiary-fixed border-2 border-[#1E293B] text-on-tertiary-fixed font-label-sm text-label-sm shadow-[2px_2px_0px_#1E293B] font-bold">
                  <span class="material-symbols-outlined text-[15px]">auto_awesome</span> ${p.mrn}
                </span>
              </div>
              <h1 class="font-headline-lg text-3xl sm:text-headline-lg text-on-surface tracking-tight flex items-center gap-2 mt-1 font-bold">
                Welcome back, ${p.name}! <span class="text-tertiary text-2xl">✦</span>
              </h1>
              <p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                MediSlot AI dynamically synchronized your clinical pipeline. You have <strong class="text-on-surface font-bold">1 appointment tomorrow</strong> with Dr. Sarah Jenkins and 0 intake conflicts.
              </p>
            </div>

            <div class="relative z-10 flex items-center gap-space-sm self-start md:self-auto">
              <a href="#book-appointment" class="flex items-center gap-2 px-space-md py-2.5 bg-primary text-on-primary font-label-md text-label-md font-bold rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                <span class="material-symbols-outlined text-[18px]">calendar_today</span>
                <span>Book New Consultation</span>
              </a>
            </div>
          </div>

          <!-- 4 STICKER STAT CARDS -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md" id="dashboard-stat-cards">
            <!-- Stat 1 -->
            <div class="bg-primary-fixed border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex items-center justify-between hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1E293B] transition-transform">
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-fixed font-bold">Total Appointments</span>
                <span class="font-headline-xl text-headline-xl text-on-primary-fixed font-extrabold" id="stat-total">14</span>
                <span class="font-body-sm text-body-sm text-on-primary-fixed-variant flex items-center gap-1 font-semibold">
                  <span class="material-symbols-outlined text-[14px]">insights</span> Since Jan 2024
                </span>
              </div>
              <div class="w-13 h-13 p-3 rounded-full bg-surface-container-lowest border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-[26px]">calendar_month</span>
              </div>
            </div>

            <!-- Stat 2 -->
            <div class="bg-[#D1FAE5] border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex items-center justify-between hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1E293B] transition-transform">
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm uppercase tracking-wider text-[#065F46] font-bold">Upcoming Visits</span>
                <span class="font-headline-xl text-headline-xl text-[#065F46] font-extrabold" id="stat-upcoming">2</span>
                <span class="font-body-sm text-body-sm text-[#047857] flex items-center gap-1 font-semibold">
                  <span class="material-symbols-outlined text-[14px]">alarm</span> Next in 23 hrs
                </span>
              </div>
              <div class="w-13 h-13 p-3 rounded-full bg-surface-container-lowest border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-center text-[#059669]">
                <span class="material-symbols-outlined text-[26px]">schedule</span>
              </div>
            </div>

            <!-- Stat 3 -->
            <div class="bg-tertiary-fixed border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex items-center justify-between hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1E293B] transition-transform">
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-fixed font-bold">Completed Visits</span>
                <span class="font-headline-xl text-headline-xl text-on-tertiary-fixed font-extrabold" id="stat-completed">11</span>
                <span class="font-body-sm text-body-sm text-on-tertiary-fixed-variant flex items-center gap-1 font-semibold">
                  <span class="material-symbols-outlined text-[14px]">verified</span> 100% Attended
                </span>
              </div>
              <div class="w-13 h-13 p-3 rounded-full bg-surface-container-lowest border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-center text-tertiary">
                <span class="material-symbols-outlined text-[26px]">check_circle</span>
              </div>
            </div>

            <!-- Stat 4 -->
            <div class="bg-secondary-fixed border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex items-center justify-between hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1E293B] transition-transform">
              <div class="flex flex-col">
                <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-secondary-fixed font-bold">Rescheduled / Cancelled</span>
                <span class="font-headline-xl text-headline-xl text-on-secondary-fixed font-extrabold" id="stat-cancelled">1</span>
                <span class="font-body-sm text-body-sm text-on-secondary-fixed-variant flex items-center gap-1 font-semibold">
                  <span class="material-symbols-outlined text-[14px]">sync_alt</span> Auto-Reassigned
                </span>
              </div>
              <div class="w-13 h-13 p-3 rounded-full bg-surface-container-lowest border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-center text-secondary">
                <span class="material-symbols-outlined text-[26px]">event_busy</span>
              </div>
            </div>
          </div>

          <!-- MAIN TWO-COLUMN SECTION: FEATURED APPOINTMENT & AI BOT -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            
            <!-- FEATURED 'NEXT UPCOMING APPOINTMENT' (8 cols) -->
            <div class="lg:col-span-8 flex flex-col gap-space-xs" id="featured-upcoming-wrapper">
              <div class="flex items-center justify-between px-space-xs mb-1">
                <div class="flex items-center gap-2">
                  <span class="inline-block w-3 h-3 bg-secondary rounded-full border border-[#1E293B]"></span>
                  <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Next Upcoming Visit</h2>
                </div>
                <span class="font-label-sm text-label-sm bg-[#FEF3C7] text-[#92400E] border-2 border-[#1E293B] px-space-sm py-0.5 rounded-full font-bold shadow-[2px_2px_0px_#1E293B]">
                  Confirmed • Priority Queue
                </span>
              </div>

              <div id="featured-appointment-card">
                <!-- Dynamically populated or rendered below -->
              </div>
            </div>

            <!-- FRIENDLY AI BOT CARD: MEDIBOT (4 cols) -->
            <div class="lg:col-span-4 flex flex-col gap-space-xs">
              <div class="flex items-center justify-between px-space-xs mb-1">
                <div class="flex items-center gap-2">
                  <span class="inline-block w-3 h-3 bg-tertiary-fixed-dim rounded-full border border-[#1E293B]"></span>
                  <h2 class="font-headline-md text-headline-md text-on-surface font-bold">MediBot Clinical AI</h2>
                </div>
                <span class="material-symbols-outlined text-secondary text-[22px]">smart_toy</span>
              </div>

              <div class="bg-secondary-fixed/30 border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex flex-col justify-between h-full gap-space-md">
                <div class="flex flex-col gap-space-sm">
                  <div class="flex items-center gap-space-sm bg-surface-container-lowest border-2 border-[#1E293B] p-space-sm rounded-lg shadow-[2px_2px_0px_#1E293B]">
                    <div class="w-10 h-10 rounded-full bg-secondary-fixed border-2 border-[#1E293B] flex items-center justify-center text-secondary shrink-0 shadow-[1px_1px_0px_#1E293B]">
                      <span class="material-symbols-outlined text-[22px]">smart_toy</span>
                    </div>
                    <div class="flex flex-col">
                      <span class="font-label-md text-label-md text-on-surface font-extrabold">Instant Clinical Triaging</span>
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Ask pre-appointment or medical doubts</span>
                    </div>
                  </div>

                  <!-- Popular questions buttons -->
                  <div class="flex flex-col gap-2">
                    <span class="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase">Popular Questions</span>
                    <button onclick="MediBot.sendMessage('Can I take my medication before bloodwork?')" class="text-left font-body-sm text-body-sm bg-surface-container-lowest border-2 border-[#1E293B] p-2.5 rounded-lg shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container transition-colors flex items-center justify-between group" type="button">
                      <span>“Can I take my medication before bloodwork?”</span>
                      <span class="material-symbols-outlined text-[16px] text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                    <button onclick="MediBot.sendMessage('What documents should I carry for Stanford Clinic?')" class="text-left font-body-sm text-body-sm bg-surface-container-lowest border-2 border-[#1E293B] p-2.5 rounded-lg shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container transition-colors flex items-center justify-between group" type="button">
                      <span>“What documents should I carry tomorrow?”</span>
                      <span class="material-symbols-outlined text-[16px] text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                  </div>
                </div>

                <!-- Inline ask input box -->
                <div class="flex flex-col gap-2 mt-2">
                  <div class="relative">
                    <input id="dashboard-medibot-input" class="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline border-2 border-[#1E293B] rounded-lg px-space-md py-3 text-body-sm font-body-sm shadow-[2px_2px_0px_#1E293B] focus:outline-none focus:shadow-[4px_4px_0px_#6b38d4] pr-20" placeholder="Ask MediBot anything..." type="text"/>
                    <button onclick="PatientDashboardPage.submitInlineMediBot()" class="absolute right-2 top-2 px-3 py-1.5 bg-primary text-on-primary font-label-sm text-label-sm font-bold rounded-md border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:bg-primary-container active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1" type="button">
                      <span>Ask</span>
                      <span class="material-symbols-outlined text-[14px]">send</span>
                    </button>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-tertiary">lock</span> HIPAA • Encrypted Clinical Agent
                  </span>
                </div>
              </div>
            </div>

          </div>

          <!-- RECOMMENDED DOCTORS (AI SMART MATCH) -->
          <div class="flex flex-col gap-space-md mt-space-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm px-space-xs">
              <div>
                <div class="flex items-center gap-2">
                  <span class="inline-block w-3 h-3 bg-primary rounded-full border border-[#1E293B]"></span>
                  <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Recommended Doctors For You</h2>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Matched automatically based on your cardiovascular health chart &amp; routine intake schedule.</p>
              </div>
              <a href="#find-doctors" class="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant flex items-center gap-1 font-bold underline">
                View All Specialists <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md" id="dashboard-recommended-doctors">
              <!-- Dynamically populated -->
            </div>
          </div>

          <!-- RECENT CONSULTATIONS & HEALTHCARE MATRIX TABLE -->
          <div class="flex flex-col gap-space-xs mt-space-sm mb-space-lg">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm px-space-xs mb-1">
              <div class="flex items-center gap-2">
                <span class="inline-block w-3 h-3 bg-tertiary rounded-full border border-[#1E293B]"></span>
                <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Recent Consultations &amp; Care Records</h2>
              </div>
              <div class="flex items-center gap-space-sm">
                <button onclick="PatientDashboardPage.filterRecordsPrompt()" class="flex items-center gap-1 font-label-sm text-label-sm px-space-sm py-1.5 rounded-md bg-surface-container border border-[#1E293B] text-on-surface font-bold hover:bg-surface-container-high transition-colors" type="button">
                  <span class="material-symbols-outlined text-[16px]">filter_list</span> Filter
                </button>
                <button onclick="PatientDashboardPage.exportAllFhir()" class="flex items-center gap-1 font-label-sm text-label-sm px-space-sm py-1.5 rounded-md bg-surface-container border border-[#1E293B] text-on-surface font-bold hover:bg-surface-container-high transition-colors" type="button">
                  <span class="material-symbols-outlined text-[16px]">download</span> Export All (FHIR/PDF)
                </button>
              </div>
            </div>

            <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl shadow-[4px_4px_0px_#1E293B] overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr class="bg-surface-container border-b-2 border-[#1E293B]">
                    <th class="py-3 px-space-md font-label-md text-label-md text-on-surface uppercase tracking-wider">Date &amp; Time</th>
                    <th class="py-3 px-space-md font-label-md text-label-md text-on-surface uppercase tracking-wider">Doctor &amp; Specialty</th>
                    <th class="py-3 px-space-md font-label-md text-label-md text-on-surface uppercase tracking-wider">Visit Reason</th>
                    <th class="py-3 px-space-md font-label-md text-label-md text-on-surface uppercase tracking-wider">Status Sticker</th>
                    <th class="py-3 px-space-md font-label-md text-label-md text-on-surface uppercase tracking-wider text-right">Summary &amp; Rx</th>
                  </tr>
                </thead>
                <tbody class="divide-y-2 divide-[#1E293B]/20" id="recent-records-tbody">
                  <!-- Records rows -->
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  async afterRender() {
    const data = await MediSlotStore.fetchDashboardStats();
    if (data && data.stats) {
      document.getElementById('stat-total').innerText = data.stats.total;
      document.getElementById('stat-upcoming').innerText = data.stats.upcoming;
      document.getElementById('stat-completed').innerText = data.stats.completed;
      document.getElementById('stat-cancelled').innerText = data.stats.cancelled;
    }

    // Render Featured Next Upcoming Visit
    const apptsData = await MediSlotStore.fetchAppointments();
    const upcoming = (apptsData.upcoming || [])[0];
    const featuredCardContainer = document.getElementById('featured-appointment-card');

    if (featuredCardContainer) {
      if (!upcoming) {
        featuredCardContainer.innerHTML = `
          <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-lg shadow-[4px_4px_0px_#1E293B] text-center flex flex-col items-center gap-2">
            <span class="material-symbols-outlined text-4xl text-[#10B981]">event_available</span>
            <h3 class="font-headline-sm text-lg font-bold">No upcoming consultations pending</h3>
            <p class="font-body-sm text-on-surface-variant">Your health schedule is clear. Book an appointment whenever you need a consultation.</p>
            <a href="#book-appointment" class="mt-2 bg-primary text-white px-4 py-2 rounded-full font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
              Book Slot
            </a>
          </div>
        `;
      } else {
        featuredCardContainer.innerHTML = `
          <div class="relative bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col gap-space-md overflow-hidden">
            <!-- Ribbon -->
            <div class="flex flex-wrap items-center justify-between gap-space-sm border-b-2 border-[#1E293B] pb-space-sm">
              <div class="inline-flex items-center gap-1.5 bg-[#D1FAE5] border-2 border-[#1E293B] text-[#065F46] font-label-md text-label-md px-space-md py-1 rounded-full shadow-[2px_2px_0px_#1E293B] font-bold">
                <span class="material-symbols-outlined text-[16px]">verified</span>
                <span>✦ Verified Slot • Zero Wait Guarantee</span>
              </div>
              <div class="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant font-bold">
                <span class="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                <span>Check-in Code:</span>
                <span class="font-mono text-on-surface text-body-sm font-extrabold bg-surface-container px-2 py-0.5 rounded border border-[#1E293B]">
                  ${upcoming.booking_code}
                </span>
              </div>
            </div>

            <!-- Doctor Profile Block -->
            <div class="flex flex-col sm:flex-row gap-space-md items-start sm:items-center">
              <div class="relative w-20 h-20 rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] overflow-hidden shrink-0 bg-primary-fixed">
                <img src="${upcoming.doctor_avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCEM-BldEslf7nucOhX2R3mLsMvr1xj-wUk3zur3z3WcgdcQAoHTaiVi7aJlYISUwcMqyKROG1fXso52pRC9gsNImn_vgRldKNyAaBFRQ5brmwAbPbJ3EEU8T9jXhKvF7s0Vy2Re4pwL_CwQCxT3nFS7cu7NTw5fd8GXcjZtjE9rHdTO3V1m9VjMELHauayiS-FKWJswLPknK-1dOY0ln-BzZswUk1Mfkbhayh2mM'}" class="w-full h-full object-cover" alt="${upcoming.doctor_name}"/>
                <div class="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#10B981] border-2 border-[#1E293B] flex items-center justify-center">
                  <span class="material-symbols-outlined text-white text-[14px]">check</span>
                </div>
              </div>
              <div class="flex flex-col gap-1 grow">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-headline-sm text-headline-sm text-on-surface font-bold">${upcoming.doctor_name}</span>
                  <span class="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full border border-[#1E293B] font-bold">
                    ${upcoming.doctor_specialty}
                  </span>
                </div>
                <p class="font-body-md text-body-md text-on-surface-variant flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[18px] text-outline">local_hospital</span>
                  <span>${upcoming.doctor_clinic}</span>
                </p>
                <div class="flex flex-wrap items-center gap-space-sm text-on-surface font-label-md text-label-md mt-1">
                  <span class="inline-flex items-center gap-1 px-space-sm py-1 bg-surface-container border border-[#1E293B] rounded-md shadow-[1px_1px_0px_#1E293B] font-bold">
                    <span class="material-symbols-outlined text-primary text-[16px]">calendar_month</span>
                    ${upcoming.appointment_date}
                  </span>
                  <span class="inline-flex items-center gap-1 px-space-sm py-1 bg-surface-container border border-[#1E293B] rounded-md shadow-[1px_1px_0px_#1E293B] font-bold">
                    <span class="material-symbols-outlined text-primary text-[16px]">schedule</span>
                    ${upcoming.appointment_time} (45 min)
                  </span>
                  <span class="inline-flex items-center gap-1 px-space-sm py-1 bg-surface-container border border-[#1E293B] rounded-md shadow-[1px_1px_0px_#1E293B] font-bold">
                    <span class="material-symbols-outlined text-secondary text-[16px]">pin_drop</span>
                    ${upcoming.consult_mode === 'telehealth' ? 'Telehealth HD' : 'Suite 402-B (East Pavilion)'}
                  </span>
                </div>
              </div>
            </div>

            <!-- Clinical Prep notice -->
            <div class="bg-surface-container-low border-2 border-[#1E293B] rounded-lg p-space-sm flex items-start gap-space-sm shadow-[2px_2px_0px_#1E293B]">
              <span class="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-0.5">notification_important</span>
              <div class="flex flex-col">
                <span class="font-label-md text-label-md text-on-surface font-bold">Pre-Consultation Requirement</span>
                <p class="font-body-sm text-body-sm text-on-surface-variant">
                  ${upcoming.notes || 'Fasting required 6 hours prior for lipid and metabolic panel. Keep hydrated with water only.'}
                </p>
              </div>
            </div>

            <!-- Interactive Action Buttons -->
            <div class="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <button onclick="MediSlotModals.showCheckInKiosk(${upcoming.id})" class="flex items-center gap-2 bg-[#10B981] text-white font-label-md text-label-md font-bold px-space-md py-2.5 rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all" type="button">
                <span class="material-symbols-outlined text-[18px]">how_to_reg</span>
                <span>Join Check-In Kiosk</span>
              </button>
              <button onclick="MediSlotModals.showRescheduleModal(${upcoming.id})" class="flex items-center gap-1.5 bg-surface-container-lowest text-on-surface font-label-md text-label-md font-bold px-space-md py-2.5 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all" type="button">
                <span class="material-symbols-outlined text-[18px]">edit_calendar</span>
                <span>Reschedule</span>
              </button>
              <button onclick="MediSlotModals.showPrepNotesModal(${upcoming.id})" class="flex items-center gap-1.5 bg-surface-container-lowest text-on-surface font-label-md text-label-md font-bold px-space-md py-2.5 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all" type="button">
                <span class="material-symbols-outlined text-[18px]">clinical_notes</span>
                <span>View Clinical Prep Notes</span>
              </button>
              <button onclick="MediSlotModals.showCancelModal(${upcoming.id})" class="ml-auto font-label-sm text-label-sm text-error underline font-bold hover:text-on-error-container" type="button">
                Cancel Appointment
              </button>
            </div>
          </div>
        `;
      }
    }

    // Render Recommended Doctors
    const doctors = await MediSlotStore.fetchDoctors();
    const recContainer = document.getElementById('dashboard-recommended-doctors');
    if (recContainer && doctors.length > 0) {
      recContainer.innerHTML = doctors.slice(1, 4).map(doc => `
        <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex flex-col justify-between gap-space-md hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1E293B] transition-transform">
          <div class="flex flex-col gap-space-sm">
            <div class="flex items-start justify-between">
              <div class="relative w-16 h-16 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] overflow-hidden bg-secondary-fixed">
                <img src="${doc.avatar_url}" class="w-full h-full object-cover" alt="${doc.name}"/>
              </div>
              <span class="px-space-sm py-1 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-extrabold rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">bolt</span> ${doc.match_percentage}% Symptom Match
              </span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-1">
                <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">${doc.name}</h3>
                <span class="material-symbols-outlined text-[#10B981] text-[18px]">verified</span>
              </div>
              <span class="font-label-sm text-label-sm text-primary font-bold">${doc.specialty} • ${doc.clinic}</span>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">${doc.experience_yrs} yrs clinical experience</p>
            </div>
            <div class="flex items-center gap-space-sm pt-1">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold rounded-full border border-[#1E293B]">
                <span class="material-symbols-outlined text-[14px] fill-1">star</span> ${doc.rating} (${doc.review_count} reviews)
              </span>
              <span class="font-label-sm text-label-sm text-on-surface font-extrabold">
                $${doc.fee.toFixed(0)} <span class="font-normal text-on-surface-variant">/ consult</span>
              </span>
            </div>
          </div>
          <div class="flex items-center justify-between pt-space-sm border-t-2 border-[#1E293B]">
            <span class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 font-bold">
              <span class="w-2 h-2 rounded-full bg-[#10B981]"></span> Next: ${doc.earliest_slot}
            </span>
            <button onclick="MediSlotModals.bookDoctorDirect(${doc.id})" class="flex items-center gap-1 px-space-md py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all" type="button">
              <span>Quick Book</span>
              <span class="material-symbols-outlined text-[16px]">bolt</span>
            </button>
          </div>
        </div>
      `).join('');
    }

    // Render Recent Consultations Table
    const tbody = document.getElementById('recent-records-tbody');
    if (tbody) {
      const records = [
        {
          id: 3,
          date: 'Oct 12, 2024',
          time: '02:15 PM • Telehealth',
          initials: 'SJ',
          docName: 'Dr. Sarah Jenkins',
          specialty: 'Cardiology Review',
          reason: 'Bi-annual Blood Pressure Follow-up',
          status: 'completed',
          rxAvailable: false
        },
        {
          id: 4,
          date: 'Sep 28, 2024',
          time: '11:00 AM • In-Person',
          initials: 'MC',
          docName: 'Dr. Marcus Chen',
          specialty: 'Endocrinology',
          reason: 'Routine HbA1c Lab Panel & Dietary Review',
          status: 'rx_ready',
          rxId: 1,
          rxAvailable: true
        },
        {
          id: 5,
          date: 'Aug 14, 2024',
          time: '09:30 AM • In-Person',
          initials: 'AP',
          docName: 'Dr. Ananya Patel',
          specialty: 'Preventive Wellness',
          reason: 'Annual Comprehensive Physical Exam',
          status: 'completed',
          rxAvailable: false
        }
      ];

      tbody.innerHTML = records.map(r => `
        <tr class="hover:bg-surface-container-low transition-colors">
          <td class="py-space-md px-space-md font-body-sm text-body-sm text-on-surface">
            <span class="font-bold block">${r.date}</span>
            <span class="text-on-surface-variant font-label-sm">${r.time}</span>
          </td>
          <td class="py-space-md px-space-md">
            <div class="flex items-center gap-space-sm">
              <div class="w-8 h-8 rounded-full bg-primary-fixed border border-[#1E293B] flex items-center justify-center font-bold text-on-primary-fixed text-xs">
                ${r.initials}
              </div>
              <div>
                <span class="font-label-md text-label-md text-on-surface font-bold block">${r.docName}</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant">${r.specialty}</span>
              </div>
            </div>
          </td>
          <td class="py-space-md px-space-md font-body-sm text-body-sm text-on-surface font-semibold">
            ${r.reason}
          </td>
          <td class="py-space-md px-space-md">
            ${r.status === 'rx_ready' ? `
              <span class="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-[#FEF3C7] border border-[#1E293B] text-[#92400E] font-label-sm text-label-sm font-bold shadow-[1px_1px_0px_#1E293B]">
                <span class="material-symbols-outlined text-[13px]">prescriptions</span> Prescription Ready
              </span>
            ` : `
              <span class="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-[#D1FAE5] border border-[#1E293B] text-[#065F46] font-label-sm text-label-sm font-bold shadow-[1px_1px_0px_#1E293B]">
                <span class="material-symbols-outlined text-[13px]">check_circle</span> Completed
              </span>
            `}
          </td>
          <td class="py-space-md px-space-md text-right">
            <div class="flex items-center justify-end gap-2">
              <button onclick="MediSlotModals.showPdfSummaryModal(${r.id})" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-surface-container border border-[#1E293B] text-primary font-label-sm text-label-sm font-bold shadow-[2px_2px_0px_#1E293B] hover:bg-primary hover:text-white active:translate-x-0.5 active:translate-y-0.5 transition-all" type="button">
                <span class="material-symbols-outlined text-[15px]">description</span>
                <span>PDF Summary</span>
              </button>
              ${r.rxAvailable ? `
                <button onclick="MediSlotModals.showRxRefillModal(1)" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-secondary-fixed border border-[#1E293B] text-on-secondary-fixed font-label-sm text-label-sm font-bold shadow-[2px_2px_0px_#1E293B] hover:bg-secondary hover:text-white active:translate-x-0.5 active:translate-y-0.5 transition-all" type="button">
                  <span class="material-symbols-outlined text-[15px]">medication</span>
                  <span>Order Rx Refill</span>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `).join('');
    }
  },

  submitInlineMediBot() {
    const input = document.getElementById('dashboard-medibot-input');
    if (input && input.value.trim()) {
      MediBot.sendMessage(input.value.trim());
      input.value = '';
    }
  },

  filterRecordsPrompt() {
    showToast('Filtered records to last 90 days. All biometric entries synced with FHIR server.', 'info');
  },

  exportAllFhir() {
    showToast('Exporting clinical history bundle to FHIR JSON / PDF...', 'success');
    setTimeout(() => {
      MediSlotModals.showPdfSummaryModal(1);
    }, 600);
  }
};
