import { service } from "@src/config/service.config";
import { get } from "http";

const endpoint = {
  getProducts: "api/shopify/get_shopify_products",
};

export const getProducts = async ({ ...parameters }) => {
  let page = parameters.page;
  let items = parameters.items;
  let filter = parameters.filter;
  let company_name = parameters.company_name;
  const response = await service.get(
    `${endpoint.getProducts}?page=${page}&items=${items}&filter=${filter}&company_name=${company_name}`,
    {
      responseType: "json",
    }
  );
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? {};
  } else {
    throw new Error(`Error al obtener productos: ${response.statusText}`);
  }
};
