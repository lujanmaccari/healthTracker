import React from "react";

export const AboutStudy = () => {
  return (
    <div>
      {" "}
      <div
        style={{
          backgroundColor: "#F5F5F5",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <h5 style={{ color: "#333", marginBottom: "15px" }}>
          Acerca de <b>Horas de Estudio</b>
        </h5>
        <p
          style={{
            color: "#666",
            lineHeight: "1.5",
            fontSize: "clamp(13px, 3vw, 15px)",
            textAlign: "justify",
          }}
        >
          Registrar tus horas de estudio te ayuda a visualizar tu dedicación
          diaria, identificar hábitos, mejorar tu concentración y evitar la
          procrastinación.
        </p>
      </div>
    </div>
  );
};
