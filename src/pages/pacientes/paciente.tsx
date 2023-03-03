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
import { useQuery } from "@tanstack/react-query";
import { NavLateral, HeaderInterior, InfoPeticion } from "../../components";
import { useParams } from "react-router";
import { getPacientes, getPacienteId } from "../../servicios/pacientes";
import { URLBIENIPERFIL } from "../../servicios/configuracion";
const INITIAL = {
  idparentesco: "",
  perfil: "",
  discapacidad: "",
  documento: "",
  edad: "",
  fechanacimiento: "",
  gruposangre: "",
  imagen: "",
  imagendocumento: "",
  nombre: "",
  numeroemergencia: "",
  telefono: "",
  tipodocumento: "",
  tipoverificacion: "",
  verificacioncorreo: "",
};
const Paciente = () => {
  const { idu, idp }: any = useParams();
  const [modal, setModal] = useState<boolean>(false);
  const [img, setImg] = useState<any>([]);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const [paciente, setPaciente] = useState(INITIAL);

  const { error, isLoading } = useQuery(
    ["paciente"],
    () => getPacienteId(idp, idu),
    {
      onSuccess: (res) => {
        if (res.data.length > 0) {
          const [item] = res.data;
          setPaciente(item);
        }
      },
    }
  );

  const { data, isLoading: isLoadingD } = useQuery(["dependientes", idu], () =>
    getPacientes(1, idu)
  );

  const handleVerImagen = (idusuario: any, idpaciente: any) => {
    setModal(!modal);

    let URL = `${URLBIENIPERFIL}${idusuario}/parentesco/${idpaciente}`;
  };

  if (isLoading) {
    return <InfoPeticion texto="Cargando....." />;
  }

  if (error) {
    return <InfoPeticion texto="Error" />;
  }

  const FOTO = "";

  const createAddapterDependientes = (data: any, filtro: string) => {
    let filtrado: any = [];
    if (filtro === "Principal") {
      if (data.length > 0) {
        filtrado = data.filter((item: any) => item.perfil !== "Principal");
      }
    } else {
      if (data.length > 0) {
        filtrado = data.filter(
          (item: any) => item.perfil !== "Principal" && item.idpaciente !== idp
        );
      }
    }
    return filtrado;
  };

  const createAddapterPrincipal = (data: any, filtro: string) => {
    let filtrado: any = [];
    if (data.length > 0) {
      filtrado = data.filter((item: any) => item.perfil === filtro);
    }
    return filtrado;
  };

  return (
    <IonPage className="fondo">
      <IonContent fullscreen>
        <IonGrid className="bg-light">
          <HeaderInterior />
          <IonRow className="mt-0">
            <NavLateral />
            {/*<IonCol size="10">
              <div className="pb-2">
                {isFetching && (
                  <span className="spinner-border ml-2 mt-2"></span>
                )}
              </div>
                </IonCol>*/}
            <IonCol size="5" className="px-3">
              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent>
                  <div className="p-perfil bg-banner-perfil border-radius-bottom">
                    <IonToolbar>
                      <IonTitle className="fs-20 font-w600 text-center">
                        Paciente
                        <span
                          className="position-absolute mr-3"
                          style={{ right: "0px" }}
                        >
                          <IonImg
                            src={"./images/compartir-light.svg"}
                            className="filter-white cursor-pointer"
                          />
                        </span>
                      </IonTitle>
                    </IonToolbar>
                    <div className="mx-3 pb-2 text-white d-flex">
                      <div className="">
                        {FOTO !== "" && (
                          <img
                            src={FOTO}
                            alt="imagen"
                            className="imagen-perfil"
                          />
                        )}
                      </div>

                      <div className="w-100 ml-3 float-right d-grid">
                        <p className="fs-16 font-w500 mb-1">
                          {paciente?.nombre}
                        </p>
                        <div className="">
                          <span className="fs-14 float-left">Edad:</span>
                          <span className="fs-14 float-right">
                            {paciente?.edad}{" "}
                          </span>
                        </div>
                        <div className="">
                          <span className="fs-14 float-left">
                            Tipo de documento:
                          </span>
                          <span className="fs-14 float-right">
                            {paciente?.tipodocumento}
                          </span>
                        </div>
                        <div className="">
                          <span className="fs-14 float-left">Documento:</span>
                          <span className="fs-14 float-right">
                            {paciente?.documento}
                          </span>
                        </div>
                        <div className="pb-2">
                          <span className="fs-14 float-left">
                            Grupo Sangu&iacute;neo:
                          </span>
                          <span className="fs-14 float-right text-uppercase">
                            {paciente?.gruposangre}
                          </span>
                        </div>
                        <div className="pb-2 border-bottom">
                          <span className="fs-14 float-left">Perfil:</span>
                          <span className="fs-14 float-right text-uppercase">
                            {paciente?.perfil}
                          </span>
                        </div>
                        <div className="pt-2">
                          {/*<span className="fs-12 float-left text-underline cursor-pointer">
                            Ver ficha completa
                          </span>
                          <span className="fs-12 float-right text-underline cursor-pointer">
                            Editar
                        </span>*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="5" className="px-3">
              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent>
                  <div className="p-perfil bg-banner-perfil border-radius-bottom">
                    <IonToolbar>
                      <IonTitle className="fs-20 font-w600 text-center">
                        Principal
                      </IonTitle>
                    </IonToolbar>
                    <div>
                      {isLoadingD ? (
                        "Cargando"
                      ) : createAddapterPrincipal(data.data, "Principal")
                          .length === 0 ? (
                        <div>Este paciente no tiene dependientes</div>
                      ) : (
                        createAddapterPrincipal(data.data, "Principal").map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="mb-2  border-bottom p-1 rounded d-flex justify-content-start"
                            >
                              <div className="mr-4">
                                <p>
                                  <b>Nombre: </b>
                                  {item.nombre}
                                </p>
                                <p>
                                  <b>Perfil: </b>
                                  {item.perfil}
                                </p>
                                <p>
                                  <b>Tipo de documento: </b>
                                  {item.tipodocumento}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <b>Estado: </b>
                                  {item.estado}
                                </p>
                                <p>
                                  <b>Edad: </b>
                                  {item.edad}
                                </p>
                                <p>
                                  <b>Documento: </b>
                                  {item.documento}
                                </p>
                              </div>
                            </div>
                          )
                        )
                      )}
                    </div>
                    <IonToolbar>
                      <IonTitle className="fs-20 font-w600 text-center">
                        Dependientes de la cuenta principal
                      </IonTitle>
                    </IonToolbar>
                    <div>
                      {isLoadingD ? (
                        "Cargando"
                      ) : createAddapterDependientes(data.data, paciente.perfil)
                          .length === 0 ? (
                        <div>Este paciente no tiene dependientes</div>
                      ) : (
                        createAddapterDependientes(
                          data.data,
                          paciente.perfil
                        ).map((item: any, index: number) => (
                          <div
                            key={index}
                            className="mb-2  border-bottom p-1 rounded d-flex justify-content-start"
                          >
                            <div className="mr-4">
                              <p>
                                <b>Nombre: </b>
                                {item.nombre}
                              </p>
                              <p>
                                <b>Perfil: </b>
                                {item.perfil}
                              </p>
                              <p>
                                <b>Tipo de documento: </b>
                                {item.tipodocumento}
                              </p>
                            </div>
                            <div>
                              <p>
                                <b>Estado: </b>
                                {item.estado}
                              </p>
                              <p>
                                <b>Edad: </b>
                                {item.edad}
                              </p>
                              <p>
                                <b>Documento: </b>
                                {item.documento}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
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

export default Paciente;
