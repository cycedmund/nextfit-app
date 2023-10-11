import Weather from "../../components/Weather/Weather";

function HomePage({ apparel, handleUpdateWornFreq }) {
  return (
    <>
      <h1 className="ml-24 mt-6 text-2xl">My Wardrobe</h1>
      <Weather apparel={apparel} handleUpdateWornFreq={handleUpdateWornFreq} />
    </>
  );
}

export default HomePage;
