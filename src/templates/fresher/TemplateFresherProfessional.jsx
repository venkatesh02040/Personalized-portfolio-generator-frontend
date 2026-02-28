// src/templates/TemplateFresherProfessional.jsx
import { useState, useEffect } from "react";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaExternalLinkAlt,
    FaGraduationCap,
    FaCertificate,
    FaCopy,
    FaCalendarAlt,
} from "react-icons/fa";

const TemplateFresherProfessional = ({ user }) => { // ✅ use prop instead of localStorage
    const [userCity, setUserCity] = useState("India");
    const [copied, setCopied] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // ✅ ipwho.is instead of ipapi.co (no CORS issues)
        fetch("https://ipwho.is/")
            .then((res) => res.json())
            .then((data) => {
                if (data.city && data.region) setUserCity(`${data.city}, ${data.region}`);
                else if (data.country) setUserCity(data.country);
            })
            .catch(() => { });
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
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0f172a",
                    color: "#94a3b8",
                    fontSize: width < 640 ? "1.1rem" : "1.25rem",
                }}
            >
                Loading your professional profile...
            </div>
        );
    }

    const {
        username = "Aspiring Full-Stack Developer",
        gmail = "",
        phone_number = "",
        profile_image_url = "https://via.placeholder.com/480?text=Profile",
        social_links = {},
        fresher = {},
        certifications = [],
    } = user;

    const { education = [], skills = [], projects = [] } = fresher;

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;

    const containerStyle = {
        maxWidth: "1400px",
        margin: "0 auto",
        paddingLeft: isMobile ? "1.25rem" : isTablet ? "2rem" : "3rem",
        paddingRight: isMobile ? "1.25rem" : isTablet ? "2rem" : "3rem",
    };

    const sectionBaseStyle = {
        paddingTop: isMobile ? "4rem" : isTablet ? "5rem" : "6rem",
        paddingBottom: isMobile ? "4rem" : isTablet ? "5rem" : "6rem",
        ...containerStyle,
    };

    const headingStyle = {
        fontSize: isMobile ? "2.25rem" : isTablet ? "3rem" : "3.75rem",
        fontWeight: 700,
        textAlign: "center",
        marginBottom: isMobile ? "2.5rem" : "4rem",
        color: "#c4b5fd",
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0f172a",
                color: "#e2e8f0",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                lineHeight: 1.6,
            }}
        >

            {/* ──────────────── HERO ──────────────── */}
            <section
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: isMobile ? "6rem" : 0,
                    paddingBottom: isMobile ? "4rem" : 0,
                }}
            >
                <div
                    style={{
                        ...containerStyle,
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                        gap: isMobile ? "3rem" : "4rem",
                        alignItems: "center",
                    }}
                >
                    <div style={{ textAlign: "left", maxWidth: isMobile ? "100%" : "none" }}>
                        <h1
                            style={{
                                fontSize: isMobile ? "3rem" : isTablet ? "4.5rem" : "6rem",
                                fontWeight: 800,
                                lineHeight: 0.95,
                                marginBottom: "1.25rem",
                                background: "linear-gradient(90deg, #f8fafc, #c4b5fd, #a78bfa)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                textAlign: "left",
                            }}
                        >
                            {username}
                        </h1>

                        <p style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", color: "#cbd5e1", marginBottom: "2rem", textAlign: "left" }}>
                            Open to Exciting Opportunities
                        </p>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "1.75rem",
                                justifyContent: "flex-start",
                                marginBottom: "2.5rem",
                                fontSize: isMobile ? "1rem" : "1.125rem",
                                color: "#94a3b8",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <FaMapMarkerAlt style={{ color: "#a78bfa", fontSize: "1.25rem" }} /> {userCity}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <FaCalendarAlt style={{ color: "#a78bfa", fontSize: "1.25rem" }} /> Available Immediately
                            </div>
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "flex-start" }}>
                            <button
                                onClick={copyEmail}
                                style={{
                                    padding: isMobile ? "0.75rem 1.75rem" : "0.875rem 2.25rem",
                                    borderRadius: "9999px",
                                    background: copied ? "#6d28d9" : "#7c3aed",
                                    color: "white",
                                    fontWeight: 600,
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 10px 25px rgba(124,58,237,0.25)",
                                    fontSize: isMobile ? "0.95rem" : "1rem",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#6d28d9")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = copied ? "#6d28d9" : "#7c3aed")}
                            >
                                {copied ? "Email Copied!" : "Copy Email"} <FaEnvelope />
                            </button>

                            {phone_number && (
                                <a
                                    href={`tel:${phone_number}`}
                                    style={{
                                        padding: isMobile ? "0.75rem 1.75rem" : "0.875rem 2.25rem",
                                        borderRadius: "9999px",
                                        border: "2px solid #a78bfa",
                                        color: "#a78bfa",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        transition: "all 0.3s ease",
                                        fontSize: isMobile ? "0.95rem" : "1rem",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(167,139,250,0.1)";
                                        e.currentTarget.style.borderColor = "#c4b5fd";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.borderColor = "#a78bfa";
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
                            maxWidth: isMobile ? "280px" : isTablet ? "360px" : "420px",
                            margin: isMobile ? "0 auto" : "0",
                        }}
                    >
                        <div
                            style={{
                                borderRadius: "1.5rem",
                                overflow: "hidden",
                                border: "4px solid rgba(167,139,250,0.2)",
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                            }}
                        >
                            <img
                                src={profile_image_url}
                                alt={username}
                                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", aspectRatio: "1 / 1" }}
                            />
                        </div>

                        <div
                            style={{
                                position: "absolute",
                                bottom: "-0.75rem",
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: "#7c3aed",
                                color: "white",
                                padding: isMobile ? "0.4rem 1.2rem" : "0.5rem 1.5rem",
                                borderRadius: "9999px",
                                fontWeight: 600,
                                boxShadow: "0 10px 25px rgba(124,58,237,0.4)",
                                fontSize: isMobile ? "0.85rem" : "1rem",
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
                <section style={{ background: "rgba(15,23,42,0.5)", ...sectionBaseStyle }}>
                    <h2 style={headingStyle}>Core Skills</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? "0.75rem" : "1rem", justifyContent: "center" }}>
                        {skills.map((skill, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: isMobile ? "0.6rem 1.2rem" : "0.75rem 1.5rem",
                                    background: "rgba(30,41,59,0.7)",
                                    border: "1px solid #334155",
                                    borderRadius: "9999px",
                                    fontSize: isMobile ? "0.9rem" : "1.1rem",
                                    fontWeight: 500,
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "#a78bfa";
                                    e.currentTarget.style.background = "rgba(167,139,250,0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "#334155";
                                    e.currentTarget.style.background = "rgba(30,41,59,0.7)";
                                }}
                            >
                                {skill.name} <span style={{ color: "#a78bfa" }}>• {skill.level}/10</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ──────────────── PROJECTS ──────────────── */}
            {projects?.length > 0 && (
                <section style={sectionBaseStyle}>
                    <h2 style={headingStyle}>Featured Projects</h2>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                            gap: isMobile ? "1.5rem" : "2rem",
                        }}
                    >
                        {projects.map((proj, i) => (
                            <div
                                key={i}
                                style={{
                                    background: "rgba(30,41,59,0.6)",
                                    border: "1px solid #334155",
                                    borderRadius: "1.25rem",
                                    overflow: "hidden",
                                    transition: "all 0.4s ease",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-8px)";
                                    e.currentTarget.style.borderColor = "#a78bfa";
                                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(167,139,250,0.15)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.borderColor = "#334155";
                                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
                                }}
                            >
                                <img
                                    src={proj.image_url || "https://via.placeholder.com/640x360?text=Project"}
                                    alt={proj.title}
                                    style={{ width: "100%", height: isMobile ? "180px" : "220px", objectFit: "cover" }}
                                />
                                <div style={{ padding: isMobile ? "1.25rem" : "1.75rem" }}>
                                    <h3 style={{ fontSize: isMobile ? "1.35rem" : "1.5rem", fontWeight: 700, marginBottom: "0.75rem", color: "#c4b5fd" }}>
                                        {proj.title}
                                    </h3>
                                    <p style={{ color: "#94a3b8", marginBottom: "1rem", lineHeight: 1.6, fontSize: isMobile ? "0.9rem" : "0.95rem" }}>
                                        {proj.description}
                                    </p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                                        {proj.technologies?.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                style={{
                                                    padding: "0.35rem 0.85rem",
                                                    background: "rgba(167,139,250,0.15)",
                                                    color: "#c4b5fd",
                                                    borderRadius: "9999px",
                                                    fontSize: isMobile ? "0.8rem" : "0.85rem",
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
                                            style={{ color: "#a78bfa", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", fontSize: isMobile ? "0.9rem" : "1rem" }}
                                        >
                                            View Project <FaExternalLinkAlt size={isMobile ? 13 : 14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ──────────────── EDUCATION & CERTS ──────────────── */}
            <section style={{ background: "rgba(15,23,42,0.5)", ...sectionBaseStyle }}>
                <h2 style={headingStyle}>Education & Certifications</h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                        gap: isMobile ? "1.5rem" : "2rem",
                    }}
                >
                    {education.map((edu, i) => (
                        <div
                            key={i}
                            style={{
                                background: "rgba(30,41,59,0.6)",
                                border: "1px solid #334155",
                                borderRadius: "1.25rem",
                                padding: isMobile ? "1.5rem" : "2rem",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#a78bfa")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#334155")}
                        >
                            <FaGraduationCap style={{ fontSize: isMobile ? "2.5rem" : "3rem", color: "#a78bfa", marginBottom: "1rem" }} />
                            <h3 style={{ fontSize: isMobile ? "1.35rem" : "1.5rem", fontWeight: 700, marginBottom: "0.5rem", color: "#c4b5fd" }}>
                                {edu.degree}
                            </h3>
                            <p style={{ color: "#94a3b8", fontSize: isMobile ? "0.9rem" : "1rem" }}>
                                {edu.institution} • {edu.graduation_year}
                            </p>
                        </div>
                    ))}

                    {certifications.map((cert, i) => (
                        <div
                            key={i}
                            style={{
                                background: "rgba(30,41,59,0.6)",
                                border: "1px solid #334155",
                                borderRadius: "1.25rem",
                                padding: isMobile ? "1.5rem" : "2rem",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#a78bfa")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#334155")}
                        >
                            <FaCertificate style={{ fontSize: isMobile ? "2.5rem" : "3rem", color: "#a78bfa", marginBottom: "1rem" }} />
                            <h3 style={{ fontSize: isMobile ? "1.35rem" : "1.5rem", fontWeight: 700, marginBottom: "0.5rem", color: "#c4b5fd" }}>
                                {cert.title}
                            </h3>
                            <p style={{ color: "#94a3b8", marginBottom: "1rem", fontSize: isMobile ? "0.9rem" : "1rem" }}>
                                {cert.issuer} • {new Date(cert.issue_date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                            </p>
                            {cert.certificate_pdf_url && (
                                <a
                                    href={cert.certificate_pdf_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#a78bfa", fontWeight: 600, textDecoration: "none", fontSize: isMobile ? "0.9rem" : "1rem" }}
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
                    background: "#0f172a",
                    borderTop: "1px solid #334155",
                    paddingTop: isMobile ? "4rem" : "5rem",
                    paddingBottom: "3rem",
                    textAlign: "center",
                    ...containerStyle,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: isMobile ? "1.5rem" : "2.5rem",
                        marginBottom: "3rem",
                        fontSize: isMobile ? "1rem" : "1.125rem",
                    }}
                >
                    {gmail && (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <FaEnvelope style={{ color: "#a78bfa", fontSize: "1.25rem" }} /> {gmail}
                            <button onClick={copyEmail} style={{ background: "none", border: "none", color: "#a78bfa", cursor: "pointer", fontSize: "1.25rem" }}>
                                <FaCopy />
                            </button>
                        </div>
                    )}

                    {phone_number && (
                        <a href={`tel:${phone_number}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#e2e8f0", textDecoration: "none" }}>
                            <FaPhoneAlt style={{ color: "#a78bfa", fontSize: "1.25rem" }} /> {phone_number}
                        </a>
                    )}

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <FaMapMarkerAlt style={{ color: "#a78bfa", fontSize: "1.25rem" }} /> {userCity}
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? "1.5rem" : "2.5rem", marginBottom: "2rem", fontSize: isMobile ? "2rem" : "2.25rem" }}>
                    {social_links?.github && (
                        <a href={social_links.github} target="_blank" rel="noopener noreferrer" style={{ color: "#e2e8f0", transition: "color 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#e2e8f0")}
                        >
                            <FaGithub />
                        </a>
                    )}
                    {social_links?.linkedin && (
                        <a href={social_links.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#e2e8f0", transition: "color 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#e2e8f0")}
                        >
                            <FaLinkedin />
                        </a>
                    )}
                    {social_links?.twitter && (
                        <a href={social_links.twitter} target="_blank" rel="noopener noreferrer" style={{ color: "#e2e8f0", transition: "color 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#e2e8f0")}
                        >
                            <FaTwitter />
                        </a>
                    )}
                </div>

                <p style={{ color: "#64748b", fontSize: isMobile ? "0.9rem" : "0.95rem" }}>
                    © {new Date().getFullYear()} {username} • Professional Portfolio
                </p>
            </footer>
        </div>
    );
};

export default TemplateFresherProfessional;