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
