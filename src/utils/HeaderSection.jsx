import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../constants/colors";

const HeaderSection = ({
  title,
  onClickButton,
  btnTitle = "Agregar Datos",
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/home");
  };

  const handleModal = () => {
    if (onClickButton) {
      onClickButton();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
          }}
          onClick={goBack}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ color: COLORS.MAIN, height: "5vh", cursor: "pointer" }}
          />
        </Button>

        <Button
          onClick={handleModal}
          style={{
            color: COLORS.MAIN,
            background: "transparent",
            border: "none",
            fontWeight: "bold",
          }}
        >
          {btnTitle}
        </Button>
      </div>

      <h3 style={{ textAlign: "center", margin: 0 }}>{title}</h3>
    </div>
  );
};

export default HeaderSection;
