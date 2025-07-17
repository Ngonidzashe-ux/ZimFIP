import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Enhanced FloatingParticles component
function FloatingParticles({ count = 10, opacity = 0.05 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 3 + 2 + "px",
            height: Math.random() * 3 + 2 + "px",
            background: `rgba(255, 255, 255, ${
              Math.random() * opacity + 0.02
            })`,
            borderRadius: "50%",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

// Enhanced Action Button
function ActionButton({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  icon,
  ...props
}) {
  const baseStyles = {
    fontWeight: "600",
    borderRadius: "0.75rem",
    border: "none",
    cursor: "pointer",
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
      background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
      color: "#FFFFFF",
      boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
    },
    secondary: {
      background: "rgba(255, 255, 255, 0.1)",
      color: "#FFFFFF",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(10px)",
    },
    success: {
      background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
      color: "#FFFFFF",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
    },
    warning: {
      background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      color: "#FFFFFF",
      boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
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
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {icon && <span style={{ fontSize: "1.2rem" }}>{icon}</span>}
      {children}
    </motion.button>
  );
}

// Analytics Card Component
function AnalyticsCard({
  title,
  value,
  change,
  icon,
  color,
  prefix = "",
  suffix = "",
}) {
  return (
    <motion.div
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        padding: "1.5rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
      }}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          fontSize: "2rem",
          opacity: 0.3,
        }}
      >
        {icon}
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <h3
          style={{
            color: "#B8D4B8",
            fontSize: "0.9rem",
            fontWeight: "500",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <span
          style={{ color: "#FFFFFF", fontSize: "2rem", fontWeight: "bold" }}
        >
          {prefix}
          {value}
          {suffix}
        </span>
      </div>

      {change && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              color: change > 0 ? "#22C55E" : "#EF4444",
              fontSize: "0.9rem",
              fontWeight: "600",
            }}
          >
            {change > 0 ? "↗" : "↘"} {Math.abs(change)}%
          </span>
          <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>
            vs last month
          </span>
        </div>
      )}
    </motion.div>
  );
}

// Purchase History Card
function PurchaseCard({ purchase, onViewDetails, onReorder, onLeaveReview }) {
  const statusColors = {
    completed: "#22C55E",
    pending: "#F59E0B",
    cancelled: "#EF4444",
    shipped: "#3B82F6",
  };

  return (
    <motion.div
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        padding: "1.5rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        marginBottom: "1rem",
      }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.3 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h3
            style={{
              color: "#FFFFFF",
              fontSize: "1.2rem",
              fontWeight: "600",
              margin: "0 0 0.5rem 0",
            }}
          >
            {purchase.productName}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                color: "#3B82F6",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              ${purchase.totalAmount}
            </span>
            <span
              style={{
                color: statusColors[purchase.status] || statusColors.pending,
                fontSize: "0.8rem",
                fontWeight: "600",
                background: `${
                  statusColors[purchase.status] || statusColors.pending
                }20`,
                padding: "0.25rem 0.75rem",
                borderRadius: "1rem",
              }}
            >
              {purchase.status}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <ActionButton
            size="small"
            variant="secondary"
            icon="👁️"
            onClick={() => onViewDetails(purchase.id)}
          >
            Details
          </ActionButton>
          {purchase.status === "completed" && (
            <>
              <ActionButton
                size="small"
                variant="success"
                icon="🔄"
                onClick={() => onReorder(purchase.id)}
              >
                Reorder
              </ActionButton>
              <ActionButton
                size="small"
                variant="warning"
                icon="⭐"
                onClick={() => onLeaveReview(purchase.id)}
              >
                Review
              </ActionButton>
            </>
          )}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
        }}
      >
        <div>
          <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>Quantity</span>
          <div style={{ color: "#FFFFFF", fontWeight: "600" }}>
            {purchase.quantity} {purchase.unit}
          </div>
        </div>
        <div>
          <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>Farmer</span>
          <div style={{ color: "#FFFFFF", fontWeight: "600" }}>
            {purchase.farmerName}
          </div>
        </div>
        <div>
          <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>
            Purchase Date
          </span>
          <div style={{ color: "#FFFFFF", fontWeight: "600" }}>
            {new Date(purchase.date).toLocaleDateString()}
          </div>
        </div>
        <div>
          <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>Location</span>
          <div style={{ color: "#FFFFFF", fontWeight: "600" }}>
            {purchase.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Wishlist Item Card
function WishlistCard({ item, onRemove, onPurchase }) {
  return (
    <motion.div
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        padding: "1.5rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        marginBottom: "1rem",
      }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.3 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3
            style={{
              color: "#FFFFFF",
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            {item.name}
          </h3>
          <div
            style={{
              color: "#3B82F6",
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          >
            ${item.price}/{item.priceUnit}
          </div>
          <div style={{ color: "#B8D4B8", fontSize: "0.9rem" }}>
            {item.farmerName} • {item.location}
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <ActionButton
            size="small"
            variant="primary"
            icon="🛒"
            onClick={() => onPurchase(item.id)}
          >
            Buy Now
          </ActionButton>
          <ActionButton
            size="small"
            variant="danger"
            icon="❌"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </ActionButton>
        </div>
      </div>
    </motion.div>
  );
}

// Navigation Tab Component
function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "purchases", label: "Purchase History", icon: "🛒" },
    { id: "wishlist", label: "Wishlist", icon: "❤️" },
    { id: "messages", label: "Messages", icon: "💬" },
    { id: "disputes", label: "Disputes", icon: "⚖️" },
    { id: "reviews", label: "Reviews", icon: "⭐" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        marginBottom: "2rem",
        overflowX: "auto",
        padding: "0.5rem",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background:
              activeTab === tab.id
                ? "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
                : "transparent",
            color: activeTab === tab.id ? "#FFFFFF" : "#B8D4B8",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "600",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            whiteSpace: "nowrap",
          }}
          whileHover={{
            scale: 1.05,
            background:
              activeTab === tab.id
                ? "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
                : "rgba(255, 255, 255, 0.1)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}

// Quick Stats Component
function QuickStats({ stats }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
      }}
    >
      <AnalyticsCard
        title="Total Spent"
        value={stats.totalSpent}
        change={stats.spendingChange}
        icon="💰"
        color="#3B82F6"
        prefix="$"
      />
      <AnalyticsCard
        title="Orders This Month"
        value={stats.ordersThisMonth}
        change={stats.ordersChange}
        icon="📦"
        color="#22C55E"
      />
      <AnalyticsCard
        title="Wishlist Items"
        value={stats.wishlistItems}
        icon="❤️"
        color="#EF4444"
      />
      <AnalyticsCard
        title="Saved Amount"
        value={stats.savedAmount}
        change={stats.savingsChange}
        icon="💸"
        color="#F59E0B"
        prefix="$"
      />
    </div>
  );
}

// Review Card Component
function ReviewCard({ review, onEdit, onDelete }) {
  const ratingStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <motion.div
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        padding: "1.5rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        marginBottom: "1rem",
      }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.3 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h3
            style={{
              color: "#FFFFFF",
              fontSize: "1.2rem",
              fontWeight: "600",
              margin: "0 0 0.5rem 0",
            }}
          >
            {review.productName}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ color: "#F59E0B", fontSize: "1rem" }}>
              {ratingStars(review.rating)}
            </span>
            <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
          <p
            style={{
              color: "#FFFFFF",
              fontSize: "0.9rem",
              margin: "0 0 1rem 0",
            }}
          >
            {review.text}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <ActionButton
            size="small"
            variant="secondary"
            icon="✏️"
            onClick={() => onEdit(review.id)}
          >
            Edit
          </ActionButton>
          <ActionButton
            size="small"
            variant="danger"
            icon="🗑️"
            onClick={() => onDelete(review.id)}
          >
            Delete
          </ActionButton>
        </div>
      </div>
      <div>
        <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>Farmer</span>
        <div style={{ color: "#FFFFFF", fontWeight: "600" }}>
          {review.farmerName}
        </div>
      </div>
    </motion.div>
  );
}

// Main Buyer Dashboard Component
function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [purchases, setPurchases] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Mock data
  const mockStats = {
    totalSpent: 2840,
    spendingChange: 12.5,
    ordersThisMonth: 8,
    ordersChange: 25.0,
    wishlistItems: 12,
    savedAmount: 340,
    savingsChange: 8.2,
  };

  const mockPurchases = [
    {
      id: "1",
      productName: "Fresh Organic Maize",
      totalAmount: 450,
      quantity: 10,
      unit: "bags",
      farmerName: "John Doe",
      location: "Harare",
      date: "2025-01-10",
      status: "completed",
    },
    {
      id: "2",
      productName: "Sweet Potatoes",
      totalAmount: 120,
      quantity: 15,
      unit: "kg",
      farmerName: "Jane Smith",
      location: "Bulawayo",
      date: "2025-01-08",
      status: "shipped",
    },
    {
      id: "3",
      productName: "Tomatoes",
      totalAmount: 80,
      quantity: 10,
      unit: "kg",
      farmerName: "Peter Mwangi",
      location: "Masvingo",
      date: "2025-01-05",
      status: "pending",
    },
  ];

  const mockWishlist = [
    {
      id: "1",
      name: "Organic Spinach",
      price: 8,
      priceUnit: "kg",
      farmerName: "Mary Johnson",
      location: "Mutare",
    },
    {
      id: "2",
      name: "Free-Range Eggs",
      price: 3,
      priceUnit: "dozen",
      farmerName: "David Wilson",
      location: "Gweru",
    },
  ];

  const mockReviews = [
    {
      id: "1",
      productName: "Fresh Organic Maize",
      rating: 4,
      text: "Great quality maize, delivered fresh and on time!",
      farmerName: "John Doe",
      date: "2025-01-12",
    },
    {
      id: "2",
      productName: "Sweet Potatoes",
      rating: 5,
      text: "The best sweet potatoes I've ever bought. Highly recommend!",
      farmerName: "Jane Smith",
      date: "2025-01-09",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPurchases(mockPurchases);
      setWishlist(mockWishlist);
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  const handleNavigate = (path) => {
    console.log(`Navigate to: ${path}`);
  };

  const handleViewDetails = (id) => handleNavigate(`/purchase/${id}`);
  const handleReorder = (id) => console.log(`Reorder: ${id}`);
  const handleLeaveReview = (id) => handleNavigate(`/review/${id}`);
  const handleRemoveFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };
  const handlePurchaseFromWishlist = (id) => handleNavigate(`/purchase/${id}`);
  const handleEditReview = (id) => handleNavigate(`/review/edit/${id}`);
  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <QuickStats stats={mockStats} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              <motion.div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⭐</div>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  Product Reviews
                </h3>
                <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                  Share your experience and help other buyers make informed
                  decisions
                </p>
                <ActionButton
                  onClick={() => handleNavigate("/reviews")}
                  icon="⭐"
                >
                  View My Reviews
                </ActionButton>
              </motion.div>
              <motion.div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Recent Orders
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {purchases.slice(0, 3).map((purchase) => (
                    <div
                      key={purchase.id}
                      style={{
                        padding: "0.75rem",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                        }}
                      >
                        {purchase.productName}
                      </div>
                      <div style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>
                        ${purchase.totalAmount} • {purchase.status}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        );

      case "purchases":
        return (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                Purchase History ({purchases.length})
              </h2>
              <ActionButton
                onClick={() => handleNavigate("/marketplace")}
                icon="🛒"
              >
                Browse More Products
              </ActionButton>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ color: "#B8D4B8", fontSize: "1.1rem" }}>
                  Loading purchases...
                </div>
              </div>
            ) : purchases.length === 0 ? (
              <motion.div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "1rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  No purchases yet
                </h3>
                <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                  Start shopping to see your purchase history here
                </p>
                <ActionButton
                  onClick={() => handleNavigate("/marketplace")}
                  icon="🛒"
                >
                  Start Shopping
                </ActionButton>
              </motion.div>
            ) : (
              <div>
                {purchases.map((purchase) => (
                  <PurchaseCard
                    key={purchase.id}
                    purchase={purchase}
                    onViewDetails={handleViewDetails}
                    onReorder={handleReorder}
                    onLeaveReview={handleLeaveReview}
                  />
                ))}
              </div>
            )}
          </div>
        );

      case "wishlist":
        return (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                My Wishlist ({wishlist.length})
              </h2>
              <ActionButton
                onClick={() => handleNavigate("/marketplace")}
                icon="❤️"
              >
                Add More Items
              </ActionButton>
            </div>

            {wishlist.length === 0 ? (
              <motion.div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "1rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>❤️</div>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  Your wishlist is empty
                </h3>
                <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                  Save items you love to purchase them later
                </p>
                <ActionButton
                  onClick={() => handleNavigate("/marketplace")}
                  icon="🛒"
                >
                  Browse Products
                </ActionButton>
              </motion.div>
            ) : (
              <div>
                {wishlist.map((item) => (
                  <WishlistCard
                    key={item.id}
                    item={item}
                    onRemove={handleRemoveFromWishlist}
                    onPurchase={handlePurchaseFromWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        );

      case "messages":
        return (
          <div>
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "2rem",
              }}
            >
              Messages
            </h2>
            <motion.div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                textAlign: "center",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💬</div>
              <h3
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                }}
              >
                Message Center
              </h3>
              <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                Chat with farmers about products and deliveries
              </p>
              <ActionButton
                onClick={() => handleNavigate("/messages")}
                icon="💬"
              >
                Open Message Center
              </ActionButton>
            </motion.div>
          </div>
        );

      case "disputes":
        return (
          <div>
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "2rem",
              }}
            >
              Disputes & Support
            </h2>
            <motion.div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                textAlign: "center",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚖️</div>
              <h3
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                }}
              >
                Dispute Resolution
              </h3>
              <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                File disputes, track resolutions, and get support when needed
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <ActionButton
                  onClick={() => handleNavigate("/file-dispute")}
                  icon="📝"
                >
                  File Dispute
                </ActionButton>
                <ActionButton
                  onClick={() => handleNavigate("/view-disputes")}
                  variant="secondary"
                  icon="📋"
                >
                  View My Disputes
                </ActionButton>
              </div>
            </motion.div>
          </div>
        );

      case "reviews":
        return (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                My Reviews ({reviews.length})
              </h2>
              <ActionButton
                onClick={() => handleNavigate("/write-review")}
                icon="⭐"
              >
                Write a Review
              </ActionButton>
            </div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ color: "#B8D4B8", fontSize: "1.1rem" }}>
                  Loading reviews...
                </div>
              </div>
            ) : reviews.length === 0 ? (
              <motion.div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "1rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⭐</div>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  No reviews yet
                </h3>
                <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                  Share your experience with products you've purchased
                </p>
                <ActionButton
                  onClick={() => handleNavigate("/write-review")}
                  icon="⭐"
                >
                  Write a Review
                </ActionButton>
              </motion.div>
            ) : (
              <div>
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onEdit={handleEditReview}
                    onDelete={handleDeleteReview}
                  />
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0A1A0F 0%, #162722 30%, #0F4C2A 70%, #0A3A21 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingParticles count={15} opacity={0.08} />

      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "150px",
          height: "150px",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "8%",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />

      <div
        ref={ref}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <motion.div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛒</div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              background: "linear-gradient(135deg, #FFFFFF 0%, #3B82F6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            Buyer Dashboard
          </h1>
          <p style={{ color: "#B8D4B8", fontSize: "1.2rem" }}>
            Welcome back, {user.name}! Discover fresh produce and manage your
            orders.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {renderTabContent()}
        </motion.div>

        <motion.div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            background: "rgba(59, 130, 246, 0.1)",
            borderRadius: "1.5rem",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3
            style={{
              color: "#FFFFFF",
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            Need Help Finding Something?
          </h3>
          <p
            style={{
              color: "#B8D4B8",
              marginBottom: "1.5rem",
              fontSize: "1rem",
            }}
          >
            Our team is here to help you find the best fresh produce from local
            farmers
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <ActionButton
              onClick={() => handleNavigate("/help")}
              variant="secondary"
              icon="❓"
            >
              Help Center
            </ActionButton>
            <ActionButton
              onClick={() => handleNavigate("/contact")}
              variant="secondary"
              icon="📞"
            >
              Contact Support
            </ActionButton>
            <ActionButton
              onClick={() => handleNavigate("/marketplace")}
              variant="primary"
              icon="🛒"
            >
              Browse Marketplace
            </ActionButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
