import { Link } from "react-router-dom";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">
          Build Your Professional Portfolio <br /> in Minutes
        </h1>

        <p className="landing-subtitle">
          Create stunning fresher or experienced portfolios with multiple
          templates. Share your public link and stand out instantly.
        </p>

        <div className="landing-button-group">
          <Link to="/register" className="primary-btn">
            Get Started
          </Link>

          <Link to="/login" className="secondary-btn">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
