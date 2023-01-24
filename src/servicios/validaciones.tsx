import { URLBASE } from "./configuracion";

export const getValidacionesCuenta = async () => {
  const res = await URLBASE.get("controller/validaciones?op=cuentas", {
    responseType: "json",
  });
  return res.data;
};

export const getValidacionesCuentaId = async (id: any) => {
  const res = await URLBASE.get(`controller/validaciones?op=cuentaId&id=${id}`);
  return res.data;
};

export const createValidacion = (params: any) =>
  URLBASE.post("?op=addValidacion", params);

export const updateValidacion = (params: any) =>
  URLBASE.put(`?op=editValidacion&id=${params.id}`, params);

export const aprobarValidacion = (params: any) =>
  URLBASE.put(`?op=aprobarValidacion&id=${params.id}`, params);

export const deleteValidacion = (id: any) =>
  URLBASE.delete(`?op=deleteValidacion&id=${id}`);

export default URLBASE;
