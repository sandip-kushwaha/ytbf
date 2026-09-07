import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ShieldAlert,
  Newspaper,
  Megaphone,
  UserCheck,
  ExternalLink,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-50/50">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-gray-100 bg-slate-50/60 "
      >
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-hidden text-xs font-medium text-gray-500">
            <Link to="/" className="shrink-0 transition hover:text-blue-600">
              Home
            </Link>

            <span className="text-gray-300">/</span>

            <span className="truncate text-blue-600">Contact</span>
          </div>
        </div>
      </nav>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-700">
              <Newspaper className="h-3.5 w-3.5" />
              Editorial Bureau
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Newsroom Directory & Contacts
            </h1>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              Reach out directly to our specialized editorial desks,
              investigative teams, or press department.
            </p>
          </div>

          {/* Confidential Tip Banner */}
          <div className="mt-12 overflow-hidden rounded-2xl bg-linear-to-r from-slate-900 via-gray-900 to-slate-900 p-6 text-white shadow-lg sm:p-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    Confidential & Whistleblower Leak
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    Have a Sensitive News Tip?
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-300">
                    Submit confidential documents or leads directly to our
                    investigative unit. We protect source anonymity.
                  </p>
                </div>
              </div>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=yourNews@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none"
              >
                <Mail className="h-4 w-4" />
                Send Confidential Tip
              </a>
            </div>
          </div>

          {/* Desks Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Editorial Desk */}
            <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs transition hover:border-blue-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <UserCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Editor-in-Chief
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                Editorial & Corrections
              </p>
              <p className="mt-3 text-sm text-gray-600">
                For article corrections, editorial policy queries, or press
                releases.
              </p>
              <div className="mt-6 space-y-2 border-t border-gray-100 pt-4">
                <a
                  href="mailto:editor@yournews.com"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-blue-600"
                >
                  <Mail className="h-4 w-4 text-gray-400" />
                  editor@yournews.com
                </a>
                <a
                  href="tel:+9779800000001"
                  className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-blue-600"
                >
                  <Phone className="h-4 w-4 text-gray-400" />
                  +977 9800000001
                </a>
              </div>
            </div>

            {/* Advertising & Commercial */}
            <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs transition hover:border-blue-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <Megaphone className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Advertising & Media
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                Sponsorships & Ads
              </p>
              <p className="mt-3 text-sm text-gray-600">
                Partner with us for display ads, sponsored stories, or brand
                partnerships.
              </p>
              <div className="mt-6 space-y-2 border-t border-gray-100 pt-4">
                <a
                  href="mailto:ads@yournews.com"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-blue-600"
                >
                  <Mail className="h-4 w-4 text-gray-400" />
                  ads@yournews.com
                </a>
                <a
                  href="tel:+9779800000002"
                  className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-blue-600"
                >
                  <Phone className="h-4 w-4 text-gray-400" />
                  +977 9800000002
                </a>
              </div>
            </div>

            {/* Headquarters Location */}
            <div className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs transition hover:border-blue-300 hover:shadow-md sm:col-span-2 lg:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Central Bureau
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                Physical Address
              </p>
              <p className="mt-3 text-sm text-gray-600">
                Media Tower, Press Way, Kathmandu, Nepal
              </p>
              <div className="mt-6 border-t border-gray-100 pt-4">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  View on Google Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Social Broadcast Feeds */}
          <div className="mt-12 rounded-2xl border border-gray-200/80 bg-white p-8 text-center shadow-xs">
            <h2 className="text-xl font-bold text-gray-900">
              Official News Outlets
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Follow our verified social accounts for breaking news and instant
              alerts.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-600 hover:text-white hover:border-blue-600"
              >
                <FaFacebookF className="h-4 w-4" />
                Facebook Page
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-sky-500 hover:text-white hover:border-sky-500"
              >
                <FaTwitter className="h-4 w-4" />
                Twitter / X
              </a>
              <a
                href="https://tiktok.org"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-500 hover:text-white hover:border-blue-500"
              >
                <FaTiktok className="h-4 w-4" />
                Tik Tok
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-pink-600 hover:text-white hover:border-pink-600"
              >
                <FaInstagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                <FaYoutube className="h-4 w-4" />
                YouTube Live
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
