import { Container } from "react-bootstrap";
import "../App.css";
import GenericCard from "../utils/GenericCard";
import { useEffect, useState } from "react";
import { COLORS } from "../constants/colors";
import { useUser } from "../contexts/UserContext";
import { supabase } from "../../supabaseClient";

const foodToLabel = {
  Good: "buena",
  Fair: "media",
  Bad: "mala",
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
          alignSelf: "flex-start",
          color: COLORS.DARK_TEXT,
          fontWeight: "bold",
        }}
        className="mb-3"
      >
        Datos Anclados
      </h3>

      <GenericCard
        title="Actividad"
        icon="fire"
        href="/activity"
        body={
          goals?.activity && (
            <div className="px-2">
              <div className="fw-bold">
                Alcanzar {goals?.activity} minutos de actividad diaria
              </div>
            </div>
          )
        }
      />

      <GenericCard
        title="Estado de ánimo"
        icon="mood"
        href="/mood"
        body={
          <div className="px-2">
            <div className="fw-bold">Un momento ligeramente agradable</div>
            <div className="text-muted small">Felicidad, confianza</div>
          </div>
        }
      />

      <GenericCard
        title="Sueño"
        icon="sleep"
        href="/sleep"
        body={
          goals?.sleep && (
            <div
              className="d-flex justify-content-around align-items-center px-2"
              style={{ gap: "1rem" }}
            >
              <div className="text-center">
                <div className="text-muted small">Duración del sueño</div>
                <div className="fw-bold">{goals.sleep}hs</div>
              </div>

              <div className="text-muted d-none d-md-block">|</div>

              <div className="text-center">
                <div className="text-muted small">Horario para dormir</div>
                <div className="fw-bold">22:00hs</div>
              </div>
            </div>
          )
        }
      />
      <GenericCard
        title="Alimentación"
        icon="food"
        href={"/food"}
        body={
          goals?.food && (
            <div className="px-2">
              <div className="fw-bold">
                Alcanzar una alimentación {foodToLabel[goals.food]}
              </div>
            </div>
          )
        }
      />
      <GenericCard
        title="Horas de estudio"
        icon="study"
        href={"/study"}
        body={
          goals?.study && (
            <div className="px-2">
              <div className="fw-bold">
                Alcanzar {goals.study}hs de estudio semanales
              </div>
            </div>
          )
        }
      ></GenericCard>
    </Container>
  );
}

export default Home;
