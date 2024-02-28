import axio from "axios";
//Config
import { buildUrl, templateData, endpoint } from "@src/config/service.config";

export const servicios = axio.create({
  baseURL: "https://bieniwallet.com/bieniwebbackdes/",
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const doLogin = (form: any) =>
  servicios.post(endpoint.login, form, {
    responseType: "json",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getUsuarios = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.usuario, "usuarios", parameters);
  const response = await servicios.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener usuarios: ${response.statusText}`);
  }
};

export const getUsuario = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.usuario, "usuario", parameters);
  const response = await servicios.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener usuarios: ${response.statusText}`);
  }
};
