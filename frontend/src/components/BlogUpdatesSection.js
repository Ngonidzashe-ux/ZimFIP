import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// Enhanced FloatingParticles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle}
          style={{
            position: "absolute",
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            backgroundColor: `rgba(255, 255, 255, ${
              Math.random() * 0.3 + 0.1
            })`,
            borderRadius: "50%",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Marquee component
function Marquee({
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
        gap: "1.5rem",
        maskImage:
          "linear-gradient(to right, transparent 0%, white 8%, white 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, white 8%, white 92%, transparent 100%)",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          gap: "1.5rem",
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

// Enhanced InteractiveHoverButton component
const InteractiveHoverButton = ({
  onClick,
  children,
  variant = "primary",
  ...props
}) => {
  const baseStyles = {
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  };

  const variants = {
    primary: {
      background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
      color: "#FFFFFF",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
    },
    secondary: {
      background: "rgba(255, 255, 255, 0.1)",
      color: "#FFFFFF",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
    },
  };

  return (
    <motion.button
      style={{
        ...baseStyles,
        ...variants[variant],
      }}
      whileHover={{
        scale: 1.05,
        boxShadow:
          variant === "primary"
            ? "0 8px 25px rgba(34, 197, 94, 0.4)"
            : "0 8px 25px rgba(255, 255, 255, 0.2)",
        y: -2,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

function BlogUpdatesSection() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const featuredPost = {
    title: "Maximizing Crop Yields in 2025",
    excerpt:
      "Discover cutting-edge sustainable farming techniques that can boost your agricultural productivity while protecting the environment.",
    image:
      "https://images.unsplash.com/photo-1500595046743-dd26eb752fce?q=80&w=1000",
    category: "Farming Tips",
    readTime: "5 min read",
    date: "Jan 15, 2025",
  };

  const recentPosts = [
    {
      title: "How to Join ZimFIP Marketplace",
      excerpt:
        "Complete step-by-step guide to getting started as a seller on our platform.",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b43244d178?q=80&w=800",
      category: "Getting Started",
      readTime: "3 min read",
      date: "Jan 12, 2025",
    },
    {
      title: "Market Trends for Farmers",
      excerpt:
        "Stay ahead of the curve with the latest agricultural market insights and predictions.",
      image:
        "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=800",
      category: "Market Insights",
      readTime: "4 min read",
      date: "Jan 10, 2025",
    },
    {
      title: "Organic Farming Best Practices",
      excerpt:
        "Essential tips for successful chemical-free farming that protects both crops and soil.",
      image:
        "https://images.unsplash.com/photo-1592982538447-4599b85a81a7?q=80&w=800",
      category: "Organic Farming",
      readTime: "6 min read",
      date: "Jan 8, 2025",
    },
    {
      title: "Seasonal Planting Guide",
      excerpt:
        "Optimize your harvest with our comprehensive seasonal planting calendar.",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800",
      category: "Seasonal Tips",
      readTime: "4 min read",
      date: "Jan 5, 2025",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div
      style={{
        padding: "6rem 2rem",
        background:
          "linear-gradient(180deg, #0A3A21 0%, #162722 50%, #0F4C2A 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Enhanced background elements */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "15%",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      <FloatingParticles />

      <motion.div
        ref={ref}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}
          variants={itemVariants}
        >
          <motion.div
            style={{
              display: "inline-block",
              padding: "0.5rem 1.5rem",
              background: "rgba(34, 197, 94, 0.1)",
              borderRadius: "2rem",
              border: "1px solid rgba(34, 197, 94, 0.2)",
              marginBottom: "1.5rem",
            }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              style={{
                color: "#22C55E",
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              📚 Knowledge Hub
            </span>
          </motion.div>

          <h2
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              background:
                "linear-gradient(135deg, #FFFFFF 0%, #E8F5E8 50%, #22C55E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 4px 8px rgba(0,0,0,0.2)",
              lineHeight: "1.2",
            }}
          >
            Latest Farming Tips & Updates
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
            Stay informed with expert insights, practical tips, and the latest
            trends in Zimbabwean agriculture
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          style={{
            marginBottom: "4rem",
          }}
          variants={itemVariants}
        >
          <motion.div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "1.5rem",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
            whileHover={{
              scale: 1.02,
              y: -8,
              boxShadow: "0 16px 48px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.4 },
            }}
          >
            <div
              style={{
                height: "400px",
                backgroundImage: `url(${featuredPost.image})`,
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
                    "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
                }}
              />

              {/* Category Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  left: "1.5rem",
                  background: "rgba(34, 197, 94, 0.9)",
                  color: "#FFFFFF",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  backdropFilter: "blur(10px)",
                }}
              >
                {featuredPost.category}
              </div>

              {/* Content */}
              <div
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  left: "2rem",
                  right: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                    fontSize: "0.9rem",
                    color: "#E8F5E8",
                  }}
                >
                  <span>📅 {featuredPost.date}</span>
                  <span>⏱️ {featuredPost.readTime}</span>
                </div>

                <h3
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    marginBottom: "1rem",
                    textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                    lineHeight: "1.2",
                  }}
                >
                  {featuredPost.title}
                </h3>

                <p
                  style={{
                    color: "#E8F5E8",
                    marginBottom: "1.5rem",
                    fontSize: "1.1rem",
                    lineHeight: "1.6",
                    maxWidth: "600px",
                  }}
                >
                  {featuredPost.excerpt}
                </p>

                <InteractiveHoverButton
                  onClick={() => navigate("/blog/maximizing-crop-yields-2025")}
                  aria-label="Read more about maximizing crop yields"
                  variant="primary"
                >
                  Read Full Article →
                </InteractiveHoverButton>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Posts Marquee */}
        <motion.div
          style={{
            marginBottom: "3rem",
          }}
          variants={itemVariants}
        >
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            More Articles
          </h3>

          <Marquee pauseOnHover={true} reverse={true} speed={45}>
            {recentPosts.map((post, index) => (
              <motion.div
                key={index}
                style={{
                  width: "350px",
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "1rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  style={{
                    height: "200px",
                    backgroundImage: `url(${post.image})`,
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
                        "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)",
                    }}
                  />

                  {/* Category Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      background: "rgba(34, 197, 94, 0.9)",
                      color: "#FFFFFF",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "0.75rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {post.category}
                  </div>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                      fontSize: "0.8rem",
                      color: "#B8D4B8",
                    }}
                  >
                    <span>📅 {post.date}</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#FFFFFF",
                      marginBottom: "0.75rem",
                      lineHeight: "1.3",
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      color: "#E8F5E8",
                      marginBottom: "1.5rem",
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <InteractiveHoverButton
                    onClick={() =>
                      navigate(
                        `/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`
                      )
                    }
                    aria-label={`Read more about ${post.title}`}
                    variant="secondary"
                  >
                    Read More →
                  </InteractiveHoverButton>
                </div>
              </motion.div>
            ))}
          </Marquee>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            background: "rgba(34, 197, 94, 0.08)",
            borderRadius: "1.5rem",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            backdropFilter: "blur(20px)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3
            style={{
              fontSize: "2rem",
              color: "#FFFFFF",
              marginBottom: "1rem",
              fontWeight: "700",
            }}
          >
            Stay Updated with ZimFIP
          </h3>
          <p
            style={{
              color: "#B8D4B8",
              marginBottom: "2rem",
              fontSize: "1.1rem",
              maxWidth: "500px",
              margin: "0 auto 2rem auto",
            }}
          >
            Get the latest farming tips, market updates, and platform news
            delivered to your inbox
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <InteractiveHoverButton
              onClick={() => navigate("/newsletter")}
              variant="primary"
            >
              Subscribe to Newsletter
            </InteractiveHoverButton>
            <InteractiveHoverButton
              onClick={() => navigate("/blog")}
              variant="secondary"
            >
              View All Articles
            </InteractiveHoverButton>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default BlogUpdatesSection;
