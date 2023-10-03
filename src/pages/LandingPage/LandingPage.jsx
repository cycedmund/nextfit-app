import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <Link to="/login">Login</Link> <Link to="/signup">signup</Link>
    </div>
  );
}

export default LandingPage;
