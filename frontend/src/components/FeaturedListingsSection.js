import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Marquee,
  FloatingParticles,
  InteractiveHoverButton,
} from "../components/AnimatedComponents";
export function FeaturedListingsSection() {
  const handleNavigate = (path) => console.log(`Navigate to: ${path}`);

  const listings = [
    {
      title: "Fresh Organic Maize",
      description: "High-quality maize from local farmers, ready for delivery.",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a7f7a3d47d?q=80&w=800",
      price: "$45/bag",
      farmer: "John Mukamuri",
      location: "Mazowe Valley",
      badge: "Organic",
      badgeColor: "#22C55E",
    },
    {
      title: "Free-Range Eggs",
      description: "Farm-fresh eggs from sustainable farms.",
      image:
        "https://images.unsplash.com/photo-1587486913049-9a460a8a9c9b?q=80&w=800",
      price: "$2.50/dozen",
      farmer: "Sarah Chikwanha",
      location: "Rusape",
      badge: "Free-Range",
      badgeColor: "#F59E0B",
    },
    {
      title: "Organic Vegetables",
      description: "A variety of fresh, chemical-free vegetables.",
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800",
      price: "$15/basket",
      farmer: "Michael Zvobgo",
      location: "Chinhoyi",
      badge: "Chemical-Free",
      badgeColor: "#22C55E",
    },
    {
      title: "Premium Tomatoes",
      description: "Juicy, farm-fresh tomatoes for your kitchen.",
      image:
        "https://images.unsplash.com/photo-1592923982-4a53e9004e90?q=80&w=800",
      price: "$8/kg",
      farmer: "Grace Mutasa",
      location: "Nyanga",
      badge: "Premium",
      badgeColor: "#EF4444",
    },
  ];

  return (
    <div
      style={{
        padding: "6rem 2rem",
        background:
          "linear-gradient(180deg, #0A3A21 0%, #0F4C2A 50%, #166D3F 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingParticles count={15} opacity={0.1} />

      <motion.div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, staggerChildren: 0.1 },
          },
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #FFFFFF 0%, #22C55E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Featured Marketplace
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#B8D4B8",
              maxWidth: "600px",
              margin: "0 auto 3rem auto",
              lineHeight: "1.6",
            }}
          >
            Discover the finest produce from Zimbabwe's most trusted farmers
          </p>
        </motion.div>

        <div
          style={{
            position: "relative",
            maskImage:
              "linear-gradient(to right, transparent 0%, white 80px, white calc(100% - 80px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, white 80px, white calc(100% - 80px), transparent 100%)",
          }}
        >
          <Marquee pauseOnHover speed={40}>
            {listings.map((item, index) => (
              <motion.div
                key={index}
                style={{
                  width: "320px",
                  margin: "0 1rem",
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "1.5rem",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                  position: "relative",
                  cursor: "pointer",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "180px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: item.badgeColor,
                      color: "#FFFFFF",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "1rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    {item.badge}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      left: "1rem",
                      background: "rgba(255, 255, 255, 0.9)",
                      color: "#1A202C",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {item.price}
                  </div>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#1A202C",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color: "#4A5568",
                      marginBottom: "1rem",
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {item.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      padding: "0.75rem",
                      background: "rgba(248, 250, 252, 0.8)",
                      borderRadius: "0.5rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "600", color: "#2D3748" }}>
                        {item.farmer}
                      </div>
                      <div style={{ color: "#718096" }}>📍 {item.location}</div>
                    </div>
                  </div>

                  <InteractiveHoverButton
                    onClick={() => handleNavigate("/marketplace")}
                  >
                    View Details
                  </InteractiveHoverButton>
                </div>
              </motion.div>
            ))}
          </Marquee>
        </div>
      </motion.div>
    </div>
  );
}
// Placeholder FloatingParticles component
// function FloatingParticles() {
//   return (
//     <>
//       {[...Array(15)].map((_, i) => (
//         <motion.div
//           key={i}
//           style={{
//             position: "absolute",
//             width: Math.random() * 3 + 1 + "px",
//             height: Math.random() * 3 + 1 + "px",
//             background: "rgba(255, 255, 255, 0.1)",
//             borderRadius: "50%",
//             left: Math.random() * 100 + "%",
//             top: Math.random() * 100 + "%",
//           }}
//           animate={{
//             y: [0, -20, 0],
//             opacity: [0.2, 0.8, 0.2],
//             scale: [1, 1.2, 1],
//           }}
//           transition={{
//             duration: Math.random() * 4 + 3,
//             repeat: Infinity,
//             delay: Math.random() * 2,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </>
//   );
// }

// function FeaturedListingsSection() {
//   const navigate = useNavigate();

//   const listings = [
//     {
//       title: "Fresh Organic Maize",
//       description: "High-quality maize from local farmers, ready for delivery.",
//       image: "https://images.unsplash.com/photo-1605000797499-95a7f7a3d47d",
//       price: "$45/bag",
//       farmer: "John Mukamuri",
//       location: "Mazowe Valley",
//       badge: "Organic",
//       badgeColor: "#22C55E",
//     },
//     {
//       title: "Free-Range Eggs",
//       description: "Farm-fresh eggs from sustainable farms.",
//       image: "https://images.unsplash.com/photo-1587486913049-9a460a8a9c9b",
//       price: "$2.50/dozen",
//       farmer: "Sarah Chikwanha",
//       location: "Rusape",
//       badge: "Free-Range",
//       badgeColor: "#F59E0B",
//     },
//     {
//       title: "Organic Vegetables",
//       description: "A variety of fresh, chemical-free vegetables.",
//       image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
//       price: "$15/basket",
//       farmer: "Michael Zvobgo",
//       location: "Chinhoyi",
//       badge: "Chemical-Free",
//       badgeColor: "#22C55E",
//     },
//     {
//       title: "Premium Tomatoes",
//       description: "Juicy, farm-fresh tomatoes for your kitchen.",
//       image: "https://images.unsplash.com/photo-1592923982-4a53e9004e90",
//       price: "$8/kg",
//       farmer: "Grace Mutasa",
//       location: "Nyanga",
//       badge: "Premium",
//       badgeColor: "#EF4444",
//     },
//     {
//       title: "Sweet Potatoes",
//       description: "Nutritious and delicious sweet potatoes.",
//       image: "https://images.unsplash.com/photo-1577003833619-76bbd7f82948",
//       price: "$12/bag",
//       farmer: "David Sibanda",
//       location: "Gweru",
//       badge: "Fresh",
//       badgeColor: "#8B5CF6",
//     },
//     {
//       title: "Green Beans",
//       description: "Crisp, fresh green beans perfect for any meal.",
//       image: "https://images.unsplash.com/photo-1587486913049-9a460a8a9c9b",
//       price: "$6/kg",
//       farmer: "Mary Choto",
//       location: "Marondera",
//       badge: "Local",
//       badgeColor: "#06B6D4",
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 },
//     },
//   };

//   return (
//     <div
//       style={{
//         padding: "6rem 2rem",
//         background:
//           "linear-gradient(180deg, #0A3A21 0%, #0F4C2A 50%, #166D3F 100%)",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Enhanced background elements */}
//       <div
//         style={{
//           position: "absolute",
//           top: "20%",
//           left: "5%",
//           width: "250px",
//           height: "250px",
//           background:
//             "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
//           borderRadius: "50%",
//           filter: "blur(60px)",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           bottom: "15%",
//           right: "10%",
//           width: "180px",
//           height: "180px",
//           background:
//             "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
//           borderRadius: "50%",
//           filter: "blur(40px)",
//         }}
//       />

//       <FloatingParticles />

//       <motion.div
//         style={{
//           maxWidth: "1400px",
//           margin: "0 auto",
//           textAlign: "center",
//           position: "relative",
//           zIndex: 1,
//         }}
//         initial="hidden"
//         whileInView="visible"
//         variants={containerVariants}
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <motion.div variants={cardVariants}>
//           <h2
//             style={{
//               fontSize: "3.5rem",
//               fontWeight: "bold",
//               marginBottom: "1rem",
//               background:
//                 "linear-gradient(135deg, #FFFFFF 0%, #E8F5E8 50%, #D4F4D4 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//               textShadow: "0 2px 4px rgba(0,0,0,0.1)",
//             }}
//           >
//             Featured Marketplace
//           </h2>
//           <p
//             style={{
//               fontSize: "1.2rem",
//               color: "#B8D4B8",
//               maxWidth: "600px",
//               margin: "0 auto 3rem auto",
//               lineHeight: "1.6",
//             }}
//           >
//             Discover the finest produce from Zimbabwe's most trusted farmers
//           </p>
//         </motion.div>

//         <div
//           style={{
//             position: "relative",
//             maskImage:
//               "linear-gradient(to right, transparent 0%, white 80px, white calc(100% - 80px), transparent 100%)",
//             WebkitMaskImage:
//               "linear-gradient(to right, transparent 0%, white 80px, white calc(100% - 80px), transparent 100%)",
//           }}
//         >
//           <Marquee pauseOnHover speed={40}>
//             {listings.map((item, index) => (
//               <motion.div
//                 key={index}
//                 style={{
//                   width: "320px",
//                   margin: "0 1rem",
//                   background: "rgba(255, 255, 255, 0.95)",
//                   borderRadius: "1.5rem",
//                   boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   overflow: "hidden",
//                   backdropFilter: "blur(10px)",
//                   position: "relative",
//                   cursor: "pointer",
//                 }}
//                 whileHover={{
//                   scale: 1.05,
//                   y: -8,
//                   transition: { duration: 0.3, ease: "easeOut" },
//                 }}
//                 variants={cardVariants}
//               >
//                 {/* Image Section */}
//                 <div
//                   style={{
//                     position: "relative",
//                     height: "180px",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       transition: "transform 0.3s ease",
//                     }}
//                   />
//                   {/* Image overlay */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       background:
//                         "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)",
//                     }}
//                   />

//                   {/* Badge */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "1rem",
//                       right: "1rem",
//                       background: item.badgeColor,
//                       color: "#FFFFFF",
//                       padding: "0.25rem 0.75rem",
//                       borderRadius: "1rem",
//                       fontSize: "0.75rem",
//                       fontWeight: "600",
//                       boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//                     }}
//                   >
//                     {item.badge}
//                   </div>

//                   {/* Price tag */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       bottom: "1rem",
//                       left: "1rem",
//                       background: "rgba(255, 255, 255, 0.9)",
//                       color: "#1A202C",
//                       padding: "0.5rem 1rem",
//                       borderRadius: "0.75rem",
//                       fontSize: "1rem",
//                       fontWeight: "bold",
//                       backdropFilter: "blur(10px)",
//                     }}
//                   >
//                     {item.price}
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div style={{ padding: "1.5rem" }}>
//                   <h3
//                     style={{
//                       fontSize: "1.25rem",
//                       fontWeight: "bold",
//                       color: "#1A202C",
//                       marginBottom: "0.5rem",
//                       lineHeight: "1.2",
//                     }}
//                   >
//                     {item.title}
//                   </h3>

//                   <p
//                     style={{
//                       color: "#4A5568",
//                       marginBottom: "1rem",
//                       fontSize: "0.9rem",
//                       lineHeight: "1.4",
//                     }}
//                   >
//                     {item.description}
//                   </p>

//                   {/* Farmer info */}
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       marginBottom: "1rem",
//                       padding: "0.75rem",
//                       background: "rgba(248, 250, 252, 0.8)",
//                       borderRadius: "0.5rem",
//                       fontSize: "0.85rem",
//                     }}
//                   >
//                     <div>
//                       <div style={{ fontWeight: "600", color: "#2D3748" }}>
//                         {item.farmer}
//                       </div>
//                       <div style={{ color: "#718096" }}>📍 {item.location}</div>
//                     </div>
//                   </div>

//                   <motion.button
//                     style={{
//                       width: "100%",
//                       background:
//                         "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
//                       color: "#FFFFFF",
//                       padding: "0.75rem 1.5rem",
//                       borderRadius: "0.75rem",
//                       border: "none",
//                       cursor: "pointer",
//                       fontSize: "0.9rem",
//                       fontWeight: "600",
//                       position: "relative",
//                       overflow: "hidden",
//                     }}
//                     whileHover={{
//                       scale: 1.02,
//                       boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
//                     }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => navigate("/marketplace")}
//                   >
//                     <span style={{ position: "relative", zIndex: 1 }}>
//                       View Details
//                     </span>
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </Marquee>
//         </div>

//         {/* Bottom CTA */}
//         <motion.div
//           style={{
//             marginTop: "4rem",
//             padding: "2rem",
//             background: "rgba(255, 255, 255, 0.05)",
//             borderRadius: "1rem",
//             border: "1px solid rgba(255, 255, 255, 0.1)",
//             textAlign: "center",
//           }}
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <h3
//             style={{
//               fontSize: "1.5rem",
//               color: "#FFFFFF",
//               marginBottom: "1rem",
//               fontWeight: "600",
//             }}
//           >
//             Explore More Fresh Produce
//           </h3>
//           <p
//             style={{
//               color: "#B8D4B8",
//               marginBottom: "1.5rem",
//               fontSize: "1rem",
//             }}
//           >
//             Browse our full marketplace to discover hundreds of quality products
//             from local farmers
//           </p>
//           <motion.button
//             style={{
//               background: "linear-gradient(135deg, #42A366 0%, #2A4D3E 100%)",
//               color: "#FFFFFF",
//               padding: "0.75rem 2rem",
//               borderRadius: "0.75rem",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "1rem",
//               fontWeight: "600",
//             }}
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 8px 25px rgba(66, 163, 102, 0.4)",
//             }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate("/marketplace")}
//           >
//             Visit Marketplace
//           </motion.button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

// export default FeaturedListingsSection;
