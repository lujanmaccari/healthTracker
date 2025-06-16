import {
    Container,
    Row,
    Col,
    Button
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HeaderSection from "../../utils/HeaderSection";
import GenericCard from "../../utils/GenericCard";
import {
    faBed,
    faClock,
    faStopwatch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";

const SleepView = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    sleep: Yup
        .number()
        .required("Requerido")
        .min(0, "Debe ser mayor o igual a 0")
        .max(24, "Debe ser menor o igual a 24")
        .positive("Debe ser positivo"),
    wake: Yup
        .number()
        .required("Requerido")
        .min(0, "Debe ser mayor o igual a 0")
        .max(24, "Debe ser menor o igual a 24")
        .positive("Debe ser positivo")
  })

  return (
    <Container>
        <HeaderSection
        title="Sueño"
        buttonTitle="Agregar horas"
        hrefButton="#"
        />
        
        <Container>
            <Formik>
            <Form>
                <Row style={{height: "10vh"}}>
                    <Col xs style={{display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center"}}>
                        <FontAwesomeIcon style={{fontSize: "2.5em", color: "#a5b48e"}} icon={faBed}/>
                        <Field
                            name="sleep"
                            type="number"
                            placeholder=""
                            style={{width: "15vw"}}
                        />
                        <ErrorMessage name="sleep" component="div" className="text-danger small"/>
                    </Col>
                    <Col xs style={{display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center"}}>
                        <FontAwesomeIcon style={{fontSize: "2.5em", color: "#a5b48e"}} icon={faStopwatch}/>
                        <Field
                            name="sleep"
                            type="number"
                            placeholder=""
                            style={{width: "15vw"}}
                        />
                        <ErrorMessage name="sleep" component="div" className="text-danger small"/>
                    </Col>
                </Row>
            
            
            <Row style={{height: "30vh", marginTop: "3rem", display: "flex", justifyContent: "space-evenly"}}>
                <FontAwesomeIcon style={{fontSize: "8em", padding: 0, color: "#a5b48e"}} icon={faClock}/>
                <div>8hs</div>
                <div>Este horario cumple con tu objetivo de sueño</div>
            </Row>

            <Button
              type="submit"
              style={{
                backgroundColor: "#a5b48e",
                fontSize: "1.5rem",
                border: "none",
                width: "30vw"
              }}
            >Calcular
            </Button>
            </Form>
            </Formik>
        </Container>
    </Container>
  );
};

export default SleepView;