import { Formik } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import { supabase } from "../../../supabaseClient";
import { useToast } from "../../contexts/ToastContext";

const AddActivity = ({ onClose, states }) => {
  const { showToast } = useToast();
  const { reloadData, setReloadData } = states;

  const initialValues = {
    activity: "",
    duration: "",
  };

  const validationSchema = Yup.object({
    activity: Yup.string().required("La actividad es obligatoria"),
    duration: Yup.string().required("La duracion es obligatoria"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { activity, duration } = values;
    const date = new Date();
    date.setHours(date.getHours() - 3);
    const isoDate = date.toISOString();
    const { error } = await supabase.from("activities").insert([
      {
        type: activity,
        duration: parseInt(duration),
        date: isoDate,
      },
    ]);

    if (error) {
      showToast("Error al guardar la actividad");
      return;
    }

    showToast("Actividad guardada con éxito", "success");
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
            <Form.Group className="mb-3 text-start" controlId="activity">
              <Form.Label>Tipo de actividad</Form.Label>
              <Form.Select
                name="activity"
                value={values.activity}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Selecciona una actividad</option>
                <option value="Caminar">Caminar</option>
                <option value="Correr">Correr</option>
                <option value="Bicicleta">Bicicleta</option>
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
