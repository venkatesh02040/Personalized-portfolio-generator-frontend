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

const MAX_RETRIES = 5;        // retry up to 5 times
const RETRY_DELAY = 5000;     // wait 5 seconds between each retry

const PublicPortfolio = () => {
  const { username, templateId } = useParams();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Loading portfolio...");

  useEffect(() => {
    let isMounted = true;
    let retries = 0;

    const fetchWithRetry = async () => {
      while (retries <= MAX_RETRIES) {
        try {
          if (retries > 0) {
            setStatusMessage(`Server is waking up, please wait... (${retries}/${MAX_RETRIES})`);
          }

          const res = await axios.get(`${PUBLIC_API}/${username}`, {
            timeout: 15000  // 15 second timeout per request
          });

          if (isMounted) {
            setUserData(res.data.data);
            setLoading(false);
          }
          return; // success — stop retrying

        } catch (err) {
          retries++;
          setRetryCount(retries);

          if (retries > MAX_RETRIES) {
            // all retries exhausted
            if (isMounted) {
              setStatusMessage("Could not load portfolio. Please try again later.");
              setLoading(false);
            }
            return;
          }

          // wait before retrying
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
      }
    };

    fetchWithRetry();

    return () => {
      isMounted = false; // cleanup to prevent state update on unmounted component
    };
  }, [username]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "150px 20px" }}>
        <Spin size="large" />
        <p style={{ marginTop: 20, fontSize: "1rem", color: "#888" }}>
          {statusMessage}
        </p>
        {retryCount > 0 && (
          <p style={{ fontSize: "0.85rem", color: "#aaa" }}>
            This may take up to 30 seconds on first load.
          </p>
        )}
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