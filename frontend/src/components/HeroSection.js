import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Marquee,
  FloatingParticles,
  InteractiveHoverButton,
} from "../components/AnimatedComponents";

// 1. Hero Section
export function HeroSection() {
  const handleNavigate = (path) => console.log(`Navigate to: ${path}`);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const Icons = {
    google: () => (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "#FFFFFF",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#4285F4", fontWeight: "bold" }}>G</span>
        </div>
        <span
          style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: "600" }}
        >
          Google
        </span>
      </div>
    ),
    amazon: () => (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "#FFFFFF",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#FF9900", fontWeight: "bold" }}>A</span>
        </div>
        <span
          style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: "600" }}
        >
          Amazon
        </span>
      </div>
    ),
    facebook: () => (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "#FFFFFF",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#1877F2", fontWeight: "bold" }}>f</span>
        </div>
        <span
          style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: "600" }}
        >
          Facebook
        </span>
      </div>
    ),
    apple: () => (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "#FFFFFF",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#000000", fontWeight: "bold" }}>🍎</span>
        </div>
        <span
          style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: "600" }}
        >
          Apple
        </span>
      </div>
    ),
    bloomberg: () => (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "#FFFFFF",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#000000", fontWeight: "bold" }}>B</span>
        </div>
        <span
          style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: "600" }}
        >
          Bloomberg
        </span>
      </div>
    ),
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0A1A0F 0%, #162722 50%, #166D3F 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <FloatingParticles count={20} opacity={0.15} />

      <motion.div
        style={{
          textAlign: "center",
          color: "#FFFFFF",
          maxWidth: "800px",
          position: "relative",
          zIndex: 1,
        }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            background: "linear-gradient(135deg, #FFFFFF 0%, #22C55E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Welcome to ZimFIP
        </motion.h1>

        <motion.p
          style={{
            fontSize: "1.3rem",
            marginBottom: "2rem",
            color: "#B8D4B8",
            lineHeight: "1.6",
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          List your crops, connect with buyers, grow your income.
        </motion.p>

        <motion.div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "4rem",
            flexWrap: "wrap",
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <InteractiveHoverButton
            onClick={() => handleNavigate("/marketplace")}
          >
            Explore Marketplace
          </InteractiveHoverButton>
          <InteractiveHoverButton
            onClick={() => handleNavigate("/signup")}
            variant="secondary"
          >
            Join Now
          </InteractiveHoverButton>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ width: "100%", maxWidth: "1200px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p
          style={{
            fontSize: "1rem",
            color: "#B8D4B8",
            textAlign: "center",
            fontWeight: "600",
            marginBottom: "2rem",
          }}
        >
          Trusted by farmers and buyers across platforms like:
        </p>
        <Marquee pauseOnHover reverse={true} speed={30}>
          {Object.values(Icons).map((Icon, index) => (
            <div key={index} style={{ margin: "0 2rem" }}>
              <Icon />
            </div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
}
