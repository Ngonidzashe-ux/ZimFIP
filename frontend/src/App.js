import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import Marketplace from "./pages/Marketplace";
import Chat from "./pages/Chat";
import CreateListing from "./pages/CreateListing";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Purchase from "./pages/Purchase";
import Upgrade from "./pages/Upgrade";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className="bg-white min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/buyerdashboard"
              element={
                <PrivateRoute>
                  <BuyerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admindashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/marketplace"
              element={
                <PrivateRoute>
                  <Marketplace />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-listing"
              element={
                <PrivateRoute>
                  <CreateListing />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-listing/:id"
              element={
                <PrivateRoute>
                  <CreateListing />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path="/purchase"
              element={
                <PrivateRoute>
                  <Purchase />
                </PrivateRoute>
              }
            />
            <Route
              path="/upgrade"
              element={
                <PrivateRoute>
                  <Upgrade />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
