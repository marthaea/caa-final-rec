import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp, b as Route$1, H as HR_USERS, c as canAccess, d as APPLICATION_STATUSES, C as CAA_STAFF } from "./router-B9-5xq1U.mjs";
import { D as DEPARTMENTS, E as EMPLOYMENT_TYPES, S as SALARY_BANDS, Q as QUAL_LEVELS } from "./uganda-curriculum-C3JvhMmt.mjs";
import { j as jsPDF } from "../_libs/jspdf.mjs";
import { a as autoTable } from "../_libs/jspdf-autotable.mjs";
import { e as LayoutDashboard, B as Briefcase, F as FileText, s as GraduationCap, t as Users, N as Download, O as Funnel, Q as ClipboardList, R as Settings, L as Lock, q as Bell, c as ChevronRight, o as ShieldCheck, V as Printer, W as Archive, J as Plus, v as Pencil, K as Trash2, p as Eye, Y as FileDown, d as CircleCheck, Z as TrendingUp, _ as RefreshCw, n as CircleAlert, $ as CircleX } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, P as PieChart, a as Pie, C as Cell, T as Tooltip, B as BarChart, b as CartesianGrid, X as XAxis, Y as YAxis, c as Bar, L as LineChart, d as Line } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const CAA_LOGO_BASE64 = "data:image/jpeg;base64,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";
const NAVY = [13, 36, 84];
const ACCENT = [201, 162, 39];
function header(doc, title, subtitle) {
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, "F");
  try {
    doc.addImage(CAA_LOGO_BASE64, "JPEG", 10, 8, 22, 22);
  } catch {
  }
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("UGANDA CIVIL AVIATION AUTHORITY", 36, 17);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text("Entebbe International Airport  |  P.O. Box 5536, Kampala, Uganda", 36, 23);
  doc.text("Tel: +256 312 352 000  |  aviation@caa.co.ug  |  www.caa.co.ug", 36, 28);
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.8);
  doc.line(10, 33, 200, 33);
  doc.setFillColor(...ACCENT);
  doc.rect(10, 33.8, 190, 0.4, "F");
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Our Ref: UCAA/HR/PORTAL", 10, 40);
  doc.text((/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }), 200, 40, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...NAVY);
  doc.text(title.toUpperCase(), 10, 50);
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.3);
  doc.line(10, 52, Math.min(10 + doc.getTextWidth(title.toUpperCase()), 200), 52);
  if (subtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(subtitle, 10, 58);
  }
}
function footer(doc, actor) {
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.5);
    doc.line(10, 283, 200, 283);
    doc.setFontSize(7.5);
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "normal");
    doc.text("Uganda Civil Aviation Authority — Confidential HR Document. Not for external distribution.", 10, 287);
    doc.text(`Generated by ${actor}`, 10, 291);
    doc.text(`Page ${i} of ${pages}`, 200, 291, { align: "right" });
  }
}
function downloadJobsReport(jobs, actor) {
  const doc = new jsPDF();
  header(doc, "Vacancies Report", `${jobs.length} listings as at ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`);
  autoTable(doc, {
    startY: 65,
    head: [["#", "Title", "Department", "Band", "Visibility", "Closes", "Min Age", "Exp (yrs)"]],
    body: jobs.map((j) => [j.id, j.title, j.dept, j.salaryBand, j.visibility, j.closes, j.minAge, j.requiredExperience]),
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 8.5, cellPadding: 2.5 },
    alternateRowStyles: { fillColor: [245, 247, 250] }
  });
  footer(doc, actor);
  doc.save(`caa-vacancies-${Date.now()}.pdf`);
}
function downloadApplicationsReport(apps, jobs, actor, title = "Applications Report") {
  const doc = new jsPDF();
  const byStatus = {};
  apps.forEach((a) => byStatus[a.status] = (byStatus[a.status] ?? 0) + 1);
  header(doc, title, `${apps.length} applications across ${new Set(apps.map((a) => a.jobId)).size} vacancies`);
  autoTable(doc, {
    startY: 65,
    head: [["Status", "Count"]],
    body: Object.entries(byStatus).map(([s, n]) => [s, n]),
    headStyles: { fillColor: NAVY, textColor: 255 },
    styles: { fontSize: 9, cellPadding: 2.5 },
    tableWidth: 80
  });
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 8,
    head: [["#", "Candidate", "Email", "Role", "Department", "Submitted", "Status"]],
    body: apps.map((a) => {
      const job = jobs.find((j) => j.id === a.jobId);
      return [a.id, a.candidateName ?? "—", a.candidateEmail ?? "—", a.title, job?.dept ?? a.dept, a.date, a.status];
    }),
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 8, cellPadding: 2 },
    alternateRowStyles: { fillColor: [245, 247, 250] }
  });
  footer(doc, actor);
  doc.save(`caa-applications-${Date.now()}.pdf`);
}
function downloadDepartmentSummary(jobs, apps, actor) {
  const doc = new jsPDF();
  header(doc, "Departmental Recruitment Summary", "Active listings and pipeline by department");
  const depts = Array.from(new Set(jobs.map((j) => j.dept)));
  const rows = depts.map((d) => {
    const dJobs = jobs.filter((j) => j.dept === d);
    const dApps = apps.filter((a) => dJobs.some((j) => j.id === a.jobId));
    return [d, dJobs.length, dApps.length, dApps.filter((a) => a.status === "Shortlisted").length, dApps.filter((a) => a.status === "Hired").length];
  });
  autoTable(doc, {
    startY: 65,
    head: [["Department", "Listings", "Applications", "Shortlisted", "Hired"]],
    body: rows,
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 9, cellPadding: 3 },
    alternateRowStyles: { fillColor: [245, 247, 250] }
  });
  footer(doc, actor);
  doc.save(`caa-dept-summary-${Date.now()}.pdf`);
}
function downloadAuditLog(audit, actor) {
  const doc = new jsPDF();
  header(doc, "Admin Audit Log", `${audit.length} most recent actions`);
  autoTable(doc, {
    startY: 65,
    head: [["Timestamp", "Actor", "Role", "Action", "Target"]],
    body: audit.map((e) => [new Date(e.at).toLocaleString(), e.actor, e.role, e.action, e.target ?? ""]),
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 8, cellPadding: 2 },
    alternateRowStyles: { fillColor: [245, 247, 250] }
  });
  footer(doc, actor);
  doc.save(`caa-audit-${Date.now()}.pdf`);
}
function downloadInternsReport(apps, jobs, actor) {
  const doc = new jsPDF();
  const sorted = [...apps].filter((a) => a.cgpa !== void 0).sort((a, b) => (b.cgpa ?? 0) - (a.cgpa ?? 0));
  header(doc, "Intern Applications — CGPA Ranking", `${sorted.length} applications ranked by academic performance`);
  autoTable(doc, {
    startY: 65,
    head: [["Rank", "Candidate", "Email", "Position", "CGPA", "University", "Status", "Submitted"]],
    body: sorted.map((a, i) => {
      const job = jobs.find((j) => j.id === a.jobId);
      return [i + 1, a.candidateName ?? "—", a.candidateEmail ?? "—", job?.title ?? a.title, a.cgpa?.toFixed(1) ?? "—", a.university ?? "—", a.status, a.date];
    }),
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 8, cellPadding: 2 },
    alternateRowStyles: { fillColor: [245, 247, 250] }
  });
  footer(doc, actor);
  doc.save(`caa-interns-cgpa-${Date.now()}.pdf`);
}
function downloadStaffReport(staff, actor) {
  const doc = new jsPDF();
  header(doc, "Internal Staff Register", `${staff.length} verified CAA staff records`);
  autoTable(doc, {
    startY: 65,
    head: [["Emp No.", "Full Name", "Department", "Position", "Email", "Joined", "Status"]],
    body: staff.map((s) => [s.empNo, `${s.firstName} ${s.lastName}`, s.dept, s.position, s.email, s.joined, s.status]),
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 8, cellPadding: 2 },
    alternateRowStyles: { fillColor: [245, 247, 250] }
  });
  footer(doc, actor);
  doc.save(`caa-staff-register-${Date.now()}.pdf`);
}
const DEPT_LIST = ["Air Traffic Mgmt", "Aviation Safety", "Finance & Admin", "ICT & Systems", "Legal", "Operations", "Human Resources", "Procurement", "Engineering", "Communications"];
const POSITIONS = ["Director", "Manager", "Senior Officer", "Officer", "Analyst", "Coordinator", "Specialist", "Assistant"];
const STAFF_DATA = Object.entries(CAA_STAFF).map(([empNo, {
  firstName,
  lastName
}], i) => ({
  empNo,
  firstName,
  lastName,
  dept: DEPT_LIST[i % DEPT_LIST.length],
  position: POSITIONS[i % POSITIONS.length],
  email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@caa.co.ug`,
  joined: `${2014 + i % 9}-${String(i % 12 + 1).padStart(2, "0")}-${String(i % 28 + 1).padStart(2, "0")}`,
  status: "Active"
}));
const STATUS_COLORS = {
  Pending: "#f59e0b",
  "Under Review": "#3b82f6",
  Shortlisted: "#10b981",
  Interview: "#8b5cf6",
  Offered: "#0d9488",
  Hired: "#059669",
  Declined: "#ef4444"
};
const ALL_NAV = [{
  key: "dashboard",
  label: "Dashboard",
  Icon: LayoutDashboard,
  perm: null
}, {
  key: "jobs",
  label: "Job Listings",
  Icon: Briefcase,
  perm: "canManageJobs"
}, {
  key: "apps",
  label: "Applications",
  Icon: FileText,
  perm: "canViewApplications"
}, {
  key: "interns",
  label: "Interns (CGPA)",
  Icon: GraduationCap,
  perm: "canViewApplications"
}, {
  key: "staff",
  label: "Internal Staff",
  Icon: Users,
  perm: "canViewStaff"
}, {
  key: "reports",
  label: "Reports & Exports",
  Icon: Download,
  perm: "canExport"
}, {
  key: "criteria",
  label: "Criteria Setup",
  Icon: Funnel,
  perm: "canManageCriteria"
}, {
  key: "audit",
  label: "Audit Log",
  Icon: ClipboardList,
  perm: "canViewAudit"
}, {
  key: "settings",
  label: "Settings",
  Icon: Settings,
  perm: "canManageSettings"
}, {
  key: "permissions",
  label: "Permissions",
  Icon: Lock,
  perm: "canGrantPermissions"
}];
function AdminPage() {
  const {
    auth,
    signIn,
    jobs,
    addJob,
    updateJob,
    deleteJob,
    isExpired,
    applications,
    pushToast,
    audit,
    settings,
    updateSettings,
    logAction,
    updateApplicationStatus,
    notifications,
    criteria,
    saveCriteria,
    permissionOverrides,
    savePermissionOverride,
    cvStore
  } = useApp();
  const {
    tab = auth.accountType === "admin" ? "dashboard" : "login",
    jobId
  } = Route$1.useSearch();
  const navigate = useNavigate();
  if (auth.accountType !== "admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLogin, { onLogin: (email, pw) => {
      const key = email.trim().toLowerCase();
      const rec = HR_USERS[key];
      if (!rec || rec.password !== pw) {
        pushToast({
          type: "warning",
          title: "Invalid credentials",
          message: `Demo logins listed below`
        });
        return;
      }
      signIn(rec.firstName, rec.lastName, key, {
        accountType: "admin",
        adminRole: rec.role
      });
      navigate({
        to: "/admin",
        search: {
          tab: "dashboard"
        }
      });
    } });
  }
  const role = auth.adminRole ?? "hr";
  const perms = permissionOverrides;
  const go = (t) => navigate({
    to: "/admin",
    search: {
      tab: t
    }
  });
  const actor = `${auth.firstName} ${auth.lastName}`;
  const visibleNav = ALL_NAV.filter(({
    perm
  }) => perm === null || canAccess(role, perm, perms));
  const unreadCount = notifications.filter((n) => n.recipientEmail === auth.email && !n.read).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[calc(100vh-108px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-56 bg-caa-navy shrink-0 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 border-b border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50", children: "HR Console" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-white mt-0.5", children: [
          auth.firstName,
          " ",
          auth.lastName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-1 inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${role === "super" ? "bg-yellow-400/20 text-yellow-300" : role === "hr" ? "bg-blue-400/20 text-blue-300" : "bg-green-400/20 text-green-300"}`, children: role === "super" ? "Super Admin" : role === "hr" ? "HR Director" : "Recruiter" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 py-2", children: visibleNav.map(({
        key,
        label,
        Icon
      }) => {
        const active = tab === key;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => go(key), className: `w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors text-left ${active ? "bg-white/15 text-white" : "text-white/65 hover:bg-white/8 hover:text-white"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 shrink-0" }),
          " ",
          label
        ] }, key);
      }) }),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-3 mb-3 px-3 py-2.5 bg-caa-warning/15 border border-caa-warning/30 rounded-lg flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5 text-caa-warning shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-caa-warning font-medium", children: [
          unreadCount,
          " unread alert",
          unreadCount > 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-4 border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "text-white/50 text-[11px] hover:text-white transition-colors flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 rotate-180" }),
        " Back to portal"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-caa-surface overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6 max-w-5xl", children: [
      tab === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardTab, { jobs, applications, isExpired, navigate, role }),
      tab === "jobs" && canAccess(role, "canManageJobs", perms) && /* @__PURE__ */ jsxRuntimeExports.jsx(JobsTab, { jobs, isExpired, addJob, updateJob, deleteJob, onViewApps: (id) => navigate({
        to: "/admin",
        search: {
          tab: "apps",
          jobId: id
        }
      }) }),
      tab === "apps" && canAccess(role, "canViewApplications", perms) && /* @__PURE__ */ jsxRuntimeExports.jsx(AppsTab, { jobs, applications, jobId, cvStore, updateStatus: updateApplicationStatus, logAction, actor, criteria, role, perms }),
      tab === "interns" && canAccess(role, "canViewApplications", perms) && /* @__PURE__ */ jsxRuntimeExports.jsx(InternsTab, { applications, jobs, actor }),
      tab === "staff" && canAccess(role, "canViewStaff", perms) && /* @__PURE__ */ jsxRuntimeExports.jsx(StaffTab, { actor, logAction }),
      tab === "reports" && canAccess(role, "canExport", perms) && /* @__PURE__ */ jsxRuntimeExports.jsx(ReportsTab, { jobs, applications, audit, actor }),
      tab === "criteria" && canAccess(role, "canManageCriteria", perms) && /* @__PURE__ */ jsxRuntimeExports.jsx(CriteriaTab, { jobs, criteria, saveCriteria, logAction }),
      tab === "audit" && canAccess(role, "canViewAudit", perms) && /* @__PURE__ */ jsxRuntimeExports.jsx(AuditTab, { audit, actor }),
      tab === "settings" && canAccess(role, "canManageSettings", perms) && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsTab, { settings, updateSettings, logAction }),
      tab === "permissions" && canAccess(role, "canGrantPermissions", perms) && /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionsTab, { overrides: permissionOverrides, save: savePermissionOverride, logAction }),
      tab !== "dashboard" && tab !== "login" && !visibleNav.find((n) => n.key === tab) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-10 w-10 text-caa-muted mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg text-caa-body", children: "Access restricted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-caa-muted mt-1", children: "Your role does not have permission to view this section." })
      ] })
    ] }) })
  ] });
}
function AdminLogin({
  onLogin
}) {
  const [email, setEmail] = reactExports.useState("");
  const [pw, setPw] = reactExports.useState("");
  const demoUsers = Object.entries(HR_USERS).map(([e, u]) => ({
    email: e,
    name: `${u.firstName} ${u.lastName}`,
    role: u.role,
    pw: u.password
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      onLogin(email, pw);
    }, className: "caa-card p-6 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-caa-navy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-lg", children: "HR Console sign in" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted", children: "Protected portal. CAA HR staff only." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-caa-body mb-1", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "user@caa.co.ug", className: "w-full px-3 py-2 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-caa-body mb-1", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: pw, onChange: (e) => setPw(e.target.value), className: "w-full px-3 py-2 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full py-2 bg-caa-navy text-white font-semibold rounded-md hover:bg-caa-navy-2 text-sm", children: "Sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "block text-center text-xs text-caa-muted hover:text-caa-navy", children: "← Candidate sign in" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-caa-navy mb-3", children: "Demo accounts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: demoUsers.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onLogin(u.email, u.pw), className: "w-full text-left px-3 py-2 rounded-md bg-caa-surface hover:bg-caa-navy/5 border border-caa-border transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-caa-body", children: u.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-caa-muted", children: u.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${u.role === "super" ? "bg-yellow-100 text-yellow-700" : u.role === "hr" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`, children: u.role })
      ] }) }, u.email)) })
    ] })
  ] }) });
}
function DashboardTab({
  jobs,
  applications,
  isExpired,
  navigate
}) {
  const activeJobs = jobs.filter((j) => !isExpired(j));
  const printRef = reactExports.useRef(null);
  const statusData = Object.entries(applications.reduce((acc, a) => ({
    ...acc,
    [a.status]: (acc[a.status] ?? 0) + 1
  }), {})).map(([name, value]) => ({
    name,
    value
  }));
  const deptData = Array.from(new Set(jobs.map((j) => j.dept))).map((dept) => ({
    dept: dept.split(" ")[0],
    full: dept,
    apps: applications.filter((a) => a.dept === dept).length
  }));
  const trend = [{
    month: "Feb",
    apps: 3
  }, {
    month: "Mar",
    apps: 7
  }, {
    month: "Apr",
    apps: 5
  }, {
    month: "May",
    apps: 12
  }, {
    month: "Jun",
    apps: applications.length
  }];
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
    w.document.write(`<h1>UGANDA CIVIL AVIATION AUTHORITY</h1><p>Recruitment Dashboard — ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</p>`);
    w.document.write(el.innerHTML);
    w.document.write("</body></html>");
    w.document.close();
    w.print();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl text-caa-body", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: printCharts, className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-caa-border rounded-md hover:border-caa-navy text-caa-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
        " Print charts"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [{
      Icon: Briefcase,
      label: "Active Listings",
      n: activeJobs.length,
      color: "text-caa-navy",
      tab: "jobs"
    }, {
      Icon: Users,
      label: "Total Applications",
      n: applications.length,
      color: "text-caa-navy-2",
      tab: "apps"
    }, {
      Icon: GraduationCap,
      label: "Intern Applications",
      n: applications.filter((a) => a.cgpa !== void 0).length,
      color: "text-caa-success",
      tab: "interns"
    }, {
      Icon: Archive,
      label: "Expired Listings",
      n: jobs.filter(isExpired).length,
      color: "text-caa-danger",
      tab: "jobs"
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
      to: "/admin",
      search: {
        tab: s.tab
      }
    }), className: "caa-card p-4 text-left hover:shadow-md transition-shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(s.Icon, { className: "h-5 w-5 text-caa-navy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-caa-muted mt-3", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-bold text-3xl mt-1 ${s.color}`, children: s.n })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: printRef, className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-caa-navy mb-4", children: "Applications by Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: statusData, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 75, label: ({
            name,
            value
          }) => `${name}: ${value}`, labelLine: false, children: statusData.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: Object.values(STATUS_COLORS)[i % 7] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-caa-navy mb-4", children: "Applications by Department" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: deptData, margin: {
          left: -20
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "dept", tick: {
            fontSize: 10
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 10
          }, allowDecimals: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v, _, {
            payload
          }) => [v, payload?.full] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "apps", fill: "#0d2454", radius: [3, 3, 0, 0] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-4 md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-caa-navy mb-4", children: "Application Trend (2026)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: trend, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 11
          }, allowDecimals: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "apps", stroke: "#1565C0", strokeWidth: 2, dot: {
            fill: "#1565C0",
            r: 4
          } })
        ] }) })
      ] })
    ] })
  ] });
}
const emptyJob = {
  title: "",
  dept: DEPARTMENTS[0].label,
  deptKey: DEPARTMENTS[0].key,
  location: "Kampala HQ",
  salary: "UGX 2.0M–3.0M",
  salaryBand: "UG5",
  type: "Full-time",
  closes: "",
  closesAt: "",
  visibility: "external",
  minAge: 21,
  requiredExperience: 2,
  requiredQualification: "Degree",
  description: ""
};
function JobsTab({
  jobs,
  isExpired,
  addJob,
  updateJob,
  deleteJob,
  onViewApps
}) {
  const [editing, setEditing] = reactExports.useState(null);
  const open = (j) => setEditing(j ? {
    ...j
  } : {
    ...emptyJob
  });
  const save = () => {
    if (!editing || !editing.title.trim() || !editing.closesAt) return;
    const closes = new Date(editing.closesAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    const payload = {
      ...editing,
      closes
    };
    if (editing.id) updateJob(editing.id, payload);
    else addJob(payload);
    setEditing(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl text-caa-body", children: "Job Listings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => open(), className: "px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md hover:bg-caa-navy-2 inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New listing"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-caa-surface text-xs text-caa-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Visibility" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Band" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Closes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-caa-border", children: jobs.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-caa-body", children: j.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-caa-muted", children: j.dept })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-semibold ${j.visibility === "internal" ? "bg-caa-navy-2/15 text-caa-navy-2" : "bg-caa-success/10 text-caa-success"}`, children: j.visibility }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs", children: j.salaryBand }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs", children: j.closes }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: isExpired(j) ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-caa-danger/10 text-caa-danger text-[10px]", children: "Expired" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-caa-success/10 text-caa-success text-[10px]", children: "Active" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-right space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onViewApps(j.id), className: "text-xs text-caa-navy hover:underline", children: "Apps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => open(j), className: "text-xs text-caa-navy hover:underline inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
            "Edit"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => deleteJob(j.id), className: "text-xs text-caa-danger hover:underline inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
            "Del"
          ] })
        ] })
      ] }, j.id)) })
    ] }) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-5 max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-4", children: editing.id ? "Edit listing" : "New job listing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fi, value: editing.title, onChange: (e) => setEditing({
          ...editing,
          title: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Department", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: fi, value: editing.deptKey, onChange: (e) => {
          const d = DEPARTMENTS.find((x) => x.key === e.target.value);
          setEditing({
            ...editing,
            deptKey: d.key,
            dept: d.label
          });
        }, children: DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.key, children: d.label }, d.key)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Location", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fi, value: editing.location, onChange: (e) => setEditing({
          ...editing,
          location: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Type", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: fi, value: editing.type, onChange: (e) => setEditing({
          ...editing,
          type: e.target.value
        }), children: EMPLOYMENT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t }, t)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Salary range", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fi, value: editing.salary, onChange: (e) => setEditing({
          ...editing,
          salary: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Band", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: fi, value: editing.salaryBand, onChange: (e) => setEditing({
          ...editing,
          salaryBand: e.target.value
        }), children: SALARY_BANDS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: b }, b)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Visibility", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: fi, value: editing.visibility, onChange: (e) => setEditing({
          ...editing,
          visibility: e.target.value
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "external", children: "External" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "internal", children: "Internal (staff only)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Deadline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", className: fi, value: editing.closesAt, onChange: (e) => setEditing({
          ...editing,
          closesAt: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Min age", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: fi, value: editing.minAge, onChange: (e) => setEditing({
          ...editing,
          minAge: parseInt(e.target.value) || 18
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Experience (yrs)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: fi, value: editing.requiredExperience, onChange: (e) => setEditing({
          ...editing,
          requiredExperience: parseInt(e.target.value) || 0
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Qualification", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: fi, value: editing.requiredQualification, onChange: (e) => setEditing({
          ...editing,
          requiredQualification: e.target.value
        }), children: QUAL_LEVELS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: q }, q)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, className: fi, value: editing.description ?? "", onChange: (e) => setEditing({
          ...editing,
          description: e.target.value
        }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "px-3 py-1.5 text-sm border border-caa-border rounded-md", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md", children: editing.id ? "Save changes" : "Create listing" })
      ] })
    ] }) })
  ] });
}
const QUAL_ORDER = {
  "O-Level": 0,
  "A-Level": 1,
  Certificate: 2,
  Diploma: 3,
  Degree: 4,
  Masters: 5,
  PhD: 6
};
function autoQualify(app, job, cv, jobCriteria) {
  if (!job) return {
    ok: false,
    checks: []
  };
  const checks = [];
  if (cv?.personal?.dob) {
    const age = Math.floor((Date.now() - new Date(cv.personal.dob).getTime()) / (365.25 * 24 * 3600 * 1e3));
    checks.push({
      label: "Age",
      pass: age >= job.minAge,
      detail: `Age ${age} vs min ${job.minAge}`
    });
  } else {
    checks.push({
      label: "Age",
      pass: false,
      detail: "Date of birth not on file"
    });
  }
  const highestQual = cv?.highestLevel || cv?.qualifications?.[0]?.level || "";
  const qualOk = (QUAL_ORDER[highestQual] ?? -1) >= (QUAL_ORDER[job.requiredQualification] ?? 0);
  checks.push({
    label: "Qualification",
    pass: qualOk,
    detail: `${highestQual || "Unknown"} vs required ${job.requiredQualification}`
  });
  const expYears = cv?.experience?.length ? cv.experience.reduce((sum, e) => {
    if (!e.start || !e.end) return sum + 1;
    const y = Math.max(0, new Date(e.end).getFullYear() - new Date(e.start).getFullYear());
    return sum + y;
  }, 0) : 0;
  checks.push({
    label: "Experience",
    pass: expYears >= job.requiredExperience,
    detail: `~${expYears} yr(s) vs required ${job.requiredExperience}`
  });
  if (jobCriteria?.minCgpa !== void 0 && app.cgpa !== void 0) {
    checks.push({
      label: "CGPA",
      pass: app.cgpa >= jobCriteria.minCgpa,
      detail: `${app.cgpa.toFixed(1)} vs min ${jobCriteria.minCgpa.toFixed(1)}`
    });
  }
  if (jobCriteria?.requiredKeywords?.length) {
    const cvText = JSON.stringify(cv || {}).toLowerCase();
    const missing = jobCriteria.requiredKeywords.filter((k) => !cvText.includes(k.toLowerCase()));
    checks.push({
      label: "Keywords",
      pass: missing.length === 0,
      detail: missing.length === 0 ? "All matched" : `Missing: ${missing.join(", ")}`
    });
  }
  return {
    ok: checks.length > 0 && checks.every((c) => c.pass),
    checks
  };
}
function AppsTab({
  jobs,
  applications,
  jobId,
  cvStore,
  updateStatus,
  logAction,
  actor,
  criteria,
  role,
  perms
}) {
  const filtered = jobId ? applications.filter((a) => a.jobId === jobId) : applications;
  const job = jobs.find((j) => j.id === jobId);
  const [selected, setSelected] = reactExports.useState(null);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const displayed = statusFilter === "all" ? filtered : filtered.filter((a) => a.status === statusFilter);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl text-caa-body", children: job ? `Applications — ${job.title}` : "All Applications" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["all", ...APPLICATION_STATUSES].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStatusFilter(s), className: `px-3 py-1 text-[11px] rounded-full font-semibold transition-colors border ${statusFilter === s ? "bg-caa-navy text-white border-caa-navy" : "border-caa-border text-caa-muted hover:border-caa-navy"}`, children: s === "all" ? "All" : s }, s)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-caa-surface text-xs text-caa-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Candidate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Submitted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Completion" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-caa-border", children: [
        displayed.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-caa-surface/50 cursor-pointer", onClick: () => setSelected(a), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-caa-body", children: a.candidateName ?? "Candidate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-caa-muted", children: a.candidateEmail ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs text-caa-muted", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs", children: a.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] px-2 py-0.5 rounded-full font-semibold", style: {
            background: (STATUS_COLORS[a.status] ?? "#999") + "20",
            color: STATUS_COLORS[a.status] ?? "#999"
          }, children: a.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1.5 bg-caa-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-caa-navy rounded-full", style: {
              width: `${a.completion}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-caa-muted", children: [
              a.completion,
              "%"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(a), className: "text-xs text-caa-navy hover:underline inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
            " View CV"
          ] }) })
        ] }, a.id)),
        displayed.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-6 text-center text-xs text-caa-muted", children: "No applications found." }) })
      ] })
    ] }) }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(AppDetailModal, { app: selected, job: jobs.find((j) => j.id === selected.jobId), cv: cvStore[selected.candidateEmail?.toLowerCase() ?? ""], criteria: criteria.find((c) => c.jobId === selected.jobId), canShortlist: canAccess(role, "canShortlist", perms), onClose: () => setSelected(null), onUpdateStatus: (status, msg) => {
      updateStatus(selected.id, status, selected.candidateEmail, msg);
      logAction(`Set application #${selected.id} to ${status}`, selected.candidateName ?? selected.candidateEmail);
      setSelected((prev) => prev ? {
        ...prev,
        status
      } : null);
    }, actor })
  ] });
}
function AppDetailModal({
  app,
  job,
  cv,
  criteria,
  canShortlist,
  onClose,
  onUpdateStatus
}) {
  const [confirmStatus, setConfirmStatus] = reactExports.useState(null);
  const [notifMsg, setNotifMsg] = reactExports.useState("");
  const {
    ok,
    checks
  } = reactExports.useMemo(() => autoQualify(app, job, cv, criteria), [app, job, cv, criteria]);
  const actionButtons = [{
    status: "Shortlisted",
    label: "Shortlist",
    color: "bg-caa-success text-white",
    defaultMsg: `Congratulations! Your application for ${app.title} has been shortlisted. You will be contacted shortly with further details.`
  }, {
    status: "Interview",
    label: "Invite Interview",
    color: "bg-purple-600 text-white",
    defaultMsg: `Your application for ${app.title} has progressed to the interview stage. Our HR team will contact you to schedule a date and time.`
  }, {
    status: "Offered",
    label: "Make Offer",
    color: "bg-teal-600 text-white",
    defaultMsg: `We are pleased to offer you the position of ${app.title}. Please expect a formal offer letter shortly.`
  }, {
    status: "Declined",
    label: "Decline",
    color: "bg-caa-danger text-white",
    defaultMsg: `Thank you for your interest in the ${app.title} position. After careful consideration, we regret to inform you that your application has not been successful on this occasion.`
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card w-full max-w-3xl max-h-[92vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between p-5 border-b border-caa-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg text-caa-body", children: app.candidateName ?? "Candidate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-caa-muted mt-0.5", children: [
          app.title,
          " · Submitted ",
          app.date
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] px-2 py-0.5 rounded-full font-semibold", style: {
          background: (STATUS_COLORS[app.status] ?? "#999") + "20",
          color: STATUS_COLORS[app.status] ?? "#999"
        }, children: app.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-caa-muted hover:text-caa-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg p-4 border ${ok ? "border-caa-success/30 bg-caa-success/5" : "border-caa-danger/30 bg-caa-danger/5"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-caa-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-5 w-5 text-caa-danger" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold text-sm ${ok ? "text-caa-success" : "text-caa-danger"}`, children: ok ? "Applicant meets requirements" : "One or more requirements not met" })
        ] }),
        checks.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: checks.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-2.5 py-1.5 rounded-md text-[11px] border ${c.pass ? "border-caa-success/20 bg-white" : "border-caa-danger/20 bg-white"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-semibold ${c.pass ? "text-caa-success" : "text-caa-danger"}`, children: [
            c.pass ? "✓" : "✗",
            " ",
            c.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caa-muted mt-0.5", children: c.detail })
        ] }, c.label)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted", children: "CV data not yet available — candidate hasn't submitted their CV through this portal. Analysis cannot run." })
      ] }),
      cv ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-widest text-caa-navy", children: "Candidate CV" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-6 gap-y-1 text-sm", children: [["Full name", `${cv.personal.firstName} ${cv.personal.otherName ?? ""} ${cv.personal.lastName}`.trim()], ["Email", cv.personal.email || app.candidateEmail], ["Phone", cv.personal.phone || "—"], ["Date of birth", cv.personal.dob || "—"], ["Gender", cv.personal.gender || "—"], ["Nationality", cv.personal.nationality || "—"], ["NIN", cv.personal.nin || "—"], ["Address", cv.personal.address || "—"]].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-caa-muted text-xs", children: [
            label,
            ":"
          ] }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-caa-body", children: value })
        ] }, label)) }),
        cv.qualifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-caa-navy mb-1", children: "Qualifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: cv.qualifications.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-caa-body", children: [
            q.level,
            " — ",
            q.course || q.school,
            " (",
            q.institution || q.school,
            ", ",
            q.year,
            ")"
          ] }, i)) })
        ] }),
        cv.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-caa-navy mb-1", children: "Experience" }),
          cv.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-caa-body", children: [
            e.title,
            " at ",
            e.organisation,
            " (",
            e.start,
            "–",
            e.end,
            ")"
          ] }, i))
        ] }),
        cv.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-caa-navy mb-1", children: "Skills" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-body", children: cv.skills.join(" · ") })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-caa-border p-4 text-sm text-caa-muted text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 mx-auto mb-2 text-caa-muted/50" }),
        "CV not on file — candidate applied before completing their portal profile, or the CV was submitted in a different session."
      ] }),
      canShortlist && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-caa-navy mb-2", children: "Update status & notify candidate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: actionButtons.map((btn) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: app.status === btn.status, onClick: () => {
          setConfirmStatus(btn.status);
          setNotifMsg(btn.defaultMsg);
        }, className: `px-3 py-1.5 text-xs font-semibold rounded-md disabled:opacity-40 transition-opacity ${btn.color}`, children: btn.label }, btn.status)) }),
        confirmStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-caa-border rounded-lg p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-caa-body", children: [
            "Notification to send to ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caa-navy", children: app.candidateEmail }),
            ":"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, className: `${fi} text-xs`, value: notifMsg, onChange: (e) => setNotifMsg(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              onUpdateStatus(confirmStatus, notifMsg);
              setConfirmStatus(null);
            }, className: "px-3 py-1.5 text-xs font-semibold bg-caa-navy text-white rounded-md", children: "Confirm & Send" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfirmStatus(null), className: "px-3 py-1.5 text-xs border border-caa-border rounded-md", children: "Cancel" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function InternsTab({
  applications,
  jobs,
  actor
}) {
  const interns = [...applications].filter((a) => a.cgpa !== void 0).sort((a, b) => (b.cgpa ?? 0) - (a.cgpa ?? 0));
  const cgpaColor = (g) => g >= 4.5 ? "text-caa-success" : g >= 3.5 ? "text-caa-navy" : g >= 3 ? "text-caa-warning" : "text-caa-danger";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl text-caa-body", children: "Interns (CGPA)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted mt-0.5", children: "Ranked by CGPA — highest first" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => downloadInternsReport(interns, jobs, actor), className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" }),
        " Export PDF"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-caa-surface text-xs text-caa-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Rank" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Candidate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "University" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "CGPA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Date" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-caa-border", children: [
        interns.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center justify-center h-6 w-6 rounded-full text-[11px] font-bold ${i === 0 ? "bg-yellow-100 text-yellow-700" : i === 1 ? "bg-gray-100 text-gray-600" : i === 2 ? "bg-orange-100 text-orange-600" : "bg-caa-surface text-caa-muted"}`, children: i + 1 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-caa-body", children: a.candidateName ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-caa-muted", children: a.candidateEmail ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs text-caa-muted", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs", children: a.university ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold text-base ${cgpaColor(a.cgpa ?? 0)}`, children: a.cgpa?.toFixed(1) ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-caa-muted ml-1", children: "/ 5.0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-caa-surface border border-caa-border", children: a.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs text-caa-muted", children: a.date })
        ] }, a.id)),
        interns.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "p-6 text-center text-xs text-caa-muted", children: "No intern applications on record." }) })
      ] })
    ] }) })
  ] });
}
function StaffTab({
  actor,
  logAction
}) {
  const [search, setSearch] = reactExports.useState("");
  const filtered = STAFF_DATA.filter((s) => `${s.firstName} ${s.lastName} ${s.empNo} ${s.dept}`.toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl text-caa-body", children: "Internal Staff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-caa-muted mt-0.5", children: [
          STAFF_DATA.length,
          " verified CAA staff"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        downloadStaffReport(STAFF_DATA, actor);
        logAction("Exported staff register");
      }, className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" }),
        " Export PDF"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search…", className: "w-full px-3 py-2 text-sm border border-caa-border rounded-md bg-white focus:outline-none focus:border-caa-navy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-caa-surface text-xs text-caa-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Emp No." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Department" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Joined" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-caa-border", children: [
        filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-[11px] font-mono text-caa-muted", children: s.empNo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 font-medium text-caa-body", children: [
            s.firstName,
            " ",
            s.lastName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs text-caa-muted", children: s.dept }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs", children: s.position }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs text-caa-muted", children: s.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs", children: s.joined }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-caa-success/10 text-caa-success", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
            s.status
          ] }) })
        ] }, s.empNo)),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "p-6 text-center text-xs text-caa-muted", children: "No staff match your search." }) })
      ] })
    ] }) })
  ] });
}
function ReportsTab({
  jobs,
  applications,
  audit,
  actor
}) {
  const internApps = applications.filter((a) => a.cgpa !== void 0);
  const reports = [{
    title: "Vacancies Report",
    desc: `${jobs.length} job listings`,
    Icon: Briefcase,
    action: () => downloadJobsReport(jobs, actor)
  }, {
    title: "Applications Report",
    desc: `${applications.length} applications across all vacancies`,
    Icon: FileText,
    action: () => downloadApplicationsReport(applications, jobs, actor)
  }, {
    title: "Department Summary",
    desc: "Applications and shortlisted counts by department",
    Icon: TrendingUp,
    action: () => downloadDepartmentSummary(jobs, applications, actor)
  }, {
    title: "Intern CGPA Ranking",
    desc: `${internApps.length} intern applications ranked by CGPA`,
    Icon: GraduationCap,
    action: () => downloadInternsReport(internApps, jobs, actor)
  }, {
    title: "Internal Staff Register",
    desc: `${STAFF_DATA.length} CAA staff records`,
    Icon: Users,
    action: () => downloadStaffReport(STAFF_DATA, actor)
  }, {
    title: "Audit Log",
    desc: `${audit.length} recorded admin actions`,
    Icon: ClipboardList,
    action: () => downloadAuditLog(audit, actor)
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl text-caa-body", children: "Reports & Exports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted mt-0.5", children: "PDFs styled to the UCAA letterhead standard." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: reports.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-4 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-caa-navy/8 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(r.Icon, { className: "h-4.5 w-4.5 text-caa-navy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-caa-body", children: r.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted mt-0.5 leading-relaxed", children: r.desc })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: r.action, className: "self-start inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-caa-navy text-white rounded-md hover:bg-caa-navy-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-3.5 w-3.5" }),
        " Download PDF"
      ] })
    ] }, r.title)) })
  ] });
}
function CriteriaTab({
  jobs,
  criteria,
  saveCriteria,
  logAction
}) {
  const [selectedJobId, setSelectedJobId] = reactExports.useState(jobs[0]?.id ?? 0);
  const existing = criteria.find((c) => c.jobId === selectedJobId);
  const [draft, setDraft] = reactExports.useState({
    minCgpa: existing?.minCgpa,
    requiredKeywords: existing?.requiredKeywords ?? [],
    notes: existing?.notes ?? ""
  });
  const [kw, setKw] = reactExports.useState("");
  const handleJobChange = (id) => {
    setSelectedJobId(id);
    const e = criteria.find((c) => c.jobId === id);
    setDraft({
      minCgpa: e?.minCgpa,
      requiredKeywords: e?.requiredKeywords ?? [],
      notes: e?.notes ?? ""
    });
  };
  const addKw = () => {
    if (kw.trim()) {
      setDraft({
        ...draft,
        requiredKeywords: [...draft.requiredKeywords, kw.trim()]
      });
      setKw("");
    }
  };
  const removeKw = (k) => setDraft({
    ...draft,
    requiredKeywords: draft.requiredKeywords.filter((x) => x !== k)
  });
  const save = () => {
    saveCriteria({
      jobId: selectedJobId,
      ...draft
    });
    logAction("Updated criteria", jobs.find((j) => j.id === selectedJobId)?.title);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl text-caa-body", children: "Criteria Setup" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted mt-0.5", children: "Set screening criteria for automatic qualification checks." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Select position", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: fi, value: selectedJobId, onChange: (e) => handleJobChange(Number(e.target.value)), children: jobs.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: j.id, children: j.title }, j.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Minimum CGPA (internship / graduate roles, leave blank if N/A)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 5, step: 0.1, className: fi, value: draft.minCgpa ?? "", onChange: (e) => setDraft({
        ...draft,
        minCgpa: e.target.value ? parseFloat(e.target.value) : void 0
      }), placeholder: "e.g. 3.5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-caa-body mb-1", children: "Required keywords (CV must contain these)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: `${fi} flex-1`, value: kw, onChange: (e) => setKw(e.target.value), onKeyDown: (e) => e.key === "Enter" && (e.preventDefault(), addKw()), placeholder: "Add keyword…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addKw, className: "px-3 py-1.5 bg-caa-navy text-white text-xs rounded-md", children: "Add" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: draft.requiredKeywords.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-caa-navy/10 text-caa-navy", children: [
          k,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeKw(k), className: "text-caa-navy/60 hover:text-caa-danger", children: "×" })
        ] }, k)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Notes for recruiters", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, className: fi, value: draft.notes, onChange: (e) => setDraft({
        ...draft,
        notes: e.target.value
      }), placeholder: "Optional guidance for the recruiter…" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "px-4 py-2 bg-caa-navy text-white text-sm font-semibold rounded-md", children: "Save criteria" })
    ] })
  ] });
}
function AuditTab({
  audit,
  actor
}) {
  const [filter, setFilter] = reactExports.useState("");
  const rows = audit.filter((e) => !filter || `${e.actor} ${e.action} ${e.target ?? ""} ${e.role}`.toLowerCase().includes(filter.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl text-caa-body", children: "Audit Log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-caa-muted mt-0.5", children: [
          audit.length,
          " actions recorded"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => downloadAuditLog(audit, actor), className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" }),
        " Export PDF"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "Filter…", className: "w-full px-3 py-2 text-sm border border-caa-border rounded-md bg-white focus:outline-none focus:border-caa-navy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-caa-surface text-xs text-caa-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Timestamp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Actor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Action" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3", children: "Target" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-caa-border", children: [
        rows.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-[11px] text-caa-muted whitespace-nowrap", children: new Date(e.at).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs font-medium", children: e.actor }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-caa-navy/10 text-caa-navy font-semibold capitalize", children: e.role }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs", children: e.action }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-xs text-caa-muted", children: e.target ?? "—" })
        ] }, e.id)),
        rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-6 text-center text-xs text-caa-muted", children: audit.length === 0 ? "No actions logged yet." : "No entries match." }) })
      ] })
    ] }) })
  ] });
}
function SettingsTab({
  settings,
  updateSettings,
  logAction
}) {
  const [draft, setDraft] = reactExports.useState({
    ...settings
  });
  const [saved, setSaved] = reactExports.useState(false);
  const save = () => {
    updateSettings(draft);
    logAction("Updated portal settings");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl text-caa-body", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted mt-0.5", children: "Portal-wide configuration." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Organisation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Organisation name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fi, value: draft.orgName, onChange: (e) => setDraft({
        ...draft,
        orgName: e.target.value
      }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Recruitment rules", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Minimum applicant age", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 16, max: 60, className: fi, value: draft.minAgeThreshold, onChange: (e) => setDraft({
          ...draft,
          minAgeThreshold: parseInt(e.target.value) || 18
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "extInt", type: "checkbox", checked: draft.allowExternalInternalJobs, onChange: (e) => setDraft({
            ...draft,
            allowExternalInternalJobs: e.target.checked
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "extInt", className: "text-sm leading-tight", children: "Allow external applicants to see internal-only job listings" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Session", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Auto-logout after inactivity (minutes)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 120, className: fi, value: draft.sessionTimeoutMinutes, onChange: (e) => setDraft({
        ...draft,
        sessionTimeoutMinutes: parseInt(e.target.value) || 15
      }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "px-4 py-2 bg-caa-navy text-white text-sm font-semibold rounded-md", children: "Save" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDraft({
        ...settings
      }), className: "px-4 py-2 border border-caa-border text-sm rounded-md inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5" }),
        " Reset"
      ] }),
      saved && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-caa-success flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
        " Saved"
      ] })
    ] })
  ] });
}
const PERM_FIELDS = [{
  key: "canViewApplications",
  label: "View Applications & CVs"
}, {
  key: "canShortlist",
  label: "Shortlist / Decline Candidates"
}, {
  key: "canManageJobs",
  label: "Manage Job Listings"
}, {
  key: "canManageCriteria",
  label: "Set Screening Criteria"
}, {
  key: "canViewStaff",
  label: "View Internal Staff"
}, {
  key: "canExport",
  label: "Export Reports (PDF)"
}, {
  key: "canViewAudit",
  label: "View Audit Log"
}, {
  key: "canManageSettings",
  label: "Manage Portal Settings"
}, {
  key: "canGrantPermissions",
  label: "Grant Permissions (super only)"
}];
const ROLE_DEFAULTS_PERMS = {
  super: {
    canViewApplications: true,
    canShortlist: true,
    canManageJobs: true,
    canManageCriteria: true,
    canViewStaff: true,
    canExport: true,
    canViewAudit: true,
    canManageSettings: true,
    canGrantPermissions: true
  },
  hr: {
    canViewApplications: true,
    canShortlist: true,
    canManageJobs: true,
    canManageCriteria: true,
    canViewStaff: true,
    canExport: true,
    canViewAudit: false,
    canManageSettings: false,
    canGrantPermissions: false
  },
  recruiter: {
    canViewApplications: true,
    canShortlist: true,
    canManageJobs: false,
    canManageCriteria: true,
    canViewStaff: false,
    canExport: false,
    canViewAudit: false,
    canManageSettings: false,
    canGrantPermissions: false
  }
};
function PermissionsTab({
  overrides,
  save,
  logAction
}) {
  const adminUsers = Object.entries(HR_USERS).map(([email, u]) => ({
    email,
    ...u
  }));
  const [selectedEmail, setSelectedEmail] = reactExports.useState(adminUsers[0]?.email ?? "");
  const selected = adminUsers.find((u) => u.email === selectedEmail);
  const existing = overrides.find((o) => o.email === selectedEmail);
  const defaults = ROLE_DEFAULTS_PERMS[selected?.role ?? "hr"];
  const [draft, setDraft] = reactExports.useState(existing ?? defaults ?? {});
  const handleUserChange = (email) => {
    setSelectedEmail(email);
    const u = adminUsers.find((x) => x.email === email);
    const ex = overrides.find((o) => o.email === email);
    setDraft(ex ?? ROLE_DEFAULTS_PERMS[u?.role ?? "hr"] ?? {});
  };
  const savePerms = () => {
    if (!selected) return;
    save({
      email: selectedEmail,
      role: selected.role,
      ...draft
    });
    logAction("Updated permissions", `${selected.firstName} ${selected.lastName} (${selected.role})`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl text-caa-body", children: "Permissions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted mt-0.5", children: "Override default role permissions for individual HR users." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Select HR user", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: fi, value: selectedEmail, onChange: (e) => handleUserChange(e.target.value), children: adminUsers.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: u.email, children: [
      u.firstName,
      " ",
      u.lastName,
      " (",
      u.role,
      ") — ",
      u.email
    ] }, u.email)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-card p-4 space-y-2", children: PERM_FIELDS.map(({
      key,
      label
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-1.5 border-b border-caa-border last:border-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm text-caa-body", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!draft[key], onChange: (e) => setDraft({
        ...draft,
        [key]: e.target.checked
      }) })
    ] }, key)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: savePerms, className: "px-4 py-2 bg-caa-navy text-white text-sm font-semibold rounded-md", children: "Save permissions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDraft(ROLE_DEFAULTS_PERMS[selected?.role ?? "hr"] ?? {}), className: "px-4 py-2 border border-caa-border text-sm rounded-md", children: "Reset to defaults" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-caa-muted flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
      " Permissions take effect on next sign-in."
    ] })
  ] });
}
const fi = "w-full px-2.5 py-1.5 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy bg-white";
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-caa-body mb-1", children: label }),
    children
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-caa-navy mb-3 pb-2 border-b border-caa-border", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children })
  ] });
}
export {
  AdminPage as component
};
