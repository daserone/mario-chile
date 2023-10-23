import axios from "axios";
import { BASEURL } from "./servicios";


export const URLBASE = axios.create({
  baseURL: BASEURL
});

export const URLBIENI = axios.create({
  baseURL: BASEURL,
});

export const URLBIENIPERFIL = `${BASEURL}asset/perfiles/`;
