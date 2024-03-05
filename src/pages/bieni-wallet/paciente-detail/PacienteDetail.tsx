import { useMemo } from "react";
import { Card, Col, Row, Button, Placeholder, Alert } from "react-bootstrap";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
//Models
import { DataRowPacientes } from "@models/paciente.model";
//Service
import { getPaciente } from "@services/paciente.service";
//Component
import { Avatar } from "@src/@core/component/layouts/layoutWrapper/Avatar";
import DetailBox from "./components/DetailBox";
import { UserTable } from "./components/UserTable";
//Style
import "./PacienteDetail.scss";

interface DataRow extends DataRowPacientes {
  profileImage: string;
}

const PacienteDetail = () => {
  const { id } = useParams();
  const history = useNavigate();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["paciente", id],
    queryFn: () => getPaciente({ idpaciente: id }),
    refetchOnWindowFocus: false,
  });

  const entity: DataRow = useMemo(() => {
    const initial = {
      idusuario: 0,
      idpaciente: 0,
      document: "",
      documentType: "",
      name: "",
      age: "",
      birthdate: "",
      phone: "",
      profileType: "",
      verification: "verificacion-automatica",
      registrationDate: "",
      profileImage: "",
    };
    //Sin registros
    if (data && data.recordsTotals === 0) {
      return initial;
    }

    return data?.data ?? initial;
  }, [data]);

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
                <Button
                  variant="link"
                  onClick={() => {
                    history(-1);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="me-1 text-secondary"
                  />
                </Button>
                <h1>{id}</h1>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="mt-1">
                <Col sm={12} md={2}>
                  <h4>Datos personales</h4>
                  <div className="ms-1">
                    {" "}
                    <Avatar size="xxl" img={entity.profileImage} />
                  </div>
                </Col>

                {isError ? (
                  <Col sm={12} md={10}>
                    <Alert variant="danger" className="p-2 m-2">
                      Estamos presentando problemas al procesar tu solicitud.
                    </Alert>
                  </Col>
                ) : (
                  <Col sm={12} md={10}>
                    <Row>
                      <Col sm={12} md={6}>
                        {isLoading ? (
                          <Placeholder xs={6} />
                        ) : (
                          <DetailBox title={entity.name} subtitle="Nombre" />
                        )}
                      </Col>
                      <Col sm={12} md={6}>
                        {isLoading ? (
                          <Placeholder xs={6} />
                        ) : (
                          <DetailBox
                            title={entity.document}
                            subtitle="Documento"
                          />
                        )}
                      </Col>
                      <Col sm={12} md={6}>
                        {isLoading ? (
                          <Placeholder xs={6} />
                        ) : (
                          <DetailBox
                            subtitle="Tipo de perfil"
                            profileType={entity.profileType}
                          />
                        )}
                      </Col>
                      <Col sm={12} md={6}>
                        {isLoading ? (
                          <Placeholder xs={6} />
                        ) : (
                          <DetailBox
                            subtitle="Tipo de verificación"
                            verification={entity.verification}
                          />
                        )}
                      </Col>
                      <Col sm={12} md={6}>
                        {isLoading ? (
                          <Placeholder xs={6} />
                        ) : (
                          <DetailBox subtitle="Estado" state="active" />
                        )}
                      </Col>
                      <Col sm={12} md={6}>
                        {isLoading ? (
                          <Placeholder xs={6} />
                        ) : (
                          <DetailBox
                            subtitle="Fecha de nacimiento"
                            age={entity.age}
                            birthdate={entity.birthdate}
                          />
                        )}
                      </Col>
                      <Col sm={12} md={6}>
                        {isLoading ? (
                          <Placeholder xs={6} />
                        ) : (
                          <DetailBox
                            subtitle="Registro"
                            registerDate={entity.registrationDate}
                          />
                        )}
                      </Col>
                      <Col sm={12} md={6}>
                        {isLoading ? (
                          <Placeholder xs={6} />
                        ) : (
                          <DetailBox
                            subtitle="Correo electrónico"
                            email={entity.email}
                          />
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <UserTable
                          idPaciente={entity.idpaciente}
                          idUsuario={entity.idusuario}
                        />
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PacienteDetail;
