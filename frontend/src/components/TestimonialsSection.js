import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Enhanced FloatingParticles component
function FloatingParticles() {
  return (
    <>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`,
            borderRadius: "50%",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.3, 1],
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

// Enhanced Marquee component with better performance
function Marquee({
  children,
  reverse = false,
  pauseOnHover = false,
  speed = 50,
}) {
  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        userSelect: "none",
        gap: "1rem",
        maskImage:
          "linear-gradient(to right, transparent 0%, white 5%, white 95%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, white 5%, white 95%, transparent 100%)",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          gap: "1rem",
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

const shonaReviews = [
  {
    name: "Tinashe M.",
    username: "@tinashe",
    body: "ZimFIP yakandibatsira kutengesa zvirimwa zvangu zvakananga kune vatengi, zvichiwedzera mari yangu!",
    img: "https://avatar.vercel.sh/tinashe",
    rating: 5,
  },
  {
    name: "Sarah K.",
    username: "@sarahk",
    body: "Ndinoda zvakasiyana-siyana uye mhando yezvirimwa zvitsva zviripo paZimFIP.",
    img: "https://avatar.vercel.sh/sarahk",
    rating: 5,
  },
  {
    name: "Mukudzei C.",
    username: "@mukudzei",
    body: "ZimFIP yakandipa mukana wekutengesa zvirimwa zvangu pasina zvipingamupinyi.",
    img: "https://avatar.vercel.sh/mukudzei",
    rating: 5,
  },
  {
    name: "Rudo N.",
    username: "@rudon",
    body: "Ndiri kufarira mukana wekuona zvirimwa zvitsva zvemhando yepamusoro paZimFIP.",
    img: "https://avatar.vercel.sh/rudon",
    rating: 5,
  },
  {
    name: "Tendai S.",
    username: "@tendais",
    body: "ZimFIP yakandishandura kuita mutengesi anovimbika wezvirimwa zvangu!",
    img: "https://avatar.vercel.sh/tendais",
    rating: 5,
  },
  {
    name: "Farai B.",
    username: "@faraib",
    body: "Ndinotenda ZimFIP nekundibatanidza nevatengi vakawanda zvachose.",
    img: "https://avatar.vercel.sh/faraib",
    rating: 5,
  },
];

const englishReviews = [
  {
    name: "Tinashe M.",
    username: "@tinashe",
    body: "ZimFIP helped me sell my crops directly to buyers, increasing my income significantly!",
    img: "https://avatar.vercel.sh/tinashe",
    rating: 5,
  },
  {
    name: "Sarah K.",
    username: "@sarahk",
    body: "I love the variety and quality of fresh crops available on ZimFIP marketplace.",
    img: "https://avatar.vercel.sh/sarahk",
    rating: 5,
  },
  {
    name: "Mukudzei C.",
    username: "@mukudzei",
    body: "ZimFIP gave me the opportunity to sell my crops without any obstacles.",
    img: "https://avatar.vercel.sh/mukudzei",
    rating: 5,
  },
  {
    name: "Rudo N.",
    username: "@rudon",
    body: "I'm excited about accessing high-quality fresh crops through ZimFIP platform.",
    img: "https://avatar.vercel.sh/rudon",
    rating: 5,
  },
  {
    name: "Tendai S.",
    username: "@tendais",
    body: "ZimFIP transformed me into a reliable and successful crop seller!",
    img: "https://avatar.vercel.sh/tendais",
    rating: 5,
  },
  {
    name: "Farai B.",
    username: "@faraib",
    body: "I'm grateful to ZimFIP for connecting me with so many buyers nationwide.",
    img: "https://avatar.vercel.sh/faraib",
    rating: 5,
  },
];

const ReviewCard = ({ img, name, username, body, rating }) => (
  <motion.figure
    style={{
      position: "relative",
      width: "18rem",
      cursor: "pointer",
      borderRadius: "1rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "1.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      margin: "0.5rem",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    }}
    whileHover={{
      scale: 1.03,
      y: -5,
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      transition: { duration: 0.3 },
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    aria-label={`Testimonial by ${name}`}
  >
    {/* Header with avatar and info */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          style={{
            borderRadius: "50%",
            width: "3rem",
            height: "3rem",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            objectFit: "cover",
          }}
          alt={name}
          src={img}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-2px",
            right: "-2px",
            width: "12px",
            height: "12px",
            background: "#22C55E",
            borderRadius: "50%",
            border: "2px solid #0A3A21",
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <figcaption
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#FFFFFF",
            marginBottom: "0.25rem",
          }}
        >
          {name}
        </figcaption>
        <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.6)" }}>
          {username}
        </p>
      </div>
    </div>

    {/* Star rating */}
    <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
      {[...Array(rating)].map((_, i) => (
        <motion.span
          key={i}
          style={{
            color: "#F59E0B",
            fontSize: "1rem",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          ★
        </motion.span>
      ))}
    </div>

    {/* Quote */}
    <blockquote
      style={{
        fontSize: "0.95rem",
        color: "#E8F5E8",
        lineHeight: "1.5",
        fontStyle: "italic",
        position: "relative",
        paddingLeft: "1rem",
        borderLeft: "3px solid #22C55E",
      }}
    >
      "{body}"
    </blockquote>

    {/* Decorative quote mark */}
    <div
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        fontSize: "2rem",
        color: "rgba(34, 197, 94, 0.2)",
        fontFamily: "serif",
      }}
    >
      "
    </div>
  </motion.figure>
);

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const shonaMid = Math.ceil(shonaReviews.length / 2);
  const shonaFirstRow = shonaReviews.slice(0, shonaMid);
  const englishSecondRow = englishReviews.slice(shonaMid);

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
          "linear-gradient(180deg, #162722 0%, #0F4C2A 50%, #0A3A21 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Enhanced background elements */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "150px",
          height: "150px",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
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
              💬 Community Voices
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
            What Our Community Says
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
            Hear from farmers and buyers who've transformed their agricultural
            journey with ZimFIP
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          style={{
            position: "relative",
            marginBottom: "3rem",
          }}
          variants={itemVariants}
        >
          <div style={{ marginBottom: "2rem" }}>
            <Marquee pauseOnHover={true} speed={40}>
              {shonaFirstRow.map((review, index) => (
                <ReviewCard key={`${review.username}-${index}`} {...review} />
              ))}
            </Marquee>
          </div>

          <div>
            <Marquee pauseOnHover={true} reverse={true} speed={35}>
              {englishSecondRow.map((review, index) => (
                <ReviewCard key={`${review.username}-${index}`} {...review} />
              ))}
            </Marquee>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginTop: "4rem",
            padding: "2rem",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "1.5rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
          variants={itemVariants}
        >
          {[
            { number: "5,000+", label: "Happy Farmers", icon: "🌾" },
            { number: "15,000+", label: "Satisfied Buyers", icon: "🛒" },
            { number: "4.9/5", label: "Average Rating", icon: "⭐" },
            { number: "50+", label: "Districts Served", icon: "📍" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              style={{
                textAlign: "center",
                padding: "1rem",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {stat.icon}
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#22C55E",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.number}
              </div>
              <div style={{ color: "#B8D4B8", fontSize: "1rem" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          style={{
            textAlign: "center",
            marginTop: "4rem",
            padding: "3rem 2rem",
            background: "rgba(34, 197, 94, 0.1)",
            borderRadius: "2rem",
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
            Join Our Growing Community
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
            Be part of Zimbabwe's agricultural transformation. Start your
            journey today!
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.button
              style={{
                background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
                color: "#FFFFFF",
                padding: "1rem 2rem",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
                boxShadow: "0 8px 32px rgba(34, 197, 94, 0.3)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 40px rgba(34, 197, 94, 0.4)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Selling
            </motion.button>
            <motion.button
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF",
                padding: "1rem 2rem",
                borderRadius: "0.75rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
                backdropFilter: "blur(10px)",
              }}
              whileHover={{
                scale: 1.05,
                background: "rgba(255, 255, 255, 0.15)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Products
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default TestimonialsSection;
