import { Route, Routes } from "react-router-dom";
import GoalsView from "./screens/GoalsView";
import SignIn from "./screens/login/SignIn";
import UserView from "./screens/User";
import Home from "./screens/Home";
import AboutYou from "./screens/AboutYou";
import ProtectedRoutes from "./auth/ProtecterRoutes";
import RedirectRoutes from "./auth/RedirectRoutes";
import { ToastProvider } from "./contexts/ToastContext";
import ActivityChart from "./screens/activity/ActivityChart";
import FeelingChart from "./screens/feeling/FeelingChart";
import StudyChart from "./screens/study/StudyChart";
import SleepView from "./screens/sleep/SleepView";
import FoodChart from "./screens/food/FoodChart";

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<RedirectRoutes />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/aboutYou" element={<AboutYou />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/goals" element={<GoalsView />} />
          <Route path="/user" element={<UserView />} />
          <Route path="/activity" element={<ActivityChart />} />
          <Route path="/feeling" element={<FeelingChart />} />
          <Route path="/study" element={<StudyChart />} />
          <Route path="/sleep" element={<SleepView />} />
          <Route path="/food" element={<FoodChart />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
