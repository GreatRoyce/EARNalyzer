import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import api from "../../utils/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      console.log("Requesting password reset for:", email);
      await api.post("/auth/forgot-password", { email });
      setSuccess(true);
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.response?.data?.message || "Failed to request password reset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center p-4" style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e8d9a6' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      fontFamily: 'serif'
    }}>
      {/* Ink Stains */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sepia rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-burntUmber rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>

      <div className="relative w-full max-w-md">
        {/* Manuscript Card */}
        <div className="bg-agedPaper/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-charcoal p-8" style={{ 
          boxShadow: '10px 10px 30px rgba(0,0,0,0.2), inset 0 0 20px rgba(244, 228, 188, 0.3)',
          fontFamily: 'serif'
        }}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-inkBlack mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              {forgotPassword ? "Seek Passage Reset" : "Welcome, Scholar"}
            </h1>
            <p className="text-sepia font-light" style={{ fontFamily: 'serif' }}>
              {forgotPassword 
                ? "Inscribe your email address to reset your password" 
                : "Enter your study chamber at Earnalyzer"
              }
            </p>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-crimson rounded-xl flex items-center gap-3" style={{ fontFamily: 'serif' }}>
              <div className="w-2 h-2 bg-crimson rounded-full"></div>
              <p className="text-crimson text-sm flex-1">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-forestGreen rounded-xl flex items-center gap-3" style={{ fontFamily: 'serif' }}>
              <div className="w-2 h-2 bg-forestGreen rounded-full"></div>
              <p className="text-forestGreen text-sm flex-1">
                {forgotPassword
                  ? "Passage reset scroll dispatched! Seek thy inbox."
                  : "Entry granted! Proceeding to thy chamber..."
                }
              </p>
            </div>
          )}

          <form onSubmit={forgotPassword ? handleForgotPassword : handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-inkBlack" style={{ fontFamily: 'Georgia, serif' }}>
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sepia h-5 w-5" />
                <input
                  id="email"
                  type="email"
                  placeholder="scribe@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-charcoal rounded-xl focus:outline-none focus:ring-2 focus:ring-forestGreen focus:border-forestGreen bg-parchment/50 backdrop-blur-sm transition-all duration-200"
                  style={{ fontFamily: 'serif' }}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            {!forgotPassword && (
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-inkBlack" style={{ fontFamily: 'Georgia, serif' }}>
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sepia h-5 w-5" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border-2 border-charcoal rounded-xl focus:outline-none focus:ring-2 focus:ring-forestGreen focus:border-forestGreen bg-parchment/50 backdrop-blur-sm transition-all duration-200"
                    style={{ fontFamily: 'serif' }}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sepia hover:text-inkBlack transition-colors"
                  >
                    {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 border-2 border-charcoal ${
                loading
                  ? "bg-charcoal cursor-not-allowed text-parchment"
                  : "bg-forestGreen hover:bg-forestGreen/90 text-parchment shadow-lg hover:shadow-xl transform hover:scale-105"
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-parchment border-t-transparent rounded-full animate-spin"></div>
                  {forgotPassword ? "Dispatching..." : "Granting Entry..."}
                </>
              ) : (
                <>
                  {forgotPassword ? "Send Reset Scroll" : "Enter Study"}
                  <FiArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Forgot Password */}
          <div className="text-center mt-6 pt-6 border-t-2 border-charcoal">
            <button
              type="button"
              onClick={() => {
                setForgotPassword(!forgotPassword);
                setError("");
                setSuccess(false);
                setPassword("");
              }}
              className="text-forestGreen hover:text-forestGreen/80 font-medium text-sm transition-colors duration-200"
              style={{ fontFamily: 'serif' }}
            >
              {forgotPassword ? "← Return to Entry" : "Forgotten Password?"}
            </button>
          </div>

          {/* Sign Up Link */}
          {!forgotPassword && (
            <div className="text-center mt-4">
              <p className="text-sepia text-sm" style={{ fontFamily: 'serif' }}>
                New to our order?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-forestGreen hover:text-forestGreen/80 font-medium transition-colors duration-200 hover:underline"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Join our fellowship
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Brand Footer */}
        <div className="text-center mt-8">
          <p className="text-sepia text-sm font-light" style={{ fontFamily: 'serif' }}>
            Protected • Private • Ancient Wisdom
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;