import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "react-bootstrap";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../constants/colors";
import {
  faAppleWhole,
  faBed,
  faBookOpen,
  faFire,
  faSpa,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const goals = [
  {
    label: "Actividad",
    value: "30 minutos diarios",
    icon: faFire,
  },
  { label: "Sueño", value: "8 horas diarias", icon: faBed },
  {
    label: "Alimentación",
    value: "buena alimentación diaria",
    icon: faAppleWhole,
  },
  {
    label: "Hs. de Estudio",
    value: "120 minutos diarios",
    icon: faBookOpen,
  },
];

const GoalSettings = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/home");
  };

  return (
    <div
      style={{
        padding: "16px",
        maxWidth: "70vw",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "5vh",
          marginBottom: "12px",
        }}
      >
        <Button
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
          }}
          onClick={goBack}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ color: COLORS.MAIN, height: "3vh", cursor: "pointer" }}
          />
        </Button>

        <h3
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            margin: 0,
            fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
          }}
        >
          Objetivos
        </h3>
      </div>

      {/* Descripción */}
      <p
        style={{
          fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
          marginBottom: "1vh",
          marginTop: "1vh",
        }}
      >
        Configurar tus objetivos en <strong>HealthTracker</strong> te ayuda a
        mantener el foco y darle sentido a cada hábito. Tener metas claras
        mejora tu compromiso y te motiva a seguir avanzando.
      </p>
      <p
        style={{
          fontWeight: "600",
          marginBottom: "5vh",
          marginTop: "1vh",
          fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)",
        }}
      >
        ¡Cada objetivo es un paso más hacia la mejor versión de vos!
      </p>

      {/* Objetivos */}
      <div
        style={{
          width: "70vw",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {goals.map((goal, idx) => (
          <Card
            key={idx}
            style={{
              background: COLORS.SECONDARY_BG,
              border: "none",
              padding: "12px",
              borderRadius: 20,
            }}
          >
            <Container
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <FontAwesomeIcon
                icon={goal.icon}
                style={{
                  color: COLORS.MAIN,
                  height: "2.8rem",
                  width: "2.8rem",
                }}
              />

              <div style={{ flex: 1, minWidth: "60%" }}>
                <Card.Title
                  style={{
                    color: COLORS.DARK_TEXT,
                    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                    textAlign: "left",
                    marginTop: "0.3rem",
                    marginBottom: "0.3rem",
                  }}
                >
                  {goal.label}
                </Card.Title>

                <Card.Text
                  style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)" }}
                >
                  Ahora tu objetivo es: <br />
                  <strong>{goal.value}</strong>
                </Card.Text>
              </div>

              <Button className="btnApp" style={{ fontSize: "0.9rem" }}>
                Editar
              </Button>
            </Container>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalSettings;
