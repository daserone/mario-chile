import { Card, Col, Row } from "react-bootstrap";
import "./Pacientes.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import exportIcon from "../../../assets/icons/share-screen.svg";
import PacientesTable from "./components/PacientesTable";
import ExportButton from "@src/component/buttons/ExportButton";

const Pacientes = () => {
  return (
    <>
      <Row>
        <Col>
          <h2 className="my-2">
            {" "}
            <span className="text-muted">BieniWallet /</span> Pacientes
          </h2>
          <Card>
            <Card.Header>
              <h3>Filtro</h3>
            </Card.Header>
            <div className="card-header-inputs">
              {/* TODO: 4 columns with 2 inputs and 2 buttons, one for export and one for add, inputs are for search and state select  */}
              <div className="w-100 row mt-2 border-bottom pb-2">
                {/* search col  */}
                <div className="col-6 col-lg-4">
                  {/* fecha registro select  */}
                  <select className="form-select">
                    {/* //fecha de registro default option */}
                    <option value="0" selected disabled>
                      Fecha de registro
                    </option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </select>
                </div>
                {/* perfil select col  */}
                <div className="col-6 col-lg-4">
                  {/* perfil select input  */}
                  <select className="form-select">
                    {/* perfil default option */}
                    <option value="0" selected disabled>
                      Perfil
                    </option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </select>
                </div>
                {/* verificacion select col  */}
                <div className="col-6 col-lg-4 mt-2 mt-lg-0">
                  {/* verificacion select input  */}
                  <select className="form-select">
                    {/* verificacion default option */}
                    <option value="0" selected disabled>
                      Verificación
                    </option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="w-100 row mt-2 justify-content-between">
                {/* search col  */}
                <div className="col-12 col-lg-4">
                  {/* search input  */}
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar por nombre o cedula..."
                    />
                    <button className="btn btn-outline-secondary" type="button">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
                {/* add button col  */}
                <div className="col-12 col-lg-3 mt-2 mt-lg-0 d-flex justify-content-end ">
                  <ExportButton />
                </div>
              </div>
            </div>
            <PacientesTable />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Pacientes;
