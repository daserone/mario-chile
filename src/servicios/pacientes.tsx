import { URLBASE, URLBIENI } from "./configuracion";
/*const buildUrl = (url, op, parameters = {}) => {
  const queryString = new URLSearchParams(parameters).toString();
  return `${url}?op=${op}&${queryString}`;
};*/
export const getPacientes = async (page: number, idusuario: any) => {
  const res = await URLBASE.get(
    `controller/pacientes.php?op=pacientes&page=${page}&idusuario=${idusuario}`,
    {
      responseType: "json",
    }
  );
  return res.data;
};

export const getPacienteId = async (id: any, idusuario: any) => {
  const res = await URLBASE.get(
    `controller/pacientes.php?op=pacienteId&id=${id}&idusuario=${idusuario}`,
    {
      responseType: "json",
    }
  );
  return res.data;
};
//Dependientes
export const getDependientes = async (page: number | string) => {
  try {
    const response = await URLBASE.get(
      `controller/pacientes.php?op=dependientes&page=${page}`,
      {
        responseType: "json",
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getDependienteImg = async (idusuario: any, idpaciente: any) => {
  try {
    const response = await URLBIENI.get("controller/pacienteback", {
      params: {
        op: "cargarImgParentesco",
        idusuario: idusuario,
        idpaciente: idpaciente,
        imestamp: new Date().getTime(),
      },
      responseType: "json",
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const dependiente = async (params: any) => {
  try {
    const response = await URLBASE.post(`/controller/pacientes.php`, params, {
      responseType: "json",
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
