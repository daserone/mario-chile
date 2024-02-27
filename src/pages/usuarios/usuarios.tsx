import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
//Component
import { WrapperDataTable } from "@component/wrapper";
//Service
import { usuarios } from "@services/usuario.service";
//Style
import "./Usuarios.scss";

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
    queryFn: () => usuarios({ page }),
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
                <div className="col-6 col-lg-4">
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

                <div className="col-6 col-lg-4">
                  <select className="form-select">
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </select>
                </div>

                <div className="col-6 col-lg-2">
                  <button className="btn btn-secondary">Exportar</button>
                </div>

                <div className="col-6 col-lg-2">
                  <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Agregar usuario
                  </button>
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
