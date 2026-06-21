import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route$4, u as useApp } from "./router-B9-5xq1U.mjs";
import { n as CircleAlert, r as ArrowLeft, b as MapPin, h as Banknote, i as Calendar, j as BookmarkCheck, k as Bookmark, d as CircleCheck, c as ChevronRight, B as Briefcase, s as GraduationCap, C as Clock, t as Users } from "../_libs/lucide-react.mjs";
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
const DETAILS = {
  1: {
    about: "The Senior Air Traffic Controller will be responsible for managing and coordinating aircraft movements in Ugandan airspace, ensuring maximum safety and efficiency at Entebbe International Airport and surrounding approach zones. This is a senior technical role requiring ICAO-standard licensing and a strong safety culture.",
    responsibilities: ["Provide ATC service to aircraft operating in the Entebbe TMA and ACC sectors", "Ensure safe separation of IFR and VFR traffic in accordance with ICAO Doc 4444", "Mentor and evaluate junior controllers during on-the-job training", "Coordinate with adjacent FIRs (Nairobi, Dar es Salaam) for traffic handoffs", "Complete mandatory shift occurrence logs and safety reports", "Participate in emergency exercises and contingency drills"],
    requirements: ["Bachelor's Degree in Aviation, Physics, Electronics or related field", "Valid ICAO ATC licence (ADC/APP/ACC rating) from a recognised ANSP", "Minimum 5 years post-rating experience in an operational ATC environment", "Current medical certificate (Class 3 or above) issued within 12 months", "Proficiency in English ICAO level 4 or above", "Age 25–45 years at date of application"],
    benefits: ["Competitive salary in the UG4 band (UGX 4.2M – 5.8M per month)", "Annual ATC proficiency allowance and shift differential pay", "Employer-funded ICAO recurrency training every 24 months", "Medical cover for employee and immediate family", "Defined-benefit pension scheme (Public Service Pension Fund)", "34 days annual leave plus public holidays"]
  },
  2: {
    about: "The Principal Safety Inspector (Airworthiness) will oversee the continued airworthiness programmes of Ugandan-registered aircraft and Approved Maintenance Organisations (AMOs). The role sits within the Aviation Safety Directorate and reports to the Director of Aviation Safety.",
    responsibilities: ["Conduct ramp inspections of Ugandan-registered and foreign aircraft on oversight visits", "Approve, audit and surveil AMOs against UCAA Airworthiness Standards and ICAO Annex 8", "Review and approve Aircraft Maintenance Programmes (AMPs) and Engineering Orders", "Investigate airworthiness-related incidents and accidents in support of AIB Uganda", "Issue and renew Certificates of Airworthiness and noise certificates", "Draft airworthiness directives and safety bulletins for Ugandan operators"],
    requirements: ["Bachelor's Degree in Aeronautical/Mechanical Engineering or equivalent", "Valid EASA Part-66 or UCAA Aircraft Maintenance Engineer Licence (Category B1/B2/C)", "At least 7 years airworthiness or AMO quality experience", "Demonstrated knowledge of ICAO Annex 8 and ICAO Doc 9760", "Strong written English for regulatory correspondence", "Age 28–50 years at date of application"],
    benefits: ["Salary in the UG3 band (UGX 3.8M – 5.2M per month)", "Annual overseas regulatory training (ICAO, EASA, FAA programmes)", "Inspector uniform allowance and tool provision", "Medical cover for employee and immediate family", "Housing allowance (Kampala HQ-based role)", "34 days annual leave plus public holidays"]
  },
  3: {
    about: "The Systems Administrator will maintain and secure CAA Uganda's IT infrastructure, including servers, network equipment, enterprise applications and end-user devices across all UCAA sites. The role is based at Kampala HQ with occasional travel to Entebbe Airport.",
    responsibilities: ["Administer Windows Server, Linux and virtualisation environments (VMware/Hyper-V)", "Manage Active Directory, Group Policy, DNS, DHCP and Exchange/M365", "Monitor network performance, maintain firewalls and enforce access-control policies", "Implement and test disaster-recovery and business-continuity plans", "Manage IT procurement, vendor relationships and asset registers", "Provide Tier-2 and Tier-3 helpdesk escalation support"],
    requirements: ["Bachelor's Degree in Computer Science, IT or related field", "Minimum 3 years enterprise IT administration experience", "Certifications desirable: CompTIA Security+, CCNA, Microsoft MCSA or equivalent", "Solid understanding of TCP/IP networking and cybersecurity principles", "Experience with backup software (Veeam, Acronis) and monitoring tools", "Age 23–40 years at date of application"],
    benefits: ["Salary in the UG5 band (UGX 2.6M – 3.5M per month)", "Annual professional development budget (certifications, training)", "Home internet allowance for on-call duties", "Medical cover for employee and immediate family", "Defined-benefit pension scheme", "30 days annual leave plus public holidays"]
  },
  4: {
    about: "The Finance Officer (Revenue Assurance) will safeguard UCAA's income streams from aeronautical charges, overflights, licensing fees and other statutory levies. The role sits in the Finance & Administration Directorate and works closely with the Director of Finance.",
    responsibilities: ["Reconcile IATA Billing Settlement Plan (BSP) invoices and airline debt statements", "Monitor and report on en-route and terminal navigation charge collections", "Identify and resolve revenue leakage across all UCAA fee categories", "Prepare monthly revenue-assurance dashboards for senior management", "Support external audits (OAG, Auditor General) with schedules and workings", "Liaise with legal counsel on debt recovery matters"],
    requirements: ["Bachelor's Degree in Accounting, Finance or Business Administration", "Part-qualified or fully qualified CPA (U) / ACCA preferred", "At least 4 years experience in revenue assurance, audit or financial accounting", "Proficiency in Tally, QuickBooks or SAP Finance", "Strong Excel and data-analysis skills", "Age 25–45 years at date of application"],
    benefits: ["Contract salary in the UG5 band (UGX 2.8M – 3.6M per month)", "Performance bonus on revenue-collection targets", "Professional membership subscription (ICPAU) covered by UCAA", "Medical cover for employee and immediate family", "Public transport allowance", "28 days annual leave plus public holidays"]
  },
  5: {
    about: "The Legal Counsel (Aviation Regulations) will provide specialist legal advice across UCAA's regulatory and enforcement functions, drafting aviation legislation, negotiating bilateral air services agreements, and representing the Authority in administrative proceedings.",
    responsibilities: ["Draft, review and interpret aviation legislation, regulations and CAA orders", "Advise on bilateral air services agreements (BASAs) and ICAO obligations", "Represent UCAA in enforcement proceedings, appeals panels and mediation", "Review contracts with air operators, service providers and consultants", "Monitor regional (CASSOA) and international (ICAO, IATA) legal developments", "Train technical staff on regulatory compliance and enforcement powers"],
    requirements: ["LLB Degree from a recognised university; LLM in Air Law, International Law or equivalent an advantage", "Enrolled Advocate of the High Court of Uganda", "At least 5 years post-admission experience, with aviation or regulatory law preferred", "Familiarity with Chicago Convention, ICAO Standards and ECCAS/EAC frameworks", "Excellent drafting, research and advocacy skills", "Age 27–50 years at date of application"],
    benefits: ["Salary in the UG4 band (UGX 3.2M – 4.4M per month)", "Annual Law Development Centre (LDC) continuing-education fee paid by UCAA", "ICAO legal seminar participation sponsored by UCAA", "Medical cover for employee and immediate family", "Defined-benefit pension scheme", "34 days annual leave plus public holidays"]
  },
  6: {
    about: "The ATC Trainee (Graduate Entry) is a structured development programme designed to recruit and train the next generation of Ugandan air traffic controllers. Selected candidates will undergo an approved ATC training course before being assigned operational duties under supervision at Entebbe ACC.",
    responsibilities: ["Successfully complete the UCAA-approved ATC Basic Training course (12 months)", "Attain and maintain medical fitness to ICAO Class 3 standard", "Demonstrate English language proficiency at ICAO level 4 or above", "Progress through on-the-job training under a qualified OJTI", "Meet all competency assessments within the prescribed training timelines", "Contribute positively to safety culture and shift team performance"],
    requirements: ["Bachelor's Degree (minimum Second Class Lower) in Physics, Mathematics, Engineering, Aviation or related STEM field", "No prior ATC experience required — full training provided", "Excellent spatial awareness, multitasking ability and stress tolerance", "Normal colour vision; meets ICAO Class 3 medical requirements", "Strong communication skills in English", "Age 21–30 years at date of application"],
    benefits: ["Training stipend in the UG7 band (UGX 1.8M – 2.4M per month during training)", "Full cost of ICAO ATC basic training course covered by UCAA", "Progression to substantive ATC post upon licence issue", "Medical cover for employee and immediate family", "Defined-benefit pension scheme from confirmation of appointment", "30 days annual leave plus public holidays"]
  },
  7: {
    about: "The Manager, Aerodrome Operations will lead all day-to-day operational activities at Entebbe International Airport, ensuring compliance with ICAO Annex 14 and UCAA Aerodrome Standards. This is an internal-only senior management role open exclusively to substantive UCAA staff.",
    responsibilities: ["Oversee airside and landside operations including movement areas, lighting and markings", "Manage a team of aerodrome operations officers and ground-handling liaison personnel", "Ensure the Aerodrome Manual is current and fully implemented", "Chair the Aerodrome Safety Committee and coordinate Wildlife Hazard Management", "Lead emergency response exercises in conjunction with Uganda Police and KCCA", "Prepare annual capital and operational budget proposals for Aerodrome Operations"],
    requirements: ["Master's Degree in Airport Management, Aviation Operations or equivalent", "At least 8 years in aerodrome operations with a minimum of 3 years at supervisory level", "ICAO Aerodrome Operations certificate or equivalent (IATA/ACI-NA endorsed)", "Current UCAA staff member at senior officer grade or above (internal applicants only)", "Demonstrated leadership, budget management and stakeholder engagement skills", "Age 30–55 years at date of application"],
    benefits: ["Salary in the UG2 band (UGX 5.5M – 7.0M per month)", "Vehicle and fuel allowance for operational duties", "ACI World congress participation funded annually", "Medical cover for employee, spouse and dependants", "Defined-benefit pension scheme", "34 days annual leave plus public holidays"]
  }
};
const DEFAULT_DETAIL = {
  about: "This is an exciting opportunity to join Uganda's national aviation regulator. Full details will be provided to shortlisted candidates.",
  responsibilities: ["Carry out the duties of the post as assigned by the supervisor", "Uphold UCAA values of safety, integrity and service excellence"],
  requirements: ["See advertised qualification and experience requirements", "Uganda citizenship or valid work permit"],
  benefits: ["Competitive salary within the advertised band", "Medical cover and pension scheme", "Annual leave plus public holidays"]
};
const SAVED_KEY = "caa_saved_jobs_v1";
function readSaved() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeSaved(ids) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
  } catch {
  }
}
function JobDetailPage() {
  const {
    jobId
  } = Route$4.useSearch();
  const {
    jobs,
    auth,
    openSignInPrompt,
    pushToast
  } = useApp();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === jobId);
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setSaved(readSaved().includes(jobId));
  }, [jobId]);
  if (!job) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-10 w-10 text-caa-danger mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-caa-body", children: "Vacancy not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-caa-muted mt-2 mb-6", children: "This listing may have been removed or the link is invalid." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vacancies", className: "inline-flex items-center gap-2 px-5 py-2.5 bg-caa-navy text-white text-sm font-semibold rounded-md hover:bg-caa-navy-2 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to Vacancies"
      ] })
    ] });
  }
  const detail = DETAILS[jobId] ?? DEFAULT_DETAIL;
  const isExpired = new Date(job.closesAt) < /* @__PURE__ */ new Date();
  const toggleSaved = () => {
    const cur = readSaved();
    const next = cur.includes(jobId) ? cur.filter((i) => i !== jobId) : [...cur, jobId];
    writeSaved(next);
    setSaved(next.includes(jobId));
    pushToast({
      type: "info",
      title: next.includes(jobId) ? "Saved for later" : "Removed from saved",
      message: job.title
    });
  };
  const handleApply = () => {
    if (!auth.isLoggedIn) {
      openSignInPrompt();
      return;
    }
    navigate({
      to: "/apply",
      search: {
        jobId
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-hero-bg py-10 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vacancies", className: "inline-flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider mb-5 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
        " All Vacancies"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start gap-4 justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full bg-white/15 text-white text-[11px] font-semibold", children: job.dept }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2.5 py-1 rounded-full text-[11px] font-semibold ${job.type === "Contract" ? "bg-caa-warning/25 text-caa-warning" : "bg-caa-success/25 text-caa-success"}`, children: job.type }),
            job.visibility === "internal" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full bg-caa-gold/30 text-caa-gold text-[11px] font-semibold", children: "Internal only" }),
            job.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full bg-caa-gold text-caa-navy text-[11px] font-semibold", children: "Featured" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-extrabold text-white text-3xl md:text-4xl leading-tight", children: job.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-5 gap-y-2 mt-3 text-white/75 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
              job.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "h-4 w-4" }),
              job.salary,
              " · ",
              job.salaryBand
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-1.5 ${isExpired ? "text-caa-danger" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
              isExpired ? "Closed" : `Closes ${job.closes}`
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: toggleSaved, "aria-label": saved ? "Remove from saved" : "Save for later", className: "flex items-center gap-2 px-4 py-2.5 border border-white/40 text-white text-sm font-semibold rounded-md hover:bg-white/10 transition-colors", children: [
            saved ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" }),
            saved ? "Saved" : "Save"
          ] }),
          !isExpired && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleApply, className: "px-6 py-2.5 bg-white text-caa-navy text-sm font-semibold rounded-md hover:bg-caa-gold-2 transition-colors", children: "Apply Now" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-caa-body mb-3", children: "About the Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caa-muted text-[15px] leading-relaxed", children: detail.about })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-caa-body mb-3", children: "Key Responsibilities" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: detail.responsibilities.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm text-caa-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-caa-success shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-caa-body mb-3", children: "Minimum Requirements" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: detail.requirements.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm text-caa-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-caa-navy shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-caa-body mb-3", children: "What We Offer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: detail.benefits.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm text-caa-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-caa-gold shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-caa-surface rounded-xl border border-caa-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-caa-body mb-2", children: "How to Apply" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-caa-muted mb-4", children: "All applications must be submitted through the CAA Uganda e-Recruitment portal. Create a candidate account (or sign in if you already have one), then complete the online application form and attach your CV and academic documents." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 text-xs text-caa-muted list-disc list-inside mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Online applications only — no hard copies accepted" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Upload CV and certified copies of academic transcripts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Shortlisted candidates will be contacted within 14 working days" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "CAA Uganda does not charge any recruitment fees" })
          ] }),
          isExpired ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-caa-danger", children: "Applications for this vacancy have closed." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleApply, className: "px-6 py-3 bg-caa-navy text-white text-sm font-semibold rounded-md hover:bg-caa-navy-2 transition-colors", children: "Start Your Application" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base text-caa-body", children: "Quick Facts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [{
            Icon: Briefcase,
            label: "Employment type",
            value: job.type
          }, {
            Icon: MapPin,
            label: "Location",
            value: job.location
          }, {
            Icon: Banknote,
            label: "Salary band",
            value: `${job.salaryBand} · ${job.salary}`
          }, {
            Icon: GraduationCap,
            label: "Min qualification",
            value: job.requiredQualification
          }, {
            Icon: Clock,
            label: "Min experience",
            value: `${job.requiredExperience} year${job.requiredExperience !== 1 ? "s" : ""}`
          }, {
            Icon: Users,
            label: "Min age",
            value: `${job.minAge} years`
          }, {
            Icon: Calendar,
            label: "Closing date",
            value: job.closes
          }].map(({
            Icon,
            label,
            value
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-caa-light shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-caa-muted uppercase tracking-wider", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-caa-body", children: value })
            ] })
          ] }, label)) })
        ] }),
        !isExpired && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-caa-body mb-1", children: "Ready to apply?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-caa-muted mb-4", children: [
            "Closes ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caa-danger font-medium", children: job.closes })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleApply, className: "w-full py-3 bg-caa-navy text-white text-sm font-semibold rounded-md hover:bg-caa-navy-2 transition-colors mb-3", children: "Apply Now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: toggleSaved, className: "w-full py-2.5 border border-caa-border text-caa-body text-sm font-semibold rounded-md hover:border-caa-navy hover:text-caa-navy transition-colors flex items-center justify-center gap-2", children: [
            saved ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" }),
            saved ? "Saved for later" : "Save for later"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-caa-border bg-caa-surface p-4 text-xs text-caa-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-caa-body mb-1", children: "Equal Opportunity Employer" }),
          "CAA Uganda is an equal opportunity employer. All qualified applicants will receive consideration for employment without regard to gender, disability, religion or ethnic origin."
        ] })
      ] })
    ] }) })
  ] });
}
export {
  JobDetailPage as component
};
