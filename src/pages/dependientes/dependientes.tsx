import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
} from "react-bootstrap";

const Dependientes = () => {
  return (
    <>
      <Row>
        <Col xs={6} md={6} className="mb-1">
          <Card className="p-1">
            <div className="d-flex justify-content-between">
              <div>
                <p>Total de usuarios</p>
                <b></b>
                <p>Usuarios totales</p>
              </div>
              <div>
                <img src="" alt="user" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={6} md={6} className="mb-1">
          <Card className="p-1">
            <div className="d-flex justify-content-between">
              <div>
                <p>Usuarios activos</p>
                <>0</>
                <p>Semana pasada</p>
              </div>
              <div>
                <img src="" alt="userCheck" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle></CardTitle>
              <div className="w-100 row mt-2">
                <div className="col-4"></div>
                <div className="col-4"></div>
                <div className="col-4"></div>
              </div>
              <div className="row w-100 mt-2">
                <div className="col-12 d-flex justify-content-end">
                  <div className="me-2">
                    <Button size="sm" color="secondary" className="mx-3">
                      <span className="align-middle">Exportar</span>
                    </Button>
                  </div>
                  <div className="ms-4">
                    <Button size="sm" color="primary">
                      <span className="align-middle">Agregar usuario</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dependientes;
