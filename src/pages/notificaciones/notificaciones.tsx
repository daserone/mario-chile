import { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonImg,
  IonButton,
  IonToast,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { NavLateral, HeaderInterior, InfoPeticion } from "../../components";
import { useParams } from "react-router";
import { URLBIENIPERFIL } from "../../servicios/configuracion";
const INITIAL = {
  titulo: "",
  descripcion: "",
};
const Notificaciones = () => {
  const { idu, idp }: any = useParams();
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const [notificaciones, setNotificaciones] = useState(INITIAL);

  return (
    <IonPage className="fondo">
      <IonContent fullscreen>
        <IonGrid className="bg-light">
          <HeaderInterior />
          <IonRow className="mt-0">
            <NavLateral />
            <IonCol size="5" className="px-3">
              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent>
                  <div className="p-perfil bg-banner-perfil border-radius-bottom">
                    <IonToolbar>
                      <IonTitle className="fs-20 font-w600 text-center">
                        Paciente
                        <span
                          className="position-absolute mr-3"
                          style={{ right: "0px" }}
                        >
                          <IonImg
                            src={"./images/compartir-light.svg"}
                            className="filter-white cursor-pointer"
                          />
                        </span>
                      </IonTitle>
                    </IonToolbar>
                    <div className="mx-3 pb-2 text-white d-flex">
                      <div className="w-100 ml-3 float-right d-grid">
                        <div className="">
                          <span className="fs-14 float-left">Título:</span>
                          <span className="fs-14 float-right">
                            
                          </span>
                        </div>
                        <div className="">
                          <span className="fs-14 float-left">
                            Descripción:
                          </span>
                          <span className="fs-14 float-right">
                            
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </IonCardContent>
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

export default Notificaciones;
