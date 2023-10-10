import { RxCross1 } from "react-icons/rx";
import { PiPencil } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";


function ApparelCard({ item, handleDelete}) {

 

  return (
    <article>
      <div className="bg-stone-400 p-3 m-1 rounded-lg shadow md:flex-row md:max-w-xl">
        <span className="flex items-center justify-end">

          <Link to={`/wardrobe/${item._id}/edit`}> 
            <PiPencil 
            className="text-md mb-2 text-black cursor-pointer"
            />

          </Link>
          <RxCross1
            onClick={() => handleDelete(item._id, item.mainCategory)}
            className="text-md mb-2 text-black cursor-pointer"
          />
        </span>
        <img
          className="h-auto max-w-full rounded-lg object-cover mx-auto"
          src={item.imageURL}
          alt={item.subCategory}
        />
        <div className="flex flex-col justify-between p-2 leading-normal">
          <h5 className="text-lg mb-2 tracking-tight text-gray-900">
            {item.subCategory}
          </h5>
          <i className="text-sm text-zinc-500">{item.fit} fit</i>
          <p className="text-sm text-zinc-500">
            Worn {item.wornFrequency} times
          </p>
        </div>
      </div>
    </article>
  );
}

export default ApparelCard;
