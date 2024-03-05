import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
//Service
import { getPacientes } from "@services/paciente.service";
//Component
import { WrapperDataTable } from "@src/component/wrapper";
//Model
import { DataRowPacientes } from "@src/models/paciente.model";
//Assets
import iconEmail from "@src/assets/icons/email-table.svg";

interface Props {
  idUsuario: string | number;
  idPaciente: string | number;
}
export const UserTable = ({ idUsuario, idPaciente }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  //Solicitud
  const { data, isError, isLoading } = useQuery({
    queryKey: ["pacientes", page, idUsuario, idPaciente],
    queryFn: () =>
      getPacientes({ page, idusuario: idUsuario, idpaciente: idPaciente }),
    placeholderData: keepPreviousData,
  });

  const columns: TableColumn<DataRowPacientes>[] = [
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
      selector: (row) => row.registrationDate,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.registrationDate}
          <span className="text-muted">{row.registrationDate}</span>
        </div>
      ),
    },
    {
      name: "PARENTESCO",
      selector: (row) => row.profileType,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.profileType}
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
    <div className="border my-1">
      <WrapperDataTable
        title=""
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        data={data?.data ?? []}
        recordsTotals={0}
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
