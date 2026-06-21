import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

// ─── Base types ───────────────────────────────────────────────────────────────

export type Visibility = "external" | "internal";
export type QualLevel = "O-Level" | "A-Level" | "Certificate" | "Diploma" | "Degree" | "Masters" | "PhD";
export type ApplicationStatus = "Pending" | "Under Review" | "Shortlisted" | "Interview" | "Offered" | "Hired" | "Declined";
export const APPLICATION_STATUSES: ApplicationStatus[] = ["Pending", "Under Review", "Shortlisted", "Interview", "Offered", "Hired", "Declined"];
export type AdminRole = "super" | "hr" | "recruiter";
export type AuditEntry = { id: number; at: string; actor: string; role: string; action: string; target?: string };
export type AdminSettings = { minAgeThreshold: number; allowExternalInternalJobs: boolean; orgName: string; sessionTimeoutMinutes: number };

// ─── New feature types ────────────────────────────────────────────────────────

export type Notification = {
  id: number;
  recipientEmail: string;
  title: string;
  message: string;
  read: boolean;
  at: string;
  type: "shortlisted" | "declined" | "interview" | "offered" | "info";
};

export type JobCriteria = {
  jobId: number;
  minCgpa?: number;
  requiredKeywords: string[];
  notes?: string;
};

export type PermissionOverride = {
  email: string;
  role: AdminRole;
  canViewAudit: boolean;
  canManageJobs: boolean;
  canExport: boolean;
  canViewStaff: boolean;
  canManageSettings: boolean;
  canGrantPermissions: boolean;
  canManageCriteria: boolean;
  canShortlist: boolean;
  canViewApplications: boolean;
};

// ─── RBAC ─────────────────────────────────────────────────────────────────────

const ROLE_DEFAULTS: Record<AdminRole, Partial<PermissionOverride>> = {
  super: {
    canViewAudit: true, canManageJobs: true, canExport: true, canViewStaff: true,
    canManageSettings: true, canGrantPermissions: true, canManageCriteria: true,
    canShortlist: true, canViewApplications: true,
  },
  hr: {
    canViewAudit: false, canManageJobs: true, canExport: true, canViewStaff: true,
    canManageSettings: false, canGrantPermissions: false, canManageCriteria: true,
    canShortlist: true, canViewApplications: true,
  },
  recruiter: {
    canViewAudit: false, canManageJobs: false, canExport: false, canViewStaff: false,
    canManageSettings: false, canGrantPermissions: false, canManageCriteria: true,
    canShortlist: true, canViewApplications: true,
  },
};

export function canAccess(role: AdminRole | undefined, perm: keyof PermissionOverride, overrides?: PermissionOverride[]): boolean {
  if (!role) return false;
  const override = overrides?.find((o) => o.role === role);
  if (override && perm in override) return !!override[perm];
  const def = ROLE_DEFAULTS[role] ?? {};
  return !!((def as any)[perm]);
}

// ─── Job / Application ────────────────────────────────────────────────────────

export type Job = {
  id: number; abbr: string; title: string; dept: string; deptKey: string;
  location: string; salary: string; salaryBand: string;
  type: "Full-time" | "Contract";
  closes: string; closesAt: string; visibility: Visibility;
  minAge: number; requiredExperience: number; requiredQualification: QualLevel;
  description?: string; featured?: boolean;
};

export type Application = {
  id: number; abbr: string; title: string; dept: string; date: string;
  status: ApplicationStatus; completion: number;
  jobId?: number; candidateEmail?: string; candidateName?: string;
  cgpa?: number; university?: string;
};

export type ToastType = "success" | "info" | "warning";
export type Toast = { id: number; type: ToastType; title: string; message?: string };

export type AccountType = "external" | "internal" | "admin";
type Auth = {
  isLoggedIn: boolean; firstName: string; lastName: string; email: string;
  accountType: AccountType; employeeNumber?: string;
  effectiveType?: AccountType; adminRole?: AdminRole;
};

// ─── CV ───────────────────────────────────────────────────────────────────────

export type CvQualification = {
  level: QualLevel; course: string; institution: string; year: string;
  awardFile?: string; transcriptFile?: string;
  school?: string; indexNumber?: string;
  subjects?: { subject: string; grade: string }[];
  aggregate?: string;
};
export type CvExperience = {
  title: string; organisation: string; start: string; end: string; description: string; proofFile?: string;
};
export type CvReferee = { name: string; title: string; organisation: string; phone: string; email: string };
export type CvProfile = {
  personal: {
    firstName: string; lastName: string; otherName?: string;
    dob: string; gender: string; nationality: string; nin: string;
    phone: string; email: string; address: string;
  };
  highestLevel: QualLevel | "";
  qualifications: CvQualification[];
  skills: string[];
  experience: CvExperience[];
  referees: CvReferee[];
  nextOfKin: { name: string; relationship: string; phone: string };
  photoFile?: string;
};

export const EMPTY_CV: CvProfile = {
  personal: { firstName: "", lastName: "", otherName: "", dob: "", gender: "", nationality: "Ugandan", nin: "", phone: "", email: "", address: "" },
  highestLevel: "",
  qualifications: [],
  skills: [],
  experience: [],
  referees: [{ name: "", title: "", organisation: "", phone: "", email: "" }, { name: "", title: "", organisation: "", phone: "", email: "" }],
  nextOfKin: { name: "", relationship: "", phone: "" },
};

// ─── Context shape ────────────────────────────────────────────────────────────

type Ctx = {
  auth: Auth;
  signIn: (firstName: string, lastName?: string, email?: string, opts?: { accountType?: AccountType; employeeNumber?: string; adminRole?: AdminRole }) => void;
  signOut: () => void;
  updateProfile: (patch: Partial<Pick<Auth, "firstName" | "lastName" | "email">>) => void;
  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
  jobs: Job[];
  addJob: (j: Omit<Job, "id" | "abbr">) => Job;
  updateJob: (id: number, patch: Partial<Job>) => void;
  deleteJob: (id: number) => void;
  canSeeJob: (j: Job) => boolean;
  isExpired: (j: Job) => boolean;
  applications: Application[];
  withdrawApplication: (id: number) => void;
  addApplication: (a: Omit<Application, "id" | "date" | "status">) => Application;
  updateApplicationStatus: (appId: number, status: ApplicationStatus, notifyEmail?: string, notifyMessage?: string) => void;
  signInPromptOpen: boolean;
  openSignInPrompt: () => void;
  closeSignInPrompt: () => void;
  cv: CvProfile;
  saveCv: (cv: CvProfile) => void;
  hasCv: boolean;
  cvStore: Record<string, CvProfile>;
  audit: AuditEntry[];
  settings: AdminSettings;
  updateSettings: (p: Partial<AdminSettings>) => void;
  logAction: (action: string, target?: string) => void;
  notifications: Notification[];
  sendNotification: (recipientEmail: string, title: string, message: string, type: Notification["type"]) => void;
  markNotificationRead: (id: number) => void;
  criteria: JobCriteria[];
  saveCriteria: (c: JobCriteria) => void;
  permissionOverrides: PermissionOverride[];
  savePermissionOverride: (p: PermissionOverride) => void;
};

const AppCtx = createContext<Ctx | null>(null);

// ─── Seed data ────────────────────────────────────────────────────────────────

export const CAA_STAFF: Record<string, { firstName: string; lastName: string }> = {
  "CAA-1001": { firstName: "Sarah",     lastName: "Namutebi" },
  "CAA-1002": { firstName: "James",     lastName: "Okello" },
  "CAA-1003": { firstName: "Patricia",  lastName: "Akello" },
  "CAA-1004": { firstName: "Robert",    lastName: "Ssebayiga" },
  "CAA-1005": { firstName: "Grace",     lastName: "Atim" },
  "CAA-1006": { firstName: "David",     lastName: "Mugisha" },
  "CAA-1007": { firstName: "Florence",  lastName: "Nansubuga" },
  "CAA-1008": { firstName: "Charles",   lastName: "Opio" },
  "CAA-1009": { firstName: "Anita",     lastName: "Nakazibwe" },
  "CAA-1010": { firstName: "Peter",     lastName: "Wanyama" },
  "CAA-1011": { firstName: "Christine", lastName: "Nassali" },
  "CAA-1012": { firstName: "Joseph",    lastName: "Abalo" },
  "CAA-1013": { firstName: "Esther",    lastName: "Nakiganda" },
  "CAA-1014": { firstName: "Moses",     lastName: "Kiggundu" },
  "CAA-1015": { firstName: "Agnes",     lastName: "Achola" },
};

export const HR_USERS: Record<string, { firstName: string; lastName: string; password: string; role: AdminRole }> = {
  "admin@caa.co.ug":       { firstName: "Alex",  lastName: "Mukasa",   password: "Admin@2026",   role: "super" },
  "hr.director@caa.co.ug": { firstName: "Jane",  lastName: "Mirembe",  password: "HrDir@2026",   role: "hr" },
  "recruit@caa.co.ug":     { firstName: "David", lastName: "Ssempala", password: "Recruit@2026", role: "recruiter" },
};

export function isCAAEmail(email: string) { return /@caa\.co\.ug$/i.test(email.trim()); }
export const ADMIN_DEMO = { email: "admin@caa.co.ug", password: "Admin@2026" };

const JOBS: Job[] = [
  { id: 1, abbr: "ATC", title: "Senior Air Traffic Controller", dept: "Air Traffic Mgmt", deptKey: "atm", location: "Entebbe Airport", salary: "UGX 4.2M–5.8M", salaryBand: "UG4", type: "Full-time", closes: "Jun 15, 2026", closesAt: "2026-06-15", visibility: "external", minAge: 25, requiredExperience: 5, requiredQualification: "Degree", featured: true, description: "Direct en-route and approach traffic at Entebbe ACC." },
  { id: 2, abbr: "ASI", title: "Principal Safety Inspector (Airworthiness)", dept: "Aviation Safety", deptKey: "safety", location: "Kampala HQ", salary: "UGX 3.8M–5.2M", salaryBand: "UG3", type: "Full-time", closes: "Jun 20, 2026", closesAt: "2026-06-20", visibility: "external", minAge: 28, requiredExperience: 7, requiredQualification: "Degree", featured: true },
  { id: 3, abbr: "SYS", title: "Systems Administrator", dept: "ICT & Systems", deptKey: "ict", location: "Kampala HQ", salary: "UGX 2.6M–3.5M", salaryBand: "UG5", type: "Full-time", closes: "Jul 1, 2026", closesAt: "2026-07-01", visibility: "external", minAge: 23, requiredExperience: 3, requiredQualification: "Degree" },
  { id: 4, abbr: "FIN", title: "Finance Officer (Revenue Assurance)", dept: "Finance & Admin", deptKey: "finance", location: "Kampala HQ", salary: "UGX 2.8M–3.6M", salaryBand: "UG5", type: "Contract", closes: "Jun 30, 2026", closesAt: "2026-06-30", visibility: "external", minAge: 25, requiredExperience: 4, requiredQualification: "Degree" },
  { id: 5, abbr: "LEG", title: "Legal Counsel (Aviation Regulations)", dept: "Legal", deptKey: "legal", location: "Kampala HQ", salary: "UGX 3.2M–4.4M", salaryBand: "UG4", type: "Full-time", closes: "Jul 10, 2026", closesAt: "2026-07-10", visibility: "external", minAge: 27, requiredExperience: 5, requiredQualification: "Masters" },
  { id: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", deptKey: "atm", location: "Entebbe Airport", salary: "UGX 1.8M–2.4M", salaryBand: "UG7", type: "Full-time", closes: "Jul 15, 2026", closesAt: "2026-07-15", visibility: "external", minAge: 21, requiredExperience: 0, requiredQualification: "Degree" },
  { id: 7, abbr: "INT", title: "Internal — Manager, Aerodrome Operations", dept: "Operations", deptKey: "ops", location: "Entebbe Airport", salary: "UGX 5.5M–7.0M", salaryBand: "UG2", type: "Full-time", closes: "Jun 25, 2026", closesAt: "2026-06-25", visibility: "internal", minAge: 30, requiredExperience: 8, requiredQualification: "Masters", description: "Open to verified CAA staff only." },
];

const APPLICATIONS: Application[] = [
  { id: 1, jobId: 1, abbr: "ATC", title: "Senior Air Traffic Controller", dept: "Air Traffic Mgmt", date: "Jun 3, 2026", status: "Shortlisted", completion: 100, candidateName: "John Bukenya", candidateEmail: "j.bukenya@gmail.com" },
  { id: 2, jobId: 4, abbr: "FIN", title: "Finance Officer (Revenue Assurance)", dept: "Finance & Admin", date: "May 28, 2026", status: "Under Review", completion: 85, candidateName: "Mary Auma", candidateEmail: "m.auma@gmail.com" },
  { id: 3, jobId: 3, abbr: "SYS", title: "Systems Administrator", dept: "ICT & Systems", date: "May 15, 2026", status: "Pending", completion: 60, candidateName: "Peter Nkutu", candidateEmail: "p.nkutu@gmail.com" },
  { id: 4, jobId: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", date: "Jun 1, 2026", status: "Shortlisted", completion: 95, candidateName: "Kevin Ssali", candidateEmail: "k.ssali@student.mak.ac.ug", cgpa: 4.7, university: "Makerere University" },
  { id: 5, jobId: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", date: "Jun 2, 2026", status: "Under Review", completion: 90, candidateName: "Brenda Akello", candidateEmail: "b.akello@student.mak.ac.ug", cgpa: 4.3, university: "Makerere University" },
  { id: 6, jobId: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", date: "Jun 3, 2026", status: "Pending", completion: 80, candidateName: "Ivan Mucunguzi", candidateEmail: "i.mucunguzi@student.ucu.ac.ug", cgpa: 3.9, university: "Uganda Christian University" },
  { id: 7, jobId: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", date: "Jun 5, 2026", status: "Pending", completion: 70, candidateName: "Stella Nabirye", candidateEmail: "s.nabirye@student.must.ac.ug", cgpa: 3.6, university: "Mbarara University" },
  { id: 8, jobId: 6, abbr: "ATT", title: "ATC Trainee (Graduate Entry)", dept: "Air Traffic Mgmt", date: "Jun 7, 2026", status: "Declined", completion: 55, candidateName: "Ronald Oulanyah", candidateEmail: "r.oulanyah@student.gulu.ac.ug", cgpa: 2.8, university: "Gulu University" },
];

const DEFAULT_SETTINGS: AdminSettings = {
  orgName: "Uganda Civil Aviation Authority",
  minAgeThreshold: 21,
  allowExternalInternalJobs: false,
  sessionTimeoutMinutes: 30,
};

// ─── Storage keys ─────────────────────────────────────────────────────────────

const STORAGE_KEY    = "caa_auth_v1";
const CV_KEY         = "caa_cv_v1";
const CV_STORE_KEY   = "caa_cv_store_v1";
const JOBS_KEY       = "caa_jobs_v1";
const APPS_KEY       = "caa_apps_v1";
const AUDIT_KEY      = "caa_audit_v1";
const SETTINGS_KEY   = "caa_settings_v1";
const NOTIF_KEY      = "caa_notif_v1";
const CRITERIA_KEY   = "caa_criteria_v1";
const PERMS_KEY      = "caa_perms_v1";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth>({ isLoggedIn: false, firstName: "", lastName: "", email: "", accountType: "external" });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [signInPromptOpen, setSignInPromptOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(JOBS);
  const [applications, setApplications] = useState<Application[]>(APPLICATIONS);
  const [cv, setCv] = useState<CvProfile>(EMPTY_CV);
  const [hasCv, setHasCv] = useState(false);
  const [cvStore, setCvStore] = useState<Record<string, CvProfile>>({});
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [criteria, setCriteria] = useState<JobCriteria[]>([]);
  const [permissionOverrides, setPermissionOverrides] = useState<PermissionOverride[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAuth(JSON.parse(raw));
      const rj = localStorage.getItem(JOBS_KEY);
      if (rj) setJobs(JSON.parse(rj));
      const ra = localStorage.getItem(APPS_KEY);
      if (ra) setApplications(JSON.parse(ra));
      const rc = localStorage.getItem(CV_KEY);
      if (rc) { setCv(JSON.parse(rc)); setHasCv(true); }
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
    } catch {}
  }, []);

  const persist = (a: Auth) => {
    setAuth(a);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(a)); } catch {}
  };
  const persistJobs = (next: Job[]) => { setJobs(next); try { localStorage.setItem(JOBS_KEY, JSON.stringify(next)); } catch {} };
  const persistApps = (next: Application[]) => { setApplications(next); try { localStorage.setItem(APPS_KEY, JSON.stringify(next)); } catch {} };
  const persistNotifs = (next: Notification[]) => { setNotifications(next); try { localStorage.setItem(NOTIF_KEY, JSON.stringify(next)); } catch {} };

  const signIn = (firstName: string, lastName = "", email = "", opts?: { accountType?: AccountType; employeeNumber?: string; adminRole?: AdminRole }) => {
    const accountType = opts?.accountType ?? "external";
    const effectiveType: AccountType = accountType === "internal" && !isCAAEmail(email) ? "external" : accountType;
    persist({ isLoggedIn: true, firstName, lastName, email, accountType, employeeNumber: opts?.employeeNumber, effectiveType, adminRole: opts?.adminRole });
  };

  const signOut = () => {
    persist({ isLoggedIn: false, firstName: "", lastName: "", email: "", accountType: "external" });
  };

  const updateProfile = (patch: Partial<Pick<Auth, "firstName" | "lastName" | "email">>) => {
    persist({ ...auth, ...patch });
  };

  const withdrawApplication = (id: number) => {
    persistApps(applications.filter((a) => a.id !== id));
  };

  const addApplication: Ctx["addApplication"] = (a) => {
    const newApp: Application = {
      ...a,
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Pending",
    };
    persistApps([newApp, ...applications]);
    return newApp;
  };

  const updateApplicationStatus: Ctx["updateApplicationStatus"] = (appId, status, notifyEmail, notifyMessage) => {
    const next = applications.map((a) => a.id === appId ? { ...a, status } : a);
    persistApps(next);
    if (notifyEmail && notifyMessage) {
      const type: Notification["type"] =
        status === "Shortlisted" ? "shortlisted" :
        status === "Declined"    ? "declined" :
        status === "Interview"   ? "interview" :
        status === "Offered"     ? "offered" : "info";
      sendNotification(notifyEmail, `Application update — ${status}`, notifyMessage, type);
    }
  };

  const addJob: Ctx["addJob"] = (j) => {
    const id = Math.max(0, ...jobs.map((x) => x.id)) + 1;
    const abbr = j.title.split(/\s+/).slice(0, 1).map((w) => w.slice(0, 3).toUpperCase()).join("");
    const created: Job = { ...j, id, abbr };
    persistJobs([created, ...jobs]);
    return created;
  };
  const updateJob: Ctx["updateJob"] = (id, patch) => persistJobs(jobs.map((j) => (j.id === id ? { ...j, ...patch } : j)));
  const deleteJob: Ctx["deleteJob"] = (id) => persistJobs(jobs.filter((j) => j.id !== id));

  const isExpired: Ctx["isExpired"] = (j) => new Date(j.closesAt).getTime() < Date.now();
  const canSeeJob: Ctx["canSeeJob"] = (j) => {
    if (isExpired(j)) return false;
    if (j.visibility === "external") return true;
    return auth.isLoggedIn && auth.effectiveType === "internal";
  };

  const saveCv: Ctx["saveCv"] = (next) => {
    setCv(next); setHasCv(true);
    try { localStorage.setItem(CV_KEY, JSON.stringify(next)); } catch {}
    if (auth.email) {
      const key = auth.email.toLowerCase();
      const nextStore = { ...cvStore, [key]: next };
      setCvStore(nextStore);
      try { localStorage.setItem(CV_STORE_KEY, JSON.stringify(nextStore)); } catch {}
    }
  };

  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4000);
  }, []);

  const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const logAction = (action: string, target?: string) => {
    const entry: AuditEntry = {
      id: Date.now(),
      at: new Date().toISOString(),
      actor: auth.isLoggedIn ? `${auth.firstName} ${auth.lastName}` : "System",
      role: auth.adminRole ?? "hr",
      action, target,
    };
    const next = [entry, ...audit].slice(0, 200);
    setAudit(next);
    try { localStorage.setItem(AUDIT_KEY, JSON.stringify(next)); } catch {}
  };

  const updateSettings = (p: Partial<AdminSettings>) => {
    const next = { ...settings, ...p };
    setSettings(next);
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(next)); } catch {}
  };

  const sendNotification: Ctx["sendNotification"] = (recipientEmail, title, message, type) => {
    const notif: Notification = {
      id: Date.now(),
      recipientEmail: recipientEmail.toLowerCase(),
      title, message, read: false,
      at: new Date().toISOString(),
      type,
    };
    persistNotifs([notif, ...notifications]);
  };

  const markNotificationRead = (id: number) => {
    persistNotifs(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const saveCriteria: Ctx["saveCriteria"] = (c) => {
    const next = [...criteria.filter((x) => x.jobId !== c.jobId), c];
    setCriteria(next);
    try { localStorage.setItem(CRITERIA_KEY, JSON.stringify(next)); } catch {}
  };

  const savePermissionOverride: Ctx["savePermissionOverride"] = (p) => {
    const next = [...permissionOverrides.filter((x) => x.email !== p.email), p];
    setPermissionOverrides(next);
    try { localStorage.setItem(PERMS_KEY, JSON.stringify(next)); } catch {}
  };

  return (
    <AppCtx.Provider
      value={{
        auth, signIn, signOut, updateProfile,
        toasts, pushToast, dismissToast,
        jobs, addJob, updateJob, deleteJob, canSeeJob, isExpired,
        applications, withdrawApplication, addApplication, updateApplicationStatus,
        signInPromptOpen,
        openSignInPrompt: () => setSignInPromptOpen(true),
        closeSignInPrompt: () => setSignInPromptOpen(false),
        cv, saveCv, hasCv, cvStore,
        audit, settings, updateSettings, logAction,
        notifications, sendNotification, markNotificationRead,
        criteria, saveCriteria,
        permissionOverrides, savePermissionOverride,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
