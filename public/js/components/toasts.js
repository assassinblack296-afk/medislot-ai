// MediSlot Neo-Brutalist Toast Notifications
window.showToast = function(message, type = 'success', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto flex items-center gap-2 px-space-md py-3 rounded-lg border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] font-label-md text-label-md transition-all transform translate-y-4 opacity-0 cursor-pointer max-w-sm';

  let bgClass = 'bg-[#D1FAE5] text-[#065F46]';
  let icon = 'check_circle';

  if (type === 'error') {
    bgClass = 'bg-[#FEE2E2] text-[#991B1B]';
    icon = 'error';
  } else if (type === 'warning') {
    bgClass = 'bg-tertiary-fixed text-on-tertiary-fixed';
    icon = 'warning';
  } else if (type === 'info') {
    bgClass = 'bg-primary-fixed text-on-primary-fixed';
    icon = 'info';
  }

  toast.className += ` ${bgClass}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] shrink-0">${icon}</span>
    <span class="flex-1">${message}</span>
    <span class="material-symbols-outlined text-[16px] opacity-60 hover:opacity-100">close</span>
  `;

  toast.onclick = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 200);
  };

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 200);
    }
  }, duration);
};
