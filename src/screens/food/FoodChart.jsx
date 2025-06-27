import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import HeaderSection from "../../utils/HeaderSection";
import AddFood from "./AddFood";
import StatFoodies from "./StatFoodies";
import AboutFood from "./AboutFood";
import { supabase } from "../../../supabaseClient";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = { Buena: "#51b35c", Media: "#f4c542", Mala: "#f15b5b" };

const normalize = (unit) => {
  switch (unit) {
    case "Good":
      return "Buena";
    case "Fair":
      return "Media";
    case "Poor":
      return "Mala";
    default:
      return null;
  }
};

const FoodChart = () => {
  const [activeFilter, setActiveFilter] = useState("D");
  const [showModal, setShowModal] = useState(false);
  const [dataPeriodo, setDataPeriodo] = useState(null); // donut superior
  const [dataHistorico, setDataHistorico] = useState(null); // donut inferior

  const sinceForFilter = () => {
    const d = new Date();

    if (activeFilter === "D") {
      // hoy a las 00:00
      d.setHours(0, 0, 0, 0);
    } else if (activeFilter === "W") {
      // 7 días atrás
      d.setDate(d.getDate() - 7);
    } else if (activeFilter === "M") {
      // 1 mes atrás
      d.setMonth(d.getMonth() - 1);
    }
    return d.toISOString();
  };

  /* fetch dona superior */
  const fetchPeriodo = async () => {
    const { data, error } = await supabase
      .from("user_diet_quality")
      .select("unit, date")
      .gte("date", sinceForFilter());

    if (error) {
      console.error("Error al traer periodo:", error);
      return;
    }

    const counts = { Buena: 0, Media: 0, Mala: 0 };
    data.forEach(({ unit }) => {
      const key = normalize(unit);
      if (key) counts[key]++;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    const percentages = {
      Buena: Math.round((counts.Buena / total) * 100),
      Media: Math.round((counts.Media / total) * 100),
      Mala: Math.round((counts.Mala / total) * 100),
    };

    setDataPeriodo({ counts, percentages });
  };

  /* fetch dona inferior (Histórico) */
  const fetchHistorico = async () => {
    const { data, error } = await supabase.from("diet_quality").select("unit");

    if (error) {
      console.error(error);
      return;
    }

    const counts = { Buena: 0, Media: 0, Mala: 0 };
    data.forEach(({ unit }) => {
      const key = normalize(unit);
      if (key) counts[key]++;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    const percentages = {
      Buena: Math.round((counts.Buena / total) * 100),
      Media: Math.round((counts.Media / total) * 100),
      Mala: Math.round((counts.Mala / total) * 100),
    };
    setDataHistorico({ counts, percentages });
  };

  useEffect(() => {
    fetchPeriodo();
  }, [activeFilter]);

  useEffect(() => {
    fetchHistorico();
  }, []);

  const handleSaved = () => {
    fetchPeriodo();
  };

  if (!dataPeriodo || !dataHistorico)
    return <p style={{ textAlign: "center" }}>Cargando…</p>;

  const DonutBlock = ({ info }) => {
    const { Buena: g, Media: m, Mala: b } = info.percentages;
    const dominant = Object.entries(info.percentages).sort(
      ([, a], [, b]) => b - a
    )[0];

    const chartData = {
      labels: ["Buena", "Media", "Mala"],
      datasets: [
        {
          data: [g, m, b],
          backgroundColor: [COLORS.Buena, COLORS.Media, COLORS.Mala],
          borderWidth: 2,
        },
      ],
    };

    return (
      <div
        style={{
          height: 300,
          width: 300,
          marginBottom: 20,
          backgroundColor: "#f9f9f9",
          borderRadius: 12,
          padding: 16,
          position: "relative",
          margin: "auto",
        }}
      >
        <p style={{ textAlign: "center", marginBottom: 10 }}>
          Estas promediando una alimentación <strong>{dominant[0]}</strong>
        </p>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "56.5%",
            left: "41%",
            textAlign: "center",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: COLORS[dominant[0]],
            }}
          >
            {dominant[1]}%
          </div>
          <div style={{ fontSize: 20, color: "#666" }}>{dominant[0]}</div>
        </div>
      </div>
    );
  };

  return (
    <Container style={{ maxWidth: 800 }}>
      <HeaderSection
        title="Calidad de Alimentación"
        buttonTitle="Agregar datos"
        onClickButton={() => setShowModal(true)}
        buttonStyle={{ borderRadius: "50%", width: 40, height: 40, padding: 0 }}
      />

      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {["Día", "Semana", "Mes"].map((lbl, i) => {
          const id = ["D", "W", "M"][i];
          return (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              style={{
                flex: 1,
                padding: 8,
                border: "none",
                borderRadius: 8,
                backgroundColor: activeFilter === id ? "#4a6fa5" : "#f0f0f0",
                color: activeFilter === id ? "#fff" : "#333",
                fontWeight: "bold",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              {lbl}
            </button>
          );
        })}
      </div>

      <DonutBlock title="Periodo elegido" info={dataPeriodo} />

      <AboutFood />

      <StatFoodies
        dominantQuality={(() => {
          const d = dataPeriodo.percentages;
          return Object.entries(d).sort(([, a], [, b]) => b - a)[0];
        })()}
        qualityEvaluation={{ text: "", color: "#fff" }}
        activeFilter={activeFilter}
      />

      <AddFood
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSaved={handleSaved}
      />
    </Container>
  );
};

export default FoodChart;
