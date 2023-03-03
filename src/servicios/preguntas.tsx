import { URLBASE } from "./configuracion";

export const getPreguntas = async (tipo: any) => {
  const res = await URLBASE.get(
    `controller/preguntas?op=preguntas&tipo=${tipo}`,
    {
      responseType: "json",
    }
  );
  return res.data;
};
