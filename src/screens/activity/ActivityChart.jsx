import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from "chart.js";
import { Button, Container } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ActivityChart = () => {
  const navigate = useNavigate();
  const data = {
    labels: [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ],
    datasets: [
      {
        label: "Kcal consumidas",
        // esta data la vamos a consumir de supabase
        data: [1800, 2000, 1700, 2200, 1900, 2500, 2100],
        backgroundColor: "#DADADA",
        borderColor: "transparent",
        borderRadius: "10px",
        borderRadius: 10,
        barThickness: 50,
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
        },
      },
      x: {
        title: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };

  return (
    <Container>
      <Button
        className="btnApp"
        onClick={() => {
          navigate("/weeklyActivity");
        }}
      >
        Agregar Actividad
      </Button>

      <Bar data={data} options={options} />
    </Container>
  );
};

export default ActivityChart;
