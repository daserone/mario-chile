import { URLBASE } from "./configuracion";

export const getValidacionesCuenta = async () => {
  const res = await URLBASE.get("controller/validaciones?op=cuentas", {
    responseType: "json",
  });
  return res.data;
};

export const getValidacionesCuentaId = async (id: any) => {
  const res = await URLBASE.get(
    `controller/validaciones?op=cuentaId&id=${id},`,
    {
      responseType: "json",
    }
  );
  return res.data;
};

export const updateValidacionCuentaAprobar = (params: any) =>
  URLBASE.post("/controller/validaciones", params, {
    responseType: "json",
  });

export const updateValidacionCuentaRechazar = (params: any) =>
  URLBASE.post("/controller/validaciones", params, {
    responseType: "json",
  });
