import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@src/@core/component/layouts/layoutWrapper/Avatar";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./PacienteDetail.scss";
import DetailBox from "./components/DetailBox";
import { UserTable } from "./components/UserTable";

const PacienteDetail = () => {
  const { id } = useParams();
  return (
    <>
      <Row>
        <Col>
          <h2 className="my-2">
            {" "}
            <span className="text-muted">BieniWallet / Paciente / </span> {id}
          </h2>
          <Card>
            <Card.Header className="border-bottom">
              <div className="d-flex flex-row align-items-center">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="me-1 text-secondary"
                />{" "}
                <h1>{id}</h1>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="mt-1">
                <Col sm={12} md={2}>
                  <h4>Datos personales</h4>
                  <div className="ms-1">
                    {" "}
                    <Avatar size="xxl" />
                  </div>
                </Col>

                <Col sm={12} md={10}>
                  <Row>
                    <Col sm={12} md={6}>
                      <DetailBox title="John Doe" subtitle="Nombre" />
                    </Col>
                    <Col sm={12} md={6}>
                      <DetailBox title="XDD205086" subtitle="Documento" />
                    </Col>
                    <Col sm={12} md={6}>
                      <DetailBox
                        subtitle="Tipo de perfil"
                        perfilType="principal"
                      />
                    </Col>
                    <Col sm={12} md={6}>
                      <DetailBox
                        subtitle="Tipo de verificación"
                        verificationType="automatic"
                      />
                    </Col>
                    <Col sm={12} md={6}>
                      <DetailBox subtitle="Estado" state="active" />
                    </Col>
                    <Col sm={12} md={6}>
                      <DetailBox
                        age="35"
                        subtitle="Fecha de nacimiento"
                        birthdate="20/05/2001"
                      />
                    </Col>
                    <Col sm={12} md={6}>
                      <DetailBox
                        registerDate="20/05/2021, 13:34:00"
                        subtitle="Registro"
                      />
                    </Col>
                    <Col sm={12} md={6}>
                      <DetailBox
                        email="correo@gmail.com"
                        subtitle="Correo electrónico"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <UserTable />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PacienteDetail;
