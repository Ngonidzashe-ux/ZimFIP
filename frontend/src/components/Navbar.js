import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-zimfip-green text-white p-4 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-zimfip-teal transition-colors duration-200"
        >
          ZimFIP
        </Link>
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-lg hover:text-zimfip-teal transition-colors duration-200"
          >
            Home
          </Link>
          {token ? (
            <>
              <Link
                to="/marketplace"
                className="text-lg hover:text-zimfip-teal transition-colors duration-200"
              >
                Marketplace
              </Link>
              <Link
                to="/dashboard"
                className="text-lg hover:text-zimfip-teal transition-colors duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg hover:text-zimfip-teal transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg hover:text-zimfip-teal transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-lg hover:text-zimfip-teal transition-colors duration-200"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
