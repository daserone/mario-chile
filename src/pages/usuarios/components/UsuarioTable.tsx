import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
//Component
import { WrapperDataTable } from "@src/component/wrapper";
//Service
import { getUsuarios } from "@services/usuario.service";

interface Params {
  state: string;
  search: string;
}

interface Props {
  params: Params;
}

interface DataRow {
  nombre: string;
  correo: string;
  estado: string;
}

const UsuariosTable: React.FC<Props> = ({ params }) => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  //Solicitud
  const { data, isError, isLoading } = useQuery({
    queryKey: ["usuarios", page, params],
    queryFn: () => getUsuarios({ page, ...params }),
    placeholderData: keepPreviousData,
  });
  //Column
  const columns: TableColumn<DataRow>[] = [
    {
      name: "USUARIO",
      selector: (row) => row.nombre,
    },
    {
      name: "CORREO",
      selector: (row) => row.correo,
    },
    {
      name: "ESTADO",
      selector: (row) => row.estado,
      cell: (row) => (
        <div>
          {row.estado === "activo" ? (
            <span className="active-badge">Activo</span>
          ) : (
            <span className="inactive-badge">Inactivo</span>
          )}
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

export default UsuariosTable;
