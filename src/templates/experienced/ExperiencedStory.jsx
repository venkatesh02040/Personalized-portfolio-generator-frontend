// src/templates/ExperiencedStory.jsx
import { useState, useEffect } from "react";
import {
    FaGithub, FaLinkedin, FaTwitter, FaFacebook,
    FaEnvelope, FaPhoneAlt, FaMapMarkerAlt,
    FaExternalLinkAlt, FaCertificate, FaCopy,
} from "react-icons/fa";

const ExperiencedStory = ({ user }) => { // ✅ use prop instead of localStorage
    const [userCity, setUserCity] = useState("India");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // ✅ ipwho.is instead of ipapi.co (no CORS issues)
        fetch("https://ipwho.is/")
            .then(r => r.json())
            .then(data => {
                if (data.city && data.region) setUserCity(`${data.city}, ${data.region}`);
                else if (data.country) setUserCity(data.country);
            })
            .catch(() => { });
    }, []);

    const copyEmail = () => {
        if (user?.gmail) {
            navigator.clipboard.writeText(user.gmail);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        }
    };

    if (!user) return <div className="loading">Loading your story...</div>;

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
          --bg:         #fdfaf5;
          --text:       #0f0e17;
          --primary:    #0d1117;
          --accent:     #ff4d6d;
          --accent2:    #00ff9d;
          --card:       #ffffff;
          --muted:      #6b7280;
          --gradient:   linear-gradient(135deg, #ff4d6d 0%, #ff9a8b 100%);
          --gradient2:  linear-gradient(135deg, #00ff9d 0%, #00d9ff 100%);
        }

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-decoration: none;
}
          body {
          font-family: system-ui, sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.6;
        }

        .container {
          width: min(1240px, 92%);
          margin-inline: auto;
        }

        h1, h2, h3 { line-height: 1.1; }

        .hero {
          min-block-size: 100dvh;
          background: var(--gradient);
          color: white;
          display: grid;
          place-items: center;
          position: relative;
          overflow: hidden;
          padding-block: 5rem 8rem;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 20%, rgba(255,255,255,0.25) 0%, transparent 70%);
        }

        .hero-content { text-align: center; position: relative; z-index: 2; }

        .hero-avatar {
          width: clamp(160px, 28vw, 220px);
          aspect-ratio: 1;
          border-radius: 50%;
          object-fit: cover;
          border: 8px solid rgba(255,255,255,0.35);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          margin-block-end: 2.5rem;
        }

        .hero-name {
          font-size: clamp(3.8rem, 12vw, 7rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-block-end: 0.6rem;
          text-shadow: 0 6px 24px rgba(0,0,0,0.5);
        }

        .hero-journey {
          font-size: clamp(1.4rem, 4.5vw, 2.1rem);
          max-width: 820px;
          margin: 0 auto 3rem;
          font-weight: 500;
        }

        .hero-cta {
            display: flex;
            gap: 1.2rem;
            justify-content: center;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 2.4rem;
          border-radius: 999px;
          font-size: 1.15rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.32s ease;
          cursor: pointer;
        }

        .btn-primary {
          background: white;
          color: var(--accent);
          box-shadow: 0 10px 30px rgba(255,77,109,0.4);
          border: none;
        }

        .btn-primary:hover {
          transform: translateY(-5px) scale(1.04);
          box-shadow: 0 16px 40px rgba(255,77,109,0.55);
        }

        .btn-outline {
          background: transparent;
          color: white;
          border: 3px solid white;
        }

        .btn-outline:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-5px);
        }

        .section {
          padding-block: clamp(6rem, 12vw, 10rem);
        }

        .section-heading {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 900;
          text-align: center;
          margin-block-end: 1.5rem;
          letter-spacing: -0.03em;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subheading {
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          color: var(--muted);
          text-align: center;
          max-width: 760px;
          margin: 0 auto 4rem;
        }

        .timeline {
          position: relative;
          max-width: 1000px;
          margin-inline: auto;
        }

        .timeline::before {
          content: "";
          position: absolute;
          width: 5px;
          background: linear-gradient(to bottom, var(--accent), var(--accent2));
          inset-block: 0;
          inset-inline-start: 2rem;
        }

        .timeline-item {
          position: relative;
          background: var(--card);
          border-radius: 20px;
          padding: 2.2rem;
          margin-block: 3rem;
          border: 1px solid rgba(255,77,109,0.15);
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          transition: all 0.4s ease;
        }

        .timeline-item:hover {
          transform: translateX(20px) scale(1.03);
          box-shadow: 0 20px 60px rgba(255,77,109,0.25);
        }

        .timeline-item::after {
          content: "";
          position: absolute;
          width: 24px;
          height: 24px;
          background: var(--accent);
          border: 5px solid white;
          border-radius: 50%;
          top: 2.2rem;
          left: -12px;
          z-index: 1;
        }

        .timeline-content h3 {
          font-size: 1.8rem;
          color: var(--accent);
          margin-block-end: 0.6rem;
        }

        .timeline-meta {
          color: var(--muted);
          font-size: 1rem;
          font-style: italic;
          margin-block-end: 1rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(460px, 340px));
          gap: 2.5rem;
          justify-content: center;
        }

        .project-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(0,0,0,0.1);
          transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .project-card:hover {
          transform: translateY(-18px) rotate(1deg);
          box-shadow: 0 30px 80px rgba(255,77,109,0.3);
        }

        .project-img {
          width: 100%;
          height: 260px;
          object-fit: cover;
        }

        .project-body { padding: 2rem; }

        .project-title {
          font-size: 1.9rem;
          font-weight: 800;
          margin-block-end: 0.9rem;
        }

        .project-desc { color: var(--muted); margin-block-end: 1.4rem; }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          margin-block-end: 1.4rem;
        }

        .tag {
          padding: 0.4rem 1.1rem;
          background: rgba(255,77,109,0.1);
          color: var(--accent);
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.95rem;
          border: 1px solid rgba(255,77,109,0.3);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skill-item {
          background: white;
          padding: 1.8rem;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
        }

        .skill-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--accent);
          margin-block-end: 1rem;
        }

        .skill-bar {
          height: 10px;
          background: #e5e7eb;
          border-radius: 999px;
          overflow: hidden;
        }

        .skill-fill {
          height: 100%;
          background: var(--gradient2);
          transition: width 1.4s ease-out;
        }

        .footer {
          background: var(--primary);
          color: white;
          padding-block: 6rem 4rem;
          text-align: center;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          margin-block-end: 3rem;
          font-size: 2.4rem;
        }

        .social-links a {
          color: white;
          transition: all 0.3s;
        }

        .social-links a:hover {
          color: var(--accent);
          transform: scale(1.3) rotate(10deg);
        }

        @media (max-width: 768px) {
          .timeline::before { left: 1.5rem; }
          .timeline-item { margin-inline: 2.5rem; }
          .timeline-item::after { left: 0.4rem; }
          .hero-name { font-size: clamp(3.2rem, 14vw, 5rem); }
          .projects-grid {
            grid-template-columns: repeat(auto-fit, minmax(1fr,1fr));
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .btn { padding: 0.9rem 1.8rem; font-size: 1.05rem; }
          .hero-content { text-align: left; position: relative; z-index: 2; }
          .hero-cta { display: flex; flex-direction: column; gap: 1.2rem; width:200px }
          .projects-grid { grid-template-columns: 1fr; }
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>

            {/* HERO */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        {profile_image_url && (
                            <img src={profile_image_url} alt={username} className="hero-avatar" />
                        )}
                        <h1 className="hero-name">{username}</h1>
                        <p className="hero-journey">
                            Experienced Professional • Ready to Contribute
                        </p>

                        <div className="hero-cta">
                            <button onClick={copyEmail} className="btn btn-primary">
                                {copied ? "Email Copied!" : "Grab Email"} <FaEnvelope />
                            </button>
                            {phone_number && (
                                <a href={`tel:${phone_number}`} className="btn btn-outline">
                                    Call Now <FaPhoneAlt />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* JOURNEY */}
            {(experience.length > 0 || education.length > 0) && (
                <section className="section">
                    <div className="container">
                        <h2 className="section-heading">The Journey</h2>
                        <p className="section-subheading">
                            From late-night commits to production battles, this is the raw timeline.
                        </p>

                        <div className="timeline">
                            {experience.map((exp, i) => (
                                <div key={i} className="timeline-item">
                                    <div className="timeline-content">
                                        <h3>{exp.role} @ {exp.company}</h3>
                                        <div className="timeline-meta">
                                            {new Date(exp.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                            {" — "}
                                            {exp.end_date ? new Date(exp.end_date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
                                        </div>
                                        <p>{exp.description}</p>
                                    </div>
                                </div>
                            ))}

                            {education.map((edu, i) => (
                                <div key={i} className="timeline-item">
                                    <div className="timeline-content">
                                        <h3>{edu.degree}</h3>
                                        <div className="timeline-meta">
                                            {edu.institution} • {edu.graduation_year}
                                        </div>
                                        {edu.description && <p>{edu.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* PROJECTS */}
            {projects.length > 0 && (
                <section className="section" style={{ background: "linear-gradient(to bottom, #fffaf0, #fdfaf5)" }}>
                    <div className="container">
                        <h2 className="section-heading">Signature Builds</h2>
                        <p className="section-subheading">
                            Projects that broke things, fixed things, and taught everything.
                        </p>

                        <div className="projects-grid">
                            {projects.map((proj, i) => (
                                <div key={i} className="project-card">
                                    {proj.image_url && <img src={proj.image_url} alt={proj.title} className="project-img" />}
                                    <div className="project-body">
                                        <h3 className="project-title">{proj.title}</h3>
                                        <p className="project-desc">{proj.description}</p>
                                        <div className="project-tags">
                                            {proj.technologies?.map((t, j) => <span key={j} className="tag">{t}</span>)}
                                        </div>
                                        {proj.project_link && (
                                            <a
                                                href={proj.project_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: "var(--accent)",
                                                    fontWeight: 700,
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "0.6rem",
                                                    fontSize: "1.1rem",
                                                }}
                                            >
                                                See It Live <FaExternalLinkAlt />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* SKILLS */}
            {skills.length > 0 && (
                <section className="section">
                    <div className="container">
                        <h2 className="section-heading">Weapon Stack</h2>
                        <p className="section-subheading">
                            Tools, languages & frameworks I wield daily.
                        </p>

                        <div className="skills-grid">
                            {skills.map((s, i) => (
                                <div key={i} className="skill-item">
                                    <div className="skill-name">{s.name}</div>
                                    <div className="skill-bar">
                                        <div className="skill-fill" style={{ width: `${Math.min(s.level * 10, 100)}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CERTIFICATIONS */}
            {certifications.length > 0 && (
                <section className="section" style={{ background: "linear-gradient(to bottom, #fffaf0, #fdfaf5)" }}>
                    <div className="container">
                        <h2 className="section-heading">Proof Points</h2>
                        <div className="projects-grid">
                            {certifications.map((c, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: "white",
                                        padding: "2rem",
                                        borderRadius: "20px",
                                        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <FaCertificate style={{ fontSize: "3.2rem", color: "var(--accent)", marginBottom: "1.2rem" }} />
                                    <h3 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.6rem" }}>
                                        {c.title}
                                    </h3>
                                    <p style={{ color: "var(--muted)" }}>
                                        {c.issuer} • {new Date(c.issue_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                                    </p>
                                    {c.certificate_pdf_url && (
                                        <a
                                            href={c.certificate_pdf_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: "var(--accent)",
                                                fontWeight: 700,
                                                marginTop: "1.2rem",
                                                display: "inline-block",
                                            }}
                                        >
                                            View Credential →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="social-links">
                        {social_links.github && <a href={social_links.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
                        {social_links.linkedin && <a href={social_links.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
                        {social_links.twitter && <a href={social_links.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>}
                        {social_links.facebook && <a href={social_links.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>}
                    </div>

                    <div style={{ marginBlock: "2.5rem", fontSize: "1.2rem" }}>
                        {gmail && (
                            <div style={{ marginBlockEnd: "1rem" }}>
                                <FaEnvelope style={{ marginInlineEnd: "0.8rem" }} /> {gmail}
                                <button onClick={copyEmail} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", marginInlineStart: "0.8rem", fontSize: "1.4rem" }}>
                                    <FaCopy />
                                </button>
                            </div>
                        )}
                        {phone_number && (
                            <div style={{ marginBlockEnd: "1rem" }}>
                                <FaPhoneAlt style={{ marginInlineEnd: "0.8rem" }} /> {phone_number}
                            </div>
                        )}
                        <div>
                            <FaMapMarkerAlt style={{ marginInlineEnd: "0.8rem" }} /> {userCity}
                        </div>
                    </div>

                    <p style={{ opacity: 0.9, fontSize: "1.1rem" }}>
                        Built with chaos, coffee & passion © {new Date().getFullYear()} {username}
                    </p>
                </div>
            </footer>
        </>
    );
};

export default ExperiencedStory;