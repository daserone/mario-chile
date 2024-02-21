import { Card, Col, Row } from "react-bootstrap";
import "./Pacientes.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

const Pacientes = () => {
  return (
    <>
      <Row>
        <Col>
          <h2 className="my-2">BieniWallet/Pacientes</h2>
          <Card>
            <Card.Header>
              <h3>Filtro</h3>
            </Card.Header>
            <div className="card-header-inputs">
              {/* TODO: 4 columns with 2 inputs and 2 buttons, one for export and one for add, inputs are for search and state select  */}
              <div className="w-100 row mt-2">
                {/* search col  */}
                <div className="col-6 col-lg-4">
                  {/* search input  */}
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar usuario..."
                    />
                    <button className="btn btn-outline-secondary" type="button">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
                {/* state select col  */}
                <div className="col-6 col-lg-4">
                  {/* state select input  */}
                  <select className="form-select">
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </select>
                </div>
                {/* export button col  */}
                <div className="col-6 col-lg-2">
                  <button className="btn btn-secondary">Exportar</button>
                </div>
                {/* add button col  */}
                <div className="col-6 col-lg-2">
                  <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Agregar usuario
                  </button>
                </div>
              </div>
            </div>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Pacientes;
