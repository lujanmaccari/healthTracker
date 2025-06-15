import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddFeeling = () => {
  const navigate = useNavigate();
  const [mood, setMood] = useState(50);  // automatico mete en 50%
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  

  const getMoodLabel = () => {
    if (mood < 20) return "Muy mal";
    if (mood < 40) return "Mal";
    if (mood < 60) return "Regular";
    if (mood < 80) return "Bien";
    return "Muy bien";
  };

  const handleSubmit = () => {
    // aca se podria guardar el estado de ánimo en la base de datos
    console.log({
      moodValue: mood,
      moodLabel: getMoodLabel(),
      selectedEmotion,
      date: new Date().toISOString().split('T')[0]
    });
    navigate("/feeling");
  };

  return (
    <Container
      className="d-flex flex-column align-items-center mt-3 gap-3"
      style={{
        maxWidth: "400px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
      }}
    >
     
      <div
        onClick={() => navigate("/feeling")}
        style={{
          alignSelf: "flex-start",
          cursor: "pointer",
          color: "#a5b48e",
          fontSize: "1.5rem",
        }}
      >
        ←
      </div>

      <h2 style={{ alignSelf: "flex-start", marginBottom: "1.5rem" }}>Lolu</h2>


      <h4 style={{ alignSelf: "flex-start", width: "100%" }}>Estado de ánimo</h4>

      <div style={{ width: "100%", marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ color: "#666" }}>¿Cómo te has sentido hoy?</span>
         
        </div>

        {/* Barra deslizante */}
        <div style={{ width: "100%", margin: "1.5rem 0" }}>
          <input
            type="range"
            min="0"
            max="100"
            value={mood}
            onChange={(e) => setMood(parseInt(e.target.value))}
            style={{
              width: "100%",
              height: "8px",
              borderRadius: "4px",
              background: `linear-gradient(to right, #d1e8bf ${mood}%, #aecda3 ${mood}%)`,
              outline: "none",
              WebkitAppearance: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.5rem",
            }}
          >
            <span style={{ fontSize: "0.8rem", color: "#666" }}>Muy mal</span>
            <span style={{ fontSize: "0.8rem", color: "#666" }}>Muy bien</span>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            margin: "1.5rem 0",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#a5b48e",
          }}
        >
          {getMoodLabel()}
        </div>

       
        <button
          onClick={handleSubmit}
          style={{
            width: "45%",
            padding: "0.75rem",
            backgroundColor: "#a5b48e",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "1rem",
            marginTop: "1rem",
            cursor: "pointer",
          }}
        >
          Agregar
        </button>
      </div>
    </Container>
  );
};

export default AddFeeling;