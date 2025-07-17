import { motion } from "framer-motion";

export const FarmIcon = ({ animate }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <motion.path
      d="M30 10C25 10 20 15 20 20V40C20 45 25 50 30 50C35 50 40 45 40 40V20C40 15 35 10 30 10Z"
      fill="#4A7043"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : {}}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.circle
      cx="30"
      cy="15"
      r="3"
      fill="#F5E8C7"
      initial={{ scale: 0 }}
      animate={animate ? { scale: 1 } : {}}
      transition={{ delay: 0.5, duration: 0.5 }}
    />
    <motion.path
      d="M15 35L20 30L25 35L30 30L35 35L40 30L45 35"
      stroke="#2A4D3E"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : {}}
      transition={{ delay: 1, duration: 1.5 }}
    />
  </svg>
);

export const ConnectIcon = ({ animate }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <motion.circle
      cx="15"
      cy="15"
      r="8"
      fill="#4A7043"
      initial={{ scale: 0 }}
      animate={animate ? { scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    />
    <motion.circle
      cx="45"
      cy="15"
      r="8"
      fill="#4A7043"
      initial={{ scale: 0 }}
      animate={animate ? { scale: 1 } : {}}
      transition={{ delay: 0.3, duration: 0.5 }}
    />
    <motion.circle
      cx="30"
      cy="45"
      r="8"
      fill="#4A7043"
      initial={{ scale: 0 }}
      animate={animate ? { scale: 1 } : {}}
      transition={{ delay: 0.6, duration: 0.5 }}
    />
    <motion.line
      x1="15"
      y1="15"
      x2="45"
      y2="15"
      stroke="#F5E8C7"
      strokeWidth="3"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : {}}
      transition={{ delay: 0.9, duration: 0.8 }}
    />
    <motion.line
      x1="15"
      y1="15"
      x2="30"
      y2="45"
      stroke="#F5E8C7"
      strokeWidth="3"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : {}}
      transition={{ delay: 1.2, duration: 0.8 }}
    />
    <motion.line
      x1="45"
      y1="15"
      x2="30"
      y2="45"
      stroke="#F5E8C7"
      strokeWidth="3"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : {}}
      transition={{ delay: 1.5, duration: 0.8 }}
    />
  </svg>
);

export const GrowthIcon = ({ animate }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <motion.path
      d="M10 50L20 40L30 45L40 30L50 35"
      stroke="#2A4D3E"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : {}}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.circle
      cx="20"
      cy="40"
      r="4"
      fill="#F5E8C7"
      initial={{ scale: 0 }}
      animate={animate ? { scale: 1 } : {}}
      transition={{ delay: 0.5, duration: 0.3 }}
    />
    <motion.circle
      cx="30"
      cy="45"
      r="4"
      fill="#F5E8C7"
      initial={{ scale: 0 }}
      animate={animate ? { scale: 1 } : {}}
      transition={{ delay: 0.8, duration: 0.3 }}
    />
    <motion.circle
      cx="40"
      cy="30"
      r="4"
      fill="#F5E8C7"
      initial={{ scale: 0 }}
      animate={animate ? { scale: 1 } : {}}
      transition={{ delay: 1.1, duration: 0.3 }}
    />
    <motion.path
      d="M45 25L50 20L55 25M50 20V35"
      stroke="#2A4D3E"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={animate ? { pathLength: 1 } : {}}
      transition={{ delay: 1.5, duration: 0.8 }}
    />
  </svg>
);

// Enhanced InteractiveHoverButton component
export function InteractiveHoverButton({
  children,
  onClick,
  variant = "primary",
}) {
  const baseStyles = {
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    position: "relative",
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const variants = {
    primary: {
      backgroundColor: "#22C55E",
      color: "#FFFFFF",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
    },
    secondary: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "#FFFFFF",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(10px)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "#22C55E",
      border: "2px solid #22C55E",
    },
  };

  return (
    <motion.button
      onClick={onClick}
      style={{
        ...baseStyles,
        ...variants[variant],
      }}
      whileHover={{
        scale: 1.05,
        y: -2,
        boxShadow:
          variant === "primary"
            ? "0 8px 25px rgba(34, 197, 94, 0.4)"
            : "0 8px 25px rgba(255, 255, 255, 0.2)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <motion.span
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.3 }}
      >
        →
      </motion.span>
    </motion.button>
  );
}

// Enhanced Marquee component
export function Marquee({
  children,
  reverse = false,
  pauseOnHover = false,
  speed = 40,
}) {
  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        userSelect: "none",
        gap: "2rem",
        maskImage:
          "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%)",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          gap: "2rem",
          minWidth: "fit-content",
        }}
        animate={{
          x: reverse ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// Enhanced FloatingParticles component
export function FloatingParticles({ count = 15, opacity = 0.1 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            background: `rgba(255, 255, 255, ${
              Math.random() * opacity + 0.05
            })`,
            borderRadius: "50%",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

export const FloatingParticless = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle}
          style={{
            position: "absolute",
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            backgroundColor: `rgba(74, 112, 67, ${Math.random() * 0.3 + 0.1})`,
            borderRadius: "50%",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};
