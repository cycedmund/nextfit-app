import { useEffect, useRef, useState } from "react";
import {
  deleteApparelService,
  getUniqueCategories,
  swalBasicSettings,
} from "../../utilities/wardrobe-service";
import debug from "debug";
import ApparelRow from "../../components/ApparelRow/ApparelRow";
import Swal from "sweetalert2";
import WardrobeHero from "./WardrobeHero";

const log = debug("nextfit:src:pages:WardrobePage");

function WardrobePage({ apparel, setApparel }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const sliderRef = useRef(null);
  const categories = getUniqueCategories(apparel);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    if (categories.length > 0) {
      setLoadingPage(false);
    }
  }, [categories]);

  const handleDelete = async (apparelID, mainCategory) => {
    const prompt = await Swal.fire({
      ...swalBasicSettings("Proceed to delete?", "warning"),
      showCancelButton: true,
      confirmButtonText: "DELETE",
      cancelButtonText: "CANCEL",
    });

    if (prompt.isConfirmed) {
      try {
        await deleteApparelService(apparelID, mainCategory);
        const remainingApparel = apparel.filter(
          (item) => item._id !== apparelID
        );
        log("deleted apparel:", remainingApparel);
        log("currentSlideIndex", currentSlideIndex);
        setApparel(remainingApparel);
        if (sliderRef.current !== null) {
          sliderRef.current.slickGoTo(0, true);
        }
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
    <div className="max-w-screen">
      <main className="flex flex-col">
        {loadingPage && (
          <div className="flex items-center justify-center h-[80vh]">
            <span className="loading loading-spinner w-16 text-[#E50A14]"></span>
          </div>
        )}
        {!loadingPage && categories.length === 0 && <WardrobeHero />}
        {!loadingPage &&
          categories.length > 0 &&
          categories.map((category, index) => (
            <ApparelRow
              key={index}
              category={category}
              apparel={apparel}
              handleDelete={handleDelete}
              sliderRef={sliderRef}
              currentSlideIndex={currentSlideIndex}
              setCurrentSlideIndex={setCurrentSlideIndex}
            />
          ))}
      </main>
    </div>
  );
}

export default WardrobePage;
