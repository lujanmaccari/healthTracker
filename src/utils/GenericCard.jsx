import {
  faAppleWhole,
  faBed,
  faBookOpen,
  faFire,
  faSpa,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../constants/colors";

const GenericCard = ({ title, body, icon, href, onClickIcon }) => {
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
        background: COLORS.SECONDARY_BG,
        border: "none",
        width: "80vw",
        padding: "15px 0px",
        borderRadius: 20,
      }}
    >
      <Container
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "start",
          gap: "1rem",
          position: "relative",
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ color: COLORS.MAIN, height: "4rem", width: "4rem" }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Card.Title
            style={{
              color: COLORS.DARK_TEXT,
              fontSize: "5vh",
              textAlign: "left",
              paddingLeft: 5,
              marginTop: 10,
            }}
          >
            {title}
          </Card.Title>
          <Card.Body style={{ width: "60vw", fontSize: "3vh" }}>
            <Card.Text>
              {Array.isArray(body) ? body.join(" | ") : body}
            </Card.Text>
          </Card.Body>
        </div>

        <FontAwesomeIcon
          onClick={href ? redirect : onClickIcon}
          icon={faCircleChevronRight}
          style={{
            width: "2.5rem",
            height: "2.5rem",
            color: COLORS.SECONDARY,
            cursor: "pointer",
            position: "absolute",
            top: 5,
            right: 20,
          }}
        />
      </Container>
    </Card>
  );
};

export default GenericCard;
