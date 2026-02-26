import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        {/* HERO SECTION */}
        <div className="dashboard-hero">
          <div>
            <h1>
              Welcome back{user?.username ? `, ${user.username}` : ""} 👋
            </h1>
            <p>
              Build and manage your professional portfolio with ease.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/create-portfolio")}
          >
            Create Portfolio
          </button>
        </div>

        {/* ACTION CARDS */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Portfolio Type</h3>
            <p>Indicates the type selected by you.</p>
            {user?.portfolio_type ? (
              <p>
                Type: <span className="highlight">{user.portfolio_type}</span>
              </p>
            ) : (
              <p>No portfolio created yet.</p>
            )}
          </div>

          <div className="dashboard-card">
            <h3>Templates</h3>
            <p>Explore and choose from modern templates.</p>
            <button
              className="secondary-btn"
              onClick={() => navigate("/templates")}
            >
              Browse Templates
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Public View</h3>
            <p>Shows your current template.</p>
            {user?.portfolio_type ? (
              <button
                className="secondary-btn"
                onClick={() => navigate("/view")}
              >
                Preview Portfolio
              </button>
            ) : (
              <p>Create a portfolio to preview it.</p>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
