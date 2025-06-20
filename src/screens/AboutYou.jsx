import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { supabase } from "../../supabaseClient";
import meditationImg from "../assets/meditationSmall.jpeg";
import { useToast } from "../contexts/ToastContext";

const AboutYou = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Requerido"),
    gender: Yup.string().required("Requerido"),
    age: Yup.number()
      .positive("Debe ser positivo")
      .integer("El valor ingresado debe ser de tipo entero")
      .moreThan(17, "Debe ser mayor de ${more} para usar esta aplicación")
      .lessThan(100, "Debe ser menor de ${less} para usar esta aplicación")
      .required("Requerido"),
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

  const initialValues = {
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    email: "",
    password: "",
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{
        maxWidth: "500px",
        padding: "2rem",
        borderRadius: "15px",
      }}
    >
      <div className="text-center mb-4">
        <img
          src={meditationImg}
          alt="Meditation"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "1rem",
          }}
        />
        <h2 className="mb-3 fw-bold text-custom-green">Acerca de Ti</h2>
        <p
          className="text-muted small"
          style={{ textAlign: "justify", lineHeight: "1.5" }}
        >
          Con esta información, Health Tracker calcula las calorías, la
          distancia y la intensidad de tu actividad, y puede ofrecerte
          sugerencias de entrenamiento personalizadas.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-100">
          <div className="mb-4">
            <h5 className="text-secondary mb-3">Información Personal</h5>

            <div className="mb-3">
              <label className="form-label ">Nombre completo</label>
              <Field
                name="name"
                type="text"
                placeholder="Ej: Natalia García"
                className="form-control"
                style={{ borderRadius: "8px" }}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger small mt-1"
              />
            </div>

            <div className="mb-3">
              <label className="form-label ">Correo electrónico</label>
              <Field
                name="email"
                type="email"
                placeholder="ejemplo@mail.com"
                className="form-control"
                style={{ borderRadius: "8px" }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger small mt-1"
              />
            </div>

            <div className="mb-3">
              <label className="form-label ">Contraseña</label>
              <div className="input-group">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="form-control"
                  style={{ borderRadius: "8px 0 0 8px" }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ borderRadius: "0 8px 8px 0" }}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    style={{ color: "#6c757d" }}
                  />
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger small mt-1"
              />
            </div>
          </div>

          <div className="mb-4">
            <h5 className="text-secondary mb-3">Información Física</h5>

            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label ">Género</label>
                <Field
                  as="select"
                  name="gender"
                  className="form-select"
                  style={{ borderRadius: "8px" }}
                >
                  <option value="">Selecciona tu género</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Otro">Otro</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="col-4 mb-3">
                <label className="form-label">Edad</label>
                <Field
                  name="age"
                  type="number"
                  placeholder="25"
                  className="form-control"
                  style={{ borderRadius: "8px" }}
                  onWheel={(e) => e.currentTarget.blur()}
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="col-4 mb-3">
                <label className="form-label text-nowrap">Altura (cm)</label>
                <Field
                  name="height"
                  type="number"
                  placeholder="165"
                  className="form-control"
                  style={{ borderRadius: "8px" }}
                  onWheel={(e) => e.currentTarget.blur()}
                />
                <ErrorMessage
                  name="height"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="col-4 mb-3">
                <label className="form-label text-nowrap">Peso (kg)</label>
                <Field
                  name="weight"
                  type="number"
                  placeholder="60"
                  className="form-control"
                  style={{ borderRadius: "8px" }}
                  onWheel={(e) => e.currentTarget.blur()}
                />
                <ErrorMessage
                  name="weight"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4 gap-3">
            <Button type="submit" className="btnApp">
              Crear Cuenta
            </Button>
            <Button type="button" className="btnCancel" onClick={goBack}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Formik>
    </Container>
  );
};

export default AboutYou;
