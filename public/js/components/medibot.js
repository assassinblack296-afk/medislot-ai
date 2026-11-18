// MediSlot Global Interactive MediBot AI Assistant
window.MediBot = {
  drawer: null,
  messagesContainer: null,
  inputField: null,
  form: null,

  init() {
    this.drawer = document.getElementById('medibot-drawer');
    this.messagesContainer = document.getElementById('medibot-messages');
    this.inputField = document.getElementById('medibot-input-field');
    this.form = document.getElementById('medibot-form');

    // Header trigger button
    const launcherBtn = document.getElementById('header-medibot-btn');
    if (launcherBtn) {
      launcherBtn.addEventListener('click', () => this.toggle());
    }

    // Close button
    const closeBtn = document.getElementById('close-medibot-drawer');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Quick prompt chips
    document.querySelectorAll('.medibot-quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.getAttribute('data-prompt');
        if (text) {
          this.sendMessage(text);
        }
      });
    });

    // Form submit
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = this.inputField.value.trim();
        if (msg) {
          this.sendMessage(msg);
          this.inputField.value = '';
        }
      });
    }
  },

  open() {
    if (!this.drawer) this.init();
    this.drawer.classList.remove('translate-x-full');
    if (this.inputField) this.inputField.focus();
  },

  close() {
    if (!this.drawer) return;
    this.drawer.classList.add('translate-x-full');
  },

  toggle() {
    if (!this.drawer) this.init();
    if (this.drawer.classList.contains('translate-x-full')) {
      this.open();
    } else {
      this.close();
    }
  },

  async sendMessage(text) {
    this.open();

    // Append User Message
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'flex items-start gap-2 max-w-[85%] self-end';
    userMsgEl.innerHTML = `
      <div class="bg-primary text-white border-2 border-[#1E293B] p-space-sm rounded-xl shadow-[2px_2px_0px_#1E293B] font-body-sm text-body-sm">
        ${text}
      </div>
      <div class="w-7 h-7 rounded-full bg-primary-fixed border border-[#1E293B] flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-primary text-[16px]">person</span>
      </div>
    `;
    this.messagesContainer.appendChild(userMsgEl);
    this.scrollToBottom();

    // Append Loading Indicator
    const loadingEl = document.createElement('div');
    loadingEl.className = 'flex items-start gap-2 max-w-[85%] self-start loading-bot';
    loadingEl.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-secondary-fixed border border-[#1E293B] flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-secondary text-[16px]">smart_toy</span>
      </div>
      <div class="bg-surface-container-lowest border-2 border-[#1E293B] px-3 py-2 rounded-xl shadow-[2px_2px_0px_#1E293B] font-body-sm text-body-sm flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-secondary animate-bounce"></span>
        <span class="w-2 h-2 rounded-full bg-primary animate-bounce delay-100"></span>
        <span class="w-2 h-2 rounded-full bg-tertiary animate-bounce delay-200"></span>
        <span class="text-xs text-outline ml-1">Analyzing triage protocol...</span>
      </div>
    `;
    this.messagesContainer.appendChild(loadingEl);
    this.scrollToBottom();

    // Call API
    const res = await MediSlotStore.chatMediBot(text);
    loadingEl.remove();

    // Format response
    let actionBtnHtml = '';
    if (res.actionType === 'doctor_recommendation' && res.suggestedDoctorId) {
      actionBtnHtml = `
        <button onclick="MediSlotModals.bookDoctorDirect(${res.suggestedDoctorId}); MediBot.close();" class="mt-2 w-full bg-primary text-white py-1.5 px-3 rounded-full text-xs font-bold border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-1">
          <span>Book Specialist Now</span>
          <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      `;
    } else if (res.actionType === 'slot_scan') {
      actionBtnHtml = `
        <a href="#find-doctors" onclick="MediBot.close();" class="mt-2 inline-flex w-full bg-secondary text-white py-1.5 px-3 rounded-full text-xs font-bold border border-[#1E293B] shadow-[2px_2px_0px_#1E293B] items-center justify-center gap-1">
          <span>View Released Slots</span>
          <span class="material-symbols-outlined text-[14px]">bolt</span>
        </a>
      `;
    }

    const botMsgEl = document.createElement('div');
    botMsgEl.className = 'flex items-start gap-2 max-w-[88%] self-start';
    botMsgEl.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-secondary-fixed border border-[#1E293B] flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-secondary text-[16px]">smart_toy</span>
      </div>
      <div class="bg-surface-container-lowest border-2 border-[#1E293B] p-space-sm rounded-xl shadow-[2px_2px_0px_#1E293B] font-body-sm text-body-sm text-on-surface">
        <div class="whitespace-pre-line">${res.reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
        ${actionBtnHtml}
      </div>
    `;
    this.messagesContainer.appendChild(botMsgEl);
    this.scrollToBottom();
  },

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }
};
