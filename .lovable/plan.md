## Goal
Restructure the CAA portal into two modules (Admin + Candidate) sharing one backend, with role-based visibility, a multi-step CV builder, and full job-listing management. This is a demonstration build (no Lovable Cloud yet) — state is held in `AppContext` + `localStorage` so the workflow is fully clickable end-to-end.

## Scope at a glance

### 1. Auth & account types
- Simplify register → email + password only + account type radio:
  - **External** (any email)
  - **Internal CAA staff** (must end in `@caa.co.ug` + employee number; demo cross-check against a seeded staff list `["CAA-1001","CAA-1002","CAA-1003"]`)
- If an internal user later signs in with a non-CAA email → downgraded to external (toast warning, only external listings visible).
- Add a new account type `admin` with a separate route `/admin/login` (seeded demo: `admin@caa.co.ug` / `Admin@2026`).

### 2. Admin module (`/admin/*`, gated)
- `/admin/login` — separate protected entry
- `/admin/dashboard` — KPIs (active listings, applications, expired)
- `/admin/jobs` — table of all jobs with **New listing** modal:
  - Title, department, salary band (UG1–UG7 dropdown), employment type (dropdown), location, visibility (`Internal` / `External`), deadline, min age, required experience (years), required qualification level (dropdown), description
  - Expired listings auto-flagged (red badge) based on deadline
- `/admin/jobs/:id/applications` — list of applicants per job with status controls (Shortlist / Reject)

### 3. Candidate module
- After login, land on `/vacancies` showing only jobs visible to their account type (internal users see internal + external; external users see external only).
- Each card shows title, salary band, deadline, requirements summary.
- **Apply** → if CV not built, route through multi-step CV builder; otherwise show pre-filled review screen with **Edit** before submit.

### 4. CV Builder (`/cv-builder`, 7 steps)
Stepper with compact/dense form spacing:
1. **Personal Info** — name, DOB (age validated against job's min age at submit), gender, nationality, NIN, phone, email, address
2. **Qualifications** — highest level dropdown (O-Level, A-Level, Certificate, Diploma, Degree, Masters, PhD); per-entry: course, institution, year, upload award + full transcript. For O/A-Level: school, index number, subject+grade rows from Ugandan curriculum dropdown, aggregate
3. **Professional Skills** — add/remove free-text chips (e.g. "Certified in Python")
4. **Work Experience** — repeatable: title, organisation, start, end, description, proof upload
5. **References** — minimum 2: name, title, organisation, phone, email
6. **Next of Kin** — name, relationship, phone
7. **Photo** — passport upload (image only, ≤2MB)

CV stored in context + `localStorage` keyed by user email. Second application skips straight to a **Review & Edit** screen.

### 5. UI/UX polish
- Tighten input padding (`py-2 → py-1.5`, `gap-4 → gap-3`) in all forms
- Dropdowns everywhere applicable (employment type, subjects, education level, grades, salary band)
- Validation: age vs job min-age, file type/size on uploads, required fields with inline error text
- Keep existing brand tokens — no new blue, no yellow

## Files to change / add

**New**
- `src/routes/admin/login.tsx`
- `src/routes/admin/dashboard.tsx`
- `src/routes/admin/jobs.tsx`
- `src/routes/admin/jobs.$id.applications.tsx`
- `src/routes/cv-builder.tsx`
- `src/components/admin/AdminShell.tsx`
- `src/components/cv/*` (Step components)
- `src/lib/uganda-curriculum.ts` (subjects + grades)
- `src/lib/staff-records.ts` (demo CAA employee numbers)

**Edit**
- `src/context/AppContext.tsx` — add `accountType`, `cvProfile`, admin job CRUD, applications-per-job, helpers `canSeeJob`, `saveCv`
- `src/routes/register.tsx` — collapse to short form (email + password + account type + employee# if internal)
- `src/routes/login.tsx` — detect admin emails & route accordingly; downgrade internal→external warning
- `src/routes/vacancies.tsx` — filter by `canSeeJob`
- `src/routes/apply.tsx` — replace bespoke flow with CV-builder bridge + review screen
- `src/routes/dashboard.tsx` — show CV completeness + applications
- `src/components/Navbar.tsx` — show "Admin" link only for admin role

## Out of scope (kept as TODO)
- Real Cloud/Supabase backend — everything persists in `localStorage` for the demo
- File virus scanning / OCR transcript validation
- Email notifications (already mocked via toast)

This is a large change set (~15 files) but mostly additive. I'll batch the writes in parallel where safe.
