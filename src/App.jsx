import { Route, Routes } from "react-router-dom";
import CategoryView from "./screens/CategoryView";
import GoalsView from "./screens/GoalsView";
import SignIn from "./screens/login/SignIn";
import UserView from "./screens/User";
import Home from "./screens/Home";
import AboutYou from "./screens/AboutYou";
import ProtectedRoutes from "./auth/ProtecterRoutes";
import { ToastProvider } from "./contexts/ToastContext";
import ActivityChart from "./screens/activity/ActivityChart";
import FeelingChart from "./screens/feeling/FeelingChart";
import StudyChart from "./screens/study/StudyChart";
import SleepView from "./screens/sleep/SleepView"
import FoodChart from "./screens/food/FoodChart";


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
          <Route path="/activity" element={<ActivityChart />} />
          <Route path="/feeling" element={<FeelingChart/>} /> 
          <Route path="/study" element={<StudyChart/>} />
          <Route path="/sleep" element={<SleepView />} />
          <Route path="/food" element={<FoodChart />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>}>
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
