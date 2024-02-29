import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
//Component
import { WrapperDataTable } from "@component/wrapper";
import { Barra } from "../component";
//Service
import { getPacientesCorreos } from "@src/services/paciente.service";
//Hook
import { useDebounce } from "@src/hooks";
//Assets
import iconEmail from "@src/assets/icons/email-table.svg";
import iconCheck from "@src/assets/icons/circle-check.svg";
/*
interface DataRow {
  email: string;
  url: string;
}*/
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
  email: string;
  url: string;
}
const Correo = () => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const query = useDebounce(search, 2000);
  //Solicitud
  const { data, isError, isLoading } = useQuery({
    queryKey: ["pacientes-correos", page, query],
    queryFn: () => getPacientesCorreos({ page, search: query }),
    placeholderData: keepPreviousData,
  });
  const columns: TableColumn<DataRow>[] = [
    {
      name: "CORREO",
      selector: (row) => row.email,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="email-badge me-1  ">
            <img src={iconEmail} alt="email" className="" />
          </div>
          {row.email}
        </div>
      ),
    },
    {
      name: "DIRECCIÓN",
      selector: (row) => row.url,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="email-badge me-1  ">
            <img src={iconCheck} alt="email" className="" />
          </div>
          {row.url}
        </div>
      ),
    },
    {
      name: "",
      selector: (row) => row.url,
      cell: (row) => (
        <a
          href={row.url}
          style={{
            textDecoration: "underline",
          }}
        >
          Reenviar enlace
        </a>
      ),
    },
  ];
  /*
  const data: DataRow[] = [
    {
      email: "usuario@correo.com",
      url: "https://www.google.com",
    },
    {
      email: "usuario2@correo.com",
      url: "https://www.google.com",
    },
  ];*/

  return (
    <>
      <div>
        <Barra texto={search} setTexto={setSearch} />
      </div>
      <div className="">
        <Row>
          <Col xs={12} md={12} lg={12}>
            {" "}
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
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Correo;
