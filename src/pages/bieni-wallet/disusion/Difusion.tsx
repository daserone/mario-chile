import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from "@src/component/buttons/AddButton";
import ExportButton from "@src/component/buttons/ExportButton";
import { Row, Col, Card } from "react-bootstrap";
import "./Difusion.scss";
import DifusionList from "./components/DifusionList";

const Difusion = () => {
  return (
    <>
      <Row>
        <Col>
          <h2 className="my-2">
            {" "}
            <span className="text-muted">BieniWallet / </span> Difusión
          </h2>
          <Card>
            <Card.Header className="border-bottom">Filtro</Card.Header>
            <div className="card-header-inputs ">
              <div className="w-100 row mt-2 mb-2 ps-1 pe-1">
                {/* search col  */}
                <div className="col-12 col-lg-4 ">
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
                {/* state select col  */}
                <div className="col-12 col-lg-3 mt-2 mt-lg-0">
                  {/* state select input  */}
                  <select name="state" className="form-select">
                    <option value="" disabled selected hidden>
                      Estado
                    </option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
                {/* export and add button col  */}
                <div className="col-12 col-lg-5 d-flex gap-2 justify-content-between mt-2 mt-lg-0">
                  <ExportButton />
                  <AddButton title="Agregar difusion" handleClick={() => {}} />
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

export default Difusion;
