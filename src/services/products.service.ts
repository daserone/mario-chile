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

export const getSingleProduct = async ({ ...parameters }) => {
  let page = 1;
  let items = 1;
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

// Name	Description
// variant_id *
// string
// (query)
// variant_id
// depth *
// number
// (query)
// depth
// height *
// number
// (query)
// height
// width *
// number
// (query)
// width
// weight *
// number

interface DimensionsRequest {
  variant_id: string;
  depth: number;
  height: number;
  width: number;
  weight: number;
}

export type { DimensionsRequest };

//assign dimensions to product
export const assignDimensions = async (data: DimensionsRequest) => {
  const response = await service.post(
    "api/blu/assign_dimensions_to_variant",
    data,
    {
      responseType: "json",
    }
  );
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? {};
  } else {
    throw new Error(`Error al asignar dimensiones: ${response.statusText}`);
  }
};
