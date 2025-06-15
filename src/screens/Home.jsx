import { Container } from "react-bootstrap";
import "../App.css";
import meditationImg from "../assets/meditation.png";
import { useUser } from "../contexts/UserContext";
import GenericCard from "../utils/GenericCard";
import CommonModal from "../utils/CommonModal";
import { useState } from "react";

function Home() {
  const user = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const modalAlimentacion = () => <>Ingrese Como fue su Alimetación hoy</>;

  return (
    <Container
      className="d-flex flex-column align-items-center mt-3 gap-3"
      style={{ maxWidth: "400px" }}
    >
      <div className="mb-2">
        <img
          src={meditationImg}
          alt="meditationImg"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>

      <h3 className="mb-3">{user?.name || "-"}</h3>
      <h5 className="text-muted mb-3">Resumen</h5>

      <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalContent}
      </CommonModal>
      <GenericCard
        title="Actividad"
        icon="fire"
        href="/activity"
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
        icon="mood"
        href="/feeling"
        body={
          <div className="px-2">
            <div className="medium">Un momento ligeramente agradable</div>
            <div className="text-muted small">Felicidad, confianza</div>
          </div>
        }
      />

      <GenericCard
        title="Sueño"
        icon="sleep"
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
      <GenericCard
        title="Alimentación"
        icon="food"
        body={
          <div
            className="d-flex justify-content-around align-items-center px-2"
            style={{ gap: "1rem" }}
          >
            <div className="text-center">
              <div className="text-muted small">Kcal diarios</div>
              <div className="fw-bold">2500</div>
            </div>

            <div className="text-muted d-none d-md-block">|</div>

            <div className="text-center">
              <div className="text-muted small">Litros diarios</div>
              <div className="fw-bold">2 lts</div>
            </div>
          </div>
        }
        onClickIcon={() => {
          setModalContent(modalAlimentacion());
          setIsModalOpen(true);
        }}
      />
      <GenericCard
        title="Horas de estudio"
        icon="study"
        href={"/study"}
        body={
          <div
            className="d-flex justify-content-around align-items-center px-2"
            style={{ gap: "1rem" }}
          >
            <div className="text-center">
              <div className="text-muted small">Semanalmente</div>
              <div className="fw-bold">44 hs</div>
            </div>
          </div>
        }
      ></GenericCard>
    </Container>
  );
}

export default Home;
