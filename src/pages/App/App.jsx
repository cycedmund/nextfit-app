import debug from "debug";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import LandingPage from "../LandingPage/LandingPage";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import { getUser } from "../../utilities/users-service";
import WardrobeRoutes from "../../components/WardrobeRoutes/WardrobeRoutes";
import {
  getAllApparelService,
  patchApparelFrequencyService,
} from "../../utilities/wardrobe-service";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Swal from "sweetalert2";
import { swalBasicSettings } from "../../utilities/wardrobe-service";

const log = debug("nextfit:src:App");
localStorage.debug = "nextfit:*";

log("Start React");

function App() {
  const [user, setUser] = useState(getUser());
  const [apparel, setApparel] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const fetchApparelData = async () => {
        const allApparel = await getAllApparelService();
        setApparel(allApparel);
      };
      fetchApparelData();
      if (location.pathname === "/") {
        navigate("/home");
      }
    }
  }, [user, navigate, location]);

  const handleUpdateWornFreq = async (apparelIDs) => {
    console.log("IDs", apparelIDs);
    try {
      const { top, bottom, outerwear, overall } =
        await patchApparelFrequencyService(apparelIDs);
      const freqUpdate = apparel.map((item) => {
        if (top && top._id === item._id) {
          item.wornFrequency = top.wornFrequency;
        }
        if (bottom && bottom._id === item._id) {
          item.wornFrequency = bottom.wornFrequency;
        }
        if (outerwear && outerwear._id === item._id) {
          item.wornFrequency = outerwear.wornFrequency;
        }
        if (overall && overall._id === item._id) {
          item.wornFrequency = overall.wornFrequency;
        }
        return item;
      });
      setApparel(freqUpdate);
      Swal.fire({
        ...swalBasicSettings("Updated!", "success"),
        text: "Thank you for reusing your clothes!",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        ...swalBasicSettings("Error", "error"),
        text: "Something went wrong",
      });
    }
  };

  return (
    <main className="min-h-screen min-w-screen bg-black text-white">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/home"
              element={
                <HomePage
                  apparel={apparel}
                  handleUpdateWornFreq={handleUpdateWornFreq}
                />
              }
            />
            <Route
              path="/wardrobe/*"
              element={
                <WardrobeRoutes
                  apparel={apparel}
                  setApparel={setApparel}
                  handleUpdateWornFreq={handleUpdateWornFreq}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<AuthPage setUser={setUser} />}>
            <Route path="signup" element={<SignUpForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
        </Routes>
      )}
    </main>
  );
}

export default App;
