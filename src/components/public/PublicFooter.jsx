import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MoveUpRight } from "lucide-react";

const PublicFooter = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            {/* <h2 className="text-xl font-bold text-white">NewsPortal</h2> */}
            <h2 className="text-xl font-bold text-white">समाचार पोर्टल</h2>

            {/* <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              Stay informed with the latest news, stories, and updates from
              around the world.
            </p> */}
            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              विश्वभरका नवीनतम समाचार, कथा तथा महत्वपूर्ण जानकारीहरूसँग सधैं
              अपडेट रहनुहोस्।
            </p>

            <div className="mt-5 flex gap-2">
              <SocialIcon
                icon={FaFacebookF}
                href="https://www.facebook.com/youthbrain.media"
                className="hover:bg-[#1877F2] hover:text-white"
              />
              <SocialIcon
                icon={FaWhatsapp}
                href="https://wa.me/977982-8058803"
                className="hover:bg-[#25D366] hover:text-white"
              />
              <SocialIcon
                icon={FaTiktok}
                href="https://www.tiktok.com/@youthbrain47"
                className="hover:bg-black hover:text-white"
              />
              <SocialIcon
                icon={FaInstagram}
                href="https://www.instagram.com/youthbrain.media"
                className="hover:border-[#E1306C] hover:bg-linear-to-r hover:from-[#F58529] hover:via-[#E1306C] hover:to-[#833AB4] hover:text-white"
              />
              <SocialIcon
                icon={FaYoutube}
                href="https://www.youtube.com/@youthbrainnews"
                className="hover:bg-[#FF0000] hover:text-white"
              />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>

            <div className="mt-4 space-y-3">
              <FooterLink
                to="/"
                label={
                  <span className="flex items-center gap-1">
                    Home{" "}
                    <MoveUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                }
              />
              <FooterLink
                to="/news"
                label={
                  <span className="flex items-center gap-1">
                    News{" "}
                    <MoveUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                }
              />
              <FooterLink
                to="/trending"
                label={
                  <span className="flex items-center gap-1">
                    Trending{" "}
                    <MoveUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                }
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white">Get Touch Me</h3>

            <div className="mt-4 space-y-3">
              <FooterLink
                to="/contact"
                label={
                  <span className="flex items-center gap-1">
                    Contact{" "}
                    <MoveUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                }
              />
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} NewsPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="group block text-sm text-gray-500 transition hover:text-blue-400"
    >
      {label}
    </Link>
  );
};

const SocialIcon = ({ icon: Icon, href, className = "" }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`grid h-9 w-9 cursor-pointer place-items-center rounded-lg 
        bg-gray-900 text-gray-500 transition duration-200 ${className}`}
    >
      <Icon size={17} />
    </a>
  );
};

export default PublicFooter;
