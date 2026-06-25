import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Mail, Lock, LogIn, ShieldAlert, Sparkles } from "lucide-react";
import API_URL from "../Config/config";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, data);
      setLoading(false);

      if (response.data && response.data.success === false) {
        swal("Login Failed", response.data.message || "Invalid credentials", "error");
        return;
      }

      const token = response.data?.data?.token;
      const user = response.data?.data?.user;

      if (!token) {
        swal("Login Failed", "No token returned from server", "error");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      swal("Welcome back!", "Login successful. Redirecting to dashboard...", "success");
      window.location.href = "/admin";
    } catch (err) {
      setLoading(false);
      console.error(err);
      const errMsg = err.response?.data?.message || "Failed to connect to the server. Please try again.";
      setError(errMsg);
      swal("Login Error", errMsg, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-ivory px-4 py-12 sm:px-6 lg:px-8 font-sans mesh-bg">
      <div className="max-w-md w-full space-y-8 bg-card-bg p-8 rounded-3xl shadow-2xl border border-border-subtle">
        
        {/* Brand Logo Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-maroon rounded-2xl flex items-center justify-center shadow-lg shadow-primary-maroon/20">
            <Sparkles className="h-8 w-8 text-secondary-yellow" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-text-dark tracking-tight">
            AI-CRM System
          </h2>
          <p className="mt-2 text-sm text-text-dark/60">
            Empowering your business relations with artificial intelligence
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-red-400 flex-shrink-0" />
            <p className="text-xs text-red-400 font-medium">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold text-text-dark/50 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-text-dark/40" />
                </div>
                <input
                  id="email"      
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={onChangeHandler}
                  className="block w-full pl-11 pr-4 py-3 border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-maroon/30 focus:border-primary-maroon/40 text-sm text-text-dark placeholder-text-dark/30 bg-bg-ivory transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-[10px] font-bold text-text-dark/50 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs text-secondary-yellow font-semibold hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-text-dark/40" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={onChangeHandler}
                  className="block w-full pl-11 pr-4 py-3 border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-maroon/30 focus:border-primary-maroon/40 text-sm text-text-dark placeholder-text-dark/30 bg-bg-ivory transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 accent-primary-maroon border-border-subtle rounded-md bg-bg-ivory"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs text-text-dark/60">
              Remember my credentials
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-primary-maroon hover:bg-primary-maroon-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-maroon transition-all shadow-lg shadow-primary-maroon/20 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer uppercase tracking-wider"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing In...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4 text-secondary-yellow" /> Sign In
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-text-dark/60">
            Don't have an account yet?{" "}
            <Link to="/register" className="font-bold text-secondary-yellow hover:text-secondary-yellow-dark hover:underline transition-colors">
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;