import React, { useState, useEffect } from "react";
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
  IonThumbnail,
  IonSearchbar,
  IonItem,
  IonLabel,
  IonButton,
  IonBadge,
} from "@ionic/react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./usuarios.css";
import { Nav } from "../../components";

const Usuarios: React.FC = () => {
  const history = useHistory();
  const user = useSelector((state: any) => state.reducerAuth.user);

  const handelNotificaciones = () => {
    history.push("/app/notificaciones");
  };

  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const handleImagenologia = (event: any) => {
    history.push("./imagenologia");
  };

  const handleNiveles = (event: any) => {
    history.push("./niveles");
  };

  const handleUsuarios = (event: any) => {
    history.push("./usuarios");
  };

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light">
          <IonRow className="pt-4 pb-4 mb-2">
            <IonCol size="2" className="px-3 fs-14 text-white">              
                <div className="d-inline">
                  <img src="./images/logo-bieni.svg" alt="imagen" className="d-inline" width={25} />
                  <p className="ml-3 fs-20 font-w600 text-info d-inline">Bieni</p>
                </div>
            </IonCol>
            <IonCol size="7" className="px-3 fs-14 text-white">              
              <div
                className="searchContainer d-inline-block"
                style={{ width: "60%" }}
              >
                <form action="">
                  <IonSearchbar
                    placeholder="Buscar..."
                    slot="end"
                    class="px-0 py-0"
                  />
                  <input type="submit" style={{ display: "none" }} />
                </form>
              </div>
            </IonCol>
            <IonCol size="3" className="px-3">
                <div className="float-right fs-14 d-flex flex-row"
                  onClick={handelNotificaciones}
                  style={{ cursor: "pointer" }}
                >
                  <div className="align-self-center">
                    <IonImg src={"./images/notificaciones.svg"} className="w-24-p" />
                  </div>
                  <div className="ml-5 p-perfil-sub">
                    <IonThumbnail slot="start" class="">
                      <img src="./images/sandra.jpg" alt="Laura" />
                    </IonThumbnail>
                  </div>
                  <div className="ml-3 mr-2">
                    <span className="fs-15 font-w700 text-info d-block">Dra. {}{user.nombre}</span>
                    <span className="text-info font-w600">Ginecología</span>
                  </div>
                </div>
            </IonCol>
          </IonRow>

          <IonRow className="mt-0">
            <IonCol size="2" className="pl-0 pr-3">
              {/*<Nav/>*/}

              <div className="px-3 py-5 bg-info-alt border-menu menu-principal height-vh-content">
                <IonItem lines="none" button onClick={() => { }} className="mb-3 active">
                  <IonImg
                    src={"./images/afiliados-light.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>
                    Mis pacientes
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" button onClick={() => { }} className="mb-3">
                  <IonImg
                    src={"./images/doctor-light.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>
                    Perfil
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" button onClick={() => { }} className="mb-3">
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>
                    Soporte
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" button onClick={handleNiveles} className="mb-3">
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>
                    Niveles
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" button onClick={handleUsuarios} className="mb-3">
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>
                    Usuarios
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" button onClick={() => { }} className="mb-3">
                  <IonImg
                    src={"./images/cerrar-sesion.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>
                    Cerrar sesi&oacute;n
                  </IonLabel>
                </IonItem>
              </div>
            </IonCol>
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
                  <IonButton
                    className="button-deg-gen fs-12"
                    fill="outline"
                  >
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
                      <tr onClick={handleImagenologia} className="cursor-pointer">
                        <td>
                          <img src="./images/laura.jpg" alt="imagen" className="border-radius" style={{width: '32px'}} />
                        </td>
                        <td>Laura Cristina Garcia</td>
                        <td>10102234</td>
                        <td>lauracristinagarcia@gmail.com</td>
                        <td>Consulta</td>
                        <td>
                          <IonBadge color="warning" className="px-2 py-1 fs-12 font-w100 border-badge">Agendado</IonBadge>
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
                          <img src="./images/juan.jpg" alt="imagen" className="border-radius" style={{width: '32px'}} />
                        </td>
                        <td>Juan Moreno</td>
                        <td>10347234</td>
                        <td>juanmoreno@gmail.com</td>
                        <td>Consulta</td>
                        <td>
                          <IonBadge color="warning" className="px-2 py-1 fs-12 font-w100 border-badge">Agendado</IonBadge>
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
                          <img src="./images/andrea.jpg" alt="imagen" className="border-radius" style={{width: '32px'}} />
                        </td>
                        <td>Andrea Fuentes</td>
                        <td>111272834</td>
                        <td>andreafuentes@gmail.com</td>
                        <td>Consulta</td>
                        <td>
                          <IonBadge color="success" className="px-2 py-1 fs-12 font-w100 border-badge">Atendido</IonBadge>
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

export default Usuarios;
