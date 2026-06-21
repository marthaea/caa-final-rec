import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { ChevronLeft, ChevronRight, Plus, Trash2, Check, AlertCircle, Pencil, Upload } from "lucide-react";
import { useApp, EMPTY_CV, type CvProfile, type CvQualification, type QualLevel } from "@/context/AppContext";
import { SuccessModal } from "@/components/SuccessModal";
import { O_LEVEL_SUBJECTS, A_LEVEL_SUBJECTS, O_LEVEL_GRADES, A_LEVEL_GRADES, QUAL_LEVELS } from "@/lib/uganda-curriculum";

export const Route = createFileRoute("/apply")({
  validateSearch: z.object({ jobId: z.coerce.number().optional() }),
  head: () => ({ meta: [{ title: "Apply — CAA Uganda" }] }),
  component: ApplyPage,
});

const STEPS = ["Personal", "Qualifications", "Skills", "Experience", "Referees", "Next of Kin", "Photo", "Review"];

function input(cls = "") { return "w-full px-2.5 py-1.5 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy bg-white " + cls; }
const label = "block text-xs font-medium text-caa-body mb-1";

function ApplyPage() {
  const { auth, openSignInPrompt, jobs, cv, hasCv, saveCv, addApplication, pushToast } = useApp();
  const { jobId } = Route.useSearch();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === jobId) ?? jobs[0];

  useEffect(() => { if (!auth.isLoggedIn) openSignInPrompt(); }, [auth.isLoggedIn, openSignInPrompt]);

  // If CV already built, start at Review for "edit before resubmit"
  const [step, setStep] = useState(hasCv ? STEPS.length - 1 : 0);
  const [data, setData] = useState<CvProfile>(() => {
    if (hasCv) return cv;
    return { ...EMPTY_CV, personal: { ...EMPTY_CV.personal, firstName: auth.firstName, lastName: auth.lastName, email: auth.email } };
  });
  const [submitted, setSubmitted] = useState<string | null>(null);

  const ageOk = useMemo(() => {
    if (!data.personal.dob) return null;
    const age = Math.floor((Date.now() - new Date(data.personal.dob).getTime()) / (365.25 * 24 * 3600 * 1000));
    return age >= job.minAge;
  }, [data.personal.dob, job.minAge]);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    if (ageOk === false) { pushToast({ type: "warning", title: `Minimum age for this role is ${job.minAge}` }); return; }
    if (data.referees.filter((r) => r.name.trim()).length < 2) { pushToast({ type: "warning", title: "Provide at least two referees" }); return; }
    saveCv(data);
    const ref = "REF-2026-" + String(Math.floor(Math.random() * 100000)).padStart(5, "0");
    addApplication({
      abbr: job.abbr, title: job.title, dept: job.dept, jobId: job.id, completion: 100,
      candidateEmail: auth.email, candidateName: `${data.personal.firstName} ${data.personal.lastName}`.trim(),
    });
    setSubmitted(ref);
    pushToast({ type: "success", title: "Application submitted", message: "Your CV is saved and will pre-fill next time." });
  };

  /* ---------- per-step pieces ---------- */
  const setPersonal = (p: Partial<CvProfile["personal"]>) => setData({ ...data, personal: { ...data.personal, ...p } });

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-4">
          {/* CV Quick-fill banner */}
          <div className="rounded-lg border border-caa-navy/20 bg-caa-navy/5 p-3 flex items-start gap-3">
            <Upload className="h-4 w-4 text-caa-navy mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-caa-navy">Quick-fill from existing CV</p>
              <p className="text-[11px] text-caa-muted mt-0.5">Upload a plain-text or PDF CV and we'll try to auto-fill the fields below.</p>
            </div>
            <label className="shrink-0 cursor-pointer px-3 py-1.5 text-xs font-semibold bg-caa-navy text-white rounded-md hover:bg-caa-navy-2 transition-colors">
              Upload CV
              <input type="file" accept=".txt,.pdf,.doc,.docx" className="sr-only" onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const text = (ev.target?.result as string) ?? "";
                  const email = text.match(/[\w.+-]+@[\w-]+\.\w{2,6}/)?.[0] ?? "";
                  const phone = text.match(/(\+256|0)[0-9\s-]{8,12}/)?.[0]?.replace(/\s|-/g, "") ?? "";
                  const nin = text.match(/[A-Z]{2}\d{7}[A-Z]{1}/)?.[0] ?? "";
                  const dobMatch = text.match(/\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})\b/);
                  const dob = dobMatch ? `${dobMatch[3]}-${dobMatch[2].padStart(2,"0")}-${dobMatch[1].padStart(2,"0")}` : "";
                  const filled: Partial<typeof data.personal> = {};
                  if (email) filled.email = email;
                  if (phone) filled.phone = phone;
                  if (nin) filled.nin = nin;
                  if (dob) filled.dob = dob;
                  if (Object.keys(filled).length > 0) {
                    setPersonal(filled as any);
                    pushToast({ type: "success", title: "CV parsed", message: `${Object.keys(filled).length} field(s) auto-filled. Review and correct as needed.` });
                  } else {
                    pushToast({ type: "info", title: "Could not extract fields", message: "Please fill the form manually. Structured PDF text required." });
                  }
                };
                reader.readAsText(file);
              }} />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["First name", "firstName"], ["Surname", "lastName"], ["Other name", "otherName"],
              ["Phone", "phone"], ["Email", "email"], ["National ID (NIN)", "nin"],
              ["Nationality", "nationality"],
            ].map(([l, k]) => (
              <div key={k}>
                <label className={label}>{l}</label>
                <input className={input()} value={(data.personal as any)[k] ?? ""} onChange={(e) => setPersonal({ [k]: e.target.value } as any)} />
              </div>
            ))}
            <div>
              <label className={label}>Date of birth</label>
              <input type="date" className={input()} value={data.personal.dob} onChange={(e) => setPersonal({ dob: e.target.value })} />
              {ageOk === false && <p className="text-[11px] text-caa-danger mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Min age for this role is {job.minAge}.</p>}
            </div>
            <div>
              <label className={label}>Gender</label>
              <select className={input()} value={data.personal.gender} onChange={(e) => setPersonal({ gender: e.target.value })}>
                <option value="">Select…</option><option>Male</option><option>Female</option><option>Prefer not to say</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Address</label>
              <input className={input()} value={data.personal.address} onChange={(e) => setPersonal({ address: e.target.value })} />
            </div>
          </div>
        </div>
      );
      case 1: return <QualificationsStep data={data} setData={setData} />;
      case 2: return <SkillsStep data={data} setData={setData} />;
      case 3: return <ExperienceStep data={data} setData={setData} />;
      case 4: return <RefereesStep data={data} setData={setData} />;
      case 5: return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div><label className={label}>Full name</label><input className={input()} value={data.nextOfKin.name} onChange={(e) => setData({ ...data, nextOfKin: { ...data.nextOfKin, name: e.target.value } })} /></div>
          <div><label className={label}>Relationship</label>
            <select className={input()} value={data.nextOfKin.relationship} onChange={(e) => setData({ ...data, nextOfKin: { ...data.nextOfKin, relationship: e.target.value } })}>
              <option value="">Select…</option>{["Spouse","Parent","Sibling","Child","Guardian","Other"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div><label className={label}>Phone</label><input className={input()} value={data.nextOfKin.phone} onChange={(e) => setData({ ...data, nextOfKin: { ...data.nextOfKin, phone: e.target.value } })} /></div>
        </div>
      );
      case 6: return (
        <div>
          <label className={label}>Passport-size photo (image only, ≤ 2MB)</label>
          <div className="border-2 border-dashed border-caa-border rounded-md p-6 text-center bg-caa-surface">
            <Upload className="h-6 w-6 text-caa-muted mx-auto" />
            <input type="file" accept="image/*" className="mt-3 text-xs"
              onChange={(e) => {
                const f = e.target.files?.[0]; if (!f) return;
                if (f.size > 2 * 1024 * 1024) { pushToast({ type: "warning", title: "Photo too large (max 2MB)" }); return; }
                if (!f.type.startsWith("image/")) { pushToast({ type: "warning", title: "Image files only" }); return; }
                setData({ ...data, photoFile: f.name });
              }} />
            {data.photoFile && <p className="mt-2 text-xs text-caa-success flex items-center justify-center gap-1"><Check className="h-3 w-3" />{data.photoFile}</p>}
          </div>
        </div>
      );
      case 7: return <ReviewStep data={data} job={job} onJump={setStep} />;
      default: return null;
    }
  };

  return (
    <>
      <div className="caa-hero-bg py-8 px-4 sm:px-6">
        <div className="relative mx-auto max-w-5xl">
          <p className="text-white/65 text-xs">Applying for</p>
          <h1 className="font-bold text-white text-2xl md:text-3xl mt-1">{job.title}</h1>
          <p className="text-white/70 text-xs mt-1">{job.dept} · {job.location} · {job.salaryBand} · Closes {job.closes}</p>

          {/* Stepper */}
          <div className="flex items-center gap-1.5 mt-5 overflow-x-auto pb-1">
            {STEPS.map((s, i) => (
              <button key={s} onClick={() => setStep(i)} className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] border ${i === step ? "bg-white text-caa-navy border-white" : i < step ? "bg-white/15 text-white/80 border-white/20" : "text-white/60 border-white/20"}`}>
                {i + 1}. {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 mt-6 pb-12">
        <div className="mx-auto max-w-5xl">
          {hasCv && step !== STEPS.length - 1 && (
            <div className="caa-card p-3 mb-3 text-xs text-caa-muted flex items-center gap-2">
              <Pencil className="h-3.5 w-3.5 text-caa-navy" />
              Editing your saved CV — changes will replace your previous version on submit.
            </div>
          )}

          <div className="caa-card p-5">
            <h2 className="font-bold text-lg text-caa-body mb-4">{STEPS[step]}</h2>
            {renderStep()}
          </div>

          <div className="flex justify-between mt-5">
            <button onClick={back} disabled={step === 0} className="px-3 py-2 text-sm border border-caa-border rounded-md text-caa-body hover:bg-white disabled:opacity-40 inline-flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button onClick={next} className="px-4 py-2 text-sm bg-caa-navy text-white font-semibold rounded-md hover:bg-caa-navy-2 inline-flex items-center gap-1">
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={submit} className="px-5 py-2 text-sm bg-caa-navy text-white font-semibold rounded-md hover:bg-caa-navy-2">
                Submit application
              </button>
            )}
          </div>
        </div>
      </div>

      {submitted && (
        <SuccessModal refNumber={submitted} jobTitle={job.title} onClose={() => { setSubmitted(null); navigate({ to: "/dashboard" }); }} />
      )}
    </>
  );
}

/* ---------- Qualifications ---------- */
function QualificationsStep({ data, setData }: { data: CvProfile; setData: (d: CvProfile) => void }) {
  const add = (level: QualLevel) => {
    const q: CvQualification = { level, course: "", institution: "", year: "" };
    if (level === "O-Level" || level === "A-Level") { q.school = ""; q.indexNumber = ""; q.subjects = []; q.aggregate = ""; }
    setData({ ...data, qualifications: [...data.qualifications, q] });
  };
  const update = (i: number, patch: Partial<CvQualification>) => {
    setData({ ...data, qualifications: data.qualifications.map((q, idx) => idx === i ? { ...q, ...patch } : q) });
  };
  const remove = (i: number) => setData({ ...data, qualifications: data.qualifications.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-end">
        <div>
          <label className={label}>Highest level of education</label>
          <select className={input()} value={data.highestLevel} onChange={(e) => setData({ ...data, highestLevel: e.target.value as QualLevel })}>
            <option value="">Select…</option>
            {QUAL_LEVELS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUAL_LEVELS.map((l) => (
            <button key={l} onClick={() => add(l)} className="px-2 py-1 text-[11px] border border-caa-border rounded-md hover:border-caa-navy text-caa-navy inline-flex items-center gap-1">
              <Plus className="h-3 w-3" /> {l}
            </button>
          ))}
        </div>
      </div>

      {data.qualifications.length === 0 && <p className="text-xs text-caa-muted">Add at least one qualification using the buttons above.</p>}

      {data.qualifications.map((q, i) => {
        const isSecondary = q.level === "O-Level" || q.level === "A-Level";
        const subjects = q.level === "O-Level" ? O_LEVEL_SUBJECTS : A_LEVEL_SUBJECTS;
        const grades = q.level === "O-Level" ? O_LEVEL_GRADES : A_LEVEL_GRADES;
        return (
          <div key={i} className="border border-caa-border rounded-md p-3 space-y-3 bg-caa-surface/40">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-caa-body">{q.level}</p>
              <button onClick={() => remove(i)} className="text-caa-danger text-xs inline-flex items-center gap-1"><Trash2 className="h-3 w-3" /> Remove</button>
            </div>

            {!isSecondary && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2"><label className={label}>Course / programme</label><input className={input()} value={q.course} onChange={(e) => update(i, { course: e.target.value })} /></div>
                <div className="sm:col-span-2"><label className={label}>Institution</label><input className={input()} value={q.institution} onChange={(e) => update(i, { institution: e.target.value })} /></div>
                <div><label className={label}>Year of award</label><input className={input()} value={q.year} onChange={(e) => update(i, { year: e.target.value })} placeholder="YYYY" /></div>
                <div className="sm:col-span-3 grid grid-cols-2 gap-2">
                  <FileField label="Proof of award" value={q.awardFile} onChange={(name) => update(i, { awardFile: name })} />
                  <FileField label="Full official transcript" value={q.transcriptFile} onChange={(name) => update(i, { transcriptFile: name })} />
                </div>
              </div>
            )}

            {isSecondary && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2"><label className={label}>School</label><input className={input()} value={q.school ?? ""} onChange={(e) => update(i, { school: e.target.value })} /></div>
                  <div><label className={label}>Index number</label><input className={input()} value={q.indexNumber ?? ""} onChange={(e) => update(i, { indexNumber: e.target.value })} /></div>
                  <div><label className={label}>Year</label><input className={input()} value={q.year} onChange={(e) => update(i, { year: e.target.value })} placeholder="YYYY" /></div>
                  <div><label className={label}>Aggregate</label><input className={input()} value={q.aggregate ?? ""} onChange={(e) => update(i, { aggregate: e.target.value })} placeholder="e.g. 12" /></div>
                  <FileField label="Result slip" value={q.awardFile} onChange={(name) => update(i, { awardFile: name })} />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className={label}>Subjects & grades</label>
                    <button onClick={() => update(i, { subjects: [...(q.subjects ?? []), { subject: "", grade: "" }] })} className="text-[11px] text-caa-navy inline-flex items-center gap-1"><Plus className="h-3 w-3" /> Add subject</button>
                  </div>
                  <div className="space-y-1.5">
                    {(q.subjects ?? []).map((s, si) => (
                      <div key={si} className="grid grid-cols-[1fr_120px_auto] gap-2">
                        <select className={input()} value={s.subject} onChange={(e) => update(i, { subjects: (q.subjects ?? []).map((x, xi) => xi === si ? { ...x, subject: e.target.value } : x) })}>
                          <option value="">Subject…</option>{subjects.map((sub) => <option key={sub}>{sub}</option>)}
                        </select>
                        <select className={input()} value={s.grade} onChange={(e) => update(i, { subjects: (q.subjects ?? []).map((x, xi) => xi === si ? { ...x, grade: e.target.value } : x) })}>
                          <option value="">Grade…</option>{grades.map((g) => <option key={g}>{g}</option>)}
                        </select>
                        <button onClick={() => update(i, { subjects: (q.subjects ?? []).filter((_, xi) => xi !== si) })} className="text-caa-danger px-1"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FileField({ label: lbl, value, onChange }: { label: string; value?: string; onChange: (name: string) => void }) {
  return (
    <div>
      <label className={label}>{lbl}</label>
      <label className="flex items-center gap-2 px-2 py-1.5 border border-dashed border-caa-border rounded-md text-xs text-caa-muted cursor-pointer hover:border-caa-navy">
        <Upload className="h-3.5 w-3.5" />
        <span className="truncate">{value || "Choose file…"}</span>
        <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onChange(f.name); }} />
      </label>
    </div>
  );
}

/* ---------- Skills ---------- */
function SkillsStep({ data, setData }: { data: CvProfile; setData: (d: CvProfile) => void }) {
  const [text, setText] = useState("");
  const add = () => { const t = text.trim(); if (!t) return; setData({ ...data, skills: [...data.skills, t] }); setText(""); };
  return (
    <div className="space-y-3">
      <p className="text-xs text-caa-muted">Add certifications or professional skills, e.g. "Certified in Python", "ICAO English Level 4".</p>
      <div className="flex gap-2">
        <input className={input()} value={text} placeholder="Add a skill or certification" onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} />
        <button onClick={add} className="px-3 py-1.5 text-sm bg-caa-navy text-white rounded-md hover:bg-caa-navy-2 inline-flex items-center gap-1"><Plus className="h-3.5 w-3.5" /> Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((s, i) => (
          <span key={i} className="px-2.5 py-1 bg-caa-surface border border-caa-border rounded-full text-xs flex items-center gap-1">
            {s}<button onClick={() => setData({ ...data, skills: data.skills.filter((_, idx) => idx !== i) })} className="text-caa-danger"><Trash2 className="h-3 w-3" /></button>
          </span>
        ))}
        {data.skills.length === 0 && <p className="text-xs text-caa-muted">No skills added yet.</p>}
      </div>
    </div>
  );
}

/* ---------- Experience ---------- */
function ExperienceStep({ data, setData }: { data: CvProfile; setData: (d: CvProfile) => void }) {
  const add = () => setData({ ...data, experience: [...data.experience, { title: "", organisation: "", start: "", end: "", description: "" }] });
  const upd = (i: number, p: Partial<CvProfile["experience"][number]>) => setData({ ...data, experience: data.experience.map((x, idx) => idx === i ? { ...x, ...p } : x) });
  const rm = (i: number) => setData({ ...data, experience: data.experience.filter((_, idx) => idx !== i) });
  return (
    <div className="space-y-3">
      {data.experience.map((x, i) => (
        <div key={i} className="border border-caa-border rounded-md p-3 bg-caa-surface/40">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2"><label className={label}>Job title</label><input className={input()} value={x.title} onChange={(e) => upd(i, { title: e.target.value })} /></div>
            <div className="sm:col-span-2"><label className={label}>Organisation</label><input className={input()} value={x.organisation} onChange={(e) => upd(i, { organisation: e.target.value })} /></div>
            <div><label className={label}>Start date</label><input type="month" className={input()} value={x.start} onChange={(e) => upd(i, { start: e.target.value })} /></div>
            <div><label className={label}>End date</label><input type="month" className={input()} value={x.end} onChange={(e) => upd(i, { end: e.target.value })} /></div>
            <FileField label="Proof of experience" value={x.proofFile} onChange={(name) => upd(i, { proofFile: name })} />
            <div className="sm:col-span-4"><label className={label}>Brief description</label><textarea rows={2} className={input()} value={x.description} onChange={(e) => upd(i, { description: e.target.value })} /></div>
          </div>
          <button onClick={() => rm(i)} className="text-caa-danger text-xs mt-2 inline-flex items-center gap-1"><Trash2 className="h-3 w-3" /> Remove</button>
        </div>
      ))}
      <button onClick={add} className="px-3 py-1.5 text-sm border border-dashed border-caa-border rounded-md text-caa-navy hover:border-caa-navy inline-flex items-center gap-1"><Plus className="h-3.5 w-3.5" /> Add experience</button>
    </div>
  );
}

/* ---------- Referees ---------- */
function RefereesStep({ data, setData }: { data: CvProfile; setData: (d: CvProfile) => void }) {
  const upd = (i: number, p: Partial<CvProfile["referees"][number]>) => setData({ ...data, referees: data.referees.map((x, idx) => idx === i ? { ...x, ...p } : x) });
  return (
    <div className="space-y-3">
      <p className="text-xs text-caa-muted">At least two referees required. They are contacted only if you are shortlisted.</p>
      {data.referees.map((r, i) => (
        <div key={i} className="border border-caa-border rounded-md p-3 bg-caa-surface/40">
          <p className="text-xs font-semibold text-caa-body mb-2">Referee {i + 1}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className={label}>Full name</label><input className={input()} value={r.name} onChange={(e) => upd(i, { name: e.target.value })} /></div>
            <div><label className={label}>Title</label><input className={input()} value={r.title} onChange={(e) => upd(i, { title: e.target.value })} /></div>
            <div><label className={label}>Organisation</label><input className={input()} value={r.organisation} onChange={(e) => upd(i, { organisation: e.target.value })} /></div>
            <div><label className={label}>Phone</label><input className={input()} value={r.phone} onChange={(e) => upd(i, { phone: e.target.value })} /></div>
            <div className="sm:col-span-2"><label className={label}>Email</label><input type="email" className={input()} value={r.email} onChange={(e) => upd(i, { email: e.target.value })} /></div>
          </div>
        </div>
      ))}
      <button onClick={() => setData({ ...data, referees: [...data.referees, { name: "", title: "", organisation: "", phone: "", email: "" }] })} className="px-3 py-1.5 text-sm border border-dashed border-caa-border rounded-md text-caa-navy hover:border-caa-navy inline-flex items-center gap-1"><Plus className="h-3.5 w-3.5" /> Add referee</button>
    </div>
  );
}

/* ---------- Review ---------- */
function ReviewStep({ data, job, onJump }: { data: CvProfile; job: any; onJump: (s: number) => void }) {
  const sections: { title: string; step: number; render: () => React.ReactNode }[] = [
    { title: "Personal", step: 0, render: () => <p className="text-sm">{data.personal.firstName} {data.personal.lastName} · {data.personal.email} · {data.personal.phone || "—"} · DOB {data.personal.dob || "—"}</p> },
    { title: "Qualifications", step: 1, render: () => (
      <ul className="text-sm space-y-1">
        <li className="text-xs text-caa-muted">Highest: {data.highestLevel || "—"}</li>
        {data.qualifications.map((q, i) => <li key={i}>· {q.level} — {q.course || q.school || "—"} ({q.year || "—"})</li>)}
        {data.qualifications.length === 0 && <li className="text-caa-muted">No qualifications added.</li>}
      </ul>
    )},
    { title: "Skills", step: 2, render: () => <p className="text-sm">{data.skills.join(" · ") || <span className="text-caa-muted">None</span>}</p> },
    { title: "Experience", step: 3, render: () => (
      <ul className="text-sm space-y-1">
        {data.experience.map((x, i) => <li key={i}>· {x.title} @ {x.organisation} ({x.start} → {x.end || "present"})</li>)}
        {data.experience.length === 0 && <li className="text-caa-muted">No experience added.</li>}
      </ul>
    )},
    { title: "Referees", step: 4, render: () => <p className="text-sm">{data.referees.filter((r) => r.name).length} provided</p> },
    { title: "Next of Kin", step: 5, render: () => <p className="text-sm">{data.nextOfKin.name || "—"} ({data.nextOfKin.relationship || "—"})</p> },
    { title: "Photo", step: 6, render: () => <p className="text-sm">{data.photoFile || <span className="text-caa-muted">Not uploaded</span>}</p> },
  ];
  return (
    <div className="space-y-3">
      <div className="caa-card p-3 border-l-[3px] border-l-caa-navy text-xs">
        Applying for <span className="font-semibold text-caa-body">{job.title}</span> · {job.salaryBand} · Min age {job.minAge} · {job.requiredExperience} yrs exp · {job.requiredQualification}.
      </div>
      {sections.map((s) => (
        <div key={s.title} className="border border-caa-border rounded-md p-3 flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs font-semibold text-caa-body mb-1">{s.title}</p>
            {s.render()}
          </div>
          <button onClick={() => onJump(s.step)} className="text-xs text-caa-navy hover:underline inline-flex items-center gap-1"><Pencil className="h-3 w-3" /> Edit</button>
        </div>
      ))}
    </div>
  );
}