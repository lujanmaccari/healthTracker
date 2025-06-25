import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Container } from "react-bootstrap";
import GenericBarChart from "../../utils/GenericBarChart";
import { AboutActivity } from "./AboutActivity";
import { useEffect, useState } from "react";
import CommonModal from "../../utils/CommonModal";
import AddActivity from "./AddActivity";
import { supabase } from "../../../supabaseClient";
import { prepareChartData } from "../../utils/functions";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ActivityChart = () => {
  const [showModal, setShowModal] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [reloadData, setReloadData] = useState(false);

  const activityData = {
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

  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error al obtener actividades:", error);
      return [];
    }

    return data;
  };

useEffect(() => {
  fetchActivities().then((data) => {
    const chartData = prepareChartData(data);
    setChartData(chartData);
    console.log(chartData);
  });
}, [reloadData]);
  
  return (
    <Container>
      <GenericBarChart
        title="Actividad"
        handleOpenModal={handleOpenModal}
        chartData={chartData}
      />
      <AboutActivity />
      <CommonModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Registrar actividad"
        confirmText="Guardar"
        cancelText="Cancelar"
      >
        <AddActivity onClose={handleCloseModal} states={{reloadData, setReloadData}} />
      </CommonModal>
    </Container>
  );
};

export default ActivityChart;
