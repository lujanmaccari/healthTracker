import meditationImg from "../assets/meditationSmall.jpeg";
import Button from "react-bootstrap/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";

import * as Yup from "yup";

const AboutYou = () => {
  const labelStyle = {
    fontSize: "0.9rem",
    marginBottom: "0.3rem",
    display: "block",
  };

  const fieldStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.8rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Correo inválido").required("Requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
    gender: Yup.string().required("Requerido"),
    age: Yup.number().positive("Debe ser positivo").required("Requerido"),
    name: Yup.string().required("Requerido"),
    height: Yup.number().positive("Debe ser positivo").required("Requerido"),
    weight: Yup.number().positive("Debe ser positivo").required("Requerido"),
  });

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async ({ email, password, name, gender, age }) => {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      showToast(
        "Hubo un error al registrarse. Verificá que el email y la contraseña tengan el formato correcto. También puede que ya exista una cuenta registrada con este correo electrónico."
      );
      console.error(signUpError);
      return;
    }

    const userId = signUpData.user?.id;

    if (!userId) {
      return;
    }

    const { error: insertError } = await supabase.from("users").insert([
      {
        id: userId,
        name,
        gender,
        email,
        age,
      },
    ]);

    if (insertError) {
      showToast(
        "Hubo un error al registrarse. Verificá que el email y la contraseña tengan el formato correcto. También puede que ya exista una cuenta registrada con este correo electrónico."
      );

      console.error(insertError);
      return;
    }

    console.log("Usuario registrado y datos guardados en la tabla users");
    showToast(
      "El registro fue exitoso. Por favor, revisá tu correo electrónico y confirmá tu cuenta para poder continuar.",
      "success"
    );
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column align-items-center mt-3 gap-3"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      <div className="mb-2">
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

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          fontSize: "0.95rem",
          color: "#333",
          marginBottom: "1.5rem",
        }}
      >
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
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={{ width: "100%", maxWidth: "320px" }}>
          <label style={labelStyle}>Género</label>
          <Field as="select" name="gender" style={fieldStyle}>
            <option value="">Selecciona</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="Otro">Otro</option>
          </Field>
          <ErrorMessage
            name="gender"
            component="div"
            style={{ color: "red" }}
          />

          <label style={labelStyle}>Edad</label>
          <Field
            name="age"
            type="number"
            placeholder="Ej: 25"
            min="0"
            style={fieldStyle}
          />
          <ErrorMessage name="age" component="div" style={{ color: "red" }} />

          <label style={labelStyle}>Altura (cm)</label>
          <Field
            name="height"
            type="number"
            placeholder="Ej: 165"
            min="0"
            style={fieldStyle}
          />
          <ErrorMessage
            name="height"
            component="div"
            style={{ color: "red" }}
          />

          <label style={labelStyle}>Peso (kg)</label>
          <Field
            name="weight"
            type="number"
            placeholder="Ej: 60"
            min="0"
            style={fieldStyle}
          />
          <ErrorMessage
            name="weight"
            component="div"
            style={{ color: "red" }}
          />

          <label style={labelStyle}>Nombre</label>
          <Field
            name="name"
            type="text"
            placeholder="Ej: Natalia Natalia"
            style={fieldStyle}
          />
          <ErrorMessage name="name" component="div" style={{ color: "red" }} />

          <label style={labelStyle}>Correo electrónico</label>
          <Field
            name="email"
            type="email"
            placeholder="Ej: ejemplo@mail.com"
            style={fieldStyle}
          />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />

          <label style={labelStyle}>Contraseña</label>
          <Field
            name="password"
            type="password"
            placeholder="********"
            style={fieldStyle}
          />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red" }}
          />

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
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
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AboutYou;
