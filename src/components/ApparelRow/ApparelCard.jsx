import { PiPencil, PiPlusDuotone, PiTrashDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { FaPersonPraying, FaThumbsUp, FaRegFaceKiss } from "react-icons/fa6";

function ApparelCard({ item, handleDelete, handleUpdateWornFreq }) {
  return (
    <article>
      <div className="bg-gray-200 p-3 m-1 rounded-lg shadow md:flex-row md:max-w-xl">
        <span className="flex items-center justify-end">
          <Link to={`/wardrobe/${item._id}/edit`}>
            <PiPencil className="text-xl mb-2 mr-[2px] text-black cursor-pointer" />
          </Link>
          <PiPlusDuotone
            onClick={() => handleUpdateWornFreq([item._id])}
            className="text-xl mb-2 mr-[2px] text-black cursor-pointer"
          />
          <PiTrashDuotone
            onClick={() => handleDelete(item._id, item.mainCategory)}
            className="text-xl mb-2 text-black cursor-pointer"
          />
        </span>

        <img
          className="h-auto max-w-full rounded-lg object-cover mx-auto"
          src={item.imageURL}
          alt={item.subCategory}
        />
        <div className="flex flex-col justify-between p-2 leading-normal">
          <h5 className="text-xl mb-2 tracking-tight text-gray-900">
            {item.subCategory}
          </h5>
          <p className="text-md text-zinc-500">
            <i className="text-zinc-600">{item.fit}</i> fit
          </p>
          <p
            className={`text-md flex items-center ${
              item.wornFrequency === 0 ? "text-red-500" : "text-zinc-500"
            }`}
          >
            {item.wornFrequency === 0
              ? "Not worn yet"
              : item.wornFrequency === 1
              ? "Worn once"
              : `Worn ${item.wornFrequency} times`}
            {item.wornFrequency === 0 ? (
              <FaPersonPraying className="ml-1" />
            ) : item.wornFrequency === 1 ? (
              <FaThumbsUp className="ml-1" />
            ) : (
              <FaRegFaceKiss className="ml-1" />
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ApparelCard;
