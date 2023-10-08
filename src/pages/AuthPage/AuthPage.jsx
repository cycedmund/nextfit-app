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
    <div className="bg-black h-screen text-white p-4">
      <span className="self-center text-4xl font-bebas text-[#E50914] whitespace-nowrap">
        <img className="w-28 h-10" src="/assets/nextfitlogobig.png" />
      </span>
      <main className="container flex mx-auto h-[80vh] items-center justify-center">
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
    </div>
  );
}

export default AuthPage;
