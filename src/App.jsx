

import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";

import GoalsView from "./screens/GoalsView";
import CategoryView from "./screens/CategoryView";
import UserView from "./screens/User";
import SignIn from "./screens/SignIn";
// import Login from "./screens/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/goals" element={<GoalsView />} />
      <Route path="/categories/:category" element={<CategoryView />} />
      <Route path="/user" element={<UserView />} />
      <Route path="/sign_in" element={<SignIn />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
