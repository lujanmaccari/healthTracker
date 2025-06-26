import styled from "styled-components";

const StyledLabel = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const SelectedLabel = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #a5b48e;
`;

const RangeInput = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #d1e8bf, #aecda3);
  outline: none;
  -webkit-appearance: none;
`;

const AddMood = ({ mood, setMood }) => {
  const moodToLabel = ["Muy Mal", "Mal", "Regular", "Bien", "Muy Bien"];

  return (
    <div style={{ width: "100%", marginBottom: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <span style={{ color: "#666" }}>¿Cómo te has sentido hoy?</span>
      </div>

      <div style={{ width: "100%", margin: "1.5rem 0" }}>
        <RangeInput
          type="range"
          min="0"
          max="4"
          value={mood}
          onChange={(e) => setMood(parseInt(e.target.value))}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.5rem",
          }}
        >
          <StyledLabel>{moodToLabel[0]}</StyledLabel>
          <StyledLabel>{moodToLabel[4]}</StyledLabel>
        </div>
      </div>

      <SelectedLabel>{moodToLabel[mood]}</SelectedLabel>
    </div>
  );
};

export default AddMood;
