import { useLocation } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

function AuthPage({ setUser }) {
  const location = useLocation();

  return (
    <div className="bg-black h-[100vh] text-white">
      <main className="container flex mx-auto h-[80vh] items-center justify-center">
        {location.pathname === "/signup" ? (
          <SignUpForm setUser={setUser} />
        ) : location.pathname === "/login" ? (
          <LoginForm setUser={setUser} />
        ) : null}
      </main>
    </div>
  );
}

export default AuthPage;
