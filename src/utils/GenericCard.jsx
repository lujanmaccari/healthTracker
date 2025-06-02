import { Card } from "react-bootstrap";

const GenericCard = ({ title, body }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {Array.isArray(body) ? body.join(" | ") : body}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GenericCard;
