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
import AddStudy from "./AddStudy";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StudyChart = () => {
  const [showModal, setShowModal] = useState(false);
  // const [studyHours, setStudyHours] = useState(1.15); // horas por defecto

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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <GenericBarChart
        title="Horas de estudio"
        handleOpenModal={handleOpenModal}
        chartData={studyData}
      />
      <AboutStudy />
      <CommonModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Registrar tiempo de estudio"
        confirmText="Guardar"
        cancelText="Cancelar"
      >
        <AddStudy onClose={handleCloseModal} />
      </CommonModal>
    </Container>
  );
};

export default StudyChart;
