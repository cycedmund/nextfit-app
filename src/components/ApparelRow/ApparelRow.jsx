import debug from "debug";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import ApparelCard from "./ApparelCard";

const log = debug("nextfit:src:components:ApparelRow");

function ApparelRow({
  category,
  apparel,
  handleDelete,
  setCurrentSlideIndex,
  currentSlideIndex,
  sliderRef,
}) {
  const categorizedApparel = apparel.filter(
    (item) => item.mainCategory === category
  );
  log("categorised apparel:", categorizedApparel);

  const settings = {
    infinite: false,
    draggable: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    afterChange: (index) => {
      setCurrentSlideIndex(index);
    },
  };

  const next = () => {
    log("next + currentSlideIndex", currentSlideIndex);
    log("next, useRef sliderRef:", sliderRef.current);
    if (
      sliderRef.current !== null &&
      currentSlideIndex < categorizedApparel.length - 5
    ) {
      sliderRef.current.slickNext();
    }
  };
  const prev = () => {
    log("prev, useRef sliderRef:", sliderRef.current);
    if (sliderRef.current !== null && currentSlideIndex > 0) {
      sliderRef.current.slickPrev();
      log("prev + currentSlideIndex", currentSlideIndex);
    }
  };

  return (
    <div className="p-6 relative">
      <header className="mx-4 px-6 font-inter font-thin text-2xl">
        {category}
        {"s"}
      </header>
      <MdNavigateBefore
        onClick={prev}
        className={`absolute top-[50%] -translate-y-1/2 left-0 z-50 text-7xl cursor-pointer ${
          currentSlideIndex === 0 || categorizedApparel.length <= 5
            ? "opacity-0"
            : "opacity-100"
        }`}
      />
      {categorizedApparel.length > 5 ? (
        <Slider ref={sliderRef} {...settings} className="px-6 py-4">
          {categorizedApparel.map((item) => (
            <ApparelCard
              item={item}
              handleDelete={handleDelete}
              key={item._id}
            />
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-5 px-6 py-4">
          {categorizedApparel.map((item) => (
            <ApparelCard
              item={item}
              handleDelete={handleDelete}
              key={item._id}
            />
          ))}
        </div>
      )}

      <MdNavigateNext
        onClick={next}
        className={`absolute top-[50%] -translate-y-1/2 right-0 z-50 text-7xl cursor-pointer ${
          currentSlideIndex >= categorizedApparel.length - 5
            ? "opacity-0"
            : "opacity-100"
        }`}
      />
    </div>
  );
}

export default ApparelRow;
