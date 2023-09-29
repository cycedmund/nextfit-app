import debug from "debug";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";

const log = debug("nextfit:src:App");
localStorage.debug = "nextfit:*";

log("Start React");

const App = () => {
  const [user, setUser] = useState(null);

  return <main>{user ? <Routes></Routes> : <AuthPage />}</main>;
};

export default App;
