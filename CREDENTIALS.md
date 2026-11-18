# MediSlot AI - Login Credentials & Supabase Configuration Guide

This document maintains all login IDs, passwords, role access levels, and Supabase database configuration for the **MediSlot AI Healthcare Scheduler**.

---

## 1. System Login Credentials Reference

You can use these credentials in the **Sign In** modal directly on the web application:

| Role | Name / Title | Login ID (Email) | Password | Access Level & Permissions |
|---|---|---|---|---|
| **Patient** | Alex Morgan (`MRN-90214`) | `alex.morgan@healthmail.com` | `Password123!` | Book visits, self kiosk check-in, reschedule, request Rx refills, download passes |
| **Doctor** | Dr. Sarah Jenkins, MD | `sarah.jenkins@stanfordhealth.org` | `DoctorSecure2025!` | View clinic schedule, manage patient queue, launch telehealth video room, toggle slot availability |
| **Admin** | Chief Hospital Administrator | `admin@medislot.ai` | `AdminMaster2025!` | Multi-clinic capacity radar, network load rebalancing, system oversight |

> [!TIP]
> **1-Click Quick Fill**: The Sign In modal includes convenient **Quick Fill** buttons for each role so you can test any account instantly without typing!

---

## 2. Using Supabase for Backend & Authentication

MediSlot AI is architected with a **dual-engine backend**:
1. **Local Mode (Default)**: Runs smoothly using persistent SQLite with seed data for all clinicians, slots, prescriptions, and appointments.
2. **Supabase Cloud Mode**: Seamlessly switches to Supabase Auth & PostgreSQL when your Supabase credentials are configured.

### Step 1: Create a Supabase Project
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New project**, choose an organization, give it a name (e.g. `medislot-ai`), and set a strong database password.
3. Select your preferred region (e.g., US West or closest to you).

### Step 2: Apply the PostgreSQL Schema
1. In your Supabase Dashboard, open the **SQL Editor** from the left navigation bar.
2. Open the file [`supabase/schema.sql`](file:///c:/Users/assas/Downloads/stitch_medislot_ai_healthcare_scheduler/supabase/schema.sql) from this project.
3. Paste the entire SQL script into the Supabase SQL editor and click **Run**.
4. This will create:
   - `profiles` table with automatic user creation trigger on Supabase Auth signup.
   - `doctors`, `slots`, `appointments`, `prescriptions`, and `waitlist` tables.
   - Complete Row Level Security (RLS) policies.
   - Pre-seeded clinicians matching the application prototype.

### Step 3: Configure Environment Variables
1. In your Supabase project, go to **Project Settings** -> **API**.
2. Copy your **Project URL** and **anon / public key**.
3. Open the file [`.env`](file:///c:/Users/assas/Downloads/stitch_medislot_ai_healthcare_scheduler/.env) in the project root:
   ```env
   PORT=3000
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Restart the server:
   ```bash
   node server/index.js
   ```

### Step 4: Create Initial Auth Users in Supabase (Optional)
In your Supabase Dashboard under **Authentication** -> **Users**, click **Add user**:
- **Email**: `alex.morgan@healthmail.com` | **Password**: `Password123!` (Role: `patient`, Name: `Alex Morgan`)
- **Email**: `sarah.jenkins@stanfordhealth.org` | **Password**: `DoctorSecure2025!` (Role: `doctor`, Name: `Dr. Sarah Jenkins`)
- **Email**: `admin@medislot.ai` | **Password**: `AdminMaster2025!` (Role: `admin`, Name: `System Administrator`)

---

## 3. Security Best Practices
- Passwords entered in the UI are masked by default with an eye icon toggle for visibility.
- All client sessions are token-stored securely with automatic session restoration upon page refresh.
- Production deployments should use environment variables rather than committing production keys to version control.
