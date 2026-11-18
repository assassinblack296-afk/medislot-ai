// MediSlot AI - Supabase Client & Universal Authentication Service
(function () {
  const DEMO_ACCOUNTS = {
    patient: {
      email: 'alex.morgan@healthmail.com',
      password: 'Password123!',
      user: {
        id: 'usr_pat_90214',
        role: 'patient',
        name: 'Alex Morgan',
        email: 'alex.morgan@healthmail.com',
        phone: '+1 (555) 019-2834',
        mrn: 'MRN-90214',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
      }
    },
    doctor: {
      email: 'sarah.jenkins@stanfordhealth.org',
      password: 'DoctorSecure2025!',
      user: {
        id: 'usr_doc_001',
        role: 'doctor',
        name: 'Dr. Sarah Jenkins, MD',
        email: 'sarah.jenkins@stanfordhealth.org',
        phone: '+1 (650) 723-4000',
        title: 'Senior Cardiologist & Valve Specialist',
        clinic: 'Stanford Medical Center',
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwb0Ju8pqUPElote7vtFU_c_LgubjUJfVGIICiRpMmb4Q-DBqCHCCasCWhQG4NwsB8G2ua4-FQ-6S68xHxPxkQfYhPLuUqPFh4FRh4R8gEaw63hI4Rbbc9bJ_bWxTQZop7qN-C1AmACmesRQqIuJE6LsS5T9fUb-19gFGQi3_Wb8yKT0j7njyweFvK4zC66P3Ny9-R0pZ5YM9pUyW1t7RpmIiB5BQCn9DZgVKlPo8'
      }
    },
    admin: {
      email: 'admin@medislot.ai',
      password: 'AdminMaster2025!',
      user: {
        id: 'usr_adm_999',
        role: 'admin',
        name: 'Chief Medical Officer / Admin',
        email: 'admin@medislot.ai',
        phone: '+1 (800) 555-SLOT',
        clinic: 'Stanford Health Network HQ',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
      }
    }
  };

  class SupabaseAuthService {
    constructor() {
      this.client = null;
      this.config = null;
      this.initialized = false;
    }

    async init() {
      if (this.initialized) return;
      const defaultUrl = 'https://ktijkefbnjbhphfelwvd.supabase.co';
      const defaultKey = 'sb_publishable_p4sz-WuWH9kqHYaKT-03gw_1CnDmtYJ';

      let url = defaultUrl;
      let key = defaultKey;

      try {
        const res = await fetch('/api/config');
        if (res.ok) {
          this.config = await res.json();
          if (this.config.supabaseUrl) url = this.config.supabaseUrl;
          if (this.config.supabaseAnonKey) key = this.config.supabaseAnonKey;
        }
      } catch (err) {
        console.warn('[SupabaseService] Config endpoint unreachable, using default credentials');
      }

      if (url && key && window.supabase) {
        try {
          this.client = window.supabase.createClient(url, key);
          console.log('[SupabaseService] Initialized with Supabase project:', url);
        } catch (e) {
          console.warn('[SupabaseService] Failed to initialize client:', e);
        }
      }

      this.initialized = true;

      // Restore session from localStorage if present
      const savedUser = localStorage.getItem('medislot_auth_user');
      if (savedUser) {
        try {
          const userObj = JSON.parse(savedUser);
          if (window.MediSlotStore) {
            window.MediSlotStore.setCurrentUser(userObj);
          }
        } catch (e) {
          localStorage.removeItem('medislot_auth_user');
        }
      }
    }

    isConfigured() {
      return Boolean(this.client);
    }

    getDemoAccounts() {
      return DEMO_ACCOUNTS;
    }

    async signIn(email, password) {
      await this.init();

      // If Supabase Cloud Client is configured, authenticate via Supabase Auth
      if (this.client) {
        try {
          const { data, error } = await this.client.auth.signInWithPassword({
            email,
            password
          });
          if (error) throw error;

          // Fetch profile details
          let profile = null;
          const { data: profData } = await this.client
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profData) {
            profile = profData;
          } else {
            profile = {
              id: data.user.id,
              email: data.user.email,
              name: data.user.user_metadata?.full_name || email.split('@')[0],
              role: data.user.user_metadata?.role || 'patient'
            };
          }

          localStorage.setItem('medislot_auth_user', JSON.stringify(profile));
          if (window.MediSlotStore) window.MediSlotStore.setCurrentUser(profile);
          return { success: true, user: profile, mode: 'supabase' };
        } catch (err) {
          console.warn('[SupabaseService] Cloud login failed, checking local credentials:', err.message);
          return this.fallbackSignIn(email, password, err.message);
        }
      }

      // Default / Local mode
      return this.fallbackSignIn(email, password);
    }

    fallbackSignIn(email, password, fallbackReason) {
      const lowerEmail = (email || '').trim().toLowerCase();

      // Match demo account
      for (const key of Object.keys(DEMO_ACCOUNTS)) {
        const demo = DEMO_ACCOUNTS[key];
        if (demo.email.toLowerCase() === lowerEmail) {
          if (demo.password === password) {
            localStorage.setItem('medislot_auth_user', JSON.stringify(demo.user));
            if (window.MediSlotStore) window.MediSlotStore.setCurrentUser(demo.user);
            return { success: true, user: demo.user, mode: 'local' };
          } else {
            return { success: false, error: 'Incorrect password for this account.' };
          }
        }
      }

      // Allow any newly registered local mock account
      const customUsers = JSON.parse(localStorage.getItem('medislot_custom_users') || '[]');
      const found = customUsers.find(u => u.email.toLowerCase() === lowerEmail);
      if (found) {
        if (found.password === password) {
          localStorage.setItem('medislot_auth_user', JSON.stringify(found.user));
          if (window.MediSlotStore) window.MediSlotStore.setCurrentUser(found.user);
          return { success: true, user: found.user, mode: 'local' };
        } else {
          return { success: false, error: 'Incorrect password.' };
        }
      }

      return {
        success: false,
        error: fallbackReason || 'Account not found. Click "Patient Demo" or "Create Account" below.'
      };
    }

    async signUp(email, password, meta = {}) {
      await this.init();

      if (this.client) {
        try {
          const { data, error } = await this.client.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: meta.full_name || email.split('@')[0],
                role: meta.role || 'patient',
                phone: meta.phone || ''
              }
            }
          });
          if (error) throw error;

          const user = {
            id: data.user ? data.user.id : `usr_${Date.now()}`,
            email,
            name: meta.full_name || email.split('@')[0],
            role: meta.role || 'patient',
            phone: meta.phone || ''
          };

          localStorage.setItem('medislot_auth_user', JSON.stringify(user));
          if (window.MediSlotStore) window.MediSlotStore.setCurrentUser(user);
          return { success: true, user, mode: 'supabase' };
        } catch (err) {
          console.warn('[SupabaseService] Cloud registration failed, saving locally:', err.message);
        }
      }

      // Local Registration
      const newUser = {
        id: `usr_${Date.now()}`,
        role: meta.role || 'patient',
        name: meta.full_name || email.split('@')[0],
        email,
        phone: meta.phone || '+1 (555) 000-0000',
        mrn: `MRN-${Math.floor(10000 + Math.random() * 90000)}`,
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
      };

      const customUsers = JSON.parse(localStorage.getItem('medislot_custom_users') || '[]');
      customUsers.push({ email, password, user: newUser });
      localStorage.setItem('medislot_custom_users', JSON.stringify(customUsers));

      localStorage.setItem('medislot_auth_user', JSON.stringify(newUser));
      if (window.MediSlotStore) window.MediSlotStore.setCurrentUser(newUser);

      return { success: true, user: newUser, mode: 'local' };
    }

    async signOut() {
      if (this.client) {
        try {
          await this.client.auth.signOut();
        } catch (e) {
          console.warn('Sign out error:', e);
        }
      }
      localStorage.removeItem('medislot_auth_user');
      if (window.MediSlotStore) window.MediSlotStore.setCurrentUser(null);
      return { success: true };
    }

    getCurrentUser() {
      const raw = localStorage.getItem('medislot_auth_user');
      return raw ? JSON.parse(raw) : null;
    }
  }

  window.SupabaseService = new SupabaseAuthService();
})();
