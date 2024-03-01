import { useState } from "react";
import { TableColumn } from "react-data-table-component";
//Component
import { WrapperDataTable } from "@src/component/wrapper";
//icons
import corporativeIcon from "@src/assets/icons/corporative.svg";
import individualIcon from "@src/assets/icons/individual.svg";
interface Params {
  state: string;
  search: string;
}

interface Props {
  params: Params;
}

interface DataRow {
  client: string;
  email: string;
  plan: "corporativo" | "individual";
  totalUsers: number;
  totalCenters: number;
  status: "activo" | "inactivo";
}

const TableClients: React.FC<Props> = ({ params }) => {
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
      name: "CLIENTE",
      selector: (row) => row.client,
    },
    {
      name: "CORREO",
      selector: (row) => row.email,
    },
    {
      name: "PLAN",
      selector: (row) => row.plan,
      cell: (row) => (
        <div className="d-flex flex-row justify-content-start align-items-center">
          {row.plan === "corporativo" ? (
            <img src={corporativeIcon} alt="corporative" />
          ) : (
            <img src={individualIcon} alt="individual" />
          )}
          <span className="ms-1">{row.plan}</span>
        </div>
      ),
    },
    {
      name: "TOTAL USUARIOS",
      selector: (row) => row.totalUsers,
    },
    {
      name: "N° CENTROS",
      selector: (row) => row.totalCenters,
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
      client: "Client 1",
      email: "clien1t@gmail.com",
      plan: "corporativo",
      totalUsers: 10,
      totalCenters: 5,
      status: "activo",
    },
    {
      client: "Client 2",
      email: "client2@gmail.com",
      plan: "individual",
      totalUsers: 10,
      totalCenters: 5,
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

export default TableClients;
