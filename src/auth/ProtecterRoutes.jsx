import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function ProtectedRoutes() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}
export default ProtectedRoutes;
