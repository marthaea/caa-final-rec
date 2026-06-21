import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { J as JobCard } from "./JobCard-BQ5MY-iu.mjs";
import { u as useApp } from "./router-B9-5xq1U.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
const TABS = [{
  key: "all",
  label: "All Roles",
  count: 12
}, {
  key: "atm",
  label: "Air Traffic Mgmt",
  count: 3
}, {
  key: "safety",
  label: "Aviation Safety",
  count: 4
}, {
  key: "finance",
  label: "Finance & Admin",
  count: 2
}, {
  key: "ict",
  label: "ICT & Systems",
  count: 2
}, {
  key: "legal",
  label: "Legal",
  count: 1
}];
function VacanciesPage() {
  const {
    jobs,
    canSeeJob,
    auth
  } = useApp();
  const [active, setActive] = reactExports.useState("all");
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 380);
    return () => clearTimeout(t);
  }, [active]);
  const visible = jobs.filter(canSeeJob);
  const filtered = active === "all" ? visible : visible.filter((j) => j.deptKey === active);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-hero-bg py-10 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-white text-3xl md:text-4xl", children: "Current Vacancies" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/70 mt-1.5 text-sm", children: [
        visible.length,
        " positions open · Updated June 2026",
        auth.isLoggedIn && auth.effectiveType === "internal" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 inline-block px-2 py-0.5 rounded-full bg-white/15 text-white text-[11px]", children: "Internal access" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActive(t.key), className: `shrink-0 px-4 py-2 text-sm rounded-full border transition-colors ${active === t.key ? "bg-caa-navy text-white border-caa-navy" : "bg-white text-caa-body border-caa-border hover:border-caa-navy"}`, children: [
        t.label,
        " (",
        t.count,
        ")"
      ] }, t.key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 mt-6", children: loading ? Array.from({
        length: 4
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-skeleton h-5 w-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-skeleton h-5 w-16" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-skeleton h-5 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-skeleton h-4 w-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-3 border-t border-caa-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-skeleton h-4 w-28" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-skeleton h-8 w-24" })
        ] })
      ] }, i)) : filtered.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job: j }, j.id)) }),
      !loading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-caa-muted py-10", children: "No vacancies in this category." })
    ] }) })
  ] });
}
export {
  VacanciesPage as component
};
