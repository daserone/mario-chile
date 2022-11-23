import axios from "axios";

const nivelesApi = axios.create({
  baseURL: "https://toolkit.maxialatam.com/bieni/controller/nivelesback",
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

export const createNivel = (Nivel) => nivelesApi.post("?op=addNivel", Nivel);

export const updateNivel = (Nivel) =>
  nivelesApi.put(`?op=editNivel&id=${Nivel.id}`, Nivel);

export const deleteNivel = (id) => nivelesApi.delete(`?op=deleteNivel&id=${id}`);

export default nivelesApi;