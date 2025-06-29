const AboutFood = () => (
  <div>
    <div
      style={{
        backgroundColor: "#F5F5F5",
        padding: "16px",
        borderRadius: "12px",
        marginTop: 50,
      }}
    >
       <h5 style={{ color: "#333", marginBottom: "15px" }}>
          Acerca de <b>Alimentación</b>
        </h5>
       <p
          style={{
            color: "#666",
            lineHeight: "1.5",
            fontSize: "clamp(13px, 3vw, 15px)",
            textAlign: "justify",
          }}
        >
        Registrar tus hábitos alimenticios ayudará a cuidar tu cuerpo y construie la mejor versión de vos mismo.
      </p>
    </div>
  </div>
);

export default AboutFood;
