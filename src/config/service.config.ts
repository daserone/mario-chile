import useAuth from "@src/@core/hooks/useAuth";
import axio from "axios";
import { useNavigate } from "react-router-dom";

const TOKEN_KEY = process.env.NOWLI_TOKEN_KEY;
const BASE_URL = process.env.NOWLI_URL_DEV;
const BASE_URL_LOCAL = process.env.NOWLI_URL_LOCAL;
const USER_KEY = process.env.NOWLI_USER_KEY;

const entornos = {
  local: BASE_URL_LOCAL,
  dev: BASE_URL,
  prod: "",
};

const service = axio.create({
  baseURL: entornos["local"],
});
// interceptor;
service.interceptors.request.use(
  (config) => {
    if (config.url === endpoint.login) {
      return config;
    }

    const token = localStorage.getItem(TOKEN_KEY!) ?? "";

    console.log(token);

    if (token !== "") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY!);
      localStorage.removeItem(USER_KEY!);
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

const templateData = {
  data: [],
  recordsTotals: 0,
  recordsFiltered: 0,
  currentPage: 0,
};

const endpoint = {
  login: "token",
};

export { service, templateData };
