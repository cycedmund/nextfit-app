import { useEffect, useState } from "react";
import FavOutfitCard from "../../components/FavOutfitCard/FavOutfitCard";
import { getAllApparelService } from "../../utilities/wardrobe-service";

//* fetch from database
const favOutfits = [
  { _id: 17691, apparels: [ "6523617d4265a9ae81b70165", "652361a74265a9ae81b70169" ] },
  { _id: 17691, apparels: [ "652361934265a9ae81b70167", "652361a74265a9ae81b70169" ] },
];

function FavouritesPage() {
  const [wardrobe, setWardrobe] = useState([]);

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
        favOutfits?.map(outfit => <FavOutfitCard key={outfit.id} outfit={outfit} wardrobe={wardrobe}/>)
      }
      </div>
    </div>
    
  </div>;
}

export default FavouritesPage;
