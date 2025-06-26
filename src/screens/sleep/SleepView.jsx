import { Container } from "react-bootstrap";
import GenericBarChart from "../../utils/GenericBarChart";
import AboutSleep from "./AboutSleep";
import CommonModal from "./../../utils/CommonModal";
import { useState, useEffect } from "react";
import AddSleepHours from "./AddSleepHours";
import StatSleep from "./StatSleep";
import { supabase } from "../../../supabaseClient";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useUser } from "../../contexts/UserContext";

dayjs.extend(isBetween);

const SleepView = () => {
  const [showModal, setShowModal] = useState(false);
  const [sleepData, setSleepData] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const user = useUser();

  const fetchSleepData = async () => {
    const { data, error } = await supabase
      .from("user_sleep_hour")
      .select("from, to")
      .eq("user_id", user.id)
      .order("from", { ascending: true });

    if (error) {
      console.error("Error al obtener datos de sueño:", error);
      return;
    }

    if (!data || data.length === 0) {
      // Si no hay datos, mostrar estructura vacía
      setSleepData({
        D: { labels: ["6-9am", "9-12am", "12-15pm", "15-18pm", "18-21pm", "21-24pm"], data: [0, 0, 0, 0, 0, 0] },
        W: { labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"], data: [0, 0, 0, 0, 0, 0, 0] },
        M: { labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"], data: [0, 0, 0, 0] },
        BM: { labels: ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"], data: [0, 0, 0, 0, 0, 0] },
        Y: { labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      });
      return;
    }

    // Procesar datos reales
    const processedData = processSleepData(data);
    setSleepData(processedData);
  };

  const processSleepData = (data) => {
    const today = dayjs();
    
    // === DAY (D): Rangos horarios ===
    const D_ranges = [
      { label: "6-9am", from: 6, to: 9 },
      { label: "9-12am", from: 9, to: 12 },
      { label: "12-15pm", from: 12, to: 15 },
      { label: "15-18pm", from: 15, to: 18 },
      { label: "18-21pm", from: 18, to: 21 },
      { label: "21-24pm", from: 21, to: 24 },
    ];

    const todaySleeps = data.filter(sleep => {
      const sleepDate = dayjs(sleep.from);
      return sleepDate.isSame(today, 'day');
    });

    const D_data = D_ranges.map(({ from, to }) => {
      const total = todaySleeps
        .filter(sleep => {
          const startHour = dayjs(sleep.from).hour();
          return startHour >= from && startHour < to;
        })
        .reduce((sum, sleep) => {
          const duration = dayjs(sleep.to).diff(dayjs(sleep.from), 'hour', true);
          return sum + duration;
        }, 0);
      return total;
    });

    // === WEEK (W) ===
    const startOfWeek = today.startOf('week');
    const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
    
    const W_data = weekDays.map(day => {
      const daySleeps = data.filter(sleep => {
        const sleepDate = dayjs(sleep.from);
        return sleepDate.isSame(day, 'day');
      });
      
      return daySleeps.reduce((sum, sleep) => {
        const duration = dayjs(sleep.to).diff(dayjs(sleep.from), 'hour', true);
        return sum + duration;
      }, 0);
    });

    // === MONTH (M) ===
    const startOfMonth = today.startOf('month');
    const M_data = Array.from({ length: 4 }, (_, i) => {
      const weekStart = startOfMonth.add(i * 7, 'day');
      const weekEnd = weekStart.add(6, 'day');
      
      const weekSleeps = data.filter(sleep => {
        const sleepDate = dayjs(sleep.from);
        return sleepDate.isBetween(weekStart, weekEnd, 'day', '[]');
      });
      
      return weekSleeps.reduce((sum, sleep) => {
        const duration = dayjs(sleep.to).diff(dayjs(sleep.from), 'hour', true);
        return sum + duration;
      }, 0);
    });

    // === 6 MONTHS (BM) ===
    const BM_data = Array.from({ length: 6 }, (_, i) => {
      const monthStart = today.subtract(5 - i, 'month').startOf('month');
      const monthEnd = monthStart.endOf('month');
      
      const monthSleeps = data.filter(sleep => {
        const sleepDate = dayjs(sleep.from);
        return sleepDate.isBetween(monthStart, monthEnd, 'day', '[]');
      });
      
      return monthSleeps.reduce((sum, sleep) => {
        const duration = dayjs(sleep.to).diff(dayjs(sleep.from), 'hour', true);
        return sum + duration;
      }, 0);
    });

    // === YEAR (Y) ===
    const Y_data = Array.from({ length: 12 }, (_, i) => {
      const monthStart = today.startOf('year').add(i, 'month');
      const monthEnd = monthStart.endOf('month');
      
      const monthSleeps = data.filter(sleep => {
        const sleepDate = dayjs(sleep.from);
        return sleepDate.isBetween(monthStart, monthEnd, 'day', '[]');
      });
      
      return monthSleeps.reduce((sum, sleep) => {
        const duration = dayjs(sleep.to).diff(dayjs(sleep.from), 'hour', true);
        return sum + duration;
      }, 0);
    });

    return {
      D: {
        labels: D_ranges.map(r => r.label),
        data: D_data,
      },
      W: {
        labels: weekDays.map(d => d.format('ddd')),
        data: W_data,
      },
      M: {
        labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
        data: M_data,
      },
      BM: {
        labels: ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
        data: BM_data,
      },
      Y: {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        data: Y_data,
      },
    };
  };

  useEffect(() => {
    fetchSleepData();
  }, [reloadData]);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setReloadData(!reloadData); // Recargar datos después de cerrar el modal
  };

  return (
    <Container>
      <GenericBarChart
        title="Horas de sueño"
        handleOpenModal={handleOpenModal}
        chartData={sleepData}
      />
      <AboutSleep />
      <CommonModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Registrar horas de sueño"
        confirmText="Guardar"
        cancelText="Cancelar"
      >
        <AddSleepHours onClose={handleCloseModal} />
      </CommonModal>
      <StatSleep />
    </Container>
  );
};

export default SleepView;
