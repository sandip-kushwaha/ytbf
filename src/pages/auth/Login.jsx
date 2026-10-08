import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { CircleUser, UserKey, Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo.webp";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.username || !formData.password) {
      setError("Username and Password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await login(formData.username, formData.password);

      const user = response.data.user;

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        setError("Invalid user role");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-xl">
        
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute items-center inset-0 z-0 ml-4 h-full w-full object-cover opacity-20 "
          />

          {/* ======== CONTENT =========== */}
          <div className="relative z-10">
            <div className="border-b border-gray-200 px-3 py-4 text-center">
              {/* Logo */}
              <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-2xl border border-gray-50 bg-white">
                <img
                  src={logo}
                  alt="Youth Brain News Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Sign in to your account to continue
              </p>
            </div>

            {/* ======== FORM =========== */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              {/* username */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Username
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <CircleUser size={18} />
                  </span>

                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    autoComplete="username"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 py-3 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              {/* password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Password
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <UserKey size={20} />
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 py-3 pl-11 pr-12 text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* ==== ERROR ==== */}
              {error && (
                <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              {/* =====LOGIN BUTTON ===== */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    {/* Loading Spinner */}
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="border-t border-gray-200 px-6 py-4 text-center">
              <p className="text-xs text-gray-500">Secure admin login</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
