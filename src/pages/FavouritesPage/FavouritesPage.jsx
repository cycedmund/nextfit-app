import { useEffect, useState } from "react";
import FavOutfitCard from "../../components/FavOutfitCard/FavOutfitCard";
// import { getAllApparelService } from "../../utilities/wardrobe-service";
import { getAllOutfitService } from "../../utilities/outfits-service";

function FavouritesPage() {
  // const [wardrobe, setWardrobe] = useState([]);
  const [outfits, setOutfits] = useState([]);

  //* fetch outfite from database
  useEffect(() => {
    const fetchOutfits = async () => {
      const data = await getAllOutfitService();
      // console.log(data);
      setOutfits(data);
    };
    fetchOutfits();
  }, []);

  //* fetch wardrobe from database
  // useEffect(() => {
  //   const fetchWardrobe = async () => {
  //     const data = await getAllApparelService();
  //     // console.log(data);
  //     setWardrobe(data);
  //   };
  //   fetchWardrobe();
  // }, []);

  return <div>
    <div>
      <header className="mx-4 font-inter font-thin text-2xl">Favourite Outfits</header>
      <div className="grid grid-cols-5 gap-2 border-2 p-6 m-4">
      {
        outfits?.map(outfit => <FavOutfitCard key={outfit._id} outfit={outfit} />)
      }
      </div>
    </div>
    
  </div>;
}

export default FavouritesPage;
