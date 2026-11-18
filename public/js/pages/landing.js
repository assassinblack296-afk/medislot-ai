// MediSlot AI - Landing Page View
window.LandingPage = {
  render() {
    return `
      <div class="flex flex-col w-full pb-16">
        <!-- Top Geometric Ambient Accents -->
        <div class="relative w-full overflow-hidden px-4 sm:px-gutter pb-space-xl">
          <!-- Floating Memphis Geometric Confetti / Stickers -->
          <div class="absolute top-6 left-12 w-6 h-6 rounded-full bg-secondary-fixed rotate-12 pointer-events-none hidden sm:block border border-[#1E293B]"></div>
          <div class="absolute top-20 right-24 text-tertiary-fixed-dim text-2xl font-black pointer-events-none select-none rotate-6">✦</div>
          <div class="absolute top-64 right-10 w-10 h-10 rounded-lg bg-surface-container rotate-45 pointer-events-none hidden lg:block border border-[#1E293B]"></div>
          <div class="absolute top-80 left-6 text-secondary text-3xl font-black pointer-events-none select-none -rotate-12">★</div>

          <!-- HERO SECTION -->
          <div class="max-w-7xl mx-auto w-full pt-space-lg lg:pt-space-xl">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
              
              <!-- Left Hero Column: Copy & Search Console -->
              <div class="lg:col-span-7 flex flex-col items-start gap-space-md">
                <!-- Category Sticker Badge -->
                <div class="inline-flex items-center gap-space-xs bg-tertiary-fixed text-on-tertiary-fixed px-space-md py-1.5 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] -rotate-1 hover:rotate-0 transition-transform">
                  <span class="text-tertiary font-headline-sm leading-none">✦</span>
                  <span class="font-label-md text-label-md tracking-wider uppercase font-bold">Next-Gen Healthcare Scheduling</span>
                </div>

                <!-- Expressive Headline -->
                <h1 class="font-headline-xl text-4xl sm:text-headline-xl text-on-surface tracking-tight leading-tight">
                  Your Health, <br class="hidden sm:inline"/>Your Time —
                  <span class="relative inline-block text-primary">
                    Book Smarter!
                    <svg class="absolute -bottom-2.5 left-0 w-full h-4 text-secondary" fill="none" preserveAspectRatio="none" viewBox="0 0 260 20">
                      <path d="M4 14C60 4 190 6 256 12" stroke="currentColor" stroke-linecap="round" stroke-width="4"></path>
                    </svg>
                  </span>
                </h1>

                <!-- Body Description -->
                <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Say goodbye to waiting room fatigue. MediSlot AI coordinates multi-clinic schedules, predicts cancellations in real time, and secures the exact consultation slot you need in under 15 seconds.
                </p>

                <!-- Interactive Neo-Brutalist Search Console Card -->
                <div class="w-full mt-space-sm bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B]">
                  <form id="hero-search-form" class="flex flex-col md:flex-row items-stretch md:items-center gap-space-sm">
                    <!-- Doctor / Specialty Input -->
                    <div class="flex-1 flex items-center gap-space-xs bg-surface-container-low px-space-md py-3 rounded-lg border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] focus-within:shadow-[3px_3px_0px_#6b38d4] transition-all">
                      <span class="material-symbols-outlined text-primary text-[20px]">person_search</span>
                      <input id="hero-doctor-query" class="bg-transparent w-full font-body-md text-body-md text-on-surface focus:outline-none placeholder:text-outline" placeholder="Doctor, symptom, or specialty..." type="text"/>
                    </div>
                    <!-- Specialty Select Dropdown -->
                    <div class="flex items-center gap-space-xs bg-surface-container-low px-space-md py-3 rounded-lg border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] focus-within:shadow-[3px_3px_0px_#6b38d4] transition-all">
                      <span class="material-symbols-outlined text-secondary text-[20px]">stethoscope</span>
                      <select id="hero-specialty-select" class="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer">
                        <option value="all">All Specialties</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Dermatology" selected>Dermatology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Orthopedics">Orthopedics</option>
                      </select>
                    </div>
                    <!-- Action Button -->
                    <button class="flex items-center justify-center gap-2 bg-primary text-on-primary px-space-lg py-3 rounded-full font-label-lg text-label-lg border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E293B] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all" type="submit">
                      <span>Find Doctor</span>
                      <span class="text-tertiary-fixed font-bold">✦</span>
                    </button>
                  </form>

                  <!-- Quick Filter Tags -->
                  <div class="flex flex-wrap items-center gap-space-xs mt-space-sm pt-space-xs">
                    <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Fast Track:</span>
                    <button onclick="LandingPage.setQuickSearch('Cardiology')" class="bg-surface-container text-on-surface font-label-sm text-label-sm px-space-sm py-1 rounded-full border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:bg-secondary-fixed transition-colors" type="button">⚡ Available Today</button>
                    <button onclick="LandingPage.setQuickSearch('Telehealth')" class="bg-surface-container text-on-surface font-label-sm text-label-sm px-space-sm py-1 rounded-full border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:bg-tertiary-fixed transition-colors" type="button">📹 Video Consult</button>
                    <button onclick="LandingPage.setQuickSearch('Top-Rated')" class="bg-surface-container text-on-surface font-label-sm text-label-sm px-space-sm py-1 rounded-full border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container-highest transition-colors" type="button">★ 4.9+ Rated</button>
                  </div>
                </div>

                <!-- Trust Badges Line -->
                <div class="flex flex-wrap items-center gap-space-md pt-space-xs">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                    <span class="font-label-sm text-label-sm text-on-surface font-bold">HIPAA Compliant</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-secondary text-[18px]">bolt</span>
                    <span class="font-label-sm text-label-sm text-on-surface font-bold">Zero Wait Guarantee</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-tertiary text-[18px]">lock</span>
                    <span class="font-label-sm text-label-sm text-on-surface font-bold">Encrypted Intake</span>
                  </div>
                </div>
              </div>

              <!-- Right Hero Column: Interactive Scheduling Matrix Card -->
              <div class="lg:col-span-5 relative flex justify-center mt-space-lg lg:mt-0">
                <!-- Background Geometric Backdrop -->
                <div class="absolute -inset-2 bg-secondary-fixed border-2 border-[#1E293B] rounded-xl -rotate-2 shadow-[4px_4px_0px_#1E293B]"></div>
                
                <!-- Main Interactive Card Frame -->
                <div class="relative w-full bg-surface-container-lowest p-space-md rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] flex flex-col gap-space-md">
                  <!-- Card Header Ribbon -->
                  <div class="flex items-center justify-between bg-primary-fixed text-on-primary-fixed p-space-sm rounded-lg border border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
                    <div class="flex items-center gap-space-xs">
                      <span class="inline-flex w-3 h-3 rounded-full bg-secondary"></span>
                      <span class="font-label-md text-label-md font-bold">LIVE CLINICAL RADAR</span>
                    </div>
                    <span class="bg-surface-container-lowest text-on-surface font-label-sm text-label-sm px-space-xs py-0.5 rounded-full border border-[#1E293B] shadow-[1px_1px_0px_#1E293B] font-bold">AI Matched</span>
                  </div>

                  <!-- Doctor Profile Highlight -->
                  <div class="flex items-center gap-space-md bg-surface p-space-sm rounded-lg border border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
                    <div class="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] bg-primary flex-shrink-0">
                      <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO6yE8jhy_PRl2uPV90uMITJo2VWtg0mjqhns9Wj_kJ0qNX9Kw_YQ88YBd3iJV0FSOuAdt6ZtfdBtMZrm1I1MYSULg6pUiNq1O8T9Ek3nOqIIY80xPQMEm5KQSDU761AaZwVcosqPGyPuRcVRJOv3JUP6dreO4f9rrrcC0C2vBytVATyAQC1vz5ZPJByxR2S3ytPVNVLPZDk2_6AFvQCdgmJ4q-OE4t0MPSiA247c" alt="Dr. Sarah Chen"/>
                    </div>
                    <div class="flex flex-col">
                      <div class="flex items-center gap-1">
                        <h3 class="font-headline-sm text-headline-sm text-on-surface leading-none">Dr. Sarah Chen</h3>
                        <span class="material-symbols-outlined text-primary text-[18px]">verified</span>
                      </div>
                      <p class="font-body-sm text-body-sm text-on-surface-variant">Chief Dermatologist • St. Jude Pavilion</p>
                      <div class="flex items-center gap-1 mt-1">
                        <span class="text-tertiary-fixed-dim text-sm font-bold">★★★★★</span>
                        <span class="font-label-sm text-label-sm text-on-surface font-bold">4.98 (340 reviews)</span>
                      </div>
                    </div>
                  </div>

                  <!-- Floating Pill Banner: Confirmed Status Sticker -->
                  <div class="flex items-center justify-between bg-surface-container-highest p-space-sm rounded-lg border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] rotate-1">
                    <div class="flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                      <span class="font-label-md text-label-md text-on-surface font-bold">Dr. Sarah • 10:30 AM Slot Opened</span>
                    </div>
                    <button onclick="MediSlotModals.selectSlotAndBook(2, new Date().toISOString().split('T')[0], '10:30 AM')" class="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full border border-[#1E293B] shadow-[1px_1px_0px_#1E293B] font-bold hover:scale-105 transition-transform">
                      Instant Claim
                    </button>
                  </div>

                  <!-- Visual Slot Matrix -->
                  <div class="flex flex-col gap-space-xs">
                    <span class="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Predictive Queue Slot Matrix</span>
                    <div class="grid grid-cols-3 gap-space-xs" id="hero-slot-matrix">
                      <button onclick="LandingPage.selectHeroSlot(this, 2, '09:15 AM')" class="hero-slot-btn py-2 px-space-xs text-center rounded-lg border-2 border-[#1E293B] bg-surface-container-low font-label-md text-label-md text-on-surface shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all" type="button">
                        09:15 AM
                      </button>
                      <button onclick="LandingPage.selectHeroSlot(this, 2, '10:30 AM')" class="hero-slot-btn active-slot py-2 px-space-xs text-center rounded-lg border-2 border-[#1E293B] bg-primary text-on-primary font-label-md text-label-md shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 transition-all font-bold" type="button">
                        10:30 AM ⚡
                      </button>
                      <button onclick="LandingPage.selectHeroSlot(this, 2, '11:45 AM')" class="hero-slot-btn py-2 px-space-xs text-center rounded-lg border-2 border-[#1E293B] bg-surface-container-low font-label-md text-label-md text-on-surface shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all" type="button">
                        11:45 AM
                      </button>
                      <button onclick="LandingPage.selectHeroSlot(this, 2, '02:00 PM')" class="hero-slot-btn py-2 px-space-xs text-center rounded-lg border-2 border-[#1E293B] bg-surface-container-low font-label-md text-label-md text-on-surface shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all" type="button">
                        02:00 PM
                      </button>
                      <button onclick="LandingPage.selectHeroSlot(this, 2, '03:15 PM')" class="hero-slot-btn py-2 px-space-xs text-center rounded-lg border-2 border-[#1E293B] bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all font-bold" type="button">
                        03:15 PM 🔥
                      </button>
                      <button onclick="LandingPage.selectHeroSlot(this, 2, '04:30 PM')" class="hero-slot-btn py-2 px-space-xs text-center rounded-lg border-2 border-[#1E293B] bg-surface-container-low font-label-md text-label-md text-on-surface shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all" type="button">
                        04:30 PM
                      </button>
                    </div>
                  </div>

                  <!-- Bottom Sticker Stamp: 100% Shield -->
                  <div class="flex items-center justify-between bg-tertiary-fixed text-on-tertiary-fixed px-space-md py-space-sm rounded-lg border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-[20px]">shield_with_heart</span>
                      <span class="font-label-md text-label-md font-bold">Double Booking Shield</span>
                    </div>
                    <span class="font-headline-sm text-headline-sm leading-none font-bold">100% Guarantee</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- STATISTICS RIBBON (NEO-BRUTALIST STICKER TILES) -->
        <section class="w-full bg-surface-container-high py-space-lg px-4 sm:px-gutter border-y-2 border-[#1E293B] shadow-[0_4px_0_0_#1E293B]">
          <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-space-md">
            <!-- Stat 1 -->
            <div class="bg-surface-container-lowest p-space-md rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] flex flex-col items-center text-center -rotate-1 hover:rotate-0 transition-transform">
              <span class="font-headline-lg text-headline-lg text-primary leading-none font-extrabold">1,200+</span>
              <span class="font-label-md text-label-md text-on-surface font-bold mt-1">Verified Doctors</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant">Across 38 specialties</span>
            </div>
            <!-- Stat 2 -->
            <div class="bg-surface-container-lowest p-space-md rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] flex flex-col items-center text-center rotate-1 hover:rotate-0 transition-transform">
              <span class="font-headline-lg text-headline-lg text-secondary leading-none font-extrabold">45,000+</span>
              <span class="font-label-md text-label-md text-on-surface font-bold mt-1">Happy Patients</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant">Zero canceled delays</span>
            </div>
            <!-- Stat 3 -->
            <div class="bg-surface-container-lowest p-space-md rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] flex flex-col items-center text-center -rotate-1 hover:rotate-0 transition-transform">
              <span class="font-headline-lg text-headline-lg text-tertiary leading-none font-extrabold">99.4%</span>
              <span class="font-label-md text-label-md text-on-surface font-bold mt-1">AI Match Accuracy</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant">Predictive intake triage</span>
            </div>
            <!-- Stat 4 -->
            <div class="bg-surface-container-lowest p-space-md rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] flex flex-col items-center text-center rotate-1 hover:rotate-0 transition-transform">
              <div class="flex items-center gap-1 text-tertiary-fixed-dim leading-none">
                <span class="font-headline-lg text-headline-lg text-on-surface font-extrabold">4.9</span>
                <span class="text-xl">★★★★★</span>
              </div>
              <span class="font-label-md text-label-md text-on-surface font-bold mt-1">Patient Rating</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant">Based on 12k+ audits</span>
            </div>
          </div>
        </section>

        <!-- FEATURES SECTION: THREE PLAYFUL MEMPHIS CARDS -->
        <section class="w-full py-space-xl px-4 sm:px-gutter">
          <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
              <div>
                <div class="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-space-sm py-0.5 rounded-full border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] mb-2 font-bold">
                  <span>✦ SUPERCHARGED SCHEDULING</span>
                </div>
                <h2 class="font-headline-lg text-3xl sm:text-headline-lg text-on-surface font-bold">Designed for Patients. Engineered for Clinics.</h2>
              </div>
              <p class="font-body-md text-body-md text-on-surface-variant max-w-md">
                Medical software doesn’t have to feel like a 1998 spreadsheet. Enjoy tactile speed, guaranteed bookings, and effortless care management.
              </p>
            </div>

            <!-- Bento-style 3 Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-space-lg pt-space-md">
              <!-- Card 1 -->
              <div class="relative bg-surface-container-lowest p-space-lg rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] flex flex-col justify-between group hover:-translate-y-1 transition-transform">
                <div class="absolute -top-6 left-6 w-14 h-14 rounded-full bg-primary-container text-on-primary-container border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] flex items-center justify-center">
                  <span class="material-symbols-outlined text-[28px]">calendar_month</span>
                </div>
                <div class="pt-space-md flex flex-col gap-space-sm">
                  <div class="inline-flex items-center self-start bg-primary-fixed text-on-primary-fixed px-space-sm py-0.5 rounded-full font-label-sm text-label-sm border border-[#1E293B] shadow-[1px_1px_0px_#1E293B] font-bold">
                    Predictive Optimization
                  </div>
                  <h3 class="font-headline-md text-headline-md text-on-surface font-bold">AI Smart Scheduling</h3>
                  <p class="font-body-md text-body-md text-on-surface-variant">
                    Proprietary neural scheduling dynamically levels clinical load, prevents doctor burnout, and aligns complex multi-department appointments smoothly.
                  </p>
                </div>
                <div class="mt-space-md p-space-sm bg-surface-container-low rounded-lg border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-xs bg-primary text-on-primary px-2 py-0.5 rounded-full font-bold">Auto-Triage</span>
                    <span class="font-label-sm text-label-sm text-on-surface font-bold">Severity Rank #1</span>
                  </div>
                  <span class="font-label-sm text-label-sm text-primary font-bold">Saved 22 mins</span>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="relative bg-surface-container-lowest p-space-lg rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] flex flex-col justify-between group hover:-translate-y-1 transition-transform">
                <div class="absolute -top-6 left-6 w-14 h-14 rounded-full bg-secondary text-on-secondary border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] flex items-center justify-center">
                  <span class="material-symbols-outlined text-[28px]">bolt</span>
                </div>
                <div class="pt-space-md flex flex-col gap-space-sm">
                  <div class="inline-flex items-center self-start bg-secondary-fixed text-on-secondary-fixed px-space-sm py-0.5 rounded-full font-label-sm text-label-sm border border-[#1E293B] shadow-[1px_1px_0px_#1E293B] font-bold">
                    10-Second Checkout
                  </div>
                  <h3 class="font-headline-md text-headline-md text-on-surface font-bold">Instant Appointment Booking</h3>
                  <p class="font-body-md text-body-md text-on-surface-variant">
                    No endless phone queues or reception hold music. Pick an open slot, enter brief medical notes, and confirm your hospital pass in under ten seconds.
                  </p>
                </div>
                <div class="mt-space-md p-space-sm bg-secondary-fixed-dim/40 rounded-lg border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-xs bg-secondary text-on-secondary px-2 py-0.5 rounded-full font-bold">Confirmed</span>
                    <span class="font-label-sm text-label-sm text-on-surface font-bold">SMS Pass Delivered</span>
                  </div>
                  <span class="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                </div>
              </div>

              <!-- Card 3 -->
              <div class="relative bg-surface-container-lowest p-space-lg rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] flex flex-col justify-between group hover:-translate-y-1 transition-transform">
                <div class="absolute -top-6 left-6 w-14 h-14 rounded-full bg-tertiary-fixed text-on-tertiary-fixed border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] flex items-center justify-center">
                  <span class="material-symbols-outlined text-[28px]">notifications_active</span>
                </div>
                <div class="pt-space-md flex flex-col gap-space-sm">
                  <div class="inline-flex items-center self-start bg-surface-container-highest text-on-surface px-space-sm py-0.5 rounded-full font-label-sm text-label-sm border border-[#1E293B] shadow-[1px_1px_0px_#1E293B] font-bold">
                    Two-Way Auto-Sync
                  </div>
                  <h3 class="font-headline-md text-headline-md text-on-surface font-bold">Automated Reminders & Sync</h3>
                  <p class="font-body-md text-body-md text-on-surface-variant">
                    Continuous sync with Google Calendar, Apple iCal, WhatsApp, and patient portals. Automatic prep alerts remind you about fasting or diagnostic tests.
                  </p>
                </div>
                <div class="mt-space-md p-space-sm bg-surface-container-low rounded-lg border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-xs bg-surface-dim text-on-surface px-2 py-0.5 rounded-full font-bold">Synced</span>
                    <span class="font-label-sm text-label-sm text-on-surface font-bold">WhatsApp + Calendar</span>
                  </div>
                  <span class="font-label-sm text-label-sm text-tertiary font-bold">1 hr prior</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- INTERACTIVE AI ASSISTANT BANNER (MEDIBOT SCANNER) -->
        <section class="w-full px-4 sm:px-gutter pb-space-xl">
          <div class="max-w-7xl mx-auto">
            <div class="relative bg-surface-container-highest p-space-md md:p-space-lg rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] flex flex-col md:flex-row items-center justify-between gap-space-md overflow-hidden">
              <div class="flex items-center gap-space-md z-10">
                <div class="w-16 h-16 rounded-full bg-secondary-fixed text-on-secondary-fixed border-2 border-[#1E293B] flex items-center justify-center shadow-[3px_3px_0px_#1E293B] flex-shrink-0">
                  <span class="material-symbols-outlined text-[32px] text-secondary">smart_toy</span>
                </div>
                <div class="flex flex-col">
                  <div class="flex items-center gap-2">
                    <span class="font-headline-sm text-headline-sm text-on-surface font-bold">Need an Urgent Slot?</span>
                    <span class="bg-secondary text-on-secondary font-label-sm text-label-sm px-2 py-0.5 rounded-full border border-[#1E293B] shadow-[1px_1px_0px_#1E293B] font-bold">Live Pulse</span>
                  </div>
                  <p class="font-body-md text-body-md text-on-surface-variant max-w-xl">
                    MediBot AI scans real-time cancellations every 60 seconds across regional clinics. Jump ahead in line safely when urgent vacancies open.
                  </p>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row items-center gap-space-sm z-10 w-full md:w-auto">
                <div class="flex items-center gap-2 bg-surface-container-lowest border-2 border-[#1E293B] px-space-md py-2.5 rounded-full shadow-[2px_2px_0px_#1E293B] w-full sm:w-auto justify-center">
                  <span class="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                  <span class="font-label-md text-label-md text-on-surface font-bold" id="scanner-status">Scanning 14 hospitals...</span>
                </div>
                <button onclick="LandingPage.triggerUrgentScan(this)" class="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary text-on-secondary border-2 border-[#1E293B] px-space-lg py-2.5 rounded-full font-label-lg text-label-lg font-bold shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1E293B] active:translate-y-0.5 active:shadow-none transition-all" type="button">
                  <span>Activate Priority Watch</span>
                  <span class="material-symbols-outlined text-[18px]">emergency</span>
                </button>
              </div>

              <!-- Decorative star -->
              <div class="absolute -right-6 -bottom-8 text-surface-container-high text-8xl font-black select-none pointer-events-none opacity-40">
                ✦
              </div>
            </div>
          </div>
        </section>

        <!-- DOCTOR DIRECTORY PREVIEW CARDS -->
        <section class="w-full bg-surface-container-low py-space-xl px-4 sm:px-gutter border-t-2 border-[#1E293B] shadow-[0_4px_0_0_#1E293B]">
          <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
              <div>
                <span class="font-label-sm text-label-sm uppercase tracking-wider bg-tertiary-fixed text-on-tertiary-fixed border border-[#1E293B] px-space-sm py-0.5 rounded-full shadow-[1px_1px_0px_#1E293B] font-bold">Available Specialists</span>
                <h2 class="font-headline-lg text-3xl sm:text-headline-lg text-on-surface font-bold mt-1">Book Today with Top Clinical Faculty</h2>
              </div>
              <a href="#find-doctors" class="font-label-lg text-label-lg text-primary hover:text-secondary flex items-center gap-1 font-bold transition-colors">
                View All Practitioners <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md" id="landing-featured-doctors">
              <!-- Dynamically rendered or fallback cards -->
            </div>
          </div>
        </section>
      </div>
    `;
  },

  async afterRender() {
    // Search form handler
    const form = document.getElementById('hero-search-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.getElementById('hero-doctor-query').value.trim();
        const specialty = document.getElementById('hero-specialty-select').value;
        window.location.hash = `#find-doctors?q=${encodeURIComponent(query)}&specialty=${encodeURIComponent(specialty)}`;
      });
    }

    // Load featured doctors
    const doctors = await MediSlotStore.fetchDoctors();
    const previewContainer = document.getElementById('landing-featured-doctors');
    if (previewContainer && doctors.length > 0) {
      const featured = doctors.slice(0, 3);
      previewContainer.innerHTML = featured.map((doc, idx) => {
        const accentColors = [
          { head: 'bg-primary-fixed', text: 'text-primary' },
          { head: 'bg-secondary-fixed', text: 'text-secondary' },
          { head: 'bg-tertiary-fixed', text: 'text-tertiary' }
        ];
        const color = accentColors[idx % 3];

        return `
          <div class="bg-surface-container-lowest p-space-md rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] flex flex-col justify-between gap-space-md hover:-translate-y-1 transition-transform">
            <div class="flex items-start gap-space-sm">
              <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] bg-primary-fixed flex-shrink-0">
                <img src="${doc.avatar_url}" class="w-full h-full object-cover" alt="${doc.name}"/>
              </div>
              <div>
                <span class="${color.head} text-on-surface text-label-sm font-label-sm px-2 py-0.5 rounded-full border border-[#1E293B] shadow-[1px_1px_0px_#1E293B] font-bold">${doc.specialty}</span>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">${doc.name}</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">${doc.clinic} • ${doc.experience_yrs} yrs exp</p>
              </div>
            </div>
            <div class="flex items-center justify-between border-t-2 border-[#1E293B] pt-space-xs">
              <span class="font-label-md text-label-md ${color.text} font-bold">Next: ${doc.earliest_slot}</span>
              <button onclick="MediSlotModals.bookDoctorDirect(${doc.id})" class="bg-primary text-on-primary border-2 border-[#1E293B] px-space-md py-1.5 rounded-full font-label-sm text-label-sm font-bold shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-transform" type="button">
                Book Slot
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  },

  setQuickSearch(term) {
    window.location.hash = `#find-doctors?q=${encodeURIComponent(term)}`;
  },

  selectHeroSlot(btn, docId, slotTime) {
    const allBtns = document.querySelectorAll('.hero-slot-btn');
    allBtns.forEach(b => {
      b.classList.remove('bg-primary', 'text-on-primary', 'font-bold');
      b.classList.add('bg-surface-container-low', 'text-on-surface');
    });
    btn.classList.remove('bg-surface-container-low', 'text-on-surface');
    btn.classList.add('bg-primary', 'text-on-primary', 'font-bold');

    showToast(`Selected Dr. Sarah Chen for ${slotTime}. Ready to confirm?`, 'info');
    setTimeout(() => {
      MediSlotModals.selectSlotAndBook(docId, new Date().toISOString().split('T')[0], slotTime);
    }, 800);
  },

  triggerUrgentScan(btn) {
    const status = document.getElementById('scanner-status');
    if (status) {
      status.innerText = 'Prioritizing queue... 2 slots released!';
      btn.innerText = 'Urgent Alerts Armed ⚡';
      btn.classList.remove('bg-secondary');
      btn.classList.add('bg-primary');
      showToast('Live Radar identified 2 released slots at St. Jude Pavilion & Stanford!', 'success');
      setTimeout(() => {
        MediSlotModals.showWaitlistModal('Urgent Specialist Claim', 1);
      }, 700);
    }
  }
};
