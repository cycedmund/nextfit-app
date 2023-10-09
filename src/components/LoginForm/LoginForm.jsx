import { useState } from "react";
import { loginService } from "../../utilities/users-service";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { swalBasicSettings } from "../../utilities/wardrobe-service";

function LoginForm({ setUser, handlePasswordVisibility, visibility }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService(credentials);
      if (user !== null && user !== undefined) {
        const prompt = await Swal.fire({
          ...swalBasicSettings(`Welcome Back ${user.username}!`, "success"),
          confirmButtonText: "Enter",
        });
        if (prompt.isConfirmed) {
          setUser(user);
          navigate("/home");
        }
      } else {
        Swal.fire({
          ...swalBasicSettings("Sorry!", "error"),
          text: "Please try again.",
        });
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container bg-neutral-400 mx-auto max-w-md p-4">
      <form className="p-2" onSubmit={handleSubmit}>
        <header className="text-white font-inter font-light text-2xl mb-4">
          Log In
        </header>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-inter font-normal text-gray-600"
          >
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            autoComplete="off"
            value={credentials.username}
            onChange={handleChange}
            className="bg-neutral-300 text-gray-900 text-sm focus:outline-none block w-full p-2.5 cursor-text font-inter font-extralight border-none"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-inter font-normal text-gray-600"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={visibility ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="off"
              value={credentials.password}
              onChange={handleChange}
              className="bg-neutral-300 text-gray-900 text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-text font-inter font-extralight border-none"
              required
            />
            <button
              className="btn btn-sm btn-ghost text-neutral-500 font-inter font-extralight absolute inset-y-1 right-0 pr-3 flex items-center"
              type="button"
              onClick={handlePasswordVisibility}
            >
              {visibility ? (
                <AiOutlineEyeInvisible className="text-2xl" />
              ) : (
                <AiOutlineEye className="text-2xl" />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-[#E50A14] hover:bg-[#c11119] focus:ring-2 focus:outline-none focus:ring-gray-400 font-bebas font-normal text-3xl px-3 py-2.5 text-center w-full"
        >
          LOGIN
        </button>
        <footer className="mt-6">
          New to Nextfit?{" "}
          <span className="text-neutral-700">
            <Link to="/signup">
              <u>Sign up now.</u>
            </Link>
          </span>
        </footer>
      </form>
    </div>
  );
}

export default LoginForm;
