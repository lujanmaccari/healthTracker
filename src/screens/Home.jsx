import { Container } from "react-bootstrap";
import "../App.css";
import GenericCard from "../utils/GenericCard";
import userexampleImg from "../assets/userexample.png";

import { useUser } from "../contexts/UserContext";

function Home() {
  const user = useUser();

  return (
    <Container
      className="d-flex flex-column align-items-center mt-3 gap-3"
      style={{ maxWidth: "400px" }}
    >
      <div className="mb-2">
        <img
          src={userexampleImg}
          alt="Userexample"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>

      <h3 className="mb-3">{user?.name || "Lolu"}</h3>
      <div className="d-flex justify-content-between align-items-center w-100 mb-3">
        <h5 className="text-muted mb-3">Datos Anclados</h5>
        <button className="btn btn-sm btn-outline-secondary">Editar</button>
      </div>

      <GenericCard
        title="Actividad"
        body={
          <div
            className="d-flex justify-content-between text-center"
            style={{ fontSize: "0.9rem" }}
          >
            <div className="px-2">
              <div className="text-muted">Moverse</div>
              <div className="fw-bold">1'kcal</div>
            </div>

            <div className="text-muted d-none d-md-block">|</div>

            <div className="px-2">
              <div className="text-muted">Ejercicio</div>
              <div className="fw-bold">2 min</div>
            </div>

            <div className="text-muted d-none d-md-block">|</div>

            <div className="px-2">
              <div className="text-muted">Pararse</div>
              <div className="fw-bold">3hs</div>
            </div>
          </div>
        }
      />

      <GenericCard
        title="Estado de ánimo"
        body={
          <div className="px-2">
            <div className="medium">Un momento ligeramente agradable</div>
            <div className="text-muted small">Felicidad, confianza</div>
          </div>
        }
      />

      <GenericCard
        title="Sueño"
        body={
          <div
            className="d-flex justify-content-around align-items-center px-2"
            style={{ gap: "1rem" }}
          >
            <div className="text-center">
              <div className="text-muted small">Duración del sueño</div>
              <div className="fw-bold">8hs</div>
            </div>

            <div className="text-muted d-none d-md-block">|</div>

            <div className="text-center">
              <div className="text-muted small">Horario para dormir</div>
              <div className="fw-bold">22:00hs</div>
            </div>
          </div>
        }
      />
    </Container>
  );
}

export default Home;
