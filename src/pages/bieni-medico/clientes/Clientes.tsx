import { useState } from "react";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Button } from "react-bootstrap";
//Hook
import { useToggle, useDebounce } from "@src/hooks";
//Helpers
import { evaluateSuggestionFilter } from "@src/helpers/helpers";
//Component
import ExportButton from "@src/component/buttons/ExportButton";
import AddButton from "@src/component/buttons/AddButton";

//Style
import "./Clientes.scss";
import TableClients from "./components/TableClients";

interface Params {
  state: string;
  search: string;
}

const initial = { state: "", search: "" };

const Clientes = () => {
  //Hook
  const [params, setParams] = useState<Params>(initial);

  const query = useDebounce(params, 2000);

  const { state, toggle } = useToggle(false);
  //Handle
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setParams((prev: Params) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClear = () => {
    setParams(initial);
  };
  //Helpers
  const isFiltros = evaluateSuggestionFilter(query);

  return (
    <>
      <h2 className="my-2">
        <span className="text-muted">BieniMedico /</span> Clientes
      </h2>{" "}
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex">
              <h3>Filtro</h3>
              {isFiltros > 0 ? (
                <Button variant="link" onClick={handleClear}>
                  Limpiar filtros <FontAwesomeIcon icon={faFilter} />
                </Button>
              ) : null}
            </Card.Header>
            <div className="card-header-inputs ">
              {/* first row  */}
              <div className="w-100 row m-0  ps-1 pe-1 border-top border-bottom py-1">
                {/* plan select col  */}
                <div className="col-12 col-lg-6 mb-2 mb-lg-0">
                  <select
                    className="form-select"
                    name="state"
                    value={params.state || ""}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar plan...</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                {/* state select col  */}
                <div className="col-12 col-lg-6">
                  <select
                    className="form-select"
                    name="state"
                    value={params.state || ""}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar estado...</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              {/* second row  */}
              <div className="w-100 m-0 row  ps-1 pe-1 border-top border-bottom py-1">
                {/* search col  */}
                <div className="col-12 col-lg-6">
                  {/* search input  */}
                  <div className="input-group">
                    <input
                      type="text"
                      name="search"
                      className="form-control"
                      placeholder="Buscar usuario..."
                      value={params.search || ""}
                      onChange={handleChange}
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

                {/* export and add button col  */}
                <div className="col-12 col-lg-6 d-flex gap-2 justify-content-around mt-2 mt-lg-0">
                  <ExportButton />
                  <AddButton title="Agregar usuario" handleClick={toggle} />
                </div>
              </div>
            </div>
            {/* <Card.Body></Card.Body> */}
            <TableClients params={query} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Clientes;
