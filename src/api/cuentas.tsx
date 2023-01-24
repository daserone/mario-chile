import axios from "axios";

const cuentasApi = axios.create({
  baseURL: "https://toolkit.maxialatam.com/bieni/controller/validacionesback",
});

export const getCuentas = async () => {
  const res = await cuentasApi.get("?op=cuentas");
  return res.data;
};

export const getCuentasId = (id: any) =>
  cuentasApi.get(`?op=cuentaId&id=${id}`);

export const putCuentaAprobar = (params: any) =>
  cuentasApi.put(`?op=cuentaAprobar`, params);

export const putCuentaRechazar = (params: any) =>
  cuentasApi.put(`?op=cuentaRechazar`, params);

export default cuentasApi;
