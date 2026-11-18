// MediSlot AI - Doctor Console Operational View
window.DoctorConsolePage = {
  render() {
    return `
      <div class="flex flex-col w-full pb-20">
        <div class="px-4 sm:px-gutter py-space-lg flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
          
          <!-- Doctor Header Banner -->
          <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div class="flex items-center gap-space-md">
              <div class="relative w-16 h-16 rounded-full border-2 border-[#1E293B] overflow-hidden bg-primary-fixed shadow-[3px_3px_0px_#1E293B] shrink-0">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS75Y3hTNWY5IwCstLJLUr6QZZlz6X102tQsUOIkf4-WdIakpQ4f1HaoJu85lNz5ZU6AXWOe2ROpbOOdZAoZsxU-ip90PZLOOjodjQv-wvKqcpMtLq7zUxyTmk9muJiHBM4DonV6gebg0bHowkgng0v9NoJ1r8IxyEwLy0DaiEtvjktdgdUtnTN1T96iv3k_fnD3V9MITq7OpUd_BPf0QHgGv51gZBMrN51AQu6bQ" class="w-full h-full object-cover" alt="Dr. Sarah Jenkins"/>
                <div class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#10B981] border-2 border-[#1E293B]"></div>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2 flex-wrap">
                  <h1 class="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-extrabold">Dr. Sarah Jenkins, MD</h1>
                  <span class="bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#1E293B]">Senior Faculty</span>
                </div>
                <span class="font-label-md text-secondary font-bold">Stanford Medical Center • Cardiovascular Clinic Suite 402</span>
                <span class="text-xs text-on-surface-variant font-mono mt-0.5">Staff ID: DOC-8812 • On-Duty Clinical Queue</span>
              </div>
            </div>

            <!-- Operational Buttons -->
            <div class="flex flex-wrap items-center gap-space-sm self-start md:self-auto">
              <button onclick="DoctorConsolePage.launchTelehealthSession()" class="flex items-center gap-2 bg-secondary text-white font-label-md text-label-md font-bold px-space-md py-2.5 rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all">
                <span class="material-symbols-outlined text-[18px]">videocam</span>
                <span>Launch Telehealth Room</span>
              </button>
              <button onclick="DoctorConsolePage.releaseEmergencySlot()" class="flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-bold px-space-md py-2.5 rounded-full border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all">
                <span class="material-symbols-outlined text-[18px]">bolt</span>
                <span>Release Urgent Slot</span>
              </button>
            </div>
          </div>

          <!-- Queue Metrics Ribbon -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-space-md">
            <div class="bg-primary-fixed border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-on-primary-fixed">Today's Patients</span>
              <div class="font-headline-xl text-3xl font-extrabold text-on-primary-fixed mt-1">6</div>
              <span class="text-xs text-on-primary-fixed-variant font-semibold">4 Checked-in or confirmed</span>
            </div>
            <div class="bg-[#D1FAE5] border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-[#065F46]">Current Status</span>
              <div class="font-headline-xl text-2xl font-extrabold text-[#065F46] mt-1">Room 402 Active</div>
              <span class="text-xs text-[#047857] font-semibold">Zero clinic delays</span>
            </div>
            <div class="bg-secondary-fixed border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-on-secondary-fixed">Next Patient</span>
              <div class="font-headline-xl text-xl font-extrabold text-on-secondary-fixed mt-1">Alex Morgan</div>
              <span class="text-xs text-on-secondary-fixed-variant font-semibold">10:30 AM • Q-04 Priority</span>
            </div>
            <div class="bg-tertiary-fixed border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-on-tertiary-fixed">Average Consult</span>
              <div class="font-headline-xl text-3xl font-extrabold text-on-tertiary-fixed mt-1">38 min</div>
              <span class="text-xs text-on-tertiary-fixed-variant font-semibold">Target: 45 min allocation</span>
            </div>
          </div>

          <!-- Patient Queue Timeline -->
          <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col gap-space-md">
            <div class="flex items-center justify-between pb-space-sm border-b-2 border-[#1E293B]">
              <div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Today's Clinical Agenda</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Real-time patient check-ins and diagnostic slots.</p>
              </div>
              <span class="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full border border-[#1E293B]">
                Stanford Cardio Pod 4
              </span>
            </div>

            <div class="flex flex-col gap-space-sm" id="doctor-queue-timeline">
              <!-- Item 1 -->
              <div class="p-space-md rounded-xl border-2 border-[#1E293B] bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-[2px_2px_0px_#1E293B]">
                <div class="flex items-center gap-space-sm">
                  <div class="w-10 h-10 rounded-full bg-[#D1FAE5] border-2 border-[#1E293B] flex items-center justify-center font-bold text-xs text-[#065F46]">
                    Q-01
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-headline-sm text-[16px] font-bold text-on-surface">Eleanor Vance</span>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-[#D1FAE5] text-[#065F46] font-bold border border-[#1E293B]">Completed</span>
                    </div>
                    <span class="text-xs text-on-surface-variant">09:00 AM • Bi-annual ECG Review • In-Person</span>
                  </div>
                </div>
                <button onclick="showToast('Eleanor Vance summary filed in EHR', 'info')" class="bg-surface-container-lowest border border-[#1E293B] px-3 py-1.5 rounded-full text-xs font-bold shadow-[1px_1px_0px_#1E293B]">
                  View Encounter EHR
                </button>
              </div>

              <!-- Item 2 -->
              <div class="p-space-md rounded-xl border-2 border-[#1E293B] bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-[2px_2px_0px_#1E293B]">
                <div class="flex items-center gap-space-sm">
                  <div class="w-10 h-10 rounded-full bg-[#D1FAE5] border-2 border-[#1E293B] flex items-center justify-center font-bold text-xs text-[#065F46]">
                    Q-02
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-headline-sm text-[16px] font-bold text-on-surface">Robert Tanaka</span>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-[#D1FAE5] text-[#065F46] font-bold border border-[#1E293B]">Completed</span>
                    </div>
                    <span class="text-xs text-on-surface-variant">09:45 AM • Telehealth Follow-up • Beta-blocker titration</span>
                  </div>
                </div>
                <button onclick="showToast('Robert Tanaka summary filed in EHR', 'info')" class="bg-surface-container-lowest border border-[#1E293B] px-3 py-1.5 rounded-full text-xs font-bold shadow-[1px_1px_0px_#1E293B]">
                  View Encounter EHR
                </button>
              </div>

              <!-- Item 3: Alex Morgan (Active / In Waiting Room) -->
              <div class="p-space-md rounded-xl border-2 border-[#1E293B] bg-primary-fixed shadow-[4px_4px_0px_#1E293B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div class="flex items-center gap-space-sm">
                  <div class="w-12 h-12 rounded-full bg-[#FFFDF5] border-2 border-[#1E293B] flex items-center justify-center font-extrabold text-sm text-primary shadow-[2px_2px_0px_#1E293B]">
                    Q-04
                  </div>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="font-headline-sm text-[17px] font-extrabold text-on-surface">Alex Morgan (MRN-90214)</span>
                      <span class="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-white font-extrabold border border-[#1E293B] animate-pulse">
                        Next in Queue
                      </span>
                    </div>
                    <span class="text-xs font-bold text-on-primary-fixed-variant">10:30 AM • Occasional heart flutters • Suite 402 • Fasting Verified</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="DoctorConsolePage.callPatient('Alex Morgan', 'Suite 402')" class="bg-primary text-white border-2 border-[#1E293B] px-4 py-2 rounded-full font-label-md font-bold shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1">
                    <span class="material-symbols-outlined text-[16px]">call</span>
                    <span>Call Patient In</span>
                  </button>
                </div>
              </div>

              <!-- Item 4: Upcoming Slot -->
              <div class="p-space-md rounded-xl border-2 border-[#1E293B] bg-surface-container-lowest flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-[2px_2px_0px_#1E293B]">
                <div class="flex items-center gap-space-sm">
                  <div class="w-10 h-10 rounded-full bg-surface-container border-2 border-[#1E293B] flex items-center justify-center font-bold text-xs">
                    Q-08
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-headline-sm text-[16px] font-bold text-on-surface">Clara Gomez</span>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold border border-[#1E293B]">Awaiting Arrival</span>
                    </div>
                    <span class="text-xs text-on-surface-variant">11:15 AM • Post-Stent Consultation</span>
                  </div>
                </div>
                <button onclick="DoctorConsolePage.toggleSlotLock(this, '11:15 AM')" class="bg-surface-container text-on-surface border border-[#1E293B] px-3 py-1.5 rounded-full text-xs font-bold shadow-[1px_1px_0px_#1E293B]">
                  Lock / Hold Slot
                </button>
              </div>

              <!-- Item 5: Available Fast Track Slot -->
              <div class="p-space-md rounded-xl border-2 border-dashed border-[#1E293B] bg-secondary-fixed/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div class="flex items-center gap-space-sm">
                  <div class="w-10 h-10 rounded-full bg-secondary-fixed border-2 border-[#1E293B] flex items-center justify-center font-bold text-xs text-secondary">
                    ✦
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-headline-sm text-[16px] font-bold text-on-surface">02:45 PM Fast-Track Open Slot</span>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-[#10B981] text-white font-bold border border-[#1E293B]">Available</span>
                    </div>
                    <span class="text-xs text-on-surface-variant">Available for instant waitlist auto-fill or walk-in triage</span>
                  </div>
                </div>
                <button onclick="showToast('Dispatched automated SMS to priority waitlist for 02:45 PM slot!', 'success')" class="bg-secondary text-white border-2 border-[#1E293B] px-3 py-1.5 rounded-full text-xs font-bold shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">send</span>
                  <span>Alert Waitlist</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  async afterRender() {
    // Console loaded
  },

  launchTelehealthSession() {
    showToast('Starting WebRTC encrypted clinical session with Alex Morgan...', 'info');
    setTimeout(() => {
      MediSlotModals.open(`
        <div class="flex flex-col gap-space-md items-center text-center">
          <div class="w-16 h-16 rounded-full bg-secondary-fixed border-2 border-[#1E293B] flex items-center justify-center text-secondary shadow-[3px_3px_0px_#1E293B]">
            <span class="material-symbols-outlined text-[36px]">videocam</span>
          </div>
          <div>
            <span class="bg-[#10B981] text-white text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#1E293B]">
              WebRTC E2E Encrypted Room
            </span>
            <h3 class="font-headline-sm text-xl font-bold mt-2">Stanford Health Telehealth Studio</h3>
            <p class="text-xs text-on-surface-variant mt-1">Connecting Dr. Sarah Jenkins with Alex Morgan (MRN-90214)</p>
          </div>
          <div class="w-full h-48 bg-slate-900 rounded-xl border-2 border-[#1E293B] flex flex-col items-center justify-center text-white gap-2 relative overflow-hidden">
            <span class="material-symbols-outlined text-4xl text-slate-400 animate-pulse">person</span>
            <span class="text-xs text-slate-300">Waiting for patient to accept stream...</span>
            <div class="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white font-mono">
              Latency: 14ms • 1080p60
            </div>
          </div>
          <div class="flex items-center gap-2 w-full">
            <button onclick="showToast('Microphone toggled', 'info')" class="flex-1 bg-surface-container border border-[#1E293B] py-2 rounded-full font-bold text-xs">
              Mute Mic
            </button>
            <button onclick="MediSlotModals.close()" class="flex-1 bg-error text-white border border-[#1E293B] py-2 rounded-full font-bold text-xs">
              End Consult
            </button>
          </div>
        </div>
      `);
    }, 600);
  },

  releaseEmergencySlot() {
    showToast('Urgent slot released for 03:30 PM! MediBot queue tracker notified.', 'success');
  },

  callPatient(name, room) {
    showToast(`Calling ${name} to ${room}. Chime sounded at waiting area kiosk!`, 'success');
  },

  toggleSlotLock(btn, slotTime) {
    if (btn.innerText.includes('Lock')) {
      btn.innerText = 'Unlock Slot';
      btn.classList.replace('bg-surface-container', 'bg-tertiary-fixed');
      showToast(`Slot ${slotTime} held for administrative review`, 'warning');
    } else {
      btn.innerText = 'Lock / Hold Slot';
      btn.classList.replace('bg-tertiary-fixed', 'bg-surface-container');
      showToast(`Slot ${slotTime} opened back to public scheduling`, 'success');
    }
  }
};
