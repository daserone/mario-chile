import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { TableColumn } from "react-data-table-component";
//Component
import { WrapperDataTable } from "@component/wrapper";
import { Barra } from "../component";
interface DataRow {
  nombre: string;
  documento: string;
  edad: string | number;
  registro: string;
  imagen: string;
}
const Manual = () => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [selecion, setSelecion] = useState<DataRow | null>(null);
  const columns: TableColumn<DataRow>[] = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
    },
    {
      name: "Documento",
      selector: (row) => row.documento,
    },
    {
      name: "Edad",
      selector: (row) => row.edad,
    },
    {
      name: "Registro",
      selector: (row) => row.edad,
      cell: (row) => (
        <div>
          {row.registro ? (
            <span className="active-badge">Activo</span>
          ) : (
            <span className="inactive-badge">Inactivo</span>
          )}
        </div>
      ),
    },
  ];

  const data: DataRow[] = [
    {
      nombre: "Juan",
      documento: "19-483-044",
      edad: 1,
      registro: "20-10-2021",
      imagen: "",
    },
    {
      nombre: "maria",
      documento: "19-483-045",
      edad: 1,
      registro: "20-10-2021",
      imagen: "",
    },
    {
      nombre: "carla",
      documento: "19-483-035",
      edad: 1,
      registro: "20-10-2021",
      imagen: "",
    },
  ];

  return (
    <>
      <div>
        <Barra texto={search} setTexto={setSearch} />
      </div>
      <div className="">
        <Row>
          <Col xs={8} md={8} lg={8}>
            <WrapperDataTable
              title=""
              columns={columns}
              load={false}
              error={false}
              data={data}
              recordsTotals={1}
              countPerPage={countPerPage}
              setCountPerPage={setCountPerPage}
              page={page}
              setPage={setPage}
              handleClick={(data) => {
                setSelecion(data);
              }}
              handleDoubleClick={() => {}}
              isExpandable={false}
            />
          </Col>
          <Col xs={4} md={4} lg={4}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              {selecion?.imagen === "" ? (
                <div className="m-4">Seleccione un paciente para validar</div>
              ) : (
                <img></img>
              )}
              {selecion !== null ? (
                <div>
                  <Dropdown as={ButtonGroup}>
                    <Button variant="danger">Denegar</Button>
                    <Dropdown.Toggle
                      split
                      variant="danger"
                      id="dropdown-split-basic"
                    />
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button variant="success" className="ms-1" size="lg">
                    Aprobar
                  </Button>
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Manual;
