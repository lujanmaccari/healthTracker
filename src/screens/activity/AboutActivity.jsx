import React from "react";

export const AboutActivity = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#F5F5F5",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <h5 style={{ color: "#333", marginBottom: "15px" }}>
          Acerca de <b>Actividad</b>
        </h5>
       <p
          style={{
            color: "#666",
            lineHeight: "1.5",
            fontSize: "clamp(13px, 3vw, 15px)",
            textAlign: "justify",
          }}
        >
          Registrar tus ejercicios diarios te permite visualizar tu progreso,
          mantener la motivación y establecer metas alcanzables.
        </p>
      </div>
    </div>
  );
};
