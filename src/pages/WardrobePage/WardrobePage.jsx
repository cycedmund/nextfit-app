import { useEffect, useState } from "react";
import { getAllApparelService } from "../../utilities/wardrobe-service";
import { LuPlusSquare } from "react-icons/lu";
import debug from "debug";
import { Link } from "react-router-dom";
import ApparelRow from "../../components/ApparelRow/ApparelRow";

const log = debug("nextfit:src:pages:WardrobePage");

//* <---- Helper Function ---->
function getUniqueCategories(apparel) {
  if (apparel.length === 0) {
    return [];
  }
  const categories = [...new Set(apparel.map((item) => item.category))];
  log("get categories:", categories);
  return categories;
}

function WardrobePage() {
  const [apparel, setApparel] = useState([]);

  useEffect(() => {
    const fetchApparelData = async () => {
      const allApparel = await getAllApparelService();
      log(allApparel);
      setApparel(allApparel);
    };
    fetchApparelData();
  }, []);

  const categories = getUniqueCategories(apparel);

  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <header className="flex mx-4 mb-4 font-bebas text-3xl tracking-wider justify-between">
        <h1>My Wardrobe</h1>
        <Link
          to="/wardrobe/apparel/new"
          className="flex items-center justify-center"
        >
          <LuPlusSquare className="text-4xl" />
          <span className="font-inter font-semibold tracking-normal text-xl">
            Add Apparel
          </span>
        </Link>
      </header>
      <main className="flex flex-col">
        {categories.map((category, index) => {
          return (
            <ApparelRow key={index} category={category} apparel={apparel} />
          );
        })}
      </main>
    </div>
  );
}

export default WardrobePage;
