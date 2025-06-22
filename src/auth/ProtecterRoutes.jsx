import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainHeader from "../utils/MainHeader";

function ProtectedRoutes() {
  return (
    <ProtectedRoute>
      <MainHeader />
      <Outlet />
    </ProtectedRoute>
  );
}
export default ProtectedRoutes;
