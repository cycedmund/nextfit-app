import debug from "debug";

const log = debug("nextfit:src:components:FavOutfitCard");

function FavOutfitCard({ outfit, wardrobe }) {
  log(outfit);

  const [ topID, bottomID ] = outfit.apparels;

  //* filter wardrobe items with topID and bottomID
  const wardrobeFiltered =  wardrobe.filter(item => (item._id === topID || item._id === bottomID));

  //* sort wardrobe to show top then bottom
  if (wardrobeFiltered[0].mainCategory !== "Top") {
    const temp = wardrobeFiltered[0];
    wardrobeFiltered[0] = wardrobeFiltered[1];
    wardrobeFiltered[1] = temp;
  }

  return (
    <article className="border-white">
      <div className="items-center bg-stone-400 p-2 rounded-lg shadow md:flex-row md:max-w-xl">
        {
          wardrobeFiltered?.map( apparel => <img key={apparel._id}
            className="h-auto max-w-full rounded-lg object-cover"
            src={apparel.imageURL}
            alt={apparel._id}
          />)
        }
        <div className="flex flex-col justify-between p-2 leading-normal">
          {
            wardrobeFiltered?.map( apparel => <p key={apparel._id} className="text-sm text-zinc-500">{apparel.mainCategory}: {apparel.fit} {apparel.subCategory}</p>)
          }
        </div>
      </div>
    </article>
  );
}

export default FavOutfitCard;
