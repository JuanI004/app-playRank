import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="h-screen min-w-screen bg-bg flex justify-center items-center font-pixel text-primary text-center pt-20 animate-pulse">
        CARGANDO...
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
