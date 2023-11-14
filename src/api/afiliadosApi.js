import axios from "axios";
import { BASEURL } from "../servicios";

const afiliadosApi = axios.create({
  baseURL: `${BASEURL}controller/afiliadosback.php`
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