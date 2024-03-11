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
  //usuario: "/src/usuarios.php",
  usuario: "/src/usuario/",
  paciente: "/src/pacientes.php",
  login: "src/login.php",
  difusion: "src/difusion/",
};

export { service, serviceBieni, buildUrl, templateData, endpoint };
