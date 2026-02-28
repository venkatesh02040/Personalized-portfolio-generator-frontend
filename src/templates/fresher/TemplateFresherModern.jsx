// src/templates/TemplateFresherModern.jsx
import { useState, useEffect } from "react";
import {
  FaGithub, FaLinkedin, FaTwitter, FaFacebook,
  FaExternalLinkAlt, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope, FaPhone
} from "react-icons/fa";

const TemplateFresherModern = ({ user }) => { // ✅ use prop instead of localStorage
  const [userCity, setUserCity] = useState("Bengaluru, Karnataka");

  useEffect(() => {
    // ✅ ipwho.is instead of ipapi.co (no CORS issues)
    fetch("https://ipwho.is/")
      .then(res => res.json())
      .then(data => {
        if (data.city && data.region) {
          setUserCity(`${data.city}, ${data.region}`);
        } else if (data.country) {
          setUserCity(data.country);
        }
      })
      .catch(() => { });
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-slate-600">
        Loading your portfolio...
      </div>
    );
  }

  const {
    username,
    gmail,
    phone_number,
    profile_image_url,
    social_links,
    fresher,
    certifications
  } = user;

  const { education, skills, projects } = fresher || {};

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

        :root {
          --primary: #1e3c72;
          --primary-dark: #1e3c72;
          --text: #0f172a;
          --text-light: #334155;
          --bg: #ffffff;
          --bg-alt: #f8fafc;
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: 'Inter', system-ui, sans-serif;
          color: var(--text);
          background: var(--bg);
        }

        h1, h2, h3 { font-family: 'Inter', sans-serif; font-weight: 700; }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .hero {
          background: linear-gradient(to bottom right, #f1f5f9, #e2e8f0);
          padding: 10rem 0 8rem;
          position: relative;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 20%, rgba(37,99,235,0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.2rem, 6vw, 4.8rem);
          line-height: 1.05;
          margin-bottom: 1.25rem;
          color: var(--text);
          text-transform: capitalize;
        }

        .hero-subtitle {
          font-size: 1.4rem;
          color: var(--text-light);
          margin-bottom: 2rem;
          max-width: 480px;
        }

        .meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.8rem 2.2rem;
          font-size: 1.05rem;
          color: var(--text-light);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .avatar-frame {
          position: relative;
          width: 100%;
          max-width: 380px;
          aspect-ratio: 1;
          margin: 0 auto;
        }

        .avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2.5rem;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.18);
          border: 1rem solid white;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 1.8rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1.05rem;
          transition: all 0.28s ease;
          text-decoration: none;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--primary-dark);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(37,99,235,0.25);
        }

        .btn-outline {
          border: 2px solid var(--primary);
          color: var(--primary);
        }

        .btn-outline:hover {
          background: var(--primary);
          color: white;
        }

        .section {
          padding: 9rem 0;
        }

        .section-title {
          font-size: 2.8rem;
          text-align: center;
          margin-bottom: 5rem;
          position: relative;
          font-weight: 700;
        }

        .section-title span {
          position: relative;
        }

        .section-title span::after {
          content: '';
          position: absolute;
          bottom: -14px;
          left: 50%;
          transform: translateX(-50%);
          width: 5.5rem;
          height: 5px;
          background: linear-gradient(to right, var(--primary), #60a5fa);
          border-radius: 999px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.8rem;
        }

        .skill-card {
          background: white;
          padding: 1.8rem;
          border-radius: 1.25rem;
          box-shadow: 0 10px 30px -6px rgba(0,0,0,0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.12);
        }

        .skill-name {
          font-size: 1.22rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .skill-level {
          height: 8px;
          background: #e2e8f0;
          border-radius: 999px;
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          background: linear-gradient(to right, #60a5fa, var(--primary));
          transition: width 1.2s ease-out;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 400px));
          justify-content: center;
          gap: 2rem;
        }

        .project {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 12px 32px -8px rgba(0,0,0,0.08);
          transition: all 0.35s ease;
        }

        .project:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 60px -12px rgba(0,0,0,0.14);
        }

        .project-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .project-content {
          padding: 1.6rem 1.8rem 2rem;
        }

        .project-title {
          font-size: 1.38rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .project-desc {
          color: #475569;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }

        .tech-tag {
          background: #f1f5f9;
          color: #475569;
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          font-size: 0.84rem;
          font-weight: 500;
        }

        .timeline {
          max-width: 800px;
          margin: 0 auto;
        }

        .timeline-item {
          position: relative;
          padding-left: 2.8rem;
          padding-bottom: 3.5rem;
        }

        .timeline-item:last-child { padding-bottom: 0; }

        .timeline-dot {
          position: absolute;
          left: 0;
          top: 0.35rem;
          width: 18px;
          height: 18px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 0 5px rgba(37,99,235,0.15);
        }

        .timeline-item h3 {
          font-size: 1.32rem;
          margin-bottom: 0.35rem;
        }

        .timeline-item .meta {
          color: #64748b;
          font-size: 0.98rem;
          margin-bottom: 0.6rem;
        }

        .footer {
          background: #0f172a;
          color: #cbd5e1;
          padding: 6rem 0 4rem;
          text-align: center;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 2.2rem;
          margin: 2.5rem 0 3rem;
        }

        .social-links a {
          font-size: 1.9rem;
          color: #94a3b8;
          transition: all 0.3s;
        }

        .social-links a:hover {
          color: #60a5fa;
          transform: translateY(-5px);
        }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; }
          .avatar-frame { max-width: 320px; }
        }

        @media (max-width: 768px) {
          .hero { padding: 7rem 0 5rem; }
          .section { padding: 6rem 0; }
          .section-title { font-size: 2.4rem; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 2.8rem; }
          .btn { padding: 0.8rem 1.5rem; font-size: 1rem; }
          .projects-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 360px) {
          .container { padding-left: 12px; padding-right: 12px; }
          .hero { padding-top: clamp(4rem, 16vw, 6rem); padding-bottom: clamp(3rem, 12vw, 5rem); }
          .hero-title { font-size: clamp(2.1rem, 11vw, 2.7rem); }
          .hero-subtitle { font-size: clamp(1rem, 4.8vw, 1.15rem); }
          .meta { gap: 1rem 1.6rem; font-size: 0.93rem; justify-content: left; }
          .avatar-frame { max-width: 220px; margin-top: 1.2rem; }
          .btn { padding: 0.7rem 1.3rem; font-size: 0.96rem; min-width: unset; width: 100%; max-width: none; }
          .section-title { font-size: clamp(1.65rem, 9vw, 2.2rem); }
          .section-title span::after { width: 4rem; }
          .skills-grid, .projects-grid { gap: 1.2rem; }
          .project-img { height: 160px; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-gradient" />
        <div className="container">
          <div className="hero-grid">
            <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
              <h1 className="hero-title">{username}</h1>
              <p className="hero-subtitle">Open to full-time & internship opportunities</p>

              <div className="meta">
                <div className="meta-item"><FaMapMarkerAlt /> {userCity}</div>
                <div className="meta-item"><FaCalendarAlt /> Available from now</div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "left", marginTop: "1.5rem" }}>
                <a href={`mailto:${gmail}`} className="btn btn-primary">
                  <FaEnvelope /> Say Hello
                </a>
                <a href="#projects" className="btn btn-outline">
                  Explore Projects
                </a>
              </div>
            </div>

            <div className="avatar-frame">
              <img
                src={profile_image_url || "https://via.placeholder.com/400"}
                alt={username}
                className="avatar"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      {skills?.length > 0 && (
        <section className="section" style={{ background: "var(--bg-alt)" }}>
          <div className="container">
            <h2 className="section-title"><span>Technical Skills</span></h2>
            <div className="skills-grid">
              {skills.map((skill, i) => (
                <div key={i} className="skill-card">
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-level">
                    <div
                      className="skill-progress"
                      style={{ width: `${Math.min(skill.level * 10, 100)}%` }}
                    />
                  </div>
                  <div style={{ textAlign: "right", marginTop: "0.5rem", fontSize: "0.9rem", color: "#64748b" }}>
                    {skill.level}/10
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projects?.length > 0 && (
        <section id="projects" className="section">
          <div className="container">
            <h2 className="section-title"><span>Featured Projects</span></h2>
            <div className="projects-grid">
              {projects.map((proj, i) => (
                <div key={i} className="project">
                  <img
                    src={proj.image_url || "https://via.placeholder.com/600x400"}
                    alt={proj.title}
                    className="project-img"
                  />
                  <div className="project-content">
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-desc">{proj.description}</p>

                    {proj.technologies?.length > 0 && (
                      <div className="tech-tags">
                        {proj.technologies.map((tag, idx) => (
                          <span key={idx} className="tech-tag">{tag}</span>
                        ))}
                      </div>
                    )}

                    {proj.project_link && (
                      <a
                        href={proj.project_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--primary)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
                      >
                        View Project <FaExternalLinkAlt size={13} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education?.length > 0 && (
        <section className="section" style={{ background: "var(--bg-alt)" }}>
          <div className="container">
            <h2 className="section-title"><span>Education</span></h2>
            <div className="timeline">
              {education.map((edu, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <h3>{edu.degree}</h3>
                  <div className="meta">
                    {edu.institution} • {edu.graduation_year}
                  </div>
                  {edu.description && <p style={{ color: "#475569" }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications?.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title"><span>Certifications</span></h2>
            <div className="timeline">
              {certifications.map((cert, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <h3>{cert.title}</h3>
                  <div className="meta">
                    {cert.issuer} • {new Date(cert.issue_date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                  </div>
                  {cert.certificate_pdf_url && (
                    <a
                      href={cert.certificate_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}
                    >
                      View Certificate →
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
            {social_links?.github && <a href={social_links.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
            {social_links?.linkedin && <a href={social_links.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
            {social_links?.twitter && <a href={social_links.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>}
            {social_links?.facebook && <a href={social_links.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>}
          </div>

          <p style={{ fontSize: "1.05rem", opacity: 0.8 }}>
            © {new Date().getFullYear()} {username} • Built with passion
          </p>
        </div>
      </footer>
    </>
  );
};

export default TemplateFresherModern;