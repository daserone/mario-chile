import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
//Service
//Component
import { WrapperDataTable } from "@src/component/wrapper";
//Assets
import {
  cancelOrder,
  confirmOrder,
  createOrder,
  getOrders,
  reprintLabel,
} from "@src/services/orders.service";
import { ItemShopify } from "@src/models/orders.model";
import { removeHyphen } from "@src/helpers/helpers";
import { adapterDateTime } from "@src/helpers/adapter";
import ManageOrder from "@src/component/buttons/ManageOrder";
import { Button } from "react-bootstrap";
import useSwal from "@src/hooks/useSwal";
import toast from "react-hot-toast";

interface Params {
  company_name: string;
  filter: string;
}

interface Props {
  params: Params;
  handleToggle: (params: boolean) => void;
  setSelection: (params: ItemShopify | null) => void;
  openModalAssignDistrict: (order: ItemShopify) => void;
}

const TrackingTable: React.FC<Props> = ({
  params,
  handleToggle,
  setSelection,
  openModalAssignDistrict,
}) => {
  const history = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  //Solicitud
  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders", page, params],
    queryFn: () => getOrders({ page, items: countPerPage, ...params }),
    placeholderData: keepPreviousData,
    enabled: params.company_name !== "",
  });
  //Column

  const { showConfirm, showCancelReason, showConfirmWithInput } = useSwal();

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
          {adapterDateTime(row.created_at)}
        </div>
      ),
    },
    {
      name: "DISTRITO",
      selector: (row) => row.district?.name ?? "",
      cell: (row) => (
        <div className="d-flex flex-column align-items-start">
          {row.district ? (
            row.district.name
          ) : (
            <Button size="sm" onClick={() => openModalAssignDistrict(row)}>
              Asignar
            </Button>
          )}
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
          {row.nowly_confirmed && "Confirmado"}
          {row.cancelled_at && "Cancelado"}
          {row.tags}
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
    {
      name: "",

      cell: (row) => (
        <div className="d-flex w-100 justify-content-end pe-3"></div>
      ),
    },
  ];

  console.log(data, "DATA");

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
      handleClick={(item: ItemShopify) => {
        setSelection(item);
        handleToggle(true);
      }}
      handleDoubleClick={(item: ItemShopify) => {}}
      isExpandable={false}
      isSelectable
      handleSelect={(item: any) => {
        console.log(item);
      }}
    />
  );
};

export default TrackingTable;
/*
  // ex 20/05/2021
  return format(date, "dd/MM/yyyy");
  // ex 20:05
  return format(date, "HH:mm");
  const today = new Date();
  return differenceInYears(today, date);
*/
