import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HeaderSection = ({ title, buttonTitle, hrefButton, onClickButton }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/home");
  };

  const redirectButton = () => {
    if (hrefButton) {
      navigate(hrefButton);
    }
    if (onClickButton) {
      onClickButton();
    }
  };
  
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <Button
        style={{
          color: "transparent",
          background: "transparent",
          border: "none",
        }}
        onClick={goBack}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ color: "#a5b48e", height: "5vh", cursor: "pointer" }}
        />
      </Button>

      <h3>{title}</h3>

      <Button
        onClick={redirectButton}
        style={{
          color: "#a5b48e",
          background: "transparent",
          border: "none",
        }}
      >
        {buttonTitle}
      </Button>
    </Container>
  );
};

export default HeaderSection;
