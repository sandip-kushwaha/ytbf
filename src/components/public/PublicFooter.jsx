import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const PublicFooter = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-white">NewsPortal</h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              Stay informed with the latest news, stories, and updates from
              around the world.
            </p>

            <div className="mt-5 flex gap-2">
              <SocialIcon icon={FaFacebookF} />
              <SocialIcon icon={FaInstagram} />
              <SocialIcon icon={FaTwitter} />
              <SocialIcon icon={FaYoutube} />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>

            <div className="mt-4 space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/news" label="News" />
              <FooterLink to="/categories" label="Categories" />
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white">Company</h3>

            <div className="mt-4 space-y-3">
              <FooterLink to="/about" label="About Us" />

              <FooterLink to="/contact" label="Contact" />
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
      className="block text-sm text-gray-500 transition hover:text-blue-400"
    >
      {label}
    </Link>
  );
};

const SocialIcon = ({ icon: Icon }) => {
  return (
    <button
      type="button"
      className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg bg-gray-900 text-gray-500 transition hover:bg-gray-800 hover:text-white"
    >
      <Icon size={17} />
    </button>
  );
};

export default PublicFooter;
