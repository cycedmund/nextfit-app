import { Link, useNavigate } from "react-router-dom";
import { logOutService } from "../../utilities/users-service";

function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    logOutService();
    setUser(null);
    navigate("/");
  };

  return (
    <nav>
      <Link to="/home">Home</Link>
      &nbsp;&nbsp;<span>Welcome, {user.username}</span>
      &nbsp;&nbsp;
      <Link to="/" onClick={handleLogOut}>
        Logout
      </Link>
    </nav>
  );
}

export default NavBar;
