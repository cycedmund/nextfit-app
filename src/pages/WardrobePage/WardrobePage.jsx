import { useRef, useState } from "react";
import {
  deleteApparelService,
  swalBasicSettings,
} from "../../utilities/wardrobe-service";
import debug from "debug";
import ApparelRow from "../../components/ApparelRow/ApparelRow";
import Swal from "sweetalert2";

const log = debug("nextfit:src:pages:WardrobePage");

function WardrobePage({
  apparel,
  setApparel,
  handleUpdateWornFreq,
  mainCategories,
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleDelete = async (apparelID, mainCategory) => {
    const prompt = await Swal.fire({
      ...swalBasicSettings("Proceed to delete?", "warning"),
      text: "Your favourite outfit containing this apparel will also be deleted.",
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
        {mainCategories.map((mainCategory, index) => (
          <ApparelRow
            key={index}
            mainCategory={mainCategory}
            apparel={apparel}
            handleDelete={handleDelete}
            sliderRef={sliderRef}
            currentSlideIndex={currentSlideIndex}
            setCurrentSlideIndex={setCurrentSlideIndex}
            handleUpdateWornFreq={handleUpdateWornFreq}
          />
        ))}
      </main>
    </div>
  );
}

export default WardrobePage;
