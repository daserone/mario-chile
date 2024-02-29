import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
//Service
import { getPacientes } from "@services/paciente.service";
//Component
import { WrapperDataTable } from "@src/component/wrapper";
//Assets
import iconEmail from "@src/assets/icons/email-table.svg";

interface DataRow {
  idusuario: string | number;
  idpaciente: string | number;
  document: string;
  documentType: string;
  name: string;
  age: string;
  birthdate: string;
  phone: string;
  profileType: string;
  verification: "verificacion-automatica" | "verificacion-manual";
  registrationDate: string;
}

interface Params {
  date: string | Date;
  from: string | undefined;
  to: string | undefined;
  profile: string;
  verification: string;
  search: string;
}

interface Props {
  params: Params;
}

const PacientesTable: React.FC<Props> = ({ params }) => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  //Solicitud
  const { data, isError, isLoading } = useQuery({
    queryKey: ["pacientes", page, params],
    queryFn: () => getPacientes({ page, ...params }),
    placeholderData: keepPreviousData,
  });
  //Column
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
    {
      name: "PERFIL",
      selector: (row) => row.profileType,
      cell: (row) => (
        <div
          className={`${
            row.profileType === "Principal" ? "main-badge" : "dependent-badge"
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
            row.verification === "verificacion-automatica"
              ? "automatic-badge"
              : "inactive-badge"
          }`}
        >
          {row.verification === "verificacion-automatica"
            ? "Automática"
            : "Manual"}
        </div>
      ),
    },
  ];

  return (
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
  );
};

export default PacientesTable;
/*
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
*/
