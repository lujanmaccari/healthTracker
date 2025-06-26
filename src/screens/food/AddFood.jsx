import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { supabase } from "../../../supabaseClient";
import CommonModal from "../../utils/CommonModal";
import { useToast } from "../../contexts/ToastContext";
import { useUser } from "../../contexts/UserContext";

const AddFood = ({ isOpen, onClose, onSaved }) => {
  const user = useUser();
  const { showToast } = useToast();
  const [nutritionQuality, setNutritionQuality] = useState("good");

  const handleSubmit = async () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);          // 🇦🇷-3 UTC
    const isoDate = date.toISOString();

    const { error } = await supabase
      .from("user_diet_quality")                 // tabla destino
      .insert([{ unit: nutritionQuality, date: isoDate, user_id: user.id }]);

    if (error) {
      showToast("Error al guardar la dieta.", "danger");
      console.error("Error al guardar la dieta:", error);
      return;

    }
    showToast("Calidad guardada con éxito", "success");
    onSaved();                                  // notifica al padre para recargar
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      title="Registrar comida"
      confirmText="Guardar"
      cancelText="Cancelar"
    >
      <Form>
        <Form.Group className="mb-3 text-start">
          <Form.Label>Calidad de la comida</Form.Label>
          <Form.Select
            value={nutritionQuality}
            onChange={(e) => setNutritionQuality(e.target.value)}
          >
            <option value="Good">Buena</option>
            <option value="Fair">Media</option>
            <option value="Poor">Mala</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </CommonModal>
  );
};

export default AddFood;