import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import React from "react";
import {
  Marquee,
  FloatingParticles,
  InteractiveHoverButton,
} from "../components/AnimatedComponents";
// 4. Stats Section
export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const stats = [
    {
      value: 5000,
      label: "Farmers Supported",
      icon: "🌾",
      description: "Active farmers growing with us",
      gradient: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
    },
    {
      value: 10000,
      label: "Buyers Connected",
      icon: "🤝",
      description: "Trusted buyers in our network",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    },
    {
      value: 25000,
      label: "Transactions Completed",
      icon: "📈",
      description: "Successful deals facilitated",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    },
  ];

  return (
    <div
      style={{
        padding: "6rem 2rem",
        background:
          "linear-gradient(180deg, #166D3F 0%, #0F4C2A 50%, #0A3A21 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingParticles count={12} opacity={0.08} />

      <motion.div
        ref={ref}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
          },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          style={{ marginBottom: "4rem" }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #FFFFFF 0%, #22C55E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Growing Impact
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#B8D4B8",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Real numbers from real people building Zimbabwe's agricultural
            future together
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "1.5rem",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6 },
                },
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: stat.gradient,
                }}
              />

              <div
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "1rem",
                }}
              >
                {stat.icon}
              </div>

              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  background: stat.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "1rem",
                }}
              >
                {isInView ? stat.value.toLocaleString() : "0"}
              </div>

              <h3
                style={{
                  color: "#1A202C",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.label}
              </h3>

              <p
                style={{
                  color: "#4A5568",
                  fontSize: "0.9rem",
                  lineHeight: "1.4",
                }}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
