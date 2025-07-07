import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-zimfip-green text-white p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
