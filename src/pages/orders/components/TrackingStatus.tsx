import { BluTrackingResponse, ItemShopify } from "@src/models/orders.model";
import { getOrderStatus } from "@src/services/orders.service";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

interface Props {
  selectedOrder: ItemShopify;
  isOpen: boolean;
  onClose: () => void;
}

// {
//     "idEspecieValorada": "1403156773",
//     "nroOS": "7922690624",
//     "fechaCreacion": "2024-11-14 19:53:59.0",
//     "numeroReferencia": "CT54601-PSE-20241114-6142835786032",
//     "ctaCte": "96801150-11-8",
//     "origen": {
//         "region": "Metropolitana de San",
//         "comuna": "SAN MIGUEL",
//         "codigoLocalidad": "SMG",
//         "nombreLocalidad": "SAN MIGUEL - STGO.",
//         "direccion": "LASO 1354, SAN MIGUEL"
//     },
//     "destino": {
//         "region": "Valparaiso",
//         "comuna": "QUILPUE",
//         "codigoLocalidad": "QPE",
//         "nombreLocalidad": "QUILPUE",
//         "direccion": "LOS TILOS 1729"
//     },
//     "codigoTipoServicio": "73",
//     "nombreTipoServicio": "EXPRESO-P REG",
//     "codigoProducto": "P",
//     "codigoPersona": "USRTEST",
//     "pesoFisico": "0.3",
//     "pesoVolumen": "0.49",
//     "valorFlete": "3719",
//     "cantidadPiezas": "1",
//     "macroEstadoActual": "En Transito",
//     "fechaMacroEstadoActual": "16/11/2024 06:48",
//     "tpeecdg": "D2",
//     "observaciones": "prueba definitiva",
//     "nombreOrigen": "CHILETOPIA",
//     "direccionOrigen": "LASO 1354, SAN MIGUEL",
//     "localidadOrigen": "SAN MIGUEL - STGO.",
//     "nombreDestino": "OSCAR RIOS SALAZAR",
//     "direccionDestino": "LOS TILOS 1729",
//     "localidadDestino": "QUILPUE",
//     "fechaRetiro": "2024-11-15 16:40:24.0",
//     "fechaEntrega": null,
//     "observacionEntrega": null,
//     "pinchazos": [
//         {
//             "tipoMovimiento": {
//                 "codigo": "DA",
//                 "descripcion": "ARRIBADO"
//             },
//             "codigoPieza": "33007922690624",
//             "fechaHora": "2024-11-16 06:48:53.0",
//             "cantidadPiezas": "1",
//             "observacion": "PINCHAZO DE ARRIBO"
//         },
//         {
//             "tipoMovimiento": {
//                 "codigo": "TR",
//                 "descripcion": "TRANF RUTEADOR/DISTRIB"
//             },
//             "codigoPieza": "33007922690624",
//             "fechaHora": "2024-11-16 06:48:52.0",
//             "cantidadPiezas": "1",
//             "observacion": "CA.DIAZ3    RUTEO CZ, RUTA: 524-QPE"
//         },
//         {
//             "tipoMovimiento": {
//                 "codigo": "IC",
//                 "descripcion": "INGRESO CAMION"
//             },
//             "codigoPieza": "33007922690624",
//             "fechaHora": "2024-11-15 23:35:04.0",
//             "cantidadPiezas": "1",
//             "observacion": "patente: HSGD55"
//         },
//         {
//             "tipoMovimiento": {
//                 "codigo": "IC",
//                 "descripcion": "INGRESO CAMION"
//             },
//             "codigoPieza": "33007922690624",
//             "fechaHora": "2024-11-15 18:29:47.0",
//             "cantidadPiezas": "1",
//             "observacion": "SOR:01-OLA:00059-E:1700-SP:64-SR:64-PZA:1"
//         },
//         {
//             "tipoMovimiento": {
//                 "codigo": "MDR",
//                 "descripcion": "MOVIMIENTO DE DETALLE DE RUTEO"
//             },
//             "codigoPieza": "33007922690624",
//             "fechaHora": "2024-11-15 18:29:46.0",
//             "cantidadPiezas": "1",
//             "observacion": "SOR:01-OLA:00059-E:1700-SP:64-SR:64-PZA:1"
//         },
//         {
//             "tipoMovimiento": {
//                 "codigo": "PUH",
//                 "descripcion": "PICK UP HUB"
//             },
//             "codigoPieza": "33007922690624",
//             "fechaHora": "2024-11-15 18:29:44.0",
//             "cantidadPiezas": "1",
//             "observacion": "SOR:01-OLA:00059-E:1700-SP:64-SR:64-PZA:1"
//         },
//         {
//             "tipoMovimiento": {
//                 "codigo": "PU",
//                 "descripcion": "RETIRADO"
//             },
//             "codigoPieza": "33007922690624",
//             "fechaHora": "2024-11-15 16:40:24.0",
//             "cantidadPiezas": "1",
//             "observacion": "C8057432176"
//         }
//     ]
// }

const TrackingStatusModal = ({ selectedOrder, isOpen, onClose }: Props) => {
  const [blueTrackingStatus, setBlueTrackingStatus] =
    useState<BluTrackingResponse>({} as BluTrackingResponse);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchStatus = async () => {
    if (!selectedOrder) return;
    if (selectedOrder.id === undefined) return;
    setLoading(true);
    getOrderStatus(selectedOrder.id.toString())
      .then((res) => {
        console.log(res);
        const { data } = res;
        if (data) {
          setBlueTrackingStatus(data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchStatus();
  }, [selectedOrder]);

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tracking Status</Modal.Title>
        {/* actualizar el estado de la orden  */}
      </Modal.Header>
      <Modal.Body>
        <div>
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h5>Tracking Number: {selectedOrder.blu_tracking_number}</h5>{" "}
            <Button variant="primary" onClick={fetchStatus}>
              Actualizar
            </Button>
          </div>
          <div>
            <h6>Fecha de creación: {blueTrackingStatus.fechaCreacion}</h6>
            <h6>Origen: {blueTrackingStatus.origen?.comuna}</h6>
            <h6>Destino: {blueTrackingStatus.destino?.comuna}</h6>
            <h6>Estado: {blueTrackingStatus.macroEstadoActual}</h6>
            <h6>
              Fecha de estado: {blueTrackingStatus.fechaMacroEstadoActual}
            </h6>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TrackingStatusModal;
