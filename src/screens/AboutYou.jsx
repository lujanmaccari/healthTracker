import meditationImg from "../assets/meditationSmall.jpeg";

const AboutYou = () => {
  const labelStyle = {
    fontSize: "0.9rem",
    marginBottom: "0.3rem",
    display: "block",
  };

  const fieldStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.8rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };
  return (
    <div className="d-flex flex-column align-items-center mt-3 gap-3" 
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
     <div className="mb-2"> 
        <img 
          src={meditationImg} 
          alt="Userexample" 
          style={{ 
            width: '100px', 
            height: '100px',
            borderRadius: '50%',
            objectFit: 'cover'
          }} 
          
        />
        <h3 className="mb-3">Acerca de Ti</h3>
      </div> 
     
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          fontSize: "0.95rem",
          color: "#333",
          marginBottom: "1.5rem",
        }}
      >
        Con esta información, Health Tracker calcula las calorías, la distancia
        y la intensidad de tu actividad, y puede ofrecerte sugerencias de
        entrenamiento personalizadas.
      </p>

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

        <label style={labelStyle}>Correo electrónico</label>
        <input type="email" placeholder="Ej: ejemplo@mail.com" style={fieldStyle} />

       <label style={labelStyle}>Contraseña</label>
       <input type="password" placeholder="********" style={fieldStyle} />
      </div>

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



export default AboutYou;
