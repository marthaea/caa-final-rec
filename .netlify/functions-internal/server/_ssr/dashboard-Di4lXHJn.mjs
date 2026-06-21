import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp } from "./router-B9-5xq1U.mjs";
import { u as UserCog, q as Bell, a as Mail, v as Pencil, X, w as Check, x as Circle, F as FileText, p as Eye, t as Users, y as Award } from "../_libs/lucide-react.mjs";
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
const STATUS = {
  Shortlisted: "bg-caa-success/10 text-caa-success",
  "Under Review": "bg-caa-navy-2/10 text-caa-navy-2",
  Pending: "bg-caa-warning/15 text-caa-warning",
  Declined: "bg-caa-danger/10 text-caa-danger",
  Interview: "bg-purple-100 text-purple-700",
  Offered: "bg-teal-100 text-teal-700",
  Hired: "bg-caa-success/15 text-caa-success"
};
const NOTIF_ICON = {
  shortlisted: "✅",
  declined: "❌",
  interview: "📅",
  offered: "🎉",
  info: "ℹ️"
};
function DashboardPage() {
  const {
    auth,
    applications,
    withdrawApplication,
    updateProfile,
    pushToast,
    notifications,
    markNotificationRead
  } = useApp();
  const navigate = useNavigate();
  const [confirmId, setConfirmId] = reactExports.useState(null);
  const [editProfile, setEditProfile] = reactExports.useState(false);
  const [pf, setPf] = reactExports.useState({
    firstName: auth.firstName,
    lastName: auth.lastName,
    email: auth.email
  });
  reactExports.useEffect(() => {
    setPf({
      firstName: auth.firstName,
      lastName: auth.lastName,
      email: auth.email
    });
  }, [auth.firstName, auth.lastName, auth.email]);
  reactExports.useEffect(() => {
    if (!auth.isLoggedIn) navigate({
      to: "/login"
    });
  }, [auth.isLoggedIn, navigate]);
  if (!auth.isLoggedIn) return null;
  const handleEdit = (a) => {
    if (a.completion < 100) {
      navigate({
        to: "/apply",
        search: {
          jobId: a.jobId ?? 1
        }
      });
      pushToast({
        type: "info",
        title: "Continue editing",
        message: `Resuming your ${a.title} application`
      });
    } else {
      pushToast({
        type: "info",
        title: "Application complete",
        message: "This application is 100% tailored. You can still update before the closing date."
      });
      navigate({
        to: "/apply",
        search: {
          jobId: a.jobId ?? 1
        }
      });
    }
  };
  const confirmWithdraw = () => {
    if (confirmId == null) return;
    withdrawApplication(confirmId);
    setConfirmId(null);
    pushToast({
      type: "success",
      title: "Application withdrawn",
      message: "You can re-apply any time before the closing date."
    });
  };
  const saveProfile = () => {
    updateProfile(pf);
    setEditProfile(false);
    pushToast({
      type: "success",
      title: "Profile updated",
      message: "Your candidate profile changes have been saved."
    });
  };
  const checklist = [{
    label: "Personal information",
    done: true
  }, {
    label: "Contact details",
    done: true
  }, {
    label: "CV uploaded",
    done: true
  }, {
    label: "Education history",
    done: true
  }, {
    label: "Work experience",
    done: false
  }, {
    label: "Certificates & licences",
    done: false
  }, {
    label: "Referee contacts",
    done: false
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caa-hero-bg py-10 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/65 text-sm", children: "Good morning 👋" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-bold text-white text-3xl md:text-4xl mt-1", children: [
          auth.firstName,
          " ",
          auth.lastName
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vacancies", className: "px-4 py-2.5 text-sm border border-white/30 text-white rounded-md hover:bg-white/10 transition-colors", children: "Browse Vacancies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditProfile(true), className: "px-4 py-2.5 text-sm bg-white text-caa-navy font-semibold rounded-md hover:bg-caa-surface transition-colors inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "h-4 w-4" }),
          " Edit Profile"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 mt-8 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
        notifications.filter((n) => n.recipientEmail === auth.email?.toLowerCase()).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-b border-caa-border bg-caa-navy/4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-caa-navy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-caa-body", children: "Notifications from CAA HR" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[11px] text-caa-muted", children: [
              notifications.filter((n) => n.recipientEmail === auth.email?.toLowerCase() && !n.read).length,
              " unread"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-caa-border", children: notifications.filter((n) => n.recipientEmail === auth.email?.toLowerCase()).slice(0, 5).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-4 py-3 flex items-start gap-3 ${n.read ? "opacity-60" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg shrink-0", children: NOTIF_ICON[n.type] ?? "ℹ️" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-caa-body", children: n.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted mt-0.5 leading-relaxed", children: n.message }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-caa-muted mt-1", children: new Date(n.at).toLocaleString() })
            ] }),
            !n.read && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => markNotificationRead(n.id), className: "shrink-0 text-[11px] text-caa-navy hover:underline", children: "Mark read" })
          ] }, n.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-4 flex items-start gap-3 border-l-[3px] border-l-caa-navy", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-full bg-caa-surface text-caa-navy flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-caa-body", children: "Email notifications enabled" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-caa-muted mt-0.5", children: [
              "Any new updates on approval, shortlisting or rejection will be sent to",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-caa-navy font-medium", children: auth.email || "your registered email" }),
              ". Please check your inbox and spam folder regularly."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5", children: [{
          l: "Applications Submitted",
          n: applications.length,
          color: "text-caa-navy"
        }, {
          l: "Shortlisted",
          n: applications.filter((a) => a.status === "Shortlisted").length,
          color: "text-caa-navy-2"
        }, {
          l: "Offers Received",
          n: 0,
          color: "text-caa-success"
        }].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted", children: m.l }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-bold text-4xl mt-2 ${m.color}`, children: m.n })
        ] }, m.l)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-caa-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-caa-body", children: "My Applications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-caa-muted", children: "Edit or withdraw any active application" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-caa-border", children: [
            applications.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-10 text-center text-sm text-caa-muted", children: [
              "You have no active applications. ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vacancies", className: "text-caa-navy hover:text-caa-gold underline", children: "Browse vacancies" })
            ] }),
            applications.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-10 w-10 rounded-full bg-caa-surface text-caa-navy text-xs font-semibold flex items-center justify-center shrink-0", children: a.abbr }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-caa-body truncate", children: a.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-caa-muted mt-0.5", children: [
                    a.dept,
                    " · Applied ",
                    a.date
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-32 bg-caa-surface rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full ${a.completion === 100 ? "bg-caa-success" : "bg-caa-navy-2"}`, style: {
                      width: `${a.completion}%`
                    } }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[11px] font-medium ${a.completion === 100 ? "text-caa-success" : "text-caa-muted"}`, children: [
                      a.completion,
                      "% tailored"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:flex-col sm:items-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2.5 py-1 rounded-full text-[11px] font-medium ${STATUS[a.status]}`, children: a.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleEdit(a), className: "px-2.5 py-1.5 text-xs border border-caa-border text-caa-navy rounded-md hover:border-caa-navy hover:bg-caa-surface inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
                    " Edit"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setConfirmId(a.id), className: "px-2.5 py-1.5 text-xs border border-caa-danger/40 text-caa-danger rounded-md hover:bg-caa-danger/5 inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
                    " Withdraw"
                  ] })
                ] })
              ] })
            ] }, a.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base text-caa-body", children: "Profile Completion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-2 bg-caa-surface rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-caa-navy to-caa-navy-2", style: {
            width: "72%"
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted mt-2", children: "72% complete · +Documents needed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2", children: checklist.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
            c.done ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-5 w-5 rounded-full bg-caa-success flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-white", strokeWidth: 3 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-5 w-5 text-caa-light" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: c.done ? "text-caa-body" : "text-caa-muted", children: c.label })
          ] }, c.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-caa-navy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base text-caa-body", children: "Notifications" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-2 border-caa-success pl-3 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-caa-body", children: "Shortlist confirmed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted mt-0.5", children: "Your application for Senior ATC has been shortlisted. Interview dates to follow." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-2 border-caa-navy-2 pl-3 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-caa-body", children: "Application received" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-caa-muted mt-0.5", children: "Finance Officer application successfully submitted." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base text-caa-body", children: "Application Timeline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-4 relative border-l border-caa-border ml-2 space-y-5", children: [{
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
            label: "Submitted",
            date: "Jun 3, 2026",
            done: true,
            color: "bg-caa-success"
          }, {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
            label: "Under Review",
            date: "Jun 5, 2026",
            done: true,
            color: "bg-caa-navy-2"
          }, {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
            label: "Shortlisted",
            date: "Jun 10, 2026",
            done: true,
            color: "bg-caa-navy"
          }, {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }),
            label: "Interview",
            date: "Pending",
            done: false,
            color: "bg-caa-light"
          }].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "ml-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute -left-[11px] h-5 w-5 rounded-full ${s.color} text-white flex items-center justify-center`, children: s.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm font-medium ${s.done ? "text-caa-body" : "text-caa-muted"}`, children: s.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-caa-muted", children: s.date })
          ] }, i)) })
        ] })
      ] })
    ] }) }),
    confirmId !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 caa-fade-in p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-6 max-w-md w-full caa-scale-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-caa-body", children: "Withdraw application?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-caa-muted mt-2", children: "This will remove your application from review. You can re-apply any time before the role closes." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfirmId(null), className: "px-4 py-2 text-sm border border-caa-border rounded-md text-caa-body hover:bg-caa-surface", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: confirmWithdraw, className: "px-4 py-2 text-sm bg-caa-danger text-white rounded-md hover:opacity-90", children: "Yes, withdraw" })
      ] })
    ] }) }),
    editProfile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 caa-fade-in p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "caa-card p-6 max-w-md w-full caa-scale-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg text-caa-body", children: "Edit your profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditProfile(false), className: "text-caa-muted hover:text-caa-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-caa-muted", children: "First name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: pf.firstName, onChange: (e) => setPf({
            ...pf,
            firstName: e.target.value
          }), className: "mt-1 w-full px-3 py-2 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-caa-muted", children: "Last name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: pf.lastName, onChange: (e) => setPf({
            ...pf,
            lastName: e.target.value
          }), className: "mt-1 w-full px-3 py-2 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-caa-muted", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: pf.email, onChange: (e) => setPf({
            ...pf,
            email: e.target.value
          }), className: "mt-1 w-full px-3 py-2 text-sm border border-caa-border rounded-md focus:outline-none focus:border-caa-navy" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditProfile(false), className: "px-4 py-2 text-sm border border-caa-border rounded-md text-caa-body hover:bg-caa-surface", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: saveProfile, className: "px-4 py-2 text-sm bg-caa-navy text-white rounded-md hover:bg-caa-navy-2", children: "Save changes" })
      ] })
    ] }) })
  ] });
}
export {
  DashboardPage as component
};
