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
    danger: {
      background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
      color: "#FFFFFF",
      boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
    },
    outline: {
      background: "transparent",
      color: "#22C55E",
      border: "2px solid #22C55E",
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

// Listing Card Component
function ListingCard({ listing, onEdit, onDelete, onViewMessages }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    active: "#22C55E",
    pending: "#F59E0B",
    sold: "#6B7280",
    expired: "#EF4444",
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
            {listing.name || "Product Listing"}
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
                color: "#22C55E",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              ${listing.price}/{listing.priceUnit}
            </span>
            <span
              style={{
                color: statusColors[listing.status] || statusColors.active,
                fontSize: "0.8rem",
                fontWeight: "600",
                background: `${
                  statusColors[listing.status] || statusColors.active
                }20`,
                padding: "0.25rem 0.75rem",
                borderRadius: "1rem",
              }}
            >
              {listing.status || "Active"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <ActionButton
            size="small"
            variant="secondary"
            icon="💬"
            onClick={() => onViewMessages(listing._id)}
          >
            Messages
          </ActionButton>
          <ActionButton
            size="small"
            variant="secondary"
            icon="✏️"
            onClick={() => onEdit(listing._id)}
          >
            Edit
          </ActionButton>
          <ActionButton
            size="small"
            variant="danger"
            icon="🗑️"
            onClick={() => onDelete(listing._id)}
          >
            Delete
          </ActionButton>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div>
          <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>Quantity</span>
          <div style={{ color: "#FFFFFF", fontWeight: "600" }}>
            {listing.quantity} {listing.unit}
          </div>
        </div>
        <div>
          <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>Location</span>
          <div style={{ color: "#FFFFFF", fontWeight: "600" }}>
            {listing.location?.city}, {listing.location?.province}
          </div>
        </div>
        <div>
          <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>Grade</span>
          <div style={{ color: "#FFFFFF", fontWeight: "600" }}>
            {listing.farmerGrade || "N/A"}
          </div>
        </div>
        <div>
          <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>
            Harvest Date
          </span>
          <div style={{ color: "#FFFFFF", fontWeight: "600" }}>
            {listing.harvestDate
              ? new Date(listing.harvestDate).toLocaleDateString()
              : "N/A"}
          </div>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "1rem",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                color: "#B8D4B8",
                fontSize: "0.8rem",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Payment Options
            </span>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {listing.paymentOptions?.map((option, index) => (
                <span
                  key={index}
                  style={{
                    background: "#22C55E",
                    color: "#FFFFFF",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "1rem",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>

          {listing.phoneNumber && (
            <div>
              <span
                style={{
                  color: "#B8D4B8",
                  fontSize: "0.8rem",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Contact Number
              </span>
              <span style={{ color: "#FFFFFF", fontWeight: "600" }}>
                {listing.phoneNumber}
              </span>
            </div>
          )}
        </motion.div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: "none",
          border: "none",
          color: "#22C55E",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: "600",
          marginTop: "1rem",
        }}
      >
        {isExpanded ? "Show Less ↑" : "Show More ↓"}
      </button>
    </motion.div>
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
        title="Total Earnings"
        value={stats.totalEarnings}
        change={stats.earningsChange}
        icon="💰"
        color="#22C55E"
        prefix="$"
      />
      <AnalyticsCard
        title="Active Listings"
        value={stats.activeListings}
        change={stats.listingsChange}
        icon="📦"
        color="#3B82F6"
      />
      <AnalyticsCard
        title="Sales This Month"
        value={stats.salesThisMonth}
        change={stats.salesChange}
        icon="📈"
        color="#F59E0B"
      />
      <AnalyticsCard
        title="Messages"
        value={stats.unreadMessages}
        icon="💬"
        color="#8B5CF6"
        suffix=" new"
      />
    </div>
  );
}

// Navigation Tab Component
function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "listings", label: "My Listings", icon: "📦" },
    { id: "messages", label: "Messages", icon: "💬" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "crops", label: "Crop References", icon: "🌾" },
    { id: "disputes", label: "Disputes", icon: "⚖️" },
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
                ? "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)"
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
                ? "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)"
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

// Main Dashboard Component
function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState({ name: "John Doe", email: "john@example.com" }); // Mock user

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Mock data - replace with actual API calls
  const mockStats = {
    totalEarnings: 12450,
    earningsChange: 15.3,
    activeListings: 8,
    listingsChange: -2.1,
    salesThisMonth: 24,
    salesChange: 8.7,
    unreadMessages: 5,
  };

  const mockListings = [
    {
      _id: "1",
      name: "Fresh Organic Maize",
      price: 45,
      priceUnit: "bag",
      quantity: 100,
      unit: "bags",
      location: { city: "Harare", province: "Harare" },
      farmerGrade: "Grade A",
      harvestDate: "2025-01-10",
      status: "active",
      paymentOptions: ["cash", "ecocash"],
      phoneNumber: "+263771234567",
    },
    {
      _id: "2",
      name: "Sweet Potatoes",
      price: 8,
      priceUnit: "kg",
      quantity: 500,
      unit: "kg",
      location: { city: "Bulawayo", province: "Bulawayo" },
      farmerGrade: "Grade B",
      harvestDate: "2025-01-05",
      status: "pending",
      paymentOptions: ["cash", "visa"],
      phoneNumber: "+263772345678",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setListings(mockListings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleNavigate = (path) => {
    console.log(`Navigate to: ${path}`);
  };

  const handleCreateListing = () => handleNavigate("/create-listing");
  const handleEditListing = (id) => handleNavigate(`/edit-listing/${id}`);
  const handleDeleteListing = async (id) => {
    console.log(`Delete listing: ${id}`);
    setListings(listings.filter((l) => l._id !== id));
  };
  const handleViewMessages = (id) => handleNavigate(`/messages/${id}`);

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
              {/* Quick Actions */}
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
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Quick Actions
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <ActionButton onClick={handleCreateListing} icon="➕">
                    Create New Listing
                  </ActionButton>
                  <ActionButton
                    onClick={() => handleNavigate("/messages")}
                    variant="secondary"
                    icon="💬"
                  >
                    View Messages
                  </ActionButton>
                  <ActionButton
                    onClick={() => handleNavigate("/analytics")}
                    variant="secondary"
                    icon="📊"
                  >
                    View Analytics
                  </ActionButton>
                </div>
              </motion.div>

              {/* Recent Activity */}
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
                  Recent Activity
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {[
                    {
                      text: "New message from buyer about Maize listing",
                      time: "2 hours ago",
                      icon: "💬",
                    },
                    {
                      text: "Listing 'Sweet Potatoes' approved",
                      time: "5 hours ago",
                      icon: "✅",
                    },
                    {
                      text: "Payment received for Tomatoes",
                      time: "1 day ago",
                      icon: "💰",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <span style={{ fontSize: "1.2rem" }}>
                        {activity.icon}
                      </span>
                      <div>
                        <div style={{ color: "#FFFFFF", fontSize: "0.9rem" }}>
                          {activity.text}
                        </div>
                        <div style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        );

      case "listings":
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
                My Listings ({listings.length})
              </h2>
              <ActionButton onClick={handleCreateListing} icon="➕">
                Create New Listing
              </ActionButton>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div style={{ color: "#B8D4B8", fontSize: "1.1rem" }}>
                  Loading listings...
                </div>
              </div>
            ) : listings.length === 0 ? (
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
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  No listings yet
                </h3>
                <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                  Create your first listing to start selling your produce
                </p>
                <ActionButton onClick={handleCreateListing} icon="➕">
                  Create Your First Listing
                </ActionButton>
              </motion.div>
            ) : (
              <div>
                {listings.map((listing) => (
                  <ListingCard
                    key={listing._id}
                    listing={listing}
                    onEdit={handleEditListing}
                    onDelete={handleDeleteListing}
                    onViewMessages={handleViewMessages}
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
                Chat with buyers about your listings and negotiate deals
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

      case "analytics":
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
              Analytics & Reports
            </h2>
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
                transition={{ duration: 0.6 }}
              >
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Sales Performance
                </h3>
                <div
                  style={{
                    color: "#B8D4B8",
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                  }}
                >
                  Track your sales trends and identify your best-performing
                  products
                </div>
                <ActionButton variant="secondary" size="small">
                  View Detailed Report
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
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  Market Insights
                </h3>
                <div
                  style={{
                    color: "#B8D4B8",
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                  }}
                >
                  Understanding market trends and pricing for your crops
                </div>
                <ActionButton variant="secondary" size="small">
                  View Market Data
                </ActionButton>
              </motion.div>
            </div>
          </div>
        );

      case "crops":
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
              Crop References
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
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌾</div>
              <h3
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                }}
              >
                Crop Reference System
              </h3>
              <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                Request new crop types to be added to the platform
              </p>
              <ActionButton
                onClick={() => handleNavigate("/crop-request")}
                icon="📋"
              >
                Request New Crop Type
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

      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "150px",
          height: "150px",
          background:
            "radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)",
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
        {/* Header */}
        <motion.div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚜</div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              background: "linear-gradient(135deg, #FFFFFF 0%, #22C55E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            Farmer Dashboard
          </h1>
          <p style={{ color: "#B8D4B8", fontSize: "1.2rem" }}>
            Welcome back, {user.name}! Manage your farm business and grow your
            success.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {renderTabContent()}
        </motion.div>

        {/* Footer Actions */}
        <motion.div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            background: "rgba(34, 197, 94, 0.1)",
            borderRadius: "1.5rem",
            border: "1px solid rgba(34, 197, 94, 0.2)",
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
            Need Help?
          </h3>
          <p
            style={{
              color: "#B8D4B8",
              marginBottom: "1.5rem",
              fontSize: "1rem",
            }}
          >
            Our support team is here to help you maximize your farming success
            on ZimFIP
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
              onClick={() => handleNavigate("/tutorial")}
              variant="secondary"
              icon="🎓"
            >
              Platform Tutorial
            </ActionButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FarmerDashboard;
