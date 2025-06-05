import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import meditationImg from "../../assets/meditation.png";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    dni: "",
    password: "",
  };

  const validationSchema = Yup.object({
    dni: Yup.string()
      .required("El DNI es obligatorio")
      .matches(/^\d+$/, "Solo se permiten números"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const handleSubmit = (values) => {
    console.log(values.dni, values.password);
  };

  const redirect = () => {
    navigate("/aboutYou");
  };

  return (
    <div className="fullscreen-center">
      <Card
        style={{
          width: "22rem",
          border: "none",
          backgroundColor: "transparent",
        }}
        className="p-3"
      >
        <Card.Body className="text-center">
          <div className="mb-4" style={{ marginTop: "-20px" }}>
            <img
              src={meditationImg}
              alt="Meditación"
              style={{
                width: "200px",
                height: "auto",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>

          <h4 className="mb-3 text-center">Inicia Sesión</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3 text-start" controlId="dni">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="number"
                    name="dni"
                    value={values.dni}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ingresá tu documento"
                    isInvalid={touched.dni && !!errors.dni}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dni}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 text-start" controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ingresá tu contraseña"
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  style={{
                    background:
                      "linear-gradient(to right, #d3dec3,rgb(165, 180, 142))",
                    borderColor: "rgb(180, 190, 164)",
                    color: "#fff",
                  }}
                  type="submit"
                  className="w-100 mb-3"
                >
                  Iniciar Sesión
                </Button>
              </Form>
            )}
          </Formik>
          <hr />

          <Button
            type="button"
            onClick={redirect}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "rgb(118, 129, 103)",
              fontWeight: "bold",
            }}
          >
            Registrarse
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginForm;
