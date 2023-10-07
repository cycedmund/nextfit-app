import debug from "debug";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { PiPencil } from "react-icons/pi";

const log = debug("nextfit:src:components:ApparelRow");

function ApparelRow({ category, apparel, handleDelete }) {
  const sliderRef = useRef(null);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };
  const next = () => {
    sliderRef.current.slickNext();
  };
  const prev = () => {
    sliderRef.current.slickPrev();
  };

  const categorizedApparel = apparel.filter(
    (item) => item.mainCategory === category
  );
  log("categorised apparel:", categorizedApparel);

  return (
    <div className="p-6">
      <header className="mx-4 p-6 font-inter font-thin text-2xl">
        {category}
      </header>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 w-10"
        onClick={prev}
      >
        {"<"}
      </button>
      <Slider ref={sliderRef} {...settings} className="p-6">
        {categorizedApparel.map((item) => (
          <article key={item._id}>
            <div className="items-center bg-stone-400 p-2 rounded-lg shadow md:flex-row md:max-w-xl">
              <span className="flex items-center justify-end">
                <PiPencil className="text-md mb-2 mr-1 fill-black" />
                <RxCross1
                  onClick={() => handleDelete(item._id)}
                  className="text-md mb-2 text-black cursor-pointer"
                />
              </span>
              <img
                className="h-auto max-w-full rounded-lg object-cover"
                src={item.imageURL}
                alt={item.subCategory}
              />
              <div className="flex flex-col justify-between p-2 leading-normal">
                <h5 className="text-lg mb-2 tracking-tight text-gray-900">
                  {item.subCategory}
                </h5>
                <p className="text-sm text-zinc-500">Fit: {item.fit}</p>
                <p className="text-sm text-zinc-500">
                  Worn {item.wornFrequency} times
                </p>
              </div>
            </div>
          </article>
        ))}
      </Slider>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 w-10"
        onClick={next}
      >
        {">"}
      </button>
    </div>
  );
}

export default ApparelRow;
