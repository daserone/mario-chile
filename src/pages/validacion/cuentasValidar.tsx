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
  IonButtons,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLateral, HeaderInterior, InfoPeticion } from "../../components";
import {
  getValidacionesCuenta,
  updateValidacionCuentaAprobar,
  updateValidacionCuentaRechazar,
} from "../../servicios/validaciones";
import { URLPERFIL } from "../../servicios";
const CuentasValidar = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalPrg, setModalPrg] = useState<boolean>(false);
  const [img, setImg] = useState<any>({
    foto: "",
    fotoReverso: "",
    documento: "",
    documentoVerif: "",
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
    mutationFn: updateValidacionCuentaAprobar,
    onSuccess: (data: any) => {
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
    mutationFn: updateValidacionCuentaRechazar,
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
    const formData = new FormData();
    formData.append("op", "cuentaAprobar");
    formData.append("iddocumento", iddocumento);
    formData.append("idpaciente", idpaciente);
    formData.append("idusuario", idusuario);
    cuentaAprobarMutation.mutate(formData);
  };

  const handleRechazar = (
    iddocumento: string,
    idpaciente: string,
    idusuario: string
  ) => {
    const formData = new FormData();
    formData.append("op", "cuentaRechazar");
    formData.append("iddocumento", iddocumento);
    formData.append("idpaciente", idpaciente);
    formData.append("idusuario", idusuario);
    cuentaRechazarMutation.mutate(formData);
  };

  const handleVerImagen = (
    idusuario: number,
    idpaciente: number,
    imagenDocumento: string,
    imagenDocumentoReverso: string,
    imagenVerificacion: string,
    imagenVerificacionDocumento: string
  ) => {
    setModal(!modal);

    let URL = `${URLPERFIL}${idusuario}/reconocimientos/${idpaciente}`;

    let foto = imagenDocumento !== '' ? `${URL}/${imagenDocumento}` : '';
    let fotoReverso = imagenDocumentoReverso !== '' ? `${URL}/${imagenDocumentoReverso}` : '';
    let documento = imagenVerificacion !== '' ? `${URL}/${imagenVerificacion}` : '';
    let documentoVerif = imagenVerificacionDocumento !== '' ? `${URL}/${imagenVerificacionDocumento}` : '';

    setImg({ foto: foto, fotoReverso: fotoReverso, documento: documento, documentoVerif: documentoVerif });
  };

  if (isLoading) {
    return <InfoPeticion texto="Cargando....." />;
  }

  if (error) {
    return <InfoPeticion texto="Error" />;
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
                                { (item.imagen_documento !== "" ||
                                  item.imagen_documento_reverso !== "" || 
                                  item.imagen_verificacion !== "" || 
                                  item.imagen_verificacion_documento !== "" 
                                  ) && (
                                    <button
                                      onClick={() => {
                                        handleVerImagen(
                                          item.idusuario,
                                          item.idpaciente,
                                          item.imagen_documento,
                                          item.imagen_documento_reverso,
                                          item.imagen_verificacion,
                                          item.imagen_verificacion_documento
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
      <IonModal isOpen={modal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="p-3">Documento de identidad</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setModal(!modal)}>Cerrar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="text-center">
          <IonRow>
            {img.foto !== '' && <IonCol size="5" className="px-3">
              <img
                src={img.foto}
                alt="Documento de identidad"
                className="rounded mb-3"
                width="300px"
              />
            </IonCol>}
            {img.fotoReverso !== '' && <IonCol size="5" className="px-3">
              <img
                src={img.fotoReverso}
                alt="Documento de identidad Reverso"
                className="rounded mb-3"
                width="300px"
              />
            </IonCol>}
            {img.documento !== '' && <IonCol size="5" className="px-3">
              <img
                src={img.documento}
                alt="Documento de identidad"
                className="rounded mb-3"
                width="300px"
              />
            </IonCol>}
            {img.documentoVerif !== '' && <IonCol size="5" className="px-3">
              <img
                src={img.documentoVerif}
                alt="Documento de verificación"
                className="rounded mb-3"
                width="300px"
              />
            </IonCol>}
          </IonRow>
        </IonContent>
      </IonModal>
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
