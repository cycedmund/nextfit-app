import { useState } from "react";
import { loginService } from "../../utilities/users-service";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ setUser }) {
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
      console.log(user);
      if (user !== null && user !== undefined) {
        setUser(user);
        navigate("/home");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container bg-neutral-400 mx-auto max-w-md px-4">
      <header className="text-white font-bold text-2xl text-start mt-4">
        Sign In
      </header>
      <form className="p-8" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
          >
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-[#E50914] hover:bg-[#e50914be] focus:ring-2 focus:outline-none focus:ring-gray-400 font-medium text-lg px-3 py-2.5 text-center w-full rounded-md"
        >
          Sign In
        </button>
        <footer className="mt-10">
          New to Nextfit?{" "}
          <span className="text-black">
            <Link to="/signup">Sign up now.</Link>
          </span>
        </footer>
      </form>
    </div>
  );
}

export default LoginForm;
