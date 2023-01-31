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
import { useHistory } from "react-router";
import {
  NavLateral,
  HeaderInterior,
  InfoPeticion,
  Datatable,
} from "../../components";
import { getPacientes } from "../../servicios/pacientes";
import { URLBIENIPERFIL } from "../../servicios/configuracion";
import { obtenerEstadoVerificacion } from "../../helpers";

const errores = [
  "Error guardado",
  "Automatico-documento",
  "Automatico-verificacion",
  "Automatico-ambos",
  "Manual-documento",
  "Manual-verificacion",
  "Manual-ambos",
];
const Pacientes = () => {
  const history = useHistory();
  const [modal, setModal] = useState<boolean>(false);
  const [img, setImg] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const { data, error, isLoading, isFetching } = useQuery(
    ["pacientes", page],
    () => getPacientes(page, "0"),
    {
      keepPreviousData: true,
    }
  );

  const handleVerImagen = (idusuario: any, idpaciente: any) => {
    setModal(!modal);

    let URL = `${URLBIENIPERFIL}${idusuario}/parentesco/${idpaciente}`;
  };

  const columnas = [
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
      name: "Perfil",
      grow: 1,
      selector: (row: any) => row.perfil,
    },
    {
      name: "Fecha nacimiento",
      grow: 1,
      selector: (row: any) => row.fechanacimiento,
    },
    {
      name: "Edad",
      grow: 1,
      selector: (row: any) => row.edad,
    },
    {
      name: "Teléfono",
      grow: 1,
      selector: (row: any) => row.telefono,
    },
    {
      name: "Tipo de verificacion",
      grow: 1,
      selector: (row: any) => (
        <span
          className={`${
            errores.includes(row.tipoverificacion) ? "badge badge-danger" : ""
          }`}
        >
          <b style={{ color: "#fffff" }}>{row.tipoverificacion}</b>
        </span>
      ),
    },

    {
      name: "Estado",
      grow: 1,
      selector: (row: any) => (
        <span className={obtenerEstadoVerificacion(row.idestado)}>
          <b style={{ color: "#fffff" }}>{row.estado}</b>
        </span>
      ),
    },
  ];

  const handleDobleClic = (item: any) => {
    if ("idusuario" in item && "idpaciente" in item) {
      history.push(`/app/paciente/${item.idusuario}/${item.idpaciente}`);
    }
  };

  if (isLoading) {
    return <InfoPeticion texto="Cargando..." />;
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
                  <Datatable
                    title="Pacientes"
                    columnas={columnas}
                    load={isLoading}
                    data={data.data}
                    setPage={setPage}
                    recordsTotals={data.recordsTotals}
                    dobleClic={handleDobleClic}
                  />
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

export default Pacientes;
/*
  BIENI APP
  1)frontend:nada aun
  2)backend:nada aun
  BIENIWEB
  1)frontend:acabo de subir cambios a esta rama
  2)backend:en el servidor me da error
  */
