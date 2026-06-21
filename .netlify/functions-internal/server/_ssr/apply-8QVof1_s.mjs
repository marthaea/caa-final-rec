import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp, a as Route$2, E as EMPTY_CV } from "./router-B9-5xq1U.mjs";
import { Q as QUAL_LEVELS, O as O_LEVEL_SUBJECTS, A as A_LEVEL_SUBJECTS, a as O_LEVEL_GRADES, b as A_LEVEL_GRADES } from "./uganda-curriculum-C3JvhMmt.mjs";
import { v as Pencil, z as ChevronLeft, c as ChevronRight, D as Upload, w as Check, n as CircleAlert, J as Plus, K as Trash2 } from "../_libs/lucide-react.mjs";
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
function SuccessModal({ refNumber, jobTitle, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[95] bg-caa-navy/70 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl w-full max-w-[480px] p-10 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-20 w-20 rounded-full bg-caa-success flex items-center justify-center caa-check-anim", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-10 w-10 text-white", strokeWidth: 3 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-2xl text-caa-body mt-6", children: "Application Submitted!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-caa-muted mt-2", children: [
      "Your application for ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caa-body font-medium", children: jobTitle }),
      " has been received by CAA Uganda. We'll notify you by email of next steps."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 inline-block bg-caa-surface border border-caa-border rounded-md px-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-caa-muted", children: "Reference: " }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono font-semibold text-caa-navy", children: refNumber })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", onClick: onClose, className: "flex-1 py-2.5 bg-caa-navy text-white font-medium rounded-md hover:bg-caa-navy-2 transition-colors", children: "View My Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vacancies", onClick: onClose, className: "flex-1 py-2.5 border border-caa-border text-caa-body rounded-md hover:bg-caa-surface transition-colors", children: "Browse More" })
    ] })
  ] }) });
}
const STEPS = ["Personal", "Qualifications", "Skills", "Experience", "Referees", "Next of Kin", "Photo", "Review"];
function input(cls = "") {
  return "w-full px-2.5 py-1.5 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy bg-white " + cls;
}
const label = "block text-xs font-medium text-caa-body mb-1";
function ApplyPage() {
  const {
    auth,
    openSignInPrompt,
    jobs,
    cv,
    hasCv,
    saveCv,
    addApplication,
    pushToast
  } = useApp();
  const {
    jobId
  } = Route$2.useSearch();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === jobId) ?? jobs[0];
  reactExports.useEffect(() => {
    if (!auth.isLoggedIn) openSignInPrompt();
  }, [auth.isLoggedIn, openSignInPrompt]);
  const [step, setStep] = reactExports.useState(hasCv ? STEPS.length - 1 : 0);
  const [data, setData] = reactExports.useState(() => {
    if (hasCv) return cv;
    return {
      ...EMPTY_CV,
      personal: {
        ...EMPTY_CV.personal,
        firstName: auth.firstName,
        lastName: auth.lastName,
        email: auth.email
      }
    };
  });
  const [submitted, setSubmitted] = reactExports.useState(null);
  const ageOk = reactExports.useMemo(() => {
    if (!data.personal.dob) return null;
    const age = Math.floor((Date.now() - new Date(data.personal.dob).getTime()) / (365.25 * 24 * 3600 * 1e3));
    return age >= job.minAge;
  }, [data.personal.dob, job.minAge]);
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const submit = () => {
    if (ageOk === false) {
      pushToast({
        type: "warning",
        title: `Minimum age for this role is ${job.minAge}`
      });
      return;
    }
    if (data.referees.filter((r) => r.name.trim()).length < 2) {
      pushToast({
        type: "warning",
        title: "Provide at least two referees"
      });
      return;
    }
    saveCv(data);
    const ref = "REF-2026-" + String(Math.floor(Math.random() * 1e5)).padStart(5, "0");
    addApplication({
      abbr: job.abbr,
      title: job.title,
      dept: job.dept,
      jobId: job.id,
      completion: 100,
      candidateEmail: auth.email,
      candidateName: `${data.personal.firstName} ${data.personal.lastName}`.trim()
    });
    setSubmitted(ref);
    pushToast({
      type: "success",
      title: "Application submitted",
      message: "Your CV is saved and will pre-fill next time."
    });
  };
  const setPersonal = (p) => setData({
    ...data,
    personal: {
      ...data.personal,
      ...p
    }
  });
  const renderStep = () => {
    switch (step) {
      case 0:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-caa-navy/20 bg-caa-navy/5 p-3 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-caa-navy mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-caa-navy", children: "Quick-fill from existing CV" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-caa-muted mt-0.5", children: "Upload a plain-text or PDF CV and we'll try to auto-fill the fields below." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "shrink-0 cursor-pointer px-3 py-1.5 text-xs font-semibold bg-caa-navy text-white rounded-md hover:bg-caa-navy-2 transition-colors", children: [
              "Upload CV",
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: ".txt,.pdf,.doc,.docx", className: "sr-only", onChange: (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const text = ev.target?.result ?? "";
                  const email = text.match(/[\w.+-]+@[\w-]+\.\w{2,6}/)?.[0] ?? "";
                  const phone = text.match(/(\+256|0)[0-9\s-]{8,12}/)?.[0]?.replace(/\s|-/g, "") ?? "";
                  const nin = text.match(/[A-Z]{2}\d{7}[A-Z]{1}/)?.[0] ?? "";
                  const dobMatch = text.match(/\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})\b/);
                  const dob = dobMatch ? `${dobMatch[3]}-${dobMatch[2].padStart(2, "0")}-${dobMatch[1].padStart(2, "0")}` : "";
                  const filled = {};
                  if (email) filled.email = email;
                  if (phone) filled.phone = phone;
                  if (nin) filled.nin = nin;
                  if (dob) filled.dob = dob;
                  if (Object.keys(filled).length > 0) {
                    setPersonal(filled);
                    pushToast({
                      type: "success",
                      title: "CV parsed",
                      message: `${Object.keys(filled).length} field(s) auto-filled. Review and correct as needed.`
                    });
                  } else {
                    pushToast({
                      type: "info",
                      title: "Could not extract fields",
                      message: "Please fill the form manually. Structured PDF text required."
                    });
                  }
                };
                reader.readAsText(file);
              } })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            [["First name", "firstName"], ["Surname", "lastName"], ["Other name", "otherName"], ["Phone", "phone"], ["Email", "email"], ["National ID (NIN)", "nin"], ["Nationality", "nationality"]].map(([l, k]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: l }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: data.personal[k] ?? "", onChange: (e) => setPersonal({
                [k]: e.target.value
              }) })
            ] }, k)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Date of birth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", className: input(), value: data.personal.dob, onChange: (e) => setPersonal({
                dob: e.target.value
              }) }),
              ageOk === false && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-caa-danger mt-1 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                " Min age for this role is ",
                job.minAge,
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Gender" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: input(), value: data.personal.gender, onChange: (e) => setPersonal({
                gender: e.target.value
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select…" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Male" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Female" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Prefer not to say" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: data.personal.address, onChange: (e) => setPersonal({
                address: e.target.value
              }) })
            ] })
          ] })
        ] });
      case 1:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(QualificationsStep, { data, setData });
      case 2:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SkillsStep, { data, setData });
      case 3:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceStep, { data, setData });
      case 4:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(RefereesStep, { data, setData });
      case 5:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Full name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: data.nextOfKin.name, onChange: (e) => setData({
              ...data,
              nextOfKin: {
                ...data.nextOfKin,
                name: e.target.value
              }
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Relationship" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: input(), value: data.nextOfKin.relationship, onChange: (e) => setData({
              ...data,
              nextOfKin: {
                ...data.nextOfKin,
                relationship: e.target.value
              }
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select…" }),
              ["Spouse", "Parent", "Sibling", "Child", "Guardian", "Other"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: r }, r))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: data.nextOfKin.phone, onChange: (e) => setData({
              ...data,
              nextOfKin: {
                ...data.nextOfKin,
                phone: e.target.value
              }
            }) })
          ] })
        ] });
      case 6:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Passport-size photo (image only, ≤ 2MB)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-caa-border rounded-md p-6 text-center bg-caa-surface", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 text-caa-muted mx-auto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "mt-3 text-xs", onChange: (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              if (f.size > 2 * 1024 * 1024) {
                pushToast({
                  type: "warning",
                  title: "Photo too large (max 2MB)"
                });
                return;
              }
              if (!f.type.startsWith("image/")) {
                pushToast({
                  type: "warning",
                  title: "Image files only"
                });
                return;
              }
              setData({
                ...data,
                photoFile: f.name
              });
            } }),
            data.photoFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-caa-success flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
              data.photoFile
            ] })
          ] })
        ] });
      case 7:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewStep, { data, job, onJump: setStep });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-hero-bg py-8 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/65 text-xs", children: "Applying for" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-white text-2xl md:text-3xl mt-1", children: job.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/70 text-xs mt-1", children: [
        job.dept,
        " · ",
        job.location,
        " · ",
        job.salaryBand,
        " · Closes ",
        job.closes
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mt-5 overflow-x-auto pb-1", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setStep(i), className: `shrink-0 px-2.5 py-1 rounded-full text-[11px] border ${i === step ? "bg-white text-caa-navy border-white" : i < step ? "bg-white/15 text-white/80 border-white/20" : "text-white/60 border-white/20"}`, children: [
        i + 1,
        ". ",
        s
      ] }, s)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 mt-6 pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
      hasCv && step !== STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-3 mb-3 text-xs text-caa-muted flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5 text-caa-navy" }),
        "Editing your saved CV — changes will replace your previous version on submit."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg text-caa-body mb-4", children: STEPS[step] }),
        renderStep()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: back, disabled: step === 0, className: "px-3 py-2 text-sm border border-caa-border rounded-md text-caa-body hover:bg-white disabled:opacity-40 inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
          " Back"
        ] }),
        step < STEPS.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: next, className: "px-4 py-2 text-sm bg-caa-navy text-white font-semibold rounded-md hover:bg-caa-navy-2 inline-flex items-center gap-1", children: [
          "Continue ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: submit, className: "px-5 py-2 text-sm bg-caa-navy text-white font-semibold rounded-md hover:bg-caa-navy-2", children: "Submit application" })
      ] })
    ] }) }),
    submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessModal, { refNumber: submitted, jobTitle: job.title, onClose: () => {
      setSubmitted(null);
      navigate({
        to: "/dashboard"
      });
    } })
  ] });
}
function QualificationsStep({
  data,
  setData
}) {
  const add = (level) => {
    const q = {
      level,
      course: "",
      institution: "",
      year: ""
    };
    if (level === "O-Level" || level === "A-Level") {
      q.school = "";
      q.indexNumber = "";
      q.subjects = [];
      q.aggregate = "";
    }
    setData({
      ...data,
      qualifications: [...data.qualifications, q]
    });
  };
  const update = (i, patch) => {
    setData({
      ...data,
      qualifications: data.qualifications.map((q, idx) => idx === i ? {
        ...q,
        ...patch
      } : q)
    });
  };
  const remove = (i) => setData({
    ...data,
    qualifications: data.qualifications.filter((_, idx) => idx !== i)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Highest level of education" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: input(), value: data.highestLevel, onChange: (e) => setData({
          ...data,
          highestLevel: e.target.value
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select…" }),
          QUAL_LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: l }, l))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: QUAL_LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => add(l), className: "px-2 py-1 text-[11px] border border-caa-border rounded-md hover:border-caa-navy text-caa-navy inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
        " ",
        l
      ] }, l)) })
    ] }),
    data.qualifications.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted", children: "Add at least one qualification using the buttons above." }),
    data.qualifications.map((q, i) => {
      const isSecondary = q.level === "O-Level" || q.level === "A-Level";
      const subjects = q.level === "O-Level" ? O_LEVEL_SUBJECTS : A_LEVEL_SUBJECTS;
      const grades = q.level === "O-Level" ? O_LEVEL_GRADES : A_LEVEL_GRADES;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-caa-border rounded-md p-3 space-y-3 bg-caa-surface/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-caa-body", children: q.level }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => remove(i), className: "text-caa-danger text-xs inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
            " Remove"
          ] })
        ] }),
        !isSecondary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Course / programme" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: q.course, onChange: (e) => update(i, {
              course: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Institution" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: q.institution, onChange: (e) => update(i, {
              institution: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Year of award" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: q.year, onChange: (e) => update(i, {
              year: e.target.value
            }), placeholder: "YYYY" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-3 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileField, { label: "Proof of award", value: q.awardFile, onChange: (name) => update(i, {
              awardFile: name
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileField, { label: "Full official transcript", value: q.transcriptFile, onChange: (name) => update(i, {
              transcriptFile: name
            }) })
          ] })
        ] }),
        isSecondary && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "School" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: q.school ?? "", onChange: (e) => update(i, {
                school: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Index number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: q.indexNumber ?? "", onChange: (e) => update(i, {
                indexNumber: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Year" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: q.year, onChange: (e) => update(i, {
                year: e.target.value
              }), placeholder: "YYYY" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Aggregate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: q.aggregate ?? "", onChange: (e) => update(i, {
                aggregate: e.target.value
              }), placeholder: "e.g. 12" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileField, { label: "Result slip", value: q.awardFile, onChange: (name) => update(i, {
              awardFile: name
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Subjects & grades" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => update(i, {
                subjects: [...q.subjects ?? [], {
                  subject: "",
                  grade: ""
                }]
              }), className: "text-[11px] text-caa-navy inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                " Add subject"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: (q.subjects ?? []).map((s, si) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_120px_auto] gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: input(), value: s.subject, onChange: (e) => update(i, {
                subjects: (q.subjects ?? []).map((x, xi) => xi === si ? {
                  ...x,
                  subject: e.target.value
                } : x)
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Subject…" }),
                subjects.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: sub }, sub))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: input(), value: s.grade, onChange: (e) => update(i, {
                subjects: (q.subjects ?? []).map((x, xi) => xi === si ? {
                  ...x,
                  grade: e.target.value
                } : x)
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Grade…" }),
                grades.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: g }, g))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => update(i, {
                subjects: (q.subjects ?? []).filter((_, xi) => xi !== si)
              }), className: "text-caa-danger px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] }, si)) })
          ] })
        ] })
      ] }, i);
    })
  ] });
}
function FileField({
  label: lbl,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: lbl }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 px-2 py-1.5 border border-dashed border-caa-border rounded-md text-xs text-caa-muted cursor-pointer hover:border-caa-navy", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: value || "Choose file…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", className: "hidden", onChange: (e) => {
        const f = e.target.files?.[0];
        if (f) onChange(f.name);
      } })
    ] })
  ] });
}
function SkillsStep({
  data,
  setData
}) {
  const [text, setText] = reactExports.useState("");
  const add = () => {
    const t = text.trim();
    if (!t) return;
    setData({
      ...data,
      skills: [...data.skills, t]
    });
    setText("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted", children: 'Add certifications or professional skills, e.g. "Certified in Python", "ICAO English Level 4".' }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: text, placeholder: "Add a skill or certification", onChange: (e) => setText(e.target.value), onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          add();
        }
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: add, className: "px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md hover:bg-caa-navy-2 inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
        " Add"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2.5 py-1 bg-caa-surface border border-caa-border rounded-full text-xs flex items-center gap-1", children: [
        s,
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setData({
          ...data,
          skills: data.skills.filter((_, idx) => idx !== i)
        }), className: "text-caa-danger", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
      ] }, i)),
      data.skills.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted", children: "No skills added yet." })
    ] })
  ] });
}
function ExperienceStep({
  data,
  setData
}) {
  const add = () => setData({
    ...data,
    experience: [...data.experience, {
      title: "",
      organisation: "",
      start: "",
      end: "",
      description: ""
    }]
  });
  const upd = (i, p) => setData({
    ...data,
    experience: data.experience.map((x, idx) => idx === i ? {
      ...x,
      ...p
    } : x)
  });
  const rm = (i) => setData({
    ...data,
    experience: data.experience.filter((_, idx) => idx !== i)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    data.experience.map((x, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-caa-border rounded-md p-3 bg-caa-surface/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Job title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: x.title, onChange: (e) => upd(i, {
            title: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Organisation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: x.organisation, onChange: (e) => upd(i, {
            organisation: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Start date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "month", className: input(), value: x.start, onChange: (e) => upd(i, {
            start: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "End date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "month", className: input(), value: x.end, onChange: (e) => upd(i, {
            end: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileField, { label: "Proof of experience", value: x.proofFile, onChange: (name) => upd(i, {
          proofFile: name
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Brief description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, className: input(), value: x.description, onChange: (e) => upd(i, {
            description: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => rm(i), className: "text-caa-danger text-xs mt-2 inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
        " Remove"
      ] })
    ] }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: add, className: "px-3 py-1.5 text-sm border border-dashed border-caa-border rounded-md text-caa-navy hover:border-caa-navy inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
      " Add experience"
    ] })
  ] });
}
function RefereesStep({
  data,
  setData
}) {
  const upd = (i, p) => setData({
    ...data,
    referees: data.referees.map((x, idx) => idx === i ? {
      ...x,
      ...p
    } : x)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted", children: "At least two referees required. They are contacted only if you are shortlisted." }),
    data.referees.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-caa-border rounded-md p-3 bg-caa-surface/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-caa-body mb-2", children: [
        "Referee ",
        i + 1
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Full name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: r.name, onChange: (e) => upd(i, {
            name: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: r.title, onChange: (e) => upd(i, {
            title: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Organisation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: r.organisation, onChange: (e) => upd(i, {
            organisation: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: input(), value: r.phone, onChange: (e) => upd(i, {
            phone: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", className: input(), value: r.email, onChange: (e) => upd(i, {
            email: e.target.value
          }) })
        ] })
      ] })
    ] }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setData({
      ...data,
      referees: [...data.referees, {
        name: "",
        title: "",
        organisation: "",
        phone: "",
        email: ""
      }]
    }), className: "px-3 py-1.5 text-sm border border-dashed border-caa-border rounded-md text-caa-navy hover:border-caa-navy inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
      " Add referee"
    ] })
  ] });
}
function ReviewStep({
  data,
  job,
  onJump
}) {
  const sections = [{
    title: "Personal",
    step: 0,
    render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
      data.personal.firstName,
      " ",
      data.personal.lastName,
      " · ",
      data.personal.email,
      " · ",
      data.personal.phone || "—",
      " · DOB ",
      data.personal.dob || "—"
    ] })
  }, {
    title: "Qualifications",
    step: 1,
    render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-caa-muted", children: [
        "Highest: ",
        data.highestLevel || "—"
      ] }),
      data.qualifications.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "· ",
        q.level,
        " — ",
        q.course || q.school || "—",
        " (",
        q.year || "—",
        ")"
      ] }, i)),
      data.qualifications.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-caa-muted", children: "No qualifications added." })
    ] })
  }, {
    title: "Skills",
    step: 2,
    render: () => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: data.skills.join(" · ") || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caa-muted", children: "None" }) })
  }, {
    title: "Experience",
    step: 3,
    render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm space-y-1", children: [
      data.experience.map((x, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        "· ",
        x.title,
        " @ ",
        x.organisation,
        " (",
        x.start,
        " → ",
        x.end || "present",
        ")"
      ] }, i)),
      data.experience.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-caa-muted", children: "No experience added." })
    ] })
  }, {
    title: "Referees",
    step: 4,
    render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
      data.referees.filter((r) => r.name).length,
      " provided"
    ] })
  }, {
    title: "Next of Kin",
    step: 5,
    render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
      data.nextOfKin.name || "—",
      " (",
      data.nextOfKin.relationship || "—",
      ")"
    ] })
  }, {
    title: "Photo",
    step: 6,
    render: () => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: data.photoFile || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caa-muted", children: "Not uploaded" }) })
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-3 border-l-[3px] border-l-caa-navy text-xs", children: [
      "Applying for ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-caa-body", children: job.title }),
      " · ",
      job.salaryBand,
      " · Min age ",
      job.minAge,
      " · ",
      job.requiredExperience,
      " yrs exp · ",
      job.requiredQualification,
      "."
    ] }),
    sections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-caa-border rounded-md p-3 flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-caa-body mb-1", children: s.title }),
        s.render()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onJump(s.step), className: "text-xs text-caa-navy hover:underline inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
        " Edit"
      ] })
    ] }, s.title))
  ] });
}
export {
  ApplyPage as component
};
