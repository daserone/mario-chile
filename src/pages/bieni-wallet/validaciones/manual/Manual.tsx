import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { TableColumn } from "react-data-table-component";
//Component
import { WrapperDataTable } from "@src/component/wrapper";
import { Barra } from "../component";
import iconEmail from "@src/assets/icons/email-table.svg";
import defaulImage from "@src/assets/images/defaul-validation.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "../Validaciones.scss";

const CustomToggle = React.forwardRef(
  (
    {
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick: React.MouseEventHandler<HTMLButtonElement>;
    },
    ref
  ) => (
    <Button variant="danger" size="sm" onClick={onClick}>
      <FontAwesomeIcon icon={faThumbsDown} className="me-1" /> Denegar
      {children}
    </Button>
  )
);
interface DataRow {
  name: string;
  document: string;
  age: string | number;
  registerDate: string;
  image: string;
}
const Manual = () => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [selecion, setSelecion] = useState<DataRow | null>(null);
  const columns: TableColumn<DataRow>[] = [
    {
      name: "NOMBRE",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="email-badge me-1  ">
            <img src={iconEmail} alt="email" className="" />
          </div>
          {row.name}
        </div>
      ),
    },
    {
      name: "DOCUMENTO",
      selector: (row) => row.document,
      cell: (row) => (
        <div className="d-flex flex-column align-items-center">
          {row.document}
          <span className="text-muted">Cédula</span>
        </div>
      ),
    },
    {
      name: "EDAD",
      selector: (row) => row.age,
      cell: (row) => (
        <div className="d-flex flex-column align-items-center">
          {row.age}
          <span className="text-muted">20/05/2001</span>
        </div>
      ),
    },
    {
      name: "REGISTRO",
      selector: (row) => row.registerDate,
      cell: (row) => (
        <div className="d-flex flex-column align-items-center">
          {row.registerDate}
          <span className="text-muted">12:00:00</span>
        </div>
      ),
    },
  ];

  const data: DataRow[] = [
    {
      name: "Juan Perez",
      document: "123456789",
      age: 25,
      registerDate: "2021-08-18",
      image: defaulImage,
    },
    {
      name: "Maria Lopez",
      document: "987654321",
      age: 30,
      registerDate: "2021-08-18",
      image: "",
    },
  ];

  return (
    <>
      <div className="px-2 border-bottom ">
        <h3>Filtro</h3>
      </div>
      <Row>
        <Col xs={12}>
          <Barra texto={search} setTexto={setSearch} />
        </Col>
      </Row>
      <div className="">
        <Row>
          <Col xs={12} md={12} lg={8} className="border-top">
            <WrapperDataTable
              title=""
              columns={columns}
              isLoading={false}
              isError={false}
              data={data ?? []}
              recordsTotals={0}
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
          <Col
            xs={12}
            md={12}
            lg={4}
            className="border-start border-top ps-lg-0"
          >
            <div className="image-container">
              <div className="image">
                {selecion?.image === "" ? (
                  <div className="d-flex justify-content-center p-5">
                    Sin imagen
                  </div>
                ) : (
                  <img src={selecion?.image}></img>
                )}
              </div>
              {selecion !== null ? (
                <div className="d-flex flex-row justify-content-around border-top py-2 w-100">
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} />

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
                  <Button variant="success" className="ms-1" size="sm">
                    <FontAwesomeIcon icon={faThumbsUp} className="me-1" />
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
