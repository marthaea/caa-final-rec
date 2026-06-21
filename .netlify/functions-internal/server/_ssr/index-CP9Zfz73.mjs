import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { J as JobCard } from "./JobCard-BQ5MY-iu.mjs";
import { u as useApp, h as heroImg, e as heroOffices, f as heroJet } from "./router-B9-5xq1U.mjs";
import { C as Clock, S as Search, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
function Home() {
  const {
    jobs
  } = useApp();
  const [q, setQ] = reactExports.useState("");
  const [dept, setDept] = reactExports.useState("All");
  const [loc, setLoc] = reactExports.useState("All");
  const filtered = reactExports.useMemo(() => {
    return jobs.filter((j) => {
      const matchesQ = !q || (j.title + j.dept).toLowerCase().includes(q.toLowerCase());
      const matchesDept = dept === "All" || j.dept === dept;
      const matchesLoc = loc === "All" || j.location === loc;
      return matchesQ && matchesDept && matchesLoc;
    });
  }, [jobs, q, dept, loc]);
  const shown = filtered.slice(0, 4);
  const slides = [heroImg, heroOffices, heroJet];
  const [slide, setSlide] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 2e3);
    return () => clearInterval(t);
  }, [slides.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "caa-hero-photo pt-20 pb-36 px-4 sm:px-6 overflow-hidden", children: [
      slides.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `caa-hero-slide ${i === slide ? "is-active" : ""}`, style: {
        backgroundImage: `url(${src})`
      }, "aria-hidden": true }, src)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mx-auto max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/40 text-white/90 text-xs backdrop-blur-sm caa-fade-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
          " Applications Open — 2026 Recruitment Cycle"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-extrabold text-white text-4xl md:text-6xl leading-[1.05] mt-6 caa-fade-up caa-delay-1", children: "Build Your Career in Aviation Excellence" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 max-w-xl mt-5 text-base md:text-lg caa-fade-up caa-delay-2", children: "Join Uganda's national aviation regulator. We're looking for skilled professionals committed to advancing safe, secure and sustainable air transport." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-8 caa-fade-up caa-delay-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vacancies", className: "px-6 py-3 bg-white text-caa-navy font-semibold rounded-md hover:bg-caa-gold-2 transition-colors", children: "Browse Vacancies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#featured", className: "px-6 py-3 border border-white/50 text-white font-semibold rounded-md hover:bg-white/10 transition-colors", children: "See Open Roles" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "caa-diag-divider absolute bottom-0 left-0 right-0", viewBox: "0 0 1440 48", preserveAspectRatio: "none", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "0,48 1440,0 1440,48", fill: "#F6F4EF" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 -mt-20 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-5xl bg-white rounded-xl border border-caa-border shadow-[0_10px_40px_-10px_rgba(11,46,95,0.18)] p-4 md:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-caa-light" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search for job title, department or keyword…", className: "w-full pl-10 pr-3 py-2.5 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: dept, onChange: (e) => setDept(e.target.value), className: "px-3 py-2.5 text-sm border border-caa-border rounded-md bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Departments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Air Traffic Mgmt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Aviation Safety" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Finance & Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "ICT & Systems" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Legal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: loc, onChange: (e) => setLoc(e.target.value), className: "px-3 py-2.5 text-sm border border-caa-border rounded-md bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Locations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Kampala HQ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Entebbe Airport" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-6 py-2.5 bg-caa-gold text-caa-navy text-sm font-semibold rounded-md hover:bg-caa-gold-2 transition-colors", children: "Search" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 sm:px-6 mt-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-5xl bg-white rounded-xl border border-caa-border py-6 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-caa-border", children: [{
      n: "12",
      l: "Open Positions"
    }, {
      n: "4",
      l: "Departments Hiring"
    }, {
      n: "380+",
      l: "Staff Employed"
    }, {
      n: "2,100+",
      l: "Applications This Year"
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-3xl text-caa-navy", children: s.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted mt-1", children: s.l })
    ] }, s.l)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "featured", className: "px-4 sm:px-6 mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-2xl text-caa-body", children: "Featured Vacancies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vacancies", className: "text-sm text-caa-navy hover:text-caa-gold inline-flex items-center gap-1", children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: shown.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job: j }, j.id)) }),
      shown.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-caa-muted py-10", children: "No vacancies match your search." })
    ] }) })
  ] });
}
export {
  Home as component
};
