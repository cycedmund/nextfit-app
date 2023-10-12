import { Routes, Route } from "react-router-dom";
import FavouritesPage from "../../pages/FavouritesPage/FavouritesPage";
import WardrobePage from "../../pages/WardrobePage/WardrobePage";
import ApparelForm from "../ApparelForm/ApparelForm";
import ApparelEditForm from "../ApparelEditForm/ApparelEditForm";
import { getUniqueCategories } from "../../utilities/wardrobe-service";
import WardrobeHero from "../../pages/WardrobePage/WardrobeHero";

function WardrobeRoutes({ apparel, setApparel, handleUpdateWornFreq }) {
  const mainCategories = getUniqueCategories(apparel);

  return (
    <Routes>
      {mainCategories.length < 2 && (
        <>
          <Route
            index
            element={<WardrobeHero mainCategories={mainCategories} />}
          />
          <Route
            path="/favourites"
            element={<WardrobeHero mainCategories={mainCategories} />}
          />
        </>
      )}
      {mainCategories.length >= 2 && (
        <>
          <Route
            index
            element={
              <WardrobePage
                apparel={apparel}
                setApparel={setApparel}
                handleUpdateWornFreq={handleUpdateWornFreq}
                mainCategories={mainCategories}
              />
            }
          />
          <Route path="/favourites" element={<FavouritesPage />} />
        </>
      )}
      <Route
        path="/new"
        element={<ApparelForm apparel={apparel} setApparel={setApparel} />}
      />
      <Route
        path="/:apparelId/edit"
        element={<ApparelEditForm apparel={apparel} setApparel={setApparel} />}
      />
    </Routes>
  );
}

export default WardrobeRoutes;
