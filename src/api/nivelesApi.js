import axios from "axios";
import { ENTORNO } from "./config";

const nivelesApi = axios.create({
  baseURL: `${ENTORNO}/controller/nivelesback`,
});

export const getNiveles = async () => {
  const res = await nivelesApi.get("?op=getNiveles");
  return res.data;
};

export const getNivelById0 = (id) => nivelesApi.get(`?op=getNivelId&id=${id}`);

export const getNivelById = ({ queryKey }) => {
  const [_key, { id }] = queryKey;
  const response = nivelesApi.get(`?op=getNivelId&id=${id}`);

  return response;
};

export const createNivel = (params) => nivelesApi.post("?op=addNivel", params);

export const updateNivel = (params) =>
  nivelesApi.put(`?op=editNivel&id=${params.id}`, params);

export const deleteNivel = (id) =>
  nivelesApi.delete(`?op=deleteNivel&id=${id}`);

export default nivelesApi;
