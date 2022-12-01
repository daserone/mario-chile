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
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons
} from "@ionic/react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./validaciones.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteValidacion, aprobarValidacion, getValidaciones } from "../../api/validacionesApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCircleUser,
  faCircleCheck,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import {
  BASEURL,
} from "../../servicios/servicios";

const ValidacionIngresos: React.FC = () => {
  const history = useHistory();
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [isModal, setIsModal] = useState(false);
  const [imgDoc, setimgDoc] = useState("");
  const [imgVer, setimgVer] = useState("");

  const handelNotificaciones = () => {
    history.push("/app/notificaciones");
  };
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const handleValidaciones = (event: any) => {
    history.push("./validaciones");
  };

  const handleAfiliados = (event: any) => {
    history.push("./afiliados");
  };

  const handleNiveles = (event: any) => {
    history.push("./niveles");
  };

  const handleUsuarios = (event: any) => {
    history.push("./usuarios");
  };

  const handleDetail = (id: any) => {
    history.push(`./validacion/${id}`);
  };

  const {
    data: validaciones,
    error,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ["validaciones"],
    queryFn: getValidaciones,
    //select: (data) => data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id),
  });
  const queryClient = useQueryClient();

  const actualizarValidacion = (
    id: any,
    estado: number
  ) => {
    aprobarValidacionMutation.mutate({
      id: id,
      estado: estado
    });
  };

  const aprobarValidacionMutation = useMutation({
    mutationFn: aprobarValidacion,
    onSuccess: (data) => {
      if(queryClient.getQueryData( ['validaciones'])){
        queryClient.invalidateQueries( ['validaciones'] );
      }      
      setNotificacion({
        msg: data.data.msg,
        estado: true,
      });
    },
  });

  const deleteValidacionMutation = useMutation({
    mutationFn: deleteValidacion,
    onSuccess: () => {
      setNotificacion({
        msg: "Validación eliminada exitosamente",
        estado: true,
      });
      //queryClient.invalidateQueries({ queryKey: ['validaciones'] });
      queryClient.invalidateQueries( ['validaciones'] );
    },
  });

  const verImagenDocumento = (idusuario: number, idpaciente: number, imagen_documento: string, imagen_verificacion: string) => {
    setIsModal(true);
    setimgDoc(`${BASEURL}/asset/perfiles/${idusuario}/reconocimientos/${idpaciente}/${imagen_documento}`);
    setimgVer(`${BASEURL}/asset/perfiles/${idusuario}/reconocimientos/${idpaciente}/${imagen_verificacion}`);
  };

  if (isLoading) {
    return (
      <div>
        <span className="spinner-border"></span>Cargando validaciones...</div>
    );
  }
  //if (error) return <div>{error.message}</div>;

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light">
          <IonRow className="pt-4 pb-4 mb-2">
            <IonCol size="2" className="px-3 fs-14 text-white">
              <div className="d-inline">
                <img
                  src="./images/logo-bieni.svg"
                  alt="imagen"
                  className="d-inline"
                  width={25}
                />
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
              <div
                className="float-right fs-14 d-flex flex-row"
                onClick={handelNotificaciones}
                style={{ cursor: "pointer" }}
              >
                <div className="align-self-center">
                  <IonImg
                    src={"./images/notificaciones.svg"}
                    className="w-24-p"
                  />
                </div>
                <div className="ml-5 p-perfil-sub">
                  <IonThumbnail slot="start" class="">
                    <img src="./images/sandra.jpg" alt="Laura" />
                  </IonThumbnail>
                </div>
                <div className="ml-3 mr-2">
                  <span className="fs-15 font-w700 text-info d-block">
                    Dra. {}
                    {user.nombre}
                  </span>
                  <span className="text-info font-w600">Ginecología</span>
                </div>
              </div>
            </IonCol>
          </IonRow>

          <IonRow className="mt-0">
            <IonCol size="2" className="pl-0 pr-3">
              {/*<Nav/>*/}

              <div className="px-3 py-5 bg-info-alt border-menu menu-principal height-vh-content">
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/afiliados-light.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>Mis pacientes</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/doctor-light.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>Perfil</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Soporte</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={handleValidaciones}
                  className="mb-3 active"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Validaciones</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={handleAfiliados}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Afiliados</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={handleNiveles}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Niveles</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={handleUsuarios}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Usuarios</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/cerrar-sesion.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>Cerrar sesi&oacute;n</IonLabel>
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

                {isFetching && <span className="spinner-border"></span>}

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
                        <th scope="col">Paciente</th>
                        <th scope="col" className="text-center">Documento</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Verificación</th>
                        <th scope="col" className="text-center">Imágenes</th>
                        <th scope="col" className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="fs-13 font-w500">
                      {validaciones.length === 0 ? (
                        <IonCard className="m-0 mb-4 card-slide w-100">
                          <IonCardContent className="card-content-slide">
                            <div className="my-2 text-center">
                              Sin resultados
                            </div>
                          </IonCardContent>
                        </IonCard>
                      ) : (
                        validaciones.map((item: any) => (
                          <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td className="text-center">
                              {item.documento}
                              <span className="fs-12 text-info d-block">{item.tipodocumento}</span>
                            </td>
                            <td>
                              <span className={`${item.estadoverificacion !== 'Aprobado' ? "text-danger" : ""}`}>{item.estadoverificacion}</span>
                            </td>
                            <td>{item.tipoverificacion}</td>
                            <td>
                              <div className="d-flex justify-content-center">
                                {(item.imagen_documento !== '' && item.imagen_verificacion !== '') &&
                                  (<button
                                    onClick={() => {
                                      verImagenDocumento(item.idusuario, item.idpaciente, item.imagen_documento, item.imagen_verificacion);
                                    }}
                                    className="btn btn-delete-validacion p-0 mr-2"
                                    disabled={item.isDeleting}
                                  >
                                    {item.isDeleting ? (
                                      <span className="spinner-border spinner-border-sm"></span>
                                    ) : (
                                      <FontAwesomeIcon icon={faAddressCard} className="float-right fs-18 text-info cursor-pointer" />
                                    )}
                                  </button>)
                                }
                              </div>
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <button
                                  onClick={() => {
                                    actualizarValidacion(item.id,1);
                                  }}
                                  className="btn btn-delete-validacion p-0 mr-2"
                                  disabled={item.isDeleting}
                                >
                                  {item.isDeleting ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  ) : (
                                    <FontAwesomeIcon icon={faCircleCheck} className="float-right fs-18 text-success cursor-pointer" />
                                  )}
                                </button>
                                <button
                                  onClick={() => {
                                    actualizarValidacion(item.id,2);
                                  }}
                                  className="btn btn-delete-validacion p-0"
                                  disabled={item.isDeleting}
                                >
                                  {item.isDeleting ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  ) : (
                                    <FontAwesomeIcon icon={faCircleXmark} className="float-right fs-18 text-danger cursor-pointer" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  <IonModal isOpen={isModal}>
                    <IonHeader>
                      <IonToolbar>
                        <IonTitle className="p-3">Documento de identidad</IonTitle>
                        <IonButtons slot="end">
                          {/*<IonButton onClick={() => handleCanvaSave()}>Cerrar</IonButton>*/}
                        </IonButtons>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent className="text-center">
                      <div className="px-3 d-flex flex-column align-items-center">
                        <img
                          src={imgDoc}
                          alt="Documento de identidad"
                          className="rounded mb-3"
                          width="60%"
                        />
                        <img
                          src={imgVer}
                          alt="Documento de identidad"
                          className="rounded mb-3"
                          width="60%"
                        />
                      </div>
                    </IonContent>
                  </IonModal>
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

export default ValidacionIngresos;
