import { Link } from "react-router-dom";

function WardrobeHero({ mainCategories }) {
  return (
    <div className="hero h-[80vh] bg-black">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-8">
            Start by adding to your wardrobe!
            <br />
            {mainCategories?.length === 1 ? (
              <small className="text-2xl font-medium">
                You&apos;ve only added{" "}
                <span className="text-emerald-400 text-2xl">
                  {mainCategories[0].toUpperCase()}
                </span>
                !
                <br />
                <span className="text-xl">
                  Add one more different main category to get started!
                </span>
              </small>
            ) : (
              <small className="text-2xl font-medium">
                Add at least one top and one bottom to start!
              </small>
            )}
          </h1>
          <Link to="/wardrobe/new">
            <button className="btn btn-ghost text-white text-2xl bg-[#E50A14] hover:bg-[#c11119] rounded-md normal-case">
              Start Your Journey
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WardrobeHero;
