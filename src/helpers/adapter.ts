import { format } from "date-fns";
import { es } from "date-fns/locale";

type DateOrString = string | Date | null | undefined;

export const formatDate = (date: DateOrString, formt: string) => {
  try {
    let result = "";

    if (date === null || date === undefined || date === "0000-00-00 00:00:00") {
      return "";
    }

    if (typeof date === "string") {
      // 2024-03-31T11:18:22-03:00

      // remove -03:00

      const dateTime = new Date(date);

      result = format(dateTime, formt, { locale: es });
    } else {
      result = format(date, formt, { locale: es });
    }

    return result;
  } catch (e) {
    console.error(e);
  }
};

// only date
export const adapterDate = (date: DateOrString) => {
  console.log(date);

  return formatDate(date, "dd/MM/yyyy");
};

// only time
export const adapterTime = (date: DateOrString) => {
  // 10:20 am/pm
  return formatDate(date, "hh:mm a");
};

// date and time

export const adapterDateTime = (date: DateOrString) => {
  return formatDate(date, "dd/MM/yyyy HH:mm a");
};
