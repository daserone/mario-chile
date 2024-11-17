export interface OrdersResponse {
  total_items?: number;
  total_pages?: number;
  items?: ItemShopify[];
}

interface ItemShopifyDistrict {
  id: string;
  name: string;
  code: string;
}

// blu_shipment_cost
// :
// 3718.83
// blu_tracking
// :
// Array(7)
// 0
// :
// {status: 'DA', description: 'ARRIBADO', created_at: '2024-11-16T06:48:53-03:00', updated_at: '2024-11-16T10:32:43.951625-03:00'}
// 1
// :
// {status: 'IC', description: 'INGRESO CAMION', created_at: '2024-11-15T18:29:47-03:00', updated_at: '2024-11-16T10:32:43.969194-03:00'}
// 2
// :
// {status: 'IC', description: 'INGRESO CAMION', created_at: '2024-11-15T23:35:04-03:00', updated_at: '2024-11-16T10:32:43.967232-03:00'}
// 3
// :
// {status: 'MDR', description: 'MOVIMIENTO DE DETALLE DE RUTEO', created_at: '2024-11-15T18:29:46-03:00', updated_at: '2024-11-16T10:32:43.970572-03:00'}
// 4
// :
// {status: 'PU', description: 'RETIRADO', created_at: '2024-11-15T16:40:24-03:00', updated_at: '2024-11-16T10:32:43.972243-03:00'}
// 5
// :
// {status: 'PUH', description: 'PICK UP HUB', created_at: '2024-11-15T18:29:44-03:00', updated_at: '2024-11-16T10:32:43.971432-03:00'}
// 6
// :
// {status: 'TR', description: 'TRANF RUTEADOR/DISTRIB', created_at: '2024-11-16T06:48:52-03:00', updated_at: '2024-11-16T10:32:43.962775-03:00'}
// length
// :
// 7
// [[Prototype]]
// :
// Array(0)
// blu_tracking_number
// :
// "7922690624"
export interface ItemShopify {
  id?: string;
  order_id?: number;
  cancelled_at?: string | null;
  closed_at?: string | null;
  confirmed?: boolean;
  created_at: string;
  updated_at?: string | null;
  currency?: string;
  current_total_price?: number;
  current_subtotal_price?: number;
  current_total_discounts?: number;
  total_shhipping_price_set?: number | null;
  name: string;
  phone?: null | string;
  tags?: string | string[];
  financial_status?: string;
  fulfillment_status?: null | string;
  payment_gateway_names?: null | string;
  processed_at?: string;
  customer_first_name?: string;
  customer_last_name?: string;
  customer_email?: null | string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_province?: string;
  shipping_country?: string;
  shipping_latitude?: string;
  shipping_longitude?: string;
  company?: Company;
  shopify_item: ShopifyItem[];
  shopify_fulfillment?: any[];
  district?: ItemShopifyDistrict;
  province?: ItemShopifyDistrict;
  city?: ItemShopifyDistrict;
  nowly_confirmed?: boolean;
  blu_tracking_number?: string;
  blu_shipment_cost?: number;
  blu_tracking?: BluTracking[];
}

export interface BluTracking {
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
}
export interface Company {
  name?: string;
}

export interface ShopifyItem {
  id?: string;
  product_id?: number;
  name: string;
  quantity?: number;
  price?: number;
  grams?: number;
  sku?: string;
  requires_shipping?: boolean;
  fulfillment_status?: null | string;
  fulfillment_service?: FulfillmentService;
}

export enum FulfillmentService {
  Manual = "manual",
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

export interface BluTrackingResponse {
  idEspecieValorada: string;
  nroOS: string;
  fechaCreacion: string;
  numeroReferencia: string;
  ctaCte: string;
  origen: {
    region: string;
    comuna: string;
    codigoLocalidad: string;
    nombreLocalidad: string;
    direccion: string;
  };
  destino: {
    region: string;
    comuna: string;
    codigoLocalidad: string;
    nombreLocalidad: string;
    direccion: string;
  };
  codigoTipoServicio: string;
  nombreTipoServicio: string;
  codigoProducto: string;
  codigoPersona: string;
  pesoFisico: string;
  pesoVolumen: string;
  valorFlete: string;
  cantidadPiezas: string;
  macroEstadoActual: string;
  fechaMacroEstadoActual: string;
  tpeecdg: string;
  observaciones: string;
  nombreOrigen: string;
  direccionOrigen: string;
  localidadOrigen: string;
  nombreDestino: string;
  direccionDestino: string;
  localidadDestino: string;
  fechaRetiro: string;
  fechaEntrega: string;
  observacionEntrega: string;
  pinchazos: BluTrackingPinchazo[];
}

export interface BluTrackingPinchazo {
  tipoMovimiento: {
    codigo: string;
    descripcion: string;
  };
  codigoPieza: string;
  fechaHora: string;
  cantidadPiezas: string;
  observacion: string;
}
