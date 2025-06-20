import { Formik } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
const AddActivity = ({ onClose }) => {
  const fechaActual = new Date().toISOString();

  const initialValues = {
    activity: "",
    duration: "",
  };

  const validationSchema = Yup.object({
    activity: Yup.string().required("La actividad es obligatoria"),
    duration: Yup.string().required("La duracion es obligatoria"),
  });

  const handleSubmit = async () => {
    // enviar junto con activity y duration fecha actual
    console.log("Formulario enviado");
  };

  return (
    <Container className="w-100">
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
            <Form.Group className="mb-3 text-start" controlId="activity">
              <Form.Label>Tipo de actividad</Form.Label>
              <Form.Select
                value={values.activity}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="ejercicio">Caminar</option>
                <option value="horasestudio">Correr</option>
                <option value="sueño">Bicicleta</option>
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors.activity}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="duration">
              <Form.Label>Duración (minutos)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={values.duration}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="120 mins"
                isInvalid={touched.duration && !!errors.duration}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <Form.Control.Feedback type="invalid">
                {errors.duration}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-center gap-3 pb-3">
              <Button className="btnApp" type="submit">
                Agregar
              </Button>
              <Button className="btnCancel" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddActivity;
