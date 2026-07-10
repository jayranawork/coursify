import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const DASHBOARD_BY_ROLE = {
  student: "/student/dashboard",
  instructor: "/instructor/dashboard",
  admin: "/admin/dashboard",
};

export function RoleGuard({ allowedRoles, children }) {
  const { user, accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={DASHBOARD_BY_ROLE[user.role] || "/"} replace />;
  }

  return children;
}
