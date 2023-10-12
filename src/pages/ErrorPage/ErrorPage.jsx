import { PiAirplaneInFlightDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <main className="w-full h-[80vh] flex flex-col justify-center items-center bg-black">
      <h1 className="text-7xl font-medium text-white mb-7">
        Are you in Lost Angeles?
      </h1>
      <div className="bg-[#E50A14] p-2 text-2xl rounded text-white">
        Don&apos;t be afraid. Take the flight back below!
      </div>
      <button className="mt-5">
        <section className="relative inline-block text-sm font-medium text-white group active:text-white focus:outline-none focus:ring">
          <span className="px-5 py-3">
            <Link to="/">
              <PiAirplaneInFlightDuotone className="text-7xl hover:fill-[#E50A14]" />
            </Link>
          </span>
        </section>
      </button>
    </main>
  );
}

export default ErrorPage;
