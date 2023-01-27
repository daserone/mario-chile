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
import { useHistory } from "react-router";
import { NavLateral, HeaderInterior, InfoPeticion } from "../../components";
import {
  getValidacionesDependiente,
  updateValidacionDependienteAprobar,
  updateValidacionDependienteRechazar,
  getImgDependiente,
} from "../../servicios/dependientes";
import { URLBIENIPERFIL } from "../../servicios/configuracion";

const DependientesValidar = () => {
  const history = useHistory();
  const [modal, setModal] = useState<boolean>(false);
  const [img, setImg] = useState<any>([]);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["validacion-dependientes"],
    queryFn: getValidacionesDependiente,
  });

  const cuentaAprobarMutation = useMutation({
    mutationFn: updateValidacionDependienteAprobar,
    onSuccess: (data) => {
      if (queryClient.getQueryData(["validacion-dependientes"])) {
        queryClient.invalidateQueries(["validacion-dependientes"]);
      }
      setNotificacion({
        msg: data.data.msg,
        estado: true,
      });
    },
  });

  const cuentaRechazarMutation = useMutation({
    mutationFn: updateValidacionDependienteRechazar,
    onSuccess: (data) => {
      if (queryClient.getQueryData(["validacion-dependientes"])) {
        queryClient.invalidateQueries(["validacion-dependientes"]);
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
    idfamiliar: string
  ) => {
    const formData = new FormData();
    formData.append("op", "dependienteAprobar");
    formData.append("iddocumento", iddocumento);
    formData.append("idpaciente", idpaciente);
    formData.append("idfamiliar", idfamiliar);
    cuentaAprobarMutation.mutate(formData);
  };

  const handleRechazar = (
    iddocumento: string,
    idpaciente: string,
    idfamiliar: string
  ) => {
    const formData = new FormData();
    formData.append("op", "dependienteRechazar");
    formData.append("iddocumento", iddocumento);
    formData.append("idpaciente", idpaciente);
    formData.append("idfamiliar", idfamiliar);
    cuentaRechazarMutation.mutate(formData);
  };

  const handleVerImagen = (idusuario: any, idpaciente: any) => {
    setModal(!modal);

    let URL = `${URLBIENIPERFIL}${idusuario}/parentesco/${idpaciente}`;

    getImgDependiente(idusuario, idpaciente).then((rsp) => {
      const { data, status } = rsp;
      if (status === 200) {
        if (data.data.length > 0) {
          const nuevo = data.data.map((item: string) => `${URL}/${item}`);
          setImg(nuevo);
        }
      }
    });
  };
  //history
  if (isLoading) {
    return <InfoPeticion texto="Cargando..." />;
  }

  if (error) {
    return <InfoPeticion texto="Cargando..." />;
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
                        <th scope="col">Parentesco</th>
                        <th scope="col">Principal</th>
                        <th scope="col">Estado documento</th>
                        <th scope="col">Estado familiar</th>
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
                          <tr key={item.idpaciente}>
                            <td>{item.nombre}</td>
                            <td className="text-center">
                              {item.documento}
                              <span className="fs-12 text-info d-block">
                                {item.tipodocumento}
                              </span>
                            </td>
                            <td>{item.parentesco}</td>
                            <td>{item.principal}</td>
                            <td>
                              <span
                                className={`${
                                  item.estadodocumento !== "Aprobado"
                                    ? "text-danger"
                                    : ""
                                }`}
                              >
                                {item.estadodocumento}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`${
                                  item.estadofamiliar !== "Aprobado"
                                    ? "text-danger"
                                    : ""
                                }`}
                              >
                                {item.estadofamiliar}
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
                                          item.idpaciente
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
                                      item.idfamiliar
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
                                      item.idfamiliar
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
            {img.length === 0
              ? null
              : img.map((item: string, index: number) => (
                  <IonCol size="5" className="px-3" key={index}>
                    <img
                      src={item}
                      alt="Documento de identidad"
                      className="rounded mb-3"
                      width="300px"
                    />
                  </IonCol>
                ))}
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

export default DependientesValidar;
