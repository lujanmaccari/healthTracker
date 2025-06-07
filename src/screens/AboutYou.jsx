import meditationImg from "../assets/meditationSmall.jpeg";

const AboutYou = () => {
  return (
    <div className="fullscreen-center"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        // backgroundColor: "#F5F5F5",
        padding: "2rem",
      }}
    >
    <div style={{ fontSize: "1.4rem",marginBottom: "1rem",fontWeight: "bold",position: "relative", display: "inline-block" }}>
        <img
          src={meditationImg}
          alt="Meditation"
          className="img-fluid"
          style={{
            maxHeight: "30vh",
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
      <div>
        <h1 className="mt-3">Acerca de Ti</h1>
      </div>
      


     

    </div>
  );
};



export default AboutYou;
