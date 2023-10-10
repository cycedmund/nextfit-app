import debug from "debug";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import LandingPage from "../LandingPage/LandingPage";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import { getUser } from "../../utilities/users-service";
import WardrobeRoutes from "../../components/WardrobeRoutes/WardrobeRoutes";
import { getAllApparelService } from "../../utilities/wardrobe-service";

const log = debug("nextfit:src:App");
localStorage.debug = "nextfit:*";

log("Start React");

function App() {
  const [user, setUser] = useState(getUser());
  const [apparel, setApparel] = useState([]);

  useEffect(() => {
    const fetchApparelData = async () => {
      const allApparel = await getAllApparelService();
      setApparel(allApparel);
    };
    fetchApparelData();
  }, []);

  return (
    <main className="min-h-screen min-w-screen bg-black text-white">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/home" element={<HomePage apparel={apparel}/>} />
            <Route path="/wardrobe/*" element={<WardrobeRoutes />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<AuthPage setUser={setUser} />} />
          <Route path="/login" element={<AuthPage setUser={setUser} />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
