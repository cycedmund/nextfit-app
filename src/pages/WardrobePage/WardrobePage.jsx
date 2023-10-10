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
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const mainCategories = getUniqueCategories(apparel);

  useEffect(() => {
    if (mainCategories?.length > 0) {
      setLoading(false);
    }
  }, [mainCategories]);

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
        {loading && (
          <div className="flex items-center justify-center h-[80vh]">
            <span className="loading loading-spinner w-16 text-[#E50A14]"></span>
          </div>
        )}
        {!loading && mainCategories.length === 0 && <WardrobeHero />}
        {!loading &&
          mainCategories.length > 0 &&
          mainCategories.map((mainCategory, index) => (
            <ApparelRow
              key={index}
              mainCategory={mainCategory}
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
