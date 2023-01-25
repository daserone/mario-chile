import { URLBASE } from "./configuracion";

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

export const updateValidacionDependienteAprobar = (params: any) =>
  URLBASE.post("/controller/validaciones", params, {
    responseType: "json",
  });

export const updateValidacionDependienteRechazar = (params: any) =>
  URLBASE.post("/controller/validaciones", params, {
    responseType: "json",
  });
