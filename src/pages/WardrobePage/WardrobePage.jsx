import { useEffect, useRef, useState } from "react";
import {
  deleteApparelService,
  getAllApparelService,
  getUniqueCategories,
  swalBasicSettings,
} from "../../utilities/wardrobe-service";
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
        {categories.length !== 0 ? (
          categories.map((category, index) => {
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
          })
        ) : (
          <div className="hero h-[80vh] bg-black">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold mb-8">
                  Start by adding to your wardrobe!
                </h1>
                <Link to="/wardrobe/new">
                  <button className="btn btn-ghost text-white text-2xl bg-[#E50A14] hover:bg-[#c11119] rounded-md normal-case">
                    Start Your Journey
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default WardrobePage;
