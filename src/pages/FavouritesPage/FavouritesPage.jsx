import { useEffect, useState } from "react";
import FavOutfitCard from "../../components/FavOutfitCard/FavOutfitCard";
import { getAllApparelService } from "../../utilities/wardrobe-service";
import { getAllOutfitService } from "../../utilities/outfits-service";

//* fetch from database
// const outfits = [
//   { _id: 17691, apparels: { top: "6523617d4265a9ae81b70165", bottom: "652361a74265a9ae81b70169" } },
//   { _id: 17698, apparels: { top: "652367b5ff12811b33d0b3f3", bottom: "652366c0ff12811b33d0b3e0" } },
// ];

function FavouritesPage() {
  const [wardrobe, setWardrobe] = useState([]);
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
  useEffect(() => {
    const fetchWardrobe = async () => {
      const data = await getAllApparelService();
      // console.log(data);
      setWardrobe(data);
    };
    fetchWardrobe();
  }, []);

  return <div>
    <div>
      <header className="mx-4 font-inter font-thin text-2xl">Favourite Outfits</header>
      <div className="grid grid-cols-5 gap-2 border-2 p-6 m-4">
      {
        outfits?.map(outfit => <FavOutfitCard key={outfit._id} outfit={outfit} wardrobe={wardrobe}/>)
      }
      </div>
    </div>
    
  </div>;
}

export default FavouritesPage;
