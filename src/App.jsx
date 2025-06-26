import { Route, Routes } from "react-router-dom";
import GoalSettings from "./screens/GoalSettings";
import Login from "./screens/login";
import Home from "./screens/Home";
import SignIn from "./screens/login/SignIn";
import ProtectedRoutes from "./auth/ProtecterRoutes";
import RedirectRoutes from "./auth/RedirectRoutes";
import { ToastProvider } from "./contexts/ToastContext";
import ActivityChart from "./screens/activity/ActivityChart";
import MoodChart from "./screens/mood/MoodChart";
import StudyChart from "./screens/study/StudyChart";
import SleepView from "./screens/sleep/SleepView";
import FoodChart from "./screens/food/FoodChart";

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<RedirectRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/goals" element={<GoalSettings />} />
          <Route path="/activity" element={<ActivityChart />} />
          <Route path="/mood" element={<MoodChart />} />
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
