import { useEffect, useRef, useState } from "react";
import {
  deleteApparelService,
  getAllApparelService,
  getUniqueCategories,
  swalBasicSettings,
} from "../../utilities/wardrobe-service";
import { LuPlusSquare } from "react-icons/lu";
import { PiPantsLight, PiTShirtLight } from "react-icons/pi";
import debug from "debug";
import { Link } from "react-router-dom";
import ApparelRow from "../../components/ApparelRow/ApparelRow";
import Swal from "sweetalert2";

const log = debug("nextfit:src:pages:WardrobePage");

function WardrobePage() {
  const [apparel, setApparel] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchApparelData = async () => {
      const allApparel = await getAllApparelService();
      log("fetch all apparel:", allApparel);
      setApparel(allApparel);
    };
    fetchApparelData();
  }, []);

  const categories = getUniqueCategories(apparel);

  const handleDelete = async (apparelID) => {
    const prompt = await Swal.fire({
      ...swalBasicSettings("Proceed to delete?", "warning"),
      showCancelButton: true,
      confirmButtonText: "DELETE",
      cancelButtonText: "CANCEL",
    });

    if (prompt.isConfirmed) {
      try {
        await deleteApparelService(apparelID);
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
        // // console.log(sliderRef.current.innerSlider.state.currentSlide);
        // if (currentSlideIndex <= 5) {
        //   sliderRef.current.slickGoTo(0);
        // }
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
    <div className="mx-auto max-w-screen-xl p-4">
      <header className="flex mx-4 mb-4 justify-end items-center">
        <PiTShirtLight className="text-3xl" />
        <Link to="/wardrobe/new" className="flex items-center justify-center">
          <LuPlusSquare className="text-4xl" />
        </Link>
        <PiPantsLight className="text-3xl" />
      </header>
      <main className="flex flex-col">
        {categories.map((category, index) => {
          return (
            <ApparelRow
              key={index}
              category={category}
              apparel={apparel}
              handleDelete={handleDelete}
              sliderRef={sliderRef}
              currentSlideIndex={currentSlideIndex}
              setCurrentSlideIndex={setCurrentSlideIndex}
            />
          );
        })}
      </main>
    </div>
  );
}

export default WardrobePage;
