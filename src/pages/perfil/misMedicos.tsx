import { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonImg,
  IonItem,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { HeaderPerfil } from "../../components";
import { getMisMedicos } from "../../servicios";

import "./perfil.css";

const MisMedicos = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<any>(1);
  useEffect(() => {
    getMisMedicos(user.idpaciente, page)
      .then((rsp: any) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data.data.length > 0) {
            setLoad(false);
            setData(data.data);
          } else {
            setLoad(false);
            setData([]);
          }
        }
        setLoad(false);
      })
      .catch((error) => {
        console.error("Error en triple peticion" + error);
      });
  }, [user]);
  return (
    <IonPage className="fondo">
      <HeaderPerfil title="Mis m&eacute;dicos" />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w600 fs-16 text-info-dark mb-2">
                    Mis m&eacute;dicos de cabecera
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard
                className="m-0 card-slide shadow-full"
                style={{ height: "auto" }}
              >
                <IonCardContent className="card-content-slide">
                  {load ? (
                    "Cargando..."
                  ) : data.length === 0 ? (
                    <IonCard className="m-0 mb-4 card-slide w-100">
                      <IonCardContent className="card-content-slide">
                        <div className="my-2 text-center">
                          No hay médicos registrados
                        </div>
                      </IonCardContent>
                    </IonCard>
                  ) : (
                    data.map((item: any, index: number) => (
                      <IonItem className="list-box" key={index}>
                        <div className="slide-full py-3 pl-1">
                          <IonImg
                            src="./images/juan.jpg"
                            alt="AAA"
                            style={{ width: "35px", height: "35px" }}
                            className="float-left mr-2"
                          />
                          <div className="d-flex flex-column">
                            <span className="w-100 fs-13 font-w500">
                              {item.nombre}
                            </span>
                            <span className="w-100 fs-12">
                              {item.especialidad}
                            </span>
                          </div>
                        </div>
                      </IonItem>
                    ))
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MisMedicos;
