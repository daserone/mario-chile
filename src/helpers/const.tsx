/*-FORMULARIOS------------*/
export const INITIALPERFIL = {
  nombre: "",
  cedula: "",
  fechanacimiento: "",
  gruposangre: "",
  numeroemergencia: "",
  imagen: "",
  edad: "",
  fecha: null,
  discapacidad: "",
  alergias: "",
};

export const INITIALCREARPERFIL = {
  nombre: "",
  apellido: "",
  cedula: "",
  fechanacimiento: "",
  edad: "",
  gruposangre: "",
};
export const FORMTRATAMIENTOS = {
  dosis: 0,
  cada: 0,
  totaldosis: 0,
  fechainicio: null,
  duracion: 0,
  fechafin: null,
  fechafinBackend: null,
  notas: "",
};

export const FORMNIVELES = {
  nombre: "",
  descripcion: "",
  estatus: 1,
};

export const NOTAB = [
  "/app/home",
  "/app/soporte",
  "/app/cuentas",
  "/app/imagenologia",
  "/app/perfil-crear",
];

export const INITIALIMAGENOLOGIA = {
  id: "",
  unidad: "",
  conimagen: "",
  estado: "",
  estudio: "",
  fecha: "",
  url: "",
  year: "",
};

export const INITIALLABORATORIO = {
  id: "",
  estado: "",
  fecha: "",
  medico: "",
  reporte: "",
  servicio: "",
  tipopaciente: "",
  unidad: "",
  url: "",
  year: "",
};

export const INITIALCONSULTA = {
  id: "",
  idunidad: "",
  centro: "",
  profesionalsalud: "",
  tipoprofecional: "",
  consulta: "",
  motivo: "",
  observaciones: "",
  diagnosticos: "",
  tratamientos: "",
  fecha: "",
  year: "",
  hora: "",
};
/*-CONFIGURACION---------*/
export const CONFIGNOTIFICACION = {
  duration: 4000,
};
