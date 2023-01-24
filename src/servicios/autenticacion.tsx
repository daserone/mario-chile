import { URLBASE } from "./configuracion";

const getAuthentication = async () => {
  const res = await URLBASE.get("?op=dologin");
  return res.data;
};

const postAuthentication = (params: any) =>
  URLBASE.post("controller/login.php", params, {
    responseType: "json",
  });

export { getAuthentication, postAuthentication };
