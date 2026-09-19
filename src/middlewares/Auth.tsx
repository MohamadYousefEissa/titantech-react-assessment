import { useAppSelector } from "@/hooks/redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthMiddleware = () => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
