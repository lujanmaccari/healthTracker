/* ───────────────────────── FoodChart.jsx ───────────────────────── */
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

/* Colores para Buena / Media / Mala */
const COLORS = { Buena: "#51b35c", Media: "#f4c542", Mala: "#f15b5b" };

/* ─────────────── Normalizar texto de Supabase ─────────────── */
const normalize = (unit) => {
  switch (unit) {
    case "Good": return "Buena";
    case "Fair": return "Media";
    case "Poor": return "Mala";
    default: return null;
  }
};

/* ───────────────────────── componente ───────────────────────── */
const FoodChart = () => {
  /* estado */
  const [activeFilter, setActiveFilter] = useState("D");   // Día | Semana | Mes
  const [showModal, setShowModal] = useState(false);
  const [dataPeriodo, setDataPeriodo] = useState(null);  // donut superior
  const [dataHistorico, setDataHistorico] = useState(null);  // donut inferior

  /* helper de fecha para los filtros */
  const sinceForFilter = () => {
    const d = new Date();

    if (activeFilter === "D") {
      // comienzo del día (hoy a las 00:00:00)
      d.setHours(0, 0, 0, 0);
    } else if (activeFilter === "W") {
      // exactamente 7 días atrás
      d.setDate(d.getDate() - 7);
    } else if (activeFilter === "M") {
      // exactamente 1 mes atrás
      d.setMonth(d.getMonth() - 1);
    }
    return d.toISOString();               // se usará en el .gte("date", …)
  };

  /* ───── fetch de la dona superior (Periodo elegido) ───── */
  const fetchPeriodo = async () => {
    const { data, error } = await supabase
      .from("user_diet_quality")          // tabla que SÍ tiene columna date
      .select("unit, date")               // ⚠️ incluí la fecha
      .gte("date", sinceForFilter());     // filtra desde la fecha calculada

    if (error) {
      console.error("Error al traer periodo:", error);
      return;
    }

    /* contar categorías */
    const counts = { Buena: 0, Media: 0, Mala: 0 };
    data.forEach(({ unit }) => {
      const key = normalize(unit);
      if (key) counts[key]++;
    });

    /* porcentajes */
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    const percentages = {
      Buena: Math.round((counts.Buena / total) * 100),
      Media: Math.round((counts.Media / total) * 100),
      Mala: Math.round((counts.Mala / total) * 100),
    };

    setDataPeriodo({ counts, percentages });
  };

  /* ───── fetch de la dona inferior (Histórico completo) ───── */
  const fetchHistorico = async () => {
    const { data, error } = await supabase
      .from("diet_quality")               // tabla “histórica” sin fecha
      .select("unit");                    // sólo nos importa la unidad

    if (error) { console.error(error); return; }

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

  /* volver a traer datos cuando cambia el filtro o se guarda algo nuevo */
  useEffect(() => { fetchPeriodo(); }, [activeFilter]);
  useEffect(() => { fetchHistorico(); }, []);                 // sólo una vez

  /* recargar ambas donas después de guardar en el modal */
  const handleSaved = () => { fetchPeriodo(); };

  /* cargando... */
  if (!dataPeriodo || !dataHistorico)
    return <p style={{ textAlign: "center" }}>Cargando …</p>;

  /* helper para construir un bloque donut reutilizable */
  const DonutBlock = ({ title, info }) => {
    const { Buena: g, Media: m, Mala: b } = info.percentages;
    const dominant = Object.entries(info.percentages)
      .sort(([, a], [, b]) => b - a)[0]; // [label, value]

    const chartData = {
      labels: ["Buena", "Media", "Mala"],
      datasets: [{
        data: [g, m, b],
        backgroundColor: [COLORS.Buena, COLORS.Media, COLORS.Mala],
        borderWidth: 2,
      }],
    };

    return (
      <div style={{
        height: 300, marginBottom: 20, backgroundColor: "#f9f9f9",
        borderRadius: 12, padding: 16, position: "relative"
      }}>
        <h6 style={{ textAlign: "center", marginBottom: 10 }}>{title}</h6>
        <Doughnut data={chartData} options={{
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }} />
        {/* centro text */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)", textAlign: "center",
          pointerEvents: "none"
        }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: COLORS[dominant[0]] }}>
            {dominant[1]}%
          </div>
          <div style={{ fontSize: 14, color: "#666" }}>{dominant[0]}</div>
        </div>
      </div>
    );
  };

  /* ───────────────────────── Render ───────────────────────── */
  return (
    <Container style={{ maxWidth: 800 }}>
      <HeaderSection
        title="Calidad de Alimentación"
        buttonTitle="Agregar datos"
        onClickButton={() => setShowModal(true)}
        buttonStyle={{ borderRadius: "50%", width: 40, height: 40, padding: 0 }}
      />

      {/* Botones filtro */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {["Día", "Semana", "Mes"].map((lbl, i) => {
          const id = ["D", "W", "M"][i];
          return (
            <button key={id}
              onClick={() => setActiveFilter(id)}
              style={{
                flex: 1, padding: 8, border: "none", borderRadius: 8,
                backgroundColor: activeFilter === id ? "#4a6fa5" : "#f0f0f0",
                color: activeFilter === id ? "#fff" : "#333",
                fontWeight: "bold", fontSize: 14, cursor: "pointer"
              }}
            >{lbl}</button>
          );
        })}
      </div>

      {/* Donut superior (periodo) */}
      <DonutBlock title="Periodo elegido" info={dataPeriodo} />

      {/* Stats textuales */}
      <StatFoodies
        dominantQuality={(() => {
          const d = dataPeriodo.percentages;
          return Object.entries(d).sort(([, a], [, b]) => b - a)[0];
        })()}
        qualityEvaluation={{ text: "", color: "#fff" }}  /* StatFoodies maneja su lógica */
        activeFilter={activeFilter}
      />

      <AboutFood />
      {/* Donut inferior (histórico) */}
      <DonutBlock title="Histórico" info={dataHistorico} />


      {/* modal */}
      <AddFood
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSaved={handleSaved}
      />
    </Container>
  );
};

export default FoodChart;
