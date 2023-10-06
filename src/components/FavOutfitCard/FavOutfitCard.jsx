import debug from "debug";

const log = debug("nextfit:src:components:FavOutfitCard");

//* fetch from database
const wardrobe = [
  { apparelID: 123, mainCategory: "bottom", subCategory: "pants", fit: "loose", imageURL: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/451648/sub/goods_451648_sub14.jpg?width=750" },
  { apparelID: 456, mainCategory:"top", subCategory: "sweater", fit: "loose", imageURL: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464861/sub/goods_464861_sub14.jpg?width=750" },
  { apparelID: 789, mainCategory:"top", subCategory: "t-shirt", fit: "crop", imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1hmgv6OYOCTz49jq_hupyM2pfC8r_IjpIdc2UItoupavMCZxnjS3fAPCRA8qgoyG1cS8&usqp=CAU" },

];

function FavOutfitCard({ outfit }) {
  log(outfit);

  const [ topID, bottomID ] = outfit.apparelID;

  //* filter wardrobe items with topID and bottomID
  const wardrobeFiltered =  wardrobe.filter(item => (item.apparelID === topID || item.apparelID === bottomID));

  //* sort wardrobe to show top then bottom
  if (wardrobeFiltered[0].mainCategory !== "top") {
    const temp = wardrobeFiltered[0];
    wardrobeFiltered[0] = wardrobeFiltered[1];
    wardrobeFiltered[1] = temp;
  }

  return (
    <article className="border-white">
      <div className="items-center bg-stone-400 p-2 rounded-lg shadow md:flex-row md:max-w-xl">
        {
          wardrobeFiltered?.map( apparel => <img key={apparel.apparelID}
            className="h-auto max-w-full rounded-lg object-cover"
            src={apparel.imageURL}
            alt={apparel.apparelID}
          />)
        }
        <div className="flex flex-col justify-between p-2 leading-normal">
          {
            wardrobeFiltered?.map( apparel => <p key={apparel.apparelID} className="text-sm text-zinc-500">{apparel.mainCategory}: {apparel.fit} {apparel.subCategory}</p>)
          }
        </div>
      </div>
    </article>
  );
}

export default FavOutfitCard;
