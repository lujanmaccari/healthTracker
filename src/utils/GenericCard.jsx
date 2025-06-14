import {
  faAppleWhole,
  faBed,
  faBookOpen,
  faFire,
  faSpa,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GenericCard = ({ title, body, icon, href }) => {
  const navigate = useNavigate();
  switch (icon) {
    case "fire":
      icon = faFire;
      break;
    case "mood":
      icon = faSpa;
      break;
    case "sleep":
      icon = faBed;
      break;
    case "study":
      icon = faBookOpen;
      break;
    case "food":
      icon = faAppleWhole;
      break;
    default:
      break;
  }
  const redirect = () => {
    if (href) {
      navigate(href);
    }
  };
  return (
    <Card
      style={{
        background: "#dfdfdf",
        border: "none",
        width: "80vw",
        boxShadow: "-10px 10px 10px -2px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ color: "#a5b48e", height: "8vh" }}
        />

        <Card.Title
          style={{
            color: "#737d63",
            fontWeight: "bold",
          }}
        >
          {title}
        </Card.Title>

        <svg
          onClick={redirect}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{
            width: "2rem",
            height: "2rem",
            color: "#a5b48e",
            marginLeft: "auto",
            cursor: "pointer",
          }}
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
            clipRule="evenodd"
          />
        </svg>
      </Container>

      <Card.Body>
        <Card.Text>{Array.isArray(body) ? body.join(" | ") : body}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GenericCard;
