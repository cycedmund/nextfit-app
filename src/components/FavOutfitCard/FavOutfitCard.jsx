import debug from "debug";
import { RxCross1 } from "react-icons/rx";
import { deleteOutfitService } from "../../utilities/outfits-service";
import Swal from "sweetalert2";

import {
  swalBasicSettings,
} from "../../utilities/wardrobe-service";
import { FaPersonPraying, FaRegFaceKiss, FaThumbsUp } from "react-icons/fa6";

const log = debug("nextfit:src:components:FavOutfitCard");

function FavOutfitCard({ outfit, updateDeleted }) {
  log(outfit);

  // console.log(outfit.apparels.top);

  const apparels = [outfit.apparels.top, outfit.apparels.bottom]
  // console.log(apparels);

  const handleDelete = async (outfitID) => {

    const prompt = await Swal.fire({
      ...swalBasicSettings("Proceed to delete?", "warning"),
      showCancelButton: true,
      confirmButtonText: "DELETE",
      cancelButtonText: "CANCEL",
    });

    if (prompt.isConfirmed) {
      try {
        await deleteOutfitService(outfitID);
        updateDeleted(outfitID);
        
        Swal.fire(swalBasicSettings("Deleted!", "success"));
      } catch (err) {
        console.error(err);
        Swal.fire({
          ...swalBasicSettings("Error", "error"),
          text: "Something went wrong",
        });
      }
    }
  };

  return (
    <article>
      <div className="bg-gray-200 p-3 m-1 rounded-lg shadow md:flex-row md:max-w-xl">
        <span className="flex apparels-center justify-end">
          <RxCross1
            onClick={() => handleDelete(outfit._id)}
            className="text-lg mb-2 text-black cursor-pointer"
          />
        </span>
        <div className="flex">
          {
            apparels?.map( apparel => {
              return (
                <div key={apparel._id} className="m-3">
                  <img className="h-auto max-w-full rounded-lg object-cover mx-auto" src={apparel.imageURL} alt={apparel.subCategory}/>
                  <div className="flex flex-col justify-between p-2 leading-normal">
                    <h5 className="text-xl mb-2 tracking-tight text-gray-900">
                      {apparel.subCategory}
                    </h5>
                    <p className="text-md text-zinc-500">
                    <i className="text-zinc-600">{apparel.fit}</i> fit
                    </p>
                    <p className={`text-md flex apparels-center ${
                      apparel.wornFrequency === 0 ? "text-red-500" : "text-zinc-500"
                    }`}
                    >
                    {apparel.wornFrequency === 0 ? "Not worn yet" : apparel.wornFrequency === 1 ? "Worn once" : `Worn ${apparel.wornFrequency} times`} {apparel.wornFrequency === 0 ? (
                    <FaPersonPraying className="ml-1" /> ) : apparel.wornFrequency === 1 ? ( <FaThumbsUp className="ml-1" /> ) : (
                    <FaRegFaceKiss className="ml-1" /> )}
                    </p>
                  </div>
                </div>
              );
            })
          }
        </div>     
      </div>
    </article>
  );
}

export default FavOutfitCard;
