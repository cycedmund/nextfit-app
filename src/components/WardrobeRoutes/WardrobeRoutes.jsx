import { Routes, Route } from "react-router-dom";
import FavouritesPage from "../../pages/FavouritesPage/FavouritesPage";
import WardrobePage from "../../pages/WardrobePage/WardrobePage";
import ApparelForm from "../ApparelForm/ApparelForm";
import ApparelEditForm from "../ApparelEditForm/ApparelEditForm";

function WardrobeRoutes({ apparel, setApparel, handleUpdateWornFreq }) {
  return (
    <Routes>
      <Route
        index
        element={
          <WardrobePage
            apparel={apparel}
            setApparel={setApparel}
            handleUpdateWornFreq={handleUpdateWornFreq}
          />
        }
      />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route
        path="/new"
        element={<ApparelForm apparel={apparel} setApparel={setApparel} />}
      />
      <Route path="/:apparelId/edit" element={<ApparelEditForm 
       apparel={apparel}
       setApparel={setApparel}/>} />
    </Routes>
  );
}

export default WardrobeRoutes;
