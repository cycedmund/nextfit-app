import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  logOutService,
  deleteUserService,
} from "../../utilities/users-service";
import { TbUserSquare } from "react-icons/tb";
import { PiPantsThin, PiTShirtThin, PiPlusSquareFill } from "react-icons/pi";
import Swal from "sweetalert2";
import { swalBasicSettings } from "../../utilities/wardrobe-service";

function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const renderAddApparelComponent = () => (
    <div
      className={`flex items-center ${
        location.pathname === "/wardrobe/new"
          ? "text-white"
          : "text-neutral-500"
      } hover:text-white hover:text-3xl text-2xl mr-4`}
    >
      <Link to="/wardrobe/new" className="flex items-center justify-center">
        <div
          className="tooltip tooltip-bottom flex items-center justify-center"
          data-tip="Add Apparel"
        >
          <PiTShirtThin />
          <PiPlusSquareFill />
          <PiPantsThin />
        </div>
      </Link>
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

  const handleDeactivate = async (e) => {
    e.preventDefault();

    const prompt = await Swal.fire({
      ...swalBasicSettings("Proceed to delete account?", "warning"),
      text: "Deleting your account cannot be undone. All data and progress will be lost. Make sure you want to do this.",
      input: "text",
      inputPlaceholder: "type your username",
      inputAttributes: { autocomplete: "off" },
      showCancelButton: true,
      confirmButtonText: "DELETE",
      cancelButtonText: "CANCEL",
    }).then((result) => {
      if (result.value) {
        return result.value;
      }
    });

    if (prompt === user.username) {
      try {
        Swal.fire(
          swalBasicSettings("Successfully deleted account!", "success")
        );
        await deleteUserService();
        setUser(null);
        navigate("/");
      } catch (err) {
        console.error(err);
        Swal.fire({
          ...swalBasicSettings("Error", "error"),
          text: "Something went wrong",
        });
      }
    } else {
      Swal.fire(
        swalBasicSettings(
          "You did not type your username. Account not deleted.",
          "warning"
        )
      );
    }
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
        </div>
        <div className="flex justify-center items-center">
          {renderAddApparelComponent()}
          <details className="dropdown dropdown-end">
            <summary className="btn bg-black btn-ghost pt-1 hover:bg-black">
              <TbUserSquare className="text-4xl text-[#E50914] mr-2" />
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[2] bg-base-100 rounded-box w-52 font-bebas tracking-widest bg-opacity-70 text-lg">
              <li className="ml-4 mt-2  text-neutral-400">{user.username}</li>
              <li className="ml-4 mt-2 mb-2 text-sm  text-neutral-400 break-all">
                {user.email}
              </li>
              <li className="border-t border-white">
                <Link to="/" onClick={handleLogOut} className="text-lg">
                  Logout
                </Link>
              </li>
              <li className="border-t border-white">
                <Link to="/" onClick={handleDeactivate} className="text-lg">
                  Deactivate Account
                </Link>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
