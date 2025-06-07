import meditationImg from "../assets/meditation.png"; 

const AboutYou = () => {
  return (
    <div
      className="fullscreen-center"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        // backgroundColor: "#F5F5F5",
        padding: "2rem",
      }}
    >
      {/* Icono */}
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <img
          src={meditationImg} 
          alt="icono"
          style={{ height: "50px", opacity: 0.7 }}
        />
      </div>

      {/* Título */}
      <h2
        style={{ fontSize: "1.4rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Acerca de Ti
      </h2>

      {/* Descripción */}
      <p
        style={{
          textAlign: "center",
          maxWidth: "300px",
          fontSize: "0.95rem",
          color: "#333",
          marginBottom: "1.5rem",
        }}
      >
        Con esta información, Health Tracker calcula las calorías, la distancia
        y la intensidad de tu actividad, y puede ofrecerte sugerencias de
        entrenamiento personalizadas.
      </p>

      {/* Campos */}
      <div style={{ width: "100%", maxWidth: "320px" }}>
        <label
          style={{
            fontSize: "0.9rem",
            marginBottom: "0.3rem",
            display: "block",
          }}
        >
          Género
        </label>
        <select style={fieldStyle}>
          <option>Selecciona</option>
          <option>Femenino</option>
          <option>Masculino</option>
          <option>Otro</option>
        </select>

        <label style={labelStyle}>Edad</label>
        <input type="number" placeholder="Ej: 25" style={fieldStyle} />

        <label style={labelStyle}>Altura (cm)</label>
        <input type="number" placeholder="Ej: 165" style={fieldStyle} />

        <label style={labelStyle}>Peso (kg)</label>
        <input type="number" placeholder="Ej: 60" style={fieldStyle} />
      </div>

      {/* Botón siguiente redondo */}
      <div style={{ marginTop: "2rem" }}>
        <button
          style={{
            backgroundColor: "#9DC08B",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "1.5rem",
            lineHeight: "1.5rem",
            cursor: "pointer",
          }}
        >
          →
        </button>
      </div>
    </div>
  );
};

// Estilos reutilizables
const fieldStyle = {
  width: "100%",
  padding: "0.6rem",
  marginBottom: "1rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
};

const labelStyle = {
  fontSize: "0.9rem",
  marginBottom: "0.3rem",
  display: "block",
};

export default AboutYou;
