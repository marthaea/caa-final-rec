import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp, i as isCAAEmail, C as CAA_STAFF } from "./router-B9-5xq1U.mjs";
import { l as User, m as Building2, a as Mail, n as CircleAlert, o as ShieldCheck, L as Lock, E as EyeOff, p as Eye, d as CircleCheck } from "../_libs/lucide-react.mjs";
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
function RegisterPage() {
  const {
    signIn,
    pushToast
  } = useApp();
  const navigate = useNavigate();
  const [f, setF] = reactExports.useState({
    accountType: "external",
    email: "",
    password: "",
    confirm: "",
    employeeNumber: "",
    agree: false
  });
  const [show, setShow] = reactExports.useState(false);
  const set = (k, v) => setF((p) => ({
    ...p,
    [k]: v
  }));
  const pw = reactExports.useMemo(() => ({
    length: f.password.length >= 8,
    upper: /[A-Z]/.test(f.password),
    number: /\d/.test(f.password),
    symbol: /[^A-Za-z0-9]/.test(f.password),
    match: f.password.length > 0 && f.password === f.confirm
  }), [f.password, f.confirm]);
  const isInternal = f.accountType === "internal";
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email);
  const caaEmailOk = !isInternal || isCAAEmail(f.email);
  const staffOk = !isInternal || f.employeeNumber.trim() in CAA_STAFF;
  const pwAllOk = pw.length && pw.upper && pw.number && pw.symbol && pw.match;
  const canSubmit = emailValid && caaEmailOk && staffOk && pwAllOk && f.agree;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailValid) return pushToast({
      type: "warning",
      title: "Enter a valid email"
    });
    if (isInternal && !caaEmailOk) return pushToast({
      type: "warning",
      title: "Internal staff must use a @caa.co.ug email"
    });
    if (isInternal && !staffOk) return pushToast({
      type: "warning",
      title: "Employee number not found",
      message: "Try CAA-1001, CAA-1002, or CAA-1003 for the demo."
    });
    if (!pwAllOk) return pushToast({
      type: "warning",
      title: "Password does not meet requirements"
    });
    if (!f.agree) return pushToast({
      type: "warning",
      title: "Please accept the Terms"
    });
    const seed = isInternal ? CAA_STAFF[f.employeeNumber.trim()] : {
      firstName: "Candidate",
      lastName: ""
    };
    signIn(seed.firstName, seed.lastName, f.email, {
      accountType: f.accountType,
      employeeNumber: f.employeeNumber.trim()
    });
    pushToast({
      type: "success",
      title: "Account created",
      message: "You can now browse vacancies and apply."
    });
    navigate({
      to: "/vacancies"
    });
  };
  const input = "w-full pl-10 pr-3 py-2 text-sm border border-caa-border rounded-md bg-white focus:outline-none focus:border-caa-navy focus:ring-1 focus:ring-caa-navy/20";
  const label = "block text-sm font-medium text-caa-body mb-1";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-caa-navy font-semibold", children: "Create Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-2xl text-caa-body mt-1", children: "Join the CAA portal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-sm text-caa-navy hover:underline", children: "Sign in" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "caa-card p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "I am applying as" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 mt-1", children: [{
          v: "external",
          icon: User,
          t: "General public",
          d: "Anyone can apply"
        }, {
          v: "internal",
          icon: Building2,
          t: "Internal CAA staff",
          d: "Verified via employee #"
        }].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set("accountType", o.v), className: `text-left p-3 rounded-md border text-xs ${f.accountType === o.v ? "border-caa-navy bg-caa-surface" : "border-caa-border hover:border-caa-navy/50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(o.icon, { className: "h-4 w-4 text-caa-navy mb-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-caa-body", children: o.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-caa-muted mt-0.5", children: o.d })
        ] }, o.v)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Email address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-caa-light" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: f.email, onChange: (e) => set("email", e.target.value), className: input, placeholder: isInternal ? "you@caa.co.ug" : "you@example.com" })
        ] }),
        isInternal && f.email && !caaEmailOk && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-caa-danger mt-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
          " Internal staff must use a @caa.co.ug email."
        ] })
      ] }),
      isInternal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "CAA employee number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-caa-light" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: f.employeeNumber, onChange: (e) => set("employeeNumber", e.target.value.toUpperCase()), className: input, placeholder: "e.g. CAA-1001" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-caa-muted mt-1", children: "Demo numbers: CAA-1001, CAA-1002, CAA-1003." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-caa-light" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: show ? "text" : "password", value: f.password, onChange: (e) => set("password", e.target.value), className: input + " pr-9", placeholder: "••••••••" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow(!show), className: "absolute right-3 top-1/2 -translate-y-1/2 text-caa-light", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: label, children: "Confirm password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-caa-light" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: show ? "text" : "password", value: f.confirm, onChange: (e) => set("confirm", e.target.value), className: input })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-2 gap-y-1 gap-x-3 text-[12px]", children: [{
        ok: pw.length,
        l: "≥ 8 characters"
      }, {
        ok: pw.upper,
        l: "1 uppercase letter"
      }, {
        ok: pw.number,
        l: "1 number"
      }, {
        ok: pw.symbol,
        l: "1 symbol"
      }, {
        ok: pw.match,
        l: "Passwords match"
      }].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `flex items-center gap-1.5 ${r.ok ? "text-caa-success" : "text-caa-muted"}`, children: [
        r.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5" }),
        r.l
      ] }, r.l)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-xs text-caa-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "mt-0.5", checked: f.agree, onChange: (e) => set("agree", e.target.checked) }),
        "I confirm the information provided is accurate and agree to CAA Uganda's ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://caa.go.ug/", target: "_blank", rel: "noopener noreferrer", className: "text-caa-navy underline", children: "Terms & Privacy Policy" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: !canSubmit, className: "w-full py-2.5 bg-caa-navy text-white font-semibold rounded-md hover:bg-caa-navy-2 transition-colors disabled:opacity-50", children: "Create account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-caa-muted text-center", children: "You'll build your CV the first time you apply for a role." })
    ] })
  ] }) });
}
export {
  RegisterPage as component
};
