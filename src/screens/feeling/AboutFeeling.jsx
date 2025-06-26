import React from "react";

const AboutFeeling = () => {
  return (
    <div>
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
          Acerca del estado de ánimo
        </h5>
        <p
          style={{
            color: "#666",
            lineHeight: "1.5",
            fontSize: "14px",
          }}
        >
          Registrar tus estados de ánimo en HealthTracker te ayuda a tomar
          conciencia de tus emociones y entender cómo influyen en tu día a día.
          Al llevar un seguimiento regular, podés identificar patrones,
          reconocer qué situaciones te afectan y trabajar en tu bienestar
          emocional. Esta práctica favorece la salud mental y te permite tomar
          decisiones más conscientes. ¡Escucharte a vos mismo es el primer paso
          para sentirte mejor cada día!
        </p>
      </div>
    </div>
  );
};

export default AboutFeeling;
