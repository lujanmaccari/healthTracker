import { Card } from "react-bootstrap";
import "../App.css";

function Home() {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Health Tracker</Card.Title>
          <Card.Text>IFTS18.</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Home;