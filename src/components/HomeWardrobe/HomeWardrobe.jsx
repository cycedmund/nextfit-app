import { Link } from "react-router-dom";
import { getUniqueCategories } from "../../utilities/wardrobe-service";

export default function HomeWardrobe({ apparel }) {
    const categories = getUniqueCategories(apparel);

    return (
        <>
        <h1 className="ml-24 mt-6 text-2xl">My Wardrobe</h1>
        <div className="ml-24 mt-6 -mb-10">
        <Link to={`/wardrobe/#${categories[0]}`}><img className="w-66 h-48 rounded inline cursor-pointer" src="/assets/tops-category.jpg" /></Link>
        <Link to={`/wardrobe/#${categories[1]}`}><img className="w-72 h-48 ml-5 rounded inline cursor-pointer" src="/assets/bottoms-category.jpg" /></Link>
        </div>
        </>
    )
}