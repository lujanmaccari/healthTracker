import { useState } from "react";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Container } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import HeaderSection from "../../utils/HeaderSection";
import CommonModal from "../../utils/CommonModal";

ChartJS.register(ArcElement, Tooltip, Legend);

const FoodChart = () => {
  const [activeFilter, setActiveFilter] = useState("D"); // día como default
  const [showModal, setShowModal] = useState(false);
  const [nutritionQuality, setNutritionQuality] = useState("medium"); // calidad por defecto

  // mock
  const nutritionData = {
    D: {
      good: 20,  // 20% buena
      medium: 30, // 30% media
      bad: 50    // 50% mala
    },
    W: {
      good: 60,
      medium: 25,
      bad: 15
    },
    M: {
      good: 65,
      medium: 20,
      bad: 15
    },
    BM: {
      good: 70,
      medium: 20,
      bad: 10
    },
    Y: {
      good: 75,
      medium: 15,
      bad: 10
    },
  };

  const filterButtons = [
    { id: "D", label: "Día" },
    { id: "W", label: "Semana" },
    { id: "M", label: "Mes" },
    { id: "BM", label: "6 Meses" },
    { id: "Y", label: "Año" },
  ];

  const currentData = nutritionData[activeFilter];

  const data = {
    labels: ["Buena", "Media", "Mala"],
    datasets: [
      {
        data: [currentData.good, currentData.medium, currentData.bad],
        backgroundColor: [
          "#4CAF50", // verde para buena
          "#FFC107", // amarillo para media
          "#F44336"  // rojo para mala
        ],
        borderColor: [
          "#388E3C",
          "#FFA000",
          "#D32F2F"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
    cutout: '70%',
  };

  // calidad predominante (la categoría con mayor porcentaje)
  const getDominantQuality = () => {
    const { good, medium, bad } = currentData;
    if (good >= medium && good >= bad) return { value: good, label: "Buena" };
    if (medium >= good && medium >= bad) return { value: medium, label: "Media" };
    return { value: bad, label: "Mala" };
  };

  // calidad general x default
  const evaluateQuality = () => {
    const { good, medium, bad } = currentData;
    
    if (bad >= 50) return { text: "mala", color: "#F44336" };
    if (bad >= 30 || medium >= 40) return { text: "regular", color: "#FFC107" };
    if (good >= 70) return { text: "excelente", color: "#4CAF50" };
    if (good >= 50) return { text: "buena", color: "#8BC34A" };
    return { text: "regular", color: "#FFC107" };
  };

  const dominantQuality = getDominantQuality();
  const qualityEvaluation = evaluateQuality();

  const handleSubmit = () => {
    console.log({
      quality: nutritionQuality,
      date: new Date().toISOString().split('T')[0]
    });
    setShowModal(false);
  };

  return (
    <Container style={{ maxWidth: "800px", position: "relative" }}>
      <HeaderSection
        title="Calidad de Alimentación"
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
        height: "300px", 
        marginBottom: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        padding: "16px",
        position: 'relative'
      }}>
        <Doughnut data={data} options={options} />
        
        {/* txt center doughnut */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: qualityEvaluation.color
          }}>
            {dominantQuality.value}%
          </div>
          <div style={{ 
            fontSize: '14px',
            color: '#666'
          }}>
            {dominantQuality.label}
          </div>
        </div>
      </div>

      {/* checkbox cality */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        margin: '20px 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="checkbox" 
            checked={dominantQuality.label === "Buena"}
            readOnly
            style={{ marginRight: '8px' }}
          />
          <span>Buena</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="checkbox" 
            checked={dominantQuality.label === "Media"}
            readOnly
            style={{ marginRight: '8px' }}
          />
          <span>Media</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="checkbox" 
            checked={dominantQuality.label === "Mala"}
            readOnly
            style={{ marginRight: '8px' }}
          />
          <span>Mala</span>
        </div>
      </div>

      <div style={{ 
        textAlign: "center", 
        margin: "20px 0",
        fontSize: "16px",
        color: "#555"
      }}>
        <p>
          Tu alimentación es <strong style={{
            color: qualityEvaluation.color,
            textTransform: 'capitalize'
          }}>{qualityEvaluation.text}</strong> {
            activeFilter === "D" ? "hoy" :
            activeFilter === "W" ? "esta semana" :
            activeFilter === "M" ? "este mes" :
            activeFilter === "BM" ? "estos 6 meses" :
            "este año"
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
          Acerca de <b>Calidad de Alimentación</b>
        </h5>
        <p style={{ 
          color: "#666", 
          lineHeight: "1.5",
          fontSize: "14px"
        }}>
          Registrá la calidad de tus comidas para llevar un seguimiento de tus hábitos alimenticios. 
          Una alimentación balanceada es clave para tu salud y bienestar. El aguita es importante :3
        </p>
      </div>

      <CommonModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={handleSubmit}
        title="Registrar comida"
        confirmText="Guardar"
        cancelText="Cancelar"
      >
        <div style={{ width: "100%", marginBottom: "1rem" }}>
          <div className="mb-3">
            <label className="form-label">Calidad de la comida:</label>
            <select
              value={nutritionQuality}
              onChange={(e) => setNutritionQuality(e.target.value)}
              className="form-select"
              style={{ fontSize: "1rem" }}
            >
              <option value="good">Buena (frutas, verduras, proteínas)</option>
              <option value="medium">Media (algo procesada, pero balanceada)</option>
              <option value="bad">Mala (muy procesada, alta en azúcares/grasas)</option>
            </select>
          </div>
          <small className="text-muted">Selecciona la calidad de tu última comida</small>
        </div>
      </CommonModal>
    </Container>
  );
};

export default FoodChart;