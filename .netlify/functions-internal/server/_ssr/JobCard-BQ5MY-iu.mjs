import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useApp } from "./router-B9-5xq1U.mjs";
import { g as Sparkles, b as MapPin, h as Banknote, i as Calendar, j as BookmarkCheck, k as Bookmark } from "../_libs/lucide-react.mjs";
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
function matchFor(id) {
  return 68 + id * 37 % 29;
}
function JobCard({ job }) {
  const { pushToast } = useApp();
  const navigate = useNavigate();
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setSaved(readSaved().includes(job.id));
  }, [job.id]);
  const toggleSaved = () => {
    const cur = readSaved();
    const next = cur.includes(job.id) ? cur.filter((i) => i !== job.id) : [...cur, job.id];
    writeSaved(next);
    setSaved(next.includes(job.id));
    pushToast({ type: "info", title: next.includes(job.id) ? "Saved for later" : "Removed from saved", message: job.title });
  };
  const handleApply = () => {
    navigate({ to: "/job", search: { jobId: job.id } });
  };
  const score = matchFor(job.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: handleApply,
      className: `caa-card caa-card-hover caa-lift p-5 flex flex-col gap-3 cursor-pointer ${job.featured ? "border-l-[3px] border-l-caa-navy" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full bg-caa-surface text-caa-navy text-[11px] font-medium", children: job.dept }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2.5 py-1 rounded-full text-[11px] font-medium ${job.type === "Contract" ? "bg-caa-warning/10 text-caa-warning" : "bg-caa-success/10 text-caa-success"}`, children: job.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-caa-navy/10 text-caa-navy text-[10px] font-semibold", children: job.salaryBand }),
          job.visibility === "internal" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-caa-navy-2 text-white text-[10px] font-semibold", children: "Internal only" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-caa-navy", title: "Estimated profile match", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            " ",
            score,
            "% match"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-caa-body leading-snug", children: job.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-5 gap-y-2 text-sm text-caa-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-caa-light" }),
            job.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "h-4 w-4 text-caa-light" }),
            job.salary
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-caa-muted flex flex-wrap gap-x-3 gap-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Min age ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caa-body font-medium", children: job.minAge })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Experience ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-caa-body font-medium", children: [
              job.requiredExperience,
              "y"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Qualification ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caa-body font-medium", children: job.requiredQualification })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 mt-auto border-t border-caa-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-caa-muted flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            " Closes ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caa-danger font-medium", children: job.closes })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  toggleSaved();
                },
                "aria-label": saved ? "Remove from saved" : "Save for later",
                className: "p-2 rounded-md border border-caa-border text-caa-navy hover:border-caa-navy hover:bg-caa-surface",
                children: saved ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleApply,
                className: "px-4 py-2 bg-caa-navy text-white text-sm font-semibold rounded-md hover:bg-caa-navy-2 transition-colors",
                children: "View Details"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  JobCard as J
};
