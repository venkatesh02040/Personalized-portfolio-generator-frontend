// src/pages/EditPortfolio.jsx

import { useState, useEffect } from "react";
import { message, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/editPortfolio.css";

const PORTFOLIO_API = "https://personalized-portfolio-generator.onrender.com/api/portfolio";
const PROFILE_UPLOAD_API = "https://personalized-portfolio-generator.onrender.com/api/upload/profile-image";
const PROJECT_UPLOAD_API = "https://personalized-portfolio-generator.onrender.com/api/upload/project-image";

const EditPortfolio = () => {
    const [portfolioType, setPortfolioType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [userInfo, setUserInfo] = useState({
        username: "",
        phone_number: "",
        gmail: "",
    });

    const [formData, setFormData] = useState({
        profile_image_url: "",
        social_links: {
            github: "",
            linkedin: "",
            twitter: "",
            facebook: "",
        },
        certifications: [{ title: "", issuer: "", issue_date: "", certificate_pdf_url: "" }],
        education: [{ degree: "", institution: "", graduation_year: "" }],
        skills: [{ name: "", level: "" }],
        projects: [{ title: "", description: "", technologies: "", project_link: "", image_url: "" }],
        experience: [{ role: "", company: "", start_date: "", end_date: "", description: "" }],
    });

    const navigate = useNavigate();

    // ────────────────────────────────────────────────
    //  Token Helper
    // ────────────────────────────────────────────────
    const getAuthHeader = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            message.error("Please log in to continue");
            // navigate("/login");
            return {};
        }
        return { Authorization: `Bearer ${token}` };
    };

    // ────────────────────────────────────────────────
    //  Fetch existing portfolio + user info
    // ────────────────────────────────────────────────
    useEffect(() => {
        const fetchData = async () => {
            const authHeader = getAuthHeader();
            if (!authHeader.Authorization) {
                setFetching(false);
                return;
            }

            try {
                setFetching(true);
                const res = await axios.get(PORTFOLIO_API, { headers: authHeader });

                const data = res.data.data || res.data;

                // Set user info
                setUserInfo({
                    username: data.username || "",
                    phone_number: data.phone_number || "",
                    gmail: data.gmail || "",
                });

                // Set portfolio type
                setPortfolioType(data.portfolio_type);

                // Convert technologies array → comma-separated string
                const projectsWithStringTech = (data[data.portfolio_type]?.projects || []).map((p) => ({
                    ...p,
                    technologies: Array.isArray(p.technologies) ? p.technologies.join(", ") : p.technologies || "",
                }));

                // Fix for certifications: extract only YYYY-MM-DD from issue_date
                const fixedCertifications = (data.certifications || []).map(cert => ({
                    ...cert,
                    issue_date: cert.issue_date
                        ? new Date(cert.issue_date).toISOString().split('T')[0]
                        : ""
                }));

                // Fix for experience: extract only YYYY-MM-DD from start_date and end_date
                const fixedExperience = (data[data.portfolio_type]?.experience || []).map(exp => ({
                    ...exp,
                    start_date: exp.start_date
                        ? new Date(exp.start_date).toISOString().split('T')[0]
                        : "",
                    end_date: exp.end_date
                        ? new Date(exp.end_date).toISOString().split('T')[0]
                        : ""
                }));

                setFormData({
                    profile_image_url: data.profile_image_url || "",
                    social_links: {
                        github: data.social_links?.github || "",
                        linkedin: data.social_links?.linkedin || "",
                        twitter: data.social_links?.twitter || "",
                        facebook: data.social_links?.facebook || "",
                    },
                    certifications: fixedCertifications.length > 0 ? fixedCertifications : formData.certifications,
                    education: data[data.portfolio_type]?.education?.length > 0
                        ? data[data.portfolio_type].education
                        : formData.education,
                    skills: data[data.portfolio_type]?.skills?.length > 0
                        ? data[data.portfolio_type].skills
                        : formData.skills,
                    projects: projectsWithStringTech.length > 0 ? projectsWithStringTech : formData.projects,
                    experience: fixedExperience.length > 0 ? fixedExperience : formData.experience,
                });
            } catch (err) {
                console.error("Failed to load data:", err);
                message.error("Could not load your data. Please try again.");
            } finally {
                setFetching(false);
            }
        };

        fetchData();
    }, []);

    // ────────────────────────────────────────────────
    //  Upload helpers
    // ────────────────────────────────────────────────
    const uploadProfileImage = async (file) => {
        const authHeader = getAuthHeader();
        if (!authHeader.Authorization) return null;

        const fd = new FormData();
        fd.append("image", file);

        try {
            const res = await axios.post(PROFILE_UPLOAD_API, fd, {
                headers: { ...authHeader, "Content-Type": "multipart/form-data" },
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
            return null;
        }
    };

    const uploadProjectImage = async (file) => {
        const authHeader = getAuthHeader();
        if (!authHeader.Authorization) return null;

        const fd = new FormData();
        fd.append("image", file);

        try {
            const res = await axios.post(PROJECT_UPLOAD_API, fd, {
                headers: { ...authHeader, "Content-Type": "multipart/form-data" },
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
            return null;
        }
    };

    // ────────────────────────────────────────────────
    //  Array helpers
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
        if (!formData.education.some((e) => e.degree?.trim() && e.institution?.trim() && e.graduation_year)) {
            message.error("At least one complete education entry is required");
            return false;
        }
        if (!formData.skills.some((s) => s.name?.trim() && s.level)) {
            message.error("At least one skill with name and level is required");
            return false;
        }
        if (!formData.projects.some((p) => p.title?.trim() && p.description?.trim() && p.technologies?.trim() && p.project_link?.trim() && p.image_url)) {
            message.error("At least one complete project (with image) is required");
            return false;
        }
        if (portfolioType === "experienced") {
            if (!formData.experience.some((ex) => ex.role?.trim() && ex.company?.trim() && ex.start_date && ex.description?.trim())) {
                message.error("At least one complete work experience entry is required");
                return false;
            }
        }
        if (!formData.certifications.some((c) => c.title?.trim() && c.issuer?.trim() && c.issue_date)) {
            message.error("At least one complete certification is required");
            return false;
        }
        if (!formData.social_links.github?.trim() && !formData.social_links.linkedin?.trim()) {
            message.error("At least GitHub or LinkedIn profile is required");
            return false;
        }
        if (!userInfo.username?.trim()) {
            message.error("Username is required");
            return false;
        }
        if (!userInfo.phone_number?.trim()) {
            message.error("Phone number is required");
            return false;
        }
        if (!userInfo.gmail?.trim()) {
            message.error("Gmail is required");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.gmail.trim())) {
            message.error("Please enter a valid Gmail / email address");
            return false;
        }
        return true;
    };

    // ────────────────────────────────────────────────
    //  Submit
    // ────────────────────────────────────────────────
    const handleSubmit = async () => {
        if (!validateForm()) return;

        const authHeader = getAuthHeader();
        if (!authHeader.Authorization) return;

        const cleanArray = (arr, requiredFields) =>
            arr.filter((item) => requiredFields.every((f) => item[f]?.toString().trim() !== ""));

        const payload = {
            portfolio_type: portfolioType,
            profile_image_url: formData.profile_image_url,
            social_links: formData.social_links,
            certifications: cleanArray(formData.certifications, ["title", "issuer", "issue_date"]),
            username: userInfo.username.trim(),
            phone_number: userInfo.phone_number.trim(),
            gmail: userInfo.gmail.trim(),
            [portfolioType]: {
                education: cleanArray(formData.education, ["degree", "institution", "graduation_year"]),
                skills: cleanArray(formData.skills, ["name", "level"]),
                projects: formData.projects
                    .filter((p) => p.title?.trim() && p.description?.trim() && p.technologies?.trim() && p.project_link?.trim() && p.image_url)
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
            const res = await axios.post(PORTFOLIO_API, payload, {
                headers: {
                    ...authHeader,
                    "Content-Type": "application/json",
                },
            });

            // Update localStorage with latest user data
            if (res.data.user) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
            }

            message.success("Portfolio and profile updated successfully!");
            // Optional: navigate("/portfolio") or refresh dashboard
            // navigate("/portfolio");
        } catch (err) {
            console.error("Update error:", err);
            if (err.response?.status === 401) {
                message.error("Session expired. Please log in again.");
                localStorage.removeItem("token");
                // navigate("/login");
            } else {
                message.error(err.response?.data?.message || "Failed to update profile and portfolio");
            }
        } finally {
            setLoading(false);
        }
    };

    // ────────────────────────────────────────────────
    //  Render
    // ────────────────────────────────────────────────
    if (fetching) {
        return (
            <div style={{ textAlign: "center", padding: "100px 20px" }}>
                <Spin size="large" />
                <p style={{ marginTop: 16 }}>Loading your profile and portfolio...</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="edit-portfolio-container">
                <h2>Edit Your Profile & Portfolio</h2>

                {/* Personal Information */}
                <section>
                    <h3>Personal Information</h3>
                    <div className="grid-3">
                        <div>
                            <label>Username <span className="required">*</span></label>
                            <input
                                type="text"
                                placeholder="Your username"
                                value={userInfo.username}
                                onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Phone Number <span className="required">*</span></label>
                            <input
                                type="tel"
                                placeholder="+919876543210"
                                value={userInfo.phone_number}
                                onChange={(e) => setUserInfo({ ...userInfo, phone_number: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Gmail <span className="required">*</span></label>
                            <input
                                type="email"
                                placeholder="yourname@gmail.com"
                                value={userInfo.gmail}
                                onChange={(e) => setUserInfo({ ...userInfo, gmail: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

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
                            <label>Profile Picture <span className="required">*</span></label>
                            <input
                                type="file"
                                accept="image/*"
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
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const url = await uploadProfileImage(file);
                                    if (url) {
                                        setFormData({ ...formData, profile_image_url: url });
                                        message.success("Profile image updated");
                                    }
                                }}
                            />
                            {formData.profile_image_url && (
                                <img
                                    src={formData.profile_image_url}
                                    alt="Profile preview"
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
                                        value={edu.degree}
                                        onChange={(e) => updateArrayField("education", i, "degree", e.target.value)}
                                    />
                                    <label>Institution <span className="required">*</span></label>
                                    <input
                                        value={edu.institution}
                                        onChange={(e) => updateArrayField("education", i, "institution", e.target.value)}
                                    />
                                    <label>Graduation Year <span className="required">*</span></label>
                                    <input
                                        type="number"
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
                                onClick={() => addItem("education", { degree: "", institution: "", graduation_year: "" })}
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
                                            {[...Array(10)].map((_, idx) => (
                                                <option key={idx + 1} value={idx + 1}>
                                                    {idx + 1}
                                                </option>
                                            ))}
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
                                        value={cert.title}
                                        onChange={(e) => updateArrayField("certifications", i, "title", e.target.value)}
                                    />
                                    <label>Issuer <span className="required">*</span></label>
                                    <input
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
                                        value={cert.certificate_pdf_url}
                                        onChange={(e) => updateArrayField("certifications", i, "certificate_pdf_url", e.target.value)}
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
                                        value={proj.title}
                                        onChange={(e) => updateArrayField("projects", i, "title", e.target.value)}
                                    />
                                    <label>Description <span className="required">*</span></label>
                                    <textarea
                                        value={proj.description}
                                        onChange={(e) => updateArrayField("projects", i, "description", e.target.value)}
                                    />
                                    <label>Technologies (comma separated) <span className="required">*</span></label>
                                    <input
                                        value={proj.technologies}
                                        onChange={(e) => updateArrayField("projects", i, "technologies", e.target.value)}
                                    />
                                    <label>Project Link <span className="required">*</span></label>
                                    <input
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
                                            const url = await uploadProjectImage(file);
                                            if (url) {
                                                updateArrayField("projects", i, "image_url", url);
                                                message.success("Project image updated");
                                            }
                                        }}
                                    />
                                    {proj.image_url && (
                                        <img src={proj.image_url} alt="Project preview" className="preview-img" />
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

                        {/* Experience - FIXED: date format handling */}
                        {portfolioType === "experienced" && (
                            <section>
                                <h3>Work Experience</h3>
                                {formData.experience.map((exp, i) => (
                                    <div key={i} className="repeat-card">
                                        <label>Role / Position <span className="required">*</span></label>
                                        <input
                                            value={exp.role}
                                            onChange={(e) => updateArrayField("experience", i, "role", e.target.value)}
                                        />
                                        <label>Company Name <span className="required">*</span></label>
                                        <input
                                            value={exp.company}
                                            onChange={(e) => updateArrayField("experience", i, "company", e.target.value)}
                                        />
                                        <div className="flex dates">
                                            <div>
                                                <label>Start Date <span className="required">*</span></label>
                                                <input
                                                    type="date"
                                                    value={exp.start_date}  // Now correctly formatted as YYYY-MM-DD
                                                    onChange={(e) => updateArrayField("experience", i, "start_date", e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label>
                                                    End Date <span className="required">*</span> <span className="field-note">If you are still working, select today’s date.</span>
                                                </label>
                                                {/* <small className="field-note">
                                                    If you are still working, select today’s date.
                                                </small>                                                 */}
                                                <input
                                                    type="date"
                                                    value={exp.end_date}  // Now correctly formatted as YYYY-MM-DD
                                                    onChange={(e) => updateArrayField("experience", i, "end_date", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <label>Description <span className="required">*</span></label>
                                        <textarea
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

                        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                            {loading ? (
                                <>
                                    <Spin size="small" /> Updating...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default EditPortfolio;