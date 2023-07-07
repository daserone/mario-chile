import axios from "axios";

export const URLBASE = axios.create({
  baseURL: "https://toolkit.maxialatam.com/bieniweb",
}); //des

export const URLBIENI = axios.create({
  baseURL: "https://toolkit.maxialatam.com/bieni",
});

export const URLBIENIPERFIL =
  "https://toolkit.maxialatam.com/bieni/asset/perfiles/";
