import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { User, Mail, Lock, UserPlus, ShieldAlert, Sparkles } from "lucide-react";
import API_URL from "../../Config/config";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // RegEx validators
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z0-9_ ]{3,30}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  const validate = () => {
    const nextErrors = {};
    const username = data.username.trim();
    const email = data.email.trim();
    const password = data.password.trim();

    if (!nameRegex.test(username)) {
      nextErrors.username = "Username must be 3-30 characters, alphanumeric only.";
    }
    if (!emailRegex.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(password)) {
      nextErrors.password = "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 digit, and 1 special symbol.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // Clear field-specific error as user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      swal("Validation Error", "Please resolve the highlights in the form.", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, data);
      setLoading(false);

      if (res.data && res.data.success === false) {
        swal("Registration Failed", res.data.message || "Failed to create account", "error");
        return;
      }

      swal("Registered!", "Your account has been created successfully. Proceed to login.", "success");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
      const errMsg = error.response?.data?.message || "Internal Server Error. Please try again later.";
      swal("Registration Failed", errMsg, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-custom px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-card-custom p-8 rounded-xl shadow-xl border border-gray-100 hover-scale">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="h-8 w-8 text-secondary" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-text-primary tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Join AI-CRM and unleash smart enterprise relationships
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                  name="username"
                  type="text"
                  required
                  value={data.username}
                  onChange={onChangeHandler}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.username ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-primary focus:border-primary"
                  } rounded-xl focus:outline-none focus:ring-2 text-sm placeholder-gray-400 bg-gray-50 focus:bg-white transition-colors`}
                  placeholder="john_doe"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                  <ShieldAlert className="h-3 w-3" /> {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={data.email}
                  onChange={onChangeHandler}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-primary focus:border-primary"
                  } rounded-xl focus:outline-none focus:ring-2 text-sm placeholder-gray-400 bg-gray-50 focus:bg-white transition-colors`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                  <ShieldAlert className="h-3 w-3" /> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  value={data.password}
                  onChange={onChangeHandler}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-primary focus:border-primary"
                  } rounded-xl focus:outline-none focus:ring-2 text-sm placeholder-gray-400 bg-gray-50 focus:bg-white transition-colors`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                  <ShieldAlert className="h-3 w-3" /> {errors.password}
                </p>
              )}
            </div>

          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-secondary bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserPlus className="h-4 w-4" /> Register
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-text-secondary">
            Already have an account?{" "}
            <Link to="/" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
