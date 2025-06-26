import { Formik } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import { supabase } from "../../../supabaseClient";
import { useToast } from "../../contexts/ToastContext";
import { useUser } from "../../contexts/UserContext";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

const AddSleepHours = ({ onClose }) => {
  const { showToast } = useToast();
  const user = useUser();

  const initialValues = {
    from: "",
    to: "",
  };

  const validationSchema = Yup.object({
    from: Yup.string().required("El horario de inicio es obligatorio"),
    to: Yup.string().required("El horario de fin es obligatorio"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { from, to } = values;
    // Armar los timestamps
    const today = dayjs().startOf("day");
    const fromDateTime = dayjs(`${today.format("YYYY-MM-DD")}T${from}`);
    let toDateTime = dayjs(`${today.format("YYYY-MM-DD")}T${to}`);
    // Si la hora de fin es menor o igual a la de inicio, sumamos un día
    if (toDateTime.isSameOrBefore(fromDateTime)) {
      toDateTime = toDateTime.add(1, "day");
    }
    // Validación extra: no permitir que la duración sea menor a 1h o mayor a 16h
    const duration = toDateTime.diff(fromDateTime, "hour", true);
    if (duration < 1 || duration > 16) {
      showToast("La duración del sueño debe ser entre 1 y 16 horas", "danger");
      return;
    }
    // Buscar si ya existe registro para hoy
    const { data: existing, error: fetchError } = await supabase
      .from("user_sleep_hour")
      .select("id")
      .eq("user_id", user.id)
      .gte("from", today.toISOString())
      .lt("from", today.add(1, "day").toISOString())
      .maybeSingle();
    if (fetchError && fetchError.code !== "PGRST116") {
      showToast("Error al verificar registros previos", "danger");
      return;
    }
    let result;
    if (existing && existing.id) {
      // Update
      result = await supabase
        .from("user_sleep_hour")
        .update({ from: fromDateTime.toISOString(), to: toDateTime.toISOString(), user_id: user.id })
        .eq("id", existing.id);
    } else {
      // Insert
      result = await supabase
        .from("user_sleep_hour")
        .insert([
          { from: fromDateTime.toISOString(), to: toDateTime.toISOString(), user_id: user.id },
        ]);
    }
    if (result.error) {
      showToast("Error al guardar las horas de sueño", "danger");
      console.error("Error detallado:", result.error);
      return;
    }
    showToast("Horas de sueño guardadas con éxito", "success");
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
                inputMode="numeric"
                pattern="[0-9]{2}:[0-9]{2}"
                autoComplete="off"
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
                placeholder="07:00"
                isInvalid={touched.to && !!errors.to}
                inputMode="numeric"
                pattern="[0-9]{2}:[0-9]{2}"
                autoComplete="off"
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
