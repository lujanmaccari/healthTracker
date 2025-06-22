import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainHeader from "../utils/MainHeader";

function ProtectedRoutes() {
  return (
    <ProtectedRoute>
      <MainHeader />
      <div id="screen-content">
        <Outlet />
      </div>
    </ProtectedRoute>
  );
}
export default ProtectedRoutes;
