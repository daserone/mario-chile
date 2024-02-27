import axio from "axios";
//Config
import { buildUrl, templateData, endpoint } from "@src/config/service.config";

export const servicios = axio.create({
  baseURL: "http://localhost/bieniwebback/",
});

export const getPacientes = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "pacientes", parameters);
  const response = await servicios.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener pacientes: ${response.statusText}`);
  }
};

export const getPaciente = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "paciente", parameters);
  const response = await servicios.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener paciente: ${response.statusText}`);
  }
};

export const getValidacionManuales = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "usuarios", parameters);
  const response = await servicios.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener usuarios: ${response.statusText}`);
  }
};

export const getValidacionDependientes = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "usuario", parameters);
  const response = await servicios.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener usuarios: ${response.statusText}`);
  }
};

export const getValidacionCorreo = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "usuario", parameters);
  const response = await servicios.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener usuarios: ${response.statusText}`);
  }
};
