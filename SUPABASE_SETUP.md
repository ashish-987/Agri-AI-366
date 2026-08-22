# 🚀 Supabase Database & Authentication Setup Guide for AgriAI 366

This project is fully configured with **Supabase Authentication** and **PostgreSQL Database** with Row Level Security (RLS) policies.

---

## 1. Create a Supabase Project

1. Go to [Supabase Console](https://database.new) and sign in.
2. Click **New Project**.
3. Set project name (e.g. `agriai-366`), choose a strong Database Password, and select your nearest region.

---

## 2. Run Database Schema SQL Script

1. Open your Supabase Project Dashboard.
2. Navigate to **SQL Editor** from the left sidebar.
3. Click **New Query**.
4. Open the [`supabase_schema.sql`](file:///d:/SIH-2026/AgriAi-366/supabase_schema.sql) file in this repository and copy all its contents.
5. Paste into the SQL Editor and click **Run**.

### What `supabase_schema.sql` creates:
- **`profiles`**: User profiles linked to `auth.users` with `full_name`, `phone`, `location`, `district`, `total_area_acres`, and plan details.
- **`on_auth_user_created` Trigger**: Automatically creates a matching `profiles` record whenever a new user registers via Supabase Auth.
- **`farms`**: User farm management records.
- **`marketplace_products`**: 366 District Mandi crop buy/sell listings.
- **`equipment_rentals`**: Machinery & tractor rental listings.
- **`disease_scans`**: History of AI plant disease diagnostic scans.
- **`forum_posts` & `forum_comments`**: Community discussion forum.
- **`expert_consultations`**: Farmer consultation bookings with Agri experts.
- **Row Level Security (RLS)**: Strict security policies ensuring users can only edit their own records while marketplace/forum items remain publicly queryable.

---

## 3. Configure Local Environment Variables (`.env`)

1. Go to **Project Settings** -> **API** in your Supabase Dashboard.
2. Copy your **Project URL** and **`anon` `public` API Key**.
3. Create/update the `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```

---

## 4. Enable Google OAuth Login (Optional)

1. Go to **Authentication** -> **Providers** in Supabase.
2. Select **Google** and toggle **Enable Google provider**.
3. Add your Google OAuth **Client ID** and **Client Secret** (from Google Cloud Console).
4. Add your app URL (`http://localhost:3000`) to Authorized Redirect URIs.

---

## 5. File Structure Reference

- [`supabase_schema.sql`](file:///d:/SIH-2026/AgriAi-366/supabase_schema.sql): Database tables, triggers, and RLS policies.
- [`src/lib/supabase.js`](file:///d:/SIH-2026/AgriAi-366/src/lib/supabase.js): Supabase client setup with environment fallback.
- [`src/lib/supabaseAuth.js`](file:///d:/SIH-2026/AgriAi-366/src/lib/supabaseAuth.js): Authentication helpers (`signUpWithEmail`, `signInWithEmail`, `signInWithGoogle`, `signOutUser`, `getCurrentUserProfile`).
- [`src/components/AuthModal.jsx`](file:///d:/SIH-2026/AgriAi-366/src/components/AuthModal.jsx): Frontend registration, login, and Google sign in UI.
- [`src/App.jsx`](file:///d:/SIH-2026/AgriAi-366/src/App.jsx): Supabase session listener and auto-login state sync.
