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

const valorToMood = {
  0: "Muy Mal",
  1: "Mal",
  2: "Regular",
  3: "Bien",
  4: "Muy Bien",
};

const ExamScoreBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchAndAggregate = async () => {
      const { data, error } = await supabase
        .from("mood")
        .select("value, exam_score")
        .limit(1000);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      const groups = {};

      data.forEach(({ value, exam_score }) => {
        if (
          value != null &&
          exam_score != null &&
          !isNaN(value) &&
          !isNaN(exam_score)
        ) {
          if (!groups[value]) {
            groups[value] = [];
          }
          groups[value].push(exam_score);
        }
      });

      const frequencies = Object.keys(groups)
        .map(Number)
        .sort((a, b) => a - b);

      const averageExamScore = frequencies.map((freq) => {
        const values = groups[freq];
        const sum = values.reduce((acc, val) => acc + val, 0);
        return sum / values.length;
      });

      const max = Math.max(...averageExamScore);

      const defaultColor = "#89a8d6";
      const highestColor = "#b7cb9a";

      const backgroundColors = averageExamScore.map((value) => {
        if (value === max) return highestColor;
        return defaultColor;
      });

      const maxY = Math.ceil(max + 1);

      setChartData({
        labels: frequencies.map((f) => valorToMood[f]),
        datasets: [
          {
            label: "Promedio Académico",
            data: averageExamScore,
            backgroundColor: backgroundColors,
            borderColor: "transparent",
            borderWidth: 1,
            borderRadius: 6,
            barThickness: 28,
          },
        ],
        maxY,
      });
    };

    fetchAndAggregate();
  }, []);

  if (!chartData)
    return <p style={{ textAlign: "center" }}>Cargando datos...</p>;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: chartData.maxY,
        min: 60,
        title: {
          display: true,
          text: "Resultados Académicos (0–100)",
          font: {
            weight: "bold",
            size: 13,
          },
        },
        ticks: {
          font: {
            size: 11,
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
          text: "Estado de Ánimo",
          font: {
            weight: "bold",
            size: 13,
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: [
          "¡Las personas con mejor estado de ánimo",
          "alcanzan las calificaciones más altas",
          "en sus exámenes!",
        ],
        font: {
          size: 14,
          weight: "bold",
        },
        padding: {
          top: 0,
          bottom: 50,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        height: "360px",
        width: "100%",
        marginBottom: "6vh",
        marginTop: "2vh",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ExamScoreBarChart;
