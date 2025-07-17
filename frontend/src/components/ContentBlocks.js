import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Marquee,
  FloatingParticles,
  InteractiveHoverButton,
} from "../components/AnimatedComponents";
// Simulated InteractiveHoverButton component with fixed arrow
// 2. Content Blocks Section
export function ContentBlocks() {
  const handleNavigate = (path) => console.log(`Navigate to: ${path}`);

  const cardData = [
    {
      title: "Buy Crops Directly",
      description:
        "Connect with local farmers to purchase fresh, high-quality crops at competitive prices. Skip the middleman and support your community.",
      image:
        "https://cdn.pixabay.com/photo/2018/05/29/23/18/potato-3440360_1280.jpg",
      buttonText: "Browse Marketplace",
      route: "/marketplace",
      features: ["Fresh produce", "Fair prices", "Direct from farmers"],
    },
    {
      title: "Sell Your Produce",
      description:
        "List your crops easily and reach a wide network of buyers to grow your business. Transform your harvest into profit.",
      image:
        "https://cdn.pixabay.com/photo/2017/08/18/08/05/agriculture-2654157_1280.jpg",
      buttonText: "Start Selling",
      route: "/signup",
      features: ["Easy listing", "Wide reach", "Grow your business"],
    },
    {
      title: "Community Support",
      description:
        "Join a vibrant community with tools, resources, and support for farmers and buyers alike. Together we grow stronger.",
      image:
        "https://cdn.pixabay.com/photo/2016/12/19/10/16/hands-1917895_1280.png",
      buttonText: "Join Community",
      route: "/community",
      features: ["Expert advice", "Networking", "Shared knowledge"],
    },
  ];

  return (
    <div
      style={{
        padding: "6rem 2rem",
        background:
          "linear-gradient(180deg, #166D3F 0%, #0F4C2A 50%, #162722 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingParticles count={12} opacity={0.1} />

      <motion.div
        style={{
          textAlign: "center",
          color: "#FFFFFF",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, staggerChildren: 0.2 },
          },
        }}
        viewport={{ once: true }}
      >
        <motion.h2
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #FFFFFF 0%, #22C55E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          Why Choose ZimFIP?
        </motion.h2>

        <motion.p
          style={{
            fontSize: "1.2rem",
            color: "#B8D4B8",
            marginBottom: "3rem",
            maxWidth: "600px",
            margin: "0 auto 3rem auto",
          }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          Empowering Zimbabwe's agricultural community through direct
          connections, fair trade, and sustainable growth
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{
                scale: 1.03,
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <div
                style={{
                  height: "210px",
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1.5rem",
                    right: "1.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#FFFFFF",
                      marginBottom: "0.5rem",
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {card.title}
                  </h3>
                </div>
              </div>

              <div style={{ padding: "1.5rem" }}>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#4A5568",
                    marginBottom: "1rem",
                    lineHeight: "1.6",
                  }}
                >
                  {card.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {card.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      style={{
                        fontSize: "0.8rem",
                        color: "#166D3F",
                        backgroundColor: "#E8F5E8",
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
                  {card.buttonText}
                </InteractiveHoverButton>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
