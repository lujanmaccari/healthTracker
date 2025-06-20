import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";

const AddStudy = ({ onClose }) => {
  const fechaActual = new Date().toISOString();

  const initialValues = {
    minutes: "",
  };

  const validationSchema = Yup.object({
    minutes: Yup.number().required("El tiempo es requerido"),
  });

  const handleSubmit = async () => {
    // enviar junto con minutes fecha actual
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
            <Form.Group className="mb-3 text-start" controlId="minutes">
              <Form.Label>Tiempo de estudio (minutos)</Form.Label>

              <Form.Control
                type="number"
                name="minutes"
                value={values.minutes}
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
