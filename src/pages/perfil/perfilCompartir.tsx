import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonToast,
  IonHeader,
  IonImg,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPerfil, getPerfiles, URLPERFIL } from "../../servicios";
import { INITIALPERFIL, imgPerfil } from "../../helpers";
//import {  URLPERFIL } from "../../servicios/servicios";
import "./perfil.css";

const PerfilCompartir = () => {
  const history = useHistory();
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const handelFichaCompleta = () => {
    history.push("/app/ficha-completa");
  };
  const handleEditar = () => {
    history.push("/app/perfil-editar");
  };
  const handelPerfil = () => {
    history.push("/app/perfil");
  };
  const [perfil, setPerfil] = useState(INITIALPERFIL);
  const [perfiles, setPerfiles] = useState([]);

  useEffect(() => {
    Promise.all([getPerfil(user.idpaciente), getPerfiles(user.id)])
      .then((rsp: any) => {
        const [prfil, prfiles] = rsp;
        setPerfil(prfil.data.data);
        setPerfiles(prfiles.data.data);
      })
      .catch((error) => {
        console.error("Error en triple peticion" + error);
      });
  }, [user]);

  const FOTO = imgPerfil(perfil.imagen, user.idpaciente);

  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-20 font-w600 text-center">
              Perfil
              <span className="position-absolute mr-3" style={{ right: "0px" }}>
                <IonImg
                  src={"./images/x-light.svg"}
                  className="filter-white cursor-pointer"
                  onClick={handelPerfil}
                />
              </span>
            </IonTitle>
          </IonToolbar>
          <div className="mx-3 pb-2 text-white d-flex">
            <div className="">
              <img src={FOTO} alt="imagen" />
            </div>

            <div className="w-100 ml-3 float-right d-grid">
              <p className="fs-16 font-w500 mb-1">{perfil?.nombre}</p>
              <div className="">
                <span className="fs-14 float-left">Edad:</span>
                <span className="fs-14 float-right">{perfil?.edad} años</span>
              </div>
              <div className="">
                <span className="fs-14 float-left">Cédula:</span>
                <span className="fs-14 float-right">{perfil?.cedula}</span>
              </div>
              <div className="pb-2 border-bottom">
                <span className="fs-14 float-left">
                  Grupo Sangu&iacute;neo:
                </span>
                <span className="fs-14 float-right text-uppercase">
                  {perfil?.gruposangre}
                </span>
              </div>
              <div className="pt-2">
                <span
                  className="fs-12 float-left text-underline cursor-pointer"
                  onClick={handelFichaCompleta}
                >
                  Ver ficha completa
                </span>
                <span
                  className="fs-12 float-right text-underline cursor-pointer"
                  onClick={handleEditar}
                >
                  Editar
                </span>
              </div>
            </div>
          </div>
          <IonRow className="mt-2 pb-3">
            <IonCol size="12" className="px-3">
              <p className="mt-1 text-center fs-15 font-w600">
                {user.idpaciente !== "" && perfil.cedula !== "" ? (
                  <img
                    src={`${URLPERFIL}${user.idpaciente}/qr/${perfil.cedula}qr.png`}
                    alt="imagen"
                  />
                ) : null}
              </p>
            </IonCol>
          </IonRow>
        </div>
      </IonHeader>

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-3 px-3">
            <IonCol size="12" className="pb-2">
              <h5 className="font-w500 fs-16 text-blue-dark">
                Compartir toda tu ficha médica
              </h5>
              <p className="fs-14">
                Información personal, alergias, enfermedades, tratamientos,
                discapacidades, etc…
              </p>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" className="px-3">
              <IonCard className="m-0 mb-2 pb-2">
                <IonCardContent>Compartir</IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonToast
        isOpen={notificacion.estado}
        onDidDismiss={() => setNotificacion({ ...notificacion, estado: false })}
        message={notificacion.msg}
        duration={500}
      />
    </IonPage>
  );
};

export default PerfilCompartir;
