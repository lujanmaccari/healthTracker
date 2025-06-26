import { Container } from "react-bootstrap";
import GenericBarChart from "../../utils/GenericBarChart";
import AboutSleep from "./AboutSleep";
import CommonModal from "./../../utils/CommonModal";
import { useState } from "react";
import AddSleepHours from "./AddSleepHours";
import StatSleep from "./StatSleep";

const SleepView = () => {
  const [showModal, setShowModal] = useState(false);

  const sleepData = {
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
        title="Horas de sueño"
        handleOpenModal={handleOpenModal}
        chartData={sleepData}
      />
      <AboutSleep />
      <CommonModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Registrar horas de sueño"
        confirmText="Guardar"
        cancelText="Cancelar"
      >
        <AddSleepHours onClose={handleCloseModal} />
      </CommonModal>
      <StatSleep />
    </Container>
  );
};

export default SleepView;
