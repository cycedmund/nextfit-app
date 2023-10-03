import { Link } from "react-router-dom";
import { logOutService } from "../../utilities/users-service";

function NavBar({ user, setUser }) {
  const handleLogOut = () => {
    logOutService();
    setUser(null);
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
