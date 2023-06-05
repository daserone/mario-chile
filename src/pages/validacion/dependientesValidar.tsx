import { useState, useMemo } from "react";
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
  faCircleCheck,
  faCircleXmark,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
//import { useHistory } from "react-router";
import {
  NavLateral,
  HeaderInterior,
  InfoPeticion,
  Datatable,
} from "../../components";
import {
  getDependientes,
  getDependienteImg,
  dependiente,
} from "../../servicios/pacientes";
import { URLBIENIPERFIL } from "../../servicios/configuracion";
/*import {
  getValidacionesDependiente,
  updateValidacionDependienteAprobar,
  updateValidacionDependienteRechazar,
  getImgDependiente,
} from "../../servicios/dependientes";*/

const DependientesValidar = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [page, setPage] = useState<any>(1);
  const [img, setImg] = useState<any>([]);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching } = useQuery(
    ["dependientes", page],
    () => getDependientes(page),
    {
      keepPreviousData: true,
    }
  );

  const aprobarMutation = useMutation({
    mutationFn: dependiente,
    onSuccess: (data) => {
      if (queryClient.getQueryData(["dependientes"])) {
        queryClient.invalidateQueries(["dependientes"]);
      }
      setNotificacion({
        msg: data.msg,
        estado: true,
      });
    },
  });

  const rechazarMutation = useMutation({
    mutationFn: dependiente,
    onSuccess: (data) => {
      if (queryClient.getQueryData(["dependientes"])) {
        queryClient.invalidateQueries(["dependientes"]);
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
    idfamiliar: string,
    idusuario: string
  ) => {
    const formData = new FormData();
    formData.append("op", "dependienteAprobar");
    formData.append("iddocumento", iddocumento);
    formData.append("idpaciente", idpaciente);
    formData.append("idfamiliar", idfamiliar);
    formData.append("idusuario", idusuario);
    aprobarMutation.mutate(formData);
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
    rechazarMutation.mutate(formData);
  };

  const handleImagen = async (idusuario: any, idpaciente: any) => {
    let URL = `${URLBIENIPERFIL}${idusuario}/parentesco/${idpaciente}`;

    const rsp = await getDependienteImg(idusuario, idpaciente);

    if (rsp.data.length > 0) {
      const nuevo = data.data.map((item: string) => `${URL}/${item}`);
      setModal(!modal);
      setImg(nuevo);
    }
  };

  const handleDobleClic = (item: any) => {};

  const columnas = useMemo(
    () => [
      {
        name: "Nombre",
        grow: 1,
        selector: (row: any) => row.nombre,
      },
      {
        name: "Documento",
        grow: 1,
        selector: (row: any) => (
          <div className="text-center">
            {row.documento}
            <span className="fs-12 text-info d-block">{row.tipodocumento}</span>
          </div>
        ),
      },
      {
        name: "Edad",
        grow: 1,
        selector: (row: any) => row.edad,
      },
      {
        name: "Relacion familiar",
        grow: 1,
        selector: (row: any) => row.parentesco,
      },
      {
        name: "Principal",
        grow: 1,
        selector: (row: any) => (
          <div className="text-center">
            {row.nombreP}
            <span className="fs-12 text-info d-block">{row.documentoP}</span>
          </div>
        ),
      },
      {
        name: "Tipo verificación",
        grow: 1,
        selector: (row: any) => row.tipoverificacion,
      },
      {
        name: "Acciones",
        grow: 1,
        selector: (item: any) => (
          <div className="d-flex justify-content-center">
            <button
              onClick={() => {
                handleImagen(item.idusuario, item.idpaciente);
              }}
              className="btn btn-delete-validacion p-0 mr-2"
            >
              <FontAwesomeIcon
                icon={faAddressCard}
                className="float-right fs-18 text-info cursor-pointer"
              />
            </button>
            <button
              className="btn btn-delete-validacion p-0 mr-2"
              onClick={() => {
                handleAprobar(
                  item.iddocumento,
                  item.idpaciente,
                  item.idfamiliar,
                  item.idusuario
                );
              }}
            >
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="float-right fs-18 text-success cursor-pointer"
              />
            </button>
            <button
              className="btn btn-delete-validacion p-0 mr-2"
              onClick={() => {
                handleRechazar(
                  item.iddocumento,
                  item.idpaciente,
                  item.idfamiliar
                );
              }}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="float-right fs-18 text-danger cursor-pointer"
              />
            </button>
          </div>
        ),
      },
    ],
    []
  );

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
                  <Datatable
                    title="Dependientes"
                    columnas={columnas}
                    load={isLoading}
                    data={data.data}
                    setPage={setPage}
                    recordsTotals={data.recordsTotals}
                    dobleClic={handleDobleClic}
                  />
                </IonCardContent>
              </IonCard>
              {/*<IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slide height-vh-con-table">
                  <table className="table table-striped">
                    <thead className="text-gray">
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col" className="text-center">
                          Documento
                        </th>
                        <th scope="col" className="text-center">
                          Edad
                        </th>
                        <th scope="col">Parentesco</th>
                        <th scope="col">Principal</th>
                        <th scope="col">Documento</th>
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
                            <td className="text-center">{item.edad}</td>
                            <td>{item.parentesco}</td>
                            <td>
                              {item.nombreP}
                              <span className="fs-12 text-info d-block">
                                {item.documentoP}
                              </span>
                            </td>

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
                                </IonCard>*/}
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
//196,197 id paciente
