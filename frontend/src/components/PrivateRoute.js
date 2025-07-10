import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function PrivateRoute({ children }) {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  return token && user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
