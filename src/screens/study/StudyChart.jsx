import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Container } from "react-bootstrap";
import CommonModal from "../../utils/CommonModal";
import GenericBarChart from "../../utils/GenericBarChart";
import { AboutStudy } from "./AboutStudy";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StudyChart = () => {
  const [showModal, setShowModal] = useState(false);
  const [studyHours, setStudyHours] = useState(1.15); // horas por defecto según tu imagen

  // Datos mock de horas de estudio basados en tu imagen
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
    BM: {
      // BM = 6 meses
      labels: ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
      data: [35, 40, 30, 45, 38, 42],
    },
    Y: {
      labels: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      data: [38, 35, 40, 42, 45, 38, 35, 40, 45, 42, 38, 40],
    },
  };

  const handleSubmit = () => {
    console.log({
      hours: studyHours,
      date: new Date().toISOString().split("T")[0],
    });
    setShowModal(false);
  };

  return (
    <Container>
      <GenericBarChart
        title="Horas de estudio"
        handleOpenModal={() => setShowModal(true)}
        chartData={studyData}
      />
      <AboutStudy />
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
          <small className="text-muted">Ingresa las horas estudiadas hoy</small>
        </div>
      </CommonModal>
    </Container>
  );
};

export default StudyChart;
