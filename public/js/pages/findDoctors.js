// MediSlot AI - Find Doctors View
window.FindDoctorsPage = {
  currentSpecialty: 'all',
  currentSearchQuery: '',
  aiMatchActive: true,
  currentSort: 'earliest',
  filterToday: false,
  filterTelehealth: false,
  filterHighRating: false,

  render() {
    return `
      <div class="flex flex-col w-full pb-20">
        <div class="max-w-[1440px] mx-auto w-full px-4 sm:px-gutter py-space-lg flex flex-col gap-space-lg">
          
          <!-- Top Breadcrumb & Live AI Radar Pill -->
          <div class="flex flex-wrap items-center justify-between gap-space-sm">
            <div class="inline-flex items-center gap-2 bg-surface-container-lowest px-space-md py-1.5 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
              <span class="material-symbols-outlined text-[18px] text-primary">clinical_notes</span>
              <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Provider Discovery</span>
              <span class="text-outline-variant">•</span>
              <span class="font-label-sm text-label-sm text-secondary font-bold" id="radar-clinician-count">7 Clinicians Available Today</span>
            </div>
            <div class="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed px-space-md py-1.5 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
              </span>
              <span class="font-label-sm text-label-sm font-bold">AI Dynamic Slot Optimizer Active</span>
            </div>
          </div>

          <!-- Title & Search Hero Hub -->
          <div class="relative bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] overflow-hidden">
            <!-- Decorative Memphis Geometric Shapes -->
            <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-secondary-fixed opacity-70 pointer-events-none border border-[#1E293B]"></div>
            <div class="absolute right-24 top-12 w-8 h-8 rotate-12 bg-tertiary-fixed border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] pointer-events-none"></div>
            <div class="absolute right-12 bottom-6 w-12 h-12 rounded-full bg-surface-container-highest border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] pointer-events-none"></div>

            <div class="relative z-10 max-w-3xl flex flex-col gap-space-xs">
              <div class="inline-flex items-center gap-1.5 w-max bg-secondary-fixed text-on-secondary-fixed px-space-sm py-0.5 rounded-full border border-[#1E293B] font-label-sm text-label-sm uppercase tracking-wide font-bold">
                <span class="material-symbols-outlined text-[14px]">bolt</span> Real-time Schedule Sync
              </div>
              <h1 class="font-headline-xl text-3xl sm:text-headline-xl text-on-surface font-extrabold">
                Find &amp; Book Top Clinicians <span class="text-primary">✦</span>
              </h1>
              <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                AI-powered match score finds the ideal doctor in under 30 seconds based on your symptoms, insurance, and real-time clinic capacity.
              </p>
            </div>

            <!-- Main Search & Smart Toggles -->
            <div class="relative z-10 mt-space-lg flex flex-col lg:flex-row gap-space-md items-stretch lg:items-center">
              <!-- Search Input with 2px borders and hard drop shadow -->
              <div class="flex-1 flex items-center bg-surface-container-lowest rounded-lg border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] px-space-md py-2.5 focus-within:shadow-[4px_4px_0px_#8455ef] transition-all">
                <span class="material-symbols-outlined text-outline text-[24px] mr-2">search</span>
                <input id="doctor-search-input" class="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none" placeholder="Search by doctor name, specialty, condition (e.g. Migraine, Dr. Sarah)..." type="text"/>
                <button onclick="FindDoctorsPage.searchNearMe()" class="hidden sm:flex items-center gap-1 bg-surface-container text-on-surface px-space-sm py-1 rounded-md border border-[#1E293B] font-label-sm text-label-sm hover:bg-surface-container-high transition-colors" type="button">
                  <span class="material-symbols-outlined text-[14px]">my_location</span> Near Me
                </button>
              </div>

              <!-- AI Smart Match Toggle -->
              <div class="flex items-center justify-between sm:justify-start gap-space-md bg-primary-fixed p-space-sm sm:px-space-md rounded-lg border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B]">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary border border-[#1E293B]">
                    <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-label-lg text-label-lg text-on-primary-fixed leading-tight font-bold">AI Smart Match</span>
                    <span class="font-label-sm text-label-sm text-on-primary-fixed-variant">Rank by optimal intake</span>
                  </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer ml-space-sm">
                  <input id="ai-match-toggle" checked="" class="sr-only peer" type="checkbox"/>
                  <div class="w-12 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-4.5 after:w-5 after:transition-all peer-checked:bg-primary border border-[#1E293B] shadow-[1px_1px_0px_#1E293B]"></div>
                </label>
              </div>
            </div>

            <!-- Filter Matrix Ribbon -->
            <div class="relative z-10 mt-space-md pt-space-md border-t-2 border-[#1E293B]/20 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <!-- Scrollable Filter Chips -->
              <div class="flex items-center gap-space-xs overflow-x-auto pb-1 sm:pb-0 no-scrollbar" id="specialty-pills-container">
                <button onclick="FindDoctorsPage.setSpecialty('all')" class="specialty-chip flex items-center gap-1 bg-primary text-on-primary px-space-md py-1.5 rounded-full border-2 border-[#1E293B] font-label-md text-label-md shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 transition-transform font-bold" data-specialty="all">
                  All Doctors
                </button>
                <button onclick="FindDoctorsPage.setSpecialty('Cardiology')" class="specialty-chip flex items-center gap-1 bg-surface-container-lowest text-on-surface px-space-md py-1.5 rounded-full border-2 border-[#1E293B] font-label-md text-label-md shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 hover:bg-surface-container transition-transform font-bold" data-specialty="Cardiology">
                  Cardiology
                </button>
                <button onclick="FindDoctorsPage.setSpecialty('Dermatology')" class="specialty-chip flex items-center gap-1 bg-surface-container-lowest text-on-surface px-space-md py-1.5 rounded-full border-2 border-[#1E293B] font-label-md text-label-md shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 hover:bg-surface-container transition-transform font-bold" data-specialty="Dermatology">
                  Dermatology
                </button>
                <button onclick="FindDoctorsPage.setSpecialty('Pediatrics')" class="specialty-chip flex items-center gap-1 bg-surface-container-lowest text-on-surface px-space-md py-1.5 rounded-full border-2 border-[#1E293B] font-label-md text-label-md shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 hover:bg-surface-container transition-transform font-bold" data-specialty="Pediatrics">
                  Pediatrics
                </button>
                <button onclick="FindDoctorsPage.setSpecialty('Orthopedics')" class="specialty-chip flex items-center gap-1 bg-surface-container-lowest text-on-surface px-space-md py-1.5 rounded-full border-2 border-[#1E293B] font-label-md text-label-md shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 hover:bg-surface-container transition-transform font-bold" data-specialty="Orthopedics">
                  Orthopedics
                </button>
                <button onclick="FindDoctorsPage.setSpecialty('Neurology')" class="specialty-chip flex items-center gap-1 bg-surface-container-lowest text-on-surface px-space-md py-1.5 rounded-full border-2 border-[#1E293B] font-label-md text-label-md shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 hover:bg-surface-container transition-transform font-bold" data-specialty="Neurology">
                  Neurology
                </button>
              </div>

              <!-- Quick Constraints Badges -->
              <div class="flex items-center gap-space-xs flex-shrink-0 flex-wrap">
                <button id="toggle-filter-today" onclick="FindDoctorsPage.toggleFilter('today')" class="flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-space-sm py-1 rounded-full border-2 border-[#1E293B] font-label-sm text-label-sm shadow-[2px_2px_0px_#1E293B] hover:shadow-[3px_3px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all font-bold" type="button">
                  <span class="material-symbols-outlined text-[14px]">bolt</span> Today ⚡
                </button>
                <button id="toggle-filter-telehealth" onclick="FindDoctorsPage.toggleFilter('telehealth')" class="flex items-center gap-1 bg-surface-container-lowest text-on-surface px-space-sm py-1 rounded-full border-2 border-[#1E293B] font-label-sm text-label-sm shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container transition-all font-bold" type="button">
                  <span class="material-symbols-outlined text-[14px]">videocam</span> Telehealth
                </button>
                <button id="toggle-filter-rating" onclick="FindDoctorsPage.toggleFilter('rating')" class="flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed px-space-sm py-1 rounded-full border-2 border-[#1E293B] font-label-sm text-label-sm shadow-[2px_2px_0px_#1E293B] hover:shadow-[3px_3px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all font-bold" type="button">
                  4.9+ ★
                </button>
              </div>
            </div>
          </div>

          <!-- Doctor Grid Results Meta Info -->
          <div class="flex items-center justify-between px-space-xs">
            <div class="flex items-center gap-2">
              <span class="font-headline-sm text-headline-sm text-on-surface font-bold">Available Specialists</span>
              <span class="bg-primary text-on-primary font-label-md text-label-md px-space-sm py-0.5 rounded-full border border-[#1E293B] shadow-[1px_1px_0px_#1E293B] font-bold" id="result-counter">Loading...</span>
            </div>
            <div class="hidden sm:flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
              <span class="font-bold">Sort:</span>
              <button id="sort-earliest-btn" onclick="FindDoctorsPage.setSort('earliest')" class="font-bold text-primary underline decoration-2 underline-offset-4">Earliest Available</button>
              <span class="text-outline-variant">•</span>
              <button id="sort-rating-btn" onclick="FindDoctorsPage.setSort('rating')" class="hover:text-on-surface">Highest Rating</button>
            </div>
          </div>

          <!-- Doctor Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg" id="doctor-cards-grid">
            <!-- Dynamic cards injected here -->
          </div>

          <!-- AI Live Waitlist Banner (Bottom Sticky Urgency Card) -->
          <div class="sticky bottom-4 z-30 bg-surface-container-lowest rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] p-space-md md:p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div class="flex items-center gap-space-md">
              <div class="w-12 h-12 rounded-full bg-secondary-fixed border-2 border-[#1E293B] flex items-center justify-center text-on-secondary-fixed shadow-[2px_2px_0px_#1E293B] flex-shrink-0">
                <span class="material-symbols-outlined text-[26px]">radar</span>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <h4 class="font-headline-sm text-headline-sm text-on-surface font-bold">Can't find your preferred doctor or slot?</h4>
                  <span class="hidden sm:inline-block bg-tertiary-fixed text-on-tertiary-fixed border border-[#1E293B] font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold">Scanning Live</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">
                  MediBot AI auto-monitors hospital cancellations every 90 seconds and reserves them before public release.
                </p>
              </div>
            </div>
            <div class="flex items-center gap-space-sm w-full md:w-auto">
              <button onclick="MediSlotModals.showWaitlistModal()" class="w-full md:w-auto flex items-center justify-center gap-2 bg-secondary text-on-secondary border-2 border-[#1E293B] px-space-lg py-2.5 rounded-full shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E293B] active:translate-y-0.5 active:shadow-none font-label-lg text-label-lg font-bold transition-all" type="button">
                <span class="material-symbols-outlined text-[18px]">notifications_active</span>
                Join Smart Waitlist
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  async afterRender() {
    // Parse URL query parameters if present (e.g. #find-doctors?q=cardio&specialty=Cardiology)
    const hash = window.location.hash;
    if (hash.includes('?')) {
      const qs = hash.split('?')[1];
      const params = new URLSearchParams(qs);
      if (params.get('q')) {
        this.currentSearchQuery = params.get('q');
        const input = document.getElementById('doctor-search-input');
        if (input) input.value = this.currentSearchQuery;
      }
      if (params.get('specialty')) {
        this.currentSpecialty = params.get('specialty');
      }
    }

    // Bind search input with debounce
    const searchInput = document.getElementById('doctor-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentSearchQuery = e.target.value;
        this.fetchAndRenderDoctors();
      });
    }

    // AI Match toggle
    const aiToggle = document.getElementById('ai-match-toggle');
    if (aiToggle) {
      aiToggle.addEventListener('change', (e) => {
        this.aiMatchActive = e.target.checked;
        this.fetchAndRenderDoctors();
      });
    }

    await this.fetchAndRenderDoctors();
  },

  async fetchAndRenderDoctors() {
    const params = {
      specialty: this.currentSpecialty,
      query: this.currentSearchQuery,
      sort: this.currentSort,
      aiMatch: this.aiMatchActive
    };

    if (this.filterHighRating) {
      params.minRating = 4.9;
    }
    if (this.filterTelehealth) {
      params.telehealth = 'true';
    }

    const doctors = await MediSlotStore.fetchDoctors(params);
    let filtered = doctors;

    if (this.filterToday) {
      filtered = filtered.filter(d => (d.earliest_slot || '').toLowerCase().includes('today'));
    }

    const counter = document.getElementById('result-counter');
    if (counter) {
      counter.innerText = `${filtered.length} Matches`;
    }

    const grid = document.getElementById('doctor-cards-grid');
    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full bg-surface-container-lowest p-8 rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] text-center flex flex-col items-center gap-2">
          <span class="material-symbols-outlined text-4xl text-outline">search_off</span>
          <h3 class="font-headline-sm text-lg font-bold text-on-surface">No specialists matched your exact query</h3>
          <p class="font-body-sm text-on-surface-variant">Try resetting filters or ask MediBot to scan cancellations for you.</p>
          <button onclick="FindDoctorsPage.resetFilters()" class="mt-2 bg-primary text-white px-4 py-2 rounded-full font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
            Reset All Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((doc, idx) => {
      const headerStyles = [
        { bg: 'bg-primary-fixed', badgeBg: 'bg-primary', badgeText: 'text-on-primary', icon: 'psychology' },
        { bg: 'bg-secondary-fixed', badgeBg: 'bg-secondary', badgeText: 'text-on-secondary', icon: 'sports_martial_arts' },
        { bg: 'bg-tertiary-fixed', badgeBg: 'bg-tertiary', badgeText: 'text-on-tertiary', icon: 'stethoscope' }
      ];
      const hStyle = headerStyles[idx % 3];

      return `
        <div class="doctor-card bg-surface-container-lowest rounded-xl border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] overflow-hidden flex flex-col justify-between transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E293B]">
          
          <!-- Colored Header Banner -->
          <div class="${hStyle.bg} p-space-md border-b-2 border-[#1E293B] flex items-center justify-between">
            <div class="flex items-center gap-1 bg-surface-container-lowest text-on-surface px-space-sm py-0.5 rounded-full border border-[#1E293B] font-label-sm text-label-sm shadow-[1px_1px_0px_#1E293B] font-bold">
              <span class="material-symbols-outlined text-primary text-[14px]">${hStyle.icon}</span>
              <span>${doc.specialty}</span>
            </div>
            <div class="flex items-center gap-1 ${hStyle.badgeBg} ${hStyle.badgeText} px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-bold border border-[#1E293B] shadow-[1px_1px_0px_#1E293B]">
              <span class="material-symbols-outlined text-[13px]">bolt</span> ${doc.match_percentage}% AI Match
            </div>
          </div>

          <div class="p-space-lg flex flex-col gap-space-md flex-grow">
            <!-- Profile Identity Header -->
            <div class="flex items-start gap-space-md">
              <div class="relative w-16 h-16 rounded-full overflow-hidden bg-primary-fixed flex-shrink-0 border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
                <img class="w-full h-full object-cover" src="${doc.avatar_url}" alt="${doc.name}"/>
                <span class="absolute bottom-0 right-0 w-4 h-4 bg-tertiary-fixed rounded-full flex items-center justify-center border border-[#1E293B]">
                  <span class="material-symbols-outlined text-on-tertiary-fixed text-[11px] font-bold">verified</span>
                </span>
              </div>
              <div class="flex flex-col min-w-0">
                <div class="flex items-center gap-1">
                  <h3 class="font-headline-sm text-headline-sm text-on-surface truncate font-bold">${doc.name}</h3>
                  <span class="font-label-sm text-label-sm bg-surface-container text-on-surface px-1.5 py-0.2 rounded font-bold border border-[#1E293B]">MD</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant truncate">${doc.clinic}</p>
                <div class="flex items-center gap-1 text-tertiary font-label-sm text-label-sm mt-0.5">
                  <span class="material-symbols-outlined text-[15px] fill-1">star</span>
                  <span class="font-bold">${doc.rating}</span>
                  <span class="text-on-surface-variant">(${doc.review_count} reviews)</span>
                </div>
              </div>
            </div>

            <!-- Quick Stats Pills -->
            <div class="flex flex-wrap gap-space-xs">
              <span class="bg-surface-container-low text-on-surface px-space-sm py-1 rounded-full border border-[#1E293B] font-label-sm text-label-sm shadow-[1px_1px_0px_#1E293B] font-bold">
                ${doc.experience_yrs} yrs exp
              </span>
              <span class="bg-secondary-fixed text-on-secondary-fixed px-space-sm py-1 rounded-full border border-[#1E293B] font-label-sm text-label-sm shadow-[1px_1px_0px_#1E293B] font-bold">
                ${(doc.procedures || '').split(',')[0]}
              </span>
              <span class="bg-surface-container-highest text-on-surface px-space-sm py-1 rounded-full border border-[#1E293B] font-label-sm text-label-sm">
                ${doc.languages}
              </span>
            </div>

            <!-- Highlighted Next Slot Pill -->
            <div class="bg-surface-container-low p-space-sm rounded-lg border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-secondary text-[18px]">timer</span>
                <div class="flex flex-col">
                  <span class="font-label-sm text-label-sm text-on-surface-variant">Earliest Slot</span>
                  <span class="font-label-md text-label-md text-on-surface font-bold">✦ ${doc.earliest_slot}</span>
                </div>
              </div>
              <div class="text-right">
                <span class="font-label-sm text-label-sm text-on-surface-variant">Fee</span>
                <p class="font-headline-sm text-headline-sm text-primary leading-tight font-extrabold">$${doc.fee.toFixed(0)}</p>
              </div>
            </div>
          </div>

          <!-- Action Bar -->
          <div class="p-space-md bg-surface-container-low border-t-2 border-[#1E293B] flex items-center gap-space-sm">
            <button onclick="MediSlotModals.showDoctorProfile(${doc.id})" class="flex-1 bg-surface-container-lowest text-on-surface px-space-sm py-2 rounded-full border-2 border-[#1E293B] font-label-md text-label-md font-bold shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#1E293B] active:translate-y-0 active:shadow-none transition-all" type="button">
              View Profile
            </button>
            <button onclick="MediSlotModals.bookDoctorDirect(${doc.id})" class="flex-1 flex items-center justify-center gap-1 bg-primary text-on-primary px-space-sm py-2 rounded-full border-2 border-[#1E293B] font-label-md text-label-md font-bold shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1E293B] active:translate-y-0 active:shadow-none transition-all" type="button">
              <span>Book Appt</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

        </div>
      `;
    }).join('');
  },

  setSpecialty(specialty) {
    this.currentSpecialty = specialty;
    document.querySelectorAll('.specialty-chip').forEach(btn => {
      const s = btn.getAttribute('data-specialty');
      if (s === specialty) {
        btn.classList.remove('bg-surface-container-lowest', 'text-on-surface');
        btn.classList.add('bg-primary', 'text-on-primary');
      } else {
        btn.classList.remove('bg-primary', 'text-on-primary');
        btn.classList.add('bg-surface-container-lowest', 'text-on-surface');
      }
    });
    this.fetchAndRenderDoctors();
  },

  toggleFilter(type) {
    if (type === 'today') {
      this.filterToday = !this.filterToday;
      const el = document.getElementById('toggle-filter-today');
      if (el) el.classList.toggle('ring-2', this.filterToday);
    } else if (type === 'telehealth') {
      this.filterTelehealth = !this.filterTelehealth;
      const el = document.getElementById('toggle-filter-telehealth');
      if (el) el.classList.toggle('ring-2', this.filterTelehealth);
    } else if (type === 'rating') {
      this.filterHighRating = !this.filterHighRating;
      const el = document.getElementById('toggle-filter-rating');
      if (el) el.classList.toggle('ring-2', this.filterHighRating);
    }
    this.fetchAndRenderDoctors();
  },

  setSort(sort) {
    this.currentSort = sort;
    const earliestBtn = document.getElementById('sort-earliest-btn');
    const ratingBtn = document.getElementById('sort-rating-btn');
    if (sort === 'earliest') {
      earliestBtn.className = 'font-bold text-primary underline decoration-2 underline-offset-4';
      ratingBtn.className = 'hover:text-on-surface';
    } else {
      ratingBtn.className = 'font-bold text-primary underline decoration-2 underline-offset-4';
      earliestBtn.className = 'hover:text-on-surface';
    }
    this.fetchAndRenderDoctors();
  },

  searchNearMe() {
    showToast('Detected location: Palo Alto, CA. Filtering Stanford Medical Corridor.', 'info');
    const input = document.getElementById('doctor-search-input');
    if (input) {
      input.value = 'Palo Alto';
      this.currentSearchQuery = 'Palo Alto';
      this.fetchAndRenderDoctors();
    }
  },

  resetFilters() {
    this.currentSpecialty = 'all';
    this.currentSearchQuery = '';
    this.filterToday = false;
    this.filterTelehealth = false;
    this.filterHighRating = false;
    const input = document.getElementById('doctor-search-input');
    if (input) input.value = '';
    this.setSpecialty('all');
  }
};
