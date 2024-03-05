import {
  service,
  serviceBieni,
  buildUrl,
  templateData,
  endpoint,
} from "@src/config/service.config";

export const getPacientes = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "pacientes", parameters);
  const response = await service.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener pacientes: ${response.statusText}`);
  }
};

export const getPaciente = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "paciente", parameters);
  const response = await service.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener paciente: ${response.statusText}`);
  }
};

export const getPacientesManuales = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "principales", parameters);
  const response = await service.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener paciente manual: ${response.statusText}`);
  }
};

export const getPacientesDependientes = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "dependientes", parameters);
  const response = await service.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(
      `Error al obtener paciente dependiente: ${response.statusText}`
    );
  }
};

export const getPacientesCorreos = async ({ ...parameters }) => {
  const apiUrl = buildUrl(endpoint.paciente, "pacientes/correo", parameters);
  const response = await service.get(apiUrl, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? templateData;
  } else {
    throw new Error(`Error al obtener paciente correo: ${response.statusText}`);
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postPaciente = (form: any) =>
  service.post(endpoint.paciente, form, {
    responseType: "json",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postPacienteBieni = (form: any) =>
  serviceBieni.post("/controller/email.php", form, {
    responseType: "json",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
