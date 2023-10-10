import debug from "debug";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import ApparelCard from "./ApparelCard";
import { useState } from "react";
import {
  checkMainCategory,
  filterByCategory,
  filterByCategoryAndFreq,
  sortByWornFreq,
} from "../../utilities/wardrobe-service";

const log = debug("nextfit:src:components:ApparelRow");

function ApparelRow({
  mainCategory,
  apparel,
  handleDelete,
  handleUpdate,
  setCurrentSlideIndex,
  currentSlideIndex,
  sliderRef,
}) {
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [freqOrder, setFreqOrder] = useState("Low-to-High");

  const mainCategorizedApparel = filterByCategoryAndFreq(
    sortByWornFreq(
      filterByCategory(apparel, mainCategory, selectSubCategory),
      freqOrder
    ),
    freqOrder
  );

  log("categorised apparel:", mainCategorizedApparel);

  const handleFilterSubCategory = (e) => {
    setSelectSubCategory(e.target.value);
  };

  const handleFilterFreqOrder = (e) => {
    setFreqOrder(e.target.value);
  };

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
      currentSlideIndex < mainCategorizedApparel.length - 5
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
    <div className="px-6 relative">
      <header className="mx-4 px-6 font-inter font-thin text-2xl">
        {mainCategory}
        {"s"}
      </header>
      <div className="m-2 ml-4 px-6">
        <label htmlFor="sub-category" className="mr-2">
          Sub Category:
        </label>
        <select
          className="rounded-none text-black w-full max-w-[16%] text-sm mr-2"
          onChange={handleFilterSubCategory}
          value={selectSubCategory}
          id="sub-category"
        >
          <option value="">All</option>
          {checkMainCategory(mainCategory).map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
        <label htmlFor="worn-frequency" className="mr-2">
          Worn Frequency:
        </label>
        <select
          className="rounded-none text-black w-full max-w-[16%] text-sm mr-2"
          onChange={handleFilterFreqOrder}
          value={freqOrder}
          id="worn-frequency"
        >
          <option disabled className="font-medium">
            ---Sort Options---
          </option>
          <option className="font-medium">Low-to-High</option>
          <option className="font-medium">High-to-Low</option>
          <option disabled className="font-medium">
            ---Filter Options---
          </option>
          <option className="font-medium">Not Worn Yet</option>
          <option className="font-medium">Worn Occasionally</option>
          <option className="font-medium">Worn Frequently</option>
        </select>
      </div>
      <MdNavigateBefore
        onClick={prev}
        className={`absolute top-[50%] -translate-y-1/2 left-0 z-50 text-7xl cursor-pointer ${
          currentSlideIndex === 0 || mainCategorizedApparel.length <= 5
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      />
      {mainCategorizedApparel.length > 5 ? (
        <Slider ref={sliderRef} {...settings} className="px-6 py-4">
          {mainCategorizedApparel.map((item) => (
            <ApparelCard
              key={item._id}
              item={item}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-5 px-6 py-4">
          {mainCategorizedApparel.map((item) => (
            <ApparelCard
              item={item}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              key={item._id}
            />
          ))}
        </div>
      )}
      <MdNavigateNext
        onClick={next}
        className={`absolute top-[50%] -translate-y-1/2 right-0 z-50 text-7xl cursor-pointer ${
          currentSlideIndex >= mainCategorizedApparel.length - 5
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      />
    </div>
  );
}

export default ApparelRow;
