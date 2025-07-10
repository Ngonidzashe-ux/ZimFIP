import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function Admin() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editingListing, setEditingListing] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    role: "",
    listingName: "",
    farmerName: "",
    farmerGrade: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, listingsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/users`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/listings`),
        ]);
        setUsers(usersRes.data);
        setListings(listingsRes.data);
      } catch (err) {
        console.error("Admin data error:", err);
        setUsers([
          { id: "user1", name: "John Doe", role: "buyer" },
          { id: "user2", name: "Jane Smith", role: "farmer" },
          { id: "user3", name: "Peter Mwangi", role: "admin" },
        ]);
        setListings([
          {
            _id: "1",
            name: "Fresh Maize",
            price: 10,
            priceUnit: "kgs",
            quantity: 50,
            location: { province: "Harare", city: "Harare" },
            harvestDate: "2025-07-01",
            farmerGrade: "Grade A",
            farmerName: "John Doe",
            seller: "farmer1",
          },
          {
            _id: "2",
            name: "Organic Tomatoes",
            price: 5,
            priceUnit: "kgs",
            quantity: 30,
            location: { province: "Masvingo", city: "Masvingo" },
            harvestDate: "2025-06-20",
            farmerGrade: "Grade B",
            farmerName: "Jane Smith",
            seller: "farmer2",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (user?.role !== "admin") {
    navigate("/marketplace");
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-zimfip-gray">Loading...</p>
      </div>
    );
  }

  const handleDeleteUser = (userId) => {
    alert(`Deleted user ${userId}`);
    setUsers(users.filter((u) => u.id !== userId));
  };

  const handleDeleteListing = (listingId) => {
    alert(`Deleted listing ${listingId}`);
    setListings(listings.filter((l) => l._id !== listingId));
  };

  const handleEditUser = (user) => {
    setEditingUser(user.id);
    setEditForm({ name: user.name, role: user.role });
  };

  const handleEditListing = (listing) => {
    setEditingListing(listing._id);
    setEditForm({
      listingName: listing.name,
      farmerName: listing.farmerName,
      farmerGrade: listing.farmerGrade,
    });
  };

  const handleSaveUser = () => {
    setUsers(
      users.map((u) => (u.id === editingUser ? { ...u, ...editForm } : u))
    );
    setEditingUser(null);
    alert("User updated!");
  };

  const handleSaveListing = () => {
    setListings(
      listings.map((l) =>
        l._id === editingListing
          ? {
              ...l,
              name: editForm.listingName,
              farmerName: editForm.farmerName,
              farmerGrade: editForm.farmerGrade,
            }
          : l
      )
    );
    setEditingListing(null);
    alert("Listing updated!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-3xl font-bold text-zimfip-green mb-6 text-center">
        Admin Panel
      </h1>

      {/* Users Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-zimfip-green mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-zimfip-light rounded-lg shadow-lg">
            <thead>
              <tr className="bg-zimfip-teal text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-2">{u.id}</td>
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.role}</td>
                  <td className="p-2">
                    {editingUser === u.id ? (
                      <div className="space-y-2">
                        <input
                          name="name"
                          value={editForm.name}
                          onChange={handleChange}
                          className="p-1 border rounded"
                        />
                        <select
                          name="role"
                          value={editForm.role}
                          onChange={handleChange}
                          className="p-1 border rounded"
                        >
                          <option value="buyer">Buyer</option>
                          <option value="farmer">Farmer</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          onClick={handleSaveUser}
                          className="bg-zimfip-green text-white p-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingUser(null)}
                          className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditUser(u)}
                        className="bg-zimfip-teal text-white p-1 rounded hover:bg-teal-300"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Listings Table */}
      <div>
        <h2 className="text-2xl font-semibold text-zimfip-green mb-4">
          Listings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-zimfip-light rounded-lg shadow-lg">
            <thead>
              <tr className="bg-zimfip-teal text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Farmer</th>
                <th className="p-2">Grade</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l._id} className="border-t">
                  <td className="p-2">{l._id}</td>
                  <td className="p-2">{l.name}</td>
                  <td className="p-2">{l.farmerName}</td>
                  <td className="p-2">{l.farmerGrade}</td>
                  <td className="p-2">
                    {editingListing === l._id ? (
                      <div className="space-y-2">
                        <input
                          name="listingName"
                          value={editForm.listingName}
                          onChange={handleChange}
                          className="p-1 border rounded"
                        />
                        <input
                          name="farmerName"
                          value={editForm.farmerName}
                          onChange={handleChange}
                          className="p-1 border rounded"
                        />
                        <select
                          name="farmerGrade"
                          value={editForm.farmerGrade}
                          onChange={handleChange}
                          className="p-1 border rounded"
                        >
                          <option value="Grade A">Grade A</option>
                          <option value="Grade B">Grade B</option>
                          <option value="Grade C">Grade C</option>
                        </select>
                        <button
                          onClick={handleSaveListing}
                          className="bg-zimfip-green text-white p-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingListing(null)}
                          className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditListing(l)}
                        className="bg-zimfip-teal text-white p-1 rounded hover:bg-teal-300"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteListing(l._id)}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
