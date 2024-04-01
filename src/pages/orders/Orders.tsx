import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import Flatpickr from "react-flatpickr";
//Component
import OrdersTable from "./components/OrdersTable";
import ExportButton from "@src/component/buttons/ExportButton";
//Hook
import { useDebounce } from "@src/hooks";
//Helper
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
  company_name: string;
  filter: string;
}

const initial = {
  company_name: "ChileTopia",
  filter: "",
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
          <h2 className="mt-3">
            <span className="">Pedidos </span>
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
                    onChange={(date) => {
                      if (date !== null) {
                        handleDateTime(date);
                      }
                    }}
                    options={optionsFlatpickr}
                  />
                </div>
                <div className="col-6 col-lg-4">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar..."
                      name="filter"
                      onChange={handleChange}
                      value={params.filter}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
                {/* add button col  */}
                <div className="col-12 col-lg-2 mt-2 mt-lg-0 d-flex justify-content-end ">
                  <ExportButton />
                </div>
              </div>
            </div>
            <OrdersTable params={params} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Pacientes;
