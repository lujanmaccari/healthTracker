import { Card, Container } from "react-bootstrap";
import "../App.css";
import GenericCard from "../utils/GenericCard";

function Home() {
  return (
    <Container className="d-flex flex-column align-items-center mt-4 gap-4">
      <GenericCard title="Actividad" />
      <GenericCard
        title="Estado de ánimo"
        body="Un momento ligeramente agradable"
      />
      <GenericCard
        title="Sueño"
        body={["Duración Sueño", "Horario para dormir"]}
      />
    </Container>
  );
}

export default Home;
