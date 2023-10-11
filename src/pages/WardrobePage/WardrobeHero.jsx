import { Link } from "react-router-dom";

function WardrobeHero() {
  return (
    <div className="hero h-[80vh] bg-black">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-8">
            Start by adding to your wardrobe!
            <br />
            <small className="text-xl font-medium">
              Add at least 2 tops and 2 bottoms to start!
            </small>
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
