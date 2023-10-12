import { useState } from "react";
import { signUpService } from "../../utilities/users-service";
import { useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import { swalBasicSettings } from "../../utilities/wardrobe-service";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

function SignUpForm() {
  const [setUser, visibility, handlePasswordVisibility, status, setStatus] =
    useOutletContext();
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    repeat: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    if (userData.password !== userData.repeat) {
      Swal.fire({
        ...swalBasicSettings("Error", "error"),
        text: "Password and Repeat Password do not match",
        confirmButtonText: "Try Again",
      });
      return;
    }
    try {
      const user = await signUpService(userData);
      if (user !== null && user !== undefined) {
        const prompt = await Swal.fire({
          ...swalBasicSettings("Successfully signed up!", "success"),
          confirmButtonText: "Enter",
        });
        if (prompt.isConfirmed) {
          setUser(user);
          navigate("/home");
        }
      }
    } catch (err) {
      if (err.message === "Unexpected end of JSON input") {
        Swal.fire({
          ...swalBasicSettings("Internal Server Error", "error"),
          text: "Please try again later.",
        });
      } else {
        Swal.fire({
          ...swalBasicSettings("Error", "error"),
          text: err.message,
          confirmButtonText: "Try Again",
        });
      }
      setStatus("error");
    } finally {
      setStatus(null);
    }
  };

  return (
    <div className="container bg-neutral-400 mx-auto max-w-md p-4">
      <form className="p-2" onSubmit={handleSubmit} autoComplete="off">
        <header className="text-white font-inter font-light text-2xl mb-4">
          Register with{" "}
          <span className="text-[#E50914] text-3xl font-bold">NEXTFIT</span>
        </header>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-inter font-normal text-gray-600"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="bg-neutral-300 text-gray-900 text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-text font-inter font-extralight border-none"
            placeholder="name@email.com"
            autoComplete="off"
            required
          />
        </div>
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
            value={userData.username}
            onChange={handleChange}
            placeholder="Username"
            autoComplete="off"
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
              value={userData.password}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Repeat Password"
              className="bg-neutral-300 text-gray-900 text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-text font-inter font-extralight border-none"
              required
            />
            <button
              className="btn btn-sm btn-ghost text-neutral-500 font-inter font-extralight absolute inset-y-1 right-0 pr-3 flex items-center"
              onClick={handlePasswordVisibility}
              type="button"
            >
              {visibility ? (
                <AiOutlineEyeInvisible className="text-2xl" />
              ) : (
                <AiOutlineEye className="text-2xl" />
              )}
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-inter font-normal text-gray-600"
          >
            Repeat Password
          </label>
          <div className="relative">
            <input
              type={visibility ? "text" : "password"}
              id="repeat-password"
              name="repeat"
              value={userData.repeat}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Repeat Password"
              className="bg-neutral-300 text-gray-900 text-sm focus:ring-zinc-500 block focus:outline-none w-full p-2.5 cursor-text font-inter font-extralight border-none"
              required
            />
            <button
              className="btn btn-sm btn-ghost text-neutral-500 font-inter font-extralight absolute inset-y-1 right-0 pr-3 flex items-center"
              onClick={handlePasswordVisibility}
              type="button"
            >
              {visibility ? (
                <AiOutlineEyeInvisible className="text-2xl" />
              ) : (
                <AiOutlineEye className="text-2xl" />
              )}
            </button>
          </div>
        </div>
        {status === "loading" ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-dots loading-lg bg-gray-500 px-3 py-2.5 "></span>
          </div>
        ) : (
          <button
            type="submit"
            className="text-white bg-[#E50A14] hover:bg-[#c11119] focus:ring-2 focus:outline-none focus:ring-gray-400 font-bebas font-normal text-3xl px-3 py-2.5 text-center w-full"
          >
            SIGN UP
          </button>
        )}
      </form>
      <Link to="/login">
        <span className="text-white text-md btn btn-ghost btn-sm bg-[#E50A14] hover:bg-[#c11119] rounded-md absolute top-4 right-4 normal-case">
          Sign In
        </span>
      </Link>
    </div>
  );
}

export default SignUpForm;
