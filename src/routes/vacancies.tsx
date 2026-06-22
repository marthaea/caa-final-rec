import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { JobCard } from "@/components/JobCard";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/vacancies")({
  head: () => ({
    meta: [
      { title: "Current Vacancies — CAA Uganda" },
      { name: "description", content: "Browse all open roles at the Civil Aviation Authority of Uganda." },
      { property: "og:title", content: "Current Vacancies — CAA Uganda" },
      { property: "og:description", content: "12 positions open across Air Traffic, Safety, Finance, ICT and Legal." },
    ],
  }),
  component: VacanciesPage,
});

const DEPT_TABS = [
  { key: "all",     label: "All Roles" },
  { key: "atm",     label: "Air Traffic Mgmt" },
  { key: "safety",  label: "Aviation Safety" },
  { key: "finance", label: "Finance & Admin" },
  { key: "ict",     label: "ICT & Systems" },
  { key: "legal",   label: "Legal" },
  { key: "ops",     label: "Operations" },
];

function VacanciesPage() {
  const { jobs, canSeeJob, auth } = useApp();
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 380);
    return () => clearTimeout(t);
  }, [active]);
  const visible = jobs.filter(canSeeJob);
  const filtered = active === "all" ? visible : visible.filter((j) => j.deptKey === active);
  const tabCount = (key: string) => key === "all" ? visible.length : visible.filter((j) => j.deptKey === key).length;
  const tabs = DEPT_TABS.filter((t) => tabCount(t.key) > 0);

  return (
    <>
      <div className="caa-hero-bg py-10 px-4 sm:px-6">
        <div className="relative mx-auto max-w-6xl">
          <h1 className="font-bold text-white text-3xl md:text-4xl">Current Vacancies</h1>
          <p className="text-white/70 mt-1.5 text-sm">
            {visible.length} positions open · Updated June 2026
            {auth.isLoggedIn && auth.effectiveType === "internal" && (
              <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-white/15 text-white text-[11px]">Internal access</span>
            )}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 mt-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`shrink-0 px-4 py-2 text-sm rounded-full border transition-colors ${
                  active === t.key
                    ? "bg-caa-navy text-white border-caa-navy"
                    : "bg-white text-caa-body border-caa-border hover:border-caa-navy"
                }`}
              >
                {t.label} ({tabCount(t.key)})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="caa-card p-5 space-y-3">
                    <div className="flex gap-2"><div className="caa-skeleton h-5 w-20" /><div className="caa-skeleton h-5 w-16" /></div>
                    <div className="caa-skeleton h-5 w-3/4" />
                    <div className="caa-skeleton h-4 w-1/2" />
                    <div className="flex justify-between pt-3 border-t border-caa-border">
                      <div className="caa-skeleton h-4 w-28" />
                      <div className="caa-skeleton h-8 w-24" />
                    </div>
                  </div>
                ))
              : filtered.map((j) => <JobCard key={j.id} job={j} />)}
          </div>
          {!loading && filtered.length === 0 && (
            <p className="text-center text-caa-muted py-10">No vacancies in this category.</p>
          )}
        </div>
      </div>
    </>
  );
}