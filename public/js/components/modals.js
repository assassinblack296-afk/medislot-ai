// MediSlot AI Interactive Modals Manager
window.MediSlotModals = {
  container: null,

  init() {
    this.container = document.getElementById('modal-container');
    if (!this.container) return;

    // Close on click outside
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) {
        this.close();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.container.classList.contains('hidden')) {
        this.close();
      }
    });
  },

  open(contentHtml) {
    if (!this.container) this.init();
    this.container.innerHTML = `
      <div class="relative w-full max-w-lg bg-[#FFFDF5] border-2 border-[#1E293B] rounded-xl shadow-[6px_6px_0px_#1E293B] p-space-md sm:p-space-lg flex flex-col gap-space-md max-h-[90vh] overflow-y-auto">
        <button onclick="MediSlotModals.close()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container border-2 border-[#1E293B] flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors shadow-[1px_1px_0px_#1E293B]">
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
        ${contentHtml}
      </div>
    `;
    this.container.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (!this.container) return;
    this.container.classList.add('hidden');
    this.container.innerHTML = '';
    document.body.style.overflow = '';
  },

  showInfoModal(title, message, icon = 'info') {
    this.open(`
      <div class="flex flex-col gap-space-md text-center items-center">
        <div class="w-14 h-14 rounded-full bg-primary-fixed border-2 border-[#1E293B] flex items-center justify-center text-primary shadow-[2px_2px_0px_#1E293B]">
          <span class="material-symbols-outlined text-[28px]">${icon}</span>
        </div>
        <div>
          <h3 class="font-headline-sm text-lg font-bold">${title}</h3>
          <p class="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">${message}</p>
        </div>
        <button onclick="MediSlotModals.close()" class="mt-2 w-full bg-primary text-white py-2 rounded-full font-bold text-xs border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
          Understood
        </button>
      </div>
    `);
  },

  // 1. Doctor Profile Modal
  async showDoctorProfile(doctorId) {
    const data = await MediSlotStore.fetchDoctor(doctorId);
    if (!data || !data.doctor) {
      showToast('Doctor profile not found', 'error');
      return;
    }
    const doc = data.doctor;
    const slots = data.availableSlots || [];

    const slotButtonsHtml = slots.length > 0 
      ? slots.map(s => `
          <button onclick="MediSlotModals.selectSlotAndBook(${doc.id}, '${s.slot_date}', '${s.slot_time}')" class="p-2 rounded-lg border border-[#1E293B] bg-surface-container-lowest text-xs font-label-sm font-bold shadow-[1px_1px_0px_#1E293B] hover:bg-primary hover:text-white transition-all text-center">
            ${s.slot_date.slice(5)} • ${s.slot_time}
          </button>
        `).join('')
      : '<span class="text-xs text-outline">No immediate open slots. Join waitlist below.</span>';

    const content = `
      <div class="flex items-start gap-space-md">
        <div class="w-20 h-20 rounded-full border-2 border-[#1E293B] overflow-hidden bg-primary-fixed shadow-[3px_3px_0px_#1E293B] shrink-0">
          <img src="${doc.avatar_url}" class="w-full h-full object-cover" alt="${doc.name}"/>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-1.5 flex-wrap">
            <h3 class="font-headline-sm text-headline-sm text-on-surface">${doc.name}</h3>
            <span class="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full border border-[#1E293B]">${doc.title}</span>
          </div>
          <span class="font-label-md text-label-md text-secondary font-bold">${doc.specialty} • ${doc.clinic}</span>
          <div class="flex items-center gap-1 text-tertiary font-label-sm text-label-sm mt-1">
            <span class="material-symbols-outlined text-[16px] fill-1">star</span>
            <span class="font-bold">${doc.rating}</span>
            <span class="text-on-surface-variant">(${doc.review_count} verified reviews)</span>
          </div>
        </div>
      </div>

      <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-lg p-space-sm shadow-[2px_2px_0px_#1E293B] flex flex-col gap-1 text-body-sm text-body-sm">
        <span class="font-label-sm text-label-sm text-outline font-bold uppercase">Clinical Focus & Bio</span>
        <p class="text-on-surface">${doc.bio}</p>
        <div class="mt-2 pt-2 border-t border-[#1E293B]/20 flex flex-wrap gap-1">
          <span class="text-xs font-bold text-on-surface-variant">Languages:</span>
          <span class="text-xs text-on-surface">${doc.languages}</span>
        </div>
        <div class="flex flex-wrap gap-1">
          <span class="text-xs font-bold text-on-surface-variant">Procedures:</span>
          <span class="text-xs text-on-surface">${doc.procedures}</span>
        </div>
      </div>

      <div class="flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <span class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Upcoming Available Slots</span>
          <span class="font-headline-sm text-[16px] text-primary font-bold">$${doc.fee.toFixed(2)} / visit</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          ${slotButtonsHtml}
        </div>
      </div>

      <div class="pt-2 flex items-center gap-2">
        <button onclick="MediSlotModals.bookDoctorDirect(${doc.id})" class="flex-1 bg-primary text-white py-3 rounded-full font-label-md text-label-md font-bold border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1">
          <span>Book Appointment</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    `;

    this.open(content);
  },

  async selectSlotAndBook(doctorId, date, time) {
    let doc = MediSlotStore.doctors.find(d => d.id === doctorId);
    if (!doc && MediSlotStore.fetchDoctor) {
      const res = await MediSlotStore.fetchDoctor(doctorId);
      if (res && res.doctor) doc = res.doctor;
    }
    if (doc) {
      MediSlotStore.setBookingDoctor(doc);
    }
    MediSlotStore.bookingState.selectedDate = date;
    MediSlotStore.bookingState.selectedSlotTime = time;
    MediSlotStore.bookingState.currentStep = 3;
    this.close();
    if (window.location.hash === '#book-appointment') {
      if (window.renderCurrentPage) window.renderCurrentPage();
    } else {
      window.location.hash = '#book-appointment';
    }
    showToast(`Slot ${time} on ${date} reserved with ${doc ? doc.name : 'Clinician'}.`, 'success');
  },

  async bookDoctorDirect(doctorId) {
    let doc = MediSlotStore.doctors.find(d => d.id === doctorId);
    if (!doc && MediSlotStore.fetchDoctor) {
      const res = await MediSlotStore.fetchDoctor(doctorId);
      if (res && res.doctor) doc = res.doctor;
    }
    if (doc) {
      MediSlotStore.setBookingDoctor(doc);
      // Reset slot selection for new clinician
      MediSlotStore.bookingState.selectedSlotTime = null;
      MediSlotStore.bookingState.selectedSlotId = null;
    }
    MediSlotStore.bookingState.currentStep = 2;
    this.close();
    if (window.location.hash === '#book-appointment') {
      if (window.renderCurrentPage) window.renderCurrentPage();
    } else {
      window.location.hash = '#book-appointment';
    }
    showToast(`Switched clinician to ${doc ? doc.name : 'Specialist'}!`, 'success');
  },

  // Switch Clinician Modal (Available anywhere across the application)
  async showSwitchClinicianModal() {
    let docs = MediSlotStore.doctors;
    if (!docs || docs.length === 0) {
      docs = await MediSlotStore.fetchDoctors();
    }
    if (!docs || docs.length === 0) {
      docs = [
        { id: 1, name: 'Dr. Sarah Jenkins', title: 'MD, FACC', specialty: 'Cardiology', clinic: 'Stanford Medical Center', rating: 4.98, fee: 120, earliest_slot: 'Today, 2:15 PM' },
        { id: 2, name: 'Dr. Sarah Chen', title: 'MD, FAAD', specialty: 'Dermatology', clinic: 'St. Jude Pavilion', rating: 4.98, fee: 130, earliest_slot: 'Today, 10:30 AM' },
        { id: 3, name: 'Dr. Marcus Vance', title: 'MD', specialty: 'Cardiology', clinic: 'Metro Heart Institute', rating: 4.92, fee: 145, earliest_slot: 'Today, 3:30 PM' },
        { id: 4, name: 'Dr. Elena Rostova', title: 'MD, PhD', specialty: 'Neurology', clinic: 'Cerebral Center & UCSF', rating: 4.90, fee: 120, earliest_slot: 'Tomorrow, 9:00 AM' },
        { id: 5, name: 'Dr. Marcus Chen', title: 'MD', specialty: 'Orthopedics', clinic: 'Stanford Health Pavilion', rating: 4.85, fee: 110, earliest_slot: 'Tomorrow, 11:15 AM' },
        { id: 6, name: 'Dr. Julian Ramos', title: 'MD, FAAP', specialty: 'Pediatrics', clinic: 'Sunrise Kids Clinic', rating: 4.95, fee: 115, earliest_slot: 'Today, 5:15 PM' },
        { id: 7, name: 'Dr. Priya Patel', title: 'MD', specialty: 'Endocrinology', clinic: 'Palo Alto Endocrine Center', rating: 4.93, fee: 135, earliest_slot: 'Today, 4:00 PM' }
      ];
    }

    const currentDocId = MediSlotStore.bookingState.doctorId || (MediSlotStore.bookingState.doctor && MediSlotStore.bookingState.doctor.id) || 1;

    const content = `
      <div class="flex flex-col gap-space-md w-full">
        <div class="flex items-center gap-space-sm border-b-2 border-[#1E293B] pb-space-sm">
          <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] shrink-0">
            <span class="material-symbols-outlined text-on-primary text-[22px]">swap_horiz</span>
          </div>
          <div>
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">Switch Clinician</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Select a specialist for your consultation pass</p>
          </div>
        </div>

        <div class="flex flex-col gap-2 max-h-[55vh] overflow-y-auto pr-1">
          ${docs.map(d => {
            const isSelected = d.id === currentDocId;
            return `
              <div onclick="MediSlotModals.bookDoctorDirect(${d.id})" class="p-space-sm rounded-xl border-2 border-[#1E293B] ${isSelected ? 'bg-primary-fixed shadow-[3px_3px_0px_#1E293B] ring-2 ring-primary' : 'bg-surface-container-lowest shadow-[2px_2px_0px_#1E293B] hover:bg-surface-container-low'} cursor-pointer transition-all flex items-center justify-between gap-space-sm">
                <div class="flex items-center gap-space-sm min-w-0">
                  <div class="w-12 h-12 rounded-full border-2 border-[#1E293B] overflow-hidden shrink-0 bg-primary-fixed">
                    <img src="${d.avatar_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'}" class="w-full h-full object-cover" alt="${d.name}"/>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <h4 class="font-headline-sm text-[15px] font-bold text-on-surface truncate">${d.name}</h4>
                      ${isSelected ? `<span class="bg-primary text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">ACTIVE</span>` : ''}
                    </div>
                    <span class="text-xs font-bold text-secondary truncate">${d.specialty} • ${d.clinic}</span>
                    <span class="text-[11px] text-outline flex items-center gap-1">
                      <span class="material-symbols-outlined text-tertiary text-[13px]">star</span> ${d.rating || 4.9} • Earliest: <strong>${d.earliest_slot || 'Today'}</strong>
                    </span>
                  </div>
                </div>
                <div class="flex flex-col items-end shrink-0">
                  <span class="font-headline-sm text-[16px] text-primary font-extrabold">$${d.fee}</span>
                  <button type="button" class="mt-1 text-xs font-bold px-2.5 py-1 rounded-full border border-[#1E293B] ${isSelected ? 'bg-primary text-white' : 'bg-surface-container hover:bg-primary hover:text-white'} transition-colors">
                    ${isSelected ? 'Selected' : 'Choose'}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="border-t-2 border-[#1E293B] pt-space-sm flex items-center justify-between text-xs text-outline">
          <span>Need help finding a match?</span>
          <button onclick="MediSlotModals.close(); MediBot.open();" class="text-secondary font-bold underline flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">smart_toy</span> Ask MediBot AI
          </button>
        </div>
      </div>
    `;

    this.open(content);
  },

  // 2. Waitlist Modal
  showWaitlistModal(specialty = 'General Cardiology', doctorId = null) {
    const content = `
      <div class="w-12 h-12 rounded-full bg-secondary-fixed border-2 border-[#1E293B] flex items-center justify-center text-secondary shadow-[2px_2px_0px_#1E293B]">
        <span class="material-symbols-outlined text-[28px]">notifications_active</span>
      </div>
      <div>
        <h3 class="font-headline-sm text-headline-sm text-on-surface">Specialist Availability Alert</h3>
        <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Receive an automated SMS or phone notification if an earlier appointment slot opens for this specialty.
        </p>
      </div>

      <form id="waitlist-form" onsubmit="event.preventDefault(); MediSlotModals.submitWaitlist(${doctorId ? `'${doctorId}'` : 'null'}, '${specialty}');" class="flex flex-col gap-space-sm">
        <div class="flex flex-col gap-1">
          <label class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Patient Name</label>
          <input id="waitlist-name" value="Alex Morgan" class="w-full bg-surface-container-lowest border-2 border-[#1E293B] rounded-lg px-space-md py-2 text-on-surface font-body-sm shadow-[2px_2px_0px_#1E293B] focus:outline-none" required/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Notify Via SMS / Phone</label>
          <input id="waitlist-contact" value="+1 (555) 019-2834" type="tel" class="w-full bg-surface-container-lowest border-2 border-[#1E293B] rounded-lg px-space-md py-2 text-on-surface font-body-sm shadow-[2px_2px_0px_#1E293B] focus:outline-none" required/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Target Specialty</label>
          <input id="waitlist-specialty" value="${specialty}" class="w-full bg-surface-container-lowest border-2 border-[#1E293B] rounded-lg px-space-md py-2 text-on-surface font-body-sm shadow-[2px_2px_0px_#1E293B] focus:outline-none"/>
        </div>
        <button id="waitlist-submit-btn" type="submit" class="mt-2 bg-primary text-white py-3 rounded-full font-label-md text-label-md font-bold border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-[18px]">notifications</span>
          <span>Notify Me When Slot Opens</span>
        </button>
      </form>
    `;
    this.open(content);
  },

  async submitWaitlist(doctorId, specialty) {
    const name = document.getElementById('waitlist-name').value;
    const contact = document.getElementById('waitlist-contact').value;
    const spec = document.getElementById('waitlist-specialty').value || specialty;

    const res = await MediSlotStore.joinWaitlist({
      patientName: name,
      contact: contact,
      specialtyRequested: spec,
      doctorId: doctorId
    });

    if (res.success) {
      showToast(res.message, 'success');
      this.close();
    } else {
      showToast(res.error || 'Failed to join waitlist', 'error');
    }
  },

  // 3. Kiosk Check-In Modal
  async showCheckInKiosk(appointmentId) {
    const res = await MediSlotStore.fetchAppointment(appointmentId);
    if (!res.success || !res.appointment) {
      showToast('Could not load appointment details', 'error');
      return;
    }
    const appt = res.appointment;

    const content = `
      <div class="flex items-center justify-between border-b-2 border-[#1E293B] pb-space-sm">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[#10B981] text-[24px]">how_to_reg</span>
          <h3 class="font-headline-sm text-headline-sm text-on-surface">Self-Service Check-In Kiosk</h3>
        </div>
        <span class="bg-[#D1FAE5] text-[#065F46] border border-[#1E293B] px-2 py-0.5 rounded-full text-xs font-bold font-mono">
          ${appt.booking_code}
        </span>
      </div>

      <div class="bg-surface-container-lowest border-2 border-[#1E293B] p-space-md rounded-lg shadow-[3px_3px_0px_#1E293B] flex flex-col items-center text-center gap-2">
        <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">Your Assigned Queue Ticket</span>
        <div class="w-28 h-16 bg-primary-fixed border-2 border-[#1E293B] rounded-lg shadow-[2px_2px_0px_#1E293B] flex items-center justify-center">
          <span class="font-headline-xl text-3xl font-extrabold text-on-primary-fixed">${appt.queue_number || 'Q-04'}</span>
        </div>
        <span class="text-xs text-on-surface font-bold">Estimated wait: < 4 minutes • On Schedule</span>
      </div>

      <div class="flex flex-col gap-2 font-body-sm text-body-sm">
        <div class="flex justify-between p-2 bg-surface-container-low rounded border border-[#1E293B]">
          <span class="text-on-surface-variant font-bold">Consulting Clinician:</span>
          <span class="font-bold text-on-surface">${appt.doctor_name} (${appt.doctor_specialty})</span>
        </div>
        <div class="flex justify-between p-2 bg-surface-container-low rounded border border-[#1E293B]">
          <span class="text-on-surface-variant font-bold">Room & Pavilion:</span>
          <span class="font-bold text-on-surface">Suite 402, Zone B (East Pavilion)</span>
        </div>
        <div class="flex justify-between p-2 bg-surface-container-low rounded border border-[#1E293B]">
          <span class="text-on-surface-variant font-bold">Patient MRN:</span>
          <span class="font-bold text-on-surface font-mono">${appt.patient_mrn}</span>
        </div>
      </div>

      <div class="pt-2 flex flex-col gap-2">
        <button onclick="MediSlotModals.confirmKioskCheckIn(${appt.id})" class="w-full bg-[#10B981] text-white py-3 rounded-full font-label-md text-label-md font-bold border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5">
          <span class="material-symbols-outlined text-[18px]">verified</span>
          <span>Confirm Arrival & Sound Chime</span>
        </button>
      </div>
    `;

    this.open(content);
  },

  async confirmKioskCheckIn(id) {
    const res = await MediSlotStore.checkinAppointment(id);
    if (res.success) {
      showToast(`Arrival verified! You are #${res.queueNumber} in queue for Dr. Sarah Jenkins.`, 'success');
      this.close();
      if (window.renderCurrentPage) window.renderCurrentPage();
    } else {
      showToast(res.error || 'Check-in failed', 'error');
    }
  },

  // 4. Reschedule Modal
  async showRescheduleModal(appointmentId) {
    const res = await MediSlotStore.fetchAppointment(appointmentId);
    if (!res.success || !res.appointment) {
      showToast('Could not load appointment', 'error');
      return;
    }
    const appt = res.appointment;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const dateStr = tomorrow.toISOString().split('T')[0];

    const content = `
      <div class="flex items-center gap-2 border-b-2 border-[#1E293B] pb-space-sm">
        <span class="material-symbols-outlined text-primary text-[24px]">edit_calendar</span>
        <h3 class="font-headline-sm text-headline-sm text-on-surface">Reschedule Appointment</h3>
      </div>
      <p class="font-body-sm text-body-sm text-on-surface-variant">
        Current slot: <strong>${appt.appointment_date} at ${appt.appointment_time}</strong> with ${appt.doctor_name}.
      </p>

      <form id="reschedule-form" onsubmit="event.preventDefault(); MediSlotModals.confirmReschedule(${appt.id});" class="flex flex-col gap-space-sm">
        <div class="flex flex-col gap-1">
          <label class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Select New Date</label>
          <input id="reschedule-date" type="date" value="${dateStr}" class="w-full bg-surface-container-lowest border-2 border-[#1E293B] rounded-lg px-space-md py-2 font-body-sm text-on-surface shadow-[2px_2px_0px_#1E293B] focus:outline-none" required/>
        </div>

        <div class="flex flex-col gap-1">
          <label class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Select New Time Slot</label>
          <select id="reschedule-time" class="w-full bg-surface-container-lowest border-2 border-[#1E293B] rounded-lg px-space-md py-2 font-body-sm text-on-surface shadow-[2px_2px_0px_#1E293B] focus:outline-none cursor-pointer">
            <option value="09:00 AM">09:00 AM (Morning)</option>
            <option value="09:45 AM" selected>09:45 AM (✦ AI Pick - Min wait)</option>
            <option value="11:15 AM">11:15 AM (Regular)</option>
            <option value="02:00 PM">02:00 PM (Afternoon)</option>
            <option value="02:45 PM">02:45 PM (⚡ Fast Track)</option>
            <option value="03:30 PM">03:30 PM (Regular)</option>
          </select>
        </div>

        <button type="submit" class="mt-2 bg-primary text-white py-3 rounded-full font-label-md text-label-md font-bold border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5">
          <span class="material-symbols-outlined text-[18px]">sync_alt</span>
          <span>Confirm Slot Reassignment</span>
        </button>
      </form>
    `;

    this.open(content);
  },

  async confirmReschedule(id) {
    const newDate = document.getElementById('reschedule-date').value;
    const newTime = document.getElementById('reschedule-time').value;

    const res = await MediSlotStore.rescheduleAppointment(id, newDate, newTime, null);
    if (res.success) {
      showToast('Appointment successfully rescheduled!', 'success');
      this.close();
      if (window.renderCurrentPage) window.renderCurrentPage();
    } else {
      showToast(res.error || 'Failed to reschedule', 'error');
    }
  },

  // 5. Clinical Prep Notes Modal
  showPrepNotesModal(appointmentId) {
    const content = `
      <div class="flex items-center gap-2 border-b-2 border-[#1E293B] pb-space-sm">
        <span class="material-symbols-outlined text-tertiary text-[24px]">clinical_notes</span>
        <h3 class="font-headline-sm text-headline-sm text-on-surface">Clinical Preparation Instructions</h3>
      </div>
      <div class="bg-surface-container-lowest border-2 border-[#1E293B] rounded-lg p-space-md shadow-[3px_3px_0px_#1E293B] flex flex-col gap-2">
        <div class="flex items-start gap-2">
          <span class="material-symbols-outlined text-secondary text-[20px] shrink-0">no_meals</span>
          <div>
            <h4 class="font-label-md text-label-md font-bold text-on-surface">Strict 6-Hour Fasting</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Do not consume food, milk, or sweetened beverages 6 hours before 10:30 AM. Clear water is encouraged.</p>
          </div>
        </div>
        <div class="flex items-start gap-2 pt-2 border-t border-[#1E293B]/20">
          <span class="material-symbols-outlined text-primary text-[20px] shrink-0">prescriptions</span>
          <div>
            <h4 class="font-label-md text-label-md font-bold text-on-surface">Morning Medications</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Take routine blood pressure tablets (Metoprolol 25mg) with small sips of water unless instructed otherwise.</p>
          </div>
        </div>
        <div class="flex items-start gap-2 pt-2 border-t border-[#1E293B]/20">
          <span class="material-symbols-outlined text-[#10B981] text-[20px] shrink-0">folder_shared</span>
          <div>
            <h4 class="font-label-md text-label-md font-bold text-on-surface">What to Bring</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Recent ECG traces, wearable smartwatch arrhythmia logs, and Photo ID.</p>
          </div>
        </div>
      </div>
      <button onclick="MediSlotModals.close()" class="w-full bg-[#1E293B] text-white py-2.5 rounded-full font-label-md text-label-md font-bold hover:bg-on-surface-variant transition-colors">
        Got It, I'm Prepared
      </button>
    `;
    this.open(content);
  },

  // 6. Cancel Appointment Modal
  showCancelModal(appointmentId) {
    const content = `
      <div class="flex items-center gap-2 border-b-2 border-[#1E293B] pb-space-sm text-error">
        <span class="material-symbols-outlined text-[24px]">cancel</span>
        <h3 class="font-headline-sm text-headline-sm text-on-surface">Cancel Consultation</h3>
      </div>
      <p class="font-body-sm text-body-sm text-on-surface-variant">
        Are you sure you want to release this time slot? Your reserved appointment will be cancelled and offered to waitlisted patients.
      </p>
      <div class="flex flex-col gap-1">
        <label class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Reason for Cancellation</label>
        <select id="cancel-reason" class="w-full bg-surface-container-lowest border-2 border-[#1E293B] rounded-lg px-space-md py-2 font-body-sm text-on-surface shadow-[2px_2px_0px_#1E293B] focus:outline-none cursor-pointer">
          <option value="Schedule conflict">Schedule conflict</option>
          <option value="Symptoms improved">Symptoms improved</option>
          <option value="Seeking another specialist">Seeking another specialist</option>
          <option value="Other">Other personal reason</option>
        </select>
      </div>
      <div class="flex items-center gap-2 pt-2">
        <button onclick="MediSlotModals.close()" class="flex-1 bg-surface-container-low text-on-surface py-2.5 rounded-full font-label-md text-label-md font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]">
          Keep Slot
        </button>
        <button onclick="MediSlotModals.confirmCancel(${appointmentId})" class="flex-1 bg-error text-white py-2.5 rounded-full font-label-md text-label-md font-bold border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 transition-all">
          Yes, Cancel Slot
        </button>
      </div>
    `;
    this.open(content);
  },

  async confirmCancel(id) {
    const reason = document.getElementById('cancel-reason') ? document.getElementById('cancel-reason').value : 'Patient requested';
    const res = await MediSlotStore.cancelAppointment(id, reason);
    if (res.success) {
      showToast(res.message, 'warning');
      this.close();
      if (window.renderCurrentPage) window.renderCurrentPage();
    } else {
      showToast(res.error || 'Cancellation failed', 'error');
    }
  },

  // 7. Prescription Refill Modal
  async showRxRefillModal(rxId) {
    const rxsData = await MediSlotStore.fetchPrescriptions();
    const rx = (rxsData.prescriptions || []).find(r => r.id === rxId) || {
      id: rxId,
      medication_name: 'Metoprolol Tartrate',
      dosage: '25 mg Oral Tablet',
      pharmacy: 'Walgreens Pharmacy #1043, Palo Alto'
    };

    const content = `
      <div class="flex items-center gap-2 border-b-2 border-[#1E293B] pb-space-sm">
        <span class="material-symbols-outlined text-secondary text-[24px]">medication</span>
        <h3 class="font-headline-sm text-headline-sm text-on-surface">Order Prescription Refill</h3>
      </div>
      <div class="bg-secondary-fixed/40 border-2 border-[#1E293B] p-space-md rounded-lg shadow-[2px_2px_0px_#1E293B] flex flex-col gap-1">
        <span class="font-headline-sm text-[16px] text-on-surface">${rx.medication_name}</span>
        <span class="text-xs font-bold text-on-surface-variant font-mono">${rx.dosage}</span>
      </div>
      <form onsubmit="event.preventDefault(); MediSlotModals.confirmRxRefill(${rx.id});" class="flex flex-col gap-space-sm">
        <div class="flex flex-col gap-1">
          <label class="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">Select Dispensing Pharmacy</label>
          <select id="refill-pharmacy" class="w-full bg-surface-container-lowest border-2 border-[#1E293B] rounded-lg px-space-md py-2 font-body-sm text-on-surface shadow-[2px_2px_0px_#1E293B] focus:outline-none cursor-pointer">
            <option value="Walgreens Pharmacy #1043, Palo Alto" selected>Walgreens Pharmacy #1043, Palo Alto (Preferred)</option>
            <option value="CVS Health Pharmacy, Palo Alto">CVS Health Pharmacy, Palo Alto</option>
            <option value="Stanford Health Outpatient Pharmacy">Stanford Health Outpatient Pharmacy</option>
          </select>
        </div>
        <button type="submit" class="mt-2 bg-secondary text-white py-3 rounded-full font-label-md text-label-md font-bold border-2 border-[#1E293B] shadow-[3px_3px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5">
          <span class="material-symbols-outlined text-[18px]">send</span>
          <span>Submit Electronic Refill Request</span>
        </button>
      </form>
    `;
    this.open(content);
  },

  async confirmRxRefill(id) {
    const pharmacy = document.getElementById('refill-pharmacy').value;
    const res = await MediSlotStore.refillPrescription(id, pharmacy);
    if (res.success) {
      showToast(res.message, 'success');
      this.close();
      if (window.renderCurrentPage) window.renderCurrentPage();
    } else {
      showToast(res.error || 'Failed to request refill', 'error');
    }
  },

  // 8. Printable Clinical Pass / PDF Summary
  async showPdfSummaryModal(appointmentId) {
    const res = await MediSlotStore.fetchAppointment(appointmentId);
    const appt = res.appointment || {
      booking_code: 'MED-7182',
      doctor_name: 'Dr. Sarah Jenkins',
      doctor_specialty: 'Cardiology',
      doctor_clinic: 'Stanford Medical Center',
      appointment_date: '2024-10-12',
      appointment_time: '02:15 PM',
      symptoms: 'Bi-annual Blood Pressure Follow-up',
      notes: 'Blood pressure well controlled at 122/78 mmHg. Continued Metoprolol 25mg daily.',
      patient_name: 'Alex Morgan',
      patient_mrn: 'MRN-90214'
    };

    const content = `
      <div class="printable-pass flex flex-col gap-space-md">
        <div class="flex items-center justify-between border-b-2 border-[#1E293B] pb-space-sm">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[28px]">description</span>
            <div>
              <h3 class="font-headline-sm text-headline-sm text-on-surface">Clinical Encounter Summary</h3>
              <span class="text-xs font-mono text-outline">FHIR Release 4.0.1 • HIPAA Certified</span>
            </div>
          </div>
          <span class="bg-primary text-white text-xs px-2.5 py-1 rounded font-bold font-mono">
            ${appt.booking_code}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs p-2 bg-surface-container-low border border-[#1E293B] rounded">
          <div><strong>Patient:</strong> ${appt.patient_name || 'Alex Morgan'}</div>
          <div><strong>MRN:</strong> ${appt.patient_mrn || 'MRN-90214'}</div>
          <div><strong>Clinician:</strong> ${appt.doctor_name}</div>
          <div><strong>Clinic:</strong> ${appt.doctor_clinic}</div>
          <div><strong>Encounter Date:</strong> ${appt.appointment_date} ${appt.appointment_time}</div>
          <div><strong>Mode:</strong> ${appt.consult_mode === 'telehealth' ? 'Telehealth HD' : 'In-Person Visit'}</div>
        </div>

        <div class="flex flex-col gap-1 text-body-sm">
          <span class="font-label-sm uppercase font-bold text-outline">Reason & Findings</span>
          <p class="text-on-surface font-semibold">${appt.symptoms || 'Routine follow-up'}</p>
          <div class="mt-1 p-2 bg-white border border-[#1E293B] rounded text-xs text-on-surface-variant font-mono">
            ${appt.notes || 'Vital signs stable. All biometric thresholds within target parameters.'}
          </div>
        </div>

        <div class="flex items-center justify-between pt-2 border-t-2 border-dashed border-[#1E293B] text-xs">
          <div>
            <span class="text-outline">Electronically signed by:</span>
            <div class="font-bold text-on-surface">${appt.doctor_name}, MD</div>
          </div>
          <button onclick="window.print()" class="bg-primary text-white px-space-md py-1.5 rounded-full font-bold shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">print</span>
            <span>Print Pass / PDF</span>
          </button>
        </div>
      </div>
    `;

    this.open(content);
  },

  // ============================================================
  // AUTH MODAL - Sign In / Create Account with Role Switcher
  // ============================================================
  openAuthModal(defaultRole = 'patient', defaultTab = 'signin') {
    const demoAccounts = window.SupabaseService
      ? window.SupabaseService.getDemoAccounts()
      : {
          patient: { email: 'alex.morgan@healthmail.com', password: 'Password123!' },
          doctor:  { email: 'sarah.jenkins@stanfordhealth.org', password: 'DoctorSecure2025!' },
          admin:   { email: 'admin@medislot.ai', password: 'AdminMaster2025!' }
        };

    // Track internal modal state
    if (!this._authState) this._authState = { role: defaultRole, tab: defaultTab };
    this._authState.role = defaultRole;
    this._authState.tab  = defaultTab;

    const isSignIn = defaultTab === 'signin';
    const role     = defaultRole;

    const roleBadgeClass = role === 'admin'
      ? 'bg-[#EF4444] text-white border-[#b91c1c]'
      : role === 'doctor'
        ? 'bg-secondary text-white border-secondary'
        : 'bg-primary text-on-primary border-primary';

    const content = `
      <div class="flex flex-col gap-space-md w-full">

        <!-- Header -->
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-space-sm">
            <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] shrink-0">
              <span class="material-symbols-outlined text-on-primary text-[22px]">medical_services</span>
            </div>
            <div>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                ${isSignIn ? 'Welcome to MediSlot AI' : 'Create your MediSlot Account'}
              </h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant">HIPAA-compliant secure access</p>
            </div>
          </div>

          <!-- Sign In / Create Account Tab Switcher -->
          <div class="flex items-center gap-1 bg-surface-container-low border-2 border-[#1E293B] rounded-full p-1 mt-1">
            <button type="button" onclick="MediSlotModals.openAuthModal('${role}', 'signin')"
              class="flex-1 py-1.5 rounded-full font-label-md text-label-md font-bold text-center transition-all ${isSignIn ? 'bg-primary text-on-primary shadow-[2px_2px_0px_#1E293B]' : 'text-on-surface-variant hover:bg-surface-container'}">
              Sign In
            </button>
            <button type="button" onclick="MediSlotModals.openAuthModal('${role}', 'signup')"
              class="flex-1 py-1.5 rounded-full font-label-md text-label-md font-bold text-center transition-all ${!isSignIn ? 'bg-primary text-on-primary shadow-[2px_2px_0px_#1E293B]' : 'text-on-surface-variant hover:bg-surface-container'}">
              Create Account
            </button>
          </div>
        </div>

        <!-- Role Switcher -->
        <div class="flex flex-col gap-1">
          <span class="font-label-sm text-label-sm uppercase tracking-wider font-extrabold text-outline">Account Type</span>
          <div class="grid grid-cols-3 gap-2">
            ${['patient','doctor','admin'].map(r => {
              const icon = r === 'admin' ? 'admin_panel_settings' : r === 'doctor' ? 'stethoscope' : 'person';
              const label = r.charAt(0).toUpperCase() + r.slice(1);
              const isActive = role === r;
              return `
                <button type="button" onclick="MediSlotModals.openAuthModal('${r}', '${defaultTab}')"
                  class="flex flex-col items-center gap-0.5 py-2 rounded-xl border-2 font-bold text-xs transition-all ${isActive ? (r === 'admin' ? 'bg-[#EF4444] text-white border-[#b91c1c] shadow-[2px_2px_0px_#1E293B]' : r === 'doctor' ? 'bg-secondary text-white border-secondary shadow-[2px_2px_0px_#1E293B]' : 'bg-primary text-on-primary border-primary shadow-[2px_2px_0px_#1E293B]') : 'bg-surface-container-lowest border-[#1E293B] text-on-surface hover:bg-surface-container'}">
                  <span class="material-symbols-outlined text-[20px]">${icon}</span>
                  ${label}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Form -->
        <form id="auth-form" onsubmit="event.preventDefault(); MediSlotModals.handleAuthSubmit('${role}', ${isSignIn})" class="flex flex-col gap-space-sm">

          ${!isSignIn ? `
          <div class="flex flex-col gap-1">
            <label class="font-label-sm text-label-sm uppercase tracking-wider font-bold text-outline">Full Name</label>
            <input id="auth-fullname" type="text" placeholder="Alex Morgan"
              class="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-lg px-space-sm py-2.5 font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:shadow-[3px_3px_0px_#6b38d4] transition-shadow"
              required />
          </div>
          ` : ''}

          <div class="flex flex-col gap-1">
            <label class="font-label-sm text-label-sm uppercase tracking-wider font-bold text-outline">Email Address</label>
            <input id="auth-email" type="email" placeholder="${demoAccounts[role].email}"
              class="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-lg px-space-sm py-2.5 font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:shadow-[3px_3px_0px_#6b38d4] transition-shadow"
              required />
          </div>

          <div class="flex flex-col gap-1">
            <label class="font-label-sm text-label-sm uppercase tracking-wider font-bold text-outline">Password</label>
            <div class="relative">
              <input id="auth-password" type="password" placeholder="••••••••••"
                class="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-lg px-space-sm py-2.5 pr-10 font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:shadow-[3px_3px_0px_#6b38d4] transition-shadow"
                required minlength="8" />
              <button type="button" onclick="const i=document.getElementById('auth-password'); i.type=(i.type==='password'?'text':'password'); this.querySelector('span').textContent=(i.type==='password'?'visibility_off':'visibility');"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors">
                <span class="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
          </div>

          ${!isSignIn ? `
          <div class="flex flex-col gap-1">
            <label class="font-label-sm text-label-sm uppercase tracking-wider font-bold text-outline">Phone (Optional)</label>
            <input id="auth-phone" type="tel" placeholder="+1 (555) 000-0000"
              class="w-full bg-[#FFFDF5] border-2 border-[#1E293B] rounded-lg px-space-sm py-2.5 font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:shadow-[3px_3px_0px_#6b38d4] transition-shadow" />
          </div>
          ` : ''}

          <!-- Primary Submit Button -->
          <button type="submit"
            class="w-full bg-primary text-on-primary border-2 border-[#1E293B] rounded-full py-3 font-headline-sm text-[17px] font-bold shadow-[4px_4px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 mt-1">
            <span class="material-symbols-outlined text-[20px]">${isSignIn ? 'login' : 'person_add'}</span>
            ${isSignIn ? 'Sign In Securely' : 'Create Account'}
          </button>
        </form>

        <!-- Demo Quick-Fill Buttons -->
        <div class="border-t-2 border-dashed border-[#1E293B] pt-space-sm flex flex-col gap-space-xs">
          <span class="font-label-sm text-label-sm uppercase tracking-wider font-extrabold text-outline text-center">⚡ 1-Click Demo Quick Fill</span>
          <div class="grid grid-cols-3 gap-2">
            <button type="button" onclick="MediSlotModals._fillDemo('patient', ${isSignIn})"
              class="py-2 px-1 rounded-xl bg-primary-fixed border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] text-xs font-bold text-on-primary-fixed hover:-translate-y-0.5 transition-all flex flex-col items-center gap-0.5">
              <span class="material-symbols-outlined text-[18px] text-primary">person</span>
              Patient
            </button>
            <button type="button" onclick="MediSlotModals._fillDemo('doctor', ${isSignIn})"
              class="py-2 px-1 rounded-xl bg-secondary-fixed border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] text-xs font-bold text-on-secondary-fixed hover:-translate-y-0.5 transition-all flex flex-col items-center gap-0.5">
              <span class="material-symbols-outlined text-[18px] text-secondary">stethoscope</span>
              Doctor
            </button>
            <button type="button" onclick="MediSlotModals._fillDemo('admin', ${isSignIn})"
              class="py-2 px-1 rounded-xl bg-tertiary-fixed border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B] text-xs font-bold text-on-tertiary-fixed hover:-translate-y-0.5 transition-all flex flex-col items-center gap-0.5">
              <span class="material-symbols-outlined text-[18px] text-tertiary">admin_panel_settings</span>
              Admin
            </button>
          </div>
        </div>

        <!-- Security Badge Row -->
        <div class="flex items-center justify-center gap-space-md text-outline font-label-sm text-[10px]">
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[#34D399] text-[14px]">verified_user</span>
            HIPAA Compliant
          </div>
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-primary text-[14px]">lock</span>
            256-Bit SSL
          </div>
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-secondary text-[14px]">security</span>
            SOC2 Type II
          </div>
        </div>

      </div>
    `;

    this.open(content);
  },

  _fillDemo(role, isSignIn) {
    const demos = {
      patient: { email: 'alex.morgan@healthmail.com', password: 'Password123!', name: 'Alex Morgan' },
      doctor:  { email: 'sarah.jenkins@stanfordhealth.org', password: 'DoctorSecure2025!', name: 'Dr. Sarah Jenkins' },
      admin:   { email: 'admin@medislot.ai', password: 'AdminMaster2025!', name: 'Chief Administrator' }
    };
    const d = demos[role];
    const emailField = document.getElementById('auth-email');
    const passField  = document.getElementById('auth-password');
    const nameField  = document.getElementById('auth-fullname');
    if (emailField) emailField.value = d.email;
    if (passField)  passField.value  = d.password;
    if (nameField)  nameField.value  = d.name;
    // Auto-switch role tabs
    this.openAuthModal(role, isSignIn ? 'signin' : 'signup');
  },

  async handleAuthSubmit(role, isSignIn) {
    const email    = (document.getElementById('auth-email')?.value || '').trim();
    const password = (document.getElementById('auth-password')?.value || '').trim();
    const fullName = (document.getElementById('auth-fullname')?.value || '').trim();
    const phone    = (document.getElementById('auth-phone')?.value || '').trim();

    if (!email || !password) {
      showToast('Please enter email and password.', 'error');
      return;
    }

    const btn = document.querySelector('#auth-form button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">refresh</span> Authenticating...';
    }

    try {
      let result;
      if (window.SupabaseService) {
        if (isSignIn) {
          result = await window.SupabaseService.signIn(email, password);
        } else {
          result = await window.SupabaseService.signUp(email, password, { full_name: fullName, role, phone });
        }
      } else {
        result = { success: false, error: 'Auth service not available.' };
      }

      if (result.success) {
        const greeting = isSignIn ? 'Welcome back' : 'Account created';
        showToast(`${greeting}, ${result.user.name || fullName || email.split('@')[0]}! 🎉`, 'success');
        this.close();

        // Update header badge
        if (window.MediSlotStore) {
          window.MediSlotStore.updateHeaderAuthUI();
        }

        // Navigate to appropriate dashboard
        if (result.user.role === 'doctor') {
          window.location.hash = '#doctor-console';
        } else if (result.user.role === 'admin') {
          window.location.hash = '#admin-hub';
        } else {
          window.location.hash = '#patient-portal';
        }
      } else {
        showToast(result.error || 'Authentication failed. Try a Demo Quick Fill button.', 'error');
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<span class="material-symbols-outlined text-[20px]">${isSignIn ? 'login' : 'person_add'}</span> ${isSignIn ? 'Sign In Securely' : 'Create Account'}`;
        }
      }
    } catch (err) {
      showToast('Authentication error: ' + err.message, 'error');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span class="material-symbols-outlined text-[20px]">login</span> Try Again`;
      }
    }
  }
};

// Convenience alias
window.Modals = window.MediSlotModals;
