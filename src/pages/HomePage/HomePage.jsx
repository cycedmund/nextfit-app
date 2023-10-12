import Weather from "../../components/Weather/Weather";
import HomeWardrobe from "../../components/HomeWardrobe/HomeWardrobe";
import WardrobeHero from "../WardrobePage/WardrobeHero";
import { getUniqueCategories } from "../../utilities/wardrobe-service";

function HomePage({ apparel, handleUpdateWornFreq }) {
  const mainCategories = getUniqueCategories(apparel);

  return (
    <>
      {mainCategories.length < 2 && (
        <WardrobeHero mainCategories={mainCategories} />
      )}
      {mainCategories.length >= 2 && (
        <>
          <HomeWardrobe apparel={apparel} />
          <Weather
            apparel={apparel}
            handleUpdateWornFreq={handleUpdateWornFreq}
          />
        </>
      )}
    </>
  );
}

export default HomePage;
