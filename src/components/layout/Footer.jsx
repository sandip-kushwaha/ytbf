const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-gray-950 px-4 py-6 sm:px-6">
      <div className=" flex flex-col items-center justify-between gap-3 text-sm text-gray-500 sm:flex-row">
        {/* Copyright */}
        <p>
          © {currentYear}{" "}
          <span className="font-medium text-gray-300">YouTh Brain news</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
