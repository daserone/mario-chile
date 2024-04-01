import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
//Service
//Component
import { WrapperDataTable } from "@src/component/wrapper";
//Assets
import iconEmail from "@src/assets/icons/email-table.svg";
import { getOrders } from "@src/services/orders.service";
import { ItemShopify } from "@src/models/orders.model";
import { removeHyphen } from "@src/helpers/helpers";

interface Params {
  company_name: string;
  filter: string;
}

interface Props {
  params: Params;
}

const OrdersTable: React.FC<Props> = ({ params }) => {
  const history = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  //Solicitud
  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders", page, params],
    queryFn: () => getOrders({ page, items: countPerPage, ...params }),
    placeholderData: keepPreviousData,
  });
  //Column

  const columns: TableColumn<ItemShopify>[] = [
    {
      name: "NOMBRE",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="d-flex align-items-center">{row.name}</div>
      ),
    },
    {
      name: "FECHA DE LA ORDEN",
      selector: (row) => row.created_at,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.created_at}
        </div>
      ),
    },
    {
      name: "CLIENTE",
      selector: (row) => row.customer_first_name ?? "",
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.customer_first_name} {removeHyphen(row.customer_last_name ?? "")}
          <span className="text-muted">{row.customer_email}</span>
        </div>
      ),
    },
    {
      name: "ESTATUS DE LA ORDEN",
      selector: (row) => row.financial_status ?? "",
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.financial_status}
        </div>
      ),
    },
    {
      name: "DETALLES",
      selector: (row) => row.shopify_item[0]?.name,
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.shopify_item[0]?.name}
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
      data={data?.items ?? []}
      recordsTotals={data?.total_items ?? 0}
      countPerPage={countPerPage}
      setCountPerPage={setCountPerPage}
      page={page}
      setPage={setPage}
      handleClick={(item: ItemShopify) => {}}
      handleDoubleClick={(item: ItemShopify) => {}}
      isExpandable={false}
    />
  );
};

export default OrdersTable;
/*
  // ex 20/05/2021
  return format(date, "dd/MM/yyyy");
  // ex 20:05
  return format(date, "HH:mm");
  const today = new Date();
  return differenceInYears(today, date);
*/
