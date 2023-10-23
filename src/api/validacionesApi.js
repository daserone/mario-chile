import axios from "axios";
import { BASEURL } from "../../servicios";

const validacionesApi = axios.create({
  baseURL: `${BASEURL}controller/validaciones.php`
});

export const getValidaciones = async () => {
  const res = await validacionesApi.get("?op=getValidaciones");
  return res.data;
};

export const getValidacionById0 = (id) =>
  validacionesApi.get(`?op=getValidacionId&id=${id}`);

export const getValidacionById = ({ queryKey }) => {
  const [_key, { id }] = queryKey;
  const response = validacionesApi.get(`?op=getValidacionId&id=${id}`);

  return response;
};

export const createValidacion = (params) =>
  validacionesApi.post("?op=addValidacion", params);

export const updateValidacion = (params) =>
  validacionesApi.put(`?op=editValidacion&id=${params.id}`, params);

export const aprobarValidacion = (params) =>
  validacionesApi.put(`?op=aprobarValidacion&id=${params.id}`, params);

export const deleteValidacion = (id) =>
  validacionesApi.delete(`?op=deleteValidacion&id=${id}`);

export default validacionesApi;
