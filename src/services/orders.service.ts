import { service } from "@src/config/service.config";
import { LoginRequest } from "@src/models";

const endpoint = {
  getOrders: "api/shopify/get_shopify_orders",
};

export const getOrders = async ({ ...parameters }) => {
  let company_name = parameters.company_name;
  let page = parameters.page;
  let items = parameters.items;
  let filter = parameters.filter;

  const response = await service.get(
    `${endpoint.getOrders}?company_name=${company_name}&page=${page}&items=${items}&filter=${filter}`,
    {
      responseType: "json",
    }
  );
  if (response.status >= 200 && response.status < 300) {
    console.log();

    return response?.data ?? {};
  } else {
    throw new Error(`Error al obtener pedidos: ${response.statusText}`);
  }
};

//provinces
export const getProvinces = async () => {
  const response = await service.get("api/blu/get_provinces", {
    responseType: "json",
  });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? [];
  } else {
    throw new Error(`Error al obtener provincias: ${response.statusText}`);
  }
};
//cities
export const getCities = async (province_id: string) => {
  const response = await service.get(
    `api/blu/get_cities?province=${province_id}`,
    {
      responseType: "json",
    }
  );
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? [];
  } else {
    throw new Error(`Error al obtener ciudades: ${response.statusText}`);
  }
};
//districts
export const getDistricts = async (city_id: string) => {
  const response = await service.get(`api/blu/get_districts?city=${city_id}`, {
    responseType: "json",
  });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? [];
  } else {
    throw new Error(`Error al obtener distritos: ${response.statusText}`);
  }
};
// {order_id: string, district_id: string}
interface AssignDistrictRequest {
  order_id: string;
  district_id: string;
}
//assign district to order
export const assignDistrict = async (data: AssignDistrictRequest) => {
  const response = await service.post(
    `api/blu/assign_district_to_order?order_id=${data.order_id}&district_id=${data.district_id}`,

    {
      responseType: "json",
    }
  );
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? {};
  } else {
    throw new Error(`Error al asignar distrito: ${response.statusText}`);
  }
};

// api/shopify/cancel_reasons/
export const getCancelReasons = async () => {
  const response = await service.get("api/shopify/cancel_reasons", {
    responseType: "json",
  });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? [];
  } else {
    throw new Error(
      `Error al obtener motivos de cancelación: ${response.statusText}`
    );
  }
};

// api/shopify/cancel_shopify_order/
interface CancelOrderRequest {
  order_id: number;
  company_name: string;
  reason: string;
}

export const cancelOrder = async (data: CancelOrderRequest) => {
  const response = await service.post(
    `api/shopify/cancel_shopify_order?order_id=${data.order_id}&company_name=${data.company_name}&reason=${data.reason}`,
    {
      responseType: "json",
    }
  );
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? {};
  } else {
    throw new Error(`Error al cancelar pedido: ${response.statusText}`);
  }
};

// api/shopify/confirm_shopify_order/
interface ConfirmOrderRequest {
  order_id: number;
  company_name: string;
}

export const confirmOrder = async (data: ConfirmOrderRequest) => {
  const response = await service.post(
    `api/shopify/confirm_shopify_order?order_id=${data.order_id}&company_name=${data.company_name}`,
    {
      responseType: "json",
    }
  );
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? {};
  } else {
    throw new Error(`Error al confirmar pedido: ${response.statusText}`);
  }
};

//api/blu/create_order

interface CreateOrderRequest {
  order_id: string;
  comment: string;
  alternate_shipping: {};
}

export const createOrder = async (data: CreateOrderRequest) => {
  const response = await service.post(`api/blu/create_order`, data, {
    responseType: "arraybuffer",
  });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? {};
  } else {
    throw new Error(`Error al crear pedido: ${response.statusText}`);
  }
};

//api/blu/reprint_label
interface ReprintLabelRequest {
  order_id: string;
}

export const reprintLabel = async (data: ReprintLabelRequest) => {
  const response = await service.get(
    `api/blu/reprint_label?order_id=${data.order_id}`,
    {
      responseType: "arraybuffer",
    }
  );
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? {};
  } else {
    throw new Error(`Error al reimprimir etiqueta: ${response.statusText}`);
  }
};
