import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card } from "react-bootstrap";
import UsuariosTable from "./components/UsuariosTable";
import "./Usuarios.scss";
import ExportButton from "@src/component/buttons/ExportButton";
import AddButton from "@src/component/buttons/AddButton";
//import { ContentVerticalLayout, WrapperLayout } from "@core/component/layouts";
const Usuarios = () => {
  return (
    <>
      <h2 className="my-2">Usuarios</h2>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h3>Filtro</h3>
            </Card.Header>
            <div className="card-header-inputs ">
              {/* TODO: 4 columns with 2 inputs and 2 buttons, one for export and one for add, inputs are for search and state select  */}
              <div className="w-100 row mt-2 mb-2">
                {/* search col  */}
                <div className="col-12 col-lg-4">
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
                <div className="col-12 col-lg-3 mt-2 mt-lg-0">
                  {/* state select input  */}
                  <select className="form-select">
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </select>
                </div>
                {/* export and add button col  */}
                <div className="col-12 col-lg-5 d-flex gap-2 justify-content-between mt-2 mt-lg-0">
                  <ExportButton />
                  <AddButton
                    title="Agregar usuario"
                    handleClick={() => {
                      console.log("add button clicked");
                    }}
                  />
                </div>
              </div>
            </div>

            <UsuariosTable />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Usuarios;
