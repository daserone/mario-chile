import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonImg,
  IonToast,
  IonButton,
  IonBadge,
} from "@ionic/react";
import { NavLateral, HeaderInterior } from "../../components";
import "./home.css";
const Home: React.FC = () => {
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const handleImagenologia = (event: any) => {};

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light">
          <HeaderInterior />
          <IonRow className="mt-0">
            <NavLateral />
            <IonCol size="10" className="px-3">
              <div className="pb-2">
                <IonButton
                  className="btn-outline text-info fs-12"
                  fill="outline"
                >
                  <IonImg
                    src={"./images/descargar.svg"}
                    className="mr-2"
                    style={{ width: "16px" }}
                  />
                  Exportar (Excel)
                </IonButton>

                <div className="float-right">
                  <IonButton
                    className="button-deg-gen fs-12 mr-2"
                    fill="outline"
                  >
                    <IonImg
                      src={"./images/filtrar.svg"}
                      className="mr-2 filter-white"
                      style={{ width: "16px" }}
                    />
                    Filtrar
                  </IonButton>
                  <IonButton className="button-deg-gen fs-12" fill="outline">
                    <IonImg
                      src={"./images/ordenar.svg"}
                      className="mr-2 filter-white"
                      style={{ width: "16px" }}
                    />
                    Ordenar
                  </IonButton>
                </div>
              </div>
              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slide height-vh-con-table">
                  <table className="table table-striped">
                    <thead className="text-gray">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Nombre</th>
                        <th scope="col">C&eacute;dula</th>
                        <th scope="col">Email</th>
                        <th scope="col">Motivo de la consulta</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="fs-13 font-w500">
                      <tr
                        onClick={handleImagenologia}
                        className="cursor-pointer"
                      >
                        <td>
                          <img
                            src="./images/laura.jpg"
                            alt="imagen"
                            className="border-radius"
                            style={{ width: "32px" }}
                          />
                        </td>
                        <td>Laura Cristina Garcia</td>
                        <td>10102234</td>
                        <td>lauracristinagarcia@gmail.com</td>
                        <td>Consulta</td>
                        <td>
                          <IonBadge
                            color="warning"
                            className="px-2 py-1 fs-12 font-w100 border-badge"
                          >
                            Agendado
                          </IonBadge>
                        </td>
                        <td>
                          <div className="d-flex flex-row">
                            <IonImg
                              src={"./images/ver.svg"}
                              className="mr-2 cursor-pointer"
                              style={{ width: "26px" }}
                            />
                            <IonImg
                              src={"./images/editar.svg"}
                              className="mr-2 cursor-pointer"
                              style={{ width: "19px" }}
                            />
                            <IonImg
                              src={"./images/eliminar.svg"}
                              className="cursor-pointer"
                              style={{ width: "19px" }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img
                            src="./images/juan.jpg"
                            alt="imagen"
                            className="border-radius"
                            style={{ width: "32px" }}
                          />
                        </td>
                        <td>Juan Moreno</td>
                        <td>10347234</td>
                        <td>juanmoreno@gmail.com</td>
                        <td>Consulta</td>
                        <td>
                          <IonBadge
                            color="warning"
                            className="px-2 py-1 fs-12 font-w100 border-badge"
                          >
                            Agendado
                          </IonBadge>
                        </td>
                        <td>
                          <div className="d-flex flex-row">
                            <IonImg
                              src={"./images/ver.svg"}
                              className="mr-2 cursor-pointer"
                              style={{ width: "26px" }}
                            />
                            <IonImg
                              src={"./images/editar.svg"}
                              className="mr-2 cursor-pointer"
                              style={{ width: "19px" }}
                            />
                            <IonImg
                              src={"./images/eliminar.svg"}
                              className="cursor-pointer"
                              style={{ width: "19px" }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img
                            src="./images/andrea.jpg"
                            alt="imagen"
                            className="border-radius"
                            style={{ width: "32px" }}
                          />
                        </td>
                        <td>Andrea Fuentes</td>
                        <td>111272834</td>
                        <td>andreafuentes@gmail.com</td>
                        <td>Consulta</td>
                        <td>
                          <IonBadge
                            color="success"
                            className="px-2 py-1 fs-12 font-w100 border-badge"
                          >
                            Atendido
                          </IonBadge>
                        </td>
                        <td>
                          <div className="d-flex flex-row">
                            <IonImg
                              src={"./images/ver.svg"}
                              className="mr-2 cursor-pointer"
                              style={{ width: "26px" }}
                            />
                            <IonImg
                              src={"./images/editar.svg"}
                              className="mr-2 cursor-pointer"
                              style={{ width: "19px" }}
                            />
                            <IonImg
                              src={"./images/eliminar.svg"}
                              className=" cursor-pointer"
                              style={{ width: "19px" }}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          isOpen={notificacion.estado}
          onDidDismiss={() =>
            setNotificacion({ ...notificacion, estado: false })
          }
          message={notificacion.msg}
          duration={500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
