import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";

import TemplateFresherModern from "../templates/fresher/TemplateFresherModern";
import TemplateFresherCreative from "../templates/fresher/TemplateFresherCreative";
import TemplateFresherProfessional from "../templates/fresher/TemplateFresherProfessional";
import ExperiencedExecutive from "../templates/experienced/ExperiencedExecutive";
import ExperiencedInnovative from "../templates/experienced/ExperiencedInnovative";
import ExperiencedStory from "../templates/experienced/ExperiencedStory";

const PUBLIC_API =
  "https://personalized-portfolio-generator.onrender.com/api/public";

const PublicPortfolio = () => {
  const { username, templateId } = useParams();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicPortfolio = async () => {
      try {
        const res = await axios.get(`${PUBLIC_API}/${username}`);
        setUserData(res.data.data);
      } catch (err) {
        console.error("Error fetching public portfolio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicPortfolio();
  }, [username]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "150px 20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!userData) {
    return <h2 style={{ textAlign: "center" }}>Portfolio not found</h2>;
  }

  const renderTemplate = () => {
    switch (templateId) {
      case "fresher-modern":
        return <TemplateFresherModern user={userData} />;

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
        return <h2 style={{ textAlign: "center" }}>Invalid Template</h2>;
    }
  };

  return renderTemplate();
};

export default PublicPortfolio;