import axios from "axios";

const afiliadosApi = axios.create({
  baseURL: "https://toolkit.maxialatam.com/bieni/controller/afiliadosback",
});

export const getAfiliados = async () => {
  const res = await afiliadosApi.get("?op=getAfiliados");
  return res.data;
};

export const getAfiliadoById = ({ queryKey }) => {
  const [_key, { id }] = queryKey;
  const response = afiliadosApi.get(`?op=getAfiliadoId&id=${id}`);

  return response;
};

export const createAfiliado = (Afiliado) => afiliadosApi.post("?op=addAfiliado", Afiliado);

export const updateAfiliado = (Afiliado) =>
  afiliadosApi.put(`?op=editAfiliado&id=${Afiliado.id}`, Afiliado);

export const deleteAfiliado = (id) => afiliadosApi.delete(`?op=deleteAfiliado&id=${id}`);

export default afiliadosApi;