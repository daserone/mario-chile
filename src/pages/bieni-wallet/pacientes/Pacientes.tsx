import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
//Component
import { WrapperDataTable } from "@component/wrapper";
//Service
import { getPacientes } from "@services/paciente.service";
//Style
import "./Pacientes.scss";

interface DataRow {
  idusuario: string | number;
  idpaciente: string | number;
  documento: string;
  nombre: string;
  edad: string;
  fechaNacimiento: string;
  perfil: string;
  tipoDocumento: string;
  telefono: string;
  registrado: string;
}
const Pacientes = () => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  //Solicitud
  const { data, isError, isLoading } = useQuery({
    queryKey: ["pacientes", page],
    queryFn: () => getPacientes({ page }),
    placeholderData: keepPreviousData,
  });
  //Column
  const columns: TableColumn<DataRow>[] = [
    {
      name: "NOMBRE",
      selector: (row) => row.nombre,
    },
    {
      name: "DOCUMENTO",
      selector: (row) => row.documento,
      cell: (row) => (
        <div className="d-flex flex-column align-items-center">
          <div>{row.documento}</div>
          <div>{row.tipoDocumento}</div>
        </div>
      ),
    },
    {
      name: "EDAD",
      selector: (row) => row.edad,
      cell: (row) => (
        <div className="d-flex flex-column align-items-center">
          <div>{row.edad}</div>
          <div>{row.fechaNacimiento}</div>
        </div>
      ),
    },
    {
      name: "REGISTRO",
      selector: (row) => row.registrado,
    },
    {
      name: "PERFIL",
      selector: (row) => row.perfil,
    },
  ];

  return (
    <>
      <Row>
        <Col>
          <h2 className="my-2">BieniWallet/Pacientes</h2>
          <Card>
            <Card.Header>
              <h3>Filtro</h3>
            </Card.Header>
            <div className="card-header-inputs">
              <div className="w-100 row mt-2">
                {/* search col  */}
                <div className="col-6 col-lg-4">
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
                <div className="col-6 col-lg-4">
                  {/* state select input  */}
                  <select className="form-select">
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </select>
                </div>
                {/* export button col  */}
                <div className="col-6 col-lg-2">
                  <button className="btn btn-secondary">Exportar</button>
                </div>
                {/* add button col  */}
                <div className="col-6 col-lg-2">
                  <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Agregar usuario
                  </button>
                </div>
              </div>
            </div>
            <Card.Body>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Pacientes;
