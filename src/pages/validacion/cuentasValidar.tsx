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
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLateral, HeaderInterior } from "../../components";
import {
  getCuentas,
  putCuentaAprobar,
  putCuentaRechazar,
} from "../../api/cuentas";
import { getValidacionesCuenta } from "../../servicios/validaciones";
import { URLPERFIL } from "../../servicios";
const CuentasValidar = () => {
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [modal, setModal] = useState<boolean>(false);
  const [img, setImg] = useState<any>({
    foto: "",
    documento: "",
  });
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["validacion-cuentas"],
    queryFn: getValidacionesCuenta,
  });

  const cuentaAprobarMutation = useMutation({
    mutationFn: putCuentaAprobar,
    onSuccess: (data) => {
      if (queryClient.getQueryData(["validacion-cuentas"])) {
        queryClient.invalidateQueries(["validacion-cuentas"]);
      }
      setNotificacion({
        msg: data.data.msg,
        estado: true,
      });
    },
  });

  const cuentaRechazarMutation = useMutation({
    mutationFn: putCuentaRechazar,
    onSuccess: (data) => {
      if (queryClient.getQueryData(["validacion-cuentas"])) {
        queryClient.invalidateQueries(["validacion-cuentas"]);
      }
      setNotificacion({
        msg: data.data.msg,
        estado: true,
      });
    },
  });

  const handleAprobar = (
    iddocumento: string,
    idpaciente: string,
    idusuario: string
  ) => {
    cuentaAprobarMutation.mutate({
      iddocumento,
      idpaciente,
      idusuario,
    });
  };

  const handleRechazar = (
    iddocumento: string,
    idpaciente: string,
    idusuario: string
  ) => {
    cuentaRechazarMutation.mutate({
      iddocumento,
      idpaciente,
      idusuario,
    });
  };

  const handleVerImagen = (
    idusuario: number,
    idpaciente: number,
    imagenDocumento: string,
    imagenVerificacion: string
  ) => {
    setModal(!modal);

    let URL = `${URLPERFIL}${idusuario}/reconocimientos/${idpaciente}`;

    let foto = `${URL}/${imagenDocumento}`;
    let documento = `${URL}/${imagenVerificacion}`;

    setImg({ foto: foto, documento: documento });
    console.log({ foto, documento });
  };

  console.log(data);

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
      <IonContent fullscreen>
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
                      {data.length === 0 ? (
                        <tr>
                          <td colSpan={6}>Sin registro para mostrar</td>
                        </tr>
                      ) : (
                        data.map((item: any) => (
                          <tr key={item.idusuario}>
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
                                  item.estado !== "Aprobado"
                                    ? "text-danger"
                                    : ""
                                }`}
                              >
                                {item.estado}
                              </span>
                            </td>
                            <td>{item.tipoverificacion}</td>
                            <td>
                              <div className="d-flex justify-content-center">
                                {item.imagen_documento !== "" &&
                                  item.imagen_verificacion !== "" && (
                                    <button
                                      onClick={() => {
                                        handleVerImagen(
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
                                    handleAprobar(
                                      item.iddocumento,
                                      item.idpaciente,
                                      item.idusuario
                                    );
                                  }}
                                  className="btn btn-delete-validacion p-0 mr-2"
                                >
                                  <FontAwesomeIcon
                                    icon={faCircleCheck}
                                    className="float-right fs-18 text-success cursor-pointer"
                                  />
                                </button>
                                <button
                                  onClick={() => {
                                    handleRechazar(
                                      item.iddocumento,
                                      item.idpaciente,
                                      item.idusuario
                                    );
                                  }}
                                  className="btn btn-delete-validacion p-0"
                                >
                                  <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className="float-right fs-18 text-danger cursor-pointer"
                                  />
                                </button>
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

export default CuentasValidar;
