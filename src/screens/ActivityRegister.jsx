import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddActivity = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fecha: "",
    categoria: "",
    duracion: "",
  });

  return (
    <Container
      className="d-flex flex-column align-items-center mt-3 gap-3"
      style={{
        maxWidth: "400px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      {/* Flecha de volver */}
      <div
        onClick={() => navigate("/home")}
        style={{
          alignSelf: "flex-start",
          cursor: "pointer",
          color: "#a5b48e",
          fontSize: "1.5rem",
        }}
      >
        ←
      </div>

      <h4 className="mb-3">Registrar Actividad</h4>

      <Form className="w-100">
        {/* Fecha */}
        <Form.Group className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
          />
        </Form.Group>

        {/* Categoría */}
        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          >
            <option value="">Seleccioná</option>
            <option value="ejercicio">Ejercicio</option>
            <option value="nutrición">Nutrición</option>
            <option value="sueño">Sueño</option>
          </Form.Select>
        </Form.Group>

        {/* Duración */}
        <Form.Group className="mb-3">
          <Form.Label>Duración (horas)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 1.5"
            value={form.duracion}
            onChange={(e) => setForm({ ...form, duracion: e.target.value })}
          />
        </Form.Group>

        {/* Botón Guardar */}
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="success"
            disabled
            style={{ backgroundColor: "#a5b48e", border: "none" }}
          >
            Guardar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddActivity;

