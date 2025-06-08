import { Route, Routes } from "react-router-dom";
import CategoryView from "./screens/CategoryView";
import GoalsView from "./screens/GoalsView";
import SignIn from "./screens/login/SignIn";
import UserView from "./screens/User";
import Home from "./screens/Home";
import AboutYou from "./screens/AboutYou";
import ProtectedRoutes from "./auth/ProtecterRoutes";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/goals" element={<GoalsView />} />
          <Route path="/categories/:category" element={<CategoryView />} />
          <Route path="/user" element={<UserView />} />
          <Route path="/aboutYou" element={<AboutYou />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
