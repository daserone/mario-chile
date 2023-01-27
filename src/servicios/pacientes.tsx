import { URLBASE } from "./configuracion";

export const getPacientes = async (page: number) => {
  const res = await URLBASE.get(
    `controller/pacientes?op=pacientes&page=${page}`,
    {
      responseType: "json",
    }
  );
  return res.data;
};

export const getPacienteId = async (id: any) => {
  const res = await URLBASE.get(
    `controller/pacientes?op=pacienteId&id=${id},`,
    {
      responseType: "json",
    }
  );
  return res.data;
};
