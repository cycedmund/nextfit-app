import debug from "debug";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";
import { getUser } from "../../utilities/users-service";

const log = debug("nextfit:src:App");
localStorage.debug = "nextfit:*";

log("Start React");

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main>
      {user ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
