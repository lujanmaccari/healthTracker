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

const StudyChart = () => {
  const [activeFilter, setActiveFilter] = useState("W"); // semana como default
  const [showModal, setShowModal] = useState(false);
  const [studyHours, setStudyHours] = useState(1.15); // horas por defecto 

  // purooo mock x2
  const studyData = {
    D: {
      labels: ["6-9am", "9-12am", "12-15pm", "15-18pm", "18-21pm", "21-24pm"],
      data: [0.5, 1.2, 0, 0.8, 1.5, 0],
    },
    W: {
      labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
      data: [1.5, 2.0, 1.0, 1.8, 0.5, 0, 1.0],
    },
    M: {
      labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
      data: [6.5, 7.0, 5.5, 8.0],
    },
    BM: { // BM = 6 meses
      labels: ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
      data: [35, 40, 30, 45, 38, 42],
    },
    Y: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      data: [38, 35, 40, 42, 45, 38, 35, 40, 45, 42, 38, 40],
    },
  };

  const filterButtons = [
    { id: "D", label: "Día" },
    { id: "W", label: "Semana" },
    { id: "M", label: "Mes" },
    { id: "BM", label: "6 Meses" },
    { id: "Y", label: "Año" },
  ];

  const currentData = studyData[activeFilter];
  const totalHours = currentData.data.reduce((a, b) => a + b, 0);
  const averageHours = activeFilter === "D" ? totalHours : 
                     activeFilter === "W" ? totalHours / 7 : 
                     activeFilter === "M" ? totalHours / 4 : 
                     activeFilter === "BM" ? totalHours / 6 / 30 : 
                     totalHours / 12 / 30;

  const data = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Horas",
        data: currentData.data,
        backgroundColor: "#4a6fa5",
        borderColor: "transparent",
        borderRadius: 4,
        barThickness: 24,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Horas",
          font: {
            weight: 'bold',
            size: 12
          }
        },
        max: activeFilter === "D" ? 3 : 
             activeFilter === "W" ? 3 : 
             activeFilter === "M" ? 10 : 
             activeFilter === "BM" ? 50 : 50,
        grid: {
          display: true,
          color: "#e0e0e0"
        },
        ticks: {
          stepSize: activeFilter === "D" ? 0.5 : 
                   activeFilter === "W" ? 0.5 : 
                   activeFilter === "M" ? 2 : 
                   activeFilter === "BM" ? 10 : 10
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.parsed.y} horas`;
          },
        },
      },
    },
  };

  const handleSubmit = () => {
    console.log({
      hours: studyHours,
      date: new Date().toISOString().split('T')[0]
    });
    setShowModal(false);
  };

  return (
    <Container style={{ maxWidth: "800px", position: "relative" }}>
      <HeaderSection
        title="Horas de estudio"
        buttonTitle="Agregar"
        onClickButton={() => setShowModal(true)}
        buttonStyle={{
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          padding: "0"
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "6px",
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
              borderRadius: "8px",
              backgroundColor: activeFilter === button.id ? "#4a6fa5" : "#f0f0f0",
              color: activeFilter === button.id ? "white" : "#333",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              minWidth: "40px"
            }}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div style={{ 
        height: "220px", 
        marginBottom: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        padding: "16px"
      }}>
        <Bar data={data} options={options} />
      </div>

      <div style={{ 
        textAlign: "center", 
        margin: "20px 0",
        fontSize: "16px",
        color: "#555"
      }}>
        <p>
          Estás promediando <strong>{averageHours.toFixed(2)}</strong> horas de estudio {
            activeFilter === "D" ? "hoy" :
            activeFilter === "W" ? "diarias esta semana" :
            activeFilter === "M" ? "por semana este mes" :
            activeFilter === "BM" ? "diarias estos 6 meses" :
            "diarias este año"
          }
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#F5F5F5",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <h5 style={{ 
          color: "#333", 
          marginBottom: "12px",
          fontSize: "16px"
        }}>
          Acerca de <b>Horas de Estudio</b>
        </h5>
        <p style={{ 
          color: "#666", 
          lineHeight: "1.5",
          fontSize: "14px"
        }}>
          Registrá tus horas de estudio para llevar un seguimiento de tu progreso académico. 
          Analizá tus patrones y mejorá tu rendimiento.
          A ver si promocionás Analisis Matemático, burrito.
        </p>
      </div>

      <CommonModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={handleSubmit}
        title="Registrar horas"
        confirmText="Guardar"
        cancelText="Cancelar"
      >
        <div style={{ width: "100%", marginBottom: "1rem" }}>
          <div className="mb-3">
            <label className="form-label">Horas de estudio:</label>
            <input
              type="number"
              min="0"
              max="24"
              step="0.50"
              value={studyHours}
              onChange={(e) => setStudyHours(parseFloat(e.target.value))}
              className="form-control"
              style={{ fontSize: "1rem" }}
            />
          </div>
          <small className="text-muted">Ingresá las horas estudiadas hoy</small>
        </div>
      </CommonModal>
    </Container>
  );
};

export default StudyChart;