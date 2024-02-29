import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import iconEmail from "@src/assets/icons/email-table.svg";
import { WrapperDataTable } from "@src/component/wrapper";

interface DataRow {
  name: string;
  document: string;
  age: string | number;
  registerDate: string;
  kinship: string;
  verificationType: "automatic" | "manual";
}
export const UserTable = () => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);

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
          <span className="text-muted">Cédula</span>
        </div>
      ),
    },
    {
      name: "EDAD",
      selector: (row) => row.age,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.age}
          <span className="text-muted">20/05/2001</span>
        </div>
      ),
    },
    {
      name: "REGISTRO",
      selector: (row) => row.registerDate,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.registerDate}
          <span className="text-muted">12:00:00</span>
        </div>
      ),
    },
    {
      name: "PARENTESCO",
      selector: (row) => row.kinship,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.kinship}
        </div>
      ),
    },
    {
      name: "VERIFICACIÓN",
      selector: (row) => row.verificationType,
      cell: (row) => (
        <div
          className={`${
            row.verificationType === "automatic"
              ? "automatic-badge"
              : "inactive-badge"
          }`}
        >
          {row.verificationType === "automatic" ? "Automática" : "Manual"}
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
      kinship: "Padre",
      verificationType: "automatic",
    },
    {
      name: "Maria Lopez",
      document: "987654321",
      age: 30,
      registerDate: "2021-08-18",
      kinship: "Hijo",
      verificationType: "manual",
    },
  ];
  return (
    <div className="border my-1">
      <WrapperDataTable
        title=""
        columns={columns}
        isLoading={false}
        isError={false}
        data={data ?? []}
        recordsTotals={data.length}
        countPerPage={countPerPage}
        setCountPerPage={setCountPerPage}
        page={page}
        setPage={setPage}
        handleClick={() => {}}
        handleDoubleClick={() => {}}
        isExpandable={false}
      />
    </div>
  );
};
