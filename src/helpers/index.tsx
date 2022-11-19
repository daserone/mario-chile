import {
  filterNombre,
  formtFechaCorta,
  fechaFrontend,
  fechaImagenologia,
  fechaLaboratorio,
  fechaActual,
  fechaPerfil,
  orderId,
  orderDate,
  removeDuplicado,
  cadenaUpercase,
  tabActive,
  compartir,
  totalDosisTratamiento,
  fechaDiaAdd,
  imgPerfil,
  calcularEdad,
} from "./helpers";
import {
  tablaFrecuencia,
  meses,
  grupoSanguineos,
  grupodiscapacidad,
} from "./tablasHash";
import {
  INITIALPERFIL,
  SLIDEOPTS,
  INITIALCREARPERFIL,
  NOTAB,
  FORMTRATAMIENTOS,
  FORMNIVELES,
  INITIALIMAGENOLOGIA,
  INITIALLABORATORIO,
  INITIALCONSULTA,
} from "./const";
import { valEnfermedad, valTratamiento } from "./validacion";
import { fetchWrapper } from "./fetchWrapper";
export {
  /*-HELPERS-----------------------*/
  filterNombre,
  formtFechaCorta,
  fechaFrontend,
  fechaActual,
  fechaImagenologia,
  fechaLaboratorio,
  fechaPerfil,
  orderId,
  orderDate,
  removeDuplicado,
  cadenaUpercase,
  tabActive,
  compartir,
  totalDosisTratamiento,
  fechaDiaAdd,
  imgPerfil,
  calcularEdad,
  /*-TABLA-HASH------------------*/
  meses,
  tablaFrecuencia,
  grupoSanguineos,
  grupodiscapacidad,
  /*-CONSTANTES-----------------*/
  INITIALPERFIL,
  SLIDEOPTS,
  INITIALCREARPERFIL,
  NOTAB,
  FORMTRATAMIENTOS,
  FORMNIVELES,
  INITIALIMAGENOLOGIA,
  INITIALLABORATORIO,
  INITIALCONSULTA,
  /*-VALIDACIONES---------------*/
  valEnfermedad,
  valTratamiento,
  /*-BACK---------------*/
  fetchWrapper
};
