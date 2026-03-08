import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid email or phone number.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password =
        "Your password must contain between 4 and 60 characters.";
    } else if (formData.password.length < 4 || formData.password.length > 60) {
      newErrors.password =
        "Your password must contain between 4 and 60 characters.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("netflix_users") || "[]");
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === formData.email.toLowerCase() &&
          u.password === formData.password,
      );
      if (!user) {
        setApiError("Incorrect email or password.");
      } else {
        sessionStorage.setItem(
          "user",
          JSON.stringify({ name: user.name, email: user.email }),
        );
        navigate("/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-bg-overlay" />
      </div>

      <header className="login-header">
        <div className="netflix-logo">
          <img src={logo} alt="Netflix" />
        </div>
      </header>

      <main className="login-main">
        <div className={`login-card ${apiError ? "shake" : ""}`}>
          <h1 className="login-title">Sign In</h1>

          {apiError && (
            <div className="error-banner">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="login-form">
            <div
              className={`field-group ${errors.email ? "field-error" : ""} ${formData.email ? "field-filled" : ""}`}
            >
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
              <label htmlFor="email">Email or phone number</label>
              {errors.email && (
                <span className="field-error-msg">{errors.email}</span>
              )}
            </div>

            <div
              className={`field-group ${errors.password ? "field-error" : ""} ${formData.password ? "field-filled" : ""}`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="show-hide-btn"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
              {errors.password && (
                <span className="field-error-msg">{errors.password}</span>
              )}
            </div>

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : "Sign In"}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <a href="#" className="forgot-link">
              Forgot password?
            </a>

            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkbox-custom" />
              Remember me
            </label>

            <p className="signup-prompt">
              New to Netflix?{" "}
              <Link to="/signup" className="signup-link">
                Sign up now
              </Link>
            </p>

            <p className="recaptcha-notice">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <a href="#" className="learn-more">
                Learn more.
              </a>
            </p>
          </form>
        </div>
      </main>

      <footer className="login-footer">
        <div className="footer-links">
          {[
            "FAQ",
            "Help Centre",
            "Terms of Use",
            "Privacy",
            "Cookie Preferences",
            "Corporate Information",
          ].map((link) => (
            <a key={link} href="#">
              {link}
            </a>
          ))}
        </div>
        <p className="footer-copy">Netflix India</p>
      </footer>
    </div>
  );
}
