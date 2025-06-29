import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";

import { Scatter } from "react-chartjs-2";
import CommonModal from "../../utils/CommonModal";
import HeaderSection from "../../utils/HeaderSection";
import AddMood from "./AddMood";
import { useUser } from "../../contexts/UserContext";
import { supabase } from "../../../supabaseClient";
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import ExamScoreBarChart from "./StatMood";

ChartJS.register(
  PointElement,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const valorToMood = {
  0: "Muy Mal",
  1: "Mal",
  2: "Regular",
  3: "Bien",
  4: "Muy Bien",
};

const sentimientoColor = {
  "Muy Mal": "#c62828",
  Mal: "#e57373",
  Regular: "#ffb74d",
  Bien: "#81c784",
  "Muy Bien": "#64b5f6",
};

const filterLabels = {
  D: "hoy",
  W: "esta semana",
  M: "este mes",
};

const filterButtons = [
  { id: "D", label: "Día" },
  { id: "W", label: "Semana" },
  { id: "M", label: "Mes" },
];

const MoodChart = () => {
  const [activeFilter, setActiveFilter] = useState("W");
  const [showModal, setShowModal] = useState(false);
  const [mood, setMood] = useState(2);
  const [chartData, setChartData] = useState(null);
  const user = useUser();

  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from("user_mood")
      .select("id, user_id, value, date")
      .eq("user_id", user.id)
      .order("date", { ascending: true });

    if (error) {
      console.error("Error al obtener actividades:", error);
      return [];
    }
    return data;
  };

  useEffect(() => {
    fetchActivities().then((data) => {
      setChartData(data);
    });
  }, []);

  const allLabels = useMemo(() => {
    if (activeFilter === "D") {
      return ["0", "4", "8", "12", "16", "20"];
    } else if (activeFilter === "W") {
      return ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    } else if (activeFilter === "M") {
      return ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
    }
    return [];
  }, [activeFilter]);

  const scatterData = useMemo(() => {
    if (!chartData) return null;

    const grouped = {};

    const now = new Date();
    const currentWeekStart = new Date(now);
    currentWeekStart.setDate(now.getDate() - now.getDay()); // domingo
    currentWeekStart.setHours(0, 0, 0, 0);

    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
    currentWeekEnd.setHours(23, 59, 59, 999);

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const filteredData = chartData.filter((entry) => {
      const date = new Date(entry.date);
      if (activeFilter === "W") {
        return date >= currentWeekStart && date <= currentWeekEnd;
      } else if (activeFilter === "M") {
        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      }
      return true;
    });

    if (activeFilter === "W") console.log("Data de la semana", filteredData);

    for (const entry of filteredData) {
      const date = new Date(entry.date);
      let key;

      if (activeFilter === "D") {
        const hours = date.getHours();
        const rangeStart = Math.floor(hours / 4) * 4;
        key = String(rangeStart);
      } else if (activeFilter === "W") {
        const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        const dayNum = date.getDay() == 6 ? 0 : date.getDay() + 1;
        key = dayNames[dayNum];
      } else if (activeFilter === "M") {
        const weekNumber = Math.ceil(date.getDate() / 7);
        key = `Semana ${weekNumber}`;
      }

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(entry.value);
    }

    const points = allLabels.map((label) => {
      const values = grouped[label];
      const avg = values
        ? values.reduce((a, b) => a + b, 0) / values.length
        : null;
      return {
        x: label,
        y: avg,
        moodColor:
          avg !== null
            ? sentimientoColor[valorToMood[Math.round(avg)]]
            : "transparent",
      };
    });

    return {
      datasets: [
        {
          type: "line",
          label: "Estado de ánimo",
          data: points,
          backgroundColor: points.map((p) => p.moodColor),
          borderWidth: 2,
          pointRadius: points.map((p) => (p.y === null ? 0 : 6)),
          spanGaps: true,
          tension: 0.1,
          fill: false,
        },
      ],
    };
  }, [chartData, activeFilter, allLabels]);

  const promedio = useMemo(() => {
    if (!chartData) return null;
    const allValues = chartData.map((entry) => entry.value);
    if (allValues.length === 0) return null;
    return allValues.reduce((a, b) => a + b, 0) / allValues.length;
  }, [chartData]);

  const sentimientoPromedio =
    promedio !== null ? valorToMood[Math.round(promedio)] : "sin datos";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Estado de ánimo del usuario",
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.raw.y;
            if (val === null) return "No hay datos";
            return `Estado: ${valorToMood[Math.round(val)] || val}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "category",
        labels: allLabels,
        title: {
          display: false,
        },
        ticks: {
          font: { size: 12 },
        },
      },
      y: {
        title: {
          display: false,
        },
        min: 0,
        max: 4.5,
        grid: {
          padding: 10,
        },
        ticks: {
          stepSize: 1,
          callback: (value) => valorToMood[value] || "",
        },
      },
    },
  };

  if (!scatterData) {
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>Cargando datos...</p>
    );
  }

  return (
    <Container
      style={{ maxWidth: "800px", position: "relative", padding: "0 1rem" }}
    >
      <HeaderSection
        title="Estado de ánimo"
        buttonTitle="Agregar"
        onClickButton={() => setShowModal(true)}
      />

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          flexWrap: "wrap",
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
                activeFilter === button.id ? "#94a37d" : "#f0f0f0",
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

      <p style={{ fontSize: "clamp(14px, 4vw, 16px)", color: "#555" }}>
        En promedio te has sentido{" "}
        <span style={{ fontWeight: "bold", color: "#333" }}>
          {sentimientoPromedio}
        </span>{" "}
        {filterLabels[activeFilter]}.
      </p>

      <div style={{ width: "100%", height: "250px" }}>
        <Scatter data={scatterData} options={options} />
      </div>

      <div
        style={{
          backgroundColor: "#F5F5F5",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "30px",
        }}
      >
        <h5 style={{ color: "#333", marginBottom: "15px" }}>
          Acerca de <b>Estado de Ánimo</b>
        </h5>
        <p
          style={{
            color: "#666",
            lineHeight: "1.5",
            fontSize: "clamp(13px, 3vw, 15px)",
            textAlign: "justify",
          }}
        >
          Registrá tu estado de ánimo diario para identificar patrones y mejorar
          tu bienestar emocional. Los datos te ayudarán a entender qué factores
          influyen en cómo te sentís.
        </p>
      </div>

      <CommonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={async () => {
          await user.addUserMoodEntry(mood);
          fetchActivities().then((data) => {
            setChartData(data);
          });
          setShowModal(false);
        }}
        title="Estado de ánimo"
        confirmText="Agregar"
        cancelText="Cancelar"
      >
        <AddMood {...{ mood, setMood }} />
      </CommonModal>
      <ExamScoreBarChart />
    </Container>
  );
};

export default MoodChart;
