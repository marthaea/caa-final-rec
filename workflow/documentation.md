# CAA Uganda e-Recruitment Portal — Full Documentation

> **Project type:** Demo / showcase frontend — no backend. All state is held in `AppContext` + `localStorage` and resets when the browser data is cleared.
> **Last updated:** June 2026

---

## Table of Contents

1. [What Has Been Achieved](#1-what-has-been-achieved)
2. [Current Technology Stack](#2-current-technology-stack)
3. [Roadmap — What Is To Be Achieved](#3-roadmap--what-is-to-be-achieved)
4. [Future Technology Stack](#4-future-technology-stack)
5. [Project Overview](#5-project-overview)
6. [User Types & Credentials](#6-user-types--credentials)
7. [Site Architecture & Routes](#7-site-architecture--routes)
8. [Candidate-Facing Features](#8-candidate-facing-features)
9. [HR Console (Admin)](#9-hr-console-admin)
10. [Role-Based Access Control (RBAC)](#10-role-based-access-control-rbac)
11. [State Management & Data Models](#11-state-management--data-models)
12. [PDF Generation](#12-pdf-generation)
13. [UI Design System](#13-ui-design-system)
14. [Job Listings & Categories](#14-job-listings--categories)
15. [Deployment — Netlify](#15-deployment--netlify)
16. [File Structure](#16-file-structure)
17. [Known Limitations (Demo)](#17-known-limitations-demo)
7. [Role-Based Access Control (RBAC)](#7-role-based-access-control-rbac)
8. [State Management & Data Models](#8-state-management--data-models)
9. [PDF Generation](#9-pdf-generation)
10. [UI Design System](#10-ui-design-system)
11. [Job Listings & Categories](#11-job-listings--categories)
12. [Deployment — Netlify](#12-deployment--netlify)
13. [File Structure](#13-file-structure)
14. [Known Limitations (Demo)](#14-known-limitations-demo)

---

## 1. What Has Been Achieved

The following features are fully implemented and working in the current demo build.

### Authentication & User Management
- Candidate registration with account type selection (External / Internal CAA Staff)
- Internal registration validates `@caa.co.ug` email domain and a seeded employee number
- Three admin personas with pre-filled credential buttons on the HR login screen
- Role-based session persistence via `localStorage`

### Public / Candidate Side
- **Homepage** — hero image slideshow, live-filtered search bar, stats counter, featured vacancies grid
- **Vacancies page** — dynamic department tabs computed from live job data, skeleton loading, internal-access badge for CAA staff
- **Job detail page** — full rich-text layout per vacancy (description, responsibilities, requirements, benefits, quick-facts sidebar, sticky apply CTA)
- **8-step application form** — personal info, qualifications (Uganda curriculum O/A-Level dropdowns), skills, work experience, referees, next of kin, photo upload, review & submit
- **CV auto-fill** — regex extraction from `.txt` / `.doc` upload (email, phone, NIN, DOB)
- **Candidate dashboard** — application tracker table, status badges, progress bars, HR notifications panel with unread count, withdraw confirmation modal, edit-profile modal
- **PDF download for candidates** — UCAA-letterheaded application summary generated client-side

### HR Console (Admin)
- Role-based sidebar: Super Admin sees all 11 tabs; HR Director sees 7; Recruiter sees 3
- **Dashboard tab** — 4 KPI cards + 3 recharts visualisations (Pie, Bar, Line); print via `window.open()`
- **Jobs tab** — full CRUD for job listings; expired-listing detection; "view applications" shortcut
- **Applications tab** — status filter chips; full candidate dossier modal; auto-qualification engine (age, qualification rank, experience years, CGPA, keyword matching); shortlist / interview / offer / decline actions
- **Interns tab** — CGPA-ranked list with colour coding; PDF export
- **Staff tab** — 10 seeded CAA employee records; PDF export
- **Reports tab** — 6 UCAA-letterheaded PDF reports (vacancies, applications, departmental summary, shortlisted dossiers, interns ranking, staff register)
- **Criteria tab** — per-job min CGPA threshold + required keyword configuration
- **Audit Log tab** (Super Admin only) — chronological log of every HR action; PDF export
- **Settings tab** (Super Admin only) — min age, external/internal visibility toggle, org name, session timeout
- **Permissions tab** (Super Admin only) — 9 toggleable permission overrides per HR user

### PDF Generation
- Single client-side PDF library (`jsPDF` + `jspdf-autotable`) for all 9 document types
- Consistent UCAA letterhead: CAA logo, navy/gold header, "Our Ref: UCAA/HR/PORTAL", per-page footer with page numbers

### UI & Design System
- Tailwind CSS v4 design tokens (navy, gold, surface, status colours)
- Two-tier sticky navbar with mobile drawer, language toggle (EN/SW/LG), Cmd+K command palette
- UCAA-brand footer matching caa.co.ug structure
- Syne + DM Sans type scale; custom utility classes (hero slideshow, card hover, skeleton loader, fade-up animation)

---

## 2. Current Technology Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (SSR React, Nitro server) |
| Router | TanStack Router v1 (`createFileRoute`, `validateSearch`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Charts | recharts (`PieChart`, `BarChart`, `LineChart`) |
| PDF generation | jsPDF + jspdf-autotable |
| State | React Context + `localStorage` |
| Icons | lucide-react |
| Forms | react-hook-form (register page), plain controlled state elsewhere |
| Build tool | Vite 7 via `@lovable.dev/vite-tanstack-config` |
| Deployment target | Netlify (Nitro preset) |
| Node version | 22.x (`engines: { node: ">=22.12.0" }`) |

---

## 3. Roadmap — What Is To Be Achieved

The items below are planned for the next phase of development, moving the portal from a demo to a production-ready system.

### Priority 1 — Backend & Real Data Persistence
- Replace `localStorage` with a real database (PostgreSQL via Supabase or a self-hosted instance)
- REST or tRPC API layer for all CRUD operations (jobs, applications, users)
- Server-side session management with JWT or cookie-based auth (httpOnly cookies)
- Password hashing with bcrypt / argon2 on registration

### Priority 2 — Real Authentication
- Email/password auth with proper sign-up flow (verification email on register)
- OAuth integration (Google Workspace SSO for `@caa.co.ug` internal staff — eliminates employee number workaround)
- Password reset via email
- Role seeding in the database rather than hardcoded credentials

### Priority 3 — File Handling
- Secure file upload to cloud storage (Supabase Storage or AWS S3)
- Virus scanning on upload (ClamAV or cloud antivirus API)
- DOCX/PDF CV parsing for auto-fill (AWS Textract, Azure Document Intelligence, or `pdf-parse` + `mammoth`)
- Image resizing/compression for passport photos

### Priority 4 — Notifications & Communication
- Real email delivery via SendGrid or Resend (transactional emails for application received, shortlisted, interview invite)
- SMS notifications via Africa's Talking Uganda gateway
- In-app notification bell upgraded to real-time updates (Supabase Realtime or WebSockets)

### Priority 5 — Candidate Experience
- Saved job listings synced to the database (currently `localStorage` only)
- Application editing after submission (before a configurable deadline)
- Cover letter / additional document upload per application
- Candidate profile page with full CV viewer and edit-in-place
- Interview scheduling — calendar widget + Google Calendar / Outlook integration

### Priority 6 — Admin & Compliance
- Multi-level approval workflow (Recruiter shortlists → HR Director approves → Super Admin confirms offer)
- Configurable scoring rubrics replacing the current auto-qualify keyword match
- GDPR / PDPA data retention policies: automatic anonymisation of rejected applications after N days
- MFA (TOTP or SMS OTP) for admin accounts
- Audit log shipped to a tamper-evident external store (e.g., AWS CloudTrail-style append-only log)

### Priority 7 — Performance & Quality
- Unit + integration tests (Vitest + React Testing Library)
- End-to-end tests (Playwright — happy paths for each of the 5 user roles)
- Accessibility audit and WCAG 2.1 AA compliance pass
- Internationalisation (i18n) — full Luganda and Swahili translations (currently UI toggle exists but strings are not translated)
- Lighthouse CI gate on every PR (target: Performance ≥ 90, Accessibility ≥ 95)

---

## 4. Future Technology Stack

Technologies planned for adoption as the portal moves to production.

| Area | Planned Technology | Why |
|---|---|---|
| Database | PostgreSQL (via Supabase) | Relational schema fits jobs/applications/users; Supabase provides auth + storage + realtime in one platform |
| Auth | Supabase Auth + Google OAuth (Workspace) | Eliminates employee-number workaround; SSO for CAA domain |
| File storage | Supabase Storage (S3-compatible) | Co-located with DB; signed URLs for private CV access |
| CV parsing | AWS Textract or `pdf-parse` + `mammoth` | Accurate text extraction from PDF and DOCX uploads |
| Email | Resend or SendGrid | Transactional email with Uganda-locale templates |
| SMS | Africa's Talking | Low-latency SMS delivery in Uganda; supports MTN & Airtel |
| Real-time | Supabase Realtime (Postgres changes) | Live notification bell without polling |
| API layer | tRPC (end-to-end type safety) | Keeps TypeScript types across client/server without code-gen step |
| Testing | Vitest + Playwright | Fast unit tests; cross-browser E2E for all 5 user roles |
| i18n | `react-i18next` + Crowdin | Crowdin handles translator workflow for LG/SW strings |
| CI/CD | GitHub Actions + Netlify | PR preview deployments; Lighthouse CI gate |
| Monitoring | Sentry (errors) + PostHog (analytics) | Track application funnel drop-off and HR action errors |
| Compliance | Supabase Row-Level Security | Fine-grained DB policies mirror the existing RBAC permission matrix |

---

## 5. Project Overview

The **CAA Uganda e-Recruitment Portal** is a fully interactive demo of a government e-recruitment system for Uganda Civil Aviation Authority (UCAA). It simulates the complete recruitment lifecycle:

- Public browsing of job vacancies with rich detail pages
- Candidate registration, multi-step CV building, and application submission
- CV auto-fill when a document is uploaded
- Admin HR Console with dashboards, charts, shortlisting, candidate dossiers, and PDF exports
- Role-based access so different HR staff see different sections
- In-app notifications from HR to candidates
- Printable application summary PDFs for candidates

Everything runs entirely in the browser — no server calls are made beyond the initial page load.

---

## 6. User Types & Credentials

The portal supports five distinct user types. Login behaviour is determined at sign-in time and persists in `localStorage`.

### 6.1 External Candidate

- **Email:** any email that does NOT end in `@caa.co.ug`
- **Password:** any password (no validation for demo)
- **Access:** public job listings (external visibility only), application form, candidate dashboard
- **Cannot see:** internal-only job listings

### 6.2 Internal Candidate (CAA Staff)

- **Email:** any `*@caa.co.ug` address
- **Password:** any password
- **Access:** all job listings including internal-only ones, application form, candidate dashboard
- **Identity verified by:** email domain check (`isCAAEmail()` helper)

### 6.3 Super Admin — Alex Mukasa

| Field | Value |
|---|---|
| Email | `admin@caa.co.ug` |
| Password | `Admin@2026` |
| Role | `super` |
| Full name | Alex Mukasa |
| Access | Full access to all HR Console tabs including Audit Log, Settings, and Permissions |

### 6.4 HR Director — Jane Mirembe

| Field | Value |
|---|---|
| Email | `hr.director@caa.co.ug` |
| Password | `HrDir@2026` |
| Role | `hr` |
| Full name | Jane Mirembe |
| Access | Dashboard, Jobs, Applications, Interns, Staff, Reports, Criteria — **cannot** see Audit Log, Settings, or grant permissions |

### 6.5 Recruiter — David Ssempala

| Field | Value |
|---|---|
| Email | `recruit@caa.co.ug` |
| Password | `Recruit@2026` |
| Role | `recruiter` |
| Full name | David Ssempala |
| Access | Applications review and Criteria setup only — **cannot** manage jobs, export, or view staff |

> **Login flow:** Navigating to `/admin` shows the HR login form. Three demo-account buttons pre-fill the credentials for each admin. After login, the sidebar shows only the tabs the user's role can access.

---

## 7. Site Architecture & Routes

All routes are file-based under `src/routes/`. TanStack Router auto-generates `src/routeTree.gen.ts` at build time.

| Route | File | Description |
|---|---|---|
| `/` | `index.tsx` | Homepage — hero slideshow, search bar, stats, featured vacancies |
| `/vacancies` | `vacancies.tsx` | Full job listing with dynamic department tabs |
| `/job` | `job.tsx` | Job detail page (`?jobId=N`) — rich description, requirements, apply CTA |
| `/login` | `login.tsx` | Candidate sign-in form |
| `/register` | `register.tsx` | Candidate registration (external or internal) |
| `/apply` | `apply.tsx` | Multi-step application form (`?jobId=N`) |
| `/dashboard` | `dashboard.tsx` | Candidate dashboard — applications, notifications, PDF download |
| `/admin` | `admin.tsx` | HR Console — all admin tabs behind a single route with `?tab=...` |

### Admin tab routing

The HR Console is a single route `/admin` that uses the search parameter `tab` to switch between sections:

```
/admin?tab=login
/admin?tab=dashboard
/admin?tab=jobs
/admin?tab=apps
/admin?tab=interns
/admin?tab=staff
/admin?tab=reports
/admin?tab=audit
/admin?tab=settings
/admin?tab=criteria
/admin?tab=permissions
```

---

## 8. Candidate-Facing Features

### 8.1 Homepage (`/`)

- **Hero slideshow** — 5 rotating background images (2-second interval): office interior, two airplane photos (Uganda Airlines style and blue/white jet), CAA offices, close-up jet
- **Floating search bar** — filter by keyword, department, and location; results filter the featured jobs below in real time
- **Stats bar** — dynamically computed: Open Positions, Departments Hiring (both calculated from the live jobs array), plus static 380+ Staff Employed, 2,100+ Applications This Year
- **Featured Vacancies grid** — first 4 results from the filtered jobs; each card links to the job detail page
- **"See Open Roles" anchor** — second hero button smooth-scrolls to the vacancies grid
- **No sign-in/register buttons** in the hero — auth is only prompted when the user tries to apply

### 8.2 Vacancies Page (`/vacancies`)

- **Dynamic department tabs** — tabs and their counts are computed from actual job data at runtime; tabs with zero matching jobs are hidden automatically; shows an "Operations" tab for internal users
- **Skeleton loading** — 380ms simulated loading animation when switching tabs
- **Internal access badge** — shown in the header when signed in as internal staff

### 8.3 Job Detail Page (`/job?jobId=N`)

A full-page layout for each vacancy. Content is entirely rendered from the `DETAILS` record in `job.tsx` with rich placeholder data for all 14 jobs.

**Sections:**
- Hero strip — job title, department/type/visibility/featured badges, location, salary, closing date
- **About the Role** — 2–3 paragraph description
- **Key Responsibilities** — 6 bullet points with ✓ icons
- **Minimum Requirements** — 6 bullet points with › icons
- **What We Offer** — 6 bullet points with ✓ icons (gold)
- **How to Apply** — instructions + "Start Your Application" CTA button

**Sidebar:**
- Quick Facts card — employment type, location, salary band, qualification, experience, min age, closing date
- Sticky Apply CTA card — "Apply Now" + "Save for later" buttons
- Equal Opportunity notice

**Behaviour:**
- Whole `JobCard` on other pages is clickable → navigates to this detail page
- "Apply Now" triggers the sign-in prompt modal if the candidate is not logged in; otherwise goes straight to `/apply?jobId=N`
- Closed vacancies (past `closesAt` date) show "Applications have closed" instead of the apply button
- Bookmark/save button uses `localStorage` keyed by `caa_saved_jobs_v1`

### 8.4 Registration (`/register`)

- Account type radio — External or Internal CAA Staff
- Internal requires a `@caa.co.ug` email and a valid employee number (demo numbers: `CAA-1001`, `CAA-1002`, `CAA-1003`)
- Password strength checker — length ≥ 8, uppercase, number, symbol, confirmation match

### 8.5 Multi-Step Application Form (`/apply?jobId=N`)

8-step form with a progress stepper component at the top.

| Step | Name | Key fields |
|---|---|---|
| 0 | Personal | First/other/last name, DOB (age-validated against job's `minAge`), gender, nationality, NIN (`[A-Z]{2}\d{7}[A-Z]`), phone, address |
| 1 | Qualifications | O-Level, A-Level, Certificate, Diploma, Degree, Masters, PhD entries; Uganda curriculum subject/grade dropdowns for O and A-Level |
| 2 | Skills | Free-text chip add/remove |
| 3 | Experience | Repeatable: job title, organisation, start, end, description |
| 4 | Referees | Minimum 2: name, title, organisation, phone, email |
| 5 | Next of Kin | Name, relationship, phone |
| 6 | Photo | Passport-style photo upload |
| 7 | Review | Read-only summary before final submit |

**CV auto-fill:** On Step 0, a "Quick-fill from existing CV" banner lets the candidate upload a `.txt` or `.doc` file. `FileReader.readAsText()` extracts:
- Email address (regex)
- Uganda phone number (`+256` or `0` prefix patterns)
- NIN (`[A-Z]{2}\d{7}[A-Z]` pattern)
- Date of birth (`DD/MM/YYYY` pattern)

If already has a saved CV, the form opens at the Review step for editing.

**Submission:** Creates an application record, saves the CV to `cvStore` (keyed by email for admin lookup), triggers a toast, and shows the Success Modal with a reference number (`REF-2026-XXXXX`).

### 8.6 Candidate Dashboard (`/dashboard`)

Visible only when logged in; redirects to `/login` if not.

**Left column:**
- **HR Notifications panel** — shows messages sent by admin (shortlisted, interview, declined, offered, info) with emoji icons; unread count badge; "Mark read" per notification
- **Email notice card** — reminds candidate that status updates go to their registered email
- **Stats row** — Applications Submitted, Shortlisted count, Offers Received
- **My Applications table** — per application: role icon, title, dept, submission date, completion progress bar, status badge, Edit / **PDF** / Withdraw buttons

**Right column:**
- **Profile Completion** — progress bar (72% demo) + 7-item checklist
- **Notifications widget** — static shortlist and application-received cards
- **Application Timeline** — step indicators (Submitted → Under Review → Shortlisted → Interview)

**Withdraw confirmation modal** — two-button modal before removing an application.

**Edit Profile modal** — inline form to update first name, last name, email.

**Candidate PDF download (feature #3):** The "PDF" button on each application row calls `downloadApplicationSummary()` from `src/lib/admin-pdf.ts`. It generates a UCAA-letterheaded PDF containing:
- Candidate details
- Application details (reference number, role, department, salary band, status, submission date, vacancy closing date)
- "What happens next?" information box (4 steps)
- Authenticity statement ("No recruitment fees at any stage")
- UCAA header, footer with page numbers

---

## 9. HR Console (Admin)

Accessed at `/admin`. Entry requires one of the three admin credentials. On successful login, the sidebar and available tabs are filtered by the user's role.

### 9.1 Sidebar & Navigation

- CAA logo + "HR Console" label
- Role badge (Super Admin / HR Director / Recruiter) next to user name
- Nav items rendered only for permissions the user's role allows
- Sign-out button at the bottom

### 9.2 Dashboard Tab

Three recharts visualisations, each in its own card:

| Chart | Type | Data shown |
|---|---|---|
| Application Status Distribution | PieChart | Count of applications per status (Pending, Under Review, Shortlisted, etc.) |
| Applications by Department | BarChart | Applications per department |
| Monthly Application Trend | LineChart | Applications per month (Jan–Jun 2026) |

- **Print button** — opens a new browser window and writes the chart SVGs as HTML for printing (`window.open()` + `document.write()`)
- **KPI cards** — Active Listings, Total Applications, Shortlisted count, Expired Listings

### 9.3 Jobs Tab

- Table of all job listings with expired-listing flagging (red "Expired" badge when `closesAt < today`)
- **New listing modal** — full form: title, dept, salary band (UG1–UG7), type, location, visibility, deadline, min age, required experience, required qualification
- **Edit** and **Delete** per row
- "View applications" button → switches to Apps tab filtered to that job

### 9.4 Applications Tab

- Status filter chips — All, Pending, Under Review, Shortlisted, Interview, Offered, Hired, Declined
- Clickable application rows → opens `AppDetailModal`

**AppDetailModal** — sliding panel with two sections:
1. **CV / Profile** — displays the candidate's full CV from `cvStore` if available (personal details, qualifications, experience, skills, referees)
2. **Auto-qualification check** — `autoQualify()` function compares:
   - Age from CV DOB vs job's `minAge`
   - Qualification level rank vs job's `requiredQualification` (using `QUAL_ORDER` rank map)
   - Total years of experience from CV experience entries vs job's `requiredExperience`
   - CGPA vs criteria's `minCgpa` (if set)
   - Keyword presence: searches `JSON.stringify(cv)` for each required keyword in the job's criteria
   - Shows a green "Qualifies" or red "Does not meet criteria" verdict

**Action buttons** (visible if `canShortlist` permission):
- Shortlist / Interview / Offer / Decline
- Editable notification message text area
- On action: updates application status, sends an in-app `Notification` to the candidate's email, adds an Audit Log entry

### 9.5 Interns Tab

- Shows applications that have a CGPA field, sorted highest CGPA first
- CGPA colour coding: ≥ 4.5 gold, ≥ 3.5 blue, ≥ 2.5 grey, < 2.5 red
- University column
- Export to PDF button

### 9.6 Staff Tab

- Table of 10 seeded internal CAA staff records (employee number, name, department, position, email, join date, status)
- Export to PDF button

### 9.7 Reports Tab

Five PDF export buttons (each generates a UCAA-letterheaded document):

| Report | Description |
|---|---|
| Vacancies Report | All job listings with band, visibility, deadlines |
| Applications Report | All applications with status summary table + full list |
| Departmental Summary | Per-department: listings count, applications, shortlisted, hired |
| Shortlisted Dossiers | Bulk PDF — cover sheet + one full dossier page per shortlisted candidate |
| Interns (CGPA Ranking) | All intern applications ranked by CGPA |
| Staff Register | All internal staff records |

### 9.8 Criteria Tab

Per-job screening criteria setup:
- Select job from dropdown
- Set minimum CGPA threshold
- Add/remove required keywords (used by the auto-qualification check)
- Notes field
- Saved to `localStorage` keyed by job ID

### 9.9 Audit Log Tab

(Super Admin only)

- Chronological table of every HR action: timestamp, actor name, role, action description, target
- Actions logged: login, job create/update/delete, status change, criteria save, permission save, settings save
- Export to PDF button

### 9.10 Settings Tab

(Super Admin only)

Four configurable fields:
- Minimum age threshold (portal-wide default)
- Allow external users to see internal job listings (toggle)
- Organisation name
- Session timeout in minutes

### 9.11 Permissions Tab

(Super Admin only)

Per-user permission override management. For each of the three HR users, a toggle grid shows 9 permissions:

| Permission key | What it controls |
|---|---|
| `canViewAudit` | See the Audit Log tab |
| `canManageJobs` | Create / edit / delete job listings |
| `canExport` | Download PDF reports |
| `canViewStaff` | See the Staff tab |
| `canManageSettings` | Change portal settings |
| `canGrantPermissions` | See and use the Permissions tab |
| `canManageCriteria` | Set screening criteria |
| `canShortlist` | Shortlist / interview / offer / decline candidates |
| `canViewApplications` | See the Applications tab |

Overrides are stored in `localStorage` and take precedence over role defaults.

---

## 10. Role-Based Access Control (RBAC)

### 10.1 Default permission matrix

| Permission | Super Admin | HR Director | Recruiter |
|---|---|---|---|
| View Audit Log | ✅ | ❌ | ❌ |
| Manage Jobs | ✅ | ✅ | ❌ |
| Export PDFs | ✅ | ✅ | ❌ |
| View Staff | ✅ | ✅ | ❌ |
| Manage Settings | ✅ | ❌ | ❌ |
| Grant Permissions | ✅ | ❌ | ❌ |
| Manage Criteria | ✅ | ✅ | ✅ |
| Shortlist Candidates | ✅ | ✅ | ✅ |
| View Applications | ✅ | ✅ | ✅ |

### 10.2 Helper function

```typescript
// src/context/AppContext.tsx
export function canAccess(
  role: AdminRole | undefined,
  perm: keyof PermissionOverride,
  overrides?: PermissionOverride[]
): boolean
```

Checks `overrides` first (Super Admin's custom overrides per user), then falls back to `ROLE_DEFAULTS`. Used throughout `admin.tsx` to show/hide nav items and action buttons.

---

## 11. State Management & Data Models

All state lives in `src/context/AppContext.tsx` and is provided via React Context to the entire app.

### 11.1 localStorage keys

| Key | Content |
|---|---|
| `caa_auth_v1` | Signed-in user (name, email, accountType, adminRole) |
| `caa_cv_v1` | Candidate's CV profile (`CvProfile`) |
| `caa_applications_v1` | Array of `Application` objects |
| `caa_jobs_v1` | Array of `Job` objects (seeded from `JOBS` constant if empty) |
| `caa_audit_v1` | Array of `AuditEntry` objects |
| `caa_settings_v1` | `AdminSettings` object |
| `caa_cv_store_v1` | Record of CVs keyed by candidate email (for admin lookup) |
| `caa_notifications_v1` | Array of `Notification` objects |
| `caa_criteria_v1` | Array of `JobCriteria` objects |
| `caa_perms_v1` | Array of `PermissionOverride` objects |
| `caa_saved_jobs_v1` | Array of saved job IDs (managed in `JobCard`) |
| `caa_lang` | Language preference (EN / SW / LG) |

### 11.2 Core type definitions

```typescript
type Visibility = "external" | "internal";
type QualLevel = "O-Level" | "A-Level" | "Certificate" | "Diploma" | "Degree" | "Masters" | "PhD";
type ApplicationStatus = "Pending" | "Under Review" | "Shortlisted" | "Interview" | "Offered" | "Hired" | "Declined";
type AdminRole = "super" | "hr" | "recruiter";
type AccountType = "external" | "internal" | "admin";

type Job = {
  id: number; abbr: string; title: string; dept: string; deptKey: string;
  location: string; salary: string; salaryBand: string;
  type: "Full-time" | "Contract";
  closes: string; closesAt: string; visibility: Visibility;
  minAge: number; requiredExperience: number; requiredQualification: QualLevel;
  description?: string; featured?: boolean;
};

type Application = {
  id: number; abbr: string; title: string; dept: string; date: string;
  status: ApplicationStatus; completion: number;
  jobId?: number; candidateEmail?: string; candidateName?: string;
  cgpa?: number; university?: string;
};

type CvProfile = {
  personal: { firstName; otherName; lastName; dob; gender; nationality; nin; phone; email; address; };
  highestLevel: QualLevel;
  qualifications: CvQualification[];
  skills: string[];
  experience: CvExperience[];
  referees: CvReferee[];
  nextOfKin: { name; relationship; phone; };
  photoUrl?: string;
};

type Notification = {
  id: number; recipientEmail: string; title: string; message: string;
  read: boolean; at: string;
  type: "shortlisted" | "declined" | "interview" | "offered" | "info";
};

type JobCriteria = { jobId: number; minCgpa?: number; requiredKeywords: string[]; notes?: string; };

type PermissionOverride = {
  email: string; role: AdminRole;
  canViewAudit: boolean; canManageJobs: boolean; canExport: boolean;
  canViewStaff: boolean; canManageSettings: boolean; canGrantPermissions: boolean;
  canManageCriteria: boolean; canShortlist: boolean; canViewApplications: boolean;
};
```

---

## 12. PDF Generation

All PDF documents are generated client-side by `src/lib/admin-pdf.ts` using jsPDF and jspdf-autotable.

### 12.1 UCAA Letterhead standard

Every PDF uses the same `header()` and `footer()` functions to match the official UCAA letter format:

**Header:**
- White background
- CAA logo image (base64 from `src/lib/caa-logo-base64.ts`) — top-left, 22×22mm
- "UGANDA CIVIL AVIATION AUTHORITY" in navy bold at 16pt — right of logo
- Address and contact details in grey at 8pt
- Navy separator line (0.8pt) + gold accent stripe below it
- "Our Ref: UCAA/HR/PORTAL" left, today's date right, at 8pt
- Document title in navy bold at 13pt, underlined

**Footer (every page):**
- Navy rule at y=283
- "Uganda Civil Aviation Authority — Confidential HR Document. Not for external distribution."
- "Generated by [actor name]" left, "Page N of M" right

### 12.2 Exported documents

| Function | Filename | Who uses it |
|---|---|---|
| `downloadJobsReport` | `caa-vacancies-{ts}.pdf` | Admin — Reports tab |
| `downloadApplicationsReport` | `caa-applications-{ts}.pdf` | Admin — Reports tab |
| `downloadDepartmentSummary` | `caa-dept-summary-{ts}.pdf` | Admin — Reports tab |
| `downloadAuditLog` | `caa-audit-{ts}.pdf` | Admin — Audit Log tab |
| `downloadCandidateCv` | `caa-candidate-{name}.pdf` | Admin — Application detail modal |
| `downloadInternsReport` | `caa-interns-cgpa-{ts}.pdf` | Admin — Interns tab |
| `downloadStaffReport` | `caa-staff-register-{ts}.pdf` | Admin — Staff tab |
| `downloadShortlistedDossiers` | `caa-shortlist-dossiers-{ts}.pdf` | Admin — Reports tab |
| `downloadApplicationSummary` | `caa-application-UCAA-REC-{id}-{year}.pdf` | Candidate — Dashboard PDF button |

### 12.3 Candidate application summary PDF (feature added June 2026)

`downloadApplicationSummary(app, candidateName, candidateEmail, job?)` produces a single-page document containing:

1. **Candidate Details** table — name, email, account type
2. **Application Details** table — reference number (`UCAA/REC/00001/2026`), role, department, location, salary band, employment type, status, completion %, submission date, vacancy closing date
3. **"What happens next?" box** — 4 numbered steps in a shaded rounded rectangle
4. **Authenticity statement** — two lines in italic confirming no recruitment fees and the document is auto-generated proof of submission

---

## 13. UI Design System

### 13.1 Fonts

- **Body / headings:** DM Sans (300, 400, 500, 600, 700) — loaded from Google Fonts
- **Display accent class** (`.font-display`): Syne (600, 700, 800) — available via CSS class but no longer applied to headings by default; headings use DM Sans
- `h1–h6` elements inherit the body font (DM Sans) — the CSS rule only applies Syne when `.font-display` class is explicitly used

### 13.2 Colour tokens (CSS custom properties)

| Token | Use |
|---|---|
| `--caa-navy` / `caa-navy` | Primary navy (`#0B2E5F`) — buttons, headings, active states |
| `--caa-navy-2` / `caa-navy-2` | Lighter navy — hover, secondary |
| `--caa-gold` / `caa-gold` | Gold accent — highlights, badges |
| `--caa-gold-2` / `caa-gold-2` | Lighter gold — hover on white buttons |
| `--caa-surface` | Off-white page background |
| `--caa-border` | Card and input borders |
| `--caa-body` | Main text colour |
| `--caa-muted` | Secondary text |
| `--caa-light` | Placeholder / icon colour |
| `--caa-success` | Green — shortlisted, hired |
| `--caa-warning` | Amber — pending, contract type |
| `--caa-danger` | Red — declined, expired |

### 13.3 Key utility classes

| Class | Effect |
|---|---|
| `caa-hero-bg` | Navy gradient background for page hero strips |
| `caa-hero-photo` | Hero with background photo slideshow support |
| `caa-hero-slide` | Individual slide (absolute, opacity transition) |
| `caa-hero-slide.is-active` | Fades slide in |
| `caa-card` | White card with border and rounded corners |
| `caa-card-hover` | Adds border colour change on hover |
| `caa-lift` | Adds translateY shadow on hover |
| `caa-skeleton` | Animated grey skeleton loading bar |
| `caa-fade-up` | Fade + slide-up entrance animation |
| `caa-delay-1/2/3` | Animation delay classes |

### 13.4 Header / Navbar

- Two-tier: black top bar (site name + social links) + white main nav
- Sticky (`top-0 z-40`)
- Social links: X (Twitter), Facebook, LinkedIn, Instagram, YouTube — all pointing to real UCAA social handles
- Language toggle (EN / SW / LG) — stores preference in `localStorage`, shows toast
- Cmd+K opens the Command Palette (`CommandPalette` component)
- Responsive mobile drawer with same nav links
- **When logged in:** shows avatar initials + first name + "Sign Out"
- **When logged out:** shows "Sign In" + "Register" buttons

### 13.5 Footer

Matches the official [caa.co.ug](https://caa.co.ug) footer structure:
- Photo strip (3 images)
- 4-column link grid: Important Links, CAA Uganda, Services, Contact
- Bottom bar: disclaimer links + social icons + © CAA Uganda

---

## 14. Job Listings & Categories

### 14.1 All jobs (14 total)

| ID | Abbr | Title | Dept | Visibility | Band | Closes |
|---|---|---|---|---|---|---|
| 1 | ATC | Senior Air Traffic Controller | Air Traffic Mgmt | External | UG4 | Jun 15, 2026 |
| 2 | ASI | Principal Safety Inspector (Airworthiness) | Aviation Safety | External | UG3 | Jun 20, 2026 |
| 3 | SYS | Systems Administrator | ICT & Systems | External | UG5 | Jul 1, 2026 |
| 4 | FIN | Finance Officer (Revenue Assurance) | Finance & Admin | External | UG5 | Jun 30, 2026 |
| 5 | LEG | Legal Counsel (Aviation Regulations) | Legal | External | UG4 | Jul 10, 2026 |
| 6 | ATT | ATC Trainee (Graduate Entry) | Air Traffic Mgmt | External | UG7 | Jul 15, 2026 |
| 7 | INT | Manager, Aerodrome Operations | Operations | **Internal** | UG2 | Jun 25, 2026 |
| 8 | ACO | Approach Control Officer | Air Traffic Mgmt | External | UG4 | Jul 20, 2026 |
| 9 | FOI | Flight Operations Inspector | Aviation Safety | External | UG4 | Jul 5, 2026 |
| 10 | DGI | Dangerous Goods Inspector | Aviation Safety | External | UG5 | Jul 8, 2026 |
| 11 | ASec | Aviation Security Inspector | Aviation Safety | External | UG5 | Jul 12, 2026 |
| 12 | PRO | Procurement Officer | Finance & Admin | External | UG6 | Jul 3, 2026 |
| 13 | NET | Network Engineer | ICT & Systems | External | UG5 | Jul 18, 2026 |
| 14 | AIS | Principal, Aeronautical Information Services | Operations | **Internal** | UG3 | Jul 22, 2026 |

### 14.2 External-visible category counts

| Category | Count |
|---|---|
| Air Traffic Mgmt | 3 (IDs 1, 6, 8) |
| Aviation Safety | 4 (IDs 2, 9, 10, 11) |
| Finance & Admin | 2 (IDs 4, 12) |
| ICT & Systems | 2 (IDs 3, 13) |
| Legal | 1 (ID 5) |
| **Total external** | **12** |

Internal users additionally see the 2 Operations listings (IDs 7 and 14).

### 14.3 Salary band reference

| Band | Monthly Range |
|---|---|
| UG2 | UGX 5.5M – 7.0M |
| UG3 | UGX 3.8M – 6.0M |
| UG4 | UGX 3.2M – 5.8M |
| UG5 | UGX 2.4M – 3.9M |
| UG6 | UGX 2.4M – 3.2M |
| UG7 | UGX 1.8M – 2.4M |

---

## 15. Deployment — Netlify

### 15.1 Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
  NITRO_PRESET = "netlify"
```

### 15.2 How it works

1. Netlify runs `npm run build` → Vite + Nitro compile both client and SSR bundles
2. Static assets output to `dist/` (the publish directory)
3. Server-side functions output to `.netlify/functions-internal/` (auto-detected by Netlify, not committed to git)
4. All routing is handled by the Nitro server function — no `_redirects` file needed

### 15.3 To connect a new Netlify site

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**
2. Select **GitHub** → authorise → choose `marthaea/caa-final-rec`
3. Confirm build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy site**
5. Subsequent pushes to `main` branch trigger automatic re-deploys

### 15.4 GitHub repository

- **URL:** `https://github.com/marthaea/caa-final-rec`
- **Branch:** `main`
- **Local path:** `C:\Users\user\Desktop\aviation-careers-hub-main`

---

## 16. File Structure

```
aviation-careers-hub-main/
├── workflow/
│   ├── documentation.md      ← this file
│   ├── flowchart.md          ← Mermaid workflow diagrams for all 5 user roles
│   ├── plan.md               ← original implementation plan
│   └── project.json
├── netlify.toml
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── favicon.png
└── src/
    ├── styles.css            ← Tailwind v4 config, design tokens, utility classes
    ├── router.tsx
    ├── start.ts
    ├── server.ts
    ├── routeTree.gen.ts      ← auto-generated by TanStack Router at build time
    ├── assets/
    │   ├── caa-logo.png
    │   ├── hero-office.jpg
    │   ├── hero-caa-offices.jpg
    │   ├── hero-jet.jpg
    │   ├── hero-plane-crane.jpg   ← replace with actual photo when available
    │   └── hero-plane-blue.jpg    ← replace with actual photo when available
    ├── context/
    │   └── AppContext.tsx     ← all state, types, RBAC helpers, seeded data
    ├── lib/
    │   ├── admin-pdf.ts       ← all jsPDF export functions
    │   ├── caa-logo-base64.ts ← logo as base64 string for PDF embedding
    │   ├── uganda-curriculum.ts ← O/A-Level subjects and grade lists
    │   └── utils.ts
    ├── components/
    │   ├── AppShell.tsx       ← wraps Navbar + Outlet + Footer + modals
    │   ├── Navbar.tsx         ← sticky two-tier navigation
    │   ├── Footer.tsx         ← 4-column footer matching caa.co.ug
    │   ├── JobCard.tsx        ← vacancy card used on homepage and vacancies page
    │   ├── Stepper.tsx        ← step indicator for application form
    │   ├── ToastContainer.tsx ← top-right toast notifications
    │   ├── SignInPromptModal.tsx ← prompted when unauthenticated user clicks Apply
    │   ├── SuccessModal.tsx   ← shown after application submission
    │   ├── CommandPalette.tsx ← Cmd+K quick search
    │   └── UploadZone.tsx     ← drag-and-drop file upload component
    └── routes/
        ├── __root.tsx         ← HTML shell, font links, QueryClient provider
        ├── index.tsx          ← Homepage
        ├── vacancies.tsx      ← Job listings
        ├── job.tsx            ← Job detail page
        ├── login.tsx          ← Candidate sign-in
        ├── register.tsx       ← Candidate registration
        ├── apply.tsx          ← Multi-step application form
        ├── dashboard.tsx      ← Candidate dashboard
        └── admin.tsx          ← Full HR Console (all tabs)
```

---

## 17. Known Limitations (Demo)

| Limitation | Details |
|---|---|
| No real authentication | Passwords are not hashed. Any password works for external/internal login. |
| No persistent backend | All data resets when `localStorage` is cleared. |
| No real email sending | Notifications appear in-app only; no actual emails are dispatched. |
| No real file storage | Uploaded files (CV, photos) are held as base64 in memory/localStorage only. |
| CV auto-fill is basic | Regex extraction from plain-text CVs only; does not parse DOCX or PDF binary content. |
| Candidate matching score | "X% match" on job cards is a deterministic pseudo-random value based on job ID, not a real skill-matching calculation. |
| Session persistence | Auth state persists across browser refreshes via `localStorage` but has no expiry enforcement beyond the settings timeout field. |
| Internal staff list | Only 3 employee numbers are seeded (`CAA-1001`, `CAA-1002`, `CAA-1003`). |
| Charts are not printable cross-browser | The `window.open()` + `document.write()` print method works in Chromium browsers; some browsers may block the popup. |
