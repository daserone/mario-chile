import { URLBASE } from "./configuracion";

export const getPacientes = async (page: number, idusuario: any) => {
  const res = await URLBASE.get(
    `controller/pacientes?op=pacientes&page=${page}&idusuario=${idusuario}`,
    {
      responseType: "json",
    }
  );
  return res.data;
};

export const getPacienteId = async (id: any, idusuario: any) => {
  const res = await URLBASE.get(
    `controller/pacientes?op=pacienteId&id=${id}&idusuario=${idusuario}`,
    {
      responseType: "json",
    }
  );
  return res.data;
};
