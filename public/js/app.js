// MediSlot AI - Main Application Bootstrap
document.addEventListener('DOMContentLoaded', async () => {
  console.log('MediSlot AI frontend initializing...');

  // Initialize Modal System
  if (window.MediSlotModals) {
    window.MediSlotModals.init();
  }

  // Initialize Supabase Auth Service (restore session if any)
  if (window.SupabaseService) {
    await window.SupabaseService.init();
    // Restore logged-in user from localStorage if previously signed in
    const restoredUser = window.SupabaseService.getCurrentUser();
    if (restoredUser && window.MediSlotStore) {
      window.MediSlotStore.currentUser = restoredUser;
    }
  }

  // Update header auth badge based on current user state
  if (window.MediSlotStore) {
    window.MediSlotStore.updateHeaderAuthUI();
  }

  // Close user dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('header-user-dropdown');
    const container = document.getElementById('header-user-badge-container');
    if (dropdown && container && !container.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  // Initialize MediBot Assistant
  if (window.MediBot) {
    window.MediBot.init();
  }

  // Mobile Menu Drawer Toggle Handlers
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileClose = document.getElementById('mobile-menu-close');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.remove('hidden');
    });
  }

  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', () => {
      mobileDrawer.classList.add('hidden');
    });
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        mobileDrawer.classList.add('hidden');
      }
    });
  }

  // Pre-load doctors into store
  if (window.MediSlotStore) {
    await window.MediSlotStore.fetchDoctors();
  }

  // Initialize Router
  if (window.MediSlotRouter) {
    window.MediSlotRouter.init();
  }

  console.log('MediSlot AI initialized successfully!');
});
