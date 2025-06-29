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

const StatFoodies = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchAndAggregate = async () => {
      const { data, error } = await supabase
        .from("diet_quality_v2")
        .select("diet_quality, mental_health")
        .limit(200);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      const groups = {};

      data.forEach(({ diet_quality, mental_health }) => {
        if (diet_quality != null && mental_health != null) {
          if (!groups[diet_quality]) {
            groups[diet_quality] = [];
          }
          groups[diet_quality].push(mental_health);
        }
      });

      const desiredOrder = ["Poor", "Fair", "Good"];
      const diet_quality = desiredOrder.filter((label) => groups[label]);

      const averageSaludMental = diet_quality.map((item) => {
        const values = groups[item];
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

      const labelTranslations = {
        Poor: "Mala",
        Fair: "Regular",
        Good: "Buena",
      };

      const translatedLabels = diet_quality.map(
        (key) => labelTranslations[key] || key
      );

      setChartData({
        labels: translatedLabels,

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
        max: chartData.maxY,
        min: 4.5,
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
          display: false,
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
        ¡Las personas que mantienen una dieta sana reportan el mayor
        bienestar emocional!
      </p>
      <Bar data={chartData} options={options} />{" "}
    </div>
  );
};

export default StatFoodies;
