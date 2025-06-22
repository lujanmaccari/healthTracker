import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import HeaderSection from "./HeaderSection";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
/**
 * Componente genérico para mostrar gráficos
 *
 * @component
 * @param title - Título de la sección que se mostrará en el header
 * @param handleOpenModal - () => setShowModal(true)
 * @param chartData - Datos del gráfico a mostrar
 * @example
 * // Uso básico del componente
 * <GenericBarChart
 *   title="Mi Gráfico"
 *   handleOpenModal={() => setShowModal(true)}
 *   chartData={{
 *     labels: ["Enero", "Febrero", "Marzo"],
 *     datasets: [
 *      {
 *        label: "Ventas",
 *        data: [100, 200, 150],
 *        backgroundColor: "blue",
 *       },
 *      ],
 *    }}
 * />
 *
 * @returns {JSX.Element} Componente que renderiza un grafico
 */
const GenericBarChart = ({ title, handleOpenModal, chartData }) => {
  const [activeFilter, setActiveFilter] = useState("W"); // semana como default
  const currentData = chartData[activeFilter];
  const totalHours = currentData.data.reduce((a, b) => a + b, 0);
  const averageHours = totalHours / currentData.labels.length;
  const filterButtons = [
    { id: "D", label: "D" },
    { id: "W", label: "W" },
    { id: "M", label: "M" },
    { id: "BM", label: "6M" },
    { id: "Y", label: "Y" },
  ];
  const data = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Horas",
        data: currentData.data,
        backgroundColor: "#4a6fa5",
        borderColor: "transparent",
        borderRadius: 4,
        barThickness: 24,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Horas",
          font: {
            weight: "bold",
            size: 12,
          },
        },
        max:
          activeFilter === "D"
            ? 3
            : activeFilter === "W"
            ? 3
            : activeFilter === "M"
            ? 10
            : activeFilter === "BM"
            ? 50
            : 50,
        grid: {
          display: true,
          color: "#e0e0e0",
        },
        ticks: {
          stepSize:
            activeFilter === "D"
              ? 0.5
              : activeFilter === "W"
              ? 0.5
              : activeFilter === "M"
              ? 2
              : activeFilter === "BM"
              ? 10
              : 10,
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
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.parsed.y} horas`;
          },
        },
      },
    },
  };
  return (
    <Container>
      <HeaderSection
        title={title}
        onClickButton={handleOpenModal}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "6px",
          marginBottom: "20px",
        }}
      >
        {filterButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => setActiveFilter(button.id)}
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: "8px",
              backgroundColor:
                activeFilter === button.id ? "#4a6fa5" : "#f0f0f0",
              color: activeFilter === button.id ? "white" : "#333",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              minWidth: "40px",
            }}
          >
            {button.label}
          </button>
        ))}
      </div>
      <div
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontSize: "16px",
          color: "#555",
        }}
      >
        <p>
          Estás promediando <strong>{averageHours.toFixed(2)}</strong> horas de{" "}
          {title.toLowerCase()}{" "}
          {activeFilter === "D"
            ? "hoy"
            : activeFilter === "W"
            ? "diarias esta semana"
            : activeFilter === "M"
            ? "por semana este mes"
            : activeFilter === "BM"
            ? "diarias estos 6 meses"
            : "diarias este año"}
        </p>
      </div>
      <div
        style={{
          height: "220px",
          marginBottom: "20px",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </Container>
  );
};

export default GenericBarChart;
