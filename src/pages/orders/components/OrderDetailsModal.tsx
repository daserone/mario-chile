import { useEffect } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Offcanvas, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
//Model
import { User, ResponseNotificacion } from "@src/models";
//Service
import { createUser } from "@services/usuario.service";
import { ItemShopify } from "@src/models/orders.model";
import { adapterDateTime } from "@src/helpers/adapter";
import { removeHyphen } from "@src/helpers/helpers";
interface FormValues extends User {
  password?: string;
  level?: string | number;
}

interface Props {
  state: boolean;
  handleToggle: (params: boolean) => void;
  selection: ItemShopify | null;
  setSelection: (params: ItemShopify | null) => void;
}

const OrderDetailModal: React.FC<Props> = ({
  state,
  handleToggle,
  selection,
  setSelection,
}) => {
  const handleCloseAndReset = () => {
    handleToggle(false);

    setSelection(null);
  };
  //Solicitud
  //const queryClient = useQueryClient();
  //   const usuarioMutation = useMutation({
  //     mutationFn: createUser,
  //   });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    if (Object.values(selection ?? {}).length > 0) {
    }
  }, [selection]);

  //   export interface ItemShopify {
  //     id?: string;
  //     order_id?: number;
  //     cancelled_at?: string | null;
  //     closed_at?: string | null;
  //     confirmed?: boolean;
  //     created_at: string;
  //     updated_at?: string | null;
  //     currency?: string;
  //     current_total_price?: number;
  //     current_subtotal_price?: number;
  //     current_total_discounts?: number;
  //     total_shhipping_price_set?: number | null;
  //     name: string;
  //     phone?: null | string;
  //     tags?: string | string[];
  //     financial_status?: string;
  //     fulfillment_status?: null | string;
  //     payment_gateway_names?: null | string;
  //     processed_at?: string;
  //     customer_first_name?: string;
  //     customer_last_name?: string;
  //     customer_email?: null | string;
  //     shipping_address?: string;
  //     shipping_city?: string;
  //     shipping_province?: string;
  //     shipping_country?: string;
  //     shipping_latitude?: string;
  //     shipping_longitude?: string;
  //     company?: Company;
  //     shopify_item: ShopifyItem[];
  //     shopify_fulfillment?: any[];
  //   }

  //   export interface Company {
  //     name?: string;
  //   }

  //   export interface ShopifyItem {
  //     id?: string;
  //     product_id?: number;
  //     name: string;
  //     quantity?: number;
  //     price?: number;
  //     grams?: number;
  //     sku?: string;
  //     requires_shipping?: boolean;
  //     fulfillment_status?: null | string;
  //     fulfillment_service?: FulfillmentService;
  //   }

  return (
    <>
      <Offcanvas show={state} onHide={handleCloseAndReset} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>
            {" "}
            <h2>Orden {selection?.name}</h2>{" "}
            <span>{adapterDateTime(selection?.created_at)}</span>
          </Offcanvas.Title>
          <div className="btn-close" onClick={handleCloseAndReset}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column">
            <div className="col-12">
              <h3>Cliente</h3>
              <p>
                Nombre: {selection?.customer_first_name}{" "}
                {removeHyphen(selection?.customer_last_name ?? "")}
              </p>
              <p>Email: {selection?.customer_email}</p>
              <p>Telefono: {selection?.phone}</p>
            </div>
            <div className="col-12">
              <h3>Envio</h3>
              <p>
                {selection?.shipping_address} {selection?.shipping_city}{" "}
                {selection?.shipping_province} {selection?.shipping_country}
              </p>
            </div>
            <div className="col-12">
              <h3>Productos</h3>

              {selection?.shopify_item.map((item, index) => (
                <div className="card border shadow-sm">
                  <div className="card-header">
                    <h5 className="card-title">{item.name}</h5>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h6 className="">Cantidad: {item.quantity}</h6>
                    <h6 className="">Precio: {item.price}</h6>
                  </div>
                </div>
              ))}
            </div>
            {/* buttons here */}

            {/* cancelar/confirmar/ crear guias / preparado */}

            <div className="d-flex flex-row flex-wrap">
              <Button
                variant="danger"
                className="m-1"
                onClick={() => {
                  toast.success("Orden cancelada");
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="success"
                className="m-1"
                onClick={() => {
                  toast.success("Orden confirmada");
                }}
              >
                Confirmar
              </Button>

              <Button
                variant="primary"
                className="m-1"
                onClick={() => {
                  toast.success("Guia creada");
                }}
              >
                Crear guias
              </Button>
              <Button
                variant="info"
                className="m-1"
                onClick={() => {
                  toast.success("Orden preparada");
                }}
              >
                Preparado
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OrderDetailModal;
