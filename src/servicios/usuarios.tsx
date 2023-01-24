import { URLBASE } from "./configuracion";

export const getUsuarios = async () => {
  const res = await URLBASE.get("controller/usuarios.php?op=usuarios", {
    responseType: "json",
  });
  return res.data;
};

export const getUsuariosId = async (id: any) => {
  const res = await URLBASE.get(
    `controller/usuarios.php?op=usuarioId&id=${id}`
  );
  return res.data;
};

export const putEditUsuarios = (params: any) =>
  URLBASE.put("/controller/login.php", params, {
    responseType: "json",
  });

export const postAddUsuario = (params: any) =>
  URLBASE.post("/controller/login.php", params, {
    responseType: "json",
  });

export const deleteUsuario = (params: any) =>
  URLBASE.delete(`?op=cuentaRechazar`, params);
