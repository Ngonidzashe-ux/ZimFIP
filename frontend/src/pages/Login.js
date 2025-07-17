import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
// Enhanced FloatingParticles component
function FloatingParticles({ count = 15, opacity = 0.08 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 3 + 2 + "px",
            height: Math.random() * 3 + 2 + "px",
            background: `rgba(255, 255, 255, ${
              Math.random() * opacity + 0.05
            })`,
            borderRadius: "50%",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

// Enhanced Input Component
function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  required = false,
  error = false,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label
        style={{
          display: "block",
          color: "#E8F5E8",
          fontSize: "0.95rem",
          fontWeight: "600",
          marginBottom: "0.5rem",
          opacity: 0.9,
        }}
      >
        {label} {required && <span style={{ color: "#EF4444" }}>*</span>}
      </label>

      <div style={{ position: "relative" }}>
        {icon && (
          <div
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.2rem",
              color: isFocused ? "#22C55E" : "#B8D4B8",
              transition: "color 0.3s ease",
              zIndex: 1,
            }}
          >
            {icon}
          </div>
        )}

        <motion.input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: "100%",
            padding: icon ? "0.875rem 1rem 0.875rem 3rem" : "0.875rem 1rem",
            fontSize: "1rem",
            color: "#FFFFFF",
            background: "rgba(255, 255, 255, 0.1)",
            border: `2px solid ${
              error
                ? "#EF4444"
                : isFocused
                ? "#22C55E"
                : "rgba(255, 255, 255, 0.2)"
            }`,
            borderRadius: "0.75rem",
            outline: "none",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
            boxShadow: isFocused ? "0 0 0 3px rgba(34, 197, 94, 0.1)" : "none",
          }}
          whileFocus={{ scale: 1.02 }}
          animate={{
            borderColor: error
              ? "#EF4444"
              : isFocused
              ? "#22C55E"
              : "rgba(255, 255, 255, 0.2)",
          }}
        />
      </div>
    </div>
  );
}

// Enhanced Button Component
function ActionButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  ...props
}) {
  const variants = {
    primary: {
      background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
      color: "#FFFFFF",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
    },
    secondary: {
      background: "rgba(255, 255, 255, 0.1)",
      color: "#FFFFFF",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(10px)",
    },
    ghost: {
      background: "transparent",
      color: "#22C55E",
      border: "1px solid transparent",
    },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        width: "100%",
        padding: "0.875rem 1.5rem",
        fontSize: "1rem",
        fontWeight: "600",
        borderRadius: "0.75rem",
        border: "none",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        opacity: disabled || loading ? 0.6 : 1,
        ...variants[variant],
      }}
      whileHover={
        !disabled && !loading
          ? {
              scale: 1.02,
              y: -2,
              boxShadow:
                variant === "primary"
                  ? "0 8px 25px rgba(34, 197, 94, 0.4)"
                  : "0 8px 25px rgba(255, 255, 255, 0.2)",
            }
          : {}
      }
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading && (
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
            border: "2px solid transparent",
            borderTop: "2px solid #FFFFFF",
            borderRadius: "50%",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span style={{ opacity: loading ? 0 : 1 }}>{children}</span>
    </motion.button>
  );
}

// Enhanced Alert Component
function Alert({ type = "error", message, onClose }) {
  const types = {
    error: {
      background: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      color: "#FCA5A5",
      icon: "⚠️",
    },
    success: {
      background: "rgba(34, 197, 94, 0.1)",
      border: "1px solid rgba(34, 197, 94, 0.3)",
      color: "#86EFAC",
      icon: "✅",
    },
    info: {
      background: "rgba(59, 130, 246, 0.1)",
      border: "1px solid rgba(59, 130, 246, 0.3)",
      color: "#93C5FD",
      icon: "ℹ️",
    },
  };

  return (
    <motion.div
      style={{
        padding: "1rem",
        borderRadius: "0.75rem",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        backdropFilter: "blur(10px)",
        ...types[type],
      }}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <span style={{ fontSize: "1.2rem" }}>{types[type].icon}</span>
      <span style={{ flex: 1, fontSize: "0.95rem" }}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: types[type].color,
            cursor: "pointer",
            fontSize: "1.2rem",
            padding: "0.25rem",
            borderRadius: "0.25rem",
            opacity: 0.7,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "1")}
          onMouseLeave={(e) => (e.target.style.opacity = "0.7")}
        >
          ×
        </button>
      )}
    </motion.div>
  );
}

// Password Strength Indicator
function PasswordStrength({ password }) {
  const getStrength = (pass) => {
    if (!pass) return { score: 0, label: "", color: "#6B7280" };

    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    const levels = [
      { label: "Very Weak", color: "#EF4444" },
      { label: "Weak", color: "#F59E0B" },
      { label: "Fair", color: "#F59E0B" },
      { label: "Good", color: "#22C55E" },
      { label: "Strong", color: "#22C55E" },
    ];

    return { score, ...levels[score] };
  };

  const strength = getStrength(password);

  if (!password) return null;

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.5rem" }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "3px",
              borderRadius: "2px",
              background:
                i < strength.score
                  ? strength.color
                  : "rgba(255, 255, 255, 0.2)",
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: "0.8rem", color: strength.color }}>
        {strength.label}
      </span>
    </div>
  );
}

// Main Login Component
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const handleNavigate = (path) => {
    console.log(`Navigate to: ${path}`);
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in all required fields");
      return false;
    }

    if (isSignUp && !name) {
      setError("Please enter your name");
      return false;
    }

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      const userRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/users/me`,
        {
          headers: { Authorization: `Bearer ${res.data.token}` },
        }
      );
      setUser({ role: userRes.data.role, name: userRes.data.name });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    handleNavigate("/forgot-password");
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0A1A0F 0%, #162722 30%, #0F4C2A 70%, #0A3A21 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <FloatingParticles count={20} opacity={0.1} />

      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: "150px",
          height: "150px",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        ref={ref}
        style={{
          width: "100%",
          maxWidth: "450px",
          position: "relative",
          zIndex: 1,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌾</div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              background: "linear-gradient(135deg, #FFFFFF 0%, #22C55E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Welcome to ZimFIP
          </h1>
          <p style={{ color: "#B8D4B8", fontSize: "1.1rem" }}>
            {isSignUp
              ? "Create your account to get started"
              : "Sign in to your account"}
          </p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "1.5rem",
            padding: "2rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Social Login */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div
              style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}
            >
              <motion.button
                onClick={() => handleSocialLogin("google")}
                style={{
                  flex: 1,
                  padding: "0.875rem 1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  borderRadius: "0.75rem",
                  border: "1px solid #E5E7EB",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  background: "#FFFFFF",
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                  background: "#F9FAFB",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </motion.button>

              <motion.button
                onClick={() => handleSocialLogin("facebook")}
                style={{
                  flex: 1,
                  padding: "0.875rem 1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  borderRadius: "0.75rem",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  background: "#1877F2",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 8px 25px rgba(24, 119, 242, 0.3)",
                  background: "#166FE5",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </motion.button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                margin: "1.5rem 0",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255, 255, 255, 0.2)",
                }}
              />
              <span style={{ color: "#B8D4B8", fontSize: "0.9rem" }}>or</span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255, 255, 255, 0.2)",
                }}
              />
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert type="error" message={error} onClose={() => setError("")} />
          )}

          {/* Form */}
          <div style={{ marginBottom: "1.5rem" }}>
            {isSignUp && (
              <FormInput
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                icon="👤"
                required
              />
            )}
            <FormInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              icon="📧"
              required
            />
            <div style={{ position: "relative" }}>
              <FormInput
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                icon="🔒"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "2.25rem",
                  background: "none",
                  border: "none",
                  color: "#B8D4B8",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  padding: "0.25rem",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
              {isSignUp && <PasswordStrength password={password} />}
            </div>
            {isSignUp && (
              <FormInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                icon="🔒"
                required
                error={confirmPassword && password !== confirmPassword}
              />
            )}
            {!isSignUp && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#B8D4B8",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: "#22C55E" }}
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#22C55E",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}
            <ActionButton
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </ActionButton>
          </div>

          {/* Toggle between Login/SignUp */}
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <span style={{ color: "#B8D4B8", fontSize: "0.95rem" }}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setPassword("");
                setConfirmPassword("");
                setName("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "#22C55E",
                fontSize: "0.95rem",
                cursor: "pointer",
                textDecoration: "underline",
                marginLeft: "0.5rem",
                fontWeight: "600",
              }}
            >
              {isSignUp ? "Sign in here" : "Sign up here"}
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            color: "#B8D4B8",
            fontSize: "0.9rem",
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p>
            By continuing, you agree to our{" "}
            <span
              style={{
                color: "#22C55E",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Terms of Service
            </span>{" "}
            and{" "}
            <span
              style={{
                color: "#22C55E",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Privacy Policy
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
