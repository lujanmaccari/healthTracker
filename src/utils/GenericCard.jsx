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
          gap: ".5rem",
          position: "relative",
          paddingRight: "2rem",
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ color: COLORS.MAIN, height: "2.5rem", width: "2.5rem" }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Card.Title
            style={{
              color: COLORS.DARK_TEXT,
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              textAlign: "left",
              paddingLeft: 5,
              marginTop: 10,
            }}
          >
            {title}
          </Card.Title>

          <Card.Body
            style={{
              padding: "0",
              marginLeft: "-.7rem",
              paddingRight: ".2rem",
              textAlign: "left",
            }}
          >
            {Array.isArray(body) && body.length % 2 === 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {body.map((item, idx) =>
                  idx % 2 === 0 ? (
                    <div
                      key={idx}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <small style={{ fontWeight: "normal" }}>{item}</small>
                      <strong>{body[idx + 1]}</strong>
                    </div>
                  ) : null
                )}
              </div>
            ) : (
              <Card.Text
                style={{
                  wordWrap: "break-word",
                  fontSize: ".62rem",
                }}
              >
                {Array.isArray(body) ? body.join(" | ") : body}
              </Card.Text>
            )}
          </Card.Body>
        </div>

        <FontAwesomeIcon
          onClick={href ? redirect : onClickIcon}
          icon={faCircleChevronRight}
          style={{
            width: "2rem",
            height: "2rem",
            color: COLORS.SECONDARY,
            cursor: "pointer",
            position: "absolute",
            top: 0,
            right: 10,
          }}
        />
      </Container>
    </Card>
  );
};

export default GenericCard;
