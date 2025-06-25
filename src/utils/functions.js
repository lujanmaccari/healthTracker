export const prepareChartData = (activities) => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // Función para obtener la fecha local correctamente
  const getLocalDate = (isoDateStr) => {
    return new Date(isoDateStr);
  };

  // === DAY (D): Rangos horarios ===
  const todayActivities = activities.filter((a) => {
    const activityDate = getLocalDate(a.date);
    const activityDateStr = activityDate.toISOString().split("T")[0];
    return activityDateStr === todayStr;
  });

  const D_ranges = [
    { label: "00–06", from: 0, to: 6 },
    { label: "06–12", from: 6, to: 12 },
    { label: "12–18", from: 12, to: 18 },
    { label: "18–24", from: 18, to: 24 },
  ];

  const D_labels = D_ranges.map((r) => r.label);
  const D_data = D_ranges.map(({ from, to }) => {
    const total = todayActivities
      .filter((a) => {
        const hour = getLocalDate(a.date).getHours();
        return hour >= from && hour < to;
      })
      .reduce((sum, a) => sum + Number(a.duration), 0);
    return total / 60;
  });

  // === WEEK (W) ===
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // domingo
  startOfWeek.setHours(0, 0, 0, 0); // Resetear horas para comparación exacta

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  const W_labels = weekDays.map((d) =>
    d.toLocaleDateString("es-AR", { weekday: "short" })
  );

  const W_data = weekDays.map((date) => {
    const dayStr = date.toISOString().split("T")[0];
    const totalMinutes = activities
      .filter((a) => {
        const activityDate = getLocalDate(a.date);
        const activityDateStr = activityDate.toISOString().split("T")[0];
        return activityDateStr === dayStr;
      })
      .reduce((sum, a) => sum + Number(a.duration), 0);
    return totalMinutes / 60;
  });

  // === MONTH (M) ===
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const numberOfWeeks = Math.ceil(daysInMonth / 7);
  const M_labels = Array.from({ length: numberOfWeeks }, (_, i) => `Semana ${i + 1}`);
  const M_data = Array.from({ length: numberOfWeeks }, () => 0);

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const weekIndex = Math.floor((day - 1) / 7);
    const dayTotal = activities
      .filter((a) => {
        const activityDate = getLocalDate(a.date);
        const activityDateStr = activityDate.toISOString().split("T")[0];
        return activityDateStr === dateStr;
      })
      .reduce((sum, a) => sum + Number(a.duration), 0);
    M_data[weekIndex] += dayTotal / 60;
  }

  return {
    D: {
      labels: D_labels,
      data: D_data,
    },
    W: {
      labels: W_labels,
      data: W_data,
    },
    M: {
      labels: M_labels,
      data: M_data,
    },
  };
};
