import debug from "debug";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import HomePage from "../HomePage/HomePage";

const log = debug("nextfit:src:App");
localStorage.debug = "nextfit:*";

log("Start React");

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <main>
      {user ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      ) : (
        <AuthPage />
      )}
    </main>
  );
};

export default App;
