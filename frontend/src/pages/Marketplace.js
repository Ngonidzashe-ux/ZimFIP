import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Marketplace() {
  const { user } = useContext(UserContext);
  const [listings, setListings] = useState([
    {
      _id: "1",
      name: "Fresh Maize",
      price: 10,
      priceUnit: "kgs",
      quantity: 50,
      unit: "kgs",
      location: { province: "Harare", city: "Harare" },
      harvestDate: "2025-07-01",
      farmerGrade: "Grade A",
      photos: [
        "https://cdn.pixabay.com/photo/2023/01/25/12/48/corn-7743509_1280.jpg",
      ],
      farmerName: "John Doe",
      seller: "farmer1",
    },
    {
      _id: "2",
      name: "Organic Tomatoes",
      price: 5,
      priceUnit: "kgs",
      quantity: 30,
      unit: "kgs",
      location: { province: "Masvingo", city: "Masvingo" },
      harvestDate: "2025-06-20",
      farmerGrade: "Grade B",
      photos: [
        "https://cdn.pixabay.com/photo/2011/03/16/16/01/tomatoes-5356_1280.jpg",
      ],
      farmerName: "Jane Smith",
      seller: "farmer2",
    },
    {
      _id: "3",
      name: "Sweet Potatoes",
      price: 8,
      priceUnit: "bags",
      quantity: 20,
      unit: "bags",
      location: { province: "Bulawayo", city: "Bulawayo" },
      harvestDate: "2025-07-05",
      farmerGrade: "Grade A",
      photos: [
        "https://cdn.pixabay.com/photo/2022/01/15/08/18/sweet-potatoes-6938881_1280.jpg",
      ],
      farmerName: "Peter Mwangi",
      seller: "farmer3",
    },
    {
      _id: "4",
      name: "Green Beans",
      price: 6,
      priceUnit: "kgs",
      quantity: 40,
      unit: "kgs",
      location: { province: "Harare", city: "Chitungwiza" },
      harvestDate: "2025-06-25",
      farmerGrade: "Grade C",
      photos: [
        "https://cdn.pixabay.com/photo/2021/09/07/10/11/coffee-beans-6603499_1280.jpg",
      ],
      farmerName: "John Doe",
      seller: "farmer1",
    },
  ]);
  const [filterInput, setFilterInput] = useState("");
  const navigate = useNavigate();

  const handleContactSeller = (listing) => {
    navigate("/chat", {
      state: {
        listingId: listing._id,
        sellerId: listing.seller,
        listingName: listing.name,
      },
    });
  };

  const handleBuyNow = (listing) => {
    navigate("/purchase", {
      state: {
        listingId: listing._id,
        name: listing.name,
        price: listing.price,
        priceUnit: listing.priceUnit,
        quantity: listing.quantity,
        sellerId: listing.seller,
        farmerName: listing.farmerName,
      },
    });
  };

  const filteredListings = listings.filter((listing) => {
    const filters = filterInput.split(",").map((f) => f.trim().toLowerCase());
    const matchesFarmer =
      !filters.some((f) => f) ||
      filters.some((f) => listing.farmerName.toLowerCase().includes(f));
    const matchesLocation =
      !filters.some((f) => f) ||
      filters.some(
        (f) =>
          listing.location.city.toLowerCase().includes(f) ||
          listing.location.province.toLowerCase().includes(f)
      );
    const matchesGrade =
      !filters.some((f) => f) ||
      filters.some((f) => listing.farmerGrade.toLowerCase().includes(f));
    return matchesFarmer && matchesLocation && matchesGrade;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ Hero Section with Background Video */}
      <div className="relative mb-8 h-[80vh] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://cdn.pixabay.com/video/2021/08/07/84226-586657520_large.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Buy Directly from Local Farmers
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
              Discover fresh, local produce grown with care across Zimbabwe.
            </p>
            <button
              onClick={() => navigate("/marketplace")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md"
            >
              Start Browsing
            </button>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="text-center mb-8 max-w-6xl mx-auto px-4">
        <input
          type="text"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="Filter by Farmer Name, Location, or Grade (e.g., John, Harare, Grade A)"
          className="w-full md:w-3/4 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
        />
      </div>

      {/* Listings */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredListings.length === 0 ? (
          <p className="text-zimfip-gray text-center">No listings available.</p>
        ) : (
          filteredListings.map((listing) => (
            <div
              key={listing._id}
              className="bg-zimfip-light p-4 rounded-lg shadow-lg max-w-sm mx-auto flex flex-col items-center"
            >
              <img
                src={listing.photos[0]}
                alt={listing.name}
                className="w-48 h-48 object-cover mb-3 rounded-lg"
              />
              <h3 className="text-xl font-bold text-zimfip-green mb-2 text-center">
                {listing.name}
              </h3>
              <p className="text-zimfip-gray mb-2 text-center">
                Price: ${listing.price}/{listing.priceUnit}
              </p>
              <p className="text-zimfip-gray mb-2 text-center">
                Quantity: {listing.quantity} {listing.unit}
              </p>
              <p className="text-zimfip-gray mb-2 text-center">
                Location: {listing.location.city}, {listing.location.province}
              </p>
              <p className="text-zimfip-gray mb-2 text-center">
                Harvest Date:{" "}
                {new Date(listing.harvestDate).toLocaleDateString()}
              </p>
              <p className="text-zimfip-gray mb-2 text-center">
                Grade: {listing.farmerGrade}
              </p>
              <div className="flex items-center mb-2">
                <img
                  src="https://cdn.pixabay.com/photo/2018/11/30/06/27/farmer-3847057_1280.jpg"
                  alt={listing.farmerName}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span className="text-zimfip-gray">{listing.farmerName}</span>
              </div>
              <div className="space-y-2 w-full">
                <button
                  onClick={() => handleContactSeller(listing)}
                  className="w-full bg-zimfip-green text-white p-2 rounded-lg hover:bg-green-300 transition"
                >
                  Contact Seller
                </button>
                <button
                  onClick={() => handleBuyNow(listing)}
                  className="w-full bg-zimfip-green text-white p-2 rounded-lg hover:bg-green-600 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Marketplace;
