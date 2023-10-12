import { useEffect, useState } from "react";
import FavOutfitCard from "../../components/FavOutfitCard/FavOutfitCard";
import { getAllOutfitService } from "../../utilities/outfits-service";

function FavouritesPage() {
  const [outfits, setOutfits] = useState([]);

  //* fetch outfit from database
  useEffect(() => {
    const fetchOutfits = async () => {
      const data = await getAllOutfitService();
      setOutfits(data);
    };
    fetchOutfits();
  }, []);

  const updateDeleted = (deletedOutfitID) => {
    setOutfits(outfits.filter((outfit) => outfit._id !== deletedOutfitID));
  };

  return (
    <div className="max-w-screen">
      <div className="px-6 relative">
        <header className="mx-6 px-6 font-inter font-thin text-2xl">
          Favourite Outfits
        </header>
        <div className="grid grid-cols-3 p-6 m-2">
          {outfits.length === 0 ? (
            <p className="mx-4 font-inter font-thin text-xl">
              No outfits saved yet
            </p>
          ) : (
            outfits?.map((outfit) => (
              <FavOutfitCard
                key={outfit._id}
                outfit={outfit}
                updateDeleted={updateDeleted}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FavouritesPage;
