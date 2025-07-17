import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-white p-4" style={{ backgroundColor: "#0A3A21" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">ZimFIP</h3>
          <p>Empowering farmers, connecting markets.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Quick Links</h3>
          <ul>
            <li>
              <Link to="/marketplace" className="hover:text-zimfip-teal">
                Marketplace
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-zimfip-teal">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/chat" className="hover:text-zimfip-teal">
                Chat
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Contact</h3>
          <p>Email: support@zimfip.com</p>
          <p>Phone: +263 77 123 4567</p>
        </div>
      </div>
      <p className="text-center mt-4">
        &copy; 2025 ZimFIP. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
