// src/pages/ViewPortfolio.jsx
import { useState, useEffect } from "react";
import { Spin, message } from "antd";
import axios from "axios";
import Navbar from "../components/Navbar";
import TemplateFresherModern from "../templates/fresher/TemplateFresherModern";
import TemplateFresherCreative from "../templates/fresher/TemplateFresherCreative";
import TemplateFresherProfessional from "../templates/fresher/TemplateFresherProfessional";
import ExperiencedExecutive from "../templates/experienced/ExperiencedExecutive";
import ExperiencedInnovative from "../templates/experienced/ExperiencedInnovative";
import ExperiencedStory from "../templates/experienced/ExperiencedStory";
// Add imports for other templates when you create them
// import TemplateFresherCreative from "../templates/TemplateFresherCreative";
// etc.

const PORTFOLIO_API = "https://personalized-portfolio-generator.onrender.com/api/portfolio";

const ViewPortfolio = () => {
  const [userData, setUserData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Please log in to view your portfolio");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(PORTFOLIO_API, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.data || res.data;

        if (data) {
          setUserData(data);
          // Also update localStorage for future use (optional but good)
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          setError("No portfolio data found");
        }
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
        setError("Could not load portfolio. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // Get selected template from localStorage
    const storedTemplate = localStorage.getItem("selectedTemplate");
    if (storedTemplate) {
      setSelectedTemplate(storedTemplate);
    }

    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "150px 20px" }}>
        <Spin size="large" />
        <p style={{ marginTop: 20, fontSize: "1.2rem" }}>Loading your portfolio...</p>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "120px 20px" }}>
          <h2>{error || "No portfolio found"}</h2>
          <p>Please create or update your portfolio first.</p>
        </div>
      </>
    );
  }

  // Render selected template with fresh API data
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "fresher-modern":
        return <TemplateFresherModern user={userData} />;
      // Add more cases when you create other templates
      case "fresher-creative":
        return <TemplateFresherCreative user={userData} />;

      case "fresher-professional":
        return <TemplateFresherProfessional user={userData} />;

      case "experienced-executive":
        return <ExperiencedExecutive user={userData} />;

      case "experienced-innovative":
        return <ExperiencedInnovative user={userData} />;

      case "experienced-story":
        return <ExperiencedStory user={userData} />;

      default:
        return (
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <h2>No template selected</h2>
            <p>Please go back to template selection and choose one.</p>
          </div>
        );
    }
  };

  return (
    <>
      <Navbar />
      {renderTemplate()}
    </>
  );
};

export default ViewPortfolio;