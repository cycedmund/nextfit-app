import { Routes, Route } from "react-router-dom";
import FavouritesPage from "../../pages/FavouritesPage/FavouritesPage";
import WardrobePage from "../../pages/WardrobePage/WardrobePage";
import ApparelForm from "../ApparelForm/ApparelForm";
import ApparelEditForm from "../ApparelEditForm/ApparelEditForm";

function WardrobeRoutes() {
  return (
    <Routes>
      <Route index element={<WardrobePage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/new" element={<ApparelForm />} />
      <Route path="/:apparelId/edit" element={<ApparelEditForm />}/>
    </Routes>
  );
}

export default WardrobeRoutes;
