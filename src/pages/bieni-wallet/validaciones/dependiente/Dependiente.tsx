import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { TableColumn } from "react-data-table-component";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
//Component
import { WrapperDataTable } from "@src/component/wrapper";
import { Barra } from "../component";
import ImageSliders from "@src/component/buttons/images-slider/ImageSliders";
//Service
import { getPacientesDependientes } from "@src/services/paciente.service";
//Hook
import { useDebounce } from "@src/hooks";
//Style
import "../Validaciones.scss";
//Assets
import iconEmail from "@src/assets/icons/email-table.svg";

interface DataRow {
  idusuario: string | number;
  idpaciente: string | number;
  iddocumento: string | number;
  idfamiliar: string | number;
  document: string;
  documentType: string;
  name: string;
  age: string | number;
  birthdate: string;
  profileType: string;
  major: string;
  verification: "verificacion-automatica" | "verificacion-manual";
  registrationDate: string;
  relationship: string;
  image: Array<string>;
}

const CustomToggle = React.forwardRef(
  (
    {
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick: React.MouseEventHandler<HTMLButtonElement>;
    },
    ref: React.Ref<HTMLButtonElement>
  ) => (
    <Button variant="danger" size="sm" onClick={onClick} ref={ref}>
      <FontAwesomeIcon icon={faThumbsDown} className="me-1" /> Denegar
      {children}
    </Button>
  )
);

const Dependiente = () => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [selecion, setSelecion] = useState<DataRow | null>(null);

  const query = useDebounce(search, 2000);
  //Solicitud
  const { data, isError, isLoading } = useQuery({
    queryKey: ["pacientes-dependientes", page, query],
    queryFn: () => getPacientesDependientes({ page, search: query }),
    placeholderData: keepPreviousData,
  });

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
        <div className="d-flex flex-column align-items-start">
          {row.document}
          <span className="text-muted">{row.documentType}</span>
        </div>
      ),
    },
    {
      name: "EDAD",
      selector: (row) => row.age,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.age}
          <span className="text-muted">{row.birthdate}</span>
        </div>
      ),
    },
    {
      name: "REGISTRO",
      selector: (row) => row.registrationDate,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.registrationDate}
          <span className="text-muted"></span>
        </div>
      ),
    },
  ];

  //const data: DataRow[] = [];

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
              isLoading={isLoading}
              isError={isError}
              data={data?.data ?? []}
              recordsTotals={data?.recordsTotals ?? 0}
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
            <ImageSliders images={selecion?.image ?? []} />
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
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dependiente;
