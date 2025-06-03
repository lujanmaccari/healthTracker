import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const LoginForm = ({ setActiveLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.elements.dni.value;
    const password = form.elements.password.value;

    console.log(email, password);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: 20,
      }}
    >
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

      <svg
        onClick={() => setActiveLogin(false)}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-left"
        viewBox="0 0 16 16"
        style={{ cursor: "pointer" }}
      >
        <path
          fill-rule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
        />
      </svg>
    </div>
  );
};

export default LoginForm;
