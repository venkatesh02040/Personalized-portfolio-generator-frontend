import { useState, useEffect } from "react";
import { message, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Uncomment if using react-router
import Navbar from "../components/Navbar";
import "../styles/createPortfolio.css";

const PORTFOLIO_API =
  "https://personalized-portfolio-generator.onrender.com/api/portfolio";
const PROFILE_UPLOAD_API =
  "https://personalized-portfolio-generator.onrender.com/api/upload/profile-image";
const PROJECT_UPLOAD_API =
  "https://personalized-portfolio-generator.onrender.com/api/upload/project-image";

const CreatePortfolio = () => {
  const [portfolioType, setPortfolioType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasExistingPortfolio, setHasExistingPortfolio] = useState(false);
  const [existingType, setExistingType] = useState(null);

  // Check localStorage for existing portfolio on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.portfolio_type === "fresher" || user.portfolio_type === "experienced") {
          setHasExistingPortfolio(true);
          setExistingType(user.portfolio_type);
        }
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
  }, []);

  // IMPORTANT: formData state MUST be declared BEFORE any helper functions that use it
  const [formData, setFormData] = useState({
    profile_image_url: "",
    social_links: {
      github: "",
      linkedin: "",
      twitter: "",
      facebook: "",
    },
    certifications: [
      { title: "", issuer: "", issue_date: "", certificate_pdf_url: "" },
    ],
    education: [{ degree: "", institution: "", graduation_year: "" }],
    skills: [{ name: "", level: "" }],
    projects: [
      {
        title: "",
        description: "",
        technologies: "",
        project_link: "",
        image_url: "",
      },
    ],
    experience: [
      {
        role: "",
        company: "",
        start_date: "",
        end_date: "",
        description: "",
      },
    ],
  });

  const navigate = useNavigate(); // Uncomment if using react-router for login redirect

  // ────────────────────────────────────────────────
  //  Token Helper
  // ────────────────────────────────────────────────
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Please log in to continue");
      // navigate("/login"); // Uncomment if using react-router
      return {};
    }
    return { Authorization: `Bearer ${token}` };
  };

  // ────────────────────────────────────────────────
  //  Upload Helpers – with token
  // ────────────────────────────────────────────────
  const uploadProfileImage = async (file) => {
    const authHeader = getAuthHeader();
    if (!authHeader.Authorization) return null;

    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await axios.post(PROFILE_UPLOAD_API, fd, {
        headers: {
          ...authHeader,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.image_url;
    } catch (err) {
      if (err.response?.status === 401) {
        message.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        // navigate("/login");
      } else {
        message.error("Failed to upload profile image");
      }
      throw err;
    }
  };

  const uploadProjectImage = async (file) => {
    const authHeader = getAuthHeader();
    if (!authHeader.Authorization) return null;

    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await axios.post(PROJECT_UPLOAD_API, fd, {
        headers: {
          ...authHeader,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.image_url;
    } catch (err) {
      if (err.response?.status === 401) {
        message.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        // navigate("/login");
      } else {
        message.error("Failed to upload project image");
      }
      throw err;
    }
  };

  // ────────────────────────────────────────────────
  //  Array helpers (now safe – after formData declaration)
  // ────────────────────────────────────────────────
  const updateArrayField = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const addItem = (section, emptyItem) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], emptyItem],
    });
  };

  const removeItem = (section, index) => {
    if (formData[section].length <= 1) return;
    setFormData({
      ...formData,
      [section]: formData[section].filter((_, i) => i !== index),
    });
  };

  // ────────────────────────────────────────────────
  //  Validation
  // ────────────────────────────────────────────────
  const validateForm = () => {
    if (!portfolioType) {
      message.error("Please select portfolio type");
      return false;
    }
    if (!formData.profile_image_url) {
      message.error("Profile picture is required");
      return false;
    }

    if (!formData.education.some((e) => e.degree.trim() && e.institution.trim() && e.graduation_year)) {
      message.error("At least one complete education entry is required");
      return false;
    }

    if (!formData.skills.some((s) => s.name.trim() && s.level)) {
      message.error("At least one skill with name and level is required");
      return false;
    }

    if (!formData.projects.some((p) => p.title.trim() && p.description.trim() && p.technologies.trim() && p.project_link.trim() && p.image_url)) {
      message.error("At least one complete project (with image) is required");
      return false;
    }

    if (portfolioType === "experienced") {
      if (!formData.experience.some((ex) => ex.role.trim() && ex.company.trim() && ex.start_date && ex.description.trim())) {
        message.error("At least one complete work experience entry is required");
        return false;
      }
    }

    if (!formData.certifications.some((c) => c.title.trim() && c.issuer.trim() && c.issue_date)) {
      message.error("At least one complete certification is required");
      return false;
    }

    if (!formData.social_links.github.trim() && !formData.social_links.linkedin.trim()) {
      message.error("At least GitHub or LinkedIn profile is required");
      return false;
    }

    return true;
  };

  // ────────────────────────────────────────────────
  //  Submit – with token
  // ────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const authHeader = getAuthHeader();
    if (!authHeader.Authorization) return;

    const cleanArray = (arr, requiredFields) =>
      arr.filter((item) =>
        requiredFields.every((f) => item[f]?.toString().trim() !== "")
      );

    const payload = {
      portfolio_type: portfolioType,
      profile_image_url: formData.profile_image_url,
      social_links: formData.social_links,
      certifications: cleanArray(formData.certifications, ["title", "issuer", "issue_date"]),
      [portfolioType]: {
        education: cleanArray(formData.education, ["degree", "institution", "graduation_year"]),
        skills: cleanArray(formData.skills, ["name", "level"]),
        projects: formData.projects
          .filter((p) => p.title.trim() && p.description.trim() && p.technologies.trim() && p.project_link.trim() && p.image_url)
          .map((p) => ({
            ...p,
            technologies: p.technologies
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          })),
        ...(portfolioType === "experienced" && {
          experience: cleanArray(formData.experience, ["role", "company", "start_date", "description"]),
        }),
      },
    };

    try {
      setLoading(true);
      await axios.post(PORTFOLIO_API, payload, {
        headers: {
          ...authHeader,
          "Content-Type": "application/json",
        },
      });
      message.success("Portfolio created successfully!");
      // Optional: reset form or redirect
      // setFormData(initialFormData); // if you want to reset
    } catch (err) {
      console.error("Portfolio creation error:", err);
      if (err.response?.status === 401) {
        message.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        // navigate("/login");
      } else {
        message.error(err.response?.data?.message || "Failed to create portfolio");
      }
    } finally {
      setLoading(false);
    }
  };

  // ────────────────────────────────────────────────
  //  JSX Render
  // ────────────────────────────────────────────────
  return (
    <>
      <Navbar />

      <div className="create-portfolio-container">
        <h2>Create Your Portfolio</h2>

        {hasExistingPortfolio ? (
          <div style={{
            textAlign: "center",
            padding: "40px 20px",
            background: "#fefce8",
            borderRadius: "12px",
            border: "1px solid #fef08a",
            maxWidth: "600px",
            margin: "0 auto 40px"
          }}>
            <h3 style={{ color: "#854d0e", marginBottom: "16px" }}>
              You already have a portfolio!
            </h3>
            <p style={{ fontSize: "1.1rem", color: "#713f12" }}>
              You already have a portfolio under <strong>{existingType === "fresher" ? "Fresher" : "Experienced"}</strong>.<br />
              Please go to the <strong>Edit Portfolio</strong> page to make changes or update it.
            </p>
            <button
              onClick={() => navigate("/edit-portfolio")} // ← adjust route if different
              style={{
                marginTop: "24px",
                padding: "12px 32px",
                fontSize: "1.1rem",
                background: "#854d0e",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Go to Edit Portfolio
            </button>
          </div>
        ) : (
          <>
            <div className="portfolio-type">
              <button
                type="button"
                className={portfolioType === "fresher" ? "active" : ""}
                onClick={() => setPortfolioType("fresher")}
              >
                Fresher
              </button>
              <button
                type="button"
                className={portfolioType === "experienced" ? "active" : ""}
                onClick={() => setPortfolioType("experienced")}
              >
                Experienced
              </button>
            </div>

            {portfolioType && (
              <div className="form-sections">
                {/* Profile Picture */}
                <section>
                  <label>
                    Profile Picture <span className="required">*</span>
                  </label>
                  <input
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      color: " #111827",
                      background: "#ffffff",
                      transition: "all 0.2s"
                    }}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const url = await uploadProfileImage(file);
                        if (url) {
                          setFormData({ ...formData, profile_image_url: url });
                          message.success("Profile image uploaded");
                        }
                      } catch (err) {
                        // error handled in upload function
                      }
                    }}
                  />
                  {formData.profile_image_url && (
                    <img
                      src={formData.profile_image_url}
                      alt="preview"
                      className="preview-img"
                    />
                  )}
                </section>

                {/* Social Links */}
                <section>
                  <h3>Social Links</h3>
                  <div className="grid-2">
                    <div>
                      <label>GitHub URL <span className="required">*</span></label>
                      <input
                        placeholder="https://github.com/username"
                        value={formData.social_links.github}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            social_links: { ...formData.social_links, github: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>LinkedIn URL <span className="required">*</span></label>
                      <input
                        placeholder="https://linkedin.com/in/username"
                        value={formData.social_links.linkedin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            social_links: { ...formData.social_links, linkedin: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>Twitter / X URL <span className="required">*</span></label>
                      <input
                        placeholder="https://twitter.com/username"
                        value={formData.social_links.twitter}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            social_links: { ...formData.social_links, twitter: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>Facebook URL <span className="required">*</span></label>
                      <input
                        placeholder="https://facebook.com/username"
                        value={formData.social_links.facebook}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            social_links: { ...formData.social_links, facebook: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h3>Education</h3>
                  {formData.education.map((edu, i) => (
                    <div key={i} className="repeat-card">
                      <label>Degree <span className="required">*</span></label>
                      <input
                        placeholder="B.Tech / BCA / M.Sc ..."
                        value={edu.degree}
                        onChange={(e) => updateArrayField("education", i, "degree", e.target.value)}
                      />
                      <label>Institution <span className="required">*</span></label>
                      <input
                        placeholder="University / College name"
                        value={edu.institution}
                        onChange={(e) => updateArrayField("education", i, "institution", e.target.value)}
                      />
                      <label>Graduation Year <span className="required">*</span></label>
                      <input
                        type="number"
                        placeholder="2023"
                        value={edu.graduation_year}
                        onChange={(e) => updateArrayField("education", i, "graduation_year", e.target.value)}
                      />
                      <button type="button" className="remove-btn" onClick={() => removeItem("education", i)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() =>
                      addItem("education", { degree: "", institution: "", graduation_year: "" })
                    }
                  >
                    + Add Education
                  </button>
                </section>

                {/* Skills */}
                <section>
                  <h3>Skills</h3>
                  {formData.skills.map((skill, i) => (
                    <div key={i} className="repeat-card flex">
                      <div style={{ flex: 1 }}>
                        <label>Skill Name <span className="required">*</span></label>
                        <input
                          placeholder="React / Node.js / Python ..."
                          value={skill.name}
                          onChange={(e) => updateArrayField("skills", i, "name", e.target.value)}
                        />
                      </div>
                      <div style={{ width: "160px" }}>
                        <label>Level (1–10) <span className="required">*</span></label>
                        <select
                          value={skill.level}
                          onChange={(e) => updateArrayField("skills", i, "level", e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                      <button type="button" className="remove-btn" onClick={() => removeItem("skills", i)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => addItem("skills", { name: "", level: "" })}
                  >
                    + Add Skill
                  </button>
                </section>

                {/* Certifications */}
                <section>
                  <h3>Certifications</h3>
                  {formData.certifications.map((cert, i) => (
                    <div key={i} className="repeat-card">
                      <label>Certification Title <span className="required">*</span></label>
                      <input
                        placeholder="AWS Certified Developer ..."
                        value={cert.title}
                        onChange={(e) => updateArrayField("certifications", i, "title", e.target.value)}
                      />
                      <label>Issuer <span className="required">*</span></label>
                      <input
                        placeholder="Coursera / Udemy / AWS ..."
                        value={cert.issuer}
                        onChange={(e) => updateArrayField("certifications", i, "issuer", e.target.value)}
                      />
                      <label>Issue Date <span className="required">*</span></label>
                      <input
                        type="date"
                        value={cert.issue_date}
                        onChange={(e) => updateArrayField("certifications", i, "issue_date", e.target.value)}
                      />
                      <label>Certificate URL / PDF Link</label>
                      <input
                        placeholder="https://coursera.org/verify/..."
                        value={cert.certificate_pdf_url}
                        onChange={(e) =>
                          updateArrayField("certifications", i, "certificate_pdf_url", e.target.value)
                        }
                      />
                      <button type="button" className="remove-btn" onClick={() => removeItem("certifications", i)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() =>
                      addItem("certifications", {
                        title: "",
                        issuer: "",
                        issue_date: "",
                        certificate_pdf_url: "",
                      })
                    }
                  >
                    + Add Certification
                  </button>
                </section>

                {/* Projects */}
                <section>
                  <h3>Projects</h3>
                  {formData.projects.map((proj, i) => (
                    <div key={i} className="repeat-card">
                      <label>Project Title <span className="required">*</span></label>
                      <input
                        placeholder="E-commerce Platform / Task Manager ..."
                        value={proj.title}
                        onChange={(e) => updateArrayField("projects", i, "title", e.target.value)}
                      />
                      <label>Description <span className="required">*</span></label>
                      <textarea
                        placeholder="Built a full-stack application using ..."
                        value={proj.description}
                        onChange={(e) => updateArrayField("projects", i, "description", e.target.value)}
                      />
                      <label>Technologies (comma separated) <span className="required">*</span></label>
                      <input
                        placeholder="React, Node.js, MongoDB ..."
                        value={proj.technologies}
                        onChange={(e) => updateArrayField("projects", i, "technologies", e.target.value)}
                      />
                      <label>Project Link <span className="required">*</span></label>
                      <input
                        placeholder="https://github.com/username/project ..."
                        value={proj.project_link}
                        onChange={(e) => updateArrayField("projects", i, "project_link", e.target.value)}
                      />
                      <label>Project Image <span className="required">*</span></label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const url = await uploadProjectImage(file);
                            if (url) {
                              updateArrayField("projects", i, "image_url", url);
                              message.success("Project image uploaded");
                            }
                          } catch (err) {
                            // error handled in upload function
                          }
                        }}
                      />
                      {proj.image_url && (
                        <img src={proj.image_url} alt="preview" className="preview-img" />
                      )}
                      <button type="button" className="remove-btn" onClick={() => removeItem("projects", i)}>
                        Remove Project
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() =>
                      addItem("projects", {
                        title: "",
                        description: "",
                        technologies: "",
                        project_link: "",
                        image_url: "",
                      })
                    }
                  >
                    + Add Project
                  </button>
                </section>

                {/* Experience */}
                {portfolioType === "experienced" && (
                  <section>
                    <h3>Work Experience</h3>
                    {formData.experience.map((exp, i) => (
                      <div key={i} className="repeat-card">
                        <label>Role / Position <span className="required">*</span></label>
                        <input
                          placeholder="Backend Developer / Full Stack Engineer ..."
                          value={exp.role}
                          onChange={(e) => updateArrayField("experience", i, "role", e.target.value)}
                        />
                        <label>Company Name <span className="required">*</span></label>
                        <input
                          placeholder="Tech Solutions Pvt Ltd ..."
                          value={exp.company}
                          onChange={(e) => updateArrayField("experience", i, "company", e.target.value)}
                        />
                        <div className="flex dates">
                          <div>
                            <label>Start Date <span className="required">*</span></label>
                            <input
                              type="date"
                              value={exp.start_date}
                              onChange={(e) => updateArrayField("experience", i, "start_date", e.target.value)}
                            />
                          </div>
                          <div>
                            <label>End Date</label>
                            <input
                              type="date"
                              value={exp.end_date}
                              onChange={(e) => updateArrayField("experience", i, "end_date", e.target.value)}
                            />
                          </div>
                        </div>
                        <label>Description <span className="required">*</span></label>
                        <textarea
                          placeholder="Developed and maintained REST APIs ..."
                          value={exp.description}
                          onChange={(e) => updateArrayField("experience", i, "description", e.target.value)}
                        />
                        <button type="button" className="remove-btn" onClick={() => removeItem("experience", i)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-btn"
                      onClick={() =>
                        addItem("experience", {
                          role: "",
                          company: "",
                          start_date: "",
                          end_date: "",
                          description: "",
                        })
                      }
                    >
                      + Add Experience
                    </button>
                  </section>
                )}

                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spin size="small" /> Saving...
                    </>
                  ) : (
                    "Create Portfolio"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CreatePortfolio;