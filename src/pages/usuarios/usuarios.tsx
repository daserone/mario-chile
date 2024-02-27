import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card } from "react-bootstrap";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { TableColumn } from "react-data-table-component";
import { WrapperDataTable } from "@src/component/wrapper";
import ExportButton from "@src/component/buttons/ExportButton";
import AddButton from "@src/component/buttons/AddButton";
//Service
import { getUsuarios } from "@services/usuario.service";
//Style
import "./Usuarios.scss";
//import UsuariosTable from "./components/UsuariosTable";
//Component
interface DataRow {
  nombre: string;
  correo: string;
  estado: string;
}
const Usuarios = () => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  //Solicitud
  const { data, isError, isLoading } = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => getUsuarios({ page }),
    placeholderData: keepPreviousData,
  });
  //Column
  const columns: TableColumn<DataRow>[] = [
    {
      name: "USUARIO",
      selector: (row) => row.nombre,
    },
    {
      name: "CORREO",
      selector: (row) => row.correo,
    },
    {
      name: "ESTADO",
      selector: (row) => row.estado,
      cell: (row) => (
        <div>
          {row.estado === "activo" ? (
            <span className="active-badge">Activo</span>
          ) : (
            <span className="inactive-badge">Inactivo</span>
          )}
        </div>
      ),
    },
  ];

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
            <WrapperDataTable
              title=""
              columns={columns}
              isLoading={isLoading}
              isError={isError}
              data={data?.data ?? []}
              recordsTotals={data?.recordsTotals ?? 0}
              countPerPage={countPerPage}
              setCountPerPage={setCountPerPage}
              page={page}
              setPage={setPage}
              handleClick={() => {}}
              handleDoubleClick={() => {}}
              isExpandable={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Usuarios;
