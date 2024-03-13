import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from "@src/component/buttons/AddButton";
import ExportButton from "@src/component/buttons/ExportButton";
import { Card, Button } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import MensajesTable from "./MensajesTable";
import AddMessageForm from "./AddMesajeForm";
import { useState } from "react";
const optionsFlatpickr = {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
  //mode: "range",
};
const MensajeriaContent = () => {
  const [state, setState] = useState(false);

  const handleToggle = (params: boolean) => {
    setState(params);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-1">
        <h3>Filtro</h3>
        <Button variant="link">
          Limpiar filtros <FontAwesomeIcon icon={faFilter} />
        </Button>
      </div>
      <div className="card-header-inputs">
        <div className="w-100 row border-bottom ps-1 pe-1 pb-2">
          {/* state select col  */}
          <div className="col-6 col-lg-4">
            <select className="form-select" name="state">
              <option value="" selected disabled>
                Estado{" "}
              </option>
              <option value="1">Activo</option>
              <option value="2">Inactivo</option>
            </select>
          </div>
          {/* type select col  */}
          <div className="col-6 col-lg-4 mt-2 mt-lg-0">
            <select className="form-select" name="type">
              <option value="" selected disabled>
                Tipo de mensaje
              </option>
              <option value="verificacion-automatica">Automatico</option>
              <option value="verificacion-manual">Manual</option>
            </select>
          </div>
          <div className="col-6 col-lg-4">
            <Flatpickr
              id="hf-picker2"
              className="form-control"
              placeholder="Fecha"
              options={optionsFlatpickr}
            />
          </div>
        </div>
        <div className="w-100 row mt-2 border-bottom pb-2 justify-content-between ps-1 pe-1">
          {/* search col  */}
          <div className="col-12 col-lg-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                name="search"
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
          <div className="col-12 col-lg-3 mt-2 mt-lg-0 d-flex justify-content-end ">
            <AddButton
              title="Agregar mensaje"
              handleClick={() => {
                handleToggle(true);
              }}
            />
          </div>
        </div>
      </div>
      <MensajesTable />
      <AddMessageForm state={state} handleToggle={setState} />
    </>
  );
};

export default MensajeriaContent;
