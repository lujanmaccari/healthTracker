import { useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Container } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import HeaderSection from "../../utils/HeaderSection";
import CommonModal from "../../utils/CommonModal";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FeelingChart = () => {
  const [activeFilter, setActiveFilter] = useState("W"); // semana como default
  const [showModal, setShowModal] = useState(false);
  const [mood, setMood] = useState(50); // automatico mete en 50%
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  // puro mock
  const moodData = {
    D: {
      labels: ["6am", "9am", "12pm", "3pm", "6pm", "9pm", "12am"],
      data: [3, 5, 4, 6, 7, 5, 4],
      mood: ["Triste", "Feliz", "Feliz", "Feliz", "Muy feliz", "Feliz", "Feliz"],
    },
    W: {
      labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
      data: [20, 25, 30, 35, 40, 45, 50],
      mood: ["Triste", "Feliz", "Feliz", "Feliz", "Muy feliz", "Feliz", "Feliz"],
    },
    M: {
      labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
      data: [15, 20, 25, 30],
      mood: ["Triste", "Feliz", "Feliz", "Muy feliz"],
    },
    GM: {
      labels: ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
      data: [20, 25, 30, 35, 40, 45],
      mood: ["Triste", "Feliz", "Feliz", "Muy feliz", "Feliz", "Feliz"],
    },
    Y: {
      labels: [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun", 
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
      ],
      data: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
      mood: Array(12).fill("Feliz"),
    },
  };

  const filterButtons = [
    { id: "D", label: "Día" },
    { id: "W", label: "Semana" },
    { id: "M", label: "Mes" },
    { id: "GM", label: "6 Meses" },
    { id: "Y", label: "Año" },
  ];

  const currentData = moodData[activeFilter];
  const averageMood = currentData.data.reduce((a, b) => a + b, 0) / currentData.data.length;

  const data = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Estado de ánimo",
        data: currentData.data,
        backgroundColor: "#A5B48E",
        borderColor: "transparent",
        borderRadius: 10,
        barThickness: activeFilter === "D" ? 30 : activeFilter === "Y" ? 20 : 50,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Intensidad",
        },
        max: activeFilter === "D" ? 10 : activeFilter === "W" ? 60 : 80,
      },
      x: {
        title: {
          display: true,
          text: activeFilter === "D" 
            ? "Hora del día" 
            : activeFilter === "W" 
            ? "Día de la semana" 
            : activeFilter === "M" 
            ? "Semana del mes" 
            : activeFilter === "GM" 
            ? "Mes (últimos 6)" 
            : "Mes del año",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Estado: ${currentData.mood[context.dataIndex]}`;
          },
        },
      },
    },
  };

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
    setShowModal(false);
  };

  return (
    <Container style={{ maxWidth: "800px", position: "relative" }}>
      <HeaderSection
        title="Estado de ánimo"
        buttonTitle="Agregar"
        onClickButton={() => setShowModal(true)}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        {filterButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => setActiveFilter(button.id)}
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: activeFilter === button.id ? "#A5B48E" : "#E8E8E8",
              color: activeFilter === button.id ? "white" : "black",
              fontWeight: "500",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <p style={{ fontSize: "16px", color: "#555" }}>
          En promedio te has sentido{" "}
          <span style={{ fontWeight: "bold", color: "#333" }}>
            {averageMood > 50 ? "muy bien" : averageMood > 30 ? "bien" : "regular"}
          </span>{" "}
          {activeFilter === "D"
            ? "hoy"
            : activeFilter === "W"
            ? "esta semana"
            : activeFilter === "M"
            ? "este mes"
            : activeFilter === "GM"
            ? "estos 6 meses"
            : "este año"}
          .
        </p>
      </div>

      <div style={{ height: "300px", marginBottom: "30px" }}>
        <Bar data={data} options={options} />
      </div>

      <div
        style={{
          backgroundColor: "#F5F5F5",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "30px",
        }}
      >
        <h5 style={{ color: "#333", marginBottom: "15px" }}>Acerca de Estado de ánimo</h5>
        <p style={{ color: "#666", lineHeight: "1.5" }}>
          Registra tu estado de ánimo diario para identificar patrones y mejorar tu 
          bienestar emocional. Los datos te ayudarán a entender qué factores influyen 
          en cómo te sientes.
        </p>
      </div>

      {/* Modal para agregar sentimiento */}
      <CommonModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={handleSubmit}
        title="Estado de ánimo"
        confirmText="Agregar"
        cancelText="Cancelar"
      >
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
      </CommonModal>
    </Container>
  );
};

export default FeelingChart;