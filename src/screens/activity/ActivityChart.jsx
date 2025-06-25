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
import StatActivities from "./StatActivities";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ActivityChart = () => {
  const [showModal, setShowModal] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [reloadData, setReloadData] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from("user_activities")
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
      <StatActivities/>
    </Container>
  );
};

export default ActivityChart;
