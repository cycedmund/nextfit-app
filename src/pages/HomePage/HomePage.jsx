import { useState, useEffect } from "react";
import Weather from "../../components/Weather/Weather";
import HomeWardrobe from "../../components/HomeWardrobe/HomeWardrobe";
import WardrobeHero from "../WardrobePage/WardrobeHero";
import { getUniqueCategories } from "../../utilities/wardrobe-service";

function HomePage({ apparel, handleUpdateWornFreq }) {
  const [loading, setLoading] = useState(true);
  const mainCategories = getUniqueCategories(apparel);

  useEffect(() => {
    if (mainCategories?.length > 0 || mainCategories?.length === 0) {
      setLoading(false);
    }
  }, [mainCategories]);

  return (
    <>
    {loading && (
          <div className="flex items-center justify-center h-[80vh]">
            <span className="loading loading-spinner w-16 text-[#E50A14]"></span>
          </div>
        )}
        {!loading && mainCategories.length < 2 && <WardrobeHero />}
      {!loading && mainCategories.length >=2 && (
      <>
        <HomeWardrobe apparel={apparel} />
        <Weather apparel={apparel} handleUpdateWornFreq={handleUpdateWornFreq} />
      </>
      )}
    </>
  );
}

export default HomePage;
