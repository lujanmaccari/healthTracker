{
  /* ESTE ARCHIVO NO SE USA :) */
}

import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CommonModal from "../../utils/CommonModal";

const AddFeeling = () => {
  const navigate = useNavigate();
  const [mood, setMood] = useState(50); // automatico mete en 50%
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
      date: new Date().toISOString().split("T")[0],
    });
    navigate("/feeling");
  };

  return (
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
    </div>
  );
};

export default AddFeeling;
