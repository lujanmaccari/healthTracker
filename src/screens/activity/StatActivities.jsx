import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { supabase } from "../../../supabaseClient";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const MentalHealthBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchAndAggregate = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("frecuencia_ejercicio, salud_mental")
        .limit(1000);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      const groups = {};

      data.forEach(({ frecuencia_ejercicio, salud_mental }) => {
        if (
          frecuencia_ejercicio != null &&
          salud_mental != null &&
          !isNaN(frecuencia_ejercicio) &&
          !isNaN(salud_mental)
        ) {
          if (!groups[frecuencia_ejercicio]) {
            groups[frecuencia_ejercicio] = [];
          }
          groups[frecuencia_ejercicio].push(salud_mental);
        }
      });

      const frequencies = Object.keys(groups)
        .map(Number)
        .sort((a, b) => a - b);

      const averageSaludMental = frequencies.map((freq) => {
        const values = groups[freq];
        const sum = values.reduce((acc, val) => acc + val, 0);
        return sum / values.length;
      });

      const max = Math.max(...averageSaludMental);

      const defaultColor = "#89a8d6";
      const highestColor = "#b7cb9a";

      const backgroundColors = averageSaludMental.map((value) => {
        if (value === max) return highestColor;
        return defaultColor;
      });

      const maxY = Math.ceil(max + 1);

      setChartData({
        labels: frequencies.map((f) => `${f}`),
        datasets: [
          {
            label: "Promedio salud mental",
            data: averageSaludMental,
            backgroundColor: backgroundColors,
            borderColor: "transparent",
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 24,
          },
        ],
        maxY,
      });
    };

    fetchAndAggregate();
  }, []);

  if (!chartData) return <p>Cargando datos...</p>;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 6,
        min: 5,
        title: {
          display: true,
          text: "Promedio de salud mental (0–10)",
          font: {
            weight: "bold",
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "Frecuencia de ejercicio (días por semana)",
          font: {
            weight: "bold",
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        height: "50vh",
        marginBottom: "10vh",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <p style={{ color: "#333", marginBottom: "15px" }}>
        ¡Las personas que hacen ejercicio 3 veces por semana reportan el mayor
        bienestar emocional!
      </p>
      <Bar data={chartData} options={options} />{" "}
    </div>
  );
};

export default MentalHealthBarChart;
