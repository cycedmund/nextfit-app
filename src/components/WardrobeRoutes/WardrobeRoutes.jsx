import { Routes, Route } from "react-router-dom";
import FavouritesPage from "../../pages/FavouritesPage/FavouritesPage";
import WardrobePage from "../../pages/WardrobePage/WardrobePage";
import ApparelForm from "../ApparelForm/ApparelForm";

function WardrobeRoutes() {
  return (
    <Routes>
      <Route index element={<WardrobePage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/apparel/new" element={<ApparelForm />} />
    </Routes>
  );
}

export default WardrobeRoutes;
