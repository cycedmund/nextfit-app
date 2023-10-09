import Weather from "../../components/Weather/Weather";
import Swal from "sweetalert2";
import {
  patchApparelFrequencyService,
  swalBasicSettings,
} from "../../utilities/wardrobe-service";

function HomePage() {
  const handleUpdateWornFreq = async (outfitIDs) => {
    try {
      await patchApparelFrequencyService(outfitIDs);
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
      <Weather handleUpdateWornFreq={handleUpdateWornFreq} />
    </>
  );
}

export default HomePage;
