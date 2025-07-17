module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // fixed a small spacing typo here
  theme: {
    extend: {
      colors: {
        "zimfip-green": "#162722", // Primary green
        "zimfip-teal": "#2dd4bf", // Secondary teal
        "zimfip-gray": "#1f2937", // Dark gray
        "zimfip-light": "#f3f4f6", // Light gray cards
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-vertical": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateX(var(--radius)) rotate(calc(-1 * var(--angle) * 1deg))",
          },
          "100%": {
            transform:
              "rotate(360deg) translateX(var(--radius)) rotate(calc(-1 * var(--angle) * 1deg))",
          },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-vertical": "marquee-vertical 40s linear infinite",
        orbit: "orbit var(--duration) linear infinite",
      },
      // Custom utility for size based on CSS var --icon-size
      // Optional if you want to use Tailwind size utilities dynamically
      spacing: {
        // Not needed if you use inline styles for --icon-size
      },
    },
  },
  plugins: [],
};
