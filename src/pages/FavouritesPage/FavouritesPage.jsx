import { useEffect, useState } from "react";
import FavOutfitCard from "../../components/FavOutfitCard/FavOutfitCard";
import { getAllOutfitService } from "../../utilities/outfits-service";

function FavouritesPage() {
  const [outfits, setOutfits] = useState([]);

  //* fetch outfite from database
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
    <div>
      <div>
        <header className="mx-4 font-inter font-thin text-2xl">
          Favourite Outfits
        </header>
        <div className="grid grid-cols-3 border-2 p-6 m-2">
          { outfits.length===0 ? "No outfits saved yet" : 
            outfits?.map((outfit) => (
            <FavOutfitCard
              key={outfit._id}
              outfit={outfit}
              updateDeleted={updateDeleted}
            />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default FavouritesPage;
