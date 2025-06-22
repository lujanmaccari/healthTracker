import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import meditationImg from "../../assets/meditation.png";
import { supabase } from "./../../../supabaseClient";
import { useToast } from "../../contexts/ToastContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("El email es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const handleSubmit = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showToast(
        "Hubo un Error al iniciar Sesion, Revise su Correo y Contraseña a la vez que verifique que haya aceptado la confirmación por correo electronico.",
        "danger"
      );
      console.error("Error al iniciar sesión:", error);
    } else {
      navigate("/home");
    }
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
                <Form.Group className="mb-3 text-start" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ingresá tu email"
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
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

                <Button className="btnApp" type="submit">
                  Iniciar Sesión
                </Button>
              </Form>
            )}
          </Formik>
          <hr />

          <Button type="button" onClick={redirect} className="btnNoBg">
            Registrarse
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginForm;
