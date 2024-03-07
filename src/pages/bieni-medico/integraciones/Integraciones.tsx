import { faList, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from "@src/component/buttons/AddButton";
import ExportButton from "@src/component/buttons/ExportButton";
import { Row, Col, Card, Button } from "react-bootstrap";
import "./Integraciones.scss";
import DifusionList from "./components/IntegracionList";
import { useToggle } from "@src/hooks";

const Integraciones = () => {
  const { state, toggle } = useToggle(false);

  return (
    <>
      <Row>
        <Col>
          <h2 className="my-2">
            {" "}
            <span className="text-muted">BieniMedico / </span> Integraciones
          </h2>
          <Card>
            <Card.Header className="border-bottom">Filtro</Card.Header>
            <div className="card-header-inputs">
              <div className="w-100 row mt-2 mb-2 ps-1 pe-1">
                {/* search col  */}
                <div className="col-12 col-lg-6">
                  <div className="row m-0">
                    <div className="col-12 col-lg-8">
                      {/* search input  */}
                      <div className="input-group">
                        <input
                          type="text"
                          name="search"
                          className="form-control"
                          placeholder="Buscar centro..."
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          disabled
                        >
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4 mt-2 mt-lg-0 d-flex flex-row">
                      <AddButton title="Agregar area" handleClick={toggle} />

                      <div className="d-flex d-lg-none ms-1 gap-1">
                        <Button>
                          <FontAwesomeIcon icon={faList} />
                        </Button>
                        <Button variant="secondary" className="border-0">
                          <FontAwesomeIcon icon={faList} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* export and add button col  */}
                <div className="col-12 col-lg-6 d-lg-flex flex-row gap-2 justify-content-end mt-2 mt-lg-0 d-none">
                  <Button>
                    <FontAwesomeIcon icon={faList} />
                  </Button>
                  <Button variant="secondary" className="border-0">
                    <FontAwesomeIcon icon={faList} />
                  </Button>{" "}
                </div>
              </div>
            </div>
            <Card.Body>
              <DifusionList />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Integraciones;
