import { Container } from "react-bootstrap";
import "../App.css";
import GenericCard from "../utils/GenericCard";
import { useEffect, useState } from "react";
import { COLORS } from "../constants/colors";
import { useUser } from "../contexts/UserContext";
import { supabase } from "../../supabaseClient";

const foodToLabel = {
  Good: "excelente",
  Fair: "adecuada",
};

function Home() {
  const user = useUser();
  const [goals, setGoals] = useState(null);

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

  return (
    <Container className="d-flex flex-column align-items-center mt-3 gap-3">
      <h3
        style={{
          color: COLORS.DARK_TEXT,
          fontWeight: "bold",
        }}
        className="mb-3"
      >
        Datos anclados de {user?.name}
      </h3>

      <GenericCard
        title="Actividad"
        icon="fire"
        href="/activity"
        body={
          !!goals?.activity && (
            <div className="px-3">
              <p
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                }}
              >
                {goals.activity} minutos de actividad diaria
              </p>
            </div>
          )
        }
      />

      <GenericCard
        title="Estado de ánimo"
        icon="mood"
        href="/mood"
        body={
          <div className="px-3">
           
           
          </div>
        }
      />

      <GenericCard
        title="Sueño"
        icon="sleep"
        href="/sleep"
        body={
          !!goals?.sleep && (
            <div className="px-3">
              <p
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                }}
              >
                {goals.sleep} horas de sueño diario
              </p>
            </div>
          )
        }
      />
      <GenericCard
        title="Alimentación"
        icon="food"
        href={"/food"}
        body={
          !!goals?.food && (
            <div className="px-3">
              <p
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                }}
              >
                Tener una alimentación {foodToLabel[goals.food]}
              </p>
            </div>
          )
        }
      />
      <GenericCard
        title="Horas de estudio"
        icon="study"
        href={"/study"}
        body={
          !!goals?.study && (
            <div className="px-3">
              <p
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                }}
              >
                {goals.study} minutos de estudio diarias
              </p>
            </div>
          )
        }
      ></GenericCard>
    </Container>
  );
}

export default Home;
