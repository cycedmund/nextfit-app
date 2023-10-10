import debug from "debug";
import { RxCross1 } from "react-icons/rx";
import { deleteOutfitService } from "../../utilities/outfits-service";
import Swal from "sweetalert2";

import {
  swalBasicSettings,
} from "../../utilities/wardrobe-service";

const log = debug("nextfit:src:components:FavOutfitCard");

function FavOutfitCard({ outfit, updateDeleted }) {
  log(outfit);

  // console.log(outfit.apparels.top);

  const apparels = [outfit.apparels.top, outfit.apparels.bottom]
  // console.log(apparels);

  const handleDelete = async (outfitID) => {
    try {
      await deleteOutfitService(outfitID);
      updateDeleted(outfitID);
  
      Swal.fire({
        ...swalBasicSettings("Deleted!", "success"),
        text: "You no longer like this outfit :(",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        ...swalBasicSettings("Error", "error"),
        text: "Something went wrong",
      });
    }
  };

  return (
    <article>
      <div className="bg-stone-400 p-3 m-1 rounded-lg shadow md:flex-row md:max-w-xl">
        <span className="flex items-center justify-end">
          <RxCross1
            onClick={() => handleDelete(outfit._id)}
            className="text-md mb-2 text-black cursor-pointer"
          />
        </span>
        {
          apparels?.map( apparel => <img key={apparel._id}
          className="h-auto max-w-full rounded-lg object-cover"
          src={apparel.imageURL}
          alt={apparel._id}
          />)
        }
        <div className="flex flex-col justify-between p-2 leading-normal">
          {
            apparels?.map( apparel => {
              return (
              <>
                <h5 className="text-sm tracking-tight text-zinc-500">
                {apparel.mainCategory}
                </h5>
                <span><i className="text-sm text-gray-900">{apparel.fit}</i><span key={apparel._id} className="text-sm text-gray-900"> {apparel.subCategory}</span></span>
              </>
              );
            })
          }
        </div>
      </div>
    </article>
  );
}

export default FavOutfitCard;
