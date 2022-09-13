import { meses } from "./tablasHash";
import { add, format } from "date-fns";
import { URLPERFIL } from "../servicios";
/*-FECHA---------------------------------------------------*/
export const formtFechaCorta = (fecha: any) => {
  if (fecha != null && fecha !== "") {
    let f = new Date(fecha);
    let nueva = "";
    const [dia, mes, yy] = f.toLocaleDateString().split("/");
    nueva = `${yy}-${mes}-${dia}`;
    return nueva;
  } else {
    return "";
  }
};

export const fechaFrontend = (fecha: any) => {
  let nueva = "";
  if (fecha != null && fecha !== "") {
    let f = new Date(fecha);
    const [dia, mes, yy] = f.toLocaleDateString().split("/");
    nueva = `${dia}-${mes}-${yy}`;
    return nueva;
  } else {
    return nueva;
  }
};

export const fechaImagenologia = (fecha: any) => {
  if (fecha != null && fecha !== "") {
    const [dia, mes, yy] = fecha.split("-");
    return { daymonth: `${dia} ${mes}`, yy: `20${yy}` };
  } else {
    return { daymonth: "", yy: "" };
  }
};

export const fechaLaboratorio = (fecha: any) => {
  if (fecha != null && fecha !== "") {
    const [fch] = fecha.split(" ");
    const [dia, mes, yy] = fch.split("/");
    return { daymonth: `${dia} ${meses[mes]}`, yy: `20${yy}` };
  } else {
    return { daymonth: "", yy: "" };
  }
};

export const fechaActual = () => {
  let fecha = new Date();
  let options: any = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  return fecha.toLocaleDateString("es-ES", options);
};

export const fechaPerfil = (data: string) => {
  if (data === "0000-00-00") return null;
  if (data !== "") {
    let fecha = new Date(data);
    const formt = fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formt;
  }
};

export const fechaDiaAdd = (fecha: any, dias: any) => {
  let formato = new Date(fecha);
  const result = add(formato, {
    years: 0,
    months: 0,
    weeks: 0,
    days: dias,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  let frontend = format(result, "dd/MM/yyyy");
  let backend = format(result, "yyyy-MM-dd");

  return { frontend, backend };
};
/*-FUNCIONES-MATRIZ------------------------------*/
export const orderId = (data: any) => {
  return data.sort((a: any, b: any) => b.id - a.id);
};

export const orderDate = (data: any) => {
  const clone = data
    .sort((a: any, b: any) => {
      if (new Date(a.fechas).getTime() === new Date(b.fechas).getTime()) {
        return 0;
      }
      if (new Date(a.fechas).getTime() > new Date(b.fechas).getTime()) {
        return -1;
      }
      return 1;
    })
    .slice(0, 1);
  return clone;
};
export const filterNombre = (id: any, data: any) => {
  let filter: any = data.filter((item: any) => item.value === id);
  if (filter.length > 0) {
    const [item] = filter;
    return item.label;
  }
};
/*export const removeDuplicado = (data: any) => {
  return data.filter(
    (item: any, index: number) => data.indexOf(item) === index
  );
};*/
export const removeDuplicado = (data: any) => {
  return data.reduce(
    (partial: any, item: any) =>
      partial.includes(item) ? partial : [...partial, item],
    []
  );
};

export function removeDuplicates(originalArray: any, prop: string) {
  let newArray = [];
  let lookupObject: any = {};

  for (let i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (let i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

export const cadenaUpercase = (text: string) => {
  let cadena = text.trim().split(" ");
  let formato = cadena
    .map((palabra: any) => {
      palabra = palabra.replaceAll("\u200BPOLICLINICA", "POLICLÍNICA");
      palabra = palabra.replaceAll("Policlinica", "Policlínica");
      palabra = palabra.replaceAll("MEDICO", "MÉDICO");

      return palabra.length <= 2
        ? palabra.toLowerCase()
        : palabra.substring(0, 1).toUpperCase() +
            palabra.substring(1).toLowerCase();
    })
    .join(" ");
  return formato;
};
/*-TAB------------------------------------------------*/
export const tabActive = (ruta: string, pathname: string) => {
  if (ruta === pathname) {
    return "active";
  } else {
    return "";
  }
};
/*-COMPARTIR---------------------------------------*/
export const compartir = (url: string) => {
  let Navigator: any;
  Navigator = window.navigator;

  if (Navigator && Navigator.share) {
    Navigator.share({
      title: `Comparit estudio`,
      url: url,
    })
      .then(() => console.log("Successful share"))
      .catch((error: string) => console.log("Error sharing", error));
  } else {
    console.log("share not supported");
  }
};
/*-TRATAMIENTO------------------------------------*/
export const totalDosisTratamiento = (
  dosis: number,
  cadaHora: number,
  recetaDuracion: number
) => {
  let totalDosis: number = 0;
  if (dosis !== 0 && cadaHora !== 0 && recetaDuracion !== 0) {
    if (cadaHora !== 0) {
      totalDosis = (dosis * (recetaDuracion * 24)) / cadaHora;
    }
  }
  return Math.round(totalDosis);
};
/*-UTIL-----------------------------------------------*/
function isValidURL(cadena: any) {
  var res = cadena.match(/(http(s)?:\/\/.)/g);
  return res !== null;
}

export const imgPerfil = (imagen: string, idpaciente: string) => {
  const foto =
    imagen === ""
      ? "./images/avatar-default.png"
      : isValidURL(imagen)
      ? imagen
      : `${URLPERFIL}${idpaciente}/${imagen}`;
  return foto;
};

export const calcularEdad = (fecha: string) => {
  let salida = "";
  let fechaArr = fecha.split("-");

  let ano = parseInt(fechaArr[0]);
  let mes = parseInt(fechaArr[1]);
  let dia = parseInt(fechaArr[2]);

  let now = new Date();
  let anoactual = now.getFullYear();
  let mesactual = now.getMonth() + 1;
  let diaactual = now.getDate();

  let diassalida = 0;
  let messalida = 0;
  let anosalida = 0;

  if (anoactual === ano && mesactual === mes && diaactual === dia) {
    //recien nacido
    salida = "Nacido hoy";
  } else if (anoactual === ano && mesactual === mes && diaactual > dia) {
    //dias en el mismo mes
    diassalida = diaactual - dia;
    if (diassalida === 1) {
      salida = "1 día";
    } else {
      salida = diassalida + " días";
    }
  } else if (
    anoactual === ano &&
    mesactual > mes &&
    mesactual - mes <= 1 &&
    diaactual < dia
  ) {
    //dias   en dos meses
    let diastemp = new Date(ano, mes, 0).getDate();
    diassalida = diastemp - dia + diaactual;

    if (diassalida === 1) {
      salida = diassalida + " día";
    } else {
      salida = diassalida + " días";
    }
  } else if (anoactual === ano && mesactual > mes && diaactual >= dia) {
    //mismo año meses cumplidos
    messalida = mesactual - mes;

    if (messalida === 1) {
      salida = "1 mes";
    } else {
      salida = messalida + " meses";
    }
  } else if (anoactual === ano && mesactual > mes && diaactual < dia) {
    //mismo año meses no cumplidos
    messalida = mesactual - mes - 1;

    if (messalida === 1) {
      salida = "1 mes";
    } else {
      salida = messalida + " meses";
    }
  } else if (anoactual - ano === 1 && mesactual > mes) {
    //meses cumplidos en dos años distintos
    salida = "1 año";
  } else if (anoactual - ano === 1 && mesactual < mes && diaactual >= dia) {
    //meses cumplidos en dos años distintos

    messalida = 12 - mes + mesactual;
    if (messalida === 1) {
      salida = messalida + " mes";
    } else {
      salida = messalida + " meses";
    }
  } else if (anoactual - ano === 1 && mesactual < mes && diaactual < dia) {
    //meses cumplidos en dos años distintos
    messalida = 12 - mes + mesactual - 1;
    if (messalida === 1) {
      salida = messalida + " mes";
    } else {
      salida = messalida + " meses";
    }
  } else if (anoactual - ano === 1 && mesactual === mes && diaactual < dia) {
    // aun no cumple pero esta en los proximos dias - 1 año  cumplido en dos años distintos
    salida = "11 meses";
  } else if (anoactual - ano === 1 && mesactual === mes && diaactual >= dia) {
    //1 año  cumplido en dos años distintos
    salida = "1 año";
  } else if (anoactual - ano > 1 && mesactual > mes) {
    //mas de un año despues de cumpleaños
    anosalida = anoactual - ano;
    if (anosalida === 1) {
      salida = anosalida + " año";
    } else {
      salida = anosalida + " años";
    }
  } else if (anoactual - ano > 1 && mesactual === mes && diaactual >= dia) {
    //mas de un año despues de cumpleaños
    anosalida = anoactual - ano;
    if (anosalida === 1) {
      salida = anosalida + " año";
    } else {
      salida = anosalida + " años";
    }
  } else if (anoactual - ano > 1 && mesactual === mes && diaactual < dia) {
    //mas de un año cumplido antes de cumplir este año en el mismo mes de cumplezños
    anosalida = anoactual - ano - 1;
    if (anosalida === 1) {
      salida = anosalida + " año";
    } else {
      salida = anosalida + " años";
    }
  } else if (anoactual - ano > 1 && mesactual < mes) {
    //mas de un año cumplido antes de cumplir este año meses antes del que cumpleaños
    anosalida = anoactual - ano - 1;
    if (anosalida === 1) {
      salida = anosalida + " año";
    } else {
      salida = anosalida + " años";
    }
  }
  let edad = "";
  let edadTipo = "";
  if (salida === "Nacido hoy") {
    edadTipo = "Nacido hoy";
  } else {
    let arrsalida = salida.split(" ");
    edad = arrsalida[0];
    if (arrsalida[1] === "día" || arrsalida[1] === "días") {
      edadTipo = "Día(s)";
    } else if (arrsalida[1] === "mes" || arrsalida[1] === "meses") {
      edadTipo = "Mes(es)";
    } else if (arrsalida[1] === "año" || arrsalida[1] === "años") {
      edadTipo = "Año(s)";
    }
  }
  return {
    edad,
    edadTipo,
  };
};
