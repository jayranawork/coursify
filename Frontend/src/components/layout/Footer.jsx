import {
  BookOpen,
  Globe,
  Github,
  Instagram,
  Linkedin,
  Mail,
  ShieldCheck,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Courses", to: "/courses" },
      { label: "Learning paths", to: "/courses" },
      { label: "Certificates", to: "/dashboard" },
      { label: "Pricing", to: "/register" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Coursify", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Logos and media", to: "/" },
      { label: "Changelog", to: "/" },
    ],
  },
  {
    title: "Partner with us",
    links: [
      { label: "Host a course", to: "/register" },
      { label: "Become an instructor", to: "/register" },
      { label: "Affiliate program", to: "/" },
      { label: "Write for us", to: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", to: "/" },
      { label: "Contact", to: "/" },
      { label: "Join community", to: "/" },
      { label: "Privacy policy", to: "/" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, label: "X / Twitter" },
  { icon: Github, label: "GitHub" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="page-shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.8fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-950">Coursify</p>
                <p className="text-sm text-slate-500">Learn, build, and teach with clarity.</p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              A focused learning platform for learners, instructors, and admins. Browse courses,
              track progress, and grow in one calm workspace.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                All systems operational
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                <Globe className="h-3.5 w-3.5 text-slate-500" />
                Built for a global audience
              </span>
            </div>

            <div className="flex flex-wrap gap-3 text-slate-500">
              {socialLinks.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-sm font-semibold text-slate-950">{column.title}</h3>
                <ul className="space-y-3 text-sm text-slate-500">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="transition hover:text-slate-950">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Coursify — a modern learning platform.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/" className="transition hover:text-slate-950">
              Terms
            </Link>
            <Link to="/" className="transition hover:text-slate-950">
              Privacy
            </Link>
            <Link to="/" className="transition hover:text-slate-950">
              Code of conduct
            </Link>
            <Link to="/" className="transition hover:text-slate-950">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                support@coursify.com
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
