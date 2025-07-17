import { motion } from "framer-motion";

function InteractiveHoverButton({ children, onClick, ...props }) {
  return (
    <motion.button
      style={{
        background: "linear-gradient(135deg, #4A7043 0%, #2A4D3E 100%)",
        color: "#FFFFFF",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "500",
        fontFamily: "'Poppins', sans-serif",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 5px 15px rgba(74, 112, 67, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default InteractiveHoverButton;
