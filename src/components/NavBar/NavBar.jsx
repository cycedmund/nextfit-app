import { Link, useNavigate } from "react-router-dom";
import { logOutService } from "../../utilities/users-service";
import { TbUserSquare } from "react-icons/tb";

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
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 font-inter font-extralight">
        <div className="flex items-center">
          <span className="self-center text-4xl font-bebas text-[#E50914] whitespace-nowrap mr-10">
            <Link to="/home"><img className="w-28 h-10" src="/assets/nextfitlogo.png" /></Link>
          </span>
          <Link to="/home" className="mr-6 text-md  text-white hover:underline">
            Home
          </Link>
          <Link
            to="/wardrobe"
            className="text-md  text-white hover:underline mr-6"
          >
            My Wardrobe
          </Link>
          <Link
            to="/wardrobe/favourites"
            className="text-md  text-white hover:underline"
          >
            My Favourites
          </Link>
        </div>
        <div className="flex items-center">
          <TbUserSquare className="text-4xl text-[#E50914] mr-2" />
          <span className="mr-6 text-sm">{user.username}</span>
          <Link
            to="/"
            onClick={handleLogOut}
            className="mr-6 text-sm hover:underline"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
