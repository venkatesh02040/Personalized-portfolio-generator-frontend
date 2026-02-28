// src/templates/ExperiencedInnovative.jsx
import { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaEnvelope,
  FaCalendarAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaCertificate,
  FaCopy,
  FaBriefcase,
} from "react-icons/fa";

const ExperiencedInnovative = ({ user }) => { // ✅ use prop instead of localStorage
  const [userCity, setUserCity] = useState("India");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // ✅ ipwho.is instead of ipapi.co (no CORS issues)
    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data) => {
        if (data.city && data.region) setUserCity(`${data.city}, ${data.region}`);
        else if (data.country) setUserCity(data.country);
      })
      .catch(() => {});
  }, []);

  const copyEmail = () => {
    if (user?.gmail) {
      navigator.clipboard.writeText(user.gmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  if (!user) {
    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  const {
    username = "",
    gmail = "",
    phone_number = "",
    profile_image_url = "",
    social_links = {},
    experienced = {},
    certifications = [],
  } = user;

  const { education = [], skills = [], projects = [], experience = [] } = experienced;

  return (
    <>
      <style>{`
        :root {
          --primary: #6d28d9;
          --primary-dark: #5b21b6;
          --primary-light: #a855f7;
          --bg: #f9fafb;
          --card: white;
          --text: #1f2937;
          --text-light: #4b5563;
          --text-lighter: #6b7280;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.6;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section {
          padding: 6rem 0;
        }

        .section-heading {
          font-size: 3.25rem;
          font-weight: 800;
          color: var(--primary);
          text-align: center;
          margin-bottom: 3rem;
          letter-spacing: -0.025em;
        }

        /* ──────────────── HERO ──────────────── */
        .hero {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
          text-align: center;
          padding: 9rem 0 6rem;
        }

        .hero-avatar {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          border: 6px solid rgba(255,255,255,0.25);
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
          margin-bottom: 1.8rem;
        }

        .hero-name {
          font-size: 4rem;
          font-weight: 900;
          line-height: 1.15;
          margin-bottom: 0.8rem;
          letter-spacing: -0.03em;
        }

        .hero-tagline {
          font-size: 1.35rem;
          opacity: 0.95;
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .hero-info {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          font-size: 1rem;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }

        .btn {
          padding: 0.85rem 2rem;
          border-radius: 999px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-primary {
          background: white;
          color: var(--primary);
          border: none;
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }

        .btn-primary.copied {
          background: #059669;
          color: white;
        }

        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        /* ──────────────── CARDS ──────────────── */
        .card {
          background: var(--card);
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }

        .card-inner-padding {
          padding: 1.8rem;
        }

        .project-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .tag {
          padding: 0.4rem 1rem;
          background: #ede9fe;
          color: var(--primary);
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        /* ──────────────── SKILL BAR ──────────────── */
        .skill-bar {
          height: 10px;
          background: #e5e7eb;
          border-radius: 5px;
          overflow: hidden;
          margin-top: 0.4rem;
        }

        .skill-fill {
          height: 100%;
          background: linear-gradient(to right, #7e22ce, #a855f7);
          transition: width 0.8s ease;
        }

        /* ──────────────── FOOTER ──────────────── */
        .footer {
          background: var(--primary);
          color: white;
          padding: 4rem 0 2rem;
          text-align: center;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          font-size: 1.8rem;
        }

        .social-icons a {
          color: white;
          transition: color 0.2s;
        }

        .social-icons a:hover {
          color: #e9d5ff;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(460px, 340px));
          justify-content: center;
          gap: 2rem;
        }

        /* ──────────────── RESPONSIVE ──────────────── */
        @media (max-width: 768px) {

          .grid-container {
            grid-template-columns: repeat(auto-fit, minmax(300px, 340px));
          justify-content: center;
           }

          .container {
            padding: 0 1.25rem;
          }

          .section {
            padding: 4rem 0;
          }

          .section-heading {
            font-size: 2.25rem;
            margin-bottom: 2rem;
          }

          .hero {
            padding: 6rem 0 4rem;
          }

          .hero-avatar {
            width: 160px;
            height: 160px;
          }

          .hero-name {
            font-size: 2.5rem;
          }

          .hero-tagline {
            font-size: 1.15rem;
          }

          .hero-info {
            gap: 1rem;
          }
        }

        @media (max-width: 640px) {
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 320px;
            justify-content: center;
          }


          .grid-container {
            grid-template-columns: 1fr;
           }        
            }
      `}</style>

      {/* ──────────────── HERO ──────────────── */}
      <section className="hero">
        <div className="container">
          <img
            src={profile_image_url}
            alt={username}
            className="hero-avatar"
          />
          <h1 className="hero-name">{username}</h1>
          <p className="hero-tagline">Experienced Professional • Building the Future</p>

          <div className="hero-info">
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <FaMapMarkerAlt size={20} /> {userCity}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <FaCalendarAlt size={20} /> Available Immediately
            </div>
          </div>

          <div className="hero-actions">
            <button
              onClick={copyEmail}
              className={`btn btn-primary ${copied ? "copied" : ""}`}
            >
              {copied ? "Copied!" : "Copy Email"} <FaEnvelope size={18} />
            </button>

            {phone_number && (
              <a href={`tel:${phone_number}`} className="btn btn-outline">
                Call Now <FaPhoneAlt size={18} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────── EXPERIENCE ──────────────── */}
      {experience?.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-heading">Professional Experience</h2>

            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              {experience.map((exp, i) => (
                <div className="card" key={i} style={{ marginBottom: "2.5rem" }}>
                  <div className="card-inner-padding">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <FaBriefcase style={{ fontSize: "1.8rem", color: "var(--primary)" }} />
                      <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#4c1d95" }}>
                        {exp.role} • {exp.company}
                      </h3>
                    </div>
                    <p style={{ color: "var(--text-lighter)", marginBottom: "1rem", fontSize: "0.95rem" }}>
                      {new Date(exp.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}{" "}
                      —{" "}
                      {exp.end_date
                        ? new Date(exp.end_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                        : "Present"}
                    </p>
                    <p style={{ color: "var(--text)", lineHeight: 1.7 }}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────── PROJECTS ──────────────── */}
      {projects?.length > 0 && (
        <section className="section" style={{ background: "#f3e8ff" }}>
          <div className="container">
            <h2 className="section-heading">Projects</h2>

            <div className="grid-container">
              {projects.map((proj, i) => (
                <div className="card" key={i}>
                  {proj.image_url && (
                    <img
                      src={proj.image_url}
                      alt={proj.title}
                      className="project-img"
                    />
                  )}
                  <div className="card-inner-padding">
                    <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#4c1d95", marginBottom: "0.75rem" }}>
                      {proj.title}
                    </h3>
                    <p style={{ color: "var(--text-light)", marginBottom: "1rem", lineHeight: 1.6 }}>
                      {proj.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.2rem" }}>
                      {proj.technologies.map((tech, j) => (
                        <span className="tag" key={j}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    {proj.project_link && (
                      <a
                        href={proj.project_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--primary)",
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
          </div>
        </section>
      )}

      {/* ──────────────── SKILLS ──────────────── */}
      {skills?.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-heading">Technical Skills</h2>

            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: "1.8rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem", fontWeight: 600 }}>
                    <span style={{ color: "#4c1d95" }}>{skill.name}</span>
                    <span style={{ color: "var(--text-lighter)" }}>{skill.level}/10</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-fill"
                      style={{ width: `${skill.level * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────── EDUCATION & CERTIFICATIONS ──────────────── */}
      <section className="section" style={{ background: "#f3e8ff" }}>
        <div className="container">
          <h2 className="section-heading">Education & Certifications</h2>

            <div className="grid-container">
            {education.map((edu, i) => (
              <div className="card" key={i}>
                <div className="card-inner-padding">
                  <FaGraduationCap style={{ fontSize: "2.2rem", color: "var(--primary)", marginBottom: "1rem" }} />
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#4c1d95", marginBottom: "0.5rem" }}>
                    {edu.degree}
                  </h3>
                  <p style={{ color: "var(--text-lighter)" }}>
                    {edu.institution} • {edu.graduation_year}
                  </p>
                </div>
              </div>
            ))}

            {certifications.map((cert, i) => (
              <div className="card" key={i}>
                <div className="card-inner-padding">
                  <FaCertificate style={{ fontSize: "2.2rem", color: "var(--primary)", marginBottom: "1rem" }} />
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#4c1d95", marginBottom: "0.5rem" }}>
                    {cert.title}
                  </h3>
                  <p style={{ color: "var(--text-lighter)", marginBottom: "0.8rem" }}>
                    {cert.issuer} • {new Date(cert.issue_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                  {cert.certificate_pdf_url && (
                    <a
                      href={cert.certificate_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--primary)",
                        fontWeight: 600,
                        textDecoration: "none",
                        display: "inline-block",
                        marginTop: "0.8rem",
                      }}
                    >
                      View Certificate →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── FOOTER ──────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="social-icons">
            {social_links?.github && (
              <a href={social_links.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            )}
            {social_links?.linkedin && (
              <a href={social_links.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            )}
            {social_links?.twitter && (
              <a href={social_links.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            )}
            {social_links?.facebook && (
              <a href={social_links.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            )}
          </div>

          <div style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
            {gmail && (
              <div style={{ marginBottom: "0.6rem" }}>
                <FaEnvelope style={{ marginRight: "0.6rem" }} /> {gmail}
                <button
                  onClick={copyEmail}
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    marginLeft: "0.6rem",
                    fontSize: "1.2rem",
                  }}
                >
                  <FaCopy />
                </button>
              </div>
            )}

            {phone_number && (
              <div style={{ marginBottom: "0.6rem" }}>
                <FaPhoneAlt style={{ marginRight: "0.6rem" }} /> {phone_number}
              </div>
            )}

            <div>
              <FaMapMarkerAlt style={{ marginRight: "0.6rem" }} /> {userCity}
            </div>
          </div>

          <p style={{ opacity: 0.85, fontSize: "0.95rem" }}>
            © {new Date().getFullYear()} {username}
          </p>
        </div>
      </footer>
    </>
  );
};

export default ExperiencedInnovative;