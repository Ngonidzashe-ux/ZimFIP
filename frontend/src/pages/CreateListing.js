import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function CreateListing() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState("kgs");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kgs");
  const [location, setLocation] = useState({ province: "", city: "" });
  const [photos, setPhotos] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [farmerGrade, setFarmerGrade] = useState("Grade A");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchListing = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/listings/${id}`
          );
          const {
            price,
            priceUnit,
            quantity,
            unit,
            location,
            photos,
            paymentOptions,
            phoneNumber,
            harvestDate,
            farmerGrade,
          } = res.data;
          setName(res.data.name);
          setPrice(price);
          setPriceUnit(priceUnit);
          setQuantity(quantity);
          setUnit(unit);
          setLocation(location);
          setPhotos(photos);
          setPaymentOptions(paymentOptions);
          setPhoneNumber(phoneNumber);
          setHarvestDate(
            harvestDate ? new Date(harvestDate).toISOString().split("T")[0] : ""
          );
          setFarmerGrade(farmerGrade);
        } catch (err) {
          console.error("Fetch error:", err);
        }
      };
      fetchListing();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      price,
      priceUnit,
      quantity,
      unit,
      location,
      photos,
      paymentOptions,
      phoneNumber,
      harvestDate,
      farmerGrade,
    };
    try {
      const url = id
        ? `${process.env.REACT_APP_API_URL}/api/listings/${id}`
        : `${process.env.REACT_APP_API_URL}/api/listings`;
      const method = id ? "put" : "post";
      await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to save listing");
    }
  };

  if (user?.role !== "farmer") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <p className="text-zimfip-gray text-center">
          Only farmers can create/edit listings.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-zimfip-light p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-zimfip-green mb-6 text-center">
          {id ? "Edit Listing" : "Create Listing"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
              placeholder="Enter price"
              required
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Price Unit
            </label>
            <select
              value={priceUnit}
              onChange={(e) => setPriceUnit(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
            >
              <option value="kgs">kgs</option>
              <option value="tonnes">tonnes</option>
              <option value="bags">bags</option>
            </select>
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
              placeholder="Enter quantity"
              required
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
            >
              <option value="kgs">kgs</option>
              <option value="tonnes">tonnes</option>
              <option value="bags">bags</option>
            </select>
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Province
            </label>
            <input
              type="text"
              value={location.province}
              onChange={(e) =>
                setLocation({ ...location, province: e.target.value })
              }
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
              placeholder="Enter province"
              required
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              City
            </label>
            <input
              type="text"
              value={location.city}
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
              placeholder="Enter city"
              required
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Photos (URLs)
            </label>
            <input
              type="text"
              value={photos.join(",")}
              onChange={(e) => setPhotos(e.target.value.split(","))}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
              placeholder="Enter photo URLs separated by commas"
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Payment Options
            </label>
            <div className="space-x-2">
              {["ecocash", "visa", "cash"].map((opt) => (
                <label key={opt} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={paymentOptions.includes(opt)}
                    onChange={(e) =>
                      setPaymentOptions(
                        e.target.checked
                          ? [...paymentOptions, opt]
                          : paymentOptions.filter((o) => o !== opt)
                      )
                    }
                  />
                  <span className="ml-1">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Phone Number (for EcoCash)
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
              placeholder="e.g., +263771234567"
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Harvest Date
            </label>
            <input
              type="date"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Farmer Grade
            </label>
            <select
              value={farmerGrade}
              onChange={(e) => setFarmerGrade(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal"
            >
              <option value="Grade A">Grade A</option>
              <option value="Grade B">Grade B</option>
              <option value="Grade C">Grade C</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-zimfip-teal text-white p-3 rounded-lg hover:bg-teal-300"
          >
            {id ? "Update Listing" : "Create Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
