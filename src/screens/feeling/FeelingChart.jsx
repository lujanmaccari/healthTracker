import { useState } from "react";
import { Container } from "react-bootstrap";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import CommonModal from "../../utils/CommonModal";
import HeaderSection from "../../utils/HeaderSection";
import AboutFeeling from "./AboutFeeling";
import AddFeeling from "./AddFeeling";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const sentimientoToValor = {
  mal: 1,
  regular: 2,
  bien: 3,
  "muy bien": 4,
};

const valorToSentimiento = {
  1: "mal",
  2: "regular",
  3: "bien",
  4: "muy bien",
};
const sentimientoColor = {
  mal: "#e57373",
  regular: "#ffb74d",
  bien: "#81c784",
  "muy bien": "#64b5f6",
};

const feelingData = {
  D: {
    labels: ["6-9am", "9-12am", "12-15pm", "15-18pm", "18-21pm", "21-24pm"],
    data: ["bien", "mal", "bien", "mal", "bien", "muy bien"],
  },
  W: {
    labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
    data: ["regular", "bien", "muy bien", "mal", "mal", "bien", "regular"],
  },
  M: {
    labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    data: ["mal", "regular", "muy bien", "muy bien"],
  },
  BM: {
    labels: ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
    data: ["mal", "regular", "muy bien", "mal", "regular", "muy bien"],
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
    data: [
      "regular",
      "mal",
      "bien",
      "muy bien",
      "regular",
      "bien",
      "mal",
      "bien",
      "muy bien",
      "regular",
      "mal",
      "bien",
    ],
  },
};

const filterLabels = {
  D: "hoy",
  W: "esta semana",
  M: "este mes",
  BM: "estos 6 meses",
  Y: "este año",
};

const filterButtons = [
  { id: "D", label: "D" },
  { id: "W", label: "W" },
  { id: "M", label: "M" },
  { id: "BM", label: "6M" },
  { id: "Y", label: "Y" },
];

const FeelingChart = () => {
  const [activeFilter, setActiveFilter] = useState("W");
  const [showModal, setShowModal] = useState(false);

  const currentData = feelingData[activeFilter];

  const sentimientoNumerico = currentData.data
    .map((s) => sentimientoToValor[s])
    .filter((v) => v !== undefined);

  const promedio = sentimientoNumerico.length
    ? sentimientoNumerico.reduce((a, b) => a + b, 0) /
      sentimientoNumerico.length
    : null;

  const sentimientoPromedio = promedio
    ? valorToSentimiento[Math.round(promedio)]
    : "sin datos";

  const chartData = {
    datasets: [
      {
        label: "Estado de ánimo",
        data: currentData.data.map((sentimiento, index) => ({
          x: currentData.labels[index],
          y: sentimientoToValor[sentimiento],
        })),
        backgroundColor: currentData.data.map(
          (s) => sentimientoColor[s] || "#aaa"
        ),
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category",
        labels: currentData.labels,
        title: {
          display: true,
          text: "Periodo",
          font: { size: 14 },
        },
        ticks: {
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            const label = Object.entries(sentimientoToValor).find(
              ([, val]) => val === value
            );
            return label?.[0] || value;
          },
        },
        title: {
          display: true,
          text: "Estado de ánimo",
          font: { size: 14 },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = Object.entries(sentimientoToValor).find(
              ([, val]) => val === ctx.raw.y
            );
            return `Estado: ${label?.[0] || ctx.raw.y}`;
          },
        },
      },
    },
  };

  return (
    <Container style={{ maxWidth: "800px", position: "relative" }}>
      <HeaderSection
        title="Estado de ánimo"
        buttonTitle="Agregar"
        onClickButton={() => setShowModal(true)}
      />

      <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
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
            }}
          >
            {button.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: "16px", color: "#555" }}>
        En promedio te has sentido{" "}
        <span style={{ fontWeight: "bold", color: "#333" }}>
          {sentimientoPromedio}
        </span>{" "}
        {filterLabels[activeFilter]}.
      </p>

      <Scatter data={chartData} options={chartOptions} />

      <AboutFeeling />

      <CommonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Estado de ánimo"
        confirmText="Agregar"
        cancelText="Cancelar"
      >
        <AddFeeling />
      </CommonModal>
    </Container>
  );
};

export default FeelingChart;
