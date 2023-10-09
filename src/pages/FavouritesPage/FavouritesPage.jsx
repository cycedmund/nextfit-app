import { useEffect, useState } from "react";
import FavOutfitCard from "../../components/FavOutfitCard/FavOutfitCard";
import { getAllApparelService } from "../../utilities/wardrobe-service";

//* fetch from database
const favOutfits = [
  { _id: 17691, apparels: [ 456, 123 ] },
  { _id: 17691, apparels: [ 789, 123 ] },
];

//* fetch from database
const wardrobe = [
  { _id: 123, mainCategory: "bottom", subCategory: "pants", fit: "loose", imageURL: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/451648/sub/goods_451648_sub14.jpg?width=750" },
  { _id: 456, mainCategory:"top", subCategory: "sweater", fit: "loose", imageURL: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464861/sub/goods_464861_sub14.jpg?width=750" },
  { _id: 789, mainCategory:"top", subCategory: "t-shirt", fit: "crop", imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1hmgv6OYOCTz49jq_hupyM2pfC8r_IjpIdc2UItoupavMCZxnjS3fAPCRA8qgoyG1cS8&usqp=CAU" },

];

function FavouritesPage() {
  const [wardrobe, setWardrobe] = useState([]);

  useEffect(() => {
    const fetchWardrobe = async () => {
      const data = await getAllApparelService();
      console.log(data);
    };
    fetchWardrobe();
  }, []);

  return <div>
    <div>
      <header className="mx-4 font-inter font-thin text-2xl">Favourite Outfits</header>
      <div className="grid grid-cols-5 gap-2 border-2 p-6 m-4">
      {/* {
        favOutfits?.map(outfit => <FavOutfitCard key={outfit.id} outfit={outfit} wardrobe={wardrobe}/>)
      } */}
      </div>
    </div>
    
  </div>;
}

export default FavouritesPage;
