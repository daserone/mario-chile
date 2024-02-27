import { WrapperDataTable } from "@src/component/wrapper";
import { useState } from "react";
import { TableColumn } from "react-data-table-component";
interface DataRow {
  user: string;
  email: string;
  status: boolean;
}
const UsuariosTable = () => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [selecion, setSelecion] = useState<DataRow | null>(null);

  const columns: TableColumn<DataRow>[] = [
    {
      name: "USUARIO",
      selector: (row) => row.user,
    },
    {
      name: "CORREO",
      selector: (row) => row.email,
    },
    {
      name: "ESTADO",
      selector: (row) => row.status,
      cell: (row) => (
        <div>
          {row.status ? (
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
      user: "Juan",
      email: "juan@pruebas.com",
      status: true,
    },
  ];

  return (
    <WrapperDataTable
      title=""
      columns={columns}
      isLoading={false}
      isError={false}
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

export default UsuariosTable;
