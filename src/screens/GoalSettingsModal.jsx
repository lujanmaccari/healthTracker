import { Formik } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import { supabase } from "./../../supabaseClient";
import { useToast } from "./../contexts/ToastContext";

const GoalSettingsModal = ({ onClose, states }) => {
  const { showToast } = useToast();

  const initialValues = {
    activity: "",
    sleep: "",
    food: "",
    study: "",
  };

  const validationSchema = Yup.object({
    activity: Yup.string().required("La actividad es obligatoria"),
    sleep: Yup.string().required("El sueño es obligatoria"),
    food: Yup.string().required("La alimentación es obligatoria"),
    study: Yup.string().required("Los estudios son obligatorios"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { activity, sleep, food, study } = values;

    // Obtener el ID del usuario
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      showToast("Usuario no autenticado", "error");
      return;
    }

    // Buscar si ya existe un objetivo para este usuario
    const { data: existingGoals, error: fetchError } = await supabase
      .from("user_goals")
      .select("*")
      .eq("user_id", user.id)
      .single(); // asume una fila por usuario

    if (fetchError && fetchError.code !== "PGRST116") {
      showToast("Error al verificar objetivos", "error");
      return;
    }

    if (!existingGoals) {
      // No existe, insertar
      const { error: insertError } = await supabase.from("user_goals").insert([
        {
          user_id: user.id,
          activity,
          sleep,
          food,
          study,
        },
      ]);

      if (insertError) {
        showToast("Error al guardar objetivos", "error");
        return;
      }

      showToast("Objetivos guardados con éxito", "success");

      resetForm();
      onClose();
    } else {
      // Existe, actualizar
      const { error: updateError } = await supabase
        .from("user_goals")
        .update({ activity, sleep, food, study })
        .eq("user_id", user.id);

      if (updateError) {
        showToast("Error al actualizar objetivos", "error");
        return;
      }

      showToast("Objetivos actualizados con éxito", "success");
      resetForm();
      onClose();
    }

    setReloadData((prev) => !prev);
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
              <Form.Label>Actividad (mins)</Form.Label>
              <Form.Control
                type="number"
                name="activity"
                value={values.activity}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="120 mins"
                isInvalid={touched.activity && !!errors.activity}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <Form.Control.Feedback type="invalid">
                {errors.activity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 text-start" controlId="activity">
              <Form.Label>Sueño (hs)</Form.Label>
              <Form.Control
                type="number"
                name="sleep"
                value={values.sleep}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="8 hs"
                isInvalid={touched.sleep && !!errors.sleep}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sleep}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 text-start" controlId="activity">
              <Form.Label>Alimentación </Form.Label>
              <Form.Control
                type="number"
                name="food"
                value={values.food}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="8 hs"
                isInvalid={touched.food && !!errors.food}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <Form.Control.Feedback type="invalid">
                {errors.food}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 text-start" controlId="activity">
              <Form.Label>Estudio (mins)</Form.Label>
              <Form.Control
                type="number"
                name="study"
                value={values.study}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="8 hs"
                isInvalid={touched.study && !!errors.study}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <Form.Control.Feedback type="invalid">
                {errors.study}
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

export default GoalSettingsModal;
