// MediSlot AI - Client-Side SPA Router
window.MediSlotRouter = {
  routes: {
    'landing': window.LandingPage,
    'patient-portal': window.PatientDashboardPage,
    'find-doctors': window.FindDoctorsPage,
    'book-appointment': window.BookAppointmentPage,
    'doctor-console': window.DoctorConsolePage,
    'admin-hub': window.AdminHubPage
  },

  currentRoute: 'landing',

  init() {
    window.addEventListener('hashchange', () => this.handleRouting());
    this.handleRouting();
  },

  handleRouting() {
    const rawHash = window.location.hash.slice(1);
    const routeName = (rawHash.split('?')[0] || 'landing').replace(/^\//, '');

    const targetRoute = this.routes[routeName] ? routeName : 'landing';
    this.currentRoute = targetRoute;

    // Render Page
    this.renderRoute(targetRoute);

    // Update Navigation Active State
    this.updateNavPills(targetRoute);

    // Close Mobile Menu if open
    const mobileDrawer = document.getElementById('mobile-menu-drawer');
    if (mobileDrawer) {
      mobileDrawer.classList.add('hidden');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  renderRoute(routeName) {
    const page = this.routes[routeName];
    const root = document.getElementById('app-root');
    if (!root || !page) return;

    root.innerHTML = page.render();
    if (page.afterRender) {
      page.afterRender();
    }
  },

  updateNavPills(activeRoute) {
    // Desktop Nav Links
    document.querySelectorAll('#desktop-nav .nav-link').forEach(link => {
      const path = link.getAttribute('data-nav');
      if (path === activeRoute) {
        link.className = 'nav-link px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all bg-primary text-on-primary font-bold shadow-[2px_2px_0px_#1E293B]';
        link.setAttribute('aria-current', 'page');
      } else {
        link.className = 'nav-link px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all text-on-surface-variant hover:text-on-surface';
        link.removeAttribute('aria-current');
      }
    });

    // Mobile Nav Links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeRoute}`) {
        link.classList.remove('bg-surface-container-lowest', 'text-on-surface');
        link.classList.add('bg-primary', 'text-white', 'font-bold');
      } else {
        link.classList.remove('bg-primary', 'text-white', 'font-bold');
        link.classList.add('bg-surface-container-lowest', 'text-on-surface');
      }
    });

    // Update document title
    const titles = {
      'landing': 'MediSlot AI - Smart Medical Appointment Booking',
      'patient-portal': 'MediSlot AI - Patient Portal & Care Records',
      'find-doctors': 'MediSlot AI - Find & Book Top Clinicians',
      'book-appointment': 'MediSlot AI - Clinical Operations & Booking Pass',
      'doctor-console': 'MediSlot AI - Doctor Console',
      'admin-hub': 'MediSlot AI - Regional Operations Hub'
    };
    document.title = titles[activeRoute] || 'MediSlot AI';
  }
};

window.renderCurrentPage = function() {
  if (window.MediSlotRouter) {
    window.MediSlotRouter.renderRoute(window.MediSlotRouter.currentRoute);
  }
};
