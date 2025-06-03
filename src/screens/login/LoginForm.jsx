import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import meditationImg from "../../assets/meditation.png";

const LoginForm = ({ setActiveLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.elements.dni.value;
    const password = form.elements.password.value;

    console.log(email, password);
  };

   return (
    <div className="fullscreen-center">
      <Card style={{ width: "22rem", border: "none"}} className="p-3">
        <Card.Body className="text-center">
          
          <div className="mb-4" style={{ marginTop: '-20px' }}> 
            <img 
              src={meditationImg} 
              alt="Meditación" 
              style={{ 
                width: '200px', 
                height: 'auto',
                borderRadius: '50%',
                objectFit: 'cover'
              }} 
            />
          </div>

          <h4 className="mb-3 text-center">Inicia Sesión</h4>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-start" controlId="dni">
              <Form.Label>DNI</Form.Label>
              <Form.Control type="number" placeholder="Ingresá tu documento" />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresá tu contraseña"
              />
            </Form.Group>

            <Button style={{
              background: "linear-gradient(to right, #d3dec3,rgb(165, 180, 142))", borderColor: "rgb(180, 190, 164)", color: "#fff",}} type="submit" className="w-100 mb-3">
              Iniciar Sesión
            </Button>
          </Form>

          <div className="text-end mb-3">
            <a href="#" className="text-decoration-none" style={{ color: "#515151", fontSize: "0.8rem"}}>
              <strong>Olvidaste tu contraseña?</strong>
            </a>
          </div>

          <hr className="my-4" />

  
          <Button style={{
              background: "linear-gradient(to left, #d3dec3,rgb(165, 180, 142))", borderColor: "rgb(180, 190, 164)", color: "#fff",}} type="submit" className="w-100 mb-3">
              Registrarse
            </Button>
        </Card.Body>
      </Card>
    </div>
  );
};


export default LoginForm;
