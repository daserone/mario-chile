import { Col, Row } from "react-bootstrap";
import DetailBox from "./DetailBox";
import { difusionCard } from "../../disusion/components/DifusionList";

const alcanceList = [
  {
    id: 1,
    title: "Todos",
  },
  {
    id: 2,
    title: "hasta los 2 años",
  },
  {
    id: 3,
    title: "18 hasta los 35 años",
  },
];

const InformacionContent = (props: { difusion: difusionCard }) => {
  const { difusion } = props;
  return (
    <Col sm={12}>
      <Row>
        <Col sm={12} md={6}>
          <DetailBox title="Nombre">
            <span className="title">{difusion.title}</span>
          </DetailBox>
        </Col>
        {/* total users  */}
        <Col sm={12} md={6}>
          <DetailBox title="Usuarios totales">
            <span className="title">1.934 Usuarios</span>
          </DetailBox>
        </Col>
        {/* descripcion  */}
        <Col sm={12} md={6}>
          <DetailBox title="Descripción">
            <span className="title">{difusion.description}</span>
          </DetailBox>
        </Col>
        {/* alcance  */}
        <Col sm={12} md={6}>
          <DetailBox title="Alcance">
            <div className="d-flex flex-row flex-wrap gap-1">
              {alcanceList.map((alcance) => (
                <span className="main-badge">{alcance.title}</span>
              ))}
            </div>
          </DetailBox>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <UserTable
          idPaciente={entity.idpaciente}
          idUsuario={entity.idusuario}
        /> */}
        </Col>
      </Row>
    </Col>
  );
};

export default InformacionContent;
