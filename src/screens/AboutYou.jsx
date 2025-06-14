import { Container, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import meditationImg from "../assets/meditationSmall.jpeg";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";

const AboutYou = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const validationSchema = Yup.object({
    gender: Yup.string().required("Requerido"),
    age: Yup.number().positive("Debe ser positivo").required("Requerido"),
    height: Yup.number().positive("Debe ser positivo").required("Requerido"),
    weight: Yup.number().positive("Debe ser positivo").required("Requerido"),
    email: Yup.string().email("Correo inválido").required("Requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
  });

  const handleSubmit = async (values) => {
    try {
      const { email, password, gender, age, name } = values;

      // 1. Crear usuario en Supabase Auth
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        console.error(signUpError);
        showToast(
          "Error al registrarse. El correo puede ya estar en uso o los datos no son válidos."
        );
        return;
      }

      const userId = signUpData.user?.id;
      if (!userId) {
        showToast("No se pudo obtener el ID del usuario.");
        return;
      }

      // 2. Insertar datos adicionales en la tabla users
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId,
          email,
          name,
          gender,
          age,
        },
      ]);

      if (insertError) {
        console.error(insertError);
        showToast("Error al guardar los datos del perfil.");
        return;
      }

      // 3. Éxito
      showToast(
        "¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.",
        "success"
      );
      navigate("/home");
    } catch (err) {
      console.error(err);
      showToast("Ocurrió un error inesperado.");
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center mt-3 gap-3"
      style={{
        maxWidth: "400px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      <div className="mb-2 text-center">
        <img
          src={meditationImg}
          alt="Userexample"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <h3 className="mb-3">Acerca de Ti</h3>
      </div>

      <p className="text-center text-muted small mb-4">
        Con esta información, Health Tracker calcula las calorías, la distancia
        y la intensidad de tu actividad, y puede ofrecerte sugerencias de
        entrenamiento personalizadas.
      </p>

      <Formik
        initialValues={{
          gender: "",
          age: "",
          height: "",
          weight: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-100">
          <div className="row">
            {/* Columna izquierda */}
            <div className="col-6 mb-3">
              <label className="form-label">Género</label>
              <Field as="select" name="gender" className="form-control">
                <option value="">Seleccioná</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Edad</label>
              <Field
                name="age"
                type="number"
                placeholder="Ej: 25"
                className="form-control"
              />
              <ErrorMessage
                name="age"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Altura (cm)</label>
              <Field
                name="height"
                type="number"
                placeholder="Ej: 165"
                className="form-control"
              />
              <ErrorMessage
                name="height"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Peso (kg)</label>
              <Field
                name="weight"
                type="number"
                placeholder="Ej: 60"
                className="form-control"
              />
              <ErrorMessage
                name="weight"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Nombre</label>
              <Field
                name="name"
                type="text"
                placeholder="Ej: Natalia Natalia"
                className="form-control"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Correo electrónico</label>
              <Field
                name="email"
                type="email"
                placeholder="Ej: ejemplo@mail.com"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Contraseña</label>
              <Field
                name="password"
                type="password"
                placeholder="********"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger small"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Button
              type="submit"
              style={{
                backgroundColor: "#a5b48e",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                padding: 0,
                fontSize: "1.5rem",
                lineHeight: "1.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
              }}
            >
              ➜
            </Button>
          </div>
        </Form>
      </Formik>
    </Container>
  );
};

export default AboutYou;
