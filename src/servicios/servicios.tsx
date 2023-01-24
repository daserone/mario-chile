import axio from "axios";

export const BASEURL = "https://toolkit.maxialatam.com/bieni/";

export const URLPERFIL = "https://toolkit.maxialatam.com/bieni/asset/perfiles/";

export const services = axio.create({
  baseURL: "https://toolkit.maxialatam.com/bieni/",
});

export const authentication = (form: any) =>
  services.post("/controller/login.php", form, {
    responseType: "json",
  });

export const serviciosPaciente = (form: any) =>
  services.post("/controller/pacienteback.php", form, {
    responseType: "json",
  });
//
export const getFichaCompleta = (idusuario: any) =>
  services.get("/controller/pacienteback.php", {
    params: {
      op: "getFichaCompleta",
      id: idusuario,
      imestamp: new Date().getTime(),
    },
    responseType: "json",
  });
