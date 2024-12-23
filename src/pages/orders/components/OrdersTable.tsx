import { useState } from "react";
import { TableColumn } from "react-data-table-component";
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
//Service
//Component
import { WrapperDataTable } from "@src/component/wrapper";
//Assets
import {
  cancelOrder,
  confirmOrder,
  createOrder,
  createOrderMultiple,
  CreateOrderMultipleRequest,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { set } from "date-fns";

interface Params {
  company_name: string;
  filter: string;
}

interface Props {
  params: Params;
  handleToggle: (params: boolean) => void;
  setSelection: (params: ItemShopify | null) => void;
  openModalAssignDistrict: (order: ItemShopify) => void;
  openModalTrackingStatus: (order: ItemShopify) => void;
}

const OrdersTable: React.FC<Props> = ({
  params,
  handleToggle,
  setSelection,
  openModalAssignDistrict,
  openModalTrackingStatus,
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

  // {
  //   "orders": [
  //     {
  //       "order_id": "string",
  //       "comment": "string",
  //       "alternate_shipping": {}
  //     }
  //   ]
  // }

  const [selectedRows, setSelectedRows] = useState<ItemShopify[]>([]);
  const [toggledClearRows, setToggleClearRows] = useState(false);

  const handleChange = ({ selectedRows }: { selectedRows: ItemShopify[] }) => {
    setSelectedRows(selectedRows);
  };

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };
  const queryClient = useQueryClient();

  const handleCancelOrder = (order: ItemShopify) => {
    showCancelReason(
      "Cancelar",
      "¿Estás seguro de cancelar la orden?",
      "warning",
      "Cancelar orden",
      "No"
    ).then((result) => {
      if (result.isConfirmed) {
        console.log("Cancelar", result);
        let body = {
          order_id: order.order_id!,
          reason: result.value,
          company_name: params.company_name,
        };

        cancelOrder(body)
          .then((response) => {
            toast.success("Orden cancelada con éxito");
            queryClient.invalidateQueries({
              queryKey: ["orders", page, params],
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error al cancelar la orden");
          });
      }
    });
  };

  const handleConfirmOrder = (order: ItemShopify) => {
    showConfirm(
      "Confirmar",
      "¿Estás seguro de confirmar la orden?",
      "warning"
    ).then((result) => {
      if (result.isConfirmed) {
        console.log("Confirmar", result);
        confirmOrder({
          order_id: order.order_id!,
          company_name: params.company_name,
        })
          .then((response) => {
            toast.success("Orden confirmada con éxito");
            queryClient.invalidateQueries({
              queryKey: ["orders", page, params],
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error al confirmar la orden");
          });
      }
    });
  };

  const handleCreateGuides = (
    order: ItemShopify,
    multiple: boolean = false
  ) => {
    showConfirmWithInput(
      "Crear guías",
      "¿Estás seguro de crear guías?",
      "warning",
      "Crear guías",
      "No",
      "Comentario"
    ).then((result) => {
      if (result.isConfirmed) {
        console.log("Crear guías", result);

        let bodyMultiple: CreateOrderMultipleRequest = {
          orders: [],
        };

        let body = {
          order_id: order.id!.toString(),
          comment: result.value,
          alternate_shipping: {},
        };

        if (multiple) {
          selectedRows.forEach((order) => {
            bodyMultiple.orders.push({
              order_id: order.id!.toString(),
              comment: result.value,
              alternate_shipping: {},
            });
          });
        }

        console.log(
          {
            body,
            bodyMultiple,
          },
          "body"
        );

        const endpoint = multiple
          ? createOrderMultiple(bodyMultiple)
          : createOrder(body);

        endpoint
          .then((response) => {
            console.log(response, "response");
            if (!multiple) {
              var file = new Blob([response], { type: "application/pdf" });
              //var file = data['response'];
              var fileURL = URL.createObjectURL(file);
              window.open(fileURL);
            }
            setToggleClearRows(!toggledClearRows);
            setSelectedRows([]);

            toast.success("Guías creadas con éxito");
            queryClient.invalidateQueries({
              queryKey: ["orders", page, params],
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error al crear guías");
          });
      }
    });
  };

  const handlePrintLabel = (order: ItemShopify) => {
    reprintLabel({
      order_id: order.id!,
    }).then((response) => {
      console.log(response);
      var file = new Blob([response], { type: "application/pdf" });
      //var file = data['response'];
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  };

  const handleTags = (tags: string[] | string) => {
    if (Array.isArray(tags)) {
      return tags.join(", ");
    }
    return tags;
  };

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
          {row.cancelled_at && "Cancelado"}-{handleTags(row.tags ?? "")}
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
        <div className="d-flex w-100 justify-content-end pe-3 align-items-center">
          {row.blu_tracking_number && (
            <FontAwesomeIcon
              icon={faTruckArrowRight}
              className="text-warning"
            />
          )}
          <ManageOrder
            handleConfirm={() => {
              console.log("Confirmar");
              if (row.cancelled_at !== null) {
                toast.error("La orden ha sido cancelada");
                return;
              }
              handleConfirmOrder(row);
            }}
            handleCancel={() => {
              console.log("Cancelar");
              if (row.cancelled_at !== null) {
                toast.error("La orden ya ha sido cancelada");
                return;
              }
              handleCancelOrder(row);
            }}
            handleGuides={() => {
              console.log("Crear guias");

              // if (row.cancelled_at !== null) {
              //   toast.error("La orden ha sido cancelada");
              //   return;
              // }
              handleCreateGuides(row);
            }}
            handlePrepared={() => {
              console.log("Preparado");
              handlePrintLabel(row);
            }}
            handleStatus={
              row.blu_tracking_number
                ? () => {
                    console.log("Estatus");
                    openModalTrackingStatus(row);
                  }
                : undefined
            }
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {selectedRows.length > 0 && (
        <div className="d-flex justify-content-between align-items-center bg-info p-2">
          <h4 className="text-white">
            Crear guías para {selectedRows.length}{" "}
            {selectedRows.length > 1 ? "órdenes" : "orden"}
          </h4>
          <Button
            variant="primary"
            onClick={() => handleCreateGuides(selectedRows[0], true)}
          >
            Crear guías
          </Button>
        </div>
      )}

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
        handleSelect={handleChange}
        clearSelectedRows={toggledClearRows}
      />
    </>
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
