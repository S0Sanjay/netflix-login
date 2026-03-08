import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import logo from "../assets/logo.png";

const API_URL = import.meta.env.DEV 
  ? 'http://localhost:5000/api' 
  : '/api'
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid email address.";
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
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
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
      const response = await axios.post(`${API_URL}/signup`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      if (response.data.success) {
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/login");
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
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
          <h1 className="login-title">Create Account</h1>

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
              className={`field-group ${errors.name ? "field-error" : ""} ${formData.name ? "field-filled" : ""}`}
            >
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
              <label htmlFor="name">Full name</label>
              {errors.name && (
                <span className="field-error-msg">{errors.name}</span>
              )}
            </div>

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
              <label htmlFor="email">Email address</label>
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

            <div
              className={`field-group ${errors.confirmPassword ? "field-error" : ""} ${formData.confirmPassword ? "field-filled" : ""}`}
            >
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="confirmPassword">Confirm password</label>
              <button
                type="button"
                className="show-hide-btn"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? "HIDE" : "SHOW"}
              </button>
              {errors.confirmPassword && (
                <span className="field-error-msg">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : "Create Account"}
            </button>

            <p className="signup-prompt">
              Already have an account?{" "}
              <Link to="/login" className="signup-link">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>

      <footer className="login-footer">
        <div className="footer-links">
          {["FAQ", "Help Centre", "Terms of Use", "Privacy"].map((link) => (
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
