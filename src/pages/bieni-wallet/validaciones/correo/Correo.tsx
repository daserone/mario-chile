import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import iconEmail from "@src/assets/icons/email-table.svg";
import iconCheck from "@src/assets/icons/circle-check.svg";

//Component
import { WrapperDataTable } from "@component/wrapper";
import { Barra } from "../component";
interface DataRow {
  email: string;
  url: string;
}
const Correo = () => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [selecion, setSelecion] = useState<DataRow | null>(null);
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

  const data: DataRow[] = [
    {
      email: "usuario@correo.com",
      url: "https://www.google.com",
    },
    {
      email: "usuario2@correo.com",
      url: "https://www.google.com",
    },
  ];

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
              isLoading={false}
              isError={false}
              data={data ?? []}
              recordsTotals={0}
              countPerPage={countPerPage}
              setCountPerPage={setCountPerPage}
              page={page}
              setPage={setPage}
              handleClick={(data) => {}}
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
