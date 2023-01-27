export const tablaFrecuencia = {
  1: "Primera vez",
  2: "Subsecuente",
  3: "Orient.Diagnóstica",
};
export const meses: any = {
  "01": "Ene",
  "02": "Feb",
  "03": "Mar",
  "04": "Abr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Ago",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dic",
};

export const grupoSanguineos = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
];

export const grupodiscapacidad = [
  { value: "1", label: "Auditiva" },
  { value: "2", label: "Intelectual" },
  { value: "3", label: "Física" },
  { value: "4", label: "Mental" },
  { value: "5", label: "Visual" },
  { value: "6", label: "Visceral" },
];

export const obtenerEstadoVerificacion = (id: any) => {
  console.log(typeof id);
  const map: any = {
    1: "badge badge-primary", //aprobado
    2: "badge badge-danger", //no aprobado
    3: "badge badge-info", //en espera de aprobacion
  };
  return map[id] ?? "N/A";
};
