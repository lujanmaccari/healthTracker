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
        <h5
          style={{
            color: "#333",
            marginBottom: "12px",
            fontSize: "16px",
          }}
        >
          Acerca de las horas de estudio
        </h5>
        <p
          style={{
            color: "#666",
            lineHeight: "1.5",
            fontSize: "14px",
          }}
        >
          Registrar tus horas de estudio en HealthTracker te ayuda a organizar
          mejor tu tiempo y mantener el foco en tus objetivos académicos. Al
          visualizar tu dedicación diaria, podés identificar hábitos, mejorar tu
          concentración y evitar la procrastinación. Estudiar de forma constante
          no solo mejora el rendimiento, sino que también reduce el estrés antes
          de exámenes y entregas importantes. ¡Cada hora cuenta, y estás más cerca de tus metas de lo que creés!
        </p>
      </div>
    </div>
  );
};
