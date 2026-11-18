# MediSlot AI — GitHub, Supabase & Cloud Hosting Guide

This step-by-step guide covers how to push your project to GitHub, link it with your Supabase backend, and deploy it to a free cloud hosting service.

---

## 🚀 Part 1: Push Code to GitHub

Your local Git repository has already been initialized and committed on branch `main` with `.gitignore` protecting your secrets (`.env` and database files).

### Step 1.1: Create a new repository on GitHub
1. Open [GitHub](https://github.com) and log in.
2. In the top-right corner, click **+** -> **New repository**.
3. Name your repository (e.g., `medislot-ai-healthcare`).
4. Keep it **Public** (or **Private**).
5. **Do NOT** check "Add a README", ".gitignore", or "license" (we already created them locally).
6. Click **Create repository**.

### Step 1.2: Connect and push your local project
Run the following commands in your PowerShell / Command Prompt inside this project folder:

```powershell
# 1. Add your remote GitHub URL (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/medislot-ai-healthcare.git

# 2. Push all code to the main branch
git push -u origin main
```

---

## ⚡ Part 2: Integrate with Supabase

### Step 2.1: Create a Supabase Project
1. Go to [Supabase](https://supabase.com) and sign in.
2. Click **New Project**.
3. Choose your organization, name the project (e.g., `medislot-ai`), set a secure database password, and choose a region close to you.
4. Click **Create new project** (takes ~1 minute to spin up).

### Step 2.2: Apply the PostgreSQL Database Schema
1. In the Supabase sidebar, click **SQL Editor** (icon with `>_`).
2. Click **New query**.
3. Open [`supabase/schema.sql`](supabase/schema.sql) in this repository and copy all its contents.
4. Paste the SQL into the editor and click **Run**.
5. You should see `Success. No rows returned`.
   - This creates: `profiles`, `doctors`, `slots`, `appointments`, `prescriptions`, `waitlist` tables.
   - Sets up Row Level Security (RLS) policies.
   - Creates the automatic trigger that generates a profile when a user registers.
   - Populates seed clinicians and clinics.

### Step 2.3: Get your API Credentials
1. In your Supabase Dashboard, click **Project Settings** (gear icon at the bottom left) -> **API**.
2. Locate:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **Project API keys** -> **`anon` `public`** key (starts with `eyJ...`)
3. Open your local [`.env`](.env) file and add these:
   ```env
   PORT=3000
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
4. Restart your server (`node server/index.js`). The frontend will automatically detect the Supabase configuration via `/api/config`!

---

## 🌐 Part 3: Host Live on the Cloud

You can deploy the app to **Render**, **Railway**, or **Vercel**. Render is recommended for quick full-stack Node.js hosting with a free tier.

### Option A: Deploy on Render (Recommended & Free)
1. Sign up / Log in to [Render.com](https://render.com) using your GitHub account.
2. Click **New +** -> **Web Service**.
3. Select **Build and deploy from a Git repository** -> choose your `medislot-ai-healthcare` repository.
4. Fill in the settings:
   - **Name**: `medislot-ai`
   - **Region**: Closest to you
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Click **Advanced** -> **Add Environment Variable**:
   | Key | Value |
   |---|---|
   | `NODE_VERSION` | `22.12.0` |
   | `SUPABASE_URL` | `https://your-project-id.supabase.co` |
   | `SUPABASE_ANON_KEY` | `your-anon-public-key` |
6. Click **Create Web Service**.
7. In ~2 minutes, Render will assign you a live HTTPS URL like `https://medislot-ai.onrender.com`!

---

### Option B: Deploy on Railway
1. Go to [Railway.app](https://railway.app) and log in with GitHub.
2. Click **New Project** -> **Deploy from GitHub repo**.
3. Select your `medislot-ai-healthcare` repository.
4. Under **Variables**, add:
   - `SUPABASE_URL`: your Supabase project URL
   - `SUPABASE_ANON_KEY`: your Supabase anon key
   - `PORT`: `3000`
5. Railway auto-detects `npm start` and provisions your public domain immediately.

---

## 🧪 Verification Checklist After Hosting
- [ ] Visit your deployed live URL.
- [ ] Navigate to **Book Appointment** (Step 2) -> test date switching with chevrons and pick a slot.
- [ ] Open the **Sign In** modal from the header and test the **⚡ 1-Click Demo Quick Fill** buttons (or create a new Supabase account).
- [ ] Test the **Ask MediBot AI** floating concierge drawer.
- [ ] Check the **Patient Portal** and **Doctor Console** screens.
