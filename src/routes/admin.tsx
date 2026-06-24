import { useState, useMemo, useRef } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line, CartesianGrid,
} from "recharts";
import {
  Plus, Trash2, Pencil, ShieldCheck, AlertCircle, Users, Briefcase, Archive,
  LayoutDashboard, FileText, GraduationCap, Download, ClipboardList, Settings,
  ChevronRight, FileDown, RefreshCw, CheckCircle2, XCircle, Bell, Eye,
  Printer, Lock, Filter, TrendingUp, Upload, FileSearch,
} from "lucide-react";
import {
  useApp, CAA_STAFF, HR_USERS, canAccess,
  APPLICATION_STATUSES,
  type Job, type Visibility, type QualLevel, type AuditEntry, type AdminSettings,
  type Application, type ApplicationStatus, type JobCriteria, type PermissionOverride, type AdminRole,
} from "@/context/AppContext";
import { SALARY_BANDS, EMPLOYMENT_TYPES, DEPARTMENTS, QUAL_LEVELS } from "@/lib/uganda-curriculum";
import {
  downloadJobsReport, downloadApplicationsReport, downloadDepartmentSummary,
  downloadAuditLog, downloadInternsReport, downloadStaffReport, downloadJobAdvert,
  type StaffRecord,
} from "@/lib/admin-pdf";
import { extractPdfText } from "@/lib/pdf-extract";

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/admin")({
  validateSearch: z.object({
    tab: z.enum(["login", "dashboard", "jobs", "apps", "interns", "staff", "reports", "audit", "settings", "criteria", "permissions"]).optional(),
    jobId: z.coerce.number().optional(),
  }),
  head: () => ({ meta: [{ title: "HR Console — CAA Uganda" }] }),
  component: AdminPage,
});

// ─── Staff data ───────────────────────────────────────────────────────────────

const DEPT_LIST = ["Air Traffic Mgmt", "Aviation Safety", "Finance & Admin", "ICT & Systems", "Legal", "Operations", "Human Resources", "Procurement", "Engineering", "Communications"];
const POSITIONS = ["Director", "Manager", "Senior Officer", "Officer", "Analyst", "Coordinator", "Specialist", "Assistant"];

const STAFF_DATA: StaffRecord[] = Object.entries(CAA_STAFF).map(([empNo, { firstName, lastName }], i) => ({
  empNo, firstName, lastName,
  dept: DEPT_LIST[i % DEPT_LIST.length],
  position: POSITIONS[i % POSITIONS.length],
  email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@caa.co.ug`,
  joined: `${2014 + (i % 9)}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
  status: "Active",
}));

// ─── Colors ───────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  Pending: "#f59e0b", "Under Review": "#3b82f6", Shortlisted: "#10b981",
  Interview: "#8b5cf6", Offered: "#0d9488", Hired: "#059669", Declined: "#ef4444",
};


// ─── RBAC-aware nav ───────────────────────────────────────────────────────────

const ALL_NAV = [
  { key: "dashboard",   label: "Dashboard",        Icon: LayoutDashboard,  perm: null },
  { key: "jobs",        label: "Job Listings",      Icon: Briefcase,        perm: "canManageJobs" as const },
  { key: "apps",        label: "Applications",      Icon: FileText,         perm: "canViewApplications" as const },
  { key: "interns",     label: "Interns (CGPA)",    Icon: GraduationCap,    perm: "canViewApplications" as const },
  { key: "staff",       label: "Internal Staff",    Icon: Users,            perm: "canViewStaff" as const },
  { key: "reports",     label: "Reports & Exports", Icon: Download,         perm: "canExport" as const },
  { key: "criteria",    label: "Criteria Setup",    Icon: Filter,           perm: "canManageCriteria" as const },
  { key: "audit",       label: "Audit Log",         Icon: ClipboardList,    perm: "canViewAudit" as const },
  { key: "settings",    label: "Settings",          Icon: Settings,         perm: "canManageSettings" as const },
  { key: "permissions", label: "Permissions",       Icon: Lock,             perm: "canGrantPermissions" as const },
] as const;

type AdminTab = typeof ALL_NAV[number]["key"];

// ─── Main page ────────────────────────────────────────────────────────────────

function AdminPage() {
  const { auth, signIn, jobs, addJob, updateJob, deleteJob, isExpired, applications,
          pushToast, audit, settings, updateSettings, logAction, updateApplicationStatus,
          notifications, criteria, saveCriteria,
          permissionOverrides, savePermissionOverride, cvStore } = useApp();
  const { tab = auth.accountType === "admin" ? "dashboard" : "login", jobId } = Route.useSearch();
  const navigate = useNavigate();

  if (auth.accountType !== "admin") {
    return (
      <AdminLogin onLogin={(email, pw) => {
        const key = email.trim().toLowerCase();
        const rec = HR_USERS[key];
        if (!rec || rec.password !== pw) {
          pushToast({ type: "warning", title: "Invalid credentials", message: `Demo logins listed below` });
          return;
        }
        signIn(rec.firstName, rec.lastName, key, { accountType: "admin", adminRole: rec.role });
        navigate({ to: "/admin", search: { tab: "dashboard" } });
      }} />
    );
  }

  const role = auth.adminRole ?? "hr";
  const perms = permissionOverrides;
  const go = (t: AdminTab) => navigate({ to: "/admin", search: { tab: t } });
  const actor = `${auth.firstName} ${auth.lastName}`;

  const visibleNav = ALL_NAV.filter(({ perm }) =>
    perm === null || canAccess(role, perm, perms)
  );

  const unreadCount = notifications.filter((n) => n.recipientEmail === auth.email && !n.read).length;

  return (
    <div className="flex min-h-[calc(100vh-108px)]">
      {/* ── Sidebar ── */}
      <aside className="w-56 bg-caa-navy shrink-0 flex flex-col">
        <div className="px-4 py-5 border-b border-white/10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">HR Console</p>
          <p className="text-sm font-semibold text-white mt-0.5">{auth.firstName} {auth.lastName}</p>
          <span className={`mt-1 inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${
            role === "super" ? "bg-yellow-400/20 text-yellow-300" :
            role === "hr" ? "bg-blue-400/20 text-blue-300" :
            "bg-green-400/20 text-green-300"
          }`}>{role === "super" ? "Super Admin" : role === "hr" ? "HR Director" : "Recruiter"}</span>
        </div>
        <nav className="flex-1 py-2">
          {visibleNav.map(({ key, label, Icon }) => {
            const active = tab === key;
            return (
              <button key={key} onClick={() => go(key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors text-left ${
                  active ? "bg-white/15 text-white" : "text-white/65 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" /> {label}
              </button>
            );
          })}
        </nav>
        {unreadCount > 0 && (
          <div className="mx-3 mb-3 px-3 py-2.5 bg-caa-warning/15 border border-caa-warning/30 rounded-lg flex items-center gap-2">
            <Bell className="h-3.5 w-3.5 text-caa-warning shrink-0" />
            <span className="text-[11px] text-caa-warning font-medium">{unreadCount} unread alert{unreadCount > 1 ? "s" : ""}</span>
          </div>
        )}
        <div className="px-4 py-4 border-t border-white/10">
          <Link to="/" className="text-white/50 text-[11px] hover:text-white transition-colors flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 rotate-180" /> Back to portal
          </Link>
        </div>
      </aside>

      {/* ── Content ── */}
      <div className="flex-1 bg-caa-surface overflow-auto">
        <div className="px-6 py-6 max-w-5xl">
          {tab === "dashboard"   && <DashboardTab jobs={jobs} applications={applications} isExpired={isExpired} navigate={navigate} role={role} />}
          {tab === "jobs"        && canAccess(role, "canManageJobs", perms) && <JobsTab jobs={jobs} isExpired={isExpired} addJob={addJob} updateJob={updateJob} deleteJob={deleteJob} onViewApps={(id: number) => navigate({ to: "/admin", search: { tab: "apps", jobId: id } })} />}
          {tab === "apps"        && canAccess(role, "canViewApplications", perms) && <AppsTab jobs={jobs} applications={applications} jobId={jobId} cvStore={cvStore} updateStatus={updateApplicationStatus} logAction={logAction} actor={actor} criteria={criteria} role={role} perms={perms} />}
          {tab === "interns"     && canAccess(role, "canViewApplications", perms) && <InternsTab applications={applications} jobs={jobs} actor={actor} />}
          {tab === "staff"       && canAccess(role, "canViewStaff", perms) && <StaffTab actor={actor} logAction={logAction} />}
          {tab === "reports"     && canAccess(role, "canExport", perms) && <ReportsTab jobs={jobs} applications={applications} audit={audit} actor={actor} />}
          {tab === "criteria"    && canAccess(role, "canManageCriteria", perms) && <CriteriaTab jobs={jobs} criteria={criteria} saveCriteria={saveCriteria} logAction={logAction} />}
          {tab === "audit"       && canAccess(role, "canViewAudit", perms) && <AuditTab audit={audit} actor={actor} />}
          {tab === "settings"    && canAccess(role, "canManageSettings", perms) && <SettingsTab settings={settings} updateSettings={updateSettings} logAction={logAction} />}
          {tab === "permissions" && canAccess(role, "canGrantPermissions", perms) && <PermissionsTab overrides={permissionOverrides} save={savePermissionOverride} logAction={logAction} />}
          {/* Access denied fallback */}
          {tab !== "dashboard" && tab !== "login" && !visibleNav.find((n) => n.key === tab) && (
            <div className="text-center py-16">
              <Lock className="h-10 w-10 text-caa-muted mx-auto mb-3" />
              <p className="font-bold text-lg text-caa-body">Access restricted</p>
              <p className="text-sm text-caa-muted mt-1">Your role does not have permission to view this section.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────

function AdminLogin({ onLogin }: { onLogin: (email: string, pw: string) => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const demoUsers = Object.entries(HR_USERS).map(([e, u]) => ({ email: e, name: `${u.firstName} ${u.lastName}`, role: u.role, pw: u.password }));

  return (
    <div className="px-4 py-12 flex justify-center">
      <div className="w-full max-w-sm space-y-4">
        <form onSubmit={(e) => { e.preventDefault(); onLogin(email, pw); }} className="caa-card p-6 space-y-3">
          <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-caa-navy" /><h1 className="font-bold text-lg">HR Console sign in</h1></div>
          <p className="text-xs text-caa-muted">Protected portal. CAA HR staff only.</p>
          <div>
            <label className="block text-xs font-medium text-caa-body mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@caa.co.ug" className="w-full px-3 py-2 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy" />
          </div>
          <div>
            <label className="block text-xs font-medium text-caa-body mb-1">Password</label>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="w-full px-3 py-2 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy" />
          </div>
          <button type="submit" className="w-full py-2 bg-caa-navy text-white font-semibold rounded-md hover:bg-caa-navy-2 text-sm">Sign in</button>
          <Link to="/login" className="block text-center text-xs text-caa-muted hover:text-caa-navy">← Candidate sign in</Link>
        </form>

        <div className="caa-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-caa-navy mb-3">Demo accounts</p>
          <div className="space-y-2">
            {demoUsers.map((u) => (
              <button key={u.email} onClick={() => onLogin(u.email, u.pw)}
                className="w-full text-left px-3 py-2 rounded-md bg-caa-surface hover:bg-caa-navy/5 border border-caa-border transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-caa-body">{u.name}</p>
                    <p className="text-[11px] text-caa-muted">{u.email}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${
                    u.role === "super" ? "bg-yellow-100 text-yellow-700" :
                    u.role === "hr" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                  }`}>{u.role}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function DashboardTab({ jobs, applications, isExpired, navigate }: any) {
  const activeJobs = jobs.filter((j: Job) => !isExpired(j));
  const printRef = useRef<HTMLDivElement>(null);

  const statusData = Object.entries(
    applications.reduce((acc: any, a: Application) => ({ ...acc, [a.status]: (acc[a.status] ?? 0) + 1 }), {})
  ).map(([name, value]) => ({ name, value }));

  const deptData = Array.from(new Set(jobs.map((j: Job) => j.dept))).map((dept) => ({
    dept: (dept as string).split(" ")[0],
    full: dept,
    apps: applications.filter((a: Application) => a.dept === dept).length,
  }));

  const trend = [
    { month: "Feb", apps: 3 }, { month: "Mar", apps: 7 }, { month: "Apr", apps: 5 },
    { month: "May", apps: 12 }, { month: "Jun", apps: applications.length },
  ];

  const printCharts = () => {
    const el = printRef.current;
    if (!el) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<html><head><title>Dashboard Charts — CAA</title><style>
      body { font-family: helvetica,sans-serif; padding: 24px; }
      h1 { color: #0d2454; font-size: 18px; margin-bottom: 4px; }
      p { color: #888; font-size: 12px; margin-bottom: 20px; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
      h3 { font-size: 13px; color: #0d2454; margin-bottom: 12px; }
    </style></head><body>`);
    w.document.write(`<h1>UGANDA CIVIL AVIATION AUTHORITY</h1><p>Recruitment Dashboard — ${new Date().toLocaleDateString()}</p>`);
    w.document.write(el.innerHTML);
    w.document.write("</body></html>");
    w.document.close();
    w.print();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl text-caa-body">Dashboard</h1>
        <button onClick={printCharts} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-caa-border rounded-md hover:border-caa-navy text-caa-body">
          <Printer className="h-4 w-4" /> Print charts
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { Icon: Briefcase,     label: "Active Listings",      n: activeJobs.length,    color: "text-caa-navy",    tab: "jobs" },
          { Icon: Users,         label: "Total Applications",   n: applications.length,  color: "text-caa-navy-2",  tab: "apps" },
          { Icon: GraduationCap, label: "Intern Applications",  n: applications.filter((a: Application) => a.cgpa !== undefined).length, color: "text-caa-success", tab: "interns" },
          { Icon: Archive,       label: "Expired Listings",     n: jobs.filter(isExpired).length, color: "text-caa-danger", tab: "jobs" },
        ].map((s) => (
          <button key={s.label} onClick={() => navigate({ to: "/admin", search: { tab: s.tab } })} className="caa-card p-4 text-left hover:shadow-md transition-shadow">
            <s.Icon className="h-5 w-5 text-caa-navy" />
            <p className="text-[11px] text-caa-muted mt-3">{s.label}</p>
            <p className={`font-bold text-3xl mt-1 ${s.color}`}>{s.n}</p>
          </button>
        ))}
      </div>

      {/* Charts grid — printable */}
      <div ref={printRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="caa-card p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-caa-navy mb-4">Applications by Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {statusData.map((_: any, i: number) => (
                  <Cell key={i} fill={Object.values(STATUS_COLORS)[i % 7]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="caa-card p-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-caa-navy mb-4">Applications by Department</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deptData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dept" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
              <Tooltip formatter={(v, _, { payload }) => [v, payload?.full]} />
              <Bar dataKey="apps" fill="#0d2454" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="caa-card p-4 md:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-caa-navy mb-4">Application Trend (2026)</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="apps" stroke="#1565C0" strokeWidth={2} dot={{ fill: "#1565C0", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ─── Jobs ─────────────────────────────────────────────────────────────────────

const emptyJob: Omit<Job, "id" | "abbr"> = {
  title: "", dept: DEPARTMENTS[0].label, deptKey: DEPARTMENTS[0].key, location: "Kampala HQ",
  salary: "UGX 2.0M–3.0M", salaryBand: "UG5", type: "Full-time", closes: "", closesAt: "",
  visibility: "external", minAge: 21, requiredExperience: 2, requiredQualification: "Degree", description: "",
};

/** Try to extract job listing fields from raw PDF text. Returns partial overrides. */
function parseJobFromText(text: string): Partial<Omit<Job, "id" | "abbr">> {
  const result: Partial<Omit<Job, "id" | "abbr">> = {};
  const lines = text.split(/\n|\r|\s{4,}/).map((l) => l.trim()).filter((l) => l.length > 0);

  // Title — first line >10 chars that isn't an org/header line
  const titleLine = lines.find(
    (l) => l.length > 10 && l.length < 120 &&
      !/uganda civil aviation|civil aviation authority|ucaa|caa uganda|job advert|vacancy/i.test(l),
  );
  if (titleLine) result.title = titleLine.replace(/^(position|post|role|job title)\s*[:\-]\s*/i, "").trim();

  // Department
  for (const d of DEPARTMENTS) {
    if (text.toLowerCase().includes(d.label.toLowerCase())) {
      result.dept = d.label;
      result.deptKey = d.key;
      break;
    }
  }

  // Salary band (UG1–UG7)
  const bandMatch = text.match(/\bUG([1-7])\b/);
  if (bandMatch) result.salaryBand = `UG${bandMatch[1]}`;

  // Salary range (UGX amounts)
  const salaryMatch = text.match(/UGX\s*([\d,.]+M?)\s*[–\-]\s*([\d,.]+M?)/i);
  if (salaryMatch) result.salary = `UGX ${salaryMatch[1]}–${salaryMatch[2]}`;

  // Location
  const knownLocations = ["Entebbe", "Kampala", "Gulu", "Jinja", "Mbarara", "Fort Portal", "Arua"];
  for (const loc of knownLocations) {
    if (text.includes(loc)) { result.location = loc; break; }
  }

  // Employment type
  if (/\bcontract\b/i.test(text)) result.type = "Contract";
  else if (/full[\s-]?time/i.test(text)) result.type = "Full-time";

  // Visibility
  if (/internal\s+(only|vacancy|candidates)/i.test(text)) result.visibility = "internal";
  else if (/external|open\s+to\s+(all|public)/i.test(text)) result.visibility = "external";

  // Deadline — prefer ISO date, else DD/MM/YYYY
  const isoDate = text.match(/\b(202\d)-(0[1-9]|1[0-2])-([0-2]\d|3[01])\b/)?.[0];
  if (isoDate) {
    result.closesAt = isoDate;
  } else {
    const dmyMatch = text.match(/\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](202\d)\b/);
    if (dmyMatch) result.closesAt = `${dmyMatch[3]}-${dmyMatch[2].padStart(2, "0")}-${dmyMatch[1].padStart(2, "0")}`;
  }

  // Min age
  const ageMatch = text.match(/minimum\s+age\s*[:\-]?\s*(\d{2})/i) || text.match(/aged?\s+(\d{2})\s+years/i);
  if (ageMatch) result.minAge = parseInt(ageMatch[1]);

  // Required experience
  const expMatch = text.match(/(\d+)\s*\+?\s*years?\s*(of\s*)?(relevant\s*)?experience/i);
  if (expMatch) result.requiredExperience = parseInt(expMatch[1]);

  // Required qualification
  for (const q of ["PhD", "Masters", "Degree", "Diploma", "Certificate", "A-Level", "O-Level"] as const) {
    if (new RegExp(`\\b${q}\\b`, "i").test(text)) { result.requiredQualification = q; break; }
  }

  // Description — everything after "about the role" or "job summary" heading
  const descMatch = text.match(/(?:about\s+the\s+role|job\s+summary|overview|background)[:\s]*\n?([\s\S]{40,800})/i);
  if (descMatch) result.description = descMatch[1].replace(/\s+/g, " ").trim();

  return result;
}

function JobsTab({ jobs, isExpired, addJob, updateJob, deleteJob, onViewApps }: any) {
  type EditingJob = Omit<Job, "id" | "abbr"> & { id?: number };
  const [editing, setEditing] = useState<null | EditingJob>(null);
  const [inputMode, setInputMode] = useState<"manual" | "pdf">("manual");
  const [pdfParsing, setPdfParsing] = useState(false);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { auth, pushToast } = useApp();
  const actor = `${auth.firstName} ${auth.lastName}`;

  const open = (j?: Job) => {
    setEditing(j ? { ...j } : { ...emptyJob });
    setInputMode("manual");
    setPdfFileName(null);
    setSaveError(null);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      setSaveError("Job title is required.");
      setInputMode("manual");
      return;
    }
    if (!editing.closesAt) {
      setSaveError("Application deadline is required.");
      setInputMode("manual");
      return;
    }
    setSaveError(null);
    const closes = new Date(editing.closesAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const payload = { ...editing, closes };
    if (editing.id) updateJob(editing.id, payload); else addJob(payload);
    setEditing(null);
    pushToast({ type: "success", title: editing.id ? "Listing updated" : "Listing created", message: editing.title });
  };

  const handlePdfUpload = async (file: File) => {
    setPdfParsing(true);
    setPdfFileName(file.name);
    setSaveError(null);
    try {
      const text = await extractPdfText(file);
      const parsed = parseJobFromText(text);
      setEditing((prev) => ({ ...(prev ?? emptyJob), ...parsed }));
      pushToast({ type: "success", title: "PDF imported", message: "Fields pre-filled — review and complete any missing details." });
    } catch {
      pushToast({ type: "warning", title: "Could not read PDF", message: "Please fill in the details manually." });
    } finally {
      setPdfParsing(false);
      setInputMode("manual"); // always switch to form after upload attempt
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl text-caa-body">Job Listings</h1>
        <button onClick={() => open()} className="px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md hover:bg-caa-navy-2 inline-flex items-center gap-1">
          <Plus className="h-4 w-4" /> New listing
        </button>
      </div>
      <div className="caa-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-caa-surface text-xs text-caa-muted">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Visibility</th>
              <th className="text-left p-3">Band</th>
              <th className="text-left p-3">Closes</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-caa-border">
            {jobs.map((j: Job) => (
              <tr key={j.id}>
                <td className="p-3">
                  <p className="font-medium text-caa-body">{j.title}</p>
                  <p className="text-[11px] text-caa-muted">{j.dept}</p>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${j.visibility === "internal" ? "bg-caa-navy-2/15 text-caa-navy-2" : "bg-caa-success/10 text-caa-success"}`}>
                    {j.visibility}
                  </span>
                </td>
                <td className="p-3 text-xs">{j.salaryBand}</td>
                <td className="p-3 text-xs">{j.closes}</td>
                <td className="p-3">
                  {isExpired(j)
                    ? <span className="px-2 py-0.5 rounded-full bg-caa-danger/10 text-caa-danger text-[10px]">Expired</span>
                    : <span className="px-2 py-0.5 rounded-full bg-caa-success/10 text-caa-success text-[10px]">Active</span>}
                </td>
                <td className="p-3 text-right space-x-2">
                  <button onClick={() => onViewApps(j.id)} className="text-xs text-caa-navy hover:underline">Apps</button>
                  <button onClick={() => open(j)} className="text-xs text-caa-navy hover:underline inline-flex items-center gap-1"><Pencil className="h-3 w-3" />Edit</button>
                  <button onClick={() => downloadJobAdvert(j, actor)} className="text-xs text-caa-navy hover:underline inline-flex items-center gap-1"><FileDown className="h-3 w-3" />PDF</button>
                  <button onClick={() => deleteJob(j.id)} className="text-xs text-caa-danger hover:underline inline-flex items-center gap-1"><Trash2 className="h-3 w-3" />Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="caa-card p-5 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg mb-3">{editing.id ? "Edit listing" : "New job listing"}</h3>

            {/* Mode toggle */}
            <div className="flex gap-2 mb-4 p-1 bg-caa-surface rounded-lg border border-caa-border w-fit">
              <button
                onClick={() => setInputMode("manual")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 ${inputMode === "manual" ? "bg-caa-navy text-white" : "text-caa-muted hover:text-caa-body"}`}
              >
                <Pencil className="h-3.5 w-3.5" /> Fill in details
              </button>
              <button
                onClick={() => setInputMode("pdf")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 ${inputMode === "pdf" ? "bg-caa-navy text-white" : "text-caa-muted hover:text-caa-body"}`}
              >
                <Upload className="h-3.5 w-3.5" /> Import from PDF
              </button>
            </div>

            {inputMode === "pdf" ? (
              /* ── PDF upload panel ── */
              <div className="space-y-3">
                <p className="text-xs text-caa-muted">Upload an existing job advert PDF. We'll extract the details and pre-fill the form below for you to review.</p>
                <label className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors ${pdfParsing ? "border-caa-navy/40 bg-caa-navy/5" : "border-caa-border hover:border-caa-navy/50 hover:bg-caa-navy/3"}`}>
                  {pdfParsing ? (
                    <>
                      <RefreshCw className="h-8 w-8 text-caa-navy animate-spin" />
                      <p className="text-sm font-medium text-caa-navy">Reading PDF…</p>
                    </>
                  ) : (
                    <>
                      <FileSearch className="h-10 w-10 text-caa-muted" />
                      <div className="text-center">
                        <p className="text-sm font-semibold text-caa-body">Click to upload a job advert PDF</p>
                        <p className="text-[11px] text-caa-muted mt-0.5">{pdfFileName ?? "PDF files only · max 10 MB"}</p>
                      </div>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".pdf"
                    className="sr-only"
                    disabled={pdfParsing}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePdfUpload(f); }}
                  />
                </label>
                {pdfFileName && !pdfParsing && (
                  <p className="text-[11px] text-caa-success flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Parsed <strong>{pdfFileName}</strong> — switch to "Fill in details" to review the extracted fields.
                  </p>
                )}
              </div>
            ) : (
              /* ── Manual form ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Title"><input className={fi} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="e.g. Senior Air Traffic Controller" /></Field>
                <Field label="Department"><select className={fi} value={editing.deptKey} onChange={(e) => { const d = DEPARTMENTS.find((x) => x.key === e.target.value)!; setEditing({ ...editing, deptKey: d.key, dept: d.label }); }}>{DEPARTMENTS.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}</select></Field>
                <Field label="Location"><input className={fi} value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></Field>
                <Field label="Type"><select className={fi} value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value as any })}>{EMPLOYMENT_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
                <Field label="Salary range"><input className={fi} value={editing.salary} onChange={(e) => setEditing({ ...editing, salary: e.target.value })} placeholder="e.g. UGX 3.2M–5.8M" /></Field>
                <Field label="Band"><select className={fi} value={editing.salaryBand} onChange={(e) => setEditing({ ...editing, salaryBand: e.target.value })}>{SALARY_BANDS.map((b) => <option key={b}>{b}</option>)}</select></Field>
                <Field label="Visibility"><select className={fi} value={editing.visibility} onChange={(e) => setEditing({ ...editing, visibility: e.target.value as Visibility })}><option value="external">External — open to public</option><option value="internal">Internal — CAA staff only</option></select></Field>
                <Field label="Deadline"><input type="date" className={fi} value={editing.closesAt} onChange={(e) => setEditing({ ...editing, closesAt: e.target.value })} /></Field>
                <Field label="Min age"><input type="number" className={fi} value={editing.minAge} onChange={(e) => setEditing({ ...editing, minAge: parseInt(e.target.value) || 18 })} /></Field>
                <Field label="Experience (yrs)"><input type="number" className={fi} value={editing.requiredExperience} onChange={(e) => setEditing({ ...editing, requiredExperience: parseInt(e.target.value) || 0 })} /></Field>
                <Field label="Qualification"><select className={fi} value={editing.requiredQualification} onChange={(e) => setEditing({ ...editing, requiredQualification: e.target.value as QualLevel })}>{QUAL_LEVELS.map((q) => <option key={q}>{q}</option>)}</select></Field>
                <div className="sm:col-span-2">
                  <Field label="Description">
                    <textarea rows={4} className={fi} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Describe the role, responsibilities and what the candidate can expect…" />
                  </Field>
                </div>
              </div>
            )}

            {saveError && (
              <p className="mt-3 text-xs text-caa-danger flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {saveError}
              </p>
            )}

            <div className="flex justify-between items-center mt-4">
              <div>
                {editing.title && editing.closesAt && (
                  <button
                    type="button"
                    onClick={() => {
                      const closes = new Date(editing.closesAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                      downloadJobAdvert({ ...editing, id: editing.id ?? 0, abbr: "", closes } as Job, actor);
                    }}
                    className="text-xs text-caa-navy hover:underline inline-flex items-center gap-1"
                  >
                    <FileDown className="h-3.5 w-3.5" /> Preview as PDF
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(null)} className="px-3 py-1.5 text-sm border border-caa-border rounded-md">Cancel</button>
                <button onClick={save} disabled={pdfParsing} className="px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md disabled:opacity-50">
                  {editing.id ? "Save changes" : "Create listing"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Applications ─────────────────────────────────────────────────────────────

const QUAL_ORDER: Record<string, number> = {
  "O-Level": 0, "A-Level": 1, Certificate: 2, Diploma: 3, Degree: 4, Masters: 5, PhD: 6,
};

function autoQualify(app: Application, job: Job | undefined, cv: any, jobCriteria: JobCriteria | undefined): { ok: boolean; checks: { label: string; pass: boolean; detail: string }[] } {
  if (!job) return { ok: false, checks: [] };
  const checks = [];

  // Age
  if (cv?.personal?.dob) {
    const age = Math.floor((Date.now() - new Date(cv.personal.dob).getTime()) / (365.25 * 24 * 3600 * 1000));
    checks.push({ label: "Age", pass: age >= job.minAge, detail: `Age ${age} vs min ${job.minAge}` });
  } else {
    checks.push({ label: "Age", pass: false, detail: "Date of birth not on file" });
  }

  // Qualification
  const highestQual = cv?.highestLevel || cv?.qualifications?.[0]?.level || "";
  const qualOk = (QUAL_ORDER[highestQual] ?? -1) >= (QUAL_ORDER[job.requiredQualification] ?? 0);
  checks.push({ label: "Qualification", pass: qualOk, detail: `${highestQual || "Unknown"} vs required ${job.requiredQualification}` });

  // Experience
  const expYears = cv?.experience?.length
    ? cv.experience.reduce((sum: number, e: any) => {
        if (!e.start || !e.end) return sum + 1;
        const y = Math.max(0, new Date(e.end).getFullYear() - new Date(e.start).getFullYear());
        return sum + y;
      }, 0)
    : 0;
  checks.push({ label: "Experience", pass: expYears >= job.requiredExperience, detail: `~${expYears} yr(s) vs required ${job.requiredExperience}` });

  // CGPA (internships)
  if (jobCriteria?.minCgpa !== undefined && app.cgpa !== undefined) {
    checks.push({ label: "CGPA", pass: app.cgpa >= jobCriteria.minCgpa, detail: `${app.cgpa.toFixed(1)} vs min ${jobCriteria.minCgpa.toFixed(1)}` });
  }

  // Keywords
  if (jobCriteria?.requiredKeywords?.length) {
    const cvText = JSON.stringify(cv || {}).toLowerCase();
    const missing = jobCriteria.requiredKeywords.filter((k) => !cvText.includes(k.toLowerCase()));
    checks.push({ label: "Keywords", pass: missing.length === 0, detail: missing.length === 0 ? "All matched" : `Missing: ${missing.join(", ")}` });
  }

  return { ok: checks.length > 0 && checks.every((c) => c.pass), checks };
}

function AppsTab({ jobs, applications, jobId, cvStore, updateStatus, logAction, actor, criteria, role, perms }: any) {
  const filtered = jobId ? applications.filter((a: Application) => a.jobId === jobId) : applications;
  const job = jobs.find((j: Job) => j.id === jobId);
  const [selected, setSelected] = useState<Application | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const displayed = statusFilter === "all" ? filtered : filtered.filter((a: Application) => a.status === statusFilter);

  return (
    <div className="space-y-3">
      <h1 className="font-bold text-xl text-caa-body">{job ? `Applications — ${job.title}` : "All Applications"}</h1>

      <div className="flex gap-2 flex-wrap">
        {["all", ...APPLICATION_STATUSES].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1 text-[11px] rounded-full font-semibold transition-colors border ${statusFilter === s ? "bg-caa-navy text-white border-caa-navy" : "border-caa-border text-caa-muted hover:border-caa-navy"}`}>
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>

      <div className="caa-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-caa-surface text-xs text-caa-muted">
            <tr><th className="text-left p-3">Candidate</th><th className="text-left p-3">Role</th><th className="text-left p-3">Submitted</th><th className="text-left p-3">Status</th><th className="text-left p-3">Completion</th><th className="text-right p-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-caa-border">
            {displayed.map((a: Application) => (
              <tr key={a.id} className="hover:bg-caa-surface/50 cursor-pointer" onClick={() => setSelected(a)}>
                <td className="p-3"><p className="font-medium text-caa-body">{a.candidateName ?? "Candidate"}</p><p className="text-[11px] text-caa-muted">{a.candidateEmail ?? "—"}</p></td>
                <td className="p-3 text-xs text-caa-muted">{a.title}</td>
                <td className="p-3 text-xs">{a.date}</td>
                <td className="p-3">
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold" style={{ background: (STATUS_COLORS[a.status] ?? "#999") + "20", color: STATUS_COLORS[a.status] ?? "#999" }}>{a.status}</span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-caa-border rounded-full overflow-hidden"><div className="h-full bg-caa-navy rounded-full" style={{ width: `${a.completion}%` }} /></div>
                    <span className="text-[11px] text-caa-muted">{a.completion}%</span>
                  </div>
                </td>
                <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setSelected(a)} className="text-xs text-caa-navy hover:underline inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> View CV</button>
                </td>
              </tr>
            ))}
            {displayed.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-xs text-caa-muted">No applications found.</td></tr>}
          </tbody>
        </table>
      </div>

      {selected && (
        <AppDetailModal
          app={selected}
          job={jobs.find((j: Job) => j.id === selected.jobId)}
          cv={cvStore[selected.candidateEmail?.toLowerCase() ?? ""]}
          criteria={criteria.find((c: JobCriteria) => c.jobId === selected.jobId)}
          canShortlist={canAccess(role, "canShortlist", perms)}
          onClose={() => setSelected(null)}
          onUpdateStatus={(status: ApplicationStatus, msg: string) => {
            updateStatus(selected.id, status, selected.candidateEmail, msg);
            logAction(`Set application #${selected.id} to ${status}`, selected.candidateName ?? selected.candidateEmail);
            setSelected((prev) => prev ? { ...prev, status } as Application : null);
          }}
          actor={actor}
        />
      )}
    </div>
  );
}

// ─── Application Detail Modal ─────────────────────────────────────────────────

function AppDetailModal({ app, job, cv, criteria, canShortlist, onClose, onUpdateStatus }: any) {
  const [confirmStatus, setConfirmStatus] = useState<string | null>(null);
  const [notifMsg, setNotifMsg] = useState("");
  const { ok, checks } = useMemo(() => autoQualify(app, job, cv, criteria), [app, job, cv, criteria]);

  const actionButtons = [
    { status: "Shortlisted", label: "Shortlist",    color: "bg-caa-success text-white",    defaultMsg: `Congratulations! Your application for ${app.title} has been shortlisted. You will be contacted shortly with further details.` },
    { status: "Interview",   label: "Invite Interview", color: "bg-purple-600 text-white", defaultMsg: `Your application for ${app.title} has progressed to the interview stage. Our HR team will contact you to schedule a date and time.` },
    { status: "Offered",     label: "Make Offer",   color: "bg-teal-600 text-white",        defaultMsg: `We are pleased to offer you the position of ${app.title}. Please expect a formal offer letter shortly.` },
    { status: "Declined",    label: "Decline",      color: "bg-caa-danger text-white",      defaultMsg: `Thank you for your interest in the ${app.title} position. After careful consideration, we regret to inform you that your application has not been successful on this occasion.` },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4">
      <div className="caa-card w-full max-w-3xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-caa-border">
          <div>
            <h2 className="font-bold text-lg text-caa-body">{app.candidateName ?? "Candidate"}</h2>
            <p className="text-sm text-caa-muted mt-0.5">{app.title} · Submitted {app.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold" style={{ background: (STATUS_COLORS[app.status] ?? "#999") + "20", color: STATUS_COLORS[app.status] ?? "#999" }}>{app.status}</span>
            <button onClick={onClose} className="text-caa-muted hover:text-caa-body"><XCircle className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Auto-qualification result */}
          <div className={`rounded-lg p-4 border ${ok ? "border-caa-success/30 bg-caa-success/5" : "border-caa-danger/30 bg-caa-danger/5"}`}>
            <div className="flex items-center gap-2 mb-3">
              {ok ? <CheckCircle2 className="h-5 w-5 text-caa-success" /> : <XCircle className="h-5 w-5 text-caa-danger" />}
              <span className={`font-bold text-sm ${ok ? "text-caa-success" : "text-caa-danger"}`}>
                {ok ? "Applicant meets requirements" : "One or more requirements not met"}
              </span>
            </div>
            {checks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {checks.map((c: any) => (
                  <div key={c.label} className={`px-2.5 py-1.5 rounded-md text-[11px] border ${c.pass ? "border-caa-success/20 bg-white" : "border-caa-danger/20 bg-white"}`}>
                    <span className={`font-semibold ${c.pass ? "text-caa-success" : "text-caa-danger"}`}>{c.pass ? "✓" : "✗"} {c.label}</span>
                    <p className="text-caa-muted mt-0.5">{c.detail}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-caa-muted">CV data not yet available — candidate hasn't submitted their CV through this portal. Analysis cannot run.</p>
            )}
          </div>

          {/* CV data */}
          {cv ? (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-caa-navy">Candidate CV</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                {[
                  ["Full name", `${cv.personal.firstName} ${cv.personal.otherName ?? ""} ${cv.personal.lastName}`.trim()],
                  ["Email", cv.personal.email || app.candidateEmail],
                  ["Phone", cv.personal.phone || "—"],
                  ["Date of birth", cv.personal.dob || "—"],
                  ["Gender", cv.personal.gender || "—"],
                  ["Nationality", cv.personal.nationality || "—"],
                  ["NIN", cv.personal.nin || "—"],
                  ["Address", cv.personal.address || "—"],
                ].map(([label, value]) => (
                  <div key={label}><span className="text-caa-muted text-xs">{label}:</span> <span className="font-medium text-caa-body">{value}</span></div>
                ))}
              </div>
              {cv.qualifications.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-caa-navy mb-1">Qualifications</p>
                  <div className="space-y-1">
                    {cv.qualifications.map((q: any, i: number) => (
                      <p key={i} className="text-xs text-caa-body">{q.level} — {q.course || q.school} ({q.institution || q.school}, {q.year})</p>
                    ))}
                  </div>
                </div>
              )}
              {cv.experience.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-caa-navy mb-1">Experience</p>
                  {cv.experience.map((e: any, i: number) => (
                    <p key={i} className="text-xs text-caa-body">{e.title} at {e.organisation} ({e.start}–{e.end})</p>
                  ))}
                </div>
              )}
              {cv.skills.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-caa-navy mb-1">Skills</p>
                  <p className="text-xs text-caa-body">{cv.skills.join(" · ")}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-caa-border p-4 text-sm text-caa-muted text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-caa-muted/50" />
              CV not on file — candidate applied before completing their portal profile, or the CV was submitted in a different session.
            </div>
          )}

          {/* Action buttons */}
          {canShortlist && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-caa-navy mb-2">Update status & notify candidate</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {actionButtons.map((btn) => (
                  <button
                    key={btn.status}
                    disabled={app.status === btn.status}
                    onClick={() => { setConfirmStatus(btn.status); setNotifMsg(btn.defaultMsg); }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md disabled:opacity-40 transition-opacity ${btn.color}`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              {confirmStatus && (
                <div className="border border-caa-border rounded-lg p-3 space-y-2">
                  <p className="text-xs font-semibold text-caa-body">Notification to send to <span className="text-caa-navy">{app.candidateEmail}</span>:</p>
                  <textarea rows={3} className={`${fi} text-xs`} value={notifMsg} onChange={(e) => setNotifMsg(e.target.value)} />
                  <div className="flex gap-2">
                    <button onClick={() => { onUpdateStatus(confirmStatus, notifMsg); setConfirmStatus(null); }} className="px-3 py-1.5 text-xs font-semibold bg-caa-navy text-white rounded-md">Confirm & Send</button>
                    <button onClick={() => setConfirmStatus(null)} className="px-3 py-1.5 text-xs border border-caa-border rounded-md">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Interns (CGPA) ───────────────────────────────────────────────────────────

function InternsTab({ applications, jobs, actor }: any) {
  const interns = [...applications]
    .filter((a: Application) => a.cgpa !== undefined)
    .sort((a: Application, b: Application) => (b.cgpa ?? 0) - (a.cgpa ?? 0));

  const cgpaColor = (g: number) =>
    g >= 4.5 ? "text-caa-success" : g >= 3.5 ? "text-caa-navy" : g >= 3.0 ? "text-caa-warning" : "text-caa-danger";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="font-bold text-xl text-caa-body">Interns (CGPA)</h1><p className="text-xs text-caa-muted mt-0.5">Ranked by CGPA — highest first</p></div>
        <button onClick={() => downloadInternsReport(interns, jobs, actor)} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md"><FileDown className="h-4 w-4" /> Export PDF</button>
      </div>
      <div className="caa-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-caa-surface text-xs text-caa-muted">
            <tr><th className="text-left p-3">Rank</th><th className="text-left p-3">Candidate</th><th className="text-left p-3">Position</th><th className="text-left p-3">University</th><th className="text-left p-3">CGPA</th><th className="text-left p-3">Status</th><th className="text-left p-3">Date</th></tr>
          </thead>
          <tbody className="divide-y divide-caa-border">
            {interns.map((a: Application, i: number) => (
              <tr key={a.id}>
                <td className="p-3"><span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-[11px] font-bold ${i === 0 ? "bg-yellow-100 text-yellow-700" : i === 1 ? "bg-gray-100 text-gray-600" : i === 2 ? "bg-orange-100 text-orange-600" : "bg-caa-surface text-caa-muted"}`}>{i + 1}</span></td>
                <td className="p-3"><p className="font-medium text-caa-body">{a.candidateName ?? "—"}</p><p className="text-[11px] text-caa-muted">{a.candidateEmail ?? "—"}</p></td>
                <td className="p-3 text-xs text-caa-muted">{a.title}</td>
                <td className="p-3 text-xs">{a.university ?? "—"}</td>
                <td className="p-3"><span className={`font-bold text-base ${cgpaColor(a.cgpa ?? 0)}`}>{a.cgpa?.toFixed(1) ?? "—"}</span><span className="text-[10px] text-caa-muted ml-1">/ 5.0</span></td>
                <td className="p-3"><span className="text-[11px] px-2 py-0.5 rounded-full bg-caa-surface border border-caa-border">{a.status}</span></td>
                <td className="p-3 text-xs text-caa-muted">{a.date}</td>
              </tr>
            ))}
            {interns.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-xs text-caa-muted">No intern applications on record.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Internal Staff ───────────────────────────────────────────────────────────

function StaffTab({ actor, logAction }: any) {
  const [search, setSearch] = useState("");
  const filtered = STAFF_DATA.filter((s) => `${s.firstName} ${s.lastName} ${s.empNo} ${s.dept}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="font-bold text-xl text-caa-body">Internal Staff</h1><p className="text-xs text-caa-muted mt-0.5">{STAFF_DATA.length} verified CAA staff</p></div>
        <button onClick={() => { downloadStaffReport(STAFF_DATA, actor); logAction("Exported staff register"); }} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md"><FileDown className="h-4 w-4" /> Export PDF</button>
      </div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="w-full px-3 py-2 text-sm border border-caa-border rounded-md bg-white focus:outline-none focus:border-caa-navy" />
      <div className="caa-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-caa-surface text-xs text-caa-muted">
            <tr><th className="text-left p-3">Emp No.</th><th className="text-left p-3">Name</th><th className="text-left p-3">Department</th><th className="text-left p-3">Position</th><th className="text-left p-3">Email</th><th className="text-left p-3">Joined</th><th className="text-left p-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-caa-border">
            {filtered.map((s) => (
              <tr key={s.empNo}>
                <td className="p-3 text-[11px] font-mono text-caa-muted">{s.empNo}</td>
                <td className="p-3 font-medium text-caa-body">{s.firstName} {s.lastName}</td>
                <td className="p-3 text-xs text-caa-muted">{s.dept}</td>
                <td className="p-3 text-xs">{s.position}</td>
                <td className="p-3 text-xs text-caa-muted">{s.email}</td>
                <td className="p-3 text-xs">{s.joined}</td>
                <td className="p-3"><span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-caa-success/10 text-caa-success"><CheckCircle2 className="h-3 w-3" />{s.status}</span></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-xs text-caa-muted">No staff match your search.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Reports ──────────────────────────────────────────────────────────────────

function ReportsTab({ jobs, applications, audit, actor }: any) {
  const internApps = applications.filter((a: Application) => a.cgpa !== undefined);
  const reports = [
    { title: "Vacancies Report",       desc: `${jobs.length} job listings`,                                     Icon: Briefcase,     action: () => downloadJobsReport(jobs, actor) },
    { title: "Applications Report",    desc: `${applications.length} applications across all vacancies`,        Icon: FileText,      action: () => downloadApplicationsReport(applications, jobs, actor) },
    { title: "Department Summary",     desc: "Applications and shortlisted counts by department",               Icon: TrendingUp,    action: () => downloadDepartmentSummary(jobs, applications, actor) },
    { title: "Intern CGPA Ranking",    desc: `${internApps.length} intern applications ranked by CGPA`,        Icon: GraduationCap, action: () => downloadInternsReport(internApps, jobs, actor) },
    { title: "Internal Staff Register",desc: `${STAFF_DATA.length} CAA staff records`,                          Icon: Users,         action: () => downloadStaffReport(STAFF_DATA, actor) },
    { title: "Audit Log",              desc: `${audit.length} recorded admin actions`,                          Icon: ClipboardList,  action: () => downloadAuditLog(audit, actor) },
  ];
  return (
    <div className="space-y-4">
      <div><h1 className="font-bold text-xl text-caa-body">Reports & Exports</h1><p className="text-xs text-caa-muted mt-0.5">PDFs styled to the UCAA letterhead standard.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((r) => (
          <div key={r.title} className="caa-card p-4 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-caa-navy/8 flex items-center justify-center shrink-0"><r.Icon className="h-4.5 w-4.5 text-caa-navy" /></div>
              <div><p className="font-semibold text-sm text-caa-body">{r.title}</p><p className="text-xs text-caa-muted mt-0.5 leading-relaxed">{r.desc}</p></div>
            </div>
            <button onClick={r.action} className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-caa-navy text-white rounded-md hover:bg-caa-navy-2"><FileDown className="h-3.5 w-3.5" /> Download PDF</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Criteria Setup ───────────────────────────────────────────────────────────

function CriteriaTab({ jobs, criteria, saveCriteria, logAction }: { jobs: Job[]; criteria: JobCriteria[]; saveCriteria: (c: JobCriteria) => void; logAction: any }) {
  const [selectedJobId, setSelectedJobId] = useState<number>(jobs[0]?.id ?? 0);
  const existing = criteria.find((c) => c.jobId === selectedJobId);
  const [draft, setDraft] = useState<Omit<JobCriteria, "jobId">>({ minCgpa: existing?.minCgpa, requiredKeywords: existing?.requiredKeywords ?? [], notes: existing?.notes ?? "" });
  const [kw, setKw] = useState("");

  const handleJobChange = (id: number) => {
    setSelectedJobId(id);
    const e = criteria.find((c) => c.jobId === id);
    setDraft({ minCgpa: e?.minCgpa, requiredKeywords: e?.requiredKeywords ?? [], notes: e?.notes ?? "" });
  };

  const addKw = () => { if (kw.trim()) { setDraft({ ...draft, requiredKeywords: [...draft.requiredKeywords, kw.trim()] }); setKw(""); } };
  const removeKw = (k: string) => setDraft({ ...draft, requiredKeywords: draft.requiredKeywords.filter((x) => x !== k) });

  const save = () => {
    saveCriteria({ jobId: selectedJobId, ...draft });
    logAction("Updated criteria", jobs.find((j) => j.id === selectedJobId)?.title);
  };

  return (
    <div className="space-y-4 max-w-xl">
      <div><h1 className="font-bold text-xl text-caa-body">Criteria Setup</h1><p className="text-xs text-caa-muted mt-0.5">Set screening criteria for automatic qualification checks.</p></div>
      <Field label="Select position">
        <select className={fi} value={selectedJobId} onChange={(e) => handleJobChange(Number(e.target.value))}>
          {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
      </Field>
      <div className="caa-card p-4 space-y-4">
        <Field label="Minimum CGPA (internship / graduate roles, leave blank if N/A)">
          <input type="number" min={0} max={5} step={0.1} className={fi} value={draft.minCgpa ?? ""} onChange={(e) => setDraft({ ...draft, minCgpa: e.target.value ? parseFloat(e.target.value) : undefined })} placeholder="e.g. 3.5" />
        </Field>
        <div>
          <label className="block text-xs font-medium text-caa-body mb-1">Required keywords (CV must contain these)</label>
          <div className="flex gap-2 mb-2">
            <input className={`${fi} flex-1`} value={kw} onChange={(e) => setKw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKw())} placeholder="Add keyword…" />
            <button onClick={addKw} className="px-3 py-1.5 bg-caa-navy text-white text-xs rounded-md">Add</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {draft.requiredKeywords.map((k) => (
              <span key={k} className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-caa-navy/10 text-caa-navy">
                {k} <button onClick={() => removeKw(k)} className="text-caa-navy/60 hover:text-caa-danger">×</button>
              </span>
            ))}
          </div>
        </div>
        <Field label="Notes for recruiters">
          <textarea rows={2} className={fi} value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="Optional guidance for the recruiter…" />
        </Field>
        <button onClick={save} className="px-4 py-2 bg-caa-navy text-white text-sm font-semibold rounded-md">Save criteria</button>
      </div>
    </div>
  );
}

// ─── Audit Log ────────────────────────────────────────────────────────────────

function AuditTab({ audit, actor }: { audit: AuditEntry[]; actor: string }) {
  const [filter, setFilter] = useState("");
  const rows = audit.filter((e) => !filter || `${e.actor} ${e.action} ${e.target ?? ""} ${e.role}`.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="font-bold text-xl text-caa-body">Audit Log</h1><p className="text-xs text-caa-muted mt-0.5">{audit.length} actions recorded</p></div>
        <button onClick={() => downloadAuditLog(audit, actor)} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md"><FileDown className="h-4 w-4" /> Export PDF</button>
      </div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter…" className="w-full px-3 py-2 text-sm border border-caa-border rounded-md bg-white focus:outline-none focus:border-caa-navy" />
      <div className="caa-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-caa-surface text-xs text-caa-muted">
            <tr><th className="text-left p-3">Timestamp</th><th className="text-left p-3">Actor</th><th className="text-left p-3">Role</th><th className="text-left p-3">Action</th><th className="text-left p-3">Target</th></tr>
          </thead>
          <tbody className="divide-y divide-caa-border">
            {rows.map((e) => (
              <tr key={e.id}>
                <td className="p-3 text-[11px] text-caa-muted whitespace-nowrap">{new Date(e.at).toLocaleString()}</td>
                <td className="p-3 text-xs font-medium">{e.actor}</td>
                <td className="p-3"><span className="text-[10px] px-2 py-0.5 rounded-full bg-caa-navy/10 text-caa-navy font-semibold capitalize">{e.role}</span></td>
                <td className="p-3 text-xs">{e.action}</td>
                <td className="p-3 text-xs text-caa-muted">{e.target ?? "—"}</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-xs text-caa-muted">{audit.length === 0 ? "No actions logged yet." : "No entries match."}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function SettingsTab({ settings, updateSettings, logAction }: { settings: AdminSettings; updateSettings: (p: Partial<AdminSettings>) => void; logAction: any }) {
  const [draft, setDraft] = useState<AdminSettings>({ ...settings });
  const [saved, setSaved] = useState(false);
  const save = () => { updateSettings(draft); logAction("Updated portal settings"); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  return (
    <div className="space-y-5 max-w-xl">
      <div><h1 className="font-bold text-xl text-caa-body">Settings</h1><p className="text-xs text-caa-muted mt-0.5">Portal-wide configuration.</p></div>
      <div className="caa-card p-5 space-y-4">
        <Section title="Organisation">
          <Field label="Organisation name"><input className={fi} value={draft.orgName} onChange={(e) => setDraft({ ...draft, orgName: e.target.value })} /></Field>
        </Section>
        <Section title="Recruitment rules">
          <Field label="Minimum applicant age"><input type="number" min={16} max={60} className={fi} value={draft.minAgeThreshold} onChange={(e) => setDraft({ ...draft, minAgeThreshold: parseInt(e.target.value) || 18 })} /></Field>
          <div className="flex items-start gap-3 mt-2">
            <input id="extInt" type="checkbox" checked={draft.allowExternalInternalJobs} onChange={(e) => setDraft({ ...draft, allowExternalInternalJobs: e.target.checked })} />
            <label htmlFor="extInt" className="text-sm leading-tight">Allow external applicants to see internal-only job listings</label>
          </div>
        </Section>
        <Section title="Session">
          <Field label="Auto-logout after inactivity (minutes)"><input type="number" min={1} max={120} className={fi} value={draft.sessionTimeoutMinutes} onChange={(e) => setDraft({ ...draft, sessionTimeoutMinutes: parseInt(e.target.value) || 15 })} /></Field>
        </Section>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={save} className="px-4 py-2 bg-caa-navy text-white text-sm font-semibold rounded-md">Save</button>
        <button onClick={() => setDraft({ ...settings })} className="px-4 py-2 border border-caa-border text-sm rounded-md inline-flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5" /> Reset</button>
        {saved && <span className="text-sm text-caa-success flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Saved</span>}
      </div>
    </div>
  );
}

// ─── Permissions ──────────────────────────────────────────────────────────────

const PERM_FIELDS: { key: keyof PermissionOverride; label: string }[] = [
  { key: "canViewApplications", label: "View Applications & CVs" },
  { key: "canShortlist",        label: "Shortlist / Decline Candidates" },
  { key: "canManageJobs",       label: "Manage Job Listings" },
  { key: "canManageCriteria",   label: "Set Screening Criteria" },
  { key: "canViewStaff",        label: "View Internal Staff" },
  { key: "canExport",           label: "Export Reports (PDF)" },
  { key: "canViewAudit",        label: "View Audit Log" },
  { key: "canManageSettings",   label: "Manage Portal Settings" },
  { key: "canGrantPermissions", label: "Grant Permissions (super only)" },
];

const ROLE_DEFAULTS_PERMS: Record<AdminRole, Partial<PermissionOverride>> = {
  super: { canViewApplications: true, canShortlist: true, canManageJobs: true, canManageCriteria: true, canViewStaff: true, canExport: true, canViewAudit: true, canManageSettings: true, canGrantPermissions: true },
  hr: { canViewApplications: true, canShortlist: true, canManageJobs: true, canManageCriteria: true, canViewStaff: true, canExport: true, canViewAudit: false, canManageSettings: false, canGrantPermissions: false },
  recruiter: { canViewApplications: true, canShortlist: true, canManageJobs: false, canManageCriteria: true, canViewStaff: false, canExport: false, canViewAudit: false, canManageSettings: false, canGrantPermissions: false },
};

function PermissionsTab({ overrides, save, logAction }: { overrides: PermissionOverride[]; save: (p: PermissionOverride) => void; logAction: any }) {
  const adminUsers = Object.entries(HR_USERS).map(([email, u]) => ({ email, ...u }));
  const [selectedEmail, setSelectedEmail] = useState(adminUsers[0]?.email ?? "");
  const selected = adminUsers.find((u) => u.email === selectedEmail);
  const existing = overrides.find((o) => o.email === selectedEmail);
  const defaults = ROLE_DEFAULTS_PERMS[selected?.role ?? "hr"];
  const [draft, setDraft] = useState<Partial<PermissionOverride>>(existing ?? defaults ?? {});

  const handleUserChange = (email: string) => {
    setSelectedEmail(email);
    const u = adminUsers.find((x) => x.email === email);
    const ex = overrides.find((o) => o.email === email);
    setDraft(ex ?? ROLE_DEFAULTS_PERMS[u?.role ?? "hr"] ?? {});
  };

  const savePerms = () => {
    if (!selected) return;
    save({ email: selectedEmail, role: selected.role, ...draft } as PermissionOverride);
    logAction("Updated permissions", `${selected.firstName} ${selected.lastName} (${selected.role})`);
  };

  return (
    <div className="space-y-4 max-w-lg">
      <div><h1 className="font-bold text-xl text-caa-body">Permissions</h1><p className="text-xs text-caa-muted mt-0.5">Override default role permissions for individual HR users.</p></div>
      <Field label="Select HR user">
        <select className={fi} value={selectedEmail} onChange={(e) => handleUserChange(e.target.value)}>
          {adminUsers.map((u) => <option key={u.email} value={u.email}>{u.firstName} {u.lastName} ({u.role}) — {u.email}</option>)}
        </select>
      </Field>
      <div className="caa-card p-4 space-y-2">
        {PERM_FIELDS.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between py-1.5 border-b border-caa-border last:border-0">
            <label className="text-sm text-caa-body">{label}</label>
            <input type="checkbox" checked={!!(draft as any)[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.checked })} />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button onClick={savePerms} className="px-4 py-2 bg-caa-navy text-white text-sm font-semibold rounded-md">Save permissions</button>
        <button onClick={() => setDraft(ROLE_DEFAULTS_PERMS[selected?.role ?? "hr"] ?? {})} className="px-4 py-2 border border-caa-border text-sm rounded-md">Reset to defaults</button>
      </div>
      <p className="text-[11px] text-caa-muted flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Permissions take effect on next sign-in.</p>
    </div>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

const fi = "w-full px-2.5 py-1.5 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy bg-white";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-medium text-caa-body mb-1">{label}</label>{children}</div>;
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><p className="text-[11px] font-semibold uppercase tracking-widest text-caa-navy mb-3 pb-2 border-b border-caa-border">{title}</p><div className="space-y-3">{children}</div></div>;
}
