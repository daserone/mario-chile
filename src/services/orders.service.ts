import { service } from "@src/config/service.config";
import { LoginRequest } from "@src/models";

const endpoint = {
  getOrders: "get_shopify_orders",
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
