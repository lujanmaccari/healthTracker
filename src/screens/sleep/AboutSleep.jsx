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
        <h5 style={{ color: "#333", marginBottom: "15px" }}>
          Acerca de <b>Horas de Sueño</b>
        </h5>
        <p
          style={{
            color: "#666",
            lineHeight: "1.5",
            fontSize: "clamp(13px, 3vw, 15px)",
            textAlign: "justify",
          }}
        >
          Dormir bien es fundamental para recuperar energía, mantener la
          concentración y regular el estado de ánimo. Llevar un control diario
          te ayuda a detectar patrones y ajustar tu rutina para lograr un sueño
          más reparador.
        </p>
      </div>
    </div>
  );
};

export default AboutSleep;
