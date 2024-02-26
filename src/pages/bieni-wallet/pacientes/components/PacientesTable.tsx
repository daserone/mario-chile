import { WrapperDataTable } from "@src/component/wrapper";
import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import iconEmail from "../../../../assets/icons/email-table.svg";
import { format, differenceInYears, intervalToDuration, parse } from "date-fns";

interface DataRow {
  name: string;
  document: string;
  age: Date;
  registrationDate: Date;
  profileType: "principal" | "dependiente";
  verification: "automática" | "manual";
}
const PacientesTable = () => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [selecion, setSelecion] = useState<DataRow | null>(null);

  const getDateFormat = (date: Date) => {
    // date-fns
    // ex 20/05/2021
    return format(date, "dd/MM/yyyy");
  };

  const getHour = (date: Date) => {
    // date-fns
    // ex 20:05
    return format(date, "HH:mm");
  };

  const getAge = (date: Date) => {
    const today = new Date();
    return differenceInYears(today, date);
  };

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
        <div className="d-flex flex-column ">
          {row.document}
          <span className="text-muted">Cédula</span>
        </div>
      ),
    },

    {
      name: "EDAD",
      cell: (row) => (
        <div className="d-flex flex-column ">
          {getAge(row.age)} años
          <span className="text-muted">{getDateFormat(row.age)}</span>
        </div>
      ),
    },
    //date register
    {
      name: "FECHA DE REGISTRO",
      cell: (row) => (
        <div className="d-flex flex-column ">
          {getDateFormat(row.registrationDate)}
          <span className="text-muted">{getHour(row.registrationDate)}</span>
        </div>
      ),
    },
    {
      name: "PERFIL",
      selector: (row) => row.profileType,
      cell: (row) => (
        <div
          className={`${
            row.profileType === "principal" ? "main-badge" : "dependent-badge"
          }`}
        >
          {row.profileType === "principal" ? "Principal" : "Dependiente"}
        </div>
      ),
    },
    {
      name: "VERIFICACIÓN",
      selector: (row) => row.verification,
      cell: (row) => (
        <div
          className={`${
            row.verification === "automática"
              ? "automatic-badge"
              : "inactive-badge"
          }`}
        >
          {row.verification === "automática" ? "Automática" : "Manual"}
        </div>
      ),
    },
  ];

  const data: DataRow[] = [
    {
      name: "Juan Perez",
      document: "123456789",
      age: new Date("1990-05-20"),
      registrationDate: new Date("2021-05-20T10:00:00"),
      profileType: "principal",
      verification: "automática",
    },
    {
      name: "Maria Rodriguez",
      document: "987654321",
      age: new Date("1980-05-20"),
      registrationDate: new Date("2021-05-20T10:00:00"),
      profileType: "dependiente",
      verification: "manual",
    },
  ];

  return (
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
  );
};

export default PacientesTable;
