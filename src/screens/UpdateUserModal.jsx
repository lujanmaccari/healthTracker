import { useRef } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CommonModal from "../utils/CommonModal";
import { useUser } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";

const UpdateUserModal = ({ isOpen, onClose }) => {
  const user = useUser();
  const { showToast } = useToast();
  const formikRef = useRef();

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
  });

  const handleSubmit = async (values) => {
    try {
      user.updateUser(values);
      onClose();
    } catch (err) {
      console.error(err);
      showToast("Ocurrió un error inesperado.");
    }
  };

  const initialValues = user;

  return (
    <>
      <CommonModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => {
          if (formikRef.current) {
            formikRef.current.submitForm();
          }
        }}
        confirmText="Actualizar"
      >
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="w-100">
            <div className="row">
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
          </Form>
        </Formik>
      </CommonModal>
    </>
  );
};

export default UpdateUserModal;
