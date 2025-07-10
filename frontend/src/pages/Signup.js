import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("farmer");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [buyerType, setBuyerType] = useState("individual");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      email,
      password,
      role,
      name,
      location: { province, city },
      ...(role === "buyer" && { buyerType }), // Only include buyerType for buyers
    };

    console.log("Signup payload:", payload); // Debug: Log payload

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        payload
      );
      console.log("Signup response:", res.data); // Debug: Log response
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Signup failed. Check console for details.";
      console.error("Signup error:", err.response || err); // Debug: Log full error
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-zimfip-light p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-zimfip-green mb-6 text-center">
          Signup
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal focus:outline-none transition-all duration-200"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal focus:outline-none transition-all duration-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal focus:outline-none transition-all duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal focus:outline-none transition-all duration-200"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal focus:outline-none transition-all duration-200"
              required
            >
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              Province
            </label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal focus:outline-none transition-all duration-200"
              placeholder="Enter your province"
              required
            />
          </div>
          <div>
            <label className="block text-zimfip-gray font-medium mb-1">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal focus:outline-none transition-all duration-200"
              placeholder="Enter your city"
              required
            />
          </div>
          {role === "buyer" && (
            <div>
              <label className="block text-zimfip-gray font-medium mb-1">
                Buyer Type
              </label>
              <select
                value={buyerType}
                onChange={(e) => setBuyerType(e.target.value)}
                className="w-full p-3 bg-white text-zimfip-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-zimfip-teal focus:outline-none transition-all duration-200"
                required
              >
                <option value="individual">Individual</option>
                <option value="business">Business</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-zimfip-teal text-white p-3 rounded-lg hover:bg-teal-300 transition-colors duration-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
