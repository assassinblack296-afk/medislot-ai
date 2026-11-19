// MediSlot AI - Complete 6-Step Appointment Booking Engine
window.BookAppointmentPage = {
  render() {
    const s = MediSlotStore.bookingState;
    const doc = s.doctor || {
      id: 1,
      name: 'Dr. Sarah Jenkins, MD',
      title: 'Senior Cardiologist',
      specialty: 'Cardiology',
      clinic: 'Stanford Medical Center',
      address: 'Stanford Health Plaza, Suite 402, 300 Pasteur Dr, Palo Alto',
      rating: 4.98,
      review_count: 340,
      fee: 120.00,
      avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwb0Ju8pqUPElote7vtFU_c_LgubjUJfVGIICiRpMmb4Q-DBqCHCCasCWhQG4NwsB8G2ua4-FQ-6S68xHxPxkQfYhPLuUqPFh4FRh4R8gEaw63hI4Rbbc9bJ_bWxTQZop7qN-C1AmACmesRQqIuJE6LsS5T9fUb-19gFGQi3_Wb8yKT0j7njyweFvK4zC66P3Ny9-R0pZ5YM9pUyW1t7RpmIiB5BQCn9DZgVKlPo8'
    };

    return `
      <div class="flex flex-col w-full pb-20">
        
        <!-- Top 6-Step Stepper Bar -->
        <div class="px-4 sm:px-gutter pt-space-lg pb-space-md border-b-2 border-[#1E293B] bg-[#FFFDF5]">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between overflow-x-auto py-2 no-scrollbar" id="booking-stepper">
              ${this.renderStepperHtml(s.currentStep)}
            </div>
          </div>
        </div>

        <!-- Doctor Summary & Shield Lock Banner -->
        <div class="px-4 sm:px-gutter py-space-md bg-surface-container-low border-b-2 border-[#1E293B]">
          <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div class="flex items-center gap-space-md">
              <div class="relative w-14 h-14 rounded-full border-2 border-[#1E293B] overflow-hidden bg-primary-fixed shadow-[3px_3px_0px_#1E293B] shrink-0">
                <img src="${doc.avatar_url}" class="w-full h-full object-cover" alt="${doc.name}"/>
                <div class="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#34D399] border-2 border-[#1E293B]"></div>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-space-xs flex-wrap">
                  <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">${doc.name}</h2>
                  <span class="bg-secondary-fixed text-on-secondary-fixed border-2 border-[#1E293B] text-label-sm font-label-sm px-2 py-0.5 rounded-full shadow-[2px_2px_0px_#1E293B] font-bold">
                    ${doc.title || doc.specialty}
                  </span>
                  <button onclick="MediSlotModals.showSwitchClinicianModal()" class="text-xs text-primary underline font-bold ml-1 hover:text-secondary flex items-center gap-0.5" type="button">
                    <span class="material-symbols-outlined text-[14px]">swap_horiz</span>
                    Switch Clinician
                  </button>
                </div>
                <span class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2 mt-0.5 flex-wrap">
                  <span class="material-symbols-outlined text-[16px] text-tertiary">star</span> ${doc.rating || 4.98} (${doc.review_count || 340}+ reviews) • ${doc.clinic} • <strong class="text-on-surface font-bold">$${(doc.fee || 120).toFixed(2)} / visit</strong>
                </span>
              </div>
            </div>

            <!-- Slot Reservation Hold Indicator -->
            <div class="flex items-center gap-space-sm bg-tertiary-fixed border-2 border-[#1E293B] px-space-md py-2 rounded-full shadow-[3px_3px_0px_#1E293B] self-start md:self-auto">
              <span class="material-symbols-outlined text-tertiary text-[18px]">lock_clock</span>
              <div class="flex items-center gap-1.5 font-label-md text-xs sm:text-sm text-on-tertiary-fixed font-bold">
                <span>Slot Reserved:</span>
                <span id="shield-timer-display" class="bg-[#FFFDF5] border border-[#1E293B] px-2 py-0.5 rounded text-on-surface font-extrabold tracking-wider font-mono">09:45</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Dynamic Step Workspace -->
        <div class="px-4 sm:px-gutter py-space-lg max-w-7xl mx-auto w-full">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            
            <!-- Left 8 Columns: Dynamic Step Content -->
            <div class="lg:col-span-8 flex flex-col gap-space-lg" id="step-workspace-container">
              ${this.renderStepWorkspace(s.currentStep, doc)}
            </div>

            <!-- Right 4 Columns: Sticky Booking Breakdown & Ticket Card -->
            <div class="lg:col-span-4 sticky top-28 flex flex-col gap-space-md">
              <!-- Main Checkout Ticket Card -->
              <div class="bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex flex-col gap-space-md relative overflow-hidden">
                <div class="border-b-2 border-dashed border-[#1E293B] pb-space-sm">
                  <span class="font-label-sm text-label-sm uppercase font-extrabold tracking-wider text-outline">Reservation Summary</span>
                  <h4 class="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">Stanford Clinical Pass</h4>
                </div>

                <!-- Doctor & Service Row -->
                <div class="flex items-center gap-space-sm">
                  <div class="w-12 h-12 rounded-lg bg-primary-fixed border-2 border-[#1E293B] flex items-center justify-center shadow-[2px_2px_0px_#1E293B] shrink-0">
                    <span class="material-symbols-outlined text-primary text-[28px]">medical_services</span>
                  </div>
                  <div class="flex flex-col flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-1">
                      <span class="font-headline-sm text-[15px] text-on-surface font-bold truncate">${doc.name}</span>
                      <button onclick="MediSlotModals.showSwitchClinicianModal()" class="text-[11px] text-primary underline font-bold hover:text-secondary shrink-0" type="button">Switch</button>
                    </div>
                    <span class="font-body-sm text-body-sm text-on-surface-variant truncate">${doc.specialty} Consultation</span>
                  </div>
                </div>

                <!-- Scheduled Slot Box -->
                <div class="bg-surface-container-low border-2 border-[#1E293B] rounded-lg p-space-sm shadow-[2px_2px_0px_#1E293B] flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[18px]">calendar_month</span>
                    <span id="ticket-date" class="font-label-md text-label-md text-on-surface font-bold">${s.selectedDate}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-secondary text-[18px]">alarm</span>
                    <span id="ticket-time" class="font-label-md text-label-md text-on-surface font-bold">${s.selectedSlotTime} (PDT)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary text-[18px]">pin_drop</span>
                    <span id="ticket-mode" class="font-label-sm text-label-sm text-on-surface-variant font-bold">
                      ${s.consultMode === 'telehealth' ? 'Secure Telehealth Video Call' : 'Stanford Health • Suite 402'}
                    </span>
                  </div>
                </div>

                <!-- Fee Calculation Table -->
                <div class="flex flex-col gap-2 border-t-2 border-dashed border-[#1E293B] pt-space-sm font-body-sm text-body-sm">
                  <div class="flex justify-between items-center text-on-surface">
                    <span>Standard Specialist Fee</span>
                    <span class="font-bold">$${(doc.fee || 120).toFixed(2)}</span>
                  </div>
                  <div class="flex justify-between items-center text-on-surface">
                    <span>Clinical Intake & Triage</span>
                    <span class="font-bold text-[#10B981]">Included</span>
                  </div>
                  <div class="flex justify-between items-center text-outline">
                    <span>Clinic Overhead / Facility Fee</span>
                    <span>Included</span>
                  </div>
                  <div class="border-t-2 border-[#1E293B] pt-2 flex justify-between items-baseline mt-1">
                    <div class="flex flex-col">
                      <span class="font-headline-sm text-headline-sm text-on-surface font-bold">Total Due</span>
                      <span class="font-label-sm text-[10px] text-outline font-bold">HSA / FSA Card Eligible</span>
                    </div>
                    <span class="font-headline-lg text-headline-lg text-primary font-extrabold">$${(doc.fee || 120).toFixed(2)}</span>
                  </div>
                </div>

                <!-- Primary CTA Button (Depends on Current Step) -->
                ${this.renderSidebarCta(s.currentStep)}

                <!-- Security Badges Footer -->
                <div class="flex items-center justify-center gap-space-md pt-space-xs text-outline font-label-sm text-label-sm">
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[#34D399] text-[16px]">verified_user</span>
                    <span>HIPAA Compliant</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-primary text-[16px]">lock</span>
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>
              </div>

              <!-- AI Assistant Helper Micro-Card -->
              <div class="bg-secondary-fixed border-2 border-[#1E293B] rounded-xl p-space-md shadow-[3px_3px_0px_#1E293B] flex items-start gap-space-sm">
                <div class="w-8 h-8 rounded-full bg-[#FFFDF5] border-2 border-[#1E293B] flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-secondary text-[18px]">smart_toy</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-label-md text-label-md text-on-secondary-fixed font-bold">Need a ride or translator?</span>
                  <p class="font-body-sm text-body-sm text-on-secondary-fixed mt-0.5">
                    MediSlot AI can arrange wheelchair transit or certified ASL/Spanish medical interpreters in Step 4.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  renderStepperHtml(activeStep) {
    const steps = [
      { num: 1, label: 'Doctor Selected' },
      { num: 2, label: 'Date & Time' },
      { num: 3, label: 'Consult Mode' },
      { num: 4, label: 'Intake Details' },
      { num: 5, label: 'Review' },
      { num: 6, label: 'Confirm' }
    ];

    return steps.map((st, i) => {
      const isDone = st.num < activeStep;
      const isActive = st.num === activeStep;

      let bubbleHtml = '';
      if (isDone) {
        bubbleHtml = `
          <div class="w-9 h-9 rounded-full bg-[#34D399] border-2 border-[#1E293B] flex items-center justify-center shadow-[2px_2px_0px_#1E293B] text-on-surface font-label-md text-label-md font-bold">
            <span class="material-symbols-outlined text-[18px]">check</span>
          </div>
        `;
      } else if (isActive) {
        bubbleHtml = `
          <div class="w-9 h-9 rounded-full bg-primary text-on-primary border-2 border-[#1E293B] flex items-center justify-center shadow-[4px_4px_0px_#1E293B] font-label-md text-label-md font-extrabold animate-pulse">
            ${st.num}
          </div>
        `;
      } else {
        bubbleHtml = `
          <div class="w-9 h-9 rounded-full bg-surface-container-lowest border-2 border-[#1E293B] flex items-center justify-center shadow-[2px_2px_0px_#1E293B] text-on-surface font-label-md text-label-md font-bold">
            ${st.num}
          </div>
        `;
      }

      const divider = i < steps.length - 1
        ? `<div class="w-8 sm:w-12 h-0.5 ${isDone ? 'bg-[#1E293B]' : 'bg-outline-variant'} shrink-0 mx-2"></div>`
        : '';

      return `
        <div class="flex items-center gap-space-xs shrink-0 cursor-pointer ${isActive ? 'opacity-100' : isDone ? 'opacity-90' : 'opacity-50'}" onclick="BookAppointmentPage.goToStep(${st.num})">
          ${bubbleHtml}
          <div class="flex flex-col">
            <span class="font-label-sm text-label-sm uppercase tracking-wider ${isActive ? 'text-primary font-bold' : 'text-outline'}">Step ${st.num}</span>
            <span class="font-label-md text-label-md text-on-surface font-bold whitespace-nowrap">${st.label}</span>
          </div>
        </div>
        ${divider}
      `;
    }).join('');
  },

  renderSidebarCta(currentStep) {
    if (currentStep === 6) {
      return `
        <a href="#patient-portal" class="w-full bg-[#10B981] text-white border-2 border-[#1E293B] rounded-full py-3.5 px-space-md shadow-[4px_4px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 font-headline-sm text-[18px] font-bold">
          <span>Go to Patient Portal</span>
          <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
        </a>
      `;
    }

    let btnText = 'Proceed to Patient Details';
    let nextStep = currentStep + 1;

    if (currentStep === 1) btnText = 'Proceed to Date & Time';
    else if (currentStep === 2) btnText = 'Proceed to Consult Mode';
    else if (currentStep === 3) btnText = 'Proceed to Intake Details';
    else if (currentStep === 4) btnText = 'Review Reservation Summary';
    else if (currentStep === 5) btnText = 'Confirm & Pay Slot';

    return `
      <button onclick="BookAppointmentPage.handleProceed(${nextStep})" class="w-full bg-primary text-on-primary border-2 border-[#1E293B] rounded-full py-3.5 px-space-md shadow-[4px_4px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 font-headline-sm text-[17px] font-bold group" type="button">
        <span>${btnText}</span>
        <span class="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
      </button>
    `;
  },

  renderStepWorkspace(step, doc) {
    if (step === 1) {
      return this.renderStep1DoctorSelection();
    } else if (step === 2) {
      return this.renderStep2DateTime(doc);
    } else if (step === 3) {
      return this.renderStep3ConsultMode();
    } else if (step === 4) {
      return this.renderStep4IntakeDetails();
    } else if (step === 5) {
      return this.renderStep5Review(doc);
    } else if (step === 6) {
      return this.renderStep6Confirmation();
    }
  },

  // STEP 1: DOCTOR SELECTION
  renderStep1DoctorSelection() {
    const docs = (MediSlotStore.doctors && MediSlotStore.doctors.length > 0) ? MediSlotStore.doctors : [
      { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', clinic: 'Stanford Medical Center', rating: 4.98, fee: 120, avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300' },
      { id: 2, name: 'Dr. Sarah Chen', specialty: 'Dermatology', clinic: 'St. Jude Pavilion', rating: 4.98, fee: 130, avatar_url: 'https://images.unsplash.com/photo-1594824813627-2c9c223c2a63?auto=format&fit=crop&q=80&w=300' },
      { id: 3, name: 'Dr. Marcus Vance', specialty: 'Cardiology', clinic: 'Metro Heart Institute', rating: 4.92, fee: 145, avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300' },
      { id: 4, name: 'Dr. Elena Rostova', specialty: 'Neurology', clinic: 'Cerebral Center & UCSF', rating: 4.90, fee: 120, avatar_url: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=300' },
      { id: 5, name: 'Dr. Marcus Chen', specialty: 'Orthopedics', clinic: 'Stanford Health Pavilion', rating: 4.85, fee: 110, avatar_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300' },
      { id: 6, name: 'Dr. Julian Ramos', specialty: 'Pediatrics', clinic: 'Sunrise Kids Clinic', rating: 4.95, fee: 115, avatar_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300' },
      { id: 7, name: 'Dr. Priya Patel', specialty: 'Endocrinology', clinic: 'Palo Alto Endocrine Center', rating: 4.93, fee: 135, avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300' }
    ];

    const currentDocId = MediSlotStore.bookingState.doctorId || (MediSlotStore.bookingState.doctor && MediSlotStore.bookingState.doctor.id) || 1;

    return `
      <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex flex-col gap-space-md">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Select Your Specialist</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Choose a clinician best suited for your symptoms to view their live calendar slots.</p>
          </div>
          <button onclick="MediBot.open()" class="text-xs font-bold text-secondary flex items-center gap-1 hover:underline" type="button">
            <span class="material-symbols-outlined text-[16px]">smart_toy</span>
            Ask MediBot to Match Symptoms
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          ${docs.map(d => {
            const isSelected = d.id === currentDocId;
            return `
              <div onclick="BookAppointmentPage.pickDoctor(${d.id})" class="p-space-md rounded-xl border-2 border-[#1E293B] ${isSelected ? 'bg-primary-fixed shadow-[4px_4px_0px_#1E293B] ring-2 ring-primary' : 'bg-surface-container-lowest shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container hover:-translate-y-0.5'} cursor-pointer transition-all flex flex-col justify-between gap-2">
                <div class="flex items-center gap-space-sm">
                  <div class="w-12 h-12 rounded-full border-2 border-[#1E293B] overflow-hidden shrink-0 bg-primary-fixed">
                    <img src="${d.avatar_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'}" class="w-full h-full object-cover" alt="${d.name}"/>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <h4 class="font-headline-sm text-[16px] font-bold text-on-surface truncate">${d.name}</h4>
                      ${isSelected ? `<span class="bg-primary text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">SELECTED</span>` : ''}
                    </div>
                    <span class="text-xs font-bold text-secondary truncate">${d.specialty} • ${d.clinic}</span>
                  </div>
                </div>
                <div class="flex justify-between items-center text-xs font-bold border-t border-[#1E293B]/20 pt-1.5">
                  <span class="text-tertiary flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-[14px]">star</span>
                    ${d.rating}
                  </span>
                  <span class="text-primary font-extrabold">$${d.fee} / consult</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // Calendar Navigation Helpers
  getMonthName(monthNum) {
    const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return names[monthNum - 1] || 'October';
  },

  changeMonth(delta) {
    if (!this.calendarYear) this.calendarYear = 2024;
    if (!this.calendarMonth) this.calendarMonth = 10;

    this.calendarMonth += delta;
    if (this.calendarMonth < 1) {
      this.calendarMonth = 12;
      this.calendarYear--;
    } else if (this.calendarMonth > 12) {
      this.calendarMonth = 1;
      this.calendarYear++;
    }

    const titleEl = document.getElementById('calendar-month-title');
    if (titleEl) {
      titleEl.innerText = `${this.getMonthName(this.calendarMonth)} ${this.calendarYear}`;
    }

    const gridEl = document.getElementById('calendar-day-grid');
    if (gridEl) {
      gridEl.innerHTML = this.renderCalendarDays();
    }
    showToast(`Viewing ${this.getMonthName(this.calendarMonth)} ${this.calendarYear} schedules`, 'info');
  },

  // STEP 2: DATE & TIME
  renderStep2DateTime(doc) {
    const s = MediSlotStore.bookingState;
    if (!this.calendarYear || !this.calendarMonth) {
      const parts = (s.selectedDate || '2024-10-24').split('-').map(Number);
      this.calendarYear = parts[0] || 2024;
      this.calendarMonth = parts[1] || 10;
    }

    return `
      <!-- Interactive Calendar Container -->
      <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B]">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md border-b-2 border-[#1E293B] gap-space-sm">
          <div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[24px]">event_note</span>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Select Appointment Date</h3>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Real-time availability synced with ${doc.clinic}</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="BookAppointmentPage.changeMonth(-1)" class="w-9 h-9 rounded-full bg-surface-container border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-center hover:-translate-x-0.5 active:translate-x-0.5 transition-transform" type="button" title="Previous Month">
              <span class="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <div class="bg-primary-fixed border-2 border-[#1E293B] px-space-md py-1 rounded-full shadow-[2px_2px_0px_#1E293B] font-headline-sm text-[16px] text-on-primary-fixed font-bold min-w-[150px] text-center">
              <span id="calendar-month-title">${this.getMonthName(this.calendarMonth)} ${this.calendarYear}</span>
            </div>
            <button onclick="BookAppointmentPage.changeMonth(1)" class="w-9 h-9 rounded-full bg-surface-container border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-center hover:-translate-x-0.5 active:translate-x-0.5 transition-transform" type="button" title="Next Month">
              <span class="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        <!-- Legend -->
        <div class="flex items-center gap-space-md pt-space-sm pb-space-xs text-label-sm font-label-sm text-on-surface-variant flex-wrap">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-[#34D399] border border-[#1E293B]"></span>
            <span>AI Low-Wait Days</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-primary border border-[#1E293B]"></span>
            <span>Selected Date</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-surface-dim border border-[#1E293B]"></span>
            <span>Clinic Closed / Weekend</span>
          </div>
        </div>

        <!-- Day Headers -->
        <div class="grid grid-cols-7 gap-2 pt-space-sm pb-space-xs text-center font-label-md text-label-md text-outline uppercase font-extrabold">
          <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
        </div>

        <!-- Date Matrix -->
        <div class="grid grid-cols-7 gap-2" id="calendar-day-grid">
          ${this.renderCalendarDays()}
        </div>
      </div>

      <!-- Available Time Slots Section -->
      <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B]">
        <div class="flex items-center justify-between pb-space-md border-b-2 border-[#1E293B] flex-wrap gap-2">
          <div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-[24px]">schedule</span>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Available Time Slots</h3>
            </div>
            <p id="slots-date-heading" class="font-body-sm text-body-sm text-on-surface-variant">Selected date: ${s.selectedDate} • 45 Min Session</p>
          </div>
          <div id="slots-count-badge" class="bg-secondary-fixed border-2 border-[#1E293B] px-space-sm py-1 rounded-full shadow-[2px_2px_0px_#1E293B] flex items-center gap-1.5 font-label-sm text-label-sm text-on-secondary-fixed font-bold">
            <span class="material-symbols-outlined text-secondary text-[16px]">bolt</span>
            <span>8 Slots Open</span>
          </div>
        </div>

        <!-- Morning Slots -->
        <div class="pt-space-md">
          <span class="font-label-md text-label-md text-outline uppercase font-extrabold tracking-wider flex items-center gap-1.5 mb-space-sm">
            <span class="material-symbols-outlined text-[16px] text-tertiary">wb_sunny</span>
            Morning Sessions
          </span>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-space-sm" id="morning-slots-grid">
            ${this.renderSlotButton('09:00 AM', 'Regular Slot', 'regular', s.selectedSlotTime === '09:00 AM', 1)}
            ${this.renderSlotButton('09:45 AM', 'Min wait time', 'ai_pick', s.selectedSlotTime === '09:45 AM', 2)}
            ${this.renderSlotButton('10:30 AM', 'Min wait time', 'regular', (s.selectedSlotTime === '10:30 AM' || !s.selectedSlotTime), 3)}
            ${this.renderSlotButton('11:15 AM', 'Regular Slot', 'regular', s.selectedSlotTime === '11:15 AM', 4)}
          </div>
        </div>

        <!-- Afternoon Slots -->
        <div class="pt-space-md">
          <span class="font-label-md text-label-md text-outline uppercase font-extrabold tracking-wider flex items-center gap-1.5 mb-space-sm">
            <span class="material-symbols-outlined text-[16px] text-secondary">light_mode</span>
            Afternoon Sessions
          </span>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-space-sm" id="afternoon-slots-grid">
            ${this.renderSlotButton('02:00 PM', 'Regular Slot', 'regular', s.selectedSlotTime === '02:00 PM', 5)}
            ${this.renderSlotButton('02:45 PM', 'Quick In-take', 'fast_track', s.selectedSlotTime === '02:45 PM', 6)}
            ${this.renderSlotButton('03:30 PM', 'Regular Slot', 'regular', s.selectedSlotTime === '03:30 PM', 7)}
            ${this.renderSlotButton('04:15 PM', 'Regular Slot', 'regular', s.selectedSlotTime === '04:15 PM', 8)}
          </div>
        </div>
      </div>
    `;
  },

  renderCalendarDays() {
    const year = this.calendarYear || 2024;
    const month = this.calendarMonth || 10;
    const days = [];

    // Parse active selected date
    const s = MediSlotStore.bookingState;
    const activeDate = s.selectedDate || `${year}-${String(month).padStart(2, '0')}-24`;
    const [selY, selM, selD] = activeDate.split('-').map(Number);

    // Total days in current month
    const totalDays = new Date(year, month, 0).getDate();

    // Day of the week for the 1st of the month (0=Sun, 1=Mon, ..., 6=Sat)
    const firstDay = new Date(year, month - 1, 1).getDay();
    // Monday-first offset: Mon=0, Tue=1, ..., Sun=6
    const mondayOffset = (firstDay === 0 ? 6 : firstDay - 1);

    // Days in previous month for trailing fill
    const prevMonthDays = new Date(year, month - 1, 0).getDate();
    for (let i = mondayOffset - 1; i >= 0; i--) {
      const prevD = prevMonthDays - i;
      days.push(`
        <button class="h-14 rounded-lg bg-surface-container-low border border-dashed border-outline-variant flex flex-col items-center justify-center text-outline opacity-40 cursor-not-allowed" disabled type="button">
          <span class="font-label-md font-bold">${prevD}</span>
        </button>
      `);
    }

    // Days of current month
    for (let d = 1; d <= totalDays; d++) {
      // Day of week for current date (0=Sun, 6=Sat)
      const dayOfWeek = (firstDay + d - 1) % 7;
      const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
      const isSelected = (selY === year && selM === month && selD === d);

      if (isWeekend) {
        days.push(`
          <button class="h-14 rounded-lg bg-surface-dim border-2 border-[#1E293B] flex flex-col items-center justify-center text-outline cursor-not-allowed" disabled type="button" title="Clinic closed on weekends">
            <span class="font-label-md font-bold">${d}</span>
            <span class="font-label-sm text-[9px] uppercase font-bold text-outline">Off</span>
          </button>
        `);
      } else if (isSelected) {
        days.push(`
          <button onclick="BookAppointmentPage.pickCalendarDate(${year}, ${month}, ${d})" class="h-14 rounded-lg bg-primary text-on-primary border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] -translate-x-0.5 -translate-y-0.5 flex flex-col items-center justify-between p-1 font-bold ring-2 ring-primary-container" type="button">
            <span class="font-headline-sm text-headline-sm font-extrabold">${d}</span>
            <span class="font-label-sm text-[9px] uppercase tracking-wider bg-[#FFFDF5] text-primary px-1 rounded-sm font-extrabold">Active</span>
          </button>
        `);
      } else {
        const hasLowWait = (d % 2 === 0 || d % 3 === 0);
        days.push(`
          <button onclick="BookAppointmentPage.pickCalendarDate(${year}, ${month}, ${d})" class="h-14 rounded-lg bg-[#FFFDF5] border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex flex-col items-center justify-between p-1 hover:bg-surface-container hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all" type="button">
            <span class="font-label-md font-bold text-on-surface">${d}</span>
            ${hasLowWait ? '<span class="w-2 h-2 rounded-full bg-[#34D399]" title="AI Low-Wait Day"></span>' : '<span class="w-2 h-2"></span>'}
          </button>
        `);
      }
    }

    // Trailing days of next month to complete the last row
    const totalCells = mondayOffset + totalDays;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let nextD = 1; nextD <= remaining; nextD++) {
      days.push(`
        <button class="h-14 rounded-lg bg-surface-container-low border border-dashed border-outline-variant flex flex-col items-center justify-center text-outline opacity-40 cursor-not-allowed" disabled type="button">
          <span class="font-label-md font-bold">${nextD}</span>
        </button>
      `);
    }

    return days.join('');
  },

  renderSlotButton(time, subtitle, type = 'regular', forceSelected = false, slotId = null, status = 'available') {
    const isSelected = forceSelected || (MediSlotStore.bookingState.selectedSlotTime === time);
    const isLockedOrBooked = status === 'locked' || status === 'booked';

    if (isLockedOrBooked) {
      return `
        <button disabled class="slot-button p-2.5 rounded-xl border-2 border-[#1E293B] bg-surface-dim opacity-60 cursor-not-allowed flex flex-col items-center" type="button" data-time="${time}" data-type="${type}" data-slot-id="${slotId || ''}">
          <span class="font-headline-sm text-[16px] text-outline font-bold line-through">${time}</span>
          <span class="font-label-sm text-[10px] text-outline uppercase font-bold mt-0.5">${status === 'locked' ? 'Shielded' : 'Booked'}</span>
        </button>
      `;
    }

    if (isSelected) {
      return `
        <button onclick="BookAppointmentPage.pickSlot('${time}', '${type}', ${slotId || 'null'})" data-time="${time}" data-type="${type}" data-slot-id="${slotId || ''}" class="slot-button p-2.5 rounded-xl border-2 border-[#1E293B] bg-primary text-on-primary shadow-[4px_4px_0px_#1E293B] -translate-x-0.5 -translate-y-0.5 flex flex-col items-center relative ring-2 ring-primary-container transition-all" type="button">
          <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#34D399] border border-[#1E293B] flex items-center justify-center">
            <span class="material-symbols-outlined text-[10px] text-on-surface font-bold">check</span>
          </div>
          <span class="font-headline-sm text-[16px] text-on-primary font-extrabold">${time}</span>
          <span class="font-label-sm text-[10px] text-primary-fixed mt-0.5 font-bold">Selected</span>
        </button>
      `;
    }

    if (type === 'ai_pick') {
      return `
        <button onclick="BookAppointmentPage.pickSlot('${time}', '${type}', ${slotId || 'null'})" data-time="${time}" data-type="${type}" data-slot-id="${slotId || ''}" class="slot-button p-2.5 rounded-xl border-2 border-[#1E293B] bg-tertiary-fixed shadow-[2px_2px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1E293B] transition-all flex flex-col items-center relative overflow-hidden" type="button">
          <div class="absolute top-0 right-0 bg-tertiary text-on-tertiary text-[9px] px-1.5 py-0.2 rounded-bl font-label-sm font-bold flex items-center gap-0.5">
            ✦ AI Pick
          </div>
          <span class="font-headline-sm text-[16px] text-on-tertiary-fixed font-bold">${time}</span>
          <span class="font-label-sm text-[10px] text-on-tertiary-fixed font-medium mt-0.5">${subtitle}</span>
        </button>
      `;
    }

    if (type === 'fast_track') {
      return `
        <button onclick="BookAppointmentPage.pickSlot('${time}', '${type}', ${slotId || 'null'})" data-time="${time}" data-type="${type}" data-slot-id="${slotId || ''}" class="slot-button p-2.5 rounded-xl border-2 border-[#1E293B] bg-secondary-fixed text-on-secondary-fixed shadow-[2px_2px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1E293B] transition-all flex flex-col items-center relative overflow-hidden font-bold" type="button">
          <div class="absolute top-0 right-0 bg-secondary text-on-secondary text-[9px] px-1.5 py-0.2 rounded-bl font-label-sm font-bold flex items-center gap-0.5">
            ⚡ Fast Track
          </div>
          <span class="font-headline-sm text-[16px] text-on-secondary-fixed font-bold">${time}</span>
          <span class="font-label-sm text-[10px] text-secondary mt-0.5 font-bold">${subtitle}</span>
        </button>
      `;
    }

    return `
      <button onclick="BookAppointmentPage.pickSlot('${time}', '${type}', ${slotId || 'null'})" data-time="${time}" data-type="${type}" data-slot-id="${slotId || ''}" class="slot-button p-2.5 rounded-xl border-2 border-[#1E293B] bg-[#FFFDF5] shadow-[2px_2px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1E293B] transition-all flex flex-col items-center" type="button">
        <span class="font-headline-sm text-[16px] text-on-surface font-bold">${time}</span>
        <span class="font-label-sm text-[10px] text-outline mt-0.5">${subtitle}</span>
      </button>
    `;
  },

  // STEP 3: CONSULT MODE
  renderStep3ConsultMode() {
    const s = MediSlotStore.bookingState;
    return `
      <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex flex-col gap-space-md">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-primary text-[24px]">devices</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Consultation Delivery Mode</h3>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant">Choose whether you wish to visit Stanford Clinic in-person or connect via Telehealth.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          <!-- In Person Option -->
          <div onclick="BookAppointmentPage.setConsultMode('in_person')" class="p-space-md rounded-xl border-2 border-[#1E293B] ${s.consultMode === 'in_person' ? 'bg-primary-fixed shadow-[4px_4px_0px_#1E293B]' : 'bg-[#FFFDF5] shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container'} cursor-pointer transition-all flex flex-col justify-between gap-2">
            <div class="flex items-center justify-between mb-1">
              <div class="w-10 h-10 rounded-full bg-[#FFFDF5] border-2 border-[#1E293B] flex items-center justify-center shadow-[2px_2px_0px_#1E293B]">
                <span class="material-symbols-outlined text-primary text-[22px]">domain</span>
              </div>
              <div class="w-6 h-6 rounded-full border-2 border-[#1E293B] bg-[#FFFDF5] flex items-center justify-center">
                <div class="w-3.5 h-3.5 rounded-full ${s.consultMode === 'in_person' ? 'bg-primary' : 'bg-transparent'}"></div>
              </div>
            </div>
            <span class="font-headline-sm text-[17px] text-on-surface font-bold">In-Person Clinic Visit</span>
            <span class="font-body-sm text-body-sm text-on-surface-variant">Stanford Health Suite 402, 300 Pasteur Dr, Palo Alto</span>
            <div class="mt-space-sm pt-space-xs border-t border-[#1E293B]/20 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-primary">local_parking</span>
              <span class="font-label-sm text-label-sm font-bold">Complimentary Valet Parking</span>
            </div>
          </div>

          <!-- HD Video Call Option -->
          <div onclick="BookAppointmentPage.setConsultMode('telehealth')" class="p-space-md rounded-xl border-2 border-[#1E293B] ${s.consultMode === 'telehealth' ? 'bg-secondary-fixed shadow-[4px_4px_0px_#1E293B]' : 'bg-[#FFFDF5] shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container'} cursor-pointer transition-all flex flex-col justify-between gap-2">
            <div class="flex items-center justify-between mb-1">
              <div class="w-10 h-10 rounded-full bg-secondary-fixed border-2 border-[#1E293B] flex items-center justify-center shadow-[2px_2px_0px_#1E293B]">
                <span class="material-symbols-outlined text-secondary text-[22px]">videocam</span>
              </div>
              <div class="w-6 h-6 rounded-full border-2 border-[#1E293B] bg-[#FFFDF5] flex items-center justify-center">
                <div class="w-3.5 h-3.5 rounded-full ${s.consultMode === 'telehealth' ? 'bg-secondary' : 'bg-transparent'}"></div>
              </div>
            </div>
            <span class="font-headline-sm text-[17px] text-on-surface font-bold">Secure HD Video Call</span>
            <span class="font-body-sm text-body-sm text-on-surface-variant">Join from smartphone or browser. Link sent via SMS/Email.</span>
            <div class="mt-space-sm pt-space-xs border-t border-[#1E293B]/20 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#10B981]">enhanced_encryption</span>
              <span class="font-label-sm text-label-sm font-bold">WebRTC E2E Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // STEP 4: INTAKE DETAILS & FORM
  renderStep4IntakeDetails() {
    const s = MediSlotStore.bookingState;
    const p = MediSlotStore.patient;

    const quickTags = ['Routine Checkup', 'Heart Fluttering', 'Chest Discomfort', 'Rx Refill'];

    return `
      <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex flex-col gap-space-md">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-tertiary text-[24px]">clinical_notes</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Chief Concern & Symptoms</h3>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant">Describe what brings you in. Dr. Jenkins reviews this prior to examination.</p>
        </div>

        <!-- Quick Tags -->
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-label-sm text-label-sm text-outline font-bold uppercase">Quick Add:</span>
          ${quickTags.map(tag => {
            const hasTag = s.quickTags.includes(tag);
            return `
              <button onclick="BookAppointmentPage.toggleQuickTag('${tag}')" class="px-3 py-1 rounded-full border-2 border-[#1E293B] ${hasTag ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-[#FFFDF5] text-on-surface hover:bg-tertiary-fixed'} shadow-[2px_2px_0px_#1E293B] font-label-sm text-label-sm font-bold transition-all flex items-center gap-1" type="button">
                <span>${tag}</span>
                <span class="material-symbols-outlined text-[14px]">${hasTag ? 'check' : 'add'}</span>
              </button>
            `;
          }).join('')}
        </div>

        <textarea id="booking-symptoms-input" class="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-lg p-space-sm shadow-[2px_2px_0px_#1E293B] font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:shadow-[4px_4px_0px_#6b38d4]" rows="3">${s.symptoms}</textarea>

        <div class="pt-space-sm border-t-2 border-[#1E293B]">
          <h4 class="font-headline-sm text-[16px] text-on-surface font-bold mb-space-sm">Verified Patient Details</h4>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div class="flex flex-col gap-1">
              <label class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Full Legal Name</label>
              <input id="patient-name-field" value="${p.name}" class="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-lg px-3 py-2 text-on-surface font-body-sm shadow-[2px_2px_0px_#1E293B]" required/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Mobile Phone (For Pass & SMS)</label>
              <input id="patient-phone-field" value="${p.phone}" class="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-lg px-3 py-2 text-on-surface font-body-sm shadow-[2px_2px_0px_#1E293B]" required/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Insurance Provider</label>
              <input id="patient-insurance-field" value="${p.insuranceProvider}" class="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-lg px-3 py-2 text-on-surface font-body-sm shadow-[2px_2px_0px_#1E293B]"/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Policy Member ID</label>
              <input id="patient-insid-field" value="${p.insuranceId}" class="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-lg px-3 py-2 text-on-surface font-body-sm shadow-[2px_2px_0px_#1E293B]"/>
            </div>
          </div>

          <div class="mt-space-md flex flex-col gap-2">
            <span class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Accessibility & Assistance Options</span>
            <label class="flex items-center gap-2 cursor-pointer font-body-sm text-on-surface">
              <input id="special-wheelchair" type="checkbox" ${s.specialNeeds.wheelchair ? 'checked' : ''} class="w-4 h-4 border-2 border-[#1E293B]"/>
              <span>Request Wheelchair Assistance upon arrival at East Pavilion</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer font-body-sm text-on-surface">
              <input id="special-translator" type="checkbox" ${s.specialNeeds.translator ? 'checked' : ''} class="w-4 h-4 border-2 border-[#1E293B]"/>
              <span>Request Certified ASL / Spanish Medical Interpreter</span>
            </label>
          </div>
        </div>
      </div>
    `;
  },

  // STEP 5: REVIEW
  renderStep5Review(doc) {
    const s = MediSlotStore.bookingState;
    const p = MediSlotStore.patient;

    return `
      <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] flex flex-col gap-space-md">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-[#10B981] text-[24px]">verified</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Review Your Reservation</h3>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant">Please confirm your slot details before MediSlot issues your hospital pass.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md bg-surface-container-low p-space-md rounded-xl border border-[#1E293B]">
          <div>
            <span class="font-label-sm text-outline uppercase font-bold">Clinician</span>
            <p class="font-headline-sm text-[16px] text-on-surface font-bold">${doc.name}</p>
            <span class="text-xs text-on-surface-variant">${doc.specialty} • ${doc.clinic}</span>
          </div>
          <div>
            <span class="font-label-sm text-outline uppercase font-bold">Appointment Time</span>
            <p class="font-headline-sm text-[16px] text-on-surface font-bold">${s.selectedDate} at ${s.selectedSlotTime}</p>
            <span class="text-xs text-on-surface-variant">${s.consultMode === 'telehealth' ? 'Telehealth Video Encounter' : 'In-Person (Suite 402)'}</span>
          </div>
          <div>
            <span class="font-label-sm text-outline uppercase font-bold">Patient</span>
            <p class="font-headline-sm text-[16px] text-on-surface font-bold">${p.name} (${p.mrn})</p>
            <span class="text-xs text-on-surface-variant">${p.phone}</span>
          </div>
          <div>
            <span class="font-label-sm text-outline uppercase font-bold">Insurance</span>
            <p class="font-headline-sm text-[16px] text-on-surface font-bold">${p.insuranceProvider}</p>
            <span class="text-xs text-on-surface-variant">Member ID: ${p.insuranceId}</span>
          </div>
        </div>

        <div class="p-space-sm bg-tertiary-fixed border-2 border-[#1E293B] rounded-lg shadow-[2px_2px_0px_#1E293B] flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-tertiary text-[20px]">verified</span>
            <span class="font-label-sm text-on-tertiary-fixed font-bold">Online Platform Fee: $0.00 (Waived)</span>
          </div>
          <span class="font-headline-sm text-[16px] text-on-tertiary-fixed font-extrabold">$${(doc.fee || 120).toFixed(2)} Total</span>
        </div>
      </div>
    `;
  },

  // STEP 6: CONFIRMATION
  renderStep6Confirmation() {
    const s = MediSlotStore.bookingState;
    const appt = s.confirmedAppointment || {
      booking_code: 'MED-8491',
      queue_number: 'Q-04',
      appointment_date: s.selectedDate,
      appointment_time: s.selectedSlotTime,
      doctor_name: (s.doctor && s.doctor.name) || 'Dr. Sarah Jenkins, MD',
      doctor_specialty: (s.doctor && s.doctor.specialty) || 'Cardiology',
      doctor_clinic: (s.doctor && s.doctor.clinic) || 'Stanford Medical Center'
    };

    return `
      <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-xl p-space-lg shadow-[6px_6px_0px_#1E293B] flex flex-col gap-space-lg items-center text-center">
        <!-- Top Celebration Stamp -->
        <div class="w-16 h-16 rounded-full bg-[#D1FAE5] border-2 border-[#1E293B] flex items-center justify-center text-[#065F46] shadow-[3px_3px_0px_#1E293B] -rotate-3">
          <span class="material-symbols-outlined text-[36px]">check_circle</span>
        </div>

        <div>
          <span class="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-space-md py-1 rounded-full border border-[#1E293B] font-bold shadow-[2px_2px_0px_#1E293B]">
            ✦ APPOINTMENT CONFIRMED
          </span>
          <h2 class="font-headline-xl text-3xl font-extrabold text-on-surface mt-2">You're All Set, Alex!</h2>
          <p class="font-body-md text-body-md text-on-surface-variant max-w-lg mt-1">
            Your appointment has been registered with ${appt.doctor_clinic}. A digital pass and calendar invite have been issued to your portal.
          </p>
        </div>

        <!-- Digital Boarding Pass Ticket -->
        <div class="w-full max-w-md bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl p-space-md shadow-[4px_4px_0px_#1E293B] text-left flex flex-col gap-space-sm relative">
          <div class="flex items-center justify-between border-b-2 border-dashed border-[#1E293B] pb-2">
            <div>
              <span class="text-xs text-outline font-bold uppercase">Pass Code</span>
              <div class="font-mono text-xl font-extrabold text-primary">${appt.booking_code}</div>
            </div>
            <div class="text-right">
              <span class="text-xs text-outline font-bold uppercase">Queue Number</span>
              <div class="font-mono text-xl font-extrabold text-secondary">${appt.queue_number || 'Q-04'}</div>
            </div>
          </div>

          <div class="flex flex-col gap-1 text-xs">
            <div><strong>Clinician:</strong> ${appt.doctor_name} (${appt.doctor_specialty})</div>
            <div><strong>Date & Time:</strong> ${appt.appointment_date} at ${appt.appointment_time}</div>
            <div><strong>Location:</strong> Stanford Health Suite 402 (Valet Parking Validated)</div>
          </div>

          <!-- Barcode Simulator -->
          <div class="pt-2 border-t-2 border-[#1E293B] flex flex-col items-center">
            <div class="w-full h-10 bg-repeat-x flex items-center justify-center font-mono text-[10px] tracking-widest bg-slate-100 border border-[#1E293B] rounded">
              ||| | || |||| | | ||| |||| | ||| || |||
            </div>
            <span class="text-[10px] text-outline font-mono mt-0.5">Scan upon arrival at Kiosk or East Pavilion Valet</span>
          </div>
        </div>

        <!-- Action Row -->
        <div class="flex flex-wrap items-center justify-center gap-space-sm pt-2 w-full max-w-md">
          <button onclick="window.print()" class="flex-1 bg-surface-container-lowest text-on-surface py-2.5 rounded-full font-label-md text-label-md font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container flex items-center justify-center gap-1">
            <span class="material-symbols-outlined text-[16px]">print</span>
            <span>Print Pass</span>
          </button>
          <button onclick="BookAppointmentPage.addToCalendar()" class="flex-1 bg-tertiary-fixed text-on-tertiary-fixed py-2.5 rounded-full font-label-md text-label-md font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:shadow-[3px_3px_0px_#1E293B] flex items-center justify-center gap-1">
            <span class="material-symbols-outlined text-[16px]">calendar_add_on</span>
            <span>Google / Apple Sync</span>
          </button>
        </div>
      </div>
    `;
  },

  async afterRender() {
    // Start countdown timer for shield
    MediSlotStore.startShieldTimer((formatted) => {
      const el = document.getElementById('shield-timer-display');
      if (el) el.innerText = formatted;
    });

    // Load doctor details into store if missing
    if (!MediSlotStore.bookingState.doctor && MediSlotStore.bookingState.doctorId) {
      const data = await MediSlotStore.fetchDoctor(MediSlotStore.bookingState.doctorId);
      if (data && data.doctor) {
        MediSlotStore.setBookingDoctor(data.doctor);
      }
    }

    // If on Step 2 (Date & Time), load slots for selected date
    if (MediSlotStore.bookingState.currentStep === 2) {
      const docId = MediSlotStore.bookingState.doctorId || 1;
      const dateStr = MediSlotStore.bookingState.selectedDate || '2024-10-24';
      const slotsData = await MediSlotStore.fetchSlots(docId, dateStr);
      this.updateSlotsDisplay(slotsData);
    }
  },

  goToStep(step) {
    MediSlotStore.bookingState.currentStep = step;
    if (window.renderCurrentPage) window.renderCurrentPage();
  },

  async pickDoctor(doctorId) {
    let doc = MediSlotStore.doctors.find(d => d.id === doctorId);
    if (!doc && MediSlotStore.fetchDoctor) {
      const res = await MediSlotStore.fetchDoctor(doctorId);
      if (res && res.doctor) doc = res.doctor;
    }
    if (doc) {
      MediSlotStore.setBookingDoctor(doc);
      // Reset selected slot for new doctor so slots refresh cleanly
      MediSlotStore.bookingState.selectedSlotTime = null;
      MediSlotStore.bookingState.selectedSlotId = null;
      showToast(`Selected ${doc.name} (${doc.specialty}). Advancing to Date & Time.`, 'info');
      this.goToStep(2);
    }
  },

  async pickCalendarDate(year, month, day) {
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    MediSlotStore.bookingState.selectedDate = dateStr;

    // 1. Update ticket summary
    const ticketDate = document.getElementById('ticket-date');
    if (ticketDate) ticketDate.innerText = dateStr;

    // 2. Re-render calendar matrix to highlight selected date
    const gridEl = document.getElementById('calendar-day-grid');
    if (gridEl) {
      gridEl.innerHTML = this.renderCalendarDays();
    }

    // 3. Update slots date heading
    const headingEl = document.getElementById('slots-date-heading');
    if (headingEl) {
      headingEl.innerText = `Selected date: ${dateStr} • 45 Min Session`;
    }

    // 4. Fetch dynamic slots for this date
    const docId = MediSlotStore.bookingState.doctorId || 1;
    const slotsData = await MediSlotStore.fetchSlots(docId, dateStr);

    // 5. Update slots display and auto-select default slot
    this.updateSlotsDisplay(slotsData);

    showToast(`Date set to ${dateStr}. Available slots loaded!`, 'info');
  },

  updateSlotsDisplay(slotsData) {
    const morningGrid = document.getElementById('morning-slots-grid');
    const afternoonGrid = document.getElementById('afternoon-slots-grid');
    const badge = document.getElementById('slots-count-badge');

    const morningSlots = (slotsData && slotsData.morning && slotsData.morning.length > 0)
      ? slotsData.morning
      : [
          { id: 1, slot_time: '09:00 AM', type: 'regular', status: 'available' },
          { id: 2, slot_time: '09:45 AM', type: 'ai_pick', status: 'available' },
          { id: 3, slot_time: '10:30 AM', type: 'regular', status: 'available' },
          { id: 4, slot_time: '11:15 AM', type: 'regular', status: 'available' }
        ];

    const afternoonSlots = (slotsData && slotsData.afternoon && slotsData.afternoon.length > 0)
      ? slotsData.afternoon
      : [
          { id: 5, slot_time: '02:00 PM', type: 'regular', status: 'available' },
          { id: 6, slot_time: '02:45 PM', type: 'fast_track', status: 'available' },
          { id: 7, slot_time: '03:30 PM', type: 'regular', status: 'available' },
          { id: 8, slot_time: '04:15 PM', type: 'regular', status: 'available' }
        ];

    const allSlots = [...morningSlots, ...afternoonSlots];
    const availableCount = allSlots.filter(s => s.status === 'available').length;
    if (badge) {
      badge.innerHTML = `
        <span class="material-symbols-outlined text-secondary text-[16px]">bolt</span>
        <span>${availableCount} Slots Open</span>
      `;
    }

    // Auto-select default slot if none is currently selected or if previously selected slot is not available
    let currentSelected = MediSlotStore.bookingState.selectedSlotTime;
    const exists = allSlots.some(s => s.slot_time === currentSelected && s.status === 'available');
    if (!exists) {
      // Prefer AI pick or 10:30 AM or first open slot
      const defaultSlot = allSlots.find(s => s.type === 'ai_pick' && s.status === 'available')
        || allSlots.find(s => s.slot_time === '10:30 AM' && s.status === 'available')
        || allSlots.find(s => s.status === 'available')
        || allSlots[0];

      if (defaultSlot) {
        currentSelected = defaultSlot.slot_time;
        MediSlotStore.bookingState.selectedSlotTime = defaultSlot.slot_time;
        MediSlotStore.bookingState.selectedSlotType = defaultSlot.type;
        MediSlotStore.bookingState.selectedSlotId = defaultSlot.id;
        const ticketTime = document.getElementById('ticket-time');
        if (ticketTime) ticketTime.innerText = `${defaultSlot.slot_time} (PDT)`;
      }
    }

    if (morningGrid) {
      morningGrid.innerHTML = morningSlots.map(s => this.renderSlotButton(
        s.slot_time,
        s.type === 'ai_pick' ? 'Min wait time' : s.type === 'fast_track' ? 'Quick In-take' : 'Regular Slot',
        s.type,
        s.slot_time === currentSelected,
        s.id,
        s.status
      )).join('');
    }

    if (afternoonGrid) {
      afternoonGrid.innerHTML = afternoonSlots.map(s => this.renderSlotButton(
        s.slot_time,
        s.type === 'ai_pick' ? 'Min wait time' : s.type === 'fast_track' ? 'Quick In-take' : 'Regular Slot',
        s.type,
        s.slot_time === currentSelected,
        s.id,
        s.status
      )).join('');
    }
  },

  pickSlot(time, type, slotId) {
    MediSlotStore.bookingState.selectedSlotTime = time;
    MediSlotStore.bookingState.selectedSlotType = type;
    if (slotId) MediSlotStore.bookingState.selectedSlotId = slotId;

    // 1. Update ticket summary time
    const ticketTime = document.getElementById('ticket-time');
    if (ticketTime) ticketTime.innerText = `${time} (PDT)`;

    // 2. Re-render all slot buttons in morning and afternoon grids so active button reflects selection
    const morningGrid = document.getElementById('morning-slots-grid');
    const afternoonGrid = document.getElementById('afternoon-slots-grid');
    if (morningGrid || afternoonGrid) {
      document.querySelectorAll('.slot-button').forEach(btn => {
        const btnTime = btn.getAttribute('data-time');
        const btnType = btn.getAttribute('data-type') || 'regular';
        const btnSlotId = btn.getAttribute('data-slot-id');
        const isSel = (btnTime === time);
        const sub = btnType === 'ai_pick' ? 'Min wait time' : btnType === 'fast_track' ? 'Quick In-take' : 'Regular Slot';
        btn.outerHTML = this.renderSlotButton(btnTime, sub, btnType, isSel, btnSlotId, 'available');
      });
    }

    // 3. Lock slot via API for 10 minutes under Double-Booking Shield
    MediSlotStore.lockSlot(slotId || 1);
    showToast(`Time slot ${time} reserved for 10 minutes.`, 'success');
  },

  setConsultMode(mode) {
    MediSlotStore.bookingState.consultMode = mode;
    const ticketMode = document.getElementById('ticket-mode');
    if (ticketMode) {
      ticketMode.innerText = mode === 'telehealth' ? 'Secure Telehealth Video Call' : 'Stanford Health • Suite 402';
    }
    if (window.renderCurrentPage) window.renderCurrentPage();
  },

  toggleQuickTag(tag) {
    const s = MediSlotStore.bookingState;
    if (s.quickTags.includes(tag)) {
      s.quickTags = s.quickTags.filter(t => t !== tag);
    } else {
      s.quickTags.push(tag);
      if (!s.symptoms.includes(tag)) {
        s.symptoms = s.symptoms ? `${s.symptoms}. Patient noted: ${tag}` : tag;
      }
    }
    if (window.renderCurrentPage) window.renderCurrentPage();
  },

  async handleProceed(targetStep) {
    const current = MediSlotStore.bookingState.currentStep;

    if (current === 4) {
      // Validate Step 4 Form Inputs
      const symptomsInput = document.getElementById('booking-symptoms-input');
      const nameInput = document.getElementById('patient-name-field');
      const phoneInput = document.getElementById('patient-phone-field');

      if (!nameInput || !nameInput.value.trim()) {
        showToast('Please enter your full name', 'error');
        return;
      }
      if (!phoneInput || !phoneInput.value.trim()) {
        showToast('Please provide a contact phone number for your pass', 'error');
        return;
      }

      MediSlotStore.bookingState.symptoms = symptomsInput ? symptomsInput.value.trim() : '';
      MediSlotStore.patient.name = nameInput.value.trim();
      MediSlotStore.patient.phone = phoneInput.value.trim();

      const wheelchair = document.getElementById('special-wheelchair');
      const translator = document.getElementById('special-translator');
      MediSlotStore.bookingState.specialNeeds.wheelchair = wheelchair ? wheelchair.checked : false;
      MediSlotStore.bookingState.specialNeeds.translator = translator ? translator.checked : false;
    }

    if (current === 5) {
      // Final confirm & submit appointment to backend API
      const s = MediSlotStore.bookingState;
      const res = await MediSlotStore.createAppointment({
        patientId: 1,
        doctorId: s.doctorId || 1,
        appointmentDate: s.selectedDate,
        appointmentTime: s.selectedSlotTime,
        consultMode: s.consultMode,
        symptoms: s.symptoms,
        notes: s.quickTags.join(', '),
        specialNeeds: s.specialNeeds.wheelchair ? 'Wheelchair assistance requested' : 'None',
        fee: s.fee || 120.00
      });

      if (res.success) {
        showToast('Appointment Confirmed! Generating your Hospital Pass...', 'success');
        this.goToStep(6);
      } else {
        showToast(res.error || 'Failed to complete booking', 'error');
      }
      return;
    }

    this.goToStep(targetStep);
  },

  addToCalendar() {
    const s = MediSlotStore.bookingState;
    const title = encodeURIComponent(`Consultation with ${s.doctor ? s.doctor.name : 'Dr. Sarah Jenkins'}`);
    const details = encodeURIComponent(`MediSlot Appointment\nDoctor: ${s.doctor ? s.doctor.name : 'Dr. Sarah Jenkins'}\nPass Code: MED-8491\nLocation: Stanford Health Suite 402`);
    const location = encodeURIComponent('Stanford Health Plaza, Suite 402, Palo Alto');
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
    showToast('Opened Google Calendar sync in new tab', 'info');
  }
};
