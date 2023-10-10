import Weather from "../../components/Weather/Weather";
import Swal from "sweetalert2";
import {
  patchApparelFrequencyService,
  swalBasicSettings,
} from "../../utilities/wardrobe-service";

function HomePage({ apparel, setApparel }) {
  const handleUpdateWornFreq = async (outfitIDs) => {
    try {
      const { top, bottom } = await patchApparelFrequencyService(outfitIDs);
      const freqUpdate = apparel.map((item) => {
        if (top && top._id === item._id) {
          item.wornFrequency = top.wornFrequency;
        }
        if (bottom && bottom._id === item._id) {
          item.wornFrequency = bottom.wornFrequency;
        }
        return item;
      });
      setApparel(freqUpdate);
      Swal.fire({
        ...swalBasicSettings("Updated!", "success"),
        text: "Thank you for reusing your clothes!",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        ...swalBasicSettings("Error", "error"),
        text: "Something went wrong",
      });
    }
  };
  return (
    <>
      <h1 className="ml-24 mt-6 text-2xl">My Wardrobe</h1>
      <Weather apparel={apparel} handleUpdateWornFreq={handleUpdateWornFreq} />
    </>
  );
}

export default HomePage;
