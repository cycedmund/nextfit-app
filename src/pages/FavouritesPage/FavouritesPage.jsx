import FavOutfitCard from "../../components/FavOutfitCard/FavOutfitCard";

//* fetch from database
const favOutfits = [
  { outfitID: 17691, apparelID: [ 456, 123 ] },
  { outfitID: 17691, apparelID: [ 789, 123 ] },
];

function FavouritesPage() {
  return <div>
    <div>
      <header className="mx-4 font-inter font-thin text-2xl">Favourite Outfits</header>
      <div className="grid grid-cols-5 gap-2 border-2 p-6 m-4">
      {
        favOutfits?.map(outfit => <FavOutfitCard key={outfit.outfitID} outfit={outfit}/>)
      }
      </div>
    </div>
    
  </div>;
}

export default FavouritesPage;
