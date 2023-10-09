import { Link, useNavigate, useLocation } from "react-router-dom";
import { logOutService } from "../../utilities/users-service";
import { TbUserSquare } from "react-icons/tb";
import { PiPantsThin, PiTShirtThin, PiPlusSquareFill } from "react-icons/pi";

function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const renderAddApparelComponent = () => (
    <div
      className={`flex items-center ${
        location.pathname === "/wardrobe/new"
          ? "text-white"
          : "text-neutral-500"
      } hover:text-white hover:text-3xl text-2xl`}
    >
      <PiTShirtThin />
      <div className="tooltip tooltip-bottom" data-tip="Add Apparel">
        <Link to="/wardrobe/new" className="flex items-center justify-center">
          <PiPlusSquareFill />
        </Link>
      </div>
      <PiPantsThin />
    </div>
  );

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
          {pages.map((page, index) => (
            <Link
              key={index}
              to={page.link}
              className={`mr-6 text-lg hover:text-2xl ${
                location.pathname === page.link
                  ? "text-white hover:text-lg"
                  : "text-neutral-500 hover:text-white"
              }`}
            >
              {page.title}
            </Link>
          ))}
          {location.pathname === "/wardrobe" && renderAddApparelComponent()}
          {/* {location.pathname === "/wardrobe" && (
            <div className="flex items-center text-neutral-500">
              <PiTShirtThin className="text-2xl" />
              <Link
                to="/wardrobe/new"
                className="flex items-center justify-center"
              >
                <PiPlusSquareFill className="text-3xl" />
              </Link>
              <PiPantsThin className="text-2xl" />
            </div>
          )} */}
        </div>
        <details className="dropdown dropdown-end">
          <summary className="btn bg-black btn-ghost pt-1 hover:bg-black">
            <TbUserSquare className="text-4xl text-[#E50914] mr-2" />
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[2] bg-base-100 rounded-box w-28">
            <li className="ml-4 mt-2 text-lg text-neutral-400 font-bebas tracking-wider">
              {user.username}
            </li>
            <li className="text-lg font-bebas tracking-wider">
              <Link to="/" onClick={handleLogOut} className="text-lg">
                Logout
              </Link>
            </li>
          </ul>
        </details>
      </div>
    </nav>
  );
}

export default NavBar;
