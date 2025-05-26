import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.elements.dni.value;
    const password = form.elements.password.value;

    console.log(email, password);
  };

  return (
    <div className="fullscreen-center">
      <Card style={{ width: "22rem" }} className="p-3">
        <Card.Body>
          <Card.Title className="mb-3 text-center">Iniciar Sesión</Card.Title>

          {/* {showAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Credenciales incorrectas
            </Alert>
          )} */}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="dni">
              <Form.Label>DNI</Form.Label>
              <Form.Control type="number" placeholder="Ingresá tu DNI" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresá tu contraseña"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Entrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignIn;
