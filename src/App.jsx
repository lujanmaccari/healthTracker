import { Route, Routes } from "react-router-dom";
import CategoryView from "./screens/CategoryView";
import GoalsView from "./screens/GoalsView";
import SignIn from "./screens/login/SignIn";
import UserView from "./screens/User";
import Home from "./screens/Home";
import AboutYou from "./screens/AboutYou";
import ProtectedRoutes from "./auth/ProtecterRoutes";
import { ToastProvider } from "./contexts/ToastContext";
import WeeklyActivity from "./screens/activity/ActivityRegister";
import ActivityChart from "./screens/activity/ActivityChart";
import AddFeeling from "./screens/feeling/FeelingRegister";
import FeelingChart from "./screens/feeling/FeelingChart";


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
          <Route path="/addActivity" element={<WeeklyActivity />} />
          <Route path="/activity" element={<ActivityChart />} />
          <Route path="/addFeeling" element={<AddFeeling/>} />
          <Route path="/feeling" element={<FeelingChart/>} /> 
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
