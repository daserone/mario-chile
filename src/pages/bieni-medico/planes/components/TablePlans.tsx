import { useState } from "react";
import { TableColumn } from "react-data-table-component";
//Component
import { WrapperDataTable } from "@src/component/wrapper";
//icons
import planIcon from "@src/assets/icons/plan.svg";
interface Params {
  state: string;
  search: string;
}

interface Props {
  params: Params;
}

interface DataRow {
  name: string;
  description: string;
  userLimit: number;
  centerLimit: number;
  modules: number;
  clients: number;
  status: "activo" | "inactivo";
}

const TablePlans: React.FC<Props> = ({ params }) => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  //   //Solicitud
  //   const { data, isError, isLoading } = useQuery({
  //     queryKey: ["usuarios", page, params],
  //     queryFn: () => getUsuarios({ page, ...params }),
  //     placeholderData: keepPreviousData,
  //   });
  //Column
  const columns: TableColumn<DataRow>[] = [
    {
      name: "NOMBRE",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="d-flex flex-row justify-content-start align-items-center">
          <img src={planIcon} alt="planicon" />

          <span className="ms-1">{row.name}</span>
        </div>
      ),
    },
    {
      name: "DESCRIPCIÓN",
      selector: (row) => row.description,
    },
    {
      name: "LÍMITE USUARIOS",
      selector: (row) => row.userLimit,
    },
    {
      name: "LÍMITE CENTROS",
      selector: (row) => row.centerLimit,
    },
    {
      name: "MÓDULOS",
      selector: (row) => row.modules,
    },
    {
      name: "CLIENTES",
      selector: (row) => row.clients,
    },
    {
      name: "ESTADO",
      selector: (row) => row.status,
      cell: (row) => (
        <div>
          {row.status === "activo" ? (
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
      name: "Plan 1",
      description: "Plan 1",
      userLimit: 10,
      centerLimit: 5,
      modules: 10,
      clients: 5,
      status: "activo",
    },
    {
      name: "Plan 2",
      description: "Plan 2",
      userLimit: 10,
      centerLimit: 5,
      modules: 10,
      clients: 5,
      status: "inactivo",
    },
  ];

  return (
    <WrapperDataTable
      title=""
      columns={columns}
      isLoading={false}
      isError={false}
      data={data}
      recordsTotals={data.length}
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

export default TablePlans;
