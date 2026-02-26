// src/pages/Template.jsx
import { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  FaUserTie, 
  FaLaptopCode, 
  FaBriefcase, 
  FaRocket, 
  FaChartLine, 
  FaGraduationCap 
} from "react-icons/fa";
import "../styles/template.css";

const Template = () => {
  const [userData, setUserData] = useState(null);
  const [portfolioType, setPortfolioType] = useState(null);
  const navigate = useNavigate();

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserData(parsed);
        setPortfolioType(parsed.portfolio_type);
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
      }
    }
  }, []);

  // Handle template selection
  const handleSelectTemplate = (templateName) => {
    // Save the selected template name to localStorage
    // (you can later use this in the View page to render the chosen layout)
    localStorage.setItem("selectedTemplate", templateName);

    message.success({
      content: "Your portfolio is ready! Go to view tab.",
      duration: 3,
      style: { marginTop: "10vh" },
    });

    // Optional: auto-redirect to view page after a short delay
    setTimeout(() => {
      navigate("/view"); // ← adjust this route name if different
    }, 1500);
  };

  // Determine what to show based on portfolio_type from localStorage
  const showFresherTemplates = portfolioType === "fresher";
  const showExperiencedTemplates = portfolioType === "experienced";

  // If no portfolio type is found → show a fallback message
  if (!portfolioType) {
    return (
      <>
        <Navbar />
        <div className="template-container">
          <div className="template-header">
            <h1>No Portfolio Found</h1>
            <p>Please create your portfolio first in the Create section.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="template-container">
        <div className="template-header">
          <h1>Choose Your Portfolio Template</h1>
          <p>
            Select a modern, professional design that best matches your career stage
          </p>
        </div>

        <div className="templates-grid">
          {showFresherTemplates && (
            <>
              {/* Fresher Templates */}
              <div 
                className="template-card"
                onClick={() => handleSelectTemplate("fresher-modern")}
              >
                <div className="template-preview">
                  <FaGraduationCap size={80} color="#3b82f6" />
                </div>
                <div className="template-info">
                  <h3>Modern Clean</h3>
                  <p>Minimal, elegant and tech-focused layout</p>
                  <button className="select-btn">Select Template</button>
                </div>
              </div>

              <div 
                className="template-card"
                onClick={() => handleSelectTemplate("fresher-creative")}
              >
                <div className="template-preview">
                  <FaLaptopCode size={80} color="#8b5cf6" />
                </div>
                <div className="template-info">
                  <h3>Creative Spark</h3>
                  <p>Bold colors with dynamic project showcase</p>
                  <button className="select-btn">Select Template</button>
                </div>
              </div>

              <div 
                className="template-card"
                onClick={() => handleSelectTemplate("fresher-professional")}
              >
                <div className="template-preview">
                  <FaUserTie size={80} color="#2563eb" />
                </div>
                <div className="template-info">
                  <h3>Professional Edge</h3>
                  <p>Clean corporate style with strong typography</p>
                  <button className="select-btn">Select Template</button>
                </div>
              </div>
            </>
          )}

          {showExperiencedTemplates && (
            <>
              {/* Experienced Templates */}
              <div 
                className="template-card"
                onClick={() => handleSelectTemplate("experienced-executive")}
              >
                <div className="template-preview">
                  <FaBriefcase size={80} color="#1e40af" />
                </div>
                <div className="template-info">
                  <h3>Executive</h3>
                  <p>Premium, authoritative corporate design</p>
                  <button className="select-btn">Select Template</button>
                </div>
              </div>

              <div 
                className="template-card"
                onClick={() => handleSelectTemplate("experienced-innovative")}
              >
                <div className="template-preview">
                  <FaRocket size={80} color="#059669" />
                </div>
                <div className="template-info">
                  <h3>Innovative Leader</h3>
                  <p>Modern layout with strong visual hierarchy</p>
                  <button className="select-btn">Select Template</button>
                </div>
              </div>

              <div 
                className="template-card"
                onClick={() => handleSelectTemplate("experienced-story")}
              >
                <div className="template-preview">
                  <FaChartLine size={80} color="#7c3aed" />
                </div>
                <div className="template-info">
                  <h3>Career Story</h3>
                  <p>Timeline-focused narrative experience layout</p>
                  <button className="select-btn">Select Template</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Template;
