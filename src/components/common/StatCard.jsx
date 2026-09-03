const StatCard = ({
  title,
  value,
  icon,
  iconClass,
  valueClass = "text-white",
}) => {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 transition hover:border-gray-700">
      <div className="flex items-center justify-between">
        <div>   
          <p className="text-sm text-gray-400">{title}</p>
          <p className={`mt-2 text-2xl font-bold ${valueClass}`}>{value}</p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
