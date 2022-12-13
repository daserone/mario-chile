import React, { useState, useRef } from "react";
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
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/react";
import "./validaciones.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteValidacion,
  aprobarValidacion,
  getValidaciones,
} from "../../api/validacionesApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLateral, HeaderInterior } from "../../components";
import { BASEURL } from "../../servicios/servicios";

const ValidacionIngresos: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [imgDoc, setimgDoc] = useState("");
  const [imgVer, setimgVer] = useState("");
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const queryClient = useQueryClient();
  const {
    data: validaciones,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["validaciones"],
    queryFn: getValidaciones,
    //select: (data) => data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id),
  });

  const actualizarValidacion = (id: any, estado: number) => {
    aprobarValidacionMutation.mutate({
      id: id,
      estado: estado,
    });
  };

  const aprobarValidacionMutation = useMutation({
    mutationFn: aprobarValidacion,
    onSuccess: (data) => {
      if (queryClient.getQueryData(["validaciones"])) {
        queryClient.invalidateQueries(["validaciones"]);
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
      queryClient.invalidateQueries(["validaciones"]);
    },
  });

  function dismiss() {
    modal.current?.dismiss();
  }

  const verImagenDocumento = (
    idusuario: number,
    idpaciente: number,
    imagen_documento: string,
    imagen_verificacion: string
  ) => {
    setimgDoc(
      `${BASEURL}/asset/perfiles/${idusuario}/reconocimientos/${idpaciente}/${imagen_documento}`
    );
    setimgVer(
      `${BASEURL}/asset/perfiles/${idusuario}/reconocimientos/${idpaciente}/${imagen_verificacion}`
    );
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
  //if (error) return <div>{error.message}</div>;

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
                        <th scope="col" className="text-center">
                          Documento
                        </th>
                        <th scope="col">Estado</th>
                        <th scope="col">Verificación</th>
                        <th scope="col" className="text-center">
                          Imágenes
                        </th>
                        <th scope="col" className="text-center">
                          Acciones
                        </th>
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
                              <span className="fs-12 text-info d-block">
                                {item.tipodocumento}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`${
                                  item.estadoverificacion !== "Aprobado"
                                    ? "text-danger"
                                    : ""
                                }`}
                              >
                                {item.estadoverificacion}
                              </span>
                            </td>
                            <td>{item.tipoverificacion}</td>
                            <td>
                              <div className="d-flex justify-content-center">
                                {item.imagen_documento !== "" &&
                                  item.imagen_verificacion !== "" && (
                                    <button
                                      id="open-modal"
                                      onClick={() => {
                                        verImagenDocumento(
                                          item.idusuario,
                                          item.idpaciente,
                                          item.imagen_documento,
                                          item.imagen_verificacion
                                        );
                                      }}
                                      className="btn btn-delete-validacion p-0 mr-2"
                                      disabled={item.isDeleting}
                                    >
                                      {item.isDeleting ? (
                                        <span className="spinner-border spinner-border-sm"></span>
                                      ) : (
                                        <FontAwesomeIcon
                                          icon={faAddressCard}
                                          className="float-right fs-18 text-info cursor-pointer"
                                        />
                                      )}
                                    </button>
                                  )}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <button
                                  onClick={() => {
                                    actualizarValidacion(item.id, 1);
                                  }}
                                  className="btn btn-delete-validacion p-0 mr-2"
                                  disabled={item.isDeleting}
                                >
                                  {item.isDeleting ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  ) : (
                                    <FontAwesomeIcon
                                      icon={faCircleCheck}
                                      className="float-right fs-18 text-success cursor-pointer"
                                    />
                                  )}
                                </button>
                                <button
                                  onClick={() => {
                                    actualizarValidacion(item.id, 2);
                                  }}
                                  className="btn btn-delete-validacion p-0"
                                  disabled={item.isDeleting}
                                >
                                  {item.isDeleting ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  ) : (
                                    <FontAwesomeIcon
                                      icon={faCircleXmark}
                                      className="float-right fs-18 text-danger cursor-pointer"
                                    />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  <IonModal ref={modal} trigger="open-modal">
                    <IonHeader>
                      <IonToolbar>
                        <IonTitle className="p-3">
                          Documento de identidad
                        </IonTitle>
                        <IonButtons slot="end">
                          <IonButton onClick={() => dismiss()}>
                            Cerrar
                          </IonButton>
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
