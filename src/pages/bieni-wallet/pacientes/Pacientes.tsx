import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import Flatpickr from "react-flatpickr";
//Component
import PacientesTable from "./components/PacientesTable";
import ExportButton from "@src/component/buttons/ExportButton";
//Hook
import { useDebounce } from "@src/hooks";
//Helpers
import { evaluateSuggestionFilter } from "@src/helpers/helpers";
import { adapterDateTime } from "@src/helpers/adapter";
//Style
import "flatpickr/dist/themes/material_green.css";
//Config
const optionsFlatpickr = {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
  //mode: "range",
};

interface Params {
  date: string | Date;
  from: string | undefined;
  to: string | undefined;
  profile: string;
  verification: string;
  search: string;
}

const initial = {
  date: "",
  from: "",
  to: "",
  profile: "",
  verification: "",
  search: "",
};
const Pacientes = () => {
  //Hook
  const [params, setParams] = useState<Params>(initial);

  const query = useDebounce(params, 2000);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateTime = (date: any) => {
    const [from, to] = date;
    //Formato
    const f = adapterDateTime(from, "yyyy-MM-dd");
    const t = adapterDateTime(to, "yyyy-MM-dd");

    setParams((prev: Params) => ({
      ...prev,
      date: date,
      from: f,
      to: t,
    }));
  };
  return (
    <>
      <Row>
        <Col>
          <h2 className="my-2">
            {" "}
            <span className="text-muted">BieniWallet /</span> Pacientes
          </h2>
          <Card>
            <Card.Header className="d-flex">
              <h3>Filtro</h3>
              {isFiltros > 0 ? (
                <Button variant="link" onClick={handleClear}>
                  Limpiar filtros <FontAwesomeIcon icon={faFilter} />
                </Button>
              ) : null}
            </Card.Header>
            <div className="card-header-inputs">
              <div className="w-100 row mt-2 border-bottom ps-1 pe-1 pb-2">
                {/* search col  */}
                <div className="col-6 col-lg-4">
                  <Flatpickr
                    id="hf-picker2"
                    className="form-control"
                    placeholder="Insertar fecha"
                    value={params.date ?? ""}
                    onChange={(date) => {
                      if (date !== null) {
                        handleDateTime(date);
                      }
                    }}
                    options={optionsFlatpickr}
                  />
                </div>
                {/* perfil select col  */}
                <div className="col-6 col-lg-4">
                  <select
                    className="form-select"
                    value={params.profile}
                    name="profile"
                    onChange={handleChange}
                  >
                    <option value="" selected disabled>
                      Perfil
                    </option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </select>
                </div>
                {/* verificacion select col  */}
                <div className="col-6 col-lg-4 mt-2 mt-lg-0">
                  <select
                    className="form-select"
                    value={params.verification}
                    name="verification"
                    onChange={handleChange}
                  >
                    <option value="" selected disabled>
                      Verificación
                    </option>
                    <option value="verificacion-automatica">Automatico</option>
                    <option value="verificacion-manual">Manual</option>
                  </select>
                </div>
              </div>
              <div className="w-100 row mt-2 justify-content-between ps-1 pe-1">
                {/* search col  */}
                <div className="col-12 col-lg-4">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar por nombre o cedula..."
                      value={params.search}
                      name="search"
                      onChange={handleChange}
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
            <Card.Body>
              <PacientesTable params={params} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Pacientes;
