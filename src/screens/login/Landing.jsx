import meditationImg from "../../assets/meditation.png";

function Landing({ setActiveLogin }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="mt-3">Health Tracker</h1>

      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src={meditationImg}
          alt="Meditation"
          className="img-fluid"
          style={{
            maxHeight: "70vh",
            objectFit: "contain",
            borderRadius: "12px",
            position: "relative",
            zIndex: 1,
            display: "block",
            width: "100%",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "90px",
            left: "25%",
            width: "50%",
            height: "20px",
            borderRadius: "50%",
            boxShadow: "0 40px 15px rgba(0,0,0,0.3)",
            zIndex: 0,
            pointerEvents: "none",
            backgroundColor: "transparent",
          }}
        />
      </div>

      <p>Tu bienestar emocional</p>

      <svg
        onClick={() => setActiveLogin(true)}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-right cursor-pointer"
        viewBox="0 0 16 16"
        style={{ cursor: "pointer" }}
      >
        <path
          fill-rule="evenodd"
          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
        />
      </svg>
    </div>
  );
}

export default Landing;
