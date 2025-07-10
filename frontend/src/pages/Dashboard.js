import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/listings`
        );
        setListings(res.data.filter((l) => l.userId === user._id));
      } catch (err) {
        console.error("Listings error:", err);
      }
    };
    fetchListings();
  }, [user._id]);

  const handleCreateListing = () => navigate("/create-listing");
  const handleEditListing = (id) => navigate(`/edit-listing/${id}`);
  const handleDeleteListing = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/listings/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setListings(listings.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  const handleChat = () => navigate("/chat");

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zimfip-green mb-6 text-center">
          Farmer Dashboard
        </h1>
        <div className="bg-zimfip-light p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-zimfip-green mb-4">Actions</h2>
          <button
            onClick={handleCreateListing}
            className="bg-zimfip-teal text-white px-4 py-2 rounded-lg mr-2 hover:bg-teal-300"
          >
            Create Listing
          </button>
          <button
            onClick={handleChat}
            className="bg-zimfip-teal text-white px-4 py-2 rounded-lg hover:bg-teal-300"
          >
            View Chats
          </button>
        </div>
        <div className="bg-zimfip-light p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-zimfip-green mb-4">
            Your Listings
          </h2>
          {listings.length === 0 ? (
            <p className="text-zimfip-gray">No listings yet. Create one!</p>
          ) : (
            <ul className="space-y-4">
              {listings.map((listing) => (
                <li
                  key={listing._id}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <h3 className="text-xl text-zimfip-green">{listing.name}</h3>
                  <p className="text-zimfip-gray">
                    Price: ${listing.price}/{listing.priceUnit}
                  </p>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => handleEditListing(listing._id)}
                      className="bg-zimfip-teal text-white px-2 py-1 rounded hover:bg-teal-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteListing(listing._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
