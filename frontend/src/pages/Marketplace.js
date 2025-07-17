import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Enhanced FloatingParticles component
function FloatingParticles({ count = 20, opacity = 0.1 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            background: `rgba(255, 255, 255, ${
              Math.random() * opacity + 0.05
            })`,
            borderRadius: "50%",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.2, 1],
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

// Enhanced InteractiveButton component
function InteractiveButton({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  ...props
}) {
  const baseStyles = {
    fontWeight: "600",
    borderRadius: "0.75rem",
    border: "none",
    cursor: "pointer",
    position: "relative",
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  };

  const sizes = {
    small: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
    medium: { padding: "0.75rem 1.5rem", fontSize: "1rem" },
    large: { padding: "1rem 2rem", fontSize: "1.1rem" },
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
      border: "1px solid rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(10px)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "#22C55E",
      border: "2px solid #22C55E",
    },
    danger: {
      background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
      color: "#FFFFFF",
      boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
    },
  };

  return (
    <motion.button
      onClick={onClick}
      style={{
        ...baseStyles,
        ...sizes[size],
        ...variants[variant],
      }}
      whileHover={{
        scale: 1.05,
        y: -2,
        boxShadow:
          variant === "primary"
            ? "0 8px 25px rgba(34, 197, 94, 0.4)"
            : variant === "danger"
            ? "0 8px 25px rgba(239, 68, 68, 0.4)"
            : "0 8px 25px rgba(255, 255, 255, 0.2)",
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Enhanced Filter Component
function AdvancedFilter({ filters, onFilterChange, onClearFilters, listings }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get unique values for filter options
  const uniqueLocations = [
    ...new Set(listings.flatMap((l) => [l.location.province, l.location.city])),
  ].sort();
  const uniqueFarmers = [...new Set(listings.map((l) => l.farmerName))].sort();
  const uniqueGrades = [...new Set(listings.map((l) => l.farmerGrade))].sort();
  const uniqueProducts = [...new Set(listings.map((l) => l.name))].sort();

  const handleMultiSelectChange = (filterKey, value) => {
    const currentValues = filters[filterKey] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange({ ...filters, [filterKey]: newValues });
  };

  const MultiSelectDropdown = ({ label, options, filterKey, placeholder }) => (
    <div>
      <label
        style={{
          display: "block",
          color: "#B8D4B8",
          fontSize: "0.9rem",
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <select
          multiple
          value={filters[filterKey] || []}
          onChange={(e) => {
            const selectedOptions = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            onFilterChange({ ...filters, [filterKey]: selectedOptions });
          }}
          style={{
            width: "100%",
            minHeight: "2.5rem",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(255, 255, 255, 0.1)",
            color: "#FFFFFF",
            fontSize: "1rem",
            backdropFilter: "blur(5px)",
          }}
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              style={{ background: "#1A2E23", color: "#FFFFFF" }}
            >
              {option}
            </option>
          ))}
        </select>
        {filters[filterKey] && filters[filterKey].length > 0 && (
          <div
            style={{
              marginTop: "0.5rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {filters[filterKey].map((value) => (
              <span
                key={value}
                style={{
                  background: "#22C55E",
                  color: "#FFFFFF",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "1rem",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {value}
                <button
                  onClick={() => handleMultiSelectChange(filterKey, value)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#FFFFFF",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    padding: "0",
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        padding: "1.5rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        marginBottom: "2rem",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <h3
          style={{
            color: "#FFFFFF",
            fontSize: "1.2rem",
            fontWeight: "600",
            margin: 0,
          }}
        >
          🔍 Filter Products
        </h3>
        <InteractiveButton
          onClick={() => setIsExpanded(!isExpanded)}
          variant="secondary"
          size="small"
        >
          {isExpanded ? "Less Filters" : "More Filters"}
        </InteractiveButton>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Search Input */}
        <div>
          <label
            style={{
              display: "block",
              color: "#B8D4B8",
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
            }}
          >
            Search Products
          </label>
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            placeholder="Search products, farmers, locations..."
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#FFFFFF",
              fontSize: "1rem",
              backdropFilter: "blur(5px)",
            }}
          />
        </div>

        {/* Location Filter */}
        <MultiSelectDropdown
          label="Locations"
          options={uniqueLocations}
          filterKey="locations"
          placeholder="Select locations"
        />

        {/* Farmer Filter */}
        <MultiSelectDropdown
          label="Farmers"
          options={uniqueFarmers}
          filterKey="farmers"
          placeholder="Select farmers"
        />

        {isExpanded && (
          <>
            {/* Product Types */}
            <MultiSelectDropdown
              label="Product Types"
              options={uniqueProducts}
              filterKey="productTypes"
              placeholder="Select product types"
            />

            {/* Grade Filter */}
            <MultiSelectDropdown
              label="Grades"
              options={uniqueGrades}
              filterKey="grades"
              placeholder="Select grades"
            />

            {/* Price Range */}
            <div>
              <label
                style={{
                  display: "block",
                  color: "#B8D4B8",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                Price Range ($)
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="number"
                  value={filters.minPrice || ""}
                  onChange={(e) =>
                    onFilterChange({ ...filters, minPrice: e.target.value })
                  }
                  placeholder="Min"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    backdropFilter: "blur(5px)",
                  }}
                />
                <input
                  type="number"
                  value={filters.maxPrice || ""}
                  onChange={(e) =>
                    onFilterChange({ ...filters, maxPrice: e.target.value })
                  }
                  placeholder="Max"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    backdropFilter: "blur(5px)",
                  }}
                />
              </div>
            </div>

            {/* Quantity Range */}
            <div>
              <label
                style={{
                  display: "block",
                  color: "#B8D4B8",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                Quantity Available
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="number"
                  value={filters.minQuantity || ""}
                  onChange={(e) =>
                    onFilterChange({ ...filters, minQuantity: e.target.value })
                  }
                  placeholder="Min qty"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    backdropFilter: "blur(5px)",
                  }}
                />
                <input
                  type="number"
                  value={filters.maxQuantity || ""}
                  onChange={(e) =>
                    onFilterChange({ ...filters, maxQuantity: e.target.value })
                  }
                  placeholder="Max qty"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    backdropFilter: "blur(5px)",
                  }}
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label
                style={{
                  display: "block",
                  color: "#B8D4B8",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                Sort By
              </label>
              <select
                value={filters.sortBy || "newest"}
                onChange={(e) =>
                  onFilterChange({ ...filters, sortBy: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  backdropFilter: "blur(5px)",
                }}
              >
                <option
                  value="newest"
                  style={{ background: "#1A2E23", color: "#FFFFFF" }}
                >
                  Newest First
                </option>
                <option
                  value="oldest"
                  style={{ background: "#1A2E23", color: "#FFFFFF" }}
                >
                  Oldest First
                </option>
                <option
                  value="price-low"
                  style={{ background: "#1A2E23", color: "#FFFFFF" }}
                >
                  Price: Low to High
                </option>
                <option
                  value="price-high"
                  style={{ background: "#1A2E23", color: "#FFFFFF" }}
                >
                  Price: High to Low
                </option>
                <option
                  value="name"
                  style={{ background: "#1A2E23", color: "#FFFFFF" }}
                >
                  Name A-Z
                </option>
                <option
                  value="quantity-high"
                  style={{ background: "#1A2E23", color: "#FFFFFF" }}
                >
                  Quantity: High to Low
                </option>
              </select>
            </div>
          </>
        )}
      </div>

      {/* Active Filters Summary */}
      {Object.values(filters).some((f) =>
        Array.isArray(f) ? f.length > 0 : f
      ) && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              Active Filters:
            </span>
            <InteractiveButton
              onClick={onClearFilters}
              variant="outline"
              size="small"
            >
              Clear All
            </InteractiveButton>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              fontSize: "0.8rem",
              color: "#B8D4B8",
            }}
          >
            {filters.search && <span>Search: "{filters.search}"</span>}
            {filters.locations?.length > 0 && (
              <span>Locations: {filters.locations.length}</span>
            )}
            {filters.farmers?.length > 0 && (
              <span>Farmers: {filters.farmers.length}</span>
            )}
            {filters.productTypes?.length > 0 && (
              <span>Products: {filters.productTypes.length}</span>
            )}
            {filters.grades?.length > 0 && (
              <span>Grades: {filters.grades.length}</span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span>
                Price: ${filters.minPrice || "0"} - ${filters.maxPrice || "∞"}
              </span>
            )}
            {(filters.minQuantity || filters.maxQuantity) && (
              <span>
                Quantity: {filters.minQuantity || "0"} -{" "}
                {filters.maxQuantity || "∞"}
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Enhanced Product Card Component
function ProductCard({ listing, onContactSeller, onBuyNow }) {
  const [isHovered, setIsHovered] = useState(false);

  const gradeColors = {
    "Grade A": "#22C55E",
    "Grade B": "#F59E0B",
    "Grade C": "#EF4444",
  };

  return (
    <motion.div
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1.5rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        position: "relative",
      }}
      whileHover={{
        scale: 1.03,
        y: -8,
        boxShadow: "0 16px 48px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.3 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div
        style={{ position: "relative", height: "200px", overflow: "hidden" }}
      >
        <img
          src={listing.photos[0]}
          alt={listing.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
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

        {/* Grade Badge */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: gradeColors[listing.farmerGrade] || "#6B7280",
            color: "#FFFFFF",
            padding: "0.25rem 0.75rem",
            borderRadius: "1rem",
            fontSize: "0.75rem",
            fontWeight: "600",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {listing.farmerGrade}
        </div>

        {/* Price Tag */}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "1rem",
            background: "rgba(255, 255, 255, 0.9)",
            color: "#1A202C",
            padding: "0.5rem 1rem",
            borderRadius: "0.75rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
            backdropFilter: "blur(10px)",
          }}
        >
          ${listing.price}/{listing.priceUnit}
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: "1.5rem" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: "0.75rem",
            lineHeight: "1.2",
          }}
        >
          {listing.name}
        </h3>

        {/* Product Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "#22C55E", fontSize: "1rem" }}>📦</span>
            <span style={{ color: "#B8D4B8", fontSize: "0.9rem" }}>
              {listing.quantity} {listing.unit} available
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "#22C55E", fontSize: "1rem" }}>📍</span>
            <span style={{ color: "#B8D4B8", fontSize: "0.9rem" }}>
              {listing.location.city}, {listing.location.province}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "#22C55E", fontSize: "1rem" }}>📅</span>
            <span style={{ color: "#B8D4B8", fontSize: "0.9rem" }}>
              Harvested: {new Date(listing.harvestDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Farmer Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            padding: "0.75rem",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "0.75rem",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt={listing.farmerName}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(255, 255, 255, 0.3)",
            }}
          />
          <div>
            <div
              style={{
                color: "#FFFFFF",
                fontWeight: "600",
                fontSize: "0.9rem",
              }}
            >
              {listing.farmerName}
            </div>
            <div style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>
              Local Farmer
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <InteractiveButton
            onClick={() => onContactSeller(listing)}
            variant="secondary"
            size="small"
            style={{
              flex: 1,
              background: "rgba(59, 130, 246, 0.2)",
              color: "#60A5FA",
              border: "1px solid rgba(59, 130, 246, 0.5)",
              backdropFilter: "blur(10px)",
            }}
          >
            💬 Contact
          </InteractiveButton>
          <InteractiveButton
            onClick={() => onBuyNow(listing)}
            size="small"
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
              color: "#FFFFFF",
              boxShadow: "0 4px 15px rgba(5, 150, 105, 0.4)",
            }}
          >
            🛒 Buy Now
          </InteractiveButton>
        </div>
      </div>
    </motion.div>
  );
}

// Main Marketplace Component
function Marketplace() {
  const [listings] = useState([
    {
      _id: "1",
      name: "Fresh Maize",
      price: 10,
      priceUnit: "kg",
      quantity: 50,
      unit: "kg",
      location: { province: "Harare", city: "Harare" },
      harvestDate: "2025-07-01",
      farmerGrade: "Grade A",
      photos: [
        "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800",
      ],
      farmerName: "John Doe",
      seller: "farmer1",
    },
    {
      _id: "2",
      name: "Organic Tomatoes",
      price: 5,
      priceUnit: "kg",
      quantity: 30,
      unit: "kg",
      location: { province: "Masvingo", city: "Masvingo" },
      harvestDate: "2025-06-20",
      farmerGrade: "Grade B",
      photos: [
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800",
      ],
      farmerName: "Jane Smith",
      seller: "farmer2",
    },
    {
      _id: "3",
      name: "Sweet Potatoes",
      price: 8,
      priceUnit: "bag",
      quantity: 20,
      unit: "bags",
      location: { province: "Bulawayo", city: "Bulawayo" },
      harvestDate: "2025-07-05",
      farmerGrade: "Grade A",
      photos: [
        "https://cdn.pixabay.com/photo/2011/03/24/11/07/potatoes-5796_1280.jpg",
      ],
      farmerName: "Peter Mwangi",
      seller: "farmer3",
    },
    {
      _id: "4",
      name: "Green Beans",
      price: 6,
      priceUnit: "kg",
      quantity: 40,
      unit: "kg",
      location: { province: "Harare", city: "Chitungwiza" },
      harvestDate: "2025-06-25",
      farmerGrade: "Grade C",
      photos: [
        "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=800",
      ],
      farmerName: "Mary Johnson",
      seller: "farmer4",
    },
    {
      _id: "5",
      name: "Fresh Spinach",
      price: 3,
      priceUnit: "bunch",
      quantity: 60,
      unit: "bunches",
      location: { province: "Mutare", city: "Mutare" },
      harvestDate: "2025-07-10",
      farmerGrade: "Grade A",
      photos: [
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800",
      ],
      farmerName: "David Wilson",
      seller: "farmer5",
    },
    {
      _id: "6",
      name: "Carrots",
      price: 4,
      priceUnit: "kg",
      quantity: 25,
      unit: "kg",
      location: { province: "Gweru", city: "Gweru" },
      harvestDate: "2025-06-30",
      farmerGrade: "Grade B",
      photos: [
        "https://images.unsplash.com/photo-1445282768818-728615cc910a?q=80&w=800",
      ],
      farmerName: "Sarah Brown",
      seller: "farmer6",
    },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    locations: [],
    farmers: [],
    productTypes: [],
    grades: [],
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    maxQuantity: "",
    sortBy: "newest",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const handleContactSeller = (listing) => {
    console.log("Contact seller:", listing.seller);
    // Navigate to chat with listing details
  };

  const handleBuyNow = (listing) => {
    console.log("Buy now:", listing._id);
    // Navigate to purchase page
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      locations: [],
      farmers: [],
      productTypes: [],
      grades: [],
      minPrice: "",
      maxPrice: "",
      minQuantity: "",
      maxQuantity: "",
      sortBy: "newest",
    });
  };

  // Filter and sort listings
  const filteredListings = listings
    .filter((listing) => {
      // Search filter
      const matchesSearch =
        !filters.search ||
        listing.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        listing.farmerName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        listing.location.province
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        listing.location.city
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      // Location filter (multi-select)
      const matchesLocation =
        !filters.locations?.length ||
        filters.locations.some(
          (loc) =>
            listing.location.province.includes(loc) ||
            listing.location.city.includes(loc)
        );

      // Farmer filter (multi-select)
      const matchesFarmer =
        !filters.farmers?.length ||
        filters.farmers.includes(listing.farmerName);

      // Product type filter (multi-select)
      const matchesProductType =
        !filters.productTypes?.length ||
        filters.productTypes.includes(listing.name);

      // Grade filter (multi-select)
      const matchesGrade =
        !filters.grades?.length || filters.grades.includes(listing.farmerGrade);

      // Price range filter
      const matchesMinPrice =
        !filters.minPrice || listing.price >= parseInt(filters.minPrice);
      const matchesMaxPrice =
        !filters.maxPrice || listing.price <= parseInt(filters.maxPrice);

      // Quantity range filter
      const matchesMinQuantity =
        !filters.minQuantity ||
        listing.quantity >= parseInt(filters.minQuantity);
      const matchesMaxQuantity =
        !filters.maxQuantity ||
        listing.quantity <= parseInt(filters.maxQuantity);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesFarmer &&
        matchesProductType &&
        matchesGrade &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinQuantity &&
        matchesMaxQuantity
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "quantity-high":
          return b.quantity - a.quantity;
        case "oldest":
          return new Date(a.harvestDate) - new Date(b.harvestDate);
        case "newest":
        default:
          return new Date(b.harvestDate) - new Date(a.harvestDate);
      }
    });

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0A1A0F 0%, #162722 30%, #0F4C2A 70%, #0A3A21 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingParticles count={30} opacity={0.12} />

      {/* Hero Section */}
      <motion.div
        style={{
          position: "relative",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 1,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ maxWidth: "800px", padding: "2rem" }}>
          <motion.h1
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              background: "linear-gradient(135deg, #FFFFFF 0%, #22C55E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Fresh from Farm to Table
          </motion.h1>

          <motion.p
            style={{
              fontSize: "1.3rem",
              color: "#B8D4B8",
              marginBottom: "2rem",
              lineHeight: "1.6",
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover fresh, locally-grown produce directly from Zimbabwe's
            finest farmers
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <InteractiveButton
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              🌾 Browse Products
            </InteractiveButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div
        ref={ref}
        id="products"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        {/* Filter Section */}
        <AdvancedFilter
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
          listings={listings}
        />

        {/* Results Summary */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            padding: "1rem 1.5rem",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "0.75rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              {filteredListings.length} Products Found
            </span>
            <div
              style={{
                color: "#B8D4B8",
                fontSize: "0.9rem",
                marginTop: "0.25rem",
              }}
            >
              Fresh produce from local farmers
            </div>
          </div>
          <div style={{ color: "#22C55E", fontSize: "0.9rem" }}>
            Showing results for{" "}
            {filters.locations?.length > 0
              ? `${filters.locations.length} location${
                  filters.locations.length > 1 ? "s" : ""
                }`
              : "all locations"}
          </div>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
        >
          {filteredListings.length === 0 ? (
            <motion.div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "4rem 2rem",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
              <h3
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                No products found
              </h3>
              <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                Try adjusting your filters or search terms
              </p>
              <InteractiveButton onClick={handleClearFilters} variant="outline">
                Clear All Filters
              </InteractiveButton>
            </motion.div>
          ) : (
            filteredListings.map((listing) => (
              <motion.div
                key={listing._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <ProductCard
                  listing={listing}
                  onContactSeller={handleContactSeller}
                  onBuyNow={handleBuyNow}
                />
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            background: "rgba(34, 197, 94, 0.1)",
            borderRadius: "2rem",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            backdropFilter: "blur(20px)",
            marginBottom: "4rem",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌾</div>
          <h3
            style={{
              fontSize: "2rem",
              color: "#FFFFFF",
              marginBottom: "1rem",
              fontWeight: "700",
            }}
          >
            Are You a Farmer?
          </h3>
          <p
            style={{
              color: "#B8D4B8",
              marginBottom: "2rem",
              fontSize: "1.1rem",
              maxWidth: "600px",
              margin: "0 auto 2rem auto",
            }}
          >
            Join our marketplace and start selling your fresh produce to buyers
            across Zimbabwe
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <InteractiveButton
              onClick={() => console.log("Navigate to farmer signup")}
            >
              🚀 Start Selling
            </InteractiveButton>
            <InteractiveButton
              onClick={() => console.log("Navigate to farmer info")}
              variant="secondary"
            >
              📖 Learn More
            </InteractiveButton>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { number: "500+", label: "Products Available", icon: "🌾" },
            { number: "150+", label: "Verified Farmers", icon: "👨‍🌾" },
            { number: "1000+", label: "Happy Customers", icon: "😊" },
            { number: "50+", label: "Locations Served", icon: "📍" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              style={{
                textAlign: "center",
                padding: "2rem 1rem",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
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

        {/* Quality Guarantee Section */}
        <motion.div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "1.5rem",
            padding: "3rem 2rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
            marginBottom: "2rem",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3
            style={{
              fontSize: "2rem",
              color: "#FFFFFF",
              marginBottom: "2rem",
              fontWeight: "700",
            }}
          >
            Our Quality Promise
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: "🌱",
                title: "Fresh & Local",
                description:
                  "All produce is locally sourced and harvested fresh",
              },
              {
                icon: "✅",
                title: "Quality Verified",
                description:
                  "Every farmer and product is verified for quality standards",
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                description:
                  "Quick delivery to ensure freshness from farm to table",
              },
              {
                icon: "💰",
                title: "Fair Pricing",
                description:
                  "Competitive prices that benefit both farmers and buyers",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                style={{
                  padding: "1.5rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "1rem",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                  {feature.icon}
                </div>
                <h4
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBottom: "0rem",
                  }}
                >
                  {feature.title}
                </h4>
                <p
                  style={{
                    color: "#B8D4B8",
                    fontSize: "0.9rem",
                    lineHeight: "1.4",
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Marketplace;
