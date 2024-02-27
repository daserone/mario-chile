const buildUrl = (url: string, op: string, parameters = {}) => {
  const queryString = new URLSearchParams(parameters).toString();
  return `${url}?op=${op}&${queryString}`;
};

const templateData = {
  data: [],
  recordsTotals: 0,
  recordsFiltered: 0,
  currentPage: 0,
};

const endpoint = {
  usuario: "/controller/usuarios.php",
  paciente: "/controller/pacientes.php",
  login: "controller/login.php",
};

export { buildUrl, templateData, endpoint };
