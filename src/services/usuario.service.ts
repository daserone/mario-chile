import {
  service,
  buildUrl,
  templateData,
  endpoint,
} from "@src/config/service.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const doLogin = (form: any) =>
  service.post(endpoint.login, form, {
    responseType: "json",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getUsuarios = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.usuario, "usuarios", parameters);
  const response = await service.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener usuarios: ${response.statusText}`);
  }
};

export const getUsuario = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.usuario, "usuario", parameters);
  const response = await service.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener usuarios: ${response.statusText}`);
  }
};
