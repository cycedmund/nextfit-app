import debug from "debug";

const log = debug("nextfit:src:components:FavOutfitCard");

function FavOutfitCard({ outfit }) {
  log(outfit);

  // console.log(outfit.apparels.top);

  const apparels = [outfit.apparels.top, outfit.apparels.bottom]
  // console.log(apparels);

  return (
    <article className="border-white">
      <div className="items-center bg-stone-400 p-2 rounded-lg shadow md:flex-row md:max-w-xl">
        {
          apparels?.map( apparel => <img key={apparel._id}
            className="h-auto max-w-full rounded-lg object-cover"
            src={apparel.imageURL}
            alt={apparel._id}
          />)
        }
        <div className="flex flex-col justify-between p-2 leading-normal">
          {
            apparels?.map( apparel => <p key={apparel._id} className="text-sm text-zinc-500">{apparel.mainCategory}: {apparel.fit} {apparel.subCategory}</p>)
          }
        </div>
      </div>
    </article>
  );
}

export default FavOutfitCard;
