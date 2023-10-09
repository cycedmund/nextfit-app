import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <span className="absolute top-4 left-4 md:left-28">
        <img className="w-28 h-10" src="/assets/nextfitlogobig.png" />
      </span>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url('../../../public/assets/nextfit-background.jpeg')",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold text-white">
              Unlimited choices of outfits based on your closet pieces
            </h1>
            <p className="mb-5 text-white text-xl">
              Go anywhere with our outfits.
            </p>
            <Link to="/signup">
              <button className="btn btn-ghost text-white text-2xl bg-[#E50A14] hover:bg-[#c11119] rounded-md normal-case">
                Get Started {">"}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Link to="/login">
        <span className="text-white text-md btn btn-ghost btn-sm bg-[#E50A14] hover:bg-[#c11119] rounded-md absolute top-4 right-4 md:right-28 normal-case">
          Sign In
        </span>
      </Link>
    </>
  );
}

export default LandingPage;
