import { Formik } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import { supabase } from "../../../supabaseClient";
import { useToast } from "../../contexts/ToastContext";
import { useUser } from "../../contexts/UserContext";

const AddStudy = ({ onClose, states }) => {
  const user = useUser();
  const { showToast } = useToast();
  const { reloadData, setReloadData } = states;

  const initialValues = {
    minutes: ""
  };

  const validationSchema = Yup.object({
    minutes: Yup.number().required("El tiempo es requerido")
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { minutes } = values;
    const date = new Date();
    date.setHours(date.getHours() - 3);
    const isoDate = date.toISOString();

    const { error } = await supabase.from("user_time_study").insert([
      {
        user_id: user.id,
        duration: parseInt(minutes),
        date: isoDate
      },
    ]);

    if (error) {
      showToast("Error al guardar las horas de estudio");
      return;
    }

    showToast("Horas de estudio guardadas con éxito", "success");
    setReloadData(!reloadData);
    resetForm();
    onClose();
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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-start" controlId="minutes">
              <Form.Label>Tiempo de estudio (minutos)</Form.Label>

              <Form.Control
                type="number"
                name="minutes"
                duration={values.minutes}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="120 mins"
                isInvalid={touched.minutes && !!errors.minutes}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <Form.Control.Feedback type="invalid">
                {errors.minutes}
              </Form.Control.Feedback>
            </Form.Group>

            <small className="text-muted">
              Ingresa el tiempo estimado de estudio hoy
            </small>

            <div className="d-flex justify-content-center gap-3 pt-4">
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

export default AddStudy;
