import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      const userRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/users/me`,
        {
          headers: { Authorization: `Bearer ${res.data.token}` },
        }
      );
      setUser({ role: userRes.data.role, name: userRes.data.name });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-zimfip-light p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-zimfip-green mb-6 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-5" onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full bg-zimfip-teal text-white p-3 rounded-lg hover:bg-teal-300 transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
