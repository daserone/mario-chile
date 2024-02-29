import { format } from "date-fns";
import { es } from "date-fns/locale";

type DateOrString = string | Date | null | undefined;

export const adapterDateTime = (date: DateOrString, formt: string) => {
  try {
    let result = "";

    if (date === null || date === undefined || date === "0000-00-00 00:00:00") {
      return "";
    }

    if (typeof date === "string") {
      // Asigna el tipo de dato a 'auxFecha'
      const fechaArray: string[] = date.split(" ");
      // Asigna el tipo de dato a 'dateTime'
      const dateTime: Date = new Date(
        fechaArray.length > 1 || date.includes("T00:00:00")
          ? `${date}`
          : `${date}T00:00:00`
      );

      result = format(dateTime, formt, { locale: es });
    } else {
      result = format(date, formt, { locale: es });
    }

    return result;
  } catch (e) {
    console.error(e);
  }
};
