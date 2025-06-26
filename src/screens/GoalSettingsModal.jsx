import { Formik } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import { supabase } from "./../../supabaseClient";
import { useToast } from "./../contexts/ToastContext";
import CommonModal from "../utils/CommonModal";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../contexts/UserContext";

const GoalSettingsModal = ({ isOpen, onClose }) => {
  const formikRef = useRef();
  const user = useUser();
  const { showToast } = useToast();
  const [goals, setGoals] = useState(null);

  const validationSchema = Yup.object({
    activity: Yup.string().required("La actividad es obligatoria"),
    sleep: Yup.string().required("El sueño es obligatoria"),
    food: Yup.string().required("La alimentación es obligatoria"),
    study: Yup.string().required("Los estudios son obligatorios"),
  });
  const getGoals = async () => {
    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from("user_goals")
      .select("*")
      .eq("user_id", user.id)
      .single();
    if (error) {
      console.error("Error al obtener el objetivo:", error);
      return null;
    }

    return data;
  };

  useEffect(() => {
    const fetchGoals = async () => {
      const result = await getGoals();
      setGoals(result);
    };

    if (user) {
      fetchGoals();
    }
  }, [user]);

  const handleSubmit = async (values, { resetForm }) => {
    const { activity, sleep, food, study } = values;

    // Obtener el ID del usuario

    if (!user) {
      showToast("Usuario no autenticado", "error");
      return;
    }

    if (!goals) {
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
  const initialValues = goals || {
    activity: "",
    sleep: "",
    food: "",
    study: "",
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        if (formikRef.current) {
          formikRef.current.submitForm();
        }
      }}
      title="Configuración de objetivos diarios"
      confirmText="Actualizar"
    >
      <Container className="w-100">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          innerRef={formikRef}
          enableReinitialize
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
                <Form.Select
                  name="food"
                  value={values.food}
                  onChange={handleChange}
                >
                  <option value="Good">Buena</option>
                  <option value="Fair">Media</option>
                  <option value="Poor">Mala</option>
                </Form.Select>
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
            </Form>
          )}
        </Formik>
      </Container>
    </CommonModal>
  );
};

export default GoalSettingsModal;
