import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  Marquee,
  FloatingParticles,
  InteractiveHoverButton,
} from "../components/AnimatedComponents";
// 6. Marketplace Features Section
export function MarketplaceFeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const features = [
    {
      title: "Easy Listing",
      description:
        "List your produce in minutes with our user-friendly platform.",
      icon: "🌾",
      color: "#22C55E",
      features: ["Photo uploads", "Inventory management", "Real-time updates"],
    },
    {
      title: "Secure Payments",
      description: "Safe and reliable transactions for buyers and sellers.",
      icon: "🔒",
      color: "#3B82F6",
      features: ["Secure processing", "Payment protection", "Fast payouts"],
    },
    {
      title: "Direct Connections",
      description:
        "Connect directly with buyers and build lasting relationships.",
      icon: "🤝",
      color: "#F59E0B",
      features: ["Direct messaging", "Community network", "Market insights"],
    },
  ];

  return (
    <div
      style={{
        padding: "6rem 2rem",
        background:
          "linear-gradient(180deg, #166D3F 0%, #0F4C2A 30%, #0A3A21 70%, #162722 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingParticles count={25} opacity={0.1} />

      <motion.div
        ref={ref}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <motion.div
          style={{ textAlign: "center", marginBottom: "4rem" }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              background: "linear-gradient(135deg, #FFFFFF 0%, #22C55E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Why Choose Our Marketplace?
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
            Empowering farmers with cutting-edge technology and seamless
            marketplace experiences
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3rem",
                padding: "2.5rem",
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "2rem",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(10px)",
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              }}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                style={{
                  flex: "0 0 140px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.5rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "1.5rem",
                  fontSize: "4rem",
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: index % 2 === 0 ? 5 : -5,
                  transition: { duration: 0.3 },
                }}
              >
                {feature.icon}
              </motion.div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    marginBottom: "1rem",
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  style={{
                    color: "#B8D4B8",
                    marginBottom: "2rem",
                    fontSize: "1.1rem",
                    lineHeight: "1.6",
                  }}
                >
                  {feature.description}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {feature.features.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem 1rem",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "0.75rem",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          background: feature.color,
                          borderRadius: "50%",
                          boxShadow: `0 0 10px ${feature.color}60`,
                        }}
                      />
                      <span
                        style={{
                          color: "#F3F4F6",
                          fontSize: "0.95rem",
                          fontWeight: "500",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// // Enhanced FloatingParticles component with more variety
// function FloatingParticles() {
//   return (
//     <>
//       {[...Array(25)].map((_, i) => (
//         <motion.div
//           key={i}
//           style={{
//             position: "absolute",
//             width: Math.random() * 4 + 2 + "px",
//             height: Math.random() * 4 + 2 + "px",
//             background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
//             borderRadius: "50%",
//             left: Math.random() * 100 + "%",
//             top: Math.random() * 100 + "%",
//             filter: "blur(1px)",
//           }}
//           animate={{
//             y: [0, -30, 0],
//             x: [0, Math.random() * 20 - 10, 0],
//             opacity: [0.1, 0.8, 0.1],
//             scale: [1, 1.5, 1],
//           }}
//           transition={{
//             duration: Math.random() * 6 + 4,
//             repeat: Infinity,
//             delay: Math.random() * 3,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </>
//   );
// }

// // Enhanced icon components with better animations
// function FarmIcon({ animate }) {
//   return (
//     <motion.svg
//       width="80"
//       height="80"
//       viewBox="0 0 100 100"
//       style={{
//         filter: "drop-shadow(0 4px 20px rgba(74, 112, 67, 0.3))",
//       }}
//       animate={
//         animate
//           ? {
//               rotate: [0, 5, -5, 0],
//               scale: [1, 1.1, 1],
//             }
//           : {}
//       }
//       transition={{
//         duration: 3,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//     >
//       <motion.circle
//         cx="50"
//         cy="50"
//         r="45"
//         fill="rgba(74, 112, 67, 0.1)"
//         stroke="rgba(74, 112, 67, 0.3)"
//         strokeWidth="2"
//         initial={{ scale: 0 }}
//         animate={{ scale: animate ? 1 : 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//       />
//       <motion.path
//         d="M30 65 Q35 55 40 65 Q45 55 50 65 Q55 55 60 65 Q65 55 70 65"
//         stroke="#4A7043"
//         strokeWidth="3"
//         fill="none"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: animate ? 1 : 0 }}
//         transition={{ duration: 1.2, delay: 0.5 }}
//       />
//       <motion.rect
//         x="48"
//         y="35"
//         width="4"
//         height="20"
//         fill="#4A7043"
//         initial={{ scaleY: 0 }}
//         animate={{ scaleY: animate ? 1 : 0 }}
//         transition={{ duration: 0.8, delay: 0.8 }}
//       />
//       <motion.circle
//         cx="50"
//         cy="30"
//         r="8"
//         fill="#22C55E"
//         initial={{ scale: 0 }}
//         animate={{ scale: animate ? 1 : 0 }}
//         transition={{ duration: 0.6, delay: 1 }}
//       />
//     </motion.svg>
//   );
// }

// function ConnectIcon({ animate }) {
//   return (
//     <motion.svg
//       width="80"
//       height="80"
//       viewBox="0 0 100 100"
//       style={{
//         filter: "drop-shadow(0 4px 20px rgba(42, 77, 62, 0.3))",
//       }}
//       animate={
//         animate
//           ? {
//               rotate: [0, -3, 3, 0],
//               scale: [1, 1.05, 1],
//             }
//           : {}
//       }
//       transition={{
//         duration: 4,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//     >
//       <motion.circle
//         cx="50"
//         cy="50"
//         r="45"
//         fill="rgba(42, 77, 62, 0.1)"
//         stroke="rgba(42, 77, 62, 0.3)"
//         strokeWidth="2"
//         initial={{ scale: 0 }}
//         animate={{ scale: animate ? 1 : 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//       />
//       <motion.circle
//         cx="35"
//         cy="35"
//         r="8"
//         fill="#2A4D3E"
//         initial={{ scale: 0 }}
//         animate={{ scale: animate ? 1 : 0 }}
//         transition={{ duration: 0.6, delay: 0.6 }}
//       />
//       <motion.circle
//         cx="65"
//         cy="35"
//         r="8"
//         fill="#2A4D3E"
//         initial={{ scale: 0 }}
//         animate={{ scale: animate ? 1 : 0 }}
//         transition={{ duration: 0.6, delay: 0.8 }}
//       />
//       <motion.circle
//         cx="50"
//         cy="65"
//         r="8"
//         fill="#2A4D3E"
//         initial={{ scale: 0 }}
//         animate={{ scale: animate ? 1 : 0 }}
//         transition={{ duration: 0.6, delay: 1 }}
//       />
//       <motion.line
//         x1="35"
//         y1="35"
//         x2="65"
//         y2="35"
//         stroke="#22C55E"
//         strokeWidth="3"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: animate ? 1 : 0 }}
//         transition={{ duration: 0.8, delay: 1.2 }}
//       />
//       <motion.line
//         x1="43"
//         y1="43"
//         x2="57"
//         y2="57"
//         stroke="#22C55E"
//         strokeWidth="3"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: animate ? 1 : 0 }}
//         transition={{ duration: 0.8, delay: 1.4 }}
//       />
//       <motion.line
//         x1="57"
//         y1="43"
//         x2="43"
//         y2="57"
//         stroke="#22C55E"
//         strokeWidth="3"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: animate ? 1 : 0 }}
//         transition={{ duration: 0.8, delay: 1.6 }}
//       />
//     </motion.svg>
//   );
// }

// function GrowthIcon({ animate }) {
//   return (
//     <motion.svg
//       width="80"
//       height="80"
//       viewBox="0 0 100 100"
//       style={{
//         filter: "drop-shadow(0 4px 20px rgba(22, 109, 63, 0.3))",
//       }}
//       animate={
//         animate
//           ? {
//               rotate: [0, 2, -2, 0],
//               scale: [1, 1.08, 1],
//             }
//           : {}
//       }
//       transition={{
//         duration: 3.5,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//     >
//       <motion.circle
//         cx="50"
//         cy="50"
//         r="45"
//         fill="rgba(22, 109, 63, 0.1)"
//         stroke="rgba(22, 109, 63, 0.3)"
//         strokeWidth="2"
//         initial={{ scale: 0 }}
//         animate={{ scale: animate ? 1 : 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//       />
//       <motion.path
//         d="M25 70 L35 60 L45 65 L55 50 L65 55 L75 40"
//         stroke="#166D3F"
//         strokeWidth="4"
//         fill="none"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         initial={{ pathLength: 0 }}
//         animate={{ pathLength: animate ? 1 : 0 }}
//         transition={{ duration: 1.5, delay: 0.5 }}
//       />
//       <motion.polygon
//         points="70,40 75,35 80,45"
//         fill="#22C55E"
//         initial={{ scale: 0 }}
//         animate={{ scale: animate ? 1 : 0 }}
//         transition={{ duration: 0.6, delay: 1.8 }}
//       />
//       <motion.circle
//         cx="35"
//         cy="60"
//         r="3"
//         fill="#22C55E"
//         initial={{ scale: 0 }}
//         animate={{ scale: animate ? 1 : 0 }}
//         transition={{ duration: 0.4, delay: 1.2 }}
//       />
//       <motion.circle
//         cx="45"
//         cy="65"
//         r="3"
//         fill="#22C55E"
//         initial={{ scale: 0 }}
//         animate={{ scale: animate ? 1 : 0 }}
//         transition={{ duration: 0.4, delay: 1.4 }}
//       />
//       <motion.circle
//         cx="55"
//         cy="50"
//         r="3"
//         fill="#22C55E"
//         initial={{ scale: 0 }}
//         animate={{ scale: animate ? 1 : 0 }}
//         transition={{ duration: 0.4, delay: 1.6 }}
//       />
//     </motion.svg>
//   );
// }

// function MarketplaceFeaturesSection() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, threshold: 0.2 });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView, controls]);

//   const features = [
//     {
//       title: "Easy Listing",
//       description:
//         "List your produce in minutes with our intuitive platform designed for farmers.",
//       icon: FarmIcon,
//       color: "#4A7043",
//       gradient: "linear-gradient(135deg, #4A7043 0%, #22C55E 100%)",
//       features: [
//         "One-click photo uploads",
//         "Smart inventory management",
//         "Real-time price updates",
//         "Automated notifications",
//       ],
//     },
//     {
//       title: "Secure Payments",
//       description:
//         "Bank-level security with instant transactions and comprehensive buyer protection.",
//       icon: ConnectIcon,
//       color: "#2A4D3E",
//       gradient: "linear-gradient(135deg, #2A4D3E 0%, #166D3F 100%)",
//       features: [
//         "256-bit encryption",
//         "Fraud protection",
//         "Instant payouts",
//         "Multiple payment methods",
//       ],
//     },
//     {
//       title: "Direct Connections",
//       description:
//         "Build meaningful relationships with buyers and grow your farming business.",
//       icon: GrowthIcon,
//       color: "#166D3F",
//       gradient: "linear-gradient(135deg, #166D3F 0%, #0A3A21 100%)",
//       features: [
//         "Real-time messaging",
//         "Community marketplace",
//         "Market analytics",
//         "Networking opportunities",
//       ],
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const featureVariants = {
//     hidden: { opacity: 0, x: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div
//       style={{
//         padding: "6rem 2rem",
//         background:
//           "linear-gradient(180deg, #166D3F 0%, #0F4C2A 30%, #0A3A21 70%, #162722 100%)",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Enhanced background elements */}
//       <div
//         style={{
//           position: "absolute",
//           top: "10%",
//           left: "10%",
//           width: "300px",
//           height: "300px",
//           background:
//             "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
//           borderRadius: "50%",
//           filter: "blur(80px)",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           bottom: "20%",
//           right: "15%",
//           width: "200px",
//           height: "200px",
//           background:
//             "radial-gradient(circle, rgba(74, 112, 67, 0.08) 0%, transparent 70%)",
//           borderRadius: "50%",
//           filter: "blur(60px)",
//         }}
//       />

//       <FloatingParticles />

//       <motion.div
//         ref={ref}
//         style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//           position: "relative",
//           zIndex: 1,
//         }}
//         initial="hidden"
//         animate={controls}
//         variants={containerVariants}
//       >
//         {/* Header Section */}
//         <motion.div
//           style={{
//             textAlign: "center",
//             marginBottom: "4rem",
//           }}
//           variants={featureVariants}
//         >
//           <motion.div
//             style={{
//               display: "inline-block",
//               padding: "0.5rem 1.5rem",
//               background: "rgba(34, 197, 94, 0.1)",
//               borderRadius: "2rem",
//               border: "1px solid rgba(34, 197, 94, 0.2)",
//               marginBottom: "1.5rem",
//             }}
//             initial={{ scale: 0 }}
//             animate={isInView ? { scale: 1 } : { scale: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//           >
//             <span
//               style={{
//                 color: "#22C55E",
//                 fontSize: "0.9rem",
//                 fontWeight: "600",
//               }}
//             >
//               ✨ Marketplace Features
//             </span>
//           </motion.div>

//           <h2
//             style={{
//               fontSize: "3.5rem",
//               fontWeight: "bold",
//               marginBottom: "1.5rem",
//               background:
//                 "linear-gradient(135deg, #FFFFFF 0%, #E8F5E8 50%, #22C55E 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//               textShadow: "0 4px 8px rgba(0,0,0,0.2)",
//               lineHeight: "1.2",
//             }}
//           >
//             Why Choose Our Platform?
//           </h2>

//           <p
//             style={{
//               fontSize: "1.2rem",
//               color: "#B8D4B8",
//               maxWidth: "600px",
//               margin: "0 auto",
//               lineHeight: "1.6",
//             }}
//           >
//             Empowering farmers with cutting-edge technology and seamless
//             marketplace experiences
//           </p>
//         </motion.div>

//         {/* Features Grid */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "3rem",
//                 padding: "2.5rem",
//                 background: "rgba(255, 255, 255, 0.03)",
//                 borderRadius: "2rem",
//                 border: "1px solid rgba(255, 255, 255, 0.08)",
//                 backdropFilter: "blur(10px)",
//                 flexDirection: index % 2 === 0 ? "row" : "row-reverse",
//                 position: "relative",
//                 overflow: "hidden",
//               }}
//               variants={featureVariants}
//               whileHover={{
//                 scale: 1.02,
//                 y: -5,
//                 transition: { duration: 0.3 },
//               }}
//             >
//               {/* Animated background glow */}
//               <motion.div
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: index % 2 === 0 ? "10%" : "80%",
//                   transform: "translate(-50%, -50%)",
//                   width: "400px",
//                   height: "200px",
//                   background: `radial-gradient(ellipse, ${feature.color}15 0%, transparent 70%)`,
//                   borderRadius: "50%",
//                   filter: "blur(60px)",
//                   zIndex: -1,
//                 }}
//                 animate={{
//                   scale: [1, 1.2, 1],
//                   opacity: [0.3, 0.6, 0.3],
//                 }}
//                 transition={{
//                   duration: 4,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               />

//               {/* Icon Section */}
//               <motion.div
//                 style={{
//                   flex: "0 0 140px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   padding: "1.5rem",
//                   background: `${feature.gradient}`,
//                   borderRadius: "1.5rem",
//                   boxShadow: `0 8px 32px ${feature.color}40`,
//                 }}
//                 whileHover={{
//                   scale: 1.1,
//                   rotate: index % 2 === 0 ? 5 : -5,
//                   transition: { duration: 0.3 },
//                 }}
//               >
//                 <feature.icon animate={isInView} />
//               </motion.div>

//               {/* Content Section */}
//               <div style={{ flex: 1 }}>
//                 <h3
//                   style={{
//                     fontSize: "2rem",
//                     fontWeight: "bold",
//                     color: "#FFFFFF",
//                     marginBottom: "1rem",
//                     background: feature.gradient,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     backgroundClip: "text",
//                   }}
//                 >
//                   {feature.title}
//                 </h3>

//                 <p
//                   style={{
//                     color: "#B8D4B8",
//                     marginBottom: "2rem",
//                     fontSize: "1.1rem",
//                     lineHeight: "1.6",
//                   }}
//                 >
//                   {feature.description}
//                 </p>

//                 {/* Feature List */}
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//                     gap: "1rem",
//                   }}
//                 >
//                   {feature.features.map((item, i) => (
//                     <motion.div
//                       key={i}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.75rem",
//                         padding: "0.75rem 1rem",
//                         background: "rgba(255, 255, 255, 0.05)",
//                         borderRadius: "0.75rem",
//                         border: "1px solid rgba(255, 255, 255, 0.1)",
//                       }}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={
//                         isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
//                       }
//                       transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
//                       whileHover={{
//                         background: "rgba(255, 255, 255, 0.08)",
//                         x: 5,
//                         transition: { duration: 0.2 },
//                       }}
//                     >
//                       <motion.div
//                         style={{
//                           width: "8px",
//                           height: "8px",
//                           background: feature.color,
//                           borderRadius: "50%",
//                           boxShadow: `0 0 10px ${feature.color}60`,
//                         }}
//                         animate={{
//                           scale: [1, 1.3, 1],
//                           opacity: [0.7, 1, 0.7],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           delay: i * 0.3,
//                         }}
//                       />
//                       <span
//                         style={{
//                           color: "#F3F4F6",
//                           fontSize: "0.95rem",
//                           fontWeight: "500",
//                         }}
//                       >
//                         {item}
//                       </span>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Call to Action */}
//         <motion.div
//           style={{
//             textAlign: "center",
//             marginTop: "4rem",
//             padding: "3rem 2rem",
//             background: "rgba(255, 255, 255, 0.05)",
//             borderRadius: "2rem",
//             border: "1px solid rgba(255, 255, 255, 0.1)",
//             backdropFilter: "blur(20px)",
//           }}
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//           transition={{ duration: 0.8, delay: 1.5 }}
//         >
//           <h3
//             style={{
//               fontSize: "2rem",
//               color: "#FFFFFF",
//               marginBottom: "1rem",
//               fontWeight: "700",
//             }}
//           >
//             Ready to Transform Your Farm Business?
//           </h3>
//           <p
//             style={{
//               color: "#B8D4B8",
//               marginBottom: "2rem",
//               fontSize: "1.1rem",
//               maxWidth: "500px",
//               margin: "0 auto 2rem auto",
//             }}
//           >
//             Join thousands of farmers already growing their success with our
//             platform
//           </p>
//           <motion.button
//             style={{
//               background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
//               color: "#FFFFFF",
//               padding: "1rem 2.5rem",
//               borderRadius: "1rem",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "1.1rem",
//               fontWeight: "600",
//               boxShadow: "0 8px 32px rgba(34, 197, 94, 0.3)",
//             }}
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 12px 40px rgba(34, 197, 94, 0.4)",
//               transition: { duration: 0.3 },
//             }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Get Started Today
//           </motion.button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

// export default MarketplaceFeaturesSection;
