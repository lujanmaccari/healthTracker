import { Route, Routes } from "react-router-dom";
import CategoryView from "./screens/CategoryView";
import GoalsView from "./screens/GoalsView";
import SignIn from "./screens/login/SignIn";
import UserView from "./screens/User";
import Home from "./screens/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/goals" element={<GoalsView />} />
      <Route path="/categories/:category" element={<CategoryView />} />
      <Route path="/user" element={<UserView />} />
    {/*  <Route path="/about" element={<AboutYou />} /> */}
    </Routes>
  );
}

export default App;
