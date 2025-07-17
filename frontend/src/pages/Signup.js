import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

// Enhanced Select Component
function FormSelect({
  label,
  value,
  onChange,
  options,
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

        <motion.select
          value={value}
          onChange={onChange}
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
            cursor: "pointer",
          }}
          whileFocus={{ scale: 1.02 }}
          animate={{
            borderColor: error
              ? "#EF4444"
              : isFocused
              ? "#22C55E"
              : "rgba(255, 255, 255, 0.2)",
          }}
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              style={{
                background: "#1A2E23",
                color: "#FFFFFF",
                padding: "0.5rem",
              }}
            >
              {option.label}
            </option>
          ))}
        </motion.select>
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

// Role Selection Component
function RoleSelection({ selectedRole, onRoleChange }) {
  const roles = [
    {
      value: "farmer",
      label: "Farmer",
      icon: "🌾",
      description: "Sell your fresh produce directly to buyers",
      color: "#22C55E",
    },
    {
      value: "buyer",
      label: "Buyer",
      icon: "🛒",
      description: "Buy fresh produce directly from farmers",
      color: "#3B82F6",
    },
    {
      value: "admin",
      label: "Admin",
      icon: "⚙️",
      description: "Manage the platform and oversee operations",
      color: "#8B5CF6",
    },
  ];

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label
        style={{
          display: "block",
          color: "#E8F5E8",
          fontSize: "0.95rem",
          fontWeight: "600",
          marginBottom: "1rem",
          opacity: 0.9,
        }}
      >
        Select Your Role <span style={{ color: "#EF4444" }}>*</span>
      </label>

      <div style={{ display: "grid", gap: "0.75rem" }}>
        {roles.map((role) => (
          <motion.div
            key={role.value}
            onClick={() => onRoleChange(role.value)}
            style={{
              padding: "1rem",
              borderRadius: "0.75rem",
              border: `2px solid ${
                selectedRole === role.value
                  ? role.color
                  : "rgba(255, 255, 255, 0.2)"
              }`,
              background:
                selectedRole === role.value
                  ? `${role.color}20`
                  : "rgba(255, 255, 255, 0.05)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              backdropFilter: "blur(10px)",
            }}
            whileHover={{
              scale: 1.02,
              background:
                selectedRole === role.value
                  ? `${role.color}30`
                  : "rgba(255, 255, 255, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              style={{
                fontSize: "2rem",
                minWidth: "3rem",
                textAlign: "center",
              }}
            >
              {role.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.25rem",
                }}
              >
                {role.label}
              </div>
              <div
                style={{
                  color: "#B8D4B8",
                  fontSize: "0.9rem",
                  lineHeight: "1.4",
                }}
              >
                {role.description}
              </div>
            </div>
            {selectedRole === role.value && (
              <motion.div
                style={{
                  color: role.color,
                  fontSize: "1.5rem",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Main Signup Component
function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer",
    province: "",
    city: "",
    buyerType: "individual",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const handleNavigate = (path) => {
    console.log(`Navigate to: ${path}`);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.name || !formData.email) {
          setError("Please fill in your name and email");
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError("Please enter a valid email address");
          return false;
        }
        return true;
      case 2:
        if (!formData.password || !formData.confirmPassword) {
          setError("Please fill in both password fields");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters long");
          return false;
        }
        return true;
      case 3:
        if (!formData.role) {
          setError("Please select your role");
          return false;
        }
        return true;
      case 4:
        if (!formData.province || !formData.city) {
          setError("Please fill in your location details");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      setError("");
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
    setError("");
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setLoading(true);
    setError("");

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        name: formData.name,
        location: { province: formData.province, city: formData.city },
        ...(formData.role === "buyer" && { buyerType: formData.buyerType }),
      };

      console.log("Signup payload:", payload);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Signup successful!");
      handleNavigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Social signup with ${provider}`);
  };

  const zimbabweProvinces = [
    { value: "harare", label: "Harare" },
    { value: "bulawayo", label: "Bulawayo" },
    { value: "manicaland", label: "Manicaland" },
    { value: "mashonaland-central", label: "Mashonaland Central" },
    { value: "mashonaland-east", label: "Mashonaland East" },
    { value: "mashonaland-west", label: "Mashonaland West" },
    { value: "masvingo", label: "Masvingo" },
    { value: "matabeleland-north", label: "Matabeleland North" },
    { value: "matabeleland-south", label: "Matabeleland South" },
    { value: "midlands", label: "Midlands" },
  ];

  const buyerTypes = [
    { value: "individual", label: "Individual Buyer" },
    { value: "business", label: "Business/Restaurant" },
  ];

  const totalSteps = 4;

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
          top: "15%",
          left: "8%",
          width: "180px",
          height: "180px",
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
          right: "12%",
          width: "220px",
          height: "220px",
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
          maxWidth: "500px",
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
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌱</div>
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
            Join ZimFIP
          </h1>
          <p style={{ color: "#B8D4B8", fontSize: "1.1rem" }}>
            Create your account to start connecting with Zimbabwe's agricultural
            community
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              Step {currentStep} of {totalSteps}
            </span>
            <span style={{ color: "#B8D4B8", fontSize: "0.9rem" }}>
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #22C55E 0%, #16A34A 100%)",
                borderRadius: "3px",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
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
          {/* Social Signup (only on first step) */}
          {currentStep === 1 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <motion.button
                  onClick={() => handleSocialSignup("google")}
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
                  onClick={() => handleSocialSignup("facebook")}
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
          )}

          {/* Error Alert */}
          {error && (
            <Alert type="error" message={error} onClose={() => setError("")} />
          )}

          {/* Step Content */}
          <div style={{ minHeight: "400px" }}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    marginBottom: "1.5rem",
                  }}
                >
                  Basic Information
                </h3>

                <FormInput
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  icon="👤"
                  required
                />

                <FormInput
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  icon="📧"
                  required
                />
              </motion.div>
            )}

            {/* Step 2: Password Setup */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    marginBottom: "1.5rem",
                  }}
                >
                  Create Password
                </h3>

                <div style={{ position: "relative" }}>
                  <FormInput
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
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
                  <PasswordStrength password={formData.password} />
                </div>

                <div style={{ position: "relative" }}>
                  <FormInput
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    placeholder="Confirm your password"
                    icon="🔒"
                    required
                    error={
                      formData.confirmPassword &&
                      formData.password !== formData.confirmPassword
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Role Selection */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    marginBottom: "1.5rem",
                  }}
                >
                  Choose Your Role
                </h3>

                <RoleSelection
                  selectedRole={formData.role}
                  onRoleChange={(role) => handleInputChange("role", role)}
                />

                {formData.role === "buyer" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormSelect
                      label="Buyer Type"
                      value={formData.buyerType}
                      onChange={(e) =>
                        handleInputChange("buyerType", e.target.value)
                      }
                      options={buyerTypes}
                      icon="🏢"
                      required
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 4: Location Details */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    marginBottom: "1.5rem",
                  }}
                >
                  Location Details
                </h3>

                <FormSelect
                  label="Province"
                  value={formData.province}
                  onChange={(e) =>
                    handleInputChange("province", e.target.value)
                  }
                  options={zimbabweProvinces}
                  icon="🏛️"
                  required
                />

                <FormInput
                  label="City/Town"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter your city or town"
                  icon="🏙️"
                  required
                />

                {/* Summary Card */}
                <motion.div
                  style={{
                    padding: "1.5rem",
                    background: "rgba(34, 197, 94, 0.1)",
                    borderRadius: "1rem",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                    marginTop: "1.5rem",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h4
                    style={{
                      color: "#FFFFFF",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                    }}
                  >
                    Account Summary
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gap: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#B8D4B8" }}>Name:</span>
                      <span style={{ color: "#FFFFFF" }}>{formData.name}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#B8D4B8" }}>Email:</span>
                      <span style={{ color: "#FFFFFF" }}>{formData.email}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#B8D4B8" }}>Role:</span>
                      <span style={{ color: "#FFFFFF" }}>
                        {formData.role.charAt(0).toUpperCase() +
                          formData.role.slice(1)}
                      </span>
                    </div>
                    {formData.role === "buyer" && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ color: "#B8D4B8" }}>Buyer Type:</span>
                        <span style={{ color: "#FFFFFF" }}>
                          {
                            buyerTypes.find(
                              (t) => t.value === formData.buyerType
                            )?.label
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            {currentStep > 1 && (
              <ActionButton
                onClick={handlePrevious}
                variant="secondary"
                style={{ flex: 1 }}
              >
                ← Previous
              </ActionButton>
            )}

            {currentStep < totalSteps ? (
              <ActionButton onClick={handleNext} style={{ flex: 1 }}>
                Next →
              </ActionButton>
            ) : (
              <ActionButton
                onClick={handleSubmit}
                loading={loading}
                disabled={loading}
                style={{ flex: 1 }}
              >
                Create Account
              </ActionButton>
            )}
          </div>
        </motion.div>

        {/* Login Link */}
        <motion.div
          style={{
            textAlign: "center",
            marginTop: "2rem",
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span style={{ color: "#B8D4B8", fontSize: "0.95rem" }}>
            Already have an account?
          </span>
          <button
            onClick={() => handleNavigate("/login")}
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
            Sign in here
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#B8D4B8",
            fontSize: "0.9rem",
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p>
            By creating an account, you agree to our{" "}
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

export default Signup;
