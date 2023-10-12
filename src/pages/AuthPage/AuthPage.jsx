import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function AuthPage({ setUser }) {
  const [visibility, setVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setVisibility((prev) => !prev);
  };

  return (
    <>
      <span className="absolute top-4 left-4">
        <Link to="/">
          <img className="w-28 h-10" src="/assets/nextfitlogobig.png" />
        </Link>
      </span>

      <main className="text-white p-4 container flex mx-auto min-h-screen items-center justify-center">
        <Outlet context={[setUser, visibility, handlePasswordVisibility]} />
      </main>
    </>
  );
}

export default AuthPage;
