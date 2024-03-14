import {
  service,
  buildUrl,
  templateData,
  endpoint,
} from "@src/config/service.config";

export const getDifusiones = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.difusion, "difusiones", parameters);
  const response = await service.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener pacientes: ${response.statusText}`);
  }
};
