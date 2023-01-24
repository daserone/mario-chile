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
import { useHistory } from "react-router-dom";
import { NavLateral, HeaderInterior } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { getUsuarios } from "../../servicios/usuarios";
import "./usuarios.css";

const Usuarios: React.FC = () => {
  const history = useHistory();
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["usuarios"],
    queryFn: getUsuarios,
  });

  const handleUsuario = (event: any) => {
    history.push("./usuario/0");
  };

  if (isLoading) {
    return (
      <IonPage className="fondo">
        <IonContent fullscreen className="bg-light">
          <IonGrid className="bg-light">
            <IonRow
              className="pt-4 pb-4 mb-2 ion-justify-content-center"
              style={{
                height: "100vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span className="spinner-border mb-4"></span>
                <h1>Cargando....</h1>
              </div>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage className="fondo">
        <IonContent fullscreen className="bg-light">
          <IonGrid className="bg-light">
            <IonRow
              className="pt-4 pb-4 mb-2 ion-justify-content-center"
              style={{
                height: "100vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span className="spinner-border mb-4"></span>
                <h1>Error al realizar la solicitud....</h1>
              </div>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

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
                  onClick={handleUsuario}
                >
                  <IonImg
                    src={"./images/descargar.svg"}
                    className="mr-2"
                    style={{ width: "16px" }}
                  />
                  Nuevo
                </IonButton>
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
                {isFetching && (
                  <span className="spinner-border ml-2 mt-2"></span>
                )}
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
                        <th scope="col">Email</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="fs-13 font-w500">
                      {data.data.length === 0 ? (
                        <tr>
                          <td colSpan={6}>Sin registro para mostrar</td>
                        </tr>
                      ) : (
                        data.data.map((item: any) => (
                          <tr className="cursor-pointer" key={item.id}>
                            <td>
                              <img
                                src="./images/laura.jpg"
                                alt="imagen"
                                className="border-radius"
                                style={{ width: "32px" }}
                              />
                            </td>
                            <td>{item.nombre}</td>
                            <td>{item.correo}</td>
                            <td>
                              <IonBadge
                                color="primary"
                                className="px-2 py-1 fs-12 font-w100 border-badge"
                              >
                                {item.estado}
                              </IonBadge>
                            </td>
                            <td>
                              <div className="d-flex flex-row">
                                <IonButton
                                  className="button-deg-gen fs-12 mr-2 "
                                  fill="clear"
                                  onClick={() => {
                                    history.push(`/app/usuario/${item.id}`);
                                  }}
                                >
                                  <IonImg
                                    src={"./images/editar.svg"}
                                    className="cursor-pointer"
                                    style={{ width: "19px" }}
                                  />
                                </IonButton>
                                <IonButton
                                  className="button-deg-gen fs-12 mr-2 "
                                  fill="clear"
                                >
                                  <IonImg
                                    src={"./images/eliminar.svg"}
                                    className="cursor-pointer"
                                    style={{ width: "19px" }}
                                  />
                                </IonButton>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
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

export default Usuarios;
