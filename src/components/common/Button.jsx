const Button = ({ onClick, value, type = "button", disabled = false }) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {value}
      </button>
    </div>
  );
};

export default Button;
