import axios from "axios";

const validacionesApi = axios.create({
  baseURL: "https://toolkit.maxialatam.com/bieni/controller/validacionesback",
});

export const getValidaciones = async () => {
  const res = await validacionesApi.get("?op=getValidaciones");
  return res.data;
};

export const getValidacionById0 = (id) => validacionesApi.get(`?op=getValidacionId&id=${id}`);

export const getValidacionById = ({ queryKey }) => {
  const [_key, { id }] = queryKey;
  const response = validacionesApi.get(`?op=getValidacionId&id=${id}`);

  return response;
};

export const createValidacion = (Validacion) => validacionesApi.post("?op=addValidacion", Validacion);

export const updateValidacion = (Validacion) => validacionesApi.put(`?op=editValidacion&id=${Validacion.id}`, Validacion);

export const aprobarValidacion = (Validacion) => validacionesApi.put(`?op=aprobarValidacion&id=${Validacion.id}`, Validacion);

export const deleteValidacion = (id) => validacionesApi.delete(`?op=deleteValidacion&id=${id}`);

export default validacionesApi;