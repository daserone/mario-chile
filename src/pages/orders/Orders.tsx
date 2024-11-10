import { useEffect, useState } from "react";
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
import { adapterDateTime, formatDate } from "@src/helpers/adapter";
//Style
import "flatpickr/dist/themes/material_green.css";
import OrderDetailModal from "./components/OrderDetailsModal";
import { ItemShopify } from "@src/models/orders.model";
import useCompanies from "@src/hooks/useCompanies";
import ModalDistricts from "./components/ModalAssignDistrict";
import { assignDistrict } from "@src/services/orders.service";
import { useQueryClient } from "@tanstack/react-query";
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
  company_name: "",
  filter: "",
};
const Orders = () => {
  //Hook
  const [params, setParams] = useState<Params>(initial);
  const [selection, setSelection] = useState<ItemShopify | null>(null);
  const [state, setState] = useState<boolean>(false);

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
    const f = formatDate(from, "yyyy-MM-dd");
    const t = formatDate(to, "yyyy-MM-dd");

    setParams((prev: Params) => ({
      ...prev,
      date: date,
      from: f,
      to: t,
    }));
  };
  const { company } = useCompanies();

  useEffect(() => {
    if (company.name !== "") {
      setParams((prev: Params) => ({
        ...prev,
        company_name: company.name,
      }));
    }
  }, [company]);

  const [modalAssignDistrict, setModalAssignDistrict] =
    useState<boolean>(false);

  const [selectedOrder, setSelectedOrder] = useState<ItemShopify | null>(null);
  const queryClient = useQueryClient();

  const handleAssignDistrict = (districtId: string) => {
    assignDistrict({
      order_id: selectedOrder?.id ?? "",
      district_id: districtId,
    }).then((data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["orders", 1, params],
      });
    });
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
              <div className="w-100 row mt-2  mb-2 ps-1 pe-1">
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
                <div className="col-12 col-lg-4 mt-2 mt-lg-0 d-flex justify-content-end ">
                  <ExportButton />
                </div>
              </div>
            </div>
            <OrdersTable
              params={params}
              setSelection={setSelection}
              handleToggle={setState}
              openModalAssignDistrict={(order) => {
                setSelectedOrder(order);
                setModalAssignDistrict(true);
              }}
            />
          </Card>
        </Col>
      </Row>
      <OrderDetailModal
        state={state}
        handleToggle={setState}
        selection={selection}
        setSelection={setSelection}
      />
      <ModalDistricts
        isOpen={modalAssignDistrict}
        handleClose={() => setModalAssignDistrict(false)}
        provinceId={selectedOrder?.province?.id ?? ""}
        cityId={selectedOrder?.city?.id ?? ""}
        saveDistrict={(districtId: string) => {
          handleAssignDistrict(districtId);
        }}
      />
    </>
  );
};

export default Orders;
