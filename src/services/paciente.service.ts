import axio from "axios";
//Config
import { buildUrl, templateData, endpoint } from "@src/config/service.config";

export const servicios = axio.create({
  baseURL: "https://bieniwallet.com/bieniwebbackdes/",
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

export const getPacientesManuales = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "manual", parameters);
  const response = await servicios.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener paciente manual: ${response.statusText}`);
  }
};

export const getPacientesDependientes = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "usuario", parameters);
  const response = await servicios.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data?.data ?? templateData;
  } else {
    throw new Error(
      `Error al obtener paciente dependiente: ${response.statusText}`
    );
  }
};

export const getPacientesCorreo = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "usuario", parameters);
  const response = await servicios.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener paciente correo: ${response.statusText}`);
  }
};
