import { useState } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

function AuthPage({ setUser }) {
  const [visibility, setVisibility] = useState(false);
  const location = useLocation();

  const handlePasswordVisibility = () => {
    setVisibility((prev) => !prev);
  };

  return (
    <>
      <span className="absolute top-4 left-4">
        <img className="w-28 h-10" src="/assets/nextfitlogobig.png" />
      </span>

      <main className="text-white p-4 container flex mx-auto min-h-screen items-center justify-center">
        {location.pathname === "/signup" ? (
          <SignUpForm
            setUser={setUser}
            visibility={visibility}
            handlePasswordVisibility={handlePasswordVisibility}
          />
        ) : location.pathname === "/login" ? (
          <LoginForm
            setUser={setUser}
            visibility={visibility}
            handlePasswordVisibility={handlePasswordVisibility}
          />
        ) : null}
      </main>
    </>
  );
}

export default AuthPage;
