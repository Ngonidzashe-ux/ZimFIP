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
      background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
      color: "#FFFFFF",
      boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
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

// Data Table Component
function DataTable({
  title,
  headers,
  data,
  actions,
  onEdit,
  onDelete,
  onApprove,
  onReject,
}) {
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (item) => {
    setEditingItem(item.id || item._id);
    setEditForm(item);
  };

  const handleSave = () => {
    onEdit && onEdit(editingItem, editForm);
    setEditingItem(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditForm({});
  };

  const handleChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

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
      <h3
        style={{
          color: "#FFFFFF",
          fontSize: "1.3rem",
          fontWeight: "600",
          marginBottom: "1.5rem",
        }}
      >
        {title} ({data.length})
      </h3>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
              {headers.map((header, index) => (
                <th
                  key={index}
                  style={{
                    color: "#B8D4B8",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    padding: "1rem 0.5rem",
                    textAlign: "left",
                  }}
                >
                  {header}
                </th>
              ))}
              <th
                style={{
                  color: "#B8D4B8",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  padding: "1rem 0.5rem",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <motion.tr
                key={item.id || item._id || index}
                style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {Object.keys(item)
                  .filter((key) => key !== "id" && key !== "_id")
                  .map((key, cellIndex) => (
                    <td
                      key={cellIndex}
                      style={{
                        color: "#FFFFFF",
                        fontSize: "0.9rem",
                        padding: "1rem 0.5rem",
                      }}
                    >
                      {editingItem === (item.id || item._id) &&
                      typeof item[key] === "string" ? (
                        key === "role" ||
                        key === "farmerGrade" ||
                        key === "status" ? (
                          <select
                            value={editForm[key] || ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                            style={{
                              background: "rgba(255, 255, 255, 0.1)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              color: "#FFFFFF",
                              fontSize: "0.9rem",
                            }}
                          >
                            {key === "role" && (
                              <>
                                <option value="buyer">Buyer</option>
                                <option value="farmer">Farmer</option>
                                <option value="admin">Admin</option>
                              </>
                            )}
                            {key === "farmerGrade" && (
                              <>
                                <option value="Grade A">Grade A</option>
                                <option value="Grade B">Grade B</option>
                                <option value="Grade C">Grade C</option>
                              </>
                            )}
                            {key === "status" && (
                              <>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                              </>
                            )}
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={editForm[key] || ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                            style={{
                              background: "rgba(255, 255, 255, 0.1)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              color: "#FFFFFF",
                              fontSize: "0.9rem",
                              width: "100%",
                            }}
                          />
                        )
                      ) : (
                        <span
                          style={{
                            ...(key === "status" && {
                              background:
                                item[key] === "approved"
                                  ? "#22C55E"
                                  : item[key] === "rejected"
                                  ? "#EF4444"
                                  : "#F59E0B",
                              color: "#FFFFFF",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "1rem",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                            }),
                          }}
                        >
                          {typeof item[key] === "object"
                            ? JSON.stringify(item[key])
                            : String(item[key])}
                        </span>
                      )}
                    </td>
                  ))}
                <td style={{ padding: "1rem 0.5rem" }}>
                  <div
                    style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                  >
                    {editingItem === (item.id || item._id) ? (
                      <>
                        <ActionButton
                          size="small"
                          variant="success"
                          onClick={handleSave}
                        >
                          Save
                        </ActionButton>
                        <ActionButton
                          size="small"
                          variant="secondary"
                          onClick={handleCancel}
                        >
                          Cancel
                        </ActionButton>
                      </>
                    ) : (
                      <>
                        <ActionButton
                          size="small"
                          variant="primary"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </ActionButton>
                        {onApprove && item.status === "pending" && (
                          <ActionButton
                            size="small"
                            variant="success"
                            onClick={() => onApprove(item.id || item._id)}
                          >
                            Approve
                          </ActionButton>
                        )}
                        {onReject && item.status === "pending" && (
                          <ActionButton
                            size="small"
                            variant="warning"
                            onClick={() => onReject(item.id || item._id)}
                          >
                            Reject
                          </ActionButton>
                        )}
                        <ActionButton
                          size="small"
                          variant="danger"
                          onClick={() => onDelete(item.id || item._id)}
                        >
                          Delete
                        </ActionButton>
                      </>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// Navigation Tab Component
function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "listings", label: "Listings", icon: "📦" },
    { id: "disputes", label: "Disputes", icon: "⚖️" },
    { id: "crops", label: "Crop References", icon: "🌾" },
    { id: "analytics", label: "Analytics", icon: "📈" },
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
                ? "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
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
                ? "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
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
        title="Total Users"
        value={stats.totalUsers}
        change={stats.usersChange}
        icon="👥"
        color="#8B5CF6"
      />
      <AnalyticsCard
        title="Active Listings"
        value={stats.activeListings}
        change={stats.listingsChange}
        icon="📦"
        color="#22C55E"
      />
      <AnalyticsCard
        title="Pending Disputes"
        value={stats.pendingDisputes}
        icon="⚖️"
        color="#EF4444"
      />
      <AnalyticsCard
        title="Total Revenue"
        value={stats.totalRevenue}
        change={stats.revenueChange}
        icon="💰"
        color="#F59E0B"
        prefix="$"
      />
    </div>
  );
}

// Review Card Component
function ReviewCard({ review, onEdit, onApprove, onReject, onDelete }) {
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
            <span
              style={{
                color: "#FFFFFF",
                background:
                  review.status === "approved"
                    ? "#22C55E"
                    : review.status === "rejected"
                    ? "#EF4444"
                    : "#F59E0B",
                padding: "0.25rem 0.75rem",
                borderRadius: "1rem",
                fontSize: "0.8rem",
                fontWeight: "600",
              }}
            >
              {review.status}
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
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <ActionButton
            size="small"
            variant="primary"
            icon="✏️"
            onClick={() => onEdit(review)}
          >
            Edit
          </ActionButton>
          {review.status === "pending" && (
            <>
              <ActionButton
                size="small"
                variant="success"
                icon="✅"
                onClick={() => onApprove(review.id)}
              >
                Approve
              </ActionButton>
              <ActionButton
                size="small"
                variant="warning"
                icon="🚫"
                onClick={() => onReject(review.id)}
              >
                Reject
              </ActionButton>
            </>
          )}
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
        }}
      >
        <div>
          <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>Farmer</span>
          <div style={{ color: "#FFFFFF", fontWeight: "600" }}>
            {review.farmerName}
          </div>
        </div>
        <div>
          <span style={{ color: "#B8D4B8", fontSize: "0.8rem" }}>Buyer</span>
          <div style={{ color: "#FFFFFF", fontWeight: "600" }}>
            {review.buyerName}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Admin Dashboard Component
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [cropReferences, setCropReferences] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Mock data - replace with actual API calls
  const mockStats = {
    totalUsers: 1245,
    usersChange: 12.5,
    activeListings: 342,
    listingsChange: 8.3,
    pendingDisputes: 7,
    totalRevenue: 45670,
    revenueChange: 15.2,
  };

  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "farmer",
      status: "active",
      joinDate: "2024-12-01",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "buyer",
      status: "active",
      joinDate: "2024-12-05",
    },
    {
      id: "3",
      name: "Peter Mwangi",
      email: "peter@example.com",
      role: "farmer",
      status: "pending",
      joinDate: "2025-01-10",
    },
  ];

  const mockListings = [
    {
      _id: "1",
      name: "Fresh Maize",
      farmerName: "John Doe",
      farmerGrade: "Grade A",
      price: 45,
      status: "approved",
      createdAt: "2025-01-12T10:00:00Z",
    },
    {
      _id: "2",
      name: "Tomatoes",
      farmerName: "Peter Mwangi",
      farmerGrade: "Grade B",
      price: 25,
      status: "pending",
      createdAt: "2025-01-11T15:30:00Z",
    },
    {
      _id: "3",
      name: "Sweet Potatoes",
      farmerName: "John Doe",
      farmerGrade: "Grade A",
      price: 35,
      status: "approved",
      createdAt: "2025-01-10T09:15:00Z",
    },
  ];

  const mockDisputes = [
    {
      id: "1",
      complainant: "Sarah Johnson",
      accused: "John Doe",
      issue: "Product quality",
      status: "pending",
      date: "2025-01-12",
    },
    {
      id: "2",
      complainant: "Mike Wilson",
      accused: "Peter Mwangi",
      issue: "Late delivery",
      status: "resolved",
      date: "2025-01-10",
    },
  ];

  const mockCropReferences = [
    {
      id: "1",
      cropName: "Purple Maize",
      requester: "John Doe",
      description: "Traditional purple variety",
      status: "pending",
      createdAt: "2025-01-12T08:00:00Z",
    },
    {
      id: "2",
      cropName: "Baby Corn",
      requester: "Sarah Johnson",
      description: "Small sweet corn variety",
      status: "approved",
      createdAt: "2025-01-11T12:00:00Z",
    },
  ];

  const mockReviews = [
    {
      id: "1",
      productName: "Fresh Maize",
      rating: 4,
      text: "Great quality maize, delivered fresh!",
      farmerName: "John Doe",
      buyerName: "Sarah Johnson",
      date: "2025-01-12",
      status: "pending",
    },
    {
      id: "2",
      productName: "Tomatoes",
      rating: 3,
      text: "Good but could be fresher.",
      farmerName: "Peter Mwangi",
      buyerName: "Mike Wilson",
      date: "2025-01-10",
      status: "approved",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setListings(mockListings);
      setDisputes(mockDisputes);
      setCropReferences(mockCropReferences);
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  const handleNavigate = (path) => {
    console.log(`Navigate to: ${path}`);
  };

  const handleEditUser = (id, updatedUser) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
    console.log("User updated:", id, updatedUser);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    console.log("User deleted:", id);
  };

  const handleEditListing = (id, updatedListing) => {
    setListings(
      listings.map((listing) =>
        listing._id === id ? { ...listing, ...updatedListing } : listing
      )
    );
    console.log("Listing updated:", id, updatedListing);
  };

  const handleDeleteListing = (id) => {
    setListings(listings.filter((listing) => listing._id !== id));
    console.log("Listing deleted:", id);
  };

  const handleApproveListing = (id) => {
    setListings(
      listings.map((listing) =>
        listing._id === id ? { ...listing, status: "approved" } : listing
      )
    );
    console.log("Listing approved:", id);
  };

  const handleRejectListing = (id) => {
    setListings(
      listings.map((listing) =>
        listing._id === id ? { ...listing, status: "rejected" } : listing
      )
    );
    console.log("Listing rejected:", id);
  };

  const handleResolveDispute = (id) => {
    setDisputes(
      disputes.map((dispute) =>
        dispute.id === id ? { ...dispute, status: "resolved" } : dispute
      )
    );
    console.log("Dispute resolved:", id);
  };

  const handleDeleteDispute = (id) => {
    setDisputes(disputes.filter((dispute) => dispute.id !== id));
    console.log("Dispute deleted:", id);
  };

  const handleEditCrop = (id, updatedCrop) => {
    setCropReferences(
      cropReferences.map((crop) =>
        crop.id === id ? { ...crop, ...updatedCrop } : crop
      )
    );
    console.log("Crop reference updated:", id, updatedCrop);
  };

  const handleApproveCrop = (id) => {
    setCropReferences(
      cropReferences.map((crop) =>
        crop.id === id ? { ...crop, status: "approved" } : crop
      )
    );
    console.log("Crop reference approved:", id);
  };

  const handleRejectCrop = (id) => {
    setCropReferences(
      cropReferences.map((crop) =>
        crop.id === id ? { ...crop, status: "rejected" } : crop
      )
    );
    console.log("Crop reference rejected:", id);
  };

  const handleDeleteCrop = (id) => {
    setCropReferences(cropReferences.filter((crop) => crop.id !== id));
    console.log("Crop reference deleted:", id);
  };

  const handleEditReview = (id, updatedReview) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, ...updatedReview } : review
      )
    );
    console.log("Review updated:", id, updatedReview);
  };

  const handleApproveReview = (id) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, status: "approved" } : review
      )
    );
    console.log("Review approved:", id);
  };

  const handleRejectReview = (id) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, status: "rejected" } : review
      )
    );
    console.log("Review rejected:", id);
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
    console.log("Review deleted:", id);
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
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚙️</div>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  System Management
                </h3>
                <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                  Manage users, listings, disputes, and crop references
                </p>
                <ActionButton
                  onClick={() => handleNavigate("/admin")}
                  icon="⚙️"
                >
                  View Admin Actions
                </ActionButton>
              </motion.div>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    marginBottom: "1.5rem",
                  }}
                >
                  Recent Activity
                </h3>
                {loading ? (
                  <div style={{ textAlign: "center", padding: "2rem" }}>
                    <span style={{ color: "#B8D4B8", fontSize: "1rem" }}>
                      Loading activities...
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {[
                      {
                        type: "listing",
                        icon: "🌽",
                        title: listings[0]?.name || "New Listing",
                        description: `${
                          listings[0]?.farmerName || "Farmer"
                        } added ${listings[0]?.name || "a product"} (${
                          listings[0]?.status || "pending"
                        })`,
                        time: listings[0]?.createdAt
                          ? new Date(listings[0].createdAt).toLocaleString()
                          : "Just now",
                        action: () =>
                          handleNavigate(`/listing/${listings[0]?._id || "1"}`),
                        actionText: "View Listing",
                      },
                      {
                        type: "user",
                        icon: "👤",
                        title: users[0]?.name || "New User",
                        description: `${
                          users[0]?.name || "User"
                        } registered as ${users[0]?.role || "farmer"}`,
                        time: users[0]?.joinDate
                          ? new Date(users[0].joinDate).toLocaleString()
                          : "Just now",
                        action: () =>
                          handleNavigate(`/user/${users[0]?.id || "1"}`),
                        actionText: "View User",
                      },
                      {
                        type: "review",
                        icon: "⭐",
                        title: reviews[0]?.productName || "New Review",
                        description: `${
                          reviews[0]?.buyerName || "Buyer"
                        } reviewed ${reviews[0]?.productName || "a product"} (${
                          reviews[0]?.status || "pending"
                        })`,
                        time: reviews[0]?.date
                          ? new Date(reviews[0].date).toLocaleString()
                          : "Just now",
                        action:
                          reviews[0]?.status === "pending"
                            ? () => handleApproveReview(reviews[0]?.id || "1")
                            : null,
                        actionText:
                          reviews[0]?.status === "pending"
                            ? "Approve Review"
                            : null,
                      },
                      {
                        type: "crop",
                        icon: "🌾",
                        title:
                          cropReferences[0]?.cropName || "New Crop Reference",
                        description: `${
                          cropReferences[0]?.requester || "User"
                        } requested ${cropReferences[0]?.cropName || "a crop"}`,
                        time: cropReferences[0]?.createdAt
                          ? new Date(
                              cropReferences[0].createdAt
                            ).toLocaleString()
                          : "Just now",
                        action:
                          cropReferences[0]?.status === "pending"
                            ? () =>
                                handleApproveCrop(cropReferences[0]?.id || "1")
                            : null,
                        actionText:
                          cropReferences[0]?.status === "pending"
                            ? "Approve Crop"
                            : null,
                      },
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          borderRadius: "0.75rem",
                          padding: "1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                        }}
                        whileHover={{
                          scale: 1.02,
                          background: "rgba(255, 255, 255, 0.08)",
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span style={{ fontSize: "1.5rem" }}>
                          {activity.icon}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              color: "#FFFFFF",
                              fontSize: "0.9rem",
                              fontWeight: "600",
                            }}
                          >
                            {activity.title}
                          </div>
                          <div
                            style={{
                              color: "#B8D4B8",
                              fontSize: "0.8rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {activity.description}
                          </div>
                          <div
                            style={{ color: "#B8D4B8", fontSize: "0.75rem" }}
                          >
                            {activity.time}
                          </div>
                        </div>
                        {activity.action && (
                          <ActionButton
                            size="small"
                            variant={
                              activity.type === "review" ||
                              activity.type === "crop"
                                ? "success"
                                : "primary"
                            }
                            onClick={activity.action}
                          >
                            {activity.actionText}
                          </ActionButton>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
                <motion.div
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    left: "0.5rem",
                    fontSize: "1.5rem",
                    opacity: 0.2,
                  }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  🌿
                </motion.div>
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: "0.5rem",
                    right: "0.5rem",
                    fontSize: "1.5rem",
                    opacity: 0.2,
                  }}
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  🌽
                </motion.div>
              </motion.div>
            </div>
          </div>
        );

      case "users":
        return (
          <DataTable
            title="Manage Users"
            headers={["Name", "Email", "Role", "Status", "Join Date"]}
            data={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        );

      case "listings":
        return (
          <DataTable
            title="Manage Listings"
            headers={["Name", "Farmer", "Grade", "Price", "Status"]}
            data={listings}
            onEdit={handleEditListing}
            onDelete={handleDeleteListing}
            onApprove={handleApproveListing}
            onReject={handleRejectListing}
          />
        );

      case "disputes":
        return (
          <DataTable
            title="Manage Disputes"
            headers={["Complainant", "Accused", "Issue", "Status", "Date"]}
            data={disputes}
            onEdit={handleResolveDispute}
            onDelete={handleDeleteDispute}
          />
        );

      case "crops":
        return (
          <DataTable
            title="Crop References"
            headers={["Crop Name", "Requester", "Description", "Status"]}
            data={cropReferences}
            onEdit={handleEditCrop}
            onDelete={handleDeleteCrop}
            onApprove={handleApproveCrop}
            onReject={handleRejectCrop}
          />
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
              Platform Analytics
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
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📈</div>
              <h3
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                }}
              >
                Analytics Dashboard
              </h3>
              <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                View detailed platform metrics and generate reports
              </p>
              <ActionButton
                onClick={() => handleNavigate("/analytics")}
                icon="📈"
              >
                View Analytics
              </ActionButton>
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
                Manage Reviews ({reviews.length})
              </h2>
              <ActionButton
                onClick={() => handleNavigate("/reviews")}
                icon="⭐"
              >
                Review Management
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
                  No reviews available
                </h3>
                <p style={{ color: "#B8D4B8", marginBottom: "1.5rem" }}>
                  No user reviews have been submitted yet
                </p>
                <ActionButton
                  onClick={() => handleNavigate("/reviews")}
                  icon="⭐"
                >
                  Review Management
                </ActionButton>
              </motion.div>
            ) : (
              <div>
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onEdit={handleEditReview}
                    onApprove={handleApproveReview}
                    onReject={handleRejectReview}
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
            "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
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
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚙️</div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              background: "linear-gradient(135deg, #FFFFFF 0%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            Admin Dashboard
          </h1>
          <p style={{ color: "#B8D4B8", fontSize: "1.2rem" }}>
            Manage platform users, listings, disputes, and analytics
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
            background: "rgba(139, 92, 246, 0.1)",
            borderRadius: "1.5rem",
            border: "1px solid rgba(139, 92, 246, 0.2)",
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
            Admin Support
          </h3>
          <p
            style={{
              color: "#B8D4B8",
              marginBottom: "1.5rem",
              fontSize: "1rem",
            }}
          >
            Access tools and resources to manage the platform effectively
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
              onClick={() => handleNavigate("/admin/help")}
              variant="secondary"
              icon="❓"
            >
              Admin Help
            </ActionButton>
            <ActionButton
              onClick={() => handleNavigate("/admin/settings")}
              variant="secondary"
              icon="⚙️"
            >
              Settings
            </ActionButton>
            <ActionButton
              onClick={() => handleNavigate("/admin/reports")}
              variant="primary"
              icon="📊"
            >
              Generate Reports
            </ActionButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;
