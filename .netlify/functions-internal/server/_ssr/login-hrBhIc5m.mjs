import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp, l as logo, A as ADMIN_DEMO, i as isCAAEmail } from "./router-B9-5xq1U.mjs";
import { o as ShieldCheck, q as Bell, F as FileText, d as CircleCheck, r as ArrowLeft, a as Mail, L as Lock, E as EyeOff, p as Eye } from "../_libs/lucide-react.mjs";
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
function LoginPage() {
  const {
    signIn,
    pushToast
  } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [show, setShow] = reactExports.useState(false);
  const [forgotMsg, setForgotMsg] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      pushToast({
        type: "warning",
        title: "Missing details",
        message: "Enter your email and password to continue."
      });
      return;
    }
    if (email.trim().toLowerCase() === ADMIN_DEMO.email && password === ADMIN_DEMO.password) {
      signIn("System", "Administrator", email, {
        accountType: "admin"
      });
      pushToast({
        type: "success",
        title: "Admin signed in",
        message: "Welcome to the CAA admin console."
      });
      navigate({
        to: "/admin",
        search: {
          tab: "dashboard"
        }
      });
      return;
    }
    const accountType = isCAAEmail(email) ? "internal" : "external";
    signIn("John", "Mugisha", email, {
      accountType
    });
    if (!isCAAEmail(email)) {
      pushToast({
        type: "info",
        title: "Signed in as external candidate",
        message: "Internal job listings are not visible without a CAA email."
      });
    } else {
      pushToast({
        type: "success",
        title: "Welcome back, John Mugisha"
      });
    }
    navigate({
      to: "/vacancies"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[1.05fr_1fr] rounded-3xl overflow-hidden border border-caa-border bg-white shadow-[0_30px_80px_-40px_rgba(11,46,95,0.30)] min-h-[640px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-hero-bg p-10 md:p-12 text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-12 w-12 rounded-xl bg-white flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "CAA Uganda", className: "h-10 w-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] tracking-[0.18em] uppercase text-white/70", children: "Uganda CAA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-white", children: "e-Recruitment Portal" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-4xl leading-tight", children: "Welcome back." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-sm mt-3 max-w-md", children: "Pick up where you left off — track shortlisting status, manage your documents and respond to interview invitations." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-4", children: [{
          Icon: ShieldCheck,
          title: "Secure candidate workspace",
          desc: "Your documents and personal details are encrypted at rest."
        }, {
          Icon: Bell,
          title: "Instant status updates",
          desc: "Email alerts the moment your application moves stage."
        }, {
          Icon: FileText,
          title: "Reuse a single profile",
          desc: "Apply to any vacancy without re-uploading documents."
        }].map(({
          Icon,
          title,
          desc
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-10 w-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-white text-sm", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/65 mt-0.5", children: desc })
          ] })
        ] }, title)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-10 flex items-center gap-2 text-xs text-white/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-white/70" }),
          "CAA Uganda is an equal-opportunity employer · No recruitment fees, ever."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-12 flex flex-col justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "text-sm text-caa-muted hover:text-caa-navy inline-flex items-center gap-1.5 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to home"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-2xl text-caa-body", children: "Sign in to your account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-caa-muted mt-1.5", children: "Use the email you registered with." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-8 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-caa-body mb-1.5", children: "Email address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-caa-light" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full pl-10 pr-3 py-2.5 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy focus:ring-1 focus:ring-caa-navy/20", placeholder: "you@example.com", autoComplete: "email" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-caa-body mb-1.5", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-caa-light" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: show ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full pl-10 pr-10 py-2.5 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy focus:ring-1 focus:ring-caa-navy/20", placeholder: "••••••••", autoComplete: "current-password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow(!show), className: "absolute right-3 top-1/2 -translate-y-1/2 text-caa-light hover:text-caa-body", "aria-label": show ? "Hide password" : "Show password", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-caa-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "rounded border-caa-border" }),
            " Keep me signed in"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setForgotMsg(true), className: "text-caa-navy hover:underline font-medium", children: "Forgot password?" })
        ] }),
        forgotMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-caa-success bg-caa-success/10 border border-caa-success/20 rounded-md px-3 py-2", children: [
          "A password reset link would be sent to ",
          email || "your registered email",
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full py-3 bg-caa-navy text-white font-semibold rounded-md hover:bg-caa-navy-2 transition-colors", children: "Sign In" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-caa-muted text-center mt-1", children: "Protected by industry-standard encryption · CAA Uganda never asks for your password by phone or email." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-7 flex items-center gap-3 text-xs text-caa-light", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 h-px bg-caa-border" }),
        " NEW HERE? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 h-px bg-caa-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "block w-full py-3 text-center text-sm border border-caa-border text-caa-body rounded-md hover:border-caa-navy hover:text-caa-navy transition-colors font-medium", children: "Create a candidate profile" })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
