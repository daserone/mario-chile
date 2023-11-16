import axios from "axios";
import { BASEURL, BASEURLBIENI } from "./servicios";

export const URLBASE = axios.create({
  baseURL: BASEURL,
});

export const URLBIENI = axios.create({
  baseURL: BASEURLBIENI,
});

export const URLBIENIPERFIL = `${BASEURLBIENI}asset/perfiles/`;
