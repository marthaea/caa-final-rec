import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { S as Search, G as Globe, X, M as Menu, P as Phone, a as Mail, C as Clock, b as MapPin, c as ChevronRight, T as TriangleAlert, I as Info, d as CircleCheck, L as Lock, H as House, B as Briefcase, e as LayoutDashboard, f as LogIn, U as UserPlus, A as ArrowRight } from "../_libs/lucide-react.mjs";
import { o as objectType, n as numberType, c as coerce, e as enumType } from "../_libs/zod.mjs";
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
const appCss = "/assets/styles-y-fIYVwE.css";
const APPLICATION_STATUSES = ["Pending", "Under Review", "Shortlisted", "Interview", "Offered", "Hired", "Declined"];
const ROLE_DEFAULTS = {
  super: {
    canViewAudit: true,
    canManageJobs: true,
    canExport: true,
    canViewStaff: true,
    canManageSettings: true,
    canGrantPermissions: true,
    canManageCriteria: true,
    canShortlist: true,
    canViewApplications: true
  },
  hr: {
    canViewAudit: false,
    canManageJobs: true,
    canExport: true,
    canViewStaff: true,
    canManageSettings: false,
    canGrantPermissions: false,
    canManageCriteria: true,
    canShortlist: true,
    canViewApplications: true
  },
  recruiter: {
    canViewAudit: false,
    canManageJobs: false,
    canExport: false,
    canViewStaff: false,
    canManageSettings: false,
    canGrantPermissions: false,
    canManageCriteria: true,
    canShortlist: true,
    canViewApplications: true
  }
};
function canAccess(role, perm, overrides) {
  if (!role) return false;
  const override = overrides?.find((o) => o.role === role);
  if (override && perm in override) return !!override[perm];
  const def = ROLE_DEFAULTS[role] ?? {};
  return !!def[perm];
}
const EMPTY_CV = {
  personal: { firstName: "", lastName: "", otherName: "", dob: "", gender: "", nationality: "Ugandan", nin: "", phone: "", email: "", address: "" },
  highestLevel: "",
  qualifications: [],
  skills: [],
  experience: [],
  referees: [{ name: "", title: "", organisation: "", phone: "", email: "" }, { name: "", title: "", organisation: "", phone: "", email: "" }],
  nextOfKin: { name: "", relationship: "", phone: "" }
};
const AppCtx = reactExports.createContext(null);
const CAA_STAFF = {
  "CAA-1001": { firstName: "Sarah", lastName: "Namutebi" },
  "CAA-1002": { firstName: "James", lastName: "Okello" },
  "CAA-1003": { firstName: "Patricia", lastName: "Akello" },
  "CAA-1004": { firstName: "Robert", lastName: "Ssebayiga" },
  "CAA-1005": { firstName: "Grace", lastName: "Atim" },
  "CAA-1006": { firstName: "David", lastName: "Mugisha" },
  "CAA-1007": { firstName: "Florence", lastName: "Nansubuga" },
  "CAA-1008": { firstName: "Charles", lastName: "Opio" },
  "CAA-1009": { firstName: "Anita", lastName: "Nakazibwe" },
  "CAA-1010": { firstName: "Peter", lastName: "Wanyama" },
  "CAA-1011": { firstName: "Christine", lastName: "Nassali" },
  "CAA-1012": { firstName: "Joseph", lastName: "Abalo" },
  "CAA-1013": { firstName: "Esther", lastName: "Nakiganda" },
  "CAA-1014": { firstName: "Moses", lastName: "Kiggundu" },
  "CAA-1015": { firstName: "Agnes", lastName: "Achola" }
};
const HR_USERS = {
  "admin@caa.co.ug": { firstName: "Alex", lastName: "Mukasa", password: "Admin@2026", role: "super" },
  "hr.director@caa.co.ug": { firstName: "Jane", lastName: "Mirembe", password: "HrDir@2026", role: "hr" },
  "recruit@caa.co.ug": { firstName: "David", lastName: "Ssempala", password: "Recruit@2026", role: "recruiter" }
};
function isCAAEmail(email) {
  return /@caa\.co\.ug$/i.test(email.trim());
}
const ADMIN_DEMO = { email: "admin@caa.co.ug", password: "Admin@2026" };
const JOBS = [
  { id: 1, abbr: "ATC", title: "Senior Air Traffic Controller", dept: "Air Traffic Mgmt", deptKey: "atm", location: "Entebbe Airport", salary: "UGX 4.2M–5.8M", salaryBand: "UG4", type: "Full-time", closes: "Jun 15, 2026", closesAt: "2026-06-15", visibility: "external", minAge: 25, requiredExperience: 5, requiredQualification: "Degree", featured: true, description: "Direct en-route and approach traffic at Entebbe ACC." },
  { id: 2, abbr: "ASI", title: "Principal Safety Inspector (Airworthiness)", dept: "Aviation Safety", deptKey: "safety", location: "Kampala HQ", salary: "UGX 3.8M–5.2M", salaryBand: "UG3", type: "Full-time", closes: "Jun 20, 2026", closesAt: "2026-06-20", visibility: "external", minAge: 28, requiredExperience: 7, requiredQualification: "Degree", featured: true },
  { id: 3, abbr: "SYS", title: "Systems Administrator", dept: "ICT & Systems", deptKey: "ict", location: "Kampala HQ", salary: "UGX 2.6M–3.5M", salaryBand: "UG5", type: "Full-time", closes: "Jul 1, 2026", closesAt: "2026-07-01", visibility: "external", minAge: 23, requiredExperience: 3, requiredQualification: "Degree" },
  { id: 4, abbr: "FIN", title: "Finance Officer (Revenue Assurance)", dept: "Finance & Admin", deptKey: "finance", location: "Kampala HQ", salary: "UGX 2.8M–3.6M", salaryBand: "UG5", type: "Contract", closes: "Jun 30, 2026", closesAt: "2026-06-30", visibility: "external", minAge: 25, requiredExperience: 4, requiredQualification: "Degree" },
  { id: 5, abbr: "LEG", title: "Legal Counsel (Aviation Regulations)", dept: "Legal", deptKey: "legal", location: "Kampala HQ", salary: "UGX 3.2M–4.4M", salaryBand: "UG4", type: "Full-time", closes: "Jul 10, 2026", closesAt: "2026-07-10", visibility: "external", minAge: 27, requiredExperience: 5, requiredQualification: "Masters" },
  { id: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", deptKey: "atm", location: "Entebbe Airport", salary: "UGX 1.8M–2.4M", salaryBand: "UG7", type: "Full-time", closes: "Jul 15, 2026", closesAt: "2026-07-15", visibility: "external", minAge: 21, requiredExperience: 0, requiredQualification: "Degree" },
  { id: 7, abbr: "INT", title: "Internal — Manager, Aerodrome Operations", dept: "Operations", deptKey: "ops", location: "Entebbe Airport", salary: "UGX 5.5M–7.0M", salaryBand: "UG2", type: "Full-time", closes: "Jun 25, 2026", closesAt: "2026-06-25", visibility: "internal", minAge: 30, requiredExperience: 8, requiredQualification: "Masters", description: "Open to verified CAA staff only." }
];
const APPLICATIONS = [
  { id: 1, jobId: 1, abbr: "ATC", title: "Senior Air Traffic Controller", dept: "Air Traffic Mgmt", date: "Jun 3, 2026", status: "Shortlisted", completion: 100, candidateName: "John Bukenya", candidateEmail: "j.bukenya@gmail.com" },
  { id: 2, jobId: 4, abbr: "FIN", title: "Finance Officer (Revenue Assurance)", dept: "Finance & Admin", date: "May 28, 2026", status: "Under Review", completion: 85, candidateName: "Mary Auma", candidateEmail: "m.auma@gmail.com" },
  { id: 3, jobId: 3, abbr: "SYS", title: "Systems Administrator", dept: "ICT & Systems", date: "May 15, 2026", status: "Pending", completion: 60, candidateName: "Peter Nkutu", candidateEmail: "p.nkutu@gmail.com" },
  { id: 4, jobId: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", date: "Jun 1, 2026", status: "Shortlisted", completion: 95, candidateName: "Kevin Ssali", candidateEmail: "k.ssali@student.mak.ac.ug", cgpa: 4.7, university: "Makerere University" },
  { id: 5, jobId: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", date: "Jun 2, 2026", status: "Under Review", completion: 90, candidateName: "Brenda Akello", candidateEmail: "b.akello@student.mak.ac.ug", cgpa: 4.3, university: "Makerere University" },
  { id: 6, jobId: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", date: "Jun 3, 2026", status: "Pending", completion: 80, candidateName: "Ivan Mucunguzi", candidateEmail: "i.mucunguzi@student.ucu.ac.ug", cgpa: 3.9, university: "Uganda Christian University" },
  { id: 7, jobId: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", date: "Jun 5, 2026", status: "Pending", completion: 70, candidateName: "Stella Nabirye", candidateEmail: "s.nabirye@student.must.ac.ug", cgpa: 3.6, university: "Mbarara University" },
  { id: 8, jobId: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", date: "Jun 7, 2026", status: "Declined", completion: 55, candidateName: "Ronald Oulanyah", candidateEmail: "r.oulanyah@student.gulu.ac.ug", cgpa: 2.8, university: "Gulu University" }
];
const DEFAULT_SETTINGS = {
  orgName: "Uganda Civil Aviation Authority",
  minAgeThreshold: 21,
  allowExternalInternalJobs: false,
  sessionTimeoutMinutes: 30
};
const STORAGE_KEY = "caa_auth_v1";
const CV_KEY = "caa_cv_v1";
const CV_STORE_KEY = "caa_cv_store_v1";
const JOBS_KEY = "caa_jobs_v1";
const APPS_KEY = "caa_apps_v1";
const AUDIT_KEY = "caa_audit_v1";
const SETTINGS_KEY = "caa_settings_v1";
const NOTIF_KEY = "caa_notif_v1";
const CRITERIA_KEY = "caa_criteria_v1";
const PERMS_KEY = "caa_perms_v1";
function AppProvider({ children }) {
  const [auth, setAuth] = reactExports.useState({ isLoggedIn: false, firstName: "", lastName: "", email: "", accountType: "external" });
  const [toasts, setToasts] = reactExports.useState([]);
  const [signInPromptOpen, setSignInPromptOpen] = reactExports.useState(false);
  const [jobs, setJobs] = reactExports.useState(JOBS);
  const [applications, setApplications] = reactExports.useState(APPLICATIONS);
  const [cv, setCv] = reactExports.useState(EMPTY_CV);
  const [hasCv, setHasCv] = reactExports.useState(false);
  const [cvStore, setCvStore] = reactExports.useState({});
  const [audit, setAudit] = reactExports.useState([]);
  const [settings, setSettings] = reactExports.useState(DEFAULT_SETTINGS);
  const [notifications, setNotifications] = reactExports.useState([]);
  const [criteria, setCriteria] = reactExports.useState([]);
  const [permissionOverrides, setPermissionOverrides] = reactExports.useState([]);
  reactExports.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAuth(JSON.parse(raw));
      const rj = localStorage.getItem(JOBS_KEY);
      if (rj) setJobs(JSON.parse(rj));
      const ra = localStorage.getItem(APPS_KEY);
      if (ra) setApplications(JSON.parse(ra));
      const rc = localStorage.getItem(CV_KEY);
      if (rc) {
        setCv(JSON.parse(rc));
        setHasCv(true);
      }
      const rcs = localStorage.getItem(CV_STORE_KEY);
      if (rcs) setCvStore(JSON.parse(rcs));
      const rau = localStorage.getItem(AUDIT_KEY);
      if (rau) setAudit(JSON.parse(rau));
      const rs = localStorage.getItem(SETTINGS_KEY);
      if (rs) setSettings(JSON.parse(rs));
      const rn = localStorage.getItem(NOTIF_KEY);
      if (rn) setNotifications(JSON.parse(rn));
      const rcr = localStorage.getItem(CRITERIA_KEY);
      if (rcr) setCriteria(JSON.parse(rcr));
      const rp = localStorage.getItem(PERMS_KEY);
      if (rp) setPermissionOverrides(JSON.parse(rp));
    } catch {
    }
  }, []);
  const persist = (a) => {
    setAuth(a);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
    } catch {
    }
  };
  const persistJobs = (next) => {
    setJobs(next);
    try {
      localStorage.setItem(JOBS_KEY, JSON.stringify(next));
    } catch {
    }
  };
  const persistApps = (next) => {
    setApplications(next);
    try {
      localStorage.setItem(APPS_KEY, JSON.stringify(next));
    } catch {
    }
  };
  const persistNotifs = (next) => {
    setNotifications(next);
    try {
      localStorage.setItem(NOTIF_KEY, JSON.stringify(next));
    } catch {
    }
  };
  const signIn = (firstName, lastName = "", email = "", opts) => {
    const accountType = opts?.accountType ?? "external";
    const effectiveType = accountType === "internal" && !isCAAEmail(email) ? "external" : accountType;
    persist({ isLoggedIn: true, firstName, lastName, email, accountType, employeeNumber: opts?.employeeNumber, effectiveType, adminRole: opts?.adminRole });
  };
  const signOut = () => {
    persist({ isLoggedIn: false, firstName: "", lastName: "", email: "", accountType: "external" });
  };
  const updateProfile = (patch) => {
    persist({ ...auth, ...patch });
  };
  const withdrawApplication = (id) => {
    persistApps(applications.filter((a) => a.id !== id));
  };
  const addApplication = (a) => {
    const newApp = {
      ...a,
      id: Date.now(),
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Pending"
    };
    persistApps([newApp, ...applications]);
    return newApp;
  };
  const updateApplicationStatus = (appId, status, notifyEmail, notifyMessage) => {
    const next = applications.map((a) => a.id === appId ? { ...a, status } : a);
    persistApps(next);
    if (notifyEmail && notifyMessage) {
      const type = status === "Shortlisted" ? "shortlisted" : status === "Declined" ? "declined" : status === "Interview" ? "interview" : status === "Offered" ? "offered" : "info";
      sendNotification(notifyEmail, `Application update — ${status}`, notifyMessage, type);
    }
  };
  const addJob = (j) => {
    const id = Math.max(0, ...jobs.map((x) => x.id)) + 1;
    const abbr = j.title.split(/\s+/).slice(0, 1).map((w) => w.slice(0, 3).toUpperCase()).join("");
    const created = { ...j, id, abbr };
    persistJobs([created, ...jobs]);
    return created;
  };
  const updateJob = (id, patch) => persistJobs(jobs.map((j) => j.id === id ? { ...j, ...patch } : j));
  const deleteJob = (id) => persistJobs(jobs.filter((j) => j.id !== id));
  const isExpired = (j) => new Date(j.closesAt).getTime() < Date.now();
  const canSeeJob = (j) => {
    if (isExpired(j)) return false;
    if (j.visibility === "external") return true;
    return auth.isLoggedIn && auth.effectiveType === "internal";
  };
  const saveCv = (next) => {
    setCv(next);
    setHasCv(true);
    try {
      localStorage.setItem(CV_KEY, JSON.stringify(next));
    } catch {
    }
    if (auth.email) {
      const key = auth.email.toLowerCase();
      const nextStore = { ...cvStore, [key]: next };
      setCvStore(nextStore);
      try {
        localStorage.setItem(CV_STORE_KEY, JSON.stringify(nextStore));
      } catch {
      }
    }
  };
  const pushToast = reactExports.useCallback((t) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4e3);
  }, []);
  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));
  const logAction = (action, target) => {
    const entry = {
      id: Date.now(),
      at: (/* @__PURE__ */ new Date()).toISOString(),
      actor: auth.isLoggedIn ? `${auth.firstName} ${auth.lastName}` : "System",
      role: auth.adminRole ?? "hr",
      action,
      target
    };
    const next = [entry, ...audit].slice(0, 200);
    setAudit(next);
    try {
      localStorage.setItem(AUDIT_KEY, JSON.stringify(next));
    } catch {
    }
  };
  const updateSettings = (p) => {
    const next = { ...settings, ...p };
    setSettings(next);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    } catch {
    }
  };
  const sendNotification = (recipientEmail, title, message, type) => {
    const notif = {
      id: Date.now(),
      recipientEmail: recipientEmail.toLowerCase(),
      title,
      message,
      read: false,
      at: (/* @__PURE__ */ new Date()).toISOString(),
      type
    };
    persistNotifs([notif, ...notifications]);
  };
  const markNotificationRead = (id) => {
    persistNotifs(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  };
  const saveCriteria = (c) => {
    const next = [...criteria.filter((x) => x.jobId !== c.jobId), c];
    setCriteria(next);
    try {
      localStorage.setItem(CRITERIA_KEY, JSON.stringify(next));
    } catch {
    }
  };
  const savePermissionOverride = (p) => {
    const next = [...permissionOverrides.filter((x) => x.email !== p.email), p];
    setPermissionOverrides(next);
    try {
      localStorage.setItem(PERMS_KEY, JSON.stringify(next));
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppCtx.Provider,
    {
      value: {
        auth,
        signIn,
        signOut,
        updateProfile,
        toasts,
        pushToast,
        dismissToast,
        jobs,
        addJob,
        updateJob,
        deleteJob,
        canSeeJob,
        isExpired,
        applications,
        withdrawApplication,
        addApplication,
        updateApplicationStatus,
        signInPromptOpen,
        openSignInPrompt: () => setSignInPromptOpen(true),
        closeSignInPrompt: () => setSignInPromptOpen(false),
        cv,
        saveCv,
        hasCv,
        cvStore,
        audit,
        settings,
        updateSettings,
        logAction,
        notifications,
        sendNotification,
        markNotificationRead,
        criteria,
        saveCriteria,
        permissionOverrides,
        savePermissionOverride
      },
      children
    }
  );
}
function useApp() {
  const ctx = reactExports.useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
const logo = "/assets/caa-logo-Bxzhm2Gq.png";
const LANGS = ["EN", "SW", "LG"];
function SvgX$1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-3.5 w-3.5", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" }) });
}
function SvgFacebook$1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-3.5 w-3.5", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" }) });
}
function SvgLinkedIn$1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-3.5 w-3.5", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" }) });
}
function SvgInstagram() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-3.5 w-3.5", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" }) });
}
function SvgYouTube$1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-3.5 w-3.5", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" }) });
}
const SOCIAL = [
  { Icon: SvgX$1, href: "https://twitter.com/ugandacaa", label: "X (Twitter)" },
  { Icon: SvgFacebook$1, href: "https://www.facebook.com/ugandacaa", label: "Facebook" },
  { Icon: SvgLinkedIn$1, href: "https://www.linkedin.com/company/uganda-civil-aviation-authority", label: "LinkedIn" },
  { Icon: SvgInstagram, href: "https://www.instagram.com/ugandacaa", label: "Instagram" },
  { Icon: SvgYouTube$1, href: "https://www.youtube.com/@ugandacaa", label: "YouTube" }
];
function Navbar() {
  const { auth, signOut, pushToast } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = reactExports.useState(false);
  const [lang, setLang] = reactExports.useState("EN");
  reactExports.useEffect(() => {
    try {
      const saved = localStorage.getItem("caa_lang") || "EN";
      if (LANGS.includes(saved)) setLang(saved);
    } catch {
    }
  }, []);
  const cycleLang = () => {
    const next = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
    setLang(next);
    try {
      localStorage.setItem("caa_lang", next);
    } catch {
    }
    pushToast({ type: "info", title: "Language preference saved", message: next === "EN" ? "English" : next === "SW" ? "Kiswahili" : "Luganda" });
  };
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/vacancies", label: "Vacancies" },
    ...auth.isLoggedIn ? [{ to: "/dashboard", label: "My Dashboard" }] : [],
    ...auth.isLoggedIn && auth.accountType === "admin" ? [{ to: "/admin", label: "HR Console" }] : []
  ];
  const handleSignOut = () => {
    signOut();
    setOpen(false);
    navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#111111]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 h-9 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-semibold tracking-wide", children: "Uganda Civil Aviation Authority" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: SOCIAL.map(({ Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": label,
          className: "text-white/70 hover:text-white transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {})
        },
        label
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-caa-border shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 shrink-0 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: logo,
              alt: "Uganda Civil Aviation Authority",
              className: "h-14 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "leading-tight hidden sm:block border-l border-caa-border pl-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-bold text-caa-navy text-[13px] uppercase tracking-wide", children: "Recruitment Portal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-caa-muted tracking-widest uppercase", children: "e-Careers · Uganda" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-0", children: navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: l.to,
            className: "relative px-4 py-6 text-[12px] font-semibold uppercase tracking-[0.1em] text-caa-body/70 hover:text-caa-navy transition-colors",
            activeProps: { className: "relative px-4 py-6 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1565C0] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#1565C0]" },
            activeOptions: { exact: l.to === "/" },
            children: l.label
          },
          l.to
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true })),
              "aria-label": "Open search",
              className: "h-8 w-8 rounded-full border border-caa-border flex items-center justify-center text-caa-muted hover:border-caa-navy hover:text-caa-navy transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: cycleLang,
              className: "inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-caa-body/70 border border-caa-border rounded-md hover:border-caa-navy hover:text-caa-navy transition-colors",
              "aria-label": "Change language",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
                " ",
                lang
              ]
            }
          ),
          auth.isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "h-8 w-8 rounded-full bg-caa-navy text-white flex items-center justify-center text-xs font-bold", children: [
              auth.firstName.charAt(0),
              auth.lastName.charAt(0)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-caa-body max-w-[100px] truncate", children: auth.firstName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleSignOut,
                className: "text-[11px] font-semibold uppercase tracking-wider text-caa-navy border border-caa-navy/40 px-2.5 py-1 rounded hover:bg-caa-navy hover:text-white transition-colors",
                children: "Sign Out"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/login",
                className: "text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 border border-caa-border text-caa-body rounded hover:border-caa-navy hover:text-caa-navy transition-colors",
                children: "Sign In"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/register",
                className: "text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 bg-caa-navy text-white rounded hover:bg-caa-navy-2 transition-colors",
                children: "Register"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "md:hidden text-caa-navy p-1",
            onClick: () => setOpen(!open),
            "aria-label": "Menu",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6" })
          }
        )
      ] }),
      open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden bg-white border-t border-caa-border px-4 py-4 space-y-1", children: [
        navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: l.to,
            onClick: () => setOpen(false),
            className: "block text-[12px] font-semibold uppercase tracking-[0.1em] text-caa-body/80 py-2.5 border-b border-caa-border/50",
            activeProps: { className: "block text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1565C0] py-2.5 border-b border-caa-border/50" },
            activeOptions: { exact: l.to === "/" },
            children: l.label
          },
          l.to
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 flex flex-col gap-2", children: auth.isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleSignOut,
            className: "text-left text-[11px] font-semibold uppercase tracking-wider text-caa-navy",
            children: "Sign Out"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              onClick: () => setOpen(false),
              className: "block text-center text-[11px] font-semibold uppercase tracking-wider px-4 py-2 border border-caa-border text-caa-body rounded",
              children: "Sign In"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/register",
              onClick: () => setOpen(false),
              className: "block text-center text-[11px] font-semibold uppercase tracking-wider px-4 py-2 bg-caa-navy text-white rounded",
              children: "Register"
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}
const heroOffices = "/assets/hero-caa-offices-DpA2Uqkg.jpg";
const heroJet = "/assets/hero-jet-PGkprnxx.jpg";
const heroImg = "/assets/hero-office-P4pH0Wle.jpg";
const IMPORTANT_LINKS = [
  { label: "National Planning Authority", href: "https://www.npa.go.ug" },
  { label: "Uganda Investment Authority", href: "https://www.ugandainvest.go.ug" },
  { label: "Uganda Revenue Authority", href: "https://www.ura.go.ug" },
  { label: "EACASSOA", href: "https://www.eacassoa.org" },
  { label: "Int'l Civil Aviation Organization", href: "https://www.icao.int" },
  { label: "Uganda E-Immigration System", href: "https://www.immigration.go.ug" },
  { label: "Uganda Tourism Board", href: "https://www.utb.go.ug" }
];
const BOTTOM_LINKS = [
  { label: "Disclaimer", href: "https://caa.go.ug" },
  { label: "Website Policies", href: "https://caa.go.ug" },
  { label: "AIS", href: "https://caa.go.ug" },
  { label: "ASL", href: "https://caa.go.ug" },
  { label: "ASCRS", href: "https://caa.go.ug" },
  { label: "Webmail", href: "https://caa.go.ug" }
];
const PHOTOS = [heroOffices, heroJet, heroImg, heroJet, heroOffices, heroImg];
function SvgX() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" }) });
}
function SvgFacebook() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" }) });
}
function SvgLinkedIn() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" }) });
}
function SvgYouTube() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" }) });
}
const SOCIAL_FOLLOW = [
  { Icon: SvgX, href: "https://twitter.com/ugandacaa", label: "X (Twitter)" },
  { Icon: SvgFacebook, href: "https://www.facebook.com/ugandacaa", label: "Facebook" },
  { Icon: SvgLinkedIn, href: "https://www.linkedin.com/company/uganda-civil-aviation-authority", label: "LinkedIn" },
  { Icon: SvgYouTube, href: "https://www.youtube.com/@ugandacaa", label: "YouTube" }
];
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-caa-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm uppercase tracking-widest mb-5", children: "UCAA Head Office" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3.5 text-white/75 text-[13px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 mt-0.5 text-white/50 shrink-0" }),
              "+256 312 352 000"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 mt-0.5 text-white/50 shrink-0" }),
              "aviation@caa.co.ug"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 mt-0.5 text-white/50 shrink-0" }),
              "Mon – Fri: 8.00 am – 5.00 pm"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 mt-0.5 text-white/50 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Airport Road-Entebbe.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "P.O.Box 5536, Kampala, Uganda"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-5 border-t border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-[11px] uppercase tracking-widest mb-3", children: "Portal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vacancies", className: "text-white/75 text-[13px] hover:text-white transition-colors", children: "Current Vacancies" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "text-white/75 text-[13px] hover:text-white transition-colors", children: "Create Account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-white/75 text-[13px] hover:text-white transition-colors", children: "Sign In" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "text-white/75 text-[13px] hover:text-white transition-colors", children: "My Dashboard" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm uppercase tracking-widest mb-5", children: "Important Links" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: IMPORTANT_LINKS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: l.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 text-white/75 text-[13px] hover:text-white transition-colors group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-white/40 group-hover:text-white/80 shrink-0 transition-colors" }),
                l.label
              ]
            }
          ) }, l.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm uppercase tracking-widest mb-5", children: "Follow Uganda CAA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "https://caa.go.ug/wp-content/uploads/2021/06/CAA-LOGO-FOR-WEB.png",
                  alt: "Uganda CAA",
                  className: "h-10 w-10 rounded-full bg-white object-contain p-1",
                  onError: (e) => {
                    e.currentTarget.style.display = "none";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-semibold leading-none", children: "Uganda CAA" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-[11px] mt-0.5", children: "@UgandaCAA" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-[12px] leading-relaxed mb-4", children: "Official account of the Uganda Civil Aviation Authority — the national regulator of civil aviation in Uganda." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SOCIAL_FOLLOW.map(({ Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": label,
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors text-[11px] font-medium",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}),
                  label
                ]
              },
              label
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm uppercase tracking-widest mb-5", children: "UCAA Activity Photos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: PHOTOS.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden rounded-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src,
              alt: `CAA activity ${i + 1}`,
              className: "w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            }
          ) }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 pt-6 border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-[11px] leading-relaxed max-w-3xl", children: "This portal is provided solely for receiving employment applications for advertised vacancies at the Uganda Civil Aviation Authority. Submission does not constitute an offer of employment. CAA Uganda is an equal-opportunity employer and charges no fees at any stage of recruitment. Information is handled per the Data Protection and Privacy Act." }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#071d3e]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-[11px]", children: "Copyright © Uganda Civil Aviation Authority. All rights reserved." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-wrap items-center gap-x-0 gap-y-1", children: BOTTOM_LINKS.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
        i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30 text-[11px] mx-1.5", children: "//" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: l.href,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-white/60 text-[11px] hover:text-white transition-colors",
            children: l.label
          }
        )
      ] }, l.label)) })
    ] }) })
  ] });
}
const config = {
  success: { Icon: CircleCheck, bar: "bg-caa-success", tint: "text-caa-success" },
  info: { Icon: Info, bar: "bg-caa-navy-2", tint: "text-caa-navy-2" },
  warning: { Icon: TriangleAlert, bar: "bg-caa-warning", tint: "text-caa-warning" }
};
function ToastContainer() {
  const { toasts, dismissToast } = useApp();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-4 right-4 z-[100] flex flex-col gap-3 w-[340px] max-w-[calc(100vw-2rem)]", children: toasts.map((t) => {
    const { Icon, bar, tint } = config[t.type];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-toast-in bg-white rounded-lg border border-caa-border shadow-lg flex overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1 ${bar}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-start gap-3 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 mt-0.5 ${tint}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] font-semibold text-caa-body", children: t.title }),
          t.message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-caa-muted mt-0.5", children: t.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => dismissToast(t.id), className: "text-caa-light hover:text-caa-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] })
    ] }, t.id);
  }) });
}
function SignInPromptModal() {
  const { signInPromptOpen, closeSignInPrompt } = useApp();
  if (!signInPromptOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[90] bg-caa-navy/60 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl max-w-md w-full p-8 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: closeSignInPrompt, className: "absolute top-4 right-4 text-caa-light hover:text-caa-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-caa-navy/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-6 w-6 text-caa-navy" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-xl text-caa-body", children: "Sign in required" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-caa-muted mt-2", children: "You need to sign in to apply for this position." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", onClick: closeSignInPrompt, className: "flex-1 py-2.5 text-center bg-caa-navy text-white font-medium rounded-md hover:bg-caa-navy-2 transition-colors", children: "Sign In" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", onClick: closeSignInPrompt, className: "flex-1 py-2.5 text-center border border-caa-border text-caa-body rounded-md hover:bg-caa-surface transition-colors", children: "Register" })
    ] })
  ] }) });
}
function CommandPalette() {
  const { jobs, auth } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = reactExports.useState(false);
  const [q, setQ] = reactExports.useState("");
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  reactExports.useEffect(() => {
    if (!open) setQ("");
  }, [open]);
  const items = reactExports.useMemo(() => {
    const nav = [
      { label: "Home", hint: "Go to homepage", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4" }), run: () => navigate({ to: "/" }) },
      { label: "Browse Vacancies", hint: "All open roles", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4" }), run: () => navigate({ to: "/vacancies" }) },
      ...auth.isLoggedIn ? [{ label: "My Dashboard", hint: "Track applications", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" }), run: () => navigate({ to: "/dashboard" }) }] : [
        { label: "Sign In", hint: "Access your account", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }), run: () => navigate({ to: "/login" }) },
        { label: "Register", hint: "Create a new account", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }), run: () => navigate({ to: "/register" }) }
      ]
    ];
    const jobItems = jobs.map((j) => ({
      label: j.title,
      hint: `${j.dept} · ${j.location}`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4" }),
      run: () => navigate({ to: "/apply", search: { jobId: j.id } })
    }));
    const all = [...nav, ...jobItems];
    if (!q.trim()) return all.slice(0, 8);
    const needle = q.toLowerCase();
    return all.filter((i) => (i.label + " " + i.hint).toLowerCase().includes(needle)).slice(0, 10);
  }, [q, jobs, auth.isLoggedIn, navigate]);
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[60] caa-fade-in", onClick: () => setOpen(false), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-caa-navy/40 backdrop-blur-sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative mx-auto mt-[12vh] max-w-xl bg-white rounded-xl border border-caa-border shadow-2xl overflow-hidden caa-scale-in",
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-caa-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-caa-muted" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                autoFocus: true,
                value: q,
                onChange: (e) => setQ(e.target.value),
                placeholder: "Search vacancies, pages…",
                className: "flex-1 bg-transparent outline-none text-sm placeholder:text-caa-light"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "text-[10px] px-1.5 py-0.5 rounded border border-caa-border text-caa-muted", children: "Esc" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "max-h-80 overflow-auto py-2", children: [
            items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-4 py-6 text-center text-sm text-caa-muted", children: "No matches" }),
            items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  it.run();
                  setOpen(false);
                },
                className: "w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-caa-surface group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caa-navy", children: it.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm text-caa-body truncate", children: it.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-caa-muted truncate", children: it.hint })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 text-caa-light opacity-0 group-hover:opacity-100" })
                ]
              }
            ) }, i))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 border-t border-caa-border text-[11px] text-caa-muted flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Quick navigation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⌘K to toggle" })
          ] })
        ]
      }
    )
  ] });
}
function AppShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-caa-surface", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignInPromptModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandPalette, {})
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) }) });
}
const $$splitComponentImporter$7 = () => import("./vacancies-CiGvHR0M.mjs");
const Route$7 = createFileRoute("/vacancies")({
  head: () => ({
    meta: [{
      title: "Current Vacancies — CAA Uganda"
    }, {
      name: "description",
      content: "Browse all open roles at the Civil Aviation Authority of Uganda."
    }, {
      property: "og:title",
      content: "Current Vacancies — CAA Uganda"
    }, {
      property: "og:description",
      content: "12 positions open across Air Traffic, Safety, Finance, ICT and Legal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./register-CX_vgpCL.mjs");
const Route$6 = createFileRoute("/register")({
  head: () => ({
    meta: [{
      title: "Create Candidate Profile — CAA Uganda Recruitment"
    }, {
      name: "description",
      content: "Build your CAA Uganda candidate profile — personal details, education, certifications and references."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./login-hrBhIc5m.mjs");
const Route$5 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign In — CAA Uganda Recruitment"
    }, {
      name: "description",
      content: "Sign in to your CAA Uganda Recruitment Portal candidate account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./job-C2mGo8qi.mjs");
const Route$4 = createFileRoute("/job")({
  validateSearch: objectType({
    jobId: numberType()
  }),
  head: () => ({
    meta: [{
      title: "Job Details — CAA Uganda"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./dashboard-Di4lXHJn.mjs");
const Route$3 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "My Dashboard — CAA Uganda"
    }, {
      name: "description",
      content: "Track your applications and complete your candidate profile."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./apply-8QVof1_s.mjs");
const Route$2 = createFileRoute("/apply")({
  validateSearch: objectType({
    jobId: coerce.number().optional()
  }),
  head: () => ({
    meta: [{
      title: "Apply — CAA Uganda"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin-DbMKhqU-.mjs");
const Route$1 = createFileRoute("/admin")({
  validateSearch: objectType({
    tab: enumType(["login", "dashboard", "jobs", "apps", "interns", "staff", "reports", "audit", "settings", "criteria", "permissions"]).optional(),
    jobId: coerce.number().optional()
  }),
  head: () => ({
    meta: [{
      title: "HR Console — CAA Uganda"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-CP9Zfz73.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "CAA Uganda Recruitment Portal — Careers in Aviation"
    }, {
      name: "description",
      content: "Apply for open roles at Uganda's Civil Aviation Authority. Browse current vacancies and manage your applications."
    }, {
      property: "og:title",
      content: "CAA Uganda Recruitment Portal"
    }, {
      property: "og:description",
      content: "Build your career in aviation excellence."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const VacanciesRoute = Route$7.update({
  id: "/vacancies",
  path: "/vacancies",
  getParentRoute: () => Route$8
});
const RegisterRoute = Route$6.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$8
});
const LoginRoute = Route$5.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$8
});
const JobRoute = Route$4.update({
  id: "/job",
  path: "/job",
  getParentRoute: () => Route$8
});
const DashboardRoute = Route$3.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$8
});
const ApplyRoute = Route$2.update({
  id: "/apply",
  path: "/apply",
  getParentRoute: () => Route$8
});
const AdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$8
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  ApplyRoute,
  DashboardRoute,
  JobRoute,
  LoginRoute,
  RegisterRoute,
  VacanciesRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ADMIN_DEMO as A,
  CAA_STAFF as C,
  EMPTY_CV as E,
  HR_USERS as H,
  Route$4 as R,
  Route$2 as a,
  Route$1 as b,
  canAccess as c,
  APPLICATION_STATUSES as d,
  heroOffices as e,
  heroJet as f,
  heroImg as h,
  isCAAEmail as i,
  logo as l,
  router as r,
  useApp as u
};
