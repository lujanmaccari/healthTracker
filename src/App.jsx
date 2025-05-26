import { Route, Routes } from "react-router-dom";
import CategoryView from "./screens/CategoryView";
import GoalsView from "./screens/GoalsView";
import SignIn from "./screens/SignIn";
import UserView from "./screens/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/goals" element={<GoalsView />} />
      <Route path="/categories/:category" element={<CategoryView />} />
      <Route path="/user" element={<UserView />} />
    </Routes>
  );
}

export default App;
