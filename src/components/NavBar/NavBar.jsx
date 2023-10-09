import { Link, useNavigate, useLocation } from "react-router-dom";
import { logOutService } from "../../utilities/users-service";
import { TbUserSquare } from "react-icons/tb";

function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { link: "/home", title: "Home" },
    { link: "/wardrobe", title: "My Wardrobe" },
    { link: "/wardrobe/favourites", title: "My Favourites" },
  ];

  const handleLogOut = (e) => {
    e.preventDefault();
    logOutService();
    setUser(null);
    navigate("/");
  };

  return (
    <nav>
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen p-4 font-inter font-extralight">
        <div className="flex items-center">
          <span className="mr-10">
            <Link to="/home">
              <img className="w-28 h-10" src="/assets/nextfitlogobig.png" />
            </Link>
          </span>
          {pages.map((page) => (
            <Link
              key={page.link}
              to={page.link}
              className={`mr-6 text-md hover:underline ${
                location.pathname === page.link
                  ? "text-white"
                  : "text-neutral-500"
              }`}
            >
              {page.title}
            </Link>
          ))}
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
