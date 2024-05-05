import { service } from "@src/config/service.config";

const endpoint = {
  getCompanies: "get_companies",
};

export const getCompanies = async () => {
  const response = await service.get(endpoint.getCompanies, {
    responseType: "json",
  });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? [];
  } else {
    throw new Error(`Error al obtener empresas: ${response.statusText}`);
  }
};
