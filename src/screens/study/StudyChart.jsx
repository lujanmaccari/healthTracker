import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CommonModal from "../../utils/CommonModal";
import GenericBarChart from "../../utils/GenericBarChart";
import { AboutStudy } from "./AboutStudy";
import AddStudy from "./AddStudy";
import { supabase } from "../../../supabaseClient";
import { useUser } from "../../contexts/UserContext";
import { prepareChartData } from "../../utils/functions";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StudyChart = () => {
  const [showModal, setShowModal] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const user = useUser();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchStudy = async () => {
    const { data, error } = await supabase
      .from("user_time_study")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: true });

    if (error) {
      console.error("Error al obtener horas de estudio:", error);
      return [];
    }

    return data;
  };

  useEffect(() => {
    fetchStudy().then((data) => {
      const chartData = prepareChartData(data);
      setChartData(chartData);
      console.log(chartData);
    });
  }, [reloadData]);

  return (
    <Container>
      <GenericBarChart
        title="Horas de estudio"
        handleOpenModal={handleOpenModal}
        chartData={chartData}
      />
      <AboutStudy />
      <CommonModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Registrar tiempo de estudio"
        confirmText="Guardar"
        cancelText="Cancelar"
      >
        <AddStudy onClose={handleCloseModal} states={{reloadData, setReloadData}}/>
      </CommonModal>
    </Container>
  );
};

export default StudyChart;
