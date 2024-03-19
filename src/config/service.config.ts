import axio from "axios";

const TOKEN_KEY = process.env.BIENI_TOKEN_KEY;
const BASE_URL = process.env.BIENI_URL_DEV;
const BASE_URL_LOCAL = process.env.BIENI_URL_LOCAL;

const entornos = {
  local: BASE_URL_LOCAL,
  dev: BASE_URL,
  prod: "",
};

const service = axio.create({
  baseURL: entornos["dev"],
});
// interceptor;
service.interceptors.request.use(
  (config) => {
    if (config.url === endpoint.login) {
      return config;
    }

    const token = localStorage.getItem(TOKEN_KEY!) ?? "";

    if (token !== "") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

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
  paciente: "/src/pacientes.php",
  login: "src/login.php",
  usuario: "/src/usuario/",
  difusion: "src/difusion/",
  pacientes: "/src/paciente/",
};

export { service, serviceBieni, buildUrl, templateData, endpoint };
