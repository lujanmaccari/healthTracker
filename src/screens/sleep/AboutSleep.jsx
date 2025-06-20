import React from "react";

const AboutSleep = () => {
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
          Acerca de Horas de sueño
        </h5>
        <p
          style={{
            color: "#666",
            lineHeight: "1.5",
            fontSize: "14px",
          }}
        >
          Registrar tus horas de sueño en HealthTracker te permite entender
          mejor tus hábitos de descanso y mejorar tu bienestar general. Dormir
          bien es fundamental para recuperar energía, mantener la concentración
          y regular el estado de ánimo. Llevar un control diario te ayuda a
          detectar patrones y ajustar tu rutina para lograr un sueño más
          reparador. ¡Un buen descanso es el primer paso para rendir al máximo
          cada día!
        </p>
      </div>
    </div>
  );
};

export default AboutSleep;
