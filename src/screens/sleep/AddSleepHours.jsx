import { Formik } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
const AddSleepHours = ({ onClose }) => {
  const fechaActual = new Date().toISOString();

  const initialValues = {
    from: "",
    to: "",
  };

  const validationSchema = Yup.object({
    from: Yup.number().required("El tiempo es obligatorio"),
    to: Yup.number().required("El tiempo es obligatorio"),
  });

  const handleSubmit = async () => {
    // enviar junto con from y to fecha actual
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
            <Form.Group className="mb-3 text-start" controlId="from">
              <Form.Label>Desde</Form.Label>
              <Form.Control
                type="time"
                name="from"
                value={values.from}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="20:00"
                isInvalid={touched.from && !!errors.from}
                onWheel={(e) => e.currentTarget.blur()}
              />

              <Form.Control.Feedback type="invalid">
                {errors.from}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="to">
              <Form.Label>Hasta</Form.Label>
              <Form.Control
                type="time"
                name="to"
                value={values.to}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="7:00"
                isInvalid={touched.to && !!errors.to}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <Form.Control.Feedback type="invalid">
                {errors.to}
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

export default AddSleepHours;
