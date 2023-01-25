import { URLBASE, URLBIENI } from "./configuracion";

export const getValidacionesDependiente = async () => {
  const res = await URLBASE.get("controller/validaciones?op=dependientes", {
    responseType: "json",
  });
  return res.data;
};

export const getValidacionDependienteId = async (id: any) => {
  const res = await URLBASE.get(
    `controller/validaciones?op=dependienteId&id=${id}`,
    {
      responseType: "json",
    }
  );
  return res.data;
};

export const getImgDependiente = (idusuario: any, idpaciente: any) =>
  URLBIENI.get("controller/pacienteback", {
    params: {
      op: "cargarImgParentesco",
      idusuario: idusuario,
      idpaciente: idpaciente,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const updateValidacionDependienteAprobar = (params: any) =>
  URLBASE.post("/controller/validaciones", params, {
    responseType: "json",
  });

export const updateValidacionDependienteRechazar = (params: any) =>
  URLBASE.post("/controller/validaciones", params, {
    responseType: "json",
  });
