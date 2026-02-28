import { useState, useEffect } from "react";
import { 
  FaGithub, FaLinkedin, FaTwitter, FaFacebook,
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, 
  FaExternalLinkAlt, FaCalendarAlt
} from "react-icons/fa";

const TemplateFresherCreative = ({ user }) => { // ✅ use prop instead of localStorage
  const [userCity, setUserCity] = useState("India");
  const [copied, setCopied] = useState(false);

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
      .catch(() => {});
  }, []);

  const copyEmail = () => {
    if (user?.gmail) {
      navigator.clipboard.writeText(user.gmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!user) {
    return <div className="loading">Loading your creative portfolio...</div>;
  }

  const { 
    username = "Creative Fresher", 
    gmail = "", 
    phone_number = "", 
    profile_image_url = "https://via.placeholder.com/420?text=You", 
    social_links = {}, 
    fresher = {},
    certifications = []
  } = user;

  const { education = [], skills = [], projects = [] } = fresher;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');

        :root {
          --bg: #0a0e17;
          --card: rgba(30, 41, 59, 0.65);
          --glass: rgba(255, 255, 255, 0.06);
          --primary: #8b5cf6;
          --primary-light: #c084fc;
          --accent: #22d3ee;
          --text: #f1f5f9;
          --text-light: #94a3b8;
        }

        * { margin:0; padding:0; box-sizing:border-box; }
        body { 
          font-family: 'Poppins', sans-serif; 
          background: var(--bg); 
          color: var(--text); 
          background-image: 
            radial-gradient(circle at 15% 25%, rgba(139,92,246,0.12) 0%, transparent 30%),
            radial-gradient(circle at 85% 75%, rgba(34,211,238,0.08) 0%, transparent 40%);
          background-attachment: fixed;
        }

        .portfolio { min-height: 100vh; }

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 140px 24px 100px;
          background: linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #22d3ee 100%);
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero-container {
         display: grid;
         grid-template-columns: 1fr 1fr;
         align-items: center;
         gap: 5%;
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 440px;
          gap: 120px;
          align-items: center;
          z-index: 2;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(4.5rem, 10vw, 7.2rem);
          font-weight: 700;
          line-height: 0.92;
          background: linear-gradient(90deg, #fff, #c4b5fd, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 24px;
          text-transform: capitalize;
        }

        .hero-subtitle {
          font-size: 1.65rem;
          opacity: 0.92;
          margin-bottom: 48px;
        }

        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 36px 60px;
          margin-bottom: 56px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 1.25rem;
          font-weight: 500;
        }

        .hero-cta {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 16px 44px;
          border-radius: 60px;
          font-weight: 600;
          font-size: 1.15rem;
          cursor: pointer;
          transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .btn-primary {
          background: white;
          color: #5b21b6;
          box-shadow: 0 10px 30px rgba(255,255,255,0.3);
          border: none;
        }

        .btn-primary:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 25px 50px rgba(255,255,255,0.45);
        }

        .btn-outline {
          background: transparent;
          border: 3px solid white;
          color: white;
        }

        .btn-outline:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-6px);
        }

        .profile-pic {
          width: 460px;
          height: 460px;
          border-radius: 38% 62% 42% 58% / 65% 35% 65% 35%;
          object-fit: cover;
          border: 16px solid rgba(255,255,255,0.22);
          box-shadow: 0 50px 100px rgba(0,0,0,0.55);
          transition: all 0.6s ease;
        }

        .profile-pic:hover {
          transform: scale(1.08) rotate(4deg);
          border-color: rgba(255,255,255,0.45);
        }

        .section {
          padding: 160px 24px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 110px;
          background: linear-gradient(90deg, #c084fc, #a78bfa, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 60px 40px;
          justify-items: center;
        }

        .skill-circle {
          position: relative;
          width: 180px;
          height: 180px;
        }

        .skill-circle svg {
          transform: rotate(-90deg);
        }

        .skill-circle-circle {
          fill: none;
          stroke: rgba(255,255,255,0.12);
          stroke-width: 14;
        }

        .skill-circle-progress {
          fill: none;
          stroke: url(#gradient);
          stroke-width: 14;
          stroke-linecap: round;
          transition: stroke-dashoffset 1.8s ease-out;
        }

        .skill-name {
          position: absolute;
          top: 55%; left: 55%;
          transform: translate(-50%, -50%);
          font-size: 1.4rem;
          font-weight: 700;
          text-align: center;
          color: white;
        }

        .skill-level-text {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1rem;
          color: #c4b5fd;
        }

        .projects-masonry {
          column-count: 2;
          column-gap: 40px;
        }

        .project-card {
          break-inside: avoid;
          margin-bottom: 40px;
          background: var(--glass);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(167,139,250,0.2);
          border-radius: 28px;
          overflow: hidden;
          transition: all 0.5s;
        }

        .project-card:hover {
          transform: translateY(-20px) scale(1.03);
          box-shadow: 0 40px 90px rgba(124,58,237,0.35);
          border-color: rgba(167,139,250,0.6);
        }

        .project-img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.7s;
        }

        .project-body {
          padding: 32px;
        }

        .project-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: #e0e7ff;
        }

        .project-desc {
          color: #cbd5e1;
          margin-bottom: 24px;
          font-size: 0.98rem;
          line-height: 1.7;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 28px;
        }

        .tech-tag {
          background: rgba(167,139,250,0.18);
          color: #c4b5fd;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 0.9rem;
          border: 1px solid rgba(167,139,250,0.35);
        }

        .timeline {
          position: relative;
          padding: 0 40px;
        }

        .timeline::before {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: 50%;
          width: 5px;
          background: linear-gradient(to bottom, #a78bfa, #7c3aed, #c084fc);
          transform: translateX(-50%);
          border-radius: 3px;
        }

        .timeline-item {
          position: relative;
          margin: 80px 0;
          width: 50%;
          padding: 0 40px;
        }

        .timeline-item:nth-child(odd) {
          left: 0;
          text-align: right;
        }

        .timeline-item:nth-child(even) {
          left: 50%;
          text-align: left;
        }

        .timeline-dot {
          position: absolute;
          top: 12px;
          width: 28px;
          height: 28px;
          background: #7c3aed;
          border-radius: 50%;
          border: 6px solid #a78bfa;
          box-shadow: 0 0 0 12px rgba(124,58,237,0.25);
        }

        .timeline-item:nth-child(odd) .timeline-dot { right: -14px; }
        .timeline-item:nth-child(even) .timeline-dot { left: -14px; }

        .timeline-content {
          background: var(--glass);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 32px;
          border-radius: 24px;
        }

        .footer {
          background: rgba(15,23,42,0.92);
          backdrop-filter: blur(12px);
          color: #cbd5e1;
          padding: 140px 24px 90px;
          text-align: center;
          border-top: 1px solid rgba(167,139,250,0.18);
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin: 60px 0 80px;
        }

        .social-links a {
          color: #cbd5e1;
          font-size: 3rem;
          transition: all 0.5s;
          position: relative;
        }

        .social-links a:hover {
          color: #c084fc;
          transform: translateY(-14px) rotate(10deg);
        }

        @media (max-width: 1100px) {
          .hero-title { font-size: 5rem; }
          .profile-pic { width: 360px; height: 360px; }
        }

        @media (max-width: 768px) {
          .hero { padding: 120px 16px 80px; }
          .section { padding: 100px 16px; }
          .projects-masonry { column-count: 1; }
          .timeline { padding: 0 20px; }
          .timeline::before { left: 20px; }
          .timeline-item { width: 100%; left: 0 !important; text-align: left !important; }
          .timeline-dot { left: -14px !important; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 3.5rem; }
          .btn { padding: 14px 32px; font-size: 1rem; }
          .hero-container{grid-template-columns: 1fr;gap: 30px;}
          .social-links {gap: 30px;}
          .profile-pic {width: 300px;height: 300px;}
          .timeline-item {padding: 0 28px;}
        }
      `}</style>

      {/* HERO */}
      <div className="hero">
        <div className="hero-container">
          <div>
            <h1 className="hero-title">{username || "Creative Mind"}</h1>
            <p className="hero-subtitle">Open to work</p>

            <div className="hero-meta">
              <div className="meta-item">
                <FaMapMarkerAlt /> {userCity}
              </div>
              <div className="meta-item">
                <FaCalendarAlt /> Ready to build tomorrow
              </div>
            </div>

            <div className="hero-cta">
              <button className="btn btn-primary" onClick={copyEmail}>
                {copied ? "Email Copied!" : "Grab My Email"}
                <FaEnvelope />
              </button>

              {phone_number && (
                <a href={`tel:${phone_number}`} className="btn btn-outline">
                  Let's Talk <FaPhoneAlt />
                </a>
              )}
            </div>
          </div>

          <div>
            <img
              src={profile_image_url || "https://via.placeholder.com/460?text=Creative+You"}
              alt={username}
              className="profile-pic"
            />
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div className="section">
        <h2 className="section-title">Skill Spectrum</h2>
        <div className="skills-container">
          {skills?.length > 0 ? (
            skills.map((skill, i) => {
              const percent = Math.min(skill.level * 10, 100);
              const radius = 80;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference - (percent / 100) * circumference;

              return (
                <div key={i} className="skill-circle">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                    <circle className="skill-circle-circle" cx="100" cy="100" r={radius} />
                    <circle
                      className="skill-circle-progress"
                      cx="100" cy="100" r={radius}
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                    />
                  </svg>
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-level-text">{skill.level}/10</div>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center", color: "#c084fc", gridColumn: "1 / -1", fontSize: "1.3rem" }}>
              Skills loading creatively...
            </p>
          )}
        </div>
      </div>

      {/* PROJECTS */}
      <div className="section">
        <h2 className="section-title">Creative Showcase</h2>
        <div className="projects-masonry">
          {projects?.length > 0 ? (
            projects.map((project, i) => (
              <div key={i} className="project-card">
                <img
                  src={project.image_url || `https://via.placeholder.com/400x${280 + i*20}?text=Project+${i+1}`}
                  alt={project.title}
                  className="project-img"
                />
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="tech-tags">
                    {project.technologies?.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  {project.project_link && (
                    <a
                      href={project.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      style={{textDecoration:"none"}}
                    >
                      Live Project <FaExternalLinkAlt size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#c084fc", fontSize: "1.3rem" }}>
              Projects in the creative oven...
            </p>
          )}
        </div>
      </div>

      {/* EDUCATION & CERTIFICATIONS */}
      <div className="section">
        <h2 className="section-title">Growth Path</h2>
        <div className="timeline">
          {education?.length > 0 && education.map((edu, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h3>{edu.degree}</h3>
                <p style={{ color: "#c4b5fd", fontWeight: 500 }}>{edu.institution}</p>
                <p style={{ color: "#94a3b8" }}>Class of {edu.graduation_year}</p>
              </div>
            </div>
          ))}

          {certifications?.length > 0 && certifications.map((cert, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h3>{cert.title}</h3>
                <p style={{ color: "#c4b5fd" }}>{cert.issuer}</p>
                <p style={{ color: "#94a3b8" }}>
                  Earned: {new Date(cert.issue_date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                </p>
                {cert.certificate_pdf_url && (
                  <a
                    href={cert.certificate_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#c084fc", fontWeight: 600, marginTop: "12px", display: "block", textDecoration:"none" }}
                  >
                    View Certificate →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <div className="social-links">
          {social_links?.github && <a href={social_links.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
          {social_links?.linkedin && <a href={social_links.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
          {social_links?.twitter && <a href={social_links.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>}
          {social_links?.facebook && <a href={social_links.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>}
        </div>

        <p style={{ opacity: 0.85, fontSize: "1.15rem" }}>
          © {new Date().getFullYear()} {username} • Dreamer • Builder • Learner
        </p>
      </div>
    </>
  );
};

export default TemplateFresherCreative;