const Header = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="mt-1 text-m text-gray-400">{description}</p>
    </div>
  );
};
export default Header;
