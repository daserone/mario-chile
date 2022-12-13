import { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { servicesWh } from "../../servicios/servicios";
import { doLogin } from "../../store/action/aut";
import { imgPerfil } from "../../helpers";
import "./cuentas.css";
const Cuentas = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [load, setLoad] = useState<Boolean>(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setLoad(true);
    servicesWh
      .get("/controller/login.php", {
        params: {
          op: "getCuentas",
          id: user.id,
          correo: user.correo,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      })
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setData(data.data);
            setLoad(false);
          } else {
            setLoad(false);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  }, [user]);

  const handleClic = (item: any) => {
    let nueva = Object.assign({}, user, item);
    dispatch(doLogin(nueva));
    history.replace("/app/home");
  };

  const handelNuevoPerfil = () => {
    history.push("/app/cuenta-crear");
  };
  return (
    <IonPage className="fondo__cuentas">
      <IonContent fullscreen>
        <IonGrid className="pb-4 text-white">
          <div className="inicio-logo">
            <IonRow>
              <IonCol
                size="12"
                className="headingText text-center mt-5 pt-5 mb-5"
                style={{
                  color: "#293f76",
                  fontSize: "18px",
                }}
              >
                {/*<img src="./images/logo-bieni.svg" alt="imagen" className="mt-5 filter-white" width={92} />*/}
                <svg
                  className="mt-5"
                  id="Grupo_3140"
                  data-name="Grupo 3140"
                  xmlns="http://www.w3.org/2000/svg"
                  width="92"
                  height="126.652"
                  viewBox="0 0 92 126.652"
                >
                  <defs>
                    <clipPath id="clip-path">
                      <rect
                        id="Rectángulo_3464"
                        data-name="Rectángulo 3464"
                        width="92"
                        height="126.652"
                        fill="#fff"
                      />
                    </clipPath>
                  </defs>
                  <g
                    id="Grupo_3139"
                    data-name="Grupo 3139"
                    clipPath="url(#clip-path)"
                  >
                    <path
                      id="Trazado_7246"
                      data-name="Trazado 7246"
                      d="M133.791,16.764c5.973,0,9.221-2.933,9.221-8.383S139.764,0,133.686,0c-5.344,0-8.906,2.933-8.906,8.486,0,5.239,3.458,8.278,9.011,8.278"
                      transform="translate(-51.012 0)"
                      fill="#fff"
                    />
                    <path
                      id="Trazado_7247"
                      data-name="Trazado 7247"
                      d="M8.906,185.876c-5.343,0-8.906,2.933-8.906,8.487,0,5.239,3.458,8.277,9.011,8.277,5.973,0,9.221-2.933,9.221-8.382s-3.248-8.382-9.325-8.382"
                      transform="translate(0 -75.988)"
                      fill="#fff"
                    />
                    <path
                      id="Trazado_7248"
                      data-name="Trazado 7248"
                      d="M76.929,92.346a11.191,11.191,0,0,1-22.381,0V71.267a25.7,25.7,0,1,0-51.4,0V118.04H17.658V71.267a11.191,11.191,0,1,1,22.381,0V92.346a25.7,25.7,0,0,0,51.4,0V45.65H76.929Z"
                      transform="translate(-1.288 -18.629)"
                      fill="#fff"
                    />
                  </g>
                </svg>
                <p className="titulo mt-2 fs-36 text-white">Bieni</p>
                <p className="info mt-5 mx-3 px-5 fs-18 text-white">
                  Todos tus registros médicos en un solo lugar
                </p>
              </IonCol>
            </IonRow>
          </div>
          <div className="box-info">
            <IonRow className="mt-4 px-3">
              <IonCol size="12" className="pb-3">
                <p className="font-w700 text-white mt-3 mb-0 fs-32">
                  Bienvenido
                </p>
                <p className="fs-20 text-white">
                  {data.length > 0
                    ? "A qué perfil deseas ingresar"
                    : "Actualmente no cuenta con un perfil"}
                </p>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center p-4">
              {load ? (
                <IonCol>
                  <div>Cargando...</div>
                </IonCol>
              ) : data.length > 0 ? (
                data.map((item: any, index: number) => (
                  <IonCol
                    className="p-4 p-perfil"
                    key={index}
                    onClick={() => {
                      handleClic(item);
                    }}
                  >
                    <div className="box-perfiles cursor-pointer">
                      <img
                        src={imgPerfil(item.imagen, item.idpaciente)}
                        className="mb-2"
                        alt={item.imagen}
                      />
                      <IonLabel className="fs-16">{item.nombre}</IonLabel>
                    </div>
                  </IonCol>
                ))
              ) : null}
              {!load && (
                <IonCol className="p-4 p-perfil">
                  <div
                    className="box-perfiles cursor-pointer"
                    onClick={handelNuevoPerfil}
                  >
                    <img
                      src={`./images/nuevo-usuario.jpg`}
                      className="mb-2"
                      alt="nuevo"
                    />
                    <IonLabel className="fs-16">Crear nuevo perfil</IonLabel>
                  </div>
                </IonCol>
              )}
            </IonRow>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Cuentas;
