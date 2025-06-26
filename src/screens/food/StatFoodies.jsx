const StatFoodie = ({ dominantQuality, qualityEvaluation, activeFilter }) => (
  <>
    <div style={{
      display: 'flex', justifyContent: 'center',
      gap: '20px', margin: '20px 0'
    }}>
      {["Buena", "Media", "Mala"].map((label) => (
        <label key={label} style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={dominantQuality.label === label}
            readOnly
            style={{ marginRight: 8 }}
          />
          {label}
        </label>
      ))}
    </div>

    <p style={{ textAlign: "center", fontSize: 16, color: "#555" }}>
      Tu alimentación es{" "}
      <strong style={{ color: qualityEvaluation.color, textTransform: "capitalize" }}>
        {qualityEvaluation.text}
      </strong>{" "}
      {activeFilter === "D" ? "hoy"
        : activeFilter === "W" ? "esta semana"
        : "este mes"}
    </p>
  </>
);

export default StatFoodie;