import { service } from "@src/config/service.config";
import { LoginRequest } from "@src/models";

const endpoint = {
  login: "token",
  user: "users/me",
  createUser: "create_user",
  getUsers: "get_users?company_name=",
};

export const doLogin = (form: LoginRequest) => {
  let formData = new FormData();
  formData.append("username", form.username);
  formData.append("password", form.password);
  return service.post(endpoint.login, formData, {
    responseType: "json",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUsuarios = async ({ ...parameters }) => {
  console.log(parameters);
  let company_name = parameters.company_name;
  let page = parameters.page;
  let items = parameters.items;
  let filter = parameters.filter;

  const response = await service.get(
    `get_users?company_name=${company_name}&page=${page}&items=${items}&filter=${filter}`,
    {
      responseType: "json",
    }
  );
  if (response.status >= 200 && response.status < 300) {
    console.log();

    return response?.data ?? {};
  } else {
    throw new Error(`Error al obtener usuarios: ${response.statusText}`);
  }
};

export const getUser = async ({ ...parameters }) => {
  const response = await service.get(endpoint.user, { responseType: "json" });
  if (response.status >= 200 && response.status < 300) {
    return response?.data ?? {};
  } else {
    throw new Error(`Error al obtener usuario: ${response.statusText}`);
  }
};
export const createUser = (form: any) =>
  service.post(endpoint.createUser, form, {
    responseType: "json",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
