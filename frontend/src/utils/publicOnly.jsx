import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicOnly = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/" replace /> : children;
};

export default PublicOnly;
