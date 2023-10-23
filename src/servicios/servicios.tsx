import axio from "axios";
let entornos = { 
  aws: "https://bieniwallet.com/bieniwebback/",
  awsdes: "https://bieniwallet.com/bieniwebbackdes/",
};

export const BASEURL = entornos["aws"];

export const URLPERFIL = `${BASEURL}asset/perfiles/`;

export const services = axio.create({
  baseURL: BASEURL,
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
