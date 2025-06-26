import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Container } from "react-bootstrap";
import { COLORS } from "../constants/colors";
import {
  faAppleWhole,
  faBed,
  faBookOpen,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import CommonModal from "../utils/CommonModal";
import { useState } from "react";
import GoalSettingsModal from "./GoalSettingsModal";
import HeaderSection from "../utils/HeaderSection";

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
  const [showModal, setShowModal] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        padding: "16px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <HeaderSection
        title="Objetivos"
        onClickButton={handleOpenModal}
        btnTitle="Editar"
      />

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
                gap: "3rem",
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
                    textAlign: "center",
                    marginTop: "0.3rem",
                    marginBottom: "0.3rem",
                  }}
                >
                  Ahora tu objetivo es: <br />
                  <strong>{goal.value}</strong>
                  {goal.label.toLocaleLowerCase() !== "alimentación"
                    ? ` de ${goal.label}`
                    : null}
                </Card.Title>
              </div>
            </Container>
          </Card>
        ))}
        <CommonModal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={`Actualizar objetivos`}
          confirmText="Guardar"
          cancelText="Cancelar"
        >
          <GoalSettingsModal
            onClose={handleCloseModal}
            states={{ reloadData, setReloadData }}
          />
        </CommonModal>
      </div>
    </div>
  );
};

export default GoalSettings;
