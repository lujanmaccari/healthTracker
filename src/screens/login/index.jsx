import { useState } from "react";
import Landing from "./Landing";
import LoginForm from "./LoginForm";

const SignIn = () => {
  const [activeLogin, setActiveLogin] = useState(false);

  return (
    <div className="fullscreen-center">
      {!activeLogin ? (
        <Landing setActiveLogin={setActiveLogin} />
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default SignIn;
