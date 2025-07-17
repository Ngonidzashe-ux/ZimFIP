import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Marquee,
  FloatingParticles,
  InteractiveHoverButton,
} from "../components/AnimatedComponents";
export function InfoCardsSection() {
  const handleNavigate = (path) => console.log(`Navigate to: ${path}`);

  const infoCards = [
    {
      title: "Sustainable Farming",
      description:
        "Promote eco-friendly practices with access to comprehensive resources, expert tips, and sustainable farming techniques.",
      icon: "🌱",
      route: "/resources",
      gradient: "linear-gradient(135deg, #E8F5E8 0%, #D4F4D4 100%)",
      accentColor: "#166D3F",
      features: ["Eco-friendly", "Expert guidance", "Best practices"],
    },
    {
      title: "Easy Transactions",
      description:
        "Secure and seamless payment processing with built-in protection for both buyers and sellers in every transaction.",
      icon: "💸",
      route: "/marketplace",
      gradient: "linear-gradient(135deg, #FFF7E6 0%, #FEF3C7 100%)",
      accentColor: "#D97706",
      features: ["Secure payments", "Buyer protection", "Instant processing"],
    },
    {
      title: "Community Driven",
      description:
        "Join a vibrant network of farmers and buyers working together for shared success and sustainable growth.",
      icon: "🤝",
      route: "/community",
      gradient: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
      accentColor: "#0369A1",
      features: ["Active network", "Shared knowledge", "Mutual support"],
    },
  ];

  return (
    <div
      style={{
        padding: "6rem 2rem",
        background:
          "linear-gradient(180deg, #162722 0%, #0F4C2A 50%, #166D3F 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingParticles count={10} opacity={0.08} />

      <motion.div
        style={{
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
          },
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #FFFFFF 0%, #22C55E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
            }}
          >
            Platform Highlights
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#B8D4B8",
              marginBottom: "3rem",
              maxWidth: "500px",
              margin: "0 auto 3rem auto",
            }}
          >
            Discover the features that make ZimFIP the premier agricultural
            platform
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          {infoCards.map((card, index) => (
            <motion.div
              key={index}
              style={{
                background: card.gradient,
                borderRadius: "1rem",
                padding: "2rem 1.5rem",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                position: "relative",
                cursor: "pointer",
              }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  display: "inline-block",
                }}
                animate={{
                  y: [-2, 2, -2],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {card.icon}
              </motion.div>

              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#1A202C",
                  marginBottom: "0.75rem",
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  color: "#4A5568",
                  lineHeight: "1.6",
                  fontSize: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                {card.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                {card.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    style={{
                      fontSize: "0.8rem",
                      color: card.accentColor,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <InteractiveHoverButton
                onClick={() => handleNavigate(card.route)}
              >
                Learn More
              </InteractiveHoverButton>

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: `linear-gradient(90deg, ${card.accentColor} 0%, ${card.accentColor}80 100%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
