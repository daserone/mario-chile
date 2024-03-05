import axio from "axios";

const service = axio.create({
  baseURL: "https://bieniwallet.com/bieniwebbackdes/",
  //baseURL: "http://localhost/bieniwebback/",
});

const serviceBieni = axio.create({
  baseURL: "https://bieniwallet.com/bienibackdes/",
});

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

export { service, serviceBieni, buildUrl, templateData, endpoint };
