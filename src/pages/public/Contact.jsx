import { Link } from "react-router-dom";
import { Mail, ShieldAlert, Newspaper } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
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
              गृहपृष्ठ
            </Link>

            <span className="text-gray-300">/</span>

            <span className="truncate text-blue-600">सम्पर्क</span>
          </div>
        </div>
      </nav>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-700">
              <Newspaper className="h-3.5 w-3.5" />
              सम्पादकीय विभाग
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {/* Newsroom Directory & Contacts */}
              समाचार कक्ष र सम्पर्क
            </h1>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              {/* Reach out directly to our specialized editorial desks,
              investigative teams, or press department. */}
              हाम्रा विशिष्ट सम्पादकीय डेस्क, खोज पत्रकारिता टोली वा प्रेस
              विभागमा सिधै सम्पर्क गर्नुहोस्।
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
                  {/* <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    Confidential & Whistleblower Leak
                  </span> */}
                  <h2 className="text-xl font-bold text-white">
                    {/* Have a Sensitive News Tip? */}
                    के तपाईंसँग कुनै संवेदनशील समाचार वा सूचना छ?
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-300">
                    {/* Submit confidential documents or leads directly to our
                    investigative unit. We protect source anonymity. */}
                    हाम्रा खोज पत्रकारिता टोलीलाई गोप्य कागजात वा सूचना सिधै
                    पठाउनुहोस्। हामी सूचनादाताको गोपनीयता पूर्ण रूपमा सुरक्षित
                    राख्छौँ।
                  </p>
                </div>
              </div>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=youthbrain91@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none"
              >
                <Mail className="h-4 w-4" />
                सूचना पठाउनुहोस्
              </a>
            </div>
          </div>

          {/* Social Broadcast Feeds */}
          <div className="mt-12 rounded-2xl border border-gray-200/80 bg-white p-8 text-center shadow-xs">
            <h2 className="text-xl font-bold text-gray-900">
              {/* Official News Outlets */}
              आधिकारिक समाचार माध्यमहरू
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {/* Follow our verified social accounts for breaking news and instant
              alerts. */}
              ताजा समाचार र तत्काल अलर्टका लागि हाम्रा आधिकारिक सामाजिक
              सञ्जालहरूमा जोडिनुहोस्।
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="https://www.facebook.com/youthbrain.media"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-600 hover:text-white hover:border-blue-600"
              >
                <FaFacebookF className="h-4 w-4" />
                Facebook Page
              </a>
              <a
                href="https://wa.me/977982-8058803"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-green-500 hover:bg-green-500 hover:text-white"
              >
                <FaWhatsapp className="h-4 w-4" />
                WhatsApp
              </a>

              <a
                href="https://www.tiktok.com/@youthbrain47"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-black hover:text-white hover:border-black"
              >
                <FaTiktok className="h-4 w-4" />
                Tik Tok
              </a>
              <a
                href="https://www.instagram.com/youthbrain.media"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#E1306C] hover:bg-linear-to-r hover:from-[#F58529] hover:via-[#E1306C] hover:to-[#833AB4] hover:text-white"
              >
                <FaInstagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@youthbrainnews"
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
