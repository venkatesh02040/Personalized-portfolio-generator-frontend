// src/templates/ExperiencedExecutive.jsx
import { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaCertificate,
  FaCopy,
  FaCalendarAlt,
  FaBriefcase,
} from "react-icons/fa";

const ExperiencedExecutive = ({ user }) => { // ✅ accept user as prop
  const [userCity, setUserCity] = useState("India");
  const [copied, setCopied] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  fetch("https://ipwho.is/")
    .then((res) => res.json())
    .then((data) => {
      if (data.city && data.region) setUserCity(`${data.city}, ${data.region}`);
      else if (data.country) setUserCity(data.country);
    })
    .catch(() => { });

  const copyEmail = () => {
    if (user?.gmail) {
      navigator.clipboard.writeText(user.gmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a192f",
          color: "#ccd6f6",
          fontSize: width < 640 ? "1.1rem" : "1.25rem",
        }}
      >
        Loading your executive profile...
      </div>
    );
  }

  const {
    username = "Experienced Executive",
    gmail = "",
    phone_number = "",
    profile_image_url = "https://via.placeholder.com/480?text=Profile",
    social_links = {},
    experienced = {},
    certifications = [],
  } = user;

  const { education = [], skills = [], projects = [], experience = [] } = experienced;

  // Breakpoints
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  // ────────────────────────────────────────────────
  //  SHARED STYLE OBJECTS
  // ────────────────────────────────────────────────
  const containerStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
    paddingLeft: isMobile ? "1rem" : isTablet ? "1.5rem" : "2.5rem",
    paddingRight: isMobile ? "1rem" : isTablet ? "1.5rem" : "2.5rem",
  };

  const sectionBaseStyle = {
    paddingTop: isMobile ? "3.5rem" : isTablet ? "4.5rem" : "5.5rem",
    paddingBottom: isMobile ? "3.5rem" : isTablet ? "4.5rem" : "5.5rem",
    ...containerStyle,
  };

  const headingStyle = {
    fontSize: isMobile ? "2rem" : isTablet ? "2.75rem" : "3.5rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: isMobile ? "2rem" : "3rem",
    color: "#64ffda",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a192f",
        color: "#ccd6f6",
        fontFamily: "'Roboto Mono', monospace",
        lineHeight: 1.6,
      }}
    >

      {/* ──────────────── HERO ──────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: isMobile ? "5rem" : 0,
          paddingBottom: isMobile ? "3rem" : 0,
        }}
      >
        <div
          style={{
            ...containerStyle,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "2.5rem" : "4rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              textAlign: isMobile ? "center" : "left",
              maxWidth: isMobile ? "100%" : "50%",
            }}
          >
            <h1
              style={{
                color: "#64ffda",
                fontSize: isMobile ? "clamp(2.5rem, 8vw, 3.5rem)" : isTablet ? "clamp(4rem, 6vw, 5rem)" : "clamp(5rem, 5vw, 6rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: "1rem",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textAlign: isMobile ? "center" : "left",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                maxWidth: "100%",
              }}
            >
              {username}
            </h1>

            <p
              style={{
                fontSize: isMobile ? "1.1rem" : "1.4rem",
                color: "#8892b0",
                marginBottom: "2rem",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Experienced Professional • Open to New Challenges
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                justifyContent: isMobile ? "center" : "flex-start",
                marginBottom: "2rem",
                fontSize: "1rem",
                color: "#8892b0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FaMapMarkerAlt style={{ color: "#64ffda" }} /> {userCity}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FaCalendarAlt style={{ color: "#64ffda" }} /> Available Immediately
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <button
                onClick={copyEmail}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "4px",
                  background: copied ? "#112240" : "#64ffda",
                  color: copied ? "#64ffda" : "#0a192f",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#112240", e.currentTarget.style.color = "#64ffda")}
                onMouseLeave={(e) => (e.currentTarget.style.background = copied ? "#112240" : "#64ffda", e.currentTarget.style.color = copied ? "#64ffda" : "#0a192f")}
              >
                {copied ? "Email Copied!" : "Copy Email"} <FaEnvelope />
              </button>

              {phone_number && (
                <a
                  href={`tel:${phone_number}`}
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "4px",
                    border: "1px solid #64ffda",
                    color: "#64ffda",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#64ffda";
                    e.currentTarget.style.color = "#0a192f";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#64ffda";
                  }}
                >
                  Call Now <FaPhoneAlt />
                </a>
              )}
            </div>
          </div>

          <div
            style={{
              position: "relative",
              maxWidth: isMobile ? "250px" : "400px",
              margin: isMobile ? "0 auto" : "0",
            }}
          >
            <img
              src={profile_image_url}
              alt={username}
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(100, 255, 218, 0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-1rem",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#64ffda",
                color: "#0a192f",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                fontWeight: 600,
                boxShadow: "0 2px 5px rgba(100, 255, 218, 0.3)",
                whiteSpace: "nowrap",
              }}
            >
              Open to Work
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── SKILLS ──────────────── */}
      {skills?.length > 0 && (
        <section style={{ background: "#112240", ...sectionBaseStyle }}>
          <h2 style={headingStyle}>Core Skills</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {skills.map((skill, i) => (
              <div
                key={i}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#0a192f",
                  border: "1px solid #64ffda",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#64ffda",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#64ffda", e.currentTarget.style.color = "#0a192f")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#0a192f", e.currentTarget.style.color = "#64ffda")}
              >
                {skill.name} • {skill.level}/10
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ──────────────── WORK EXPERIENCE ──────────────── */}
      {experience?.length > 0 && (
        <section style={sectionBaseStyle}>
          <h2 style={headingStyle}>Professional Experience</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {experience.map((exp, i) => {
              let endDateDisplay = "Present";

              if (exp.end_date) {
                const endDate = new Date(exp.end_date);
                const today = new Date();

                const isToday =
                  endDate.getFullYear() === today.getFullYear() &&
                  endDate.getMonth() === today.getMonth() &&
                  endDate.getDate() === today.getDate();

                if (!isToday && endDate < today) {
                  endDateDisplay = endDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  });
                }
              }

              return (
                <div
                  key={i}
                  style={{
                    background: "#112240",
                    border: "1px solid #233554",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#64ffda")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#233554")}
                >
                  <FaBriefcase style={{ fontSize: "2rem", color: "#64ffda", marginBottom: "1rem" }} />
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem", color: "#64ffda" }}>
                    {exp.role} at {exp.company}
                  </h3>
                  <p style={{ color: "#8892b0", marginBottom: "1rem" }}>
                    {new Date(exp.start_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}{" "}
                    - {endDateDisplay}
                  </p>
                  <p style={{ color: "#ccd6f6" }}>{exp.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ──────────────── PROJECTS ──────────────── */}
      {projects?.length > 0 && (
        <section style={{ background: "#112240", ...sectionBaseStyle }}>
          <h2 style={headingStyle}>Selected Projects</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(340px, 400px))",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            {projects.map((proj, i) => (
              <div
                key={i}
                style={{
                  background: "#0a192f",
                  border: "1px solid #233554",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.borderColor = "#64ffda";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.borderColor = "#233554";
                }}
              >
                <img
                  src={proj.image_url || "https://via.placeholder.com/640x360?text=Project"}
                  alt={proj.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem", color: "#64ffda" }}>
                    {proj.title}
                  </h3>
                  <p style={{ color: "#8892b0", marginBottom: "1rem" }}>
                    {proj.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                    {proj.technologies?.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: "0.25rem 0.75rem",
                          background: "#233554",
                          color: "#64ffda",
                          borderRadius: "4px",
                          fontSize: "0.85rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {proj.project_link && (
                    <a
                      href={proj.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#64ffda",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        textDecoration: "none",
                      }}
                    >
                      View Project <FaExternalLinkAlt size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ──────────────── EDUCATION & CERTIFICATIONS ──────────────── */}
      <section style={sectionBaseStyle}>
        <h2 style={headingStyle}>Education & Certifications</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {education.map((edu, i) => (
            <div
              key={i}
              style={{
                background: "#112240",
                border: "1px solid #233554",
                borderRadius: "8px",
                padding: "1.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#64ffda")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#233554")}
            >
              <FaGraduationCap style={{ fontSize: "2rem", color: "#64ffda", marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem", color: "#64ffda" }}>
                {edu.degree}
              </h3>
              <p style={{ color: "#8892b0" }}>
                {edu.institution} • {edu.graduation_year}
              </p>
            </div>
          ))}

          {certifications.map((cert, i) => (
            <div
              key={i}
              style={{
                background: "#112240",
                border: "1px solid #233554",
                borderRadius: "8px",
                padding: "1.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#64ffda")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#233554")}
            >
              <FaCertificate style={{ fontSize: "2rem", color: "#64ffda", marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem", color: "#64ffda" }}>
                {cert.title}
              </h3>
              <p style={{ color: "#8892b0", marginBottom: "1rem" }}>
                {cert.issuer} • {new Date(cert.issue_date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
              </p>
              {cert.certificate_pdf_url && (
                <a
                  href={cert.certificate_pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#64ffda",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  View Certificate →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────── FOOTER ──────────────── */}
      <footer
        style={{
          background: "#112240",
          padding: "3rem 0",
          textAlign: "center",
          ...containerStyle,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {gmail && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FaEnvelope style={{ color: "#64ffda" }} /> {gmail}
              <button onClick={copyEmail} style={{ background: "none", border: "none", color: "#64ffda", cursor: "pointer" }}>
                <FaCopy />
              </button>
            </div>
          )}

          {phone_number && (
            <a href={`tel:${phone_number}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#ccd6f6", textDecoration: "none" }}>
              <FaPhoneAlt style={{ color: "#64ffda" }} /> {phone_number}
            </a>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaMapMarkerAlt style={{ color: "#64ffda" }} /> {userCity}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {social_links?.github && (
            <a href={social_links.github} target="_blank" rel="noopener noreferrer" style={{ color: "#ccd6f6", fontSize: "1.5rem", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#64ffda")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ccd6f6")}
            >
              <FaGithub />
            </a>
          )}
          {social_links?.linkedin && (
            <a href={social_links.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#ccd6f6", fontSize: "1.5rem", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#64ffda")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ccd6f6")}
            >
              <FaLinkedin />
            </a>
          )}
          {social_links?.twitter && (
            <a href={social_links.twitter} target="_blank" rel="noopener noreferrer" style={{ color: "#ccd6f6", fontSize: "1.5rem", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#64ffda")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ccd6f6")}
            >
              <FaTwitter />
            </a>
          )}
          {social_links?.facebook && (
            <a href={social_links.facebook} target="_blank" rel="noopener noreferrer" style={{ color: "#ccd6f6", fontSize: "1.5rem", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#64ffda")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ccd6f6")}
            >
              <FaFacebook />
            </a>
          )}
        </div>

        <p style={{ color: "#8892b0", fontSize: "0.9rem" }}>
          © {new Date().getFullYear()} {username} • Executive Portfolio
        </p>
      </footer>
    </div>
  );
};

export default ExperiencedExecutive;