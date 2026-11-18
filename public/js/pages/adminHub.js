// MediSlot AI - Admin Hub Multi-Clinic Radar View
window.AdminHubPage = {
  render() {
    return `
      <div class="flex flex-col w-full pb-20">
        <div class="px-4 sm:px-gutter py-space-lg flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
          
          <!-- Admin Header -->
          <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div>
              <div class="inline-flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed px-3 py-0.5 rounded-full border border-[#1E293B] font-label-sm text-label-sm font-bold uppercase mb-2">
                <span class="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                <span>Regional Clinical Telemetry</span>
              </div>
              <h1 class="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-extrabold">MediSlot Regional Operations Hub</h1>
              <p class="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">
                Real-time capacity orchestration across 14 Northern California hospitals, emergency cancellations, and load-leveling neural models.
              </p>
            </div>

            <div class="flex items-center gap-2 self-start md:self-auto">
              <button onclick="AdminHubPage.rebalanceNetwork()" class="bg-primary text-white border-2 border-[#1E293B] px-space-md py-2.5 rounded-full font-label-md font-bold shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[18px]">tune</span>
                <span>Rebalance Capacity</span>
              </button>
              <button onclick="AdminHubPage.scanHospitals()" class="bg-secondary text-white border-2 border-[#1E293B] px-space-md py-2.5 rounded-full font-label-md font-bold shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[18px]">radar</span>
                <span>Force Cancellation Scan</span>
              </button>
            </div>
          </div>

          <!-- Network Metrics -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-space-md" id="admin-metrics-cards">
            <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-outline">Connected Hospitals</span>
              <div class="font-headline-xl text-3xl font-extrabold text-primary mt-1">14</div>
              <span class="text-xs text-on-surface-variant font-bold">Stanford, UCSF, St. Jude, Kaiser</span>
            </div>
            <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-outline">Capacity Utilization</span>
              <div class="font-headline-xl text-3xl font-extrabold text-secondary mt-1">82.4%</div>
              <span class="text-xs text-on-surface-variant font-bold">Optimal load balance</span>
            </div>
            <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-outline">AI Triage Speed</span>
              <div class="font-headline-xl text-3xl font-extrabold text-tertiary-container mt-1">14.2s</div>
              <span class="text-xs text-on-surface-variant font-bold">Median time to appointment lock</span>
            </div>
            <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B]">
              <span class="text-xs uppercase font-bold text-outline">Waitlist Expedited</span>
              <div class="font-headline-xl text-3xl font-extrabold text-[#10B981] mt-1">148</div>
              <span class="text-xs text-on-surface-variant font-bold">Slots auto-filled this week</span>
            </div>
          </div>

          <!-- Department Load Bars -->
          <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-lg shadow-[4px_4px_0px_#1E293B] flex flex-col gap-space-md">
            <div class="flex items-center justify-between pb-2 border-b-2 border-[#1E293B]">
              <div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Clinical Specialty Load Leveling</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Live telemetry from regional outpatient booking APIs.</p>
              </div>
              <span class="text-xs font-mono font-bold text-outline">Updated 10s ago</span>
            </div>

            <div class="flex flex-col gap-space-md pt-2">
              <div>
                <div class="flex justify-between items-center text-xs font-bold mb-1">
                  <span>Cardiology (Stanford, Metro Heart, Palo Alto Clinic)</span>
                  <span class="text-secondary">88% Load • High Demand (14 Clinicians on duty)</span>
                </div>
                <div class="w-full h-4 bg-surface-container rounded-full border-2 border-[#1E293B] overflow-hidden">
                  <div class="h-full bg-secondary rounded-full" style="width: 88%;"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center text-xs font-bold mb-1">
                  <span>Neurology (UCSF Cerebral Center)</span>
                  <span class="text-error">92% Load • Critical Surge (9 Clinicians on duty)</span>
                </div>
                <div class="w-full h-4 bg-surface-container rounded-full border-2 border-[#1E293B] overflow-hidden">
                  <div class="h-full bg-error rounded-full" style="width: 92%;"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center text-xs font-bold mb-1">
                  <span>Dermatology (St. Jude Pavilion)</span>
                  <span class="text-primary">64% Load • Optimal (8 Clinicians on duty)</span>
                </div>
                <div class="w-full h-4 bg-surface-container rounded-full border-2 border-[#1E293B] overflow-hidden">
                  <div class="h-full bg-primary rounded-full" style="width: 64%;"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center text-xs font-bold mb-1">
                  <span>Pediatrics (Sunrise Kids Clinic, Berkeley)</span>
                  <span class="text-[#10B981]">45% Load • Open Capacity (11 Clinicians on duty)</span>
                </div>
                <div class="w-full h-4 bg-surface-container rounded-full border-2 border-[#1E293B] overflow-hidden">
                  <div class="h-full bg-[#10B981] rounded-full" style="width: 45%;"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  async afterRender() {
    // Admin loaded
  },

  rebalanceNetwork() {
    showToast('Neural load leveling activated: rerouting low-urgency waitlist intakes to Sunrise & St. Jude!', 'success');
  },

  scanHospitals() {
    showToast('Dispatched cancellation probe to 14 FHIR endpoints. 3 slots flagged for auto-claim.', 'info');
  }
};
