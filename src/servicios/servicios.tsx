import axio from "axios";

export const URLPERFIL =
  "https://toolkit.maxialatam.com/wallethealth/asset/perfiles/";

export const services = axio.create({
  baseURL: "https://toolkit.maxialatam.com/portalcss/api/",
});

export const servicesWh = axio.create({
  baseURL: "https://toolkit.maxialatam.com/wallethealth/",
});

export const authentication = (form: any) =>
  servicesWh.post("/controller/login.php", form, {
    responseType: "json",
  });

export const getPost = (page: any) =>
  servicesWh.get("https://maxialatam.com/conectadoss/wp-json/wp/v2/posts?", {
    headers: {
      Authorization: "Basic cmVkc29jaWFsOk1heGlhMzIxKg==",
      "Content-Type": "application/json",
    },
    params: {
      page: page,
      per_page: 6,
    },
    responseType: "json",
  });

export const registroUsuario = (form: any) =>
  servicesWh.post("/controller/usuarios.php", form, {
    responseType: "json",
  });
/*-AFILIADO------------------------------------------------*/
export const serviciosAfiliados = (form: any) =>
  servicesWh.post("/controller/afiliados.php", form, {
    responseType: "json",
  });

export const getComboAfiliados = () =>
  servicesWh.get("/controller/afiliados.php", {
    params: {
      op: "getCombo",
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getComboAfiliadosId = (id: any, idusuario: any) =>
  servicesWh.get("/controller/afiliados.php", {
    params: {
      op: "getAfiliadoId",
      id: id,
      idusuario: idusuario,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getComboAfiliadosRecientes = () =>
  servicesWh.get("/controller/afiliados.php", {
    params: {
      op: "getAfiliadosRecientes",
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getCentrosProduccion = (id: any, idusuario: any) =>
  servicesWh.get("/controller/afiliados.php", {
    params: {
      op: "getCentroProduccion",
      idafiliado: id,
      idusuario: idusuario,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
/*-IMAGENOLOGIA----------------------------------------*/
export const getImagenologias = (
  idafiliado: any,
  idpaciente: any,
  busqueda: any,
  desde: any,
  hasta: any,
  page: any,
  listado: string,
  cancelToken: any
) =>
  servicesWh.get("/api/interna/api.php", {
    cancelToken: cancelToken.token,
    params: {
      op: "Listado-de-imagenologia-interna",
      idafiliado: idafiliado,
      idpaciente: idpaciente,
      busqueda: busqueda,
      desde: desde,
      hasta: hasta,
      page: page,
      lista: listado,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const serviciosImagenologia = (form: any) =>
  servicesWh.post("/api/interna/api.php", form, {
    responseType: "json",
  });

export const getImagenologiaUlt = (idpaciente: any) =>
  servicesWh.get("/api/interna/api.php", {
    params: {
      op: "Listado-de-imagenologia-interna",
      idpaciente: idpaciente,
      limit: 1,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getImagenologiaUltimoRg = (
  idafiliado: any,
  idpaciente: any,
  cedula: string,
  cancelToken: any
) =>
  servicesWh.get("/controller/actualizacion.php", {
    cancelToken: cancelToken.token,
    params: {
      op: "imagenologia",
      idafiliado: idafiliado,
      idpaciente: idpaciente,
      cedula: cedula,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

/*-LABORATORIO-------------------------------------*/
export const getLaboratorios = (
  idafiliado: any,
  idpaciente: any,
  busqueda: any,
  desde: any,
  hasta: any,
  page: any,
  listado: string,
  cancelToken: any
) =>
  servicesWh.get("/api/interna/api.php", {
    cancelToken: cancelToken.token,
    params: {
      op: "Listado-de-laboratorios-interna",
      idpaciente: idpaciente,
      idafiliado: idafiliado,
      busqueda: busqueda,
      desde: desde,
      hasta: hasta,
      page: page,
      lista: listado,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getLaboratoriosUltimoRg = (
  idafiliado: any,
  idpaciente: any,
  cedula: string,
  cancelToken: any
) =>
  servicesWh.get("/controller/actualizacion.php", {
    cancelToken: cancelToken.token,
    params: {
      op: "labortatorio",
      idafiliado: idafiliado,
      idpaciente: idpaciente,
      cedula: cedula,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getLaboratorioUlt = (idpaciente: any) =>
  servicesWh.get("/api/interna/api.php", {
    params: {
      op: "Listado-de-laboratorios-interna",
      idpaciente: idpaciente,
      limit: 1,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const serviciosLaboratorio = (form: any) =>
  servicesWh.post("/api/interna/api.php", form, {
    responseType: "json",
  });
/*-CONSULTAS---------------------------------------------*/
export const getConsultas = (
  idafiliado: any,
  idpaciente: any,
  busqueda: any,
  desde: any,
  hasta: any,
  page: any,
  listado: string,
  cancelToken: any
) =>
  servicesWh.get("/api/interna/api.php", {
    cancelToken: cancelToken.token,
    params: {
      op: "listado-consultas-interna",
      idafiliado: idafiliado,
      idpaciente: idpaciente,
      busqueda: busqueda,
      desde: desde,
      hasta: hasta,
      page: page,
      lista: listado,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getConsultasUltimoRg = (
  idafiliado: any,
  idpaciente: any,
  cedula: string,
  cancelToken: any
) =>
  servicesWh.get("/controller/actualizacion.php", {
    cancelToken: cancelToken.token,
    params: {
      op: "consulta",
      idafiliado: idafiliado,
      idpaciente: idpaciente,
      cedula: cedula,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

/*export const getConsultasSinTokenCancel = (
  idafiliado: any,
  idpaciente: any,
  busqueda: any,
  desde: any,
  hasta: any,
  page: any
) =>
  servicesWh.get("/api/interna/api.php", {
    params: {
      op: "listado-consultas-interna",
      idafiliado: idafiliado,
      idpaciente: idpaciente,
      page: page,
      busqueda: busqueda,
      desde: desde,
      hasta: hasta,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });*/

export const getConsultaDetalle = (idconsulta: string) =>
  servicesWh.get("/api/interna/api.php", {
    params: {
      op: "detalle-consulta-interna",
      idconsulta: idconsulta,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const serviciosConsultas = (form: any) =>
  servicesWh.post("/api/interna/api.php", form, {
    responseType: "json",
  });
/*-PACIENTES----------------------------------------------*/
export const getPerfil = (idusuario: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getPerfil",
      id: idusuario,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getPerfilEdicion = (idusuario: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getPerfilEdicion",
      id: idusuario,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getPerfiles = (idusuario: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getPerfiles",
      id: idusuario,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const serviciosPaciente = (form: any) =>
  servicesWh.post("/controller/pacienteback.php", form, {
    responseType: "json",
  });

export const getFichaCompleta = (idusuario: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getFichaCompleta",
      id: idusuario,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
/*-ALERGIAS----------------------------------------------*/
export const getAlergiasPaciente = (id: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getAlergias",
      id: id,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getGrupoAlergias = () =>
  servicesWh.get("/controller/combosback.php", {
    params: {
      op: "gruposdealergias",
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getAlergias = (idgrupo: any) =>
  servicesWh.get("/controller/combosback.php", {
    params: {
      op: "alergias",
      idgrupo: idgrupo,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
/*-ENFERMEDAD----------------------------------------*/
export const getEnfermedadPaciente = (id: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getEnfermedades",
      id: id,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getEnfermedad = (valor: string) =>
  servicesWh.get("/controller/combosback.php", {
    params: { op: "enfermedadescombo", valor: valor },
    responseType: "json",
  });
/*-TRATAMIENTO---------------------------------------*/
export const getMedicamentos = (valor: string) =>
  servicesWh.get("/controller/combosback.php", {
    params: { op: "getMedicamentos", valor: valor },
    responseType: "json",
  });

export const getTratamientosPacientes = (id: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getTratamientos",
      id: id,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getTipoDiagnosticosPacientes = (id: any, tipo: string) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getTipoDiagnostico",
      id: id,
      idtipo: tipo,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
/*-DISCAPACIDAD--------------------------------------*/
export const getDicapacidadPaciente = (id: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getDiscapacidad",
      id: id,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
/*-MIS-MEDICAMENTOS------------------------------*/
export const getMisMedicamentos = (id: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getMisMedicamentos",
      id: id,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

export const getDetailMedicamento = (id: any) =>
  servicesWh.get("/controller/pacienteback.php", {
    params: {
      op: "getMiMedicamentoDetail",
      id: id,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });

/*-MIS-MEDICOS--------------------------------------*/
export const getMisMedicos = (id: any, page: number) =>
  servicesWh.get("/controller/medicosback.php", {
    params: {
      op: "getMedicos",
      idpaciente: id,
      page: page,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
