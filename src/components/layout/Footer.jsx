const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-gray-950 px-4 py-6 sm:px-6">
      <div className=" flex flex-col items-center justify-between gap-3 text-sm text-gray-500 sm:flex-row">
        {/* Copyright */}
        <p>
          © {currentYear}{" "}
          <span className="font-medium text-gray-300">NewsHub</span>. All rights
          reserved.
        </p>

        {/* Links */}
        <div className="flex items-center gap-5">
          <button className="transition hover:text-white">Privacy</button>

          <button className="transition hover:text-white">Terms</button>

          <button className="transition hover:text-white">Support</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
