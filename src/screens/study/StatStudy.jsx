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

const StudyStatsChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchAndAggregate = async () => {
      const { data, error } = await supabase
        .from("time_study")
        .select("student_id, score, study_hours")
        .limit(1000);

      if (error) {
        console.error("Error fetching study data:", error);
        return;
      }

      console.log("Datos obtenidos de time_study:", data?.length || 0, "registros");

      if (!data || data.length === 0) {
        console.log("No hay datos en la tabla time_study");
        return;
      }

      // Log temporal para ver la estructura de los datos
      console.log("Primeros 3 registros:", data.slice(0, 3));

      // Procesar los datos reales
      processStudyData(data);
    };

    // Función para procesar los datos
    const processStudyData = (data) => {
      // Definir rangos de minutos de estudio (convertir a horas para mostrar)
      const studyRanges = [
        { label: "0-1h", min: 0, max: 60 },
        { label: "1-2h", min: 60, max: 120 },
        { label: "2-3h", min: 120, max: 180 },
        { label: "3-4h", min: 180, max: 240 },
        { label: "4-5h", min: 240, max: 300 },
        { label: "5-6h", min: 300, max: 360 },
        { label: "6-8h", min: 360, max: 480 },
        { label: "8h+", min: 480, max: 720 },
      ];

      const groups = {};

      // Agrupar datos por rangos de estudio
      data.forEach(({ study_hours, score }) => {
        if (
          study_hours != null &&
          score != null &&
          !isNaN(study_hours) &&
          !isNaN(score)
        ) {
          // Encontrar el rango correspondiente
          const range = studyRanges.find(
            (r) => study_hours >= r.min && study_hours < r.max
          );

          if (range) {
            if (!groups[range.label]) {
              groups[range.label] = [];
            }
            groups[range.label].push(score);
          }
        }
      });

      console.log("Datos procesados por rangos:", Object.keys(groups).length, "rangos con datos");

      // Calcular promedios de score para cada rango
      const rangeLabels = studyRanges.map((r) => r.label);
      const averageScores = rangeLabels.map((label) => {
        const values = groups[label] || [];
        if (values.length === 0) return 0;
        const sum = values.reduce((acc, val) => acc + val, 0);
        return sum / values.length;
      });

      // Encontrar el rango con mejor rendimiento
      const maxScore = Math.max(...averageScores);
      const bestRangeIndex = averageScores.indexOf(maxScore);
      const bestRange = rangeLabels[bestRangeIndex];

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
        bestRange,
      });
    };

    fetchAndAggregate();
  }, []);

  if (!chartData) return <p>Cargando datos...</p>;

  // Si no hay datos procesados, mostrar mensaje
  if (chartData.datasets[0].data.every(value => value === 0)) {
    return (
      <div style={{
        height: "50vh",
        marginBottom: "10vh",
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa"
      }}>
        <p>No hay datos suficientes para mostrar estadísticas de estudio.</p>
      </div>
    );
  }

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
          text: "Tiempo de estudio por día",
          font: {
            weight: "bold",
            size: 12,
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: [
          `¡Los estudiantes que estudian`,
          `${chartData.bestRange} tienen`,
          "el mejor rendimiento académico!",
        ],
      },
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
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StudyStatsChart; 