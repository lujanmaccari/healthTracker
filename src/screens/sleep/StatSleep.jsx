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

const SleepStatsChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchAndAggregate = async () => {
      const { data, error } = await supabase
        .from("sleep_hours_v2")
        .select("student_id, score, sleep_hours")
        .limit(1000);

      if (error) {
        console.error("Error fetching sleep data:", error);
        return;
      }

      if (!data || data.length === 0) {
        return;
      }

      // Procesar los datos reales
      processSleepData(data);
    };

    // Función para procesar los datos
    const processSleepData = (data) => {
      // Definir rangos de horas de sueño
      const sleepRanges = [
        { label: "3-4h", min: 3, max: 4 },
        { label: "4-5h", min: 4, max: 5 },
        { label: "5-6h", min: 5, max: 6 },
        { label: "6-7h", min: 6, max: 7 },
        { label: "7-8h", min: 7, max: 8 },
        { label: "8-9h", min: 8, max: 9 },
        { label: "9-10h", min: 9, max: 10 },
        { label: "10h+", min: 10, max: 12 },
      ];

      const groups = {};

      // Agrupar datos por rangos de sueño
      data.forEach(({ sleep_hours, score }) => {
        if (
          sleep_hours != null &&
          score != null &&
          !isNaN(sleep_hours) &&
          !isNaN(score)
        ) {
          // Encontrar el rango correspondiente
          const range = sleepRanges.find(
            (r) => sleep_hours >= r.min && sleep_hours < r.max
          );

          if (range) {
            if (!groups[range.label]) {
              groups[range.label] = [];
            }
            groups[range.label].push(score);
          }
        }
      });

      // Calcular promedios de score para cada rango
      const rangeLabels = sleepRanges.map((r) => r.label);
      const averageScores = rangeLabels.map((label) => {
        const values = groups[label] || [];
        if (values.length === 0) return 0;
        const sum = values.reduce((acc, val) => acc + val, 0);
        return sum / values.length;
      });

      // Encontrar el rango con mejor rendimiento
      const maxScore = Math.max(...averageScores);

      const defaultColor = "#89a8d6";
      const highestColor = "#b7cb9a";

      const backgroundColors = averageScores.map((score) => {
        if (score === maxScore && score > 0) return highestColor;
        return defaultColor;
      });

      const maxY = Math.ceil(maxScore + 5);

      setChartData({
        labels: rangeLabels,
        datasets: [
          {
            label: "Promedio de rendimiento académico",
            data: averageScores,
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
        min: 58,
        max: chartData.maxY,
        title: {
          display: true,
          text: "Promedio de rendimiento académico",
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
          text: "Horas de sueño por noche",
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
        ¡Los estudiantes que duermen entre 7 y 8 horas tienen el mejor
        rendimiento académico!
      </p>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SleepStatsChart;
