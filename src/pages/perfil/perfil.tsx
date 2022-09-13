import { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonSlides,
  IonSlide,
  IonButton,
  useIonLoading,
  IonImg,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPerfiles, getPerfil } from "../../servicios";
import { INITIALPERFIL, imgPerfil } from "../../helpers";
import { storeLocal, logout } from "../../store";
import { signOutWithGoogle } from "../../firebase";
import "./perfil.css";
const Perfil = () => {
  const SLIDEOPTS = {
    initialSlide: 0,
    speed: 200,
    slidesPerView: 1.7,
    spaceBetween: 20,
  };
  const dispatch = useDispatch();
  const [present] = useIonLoading();
  const user = useSelector((state: any) => state.reducerAuth.user);
  const history = useHistory();
  const [perfil, setPerfil] = useState(INITIALPERFIL);
  const [perfiles, setPerfiles] = useState([]);

  const handelPerfilAlergias = () => {
    history.push("/app/perfil-alergias");
  };
  const handelPerfilEnfermedades = () => {
    history.push("/app/perfil-enfermedades");
  };
  const handelPerfilTratamientos = () => {
    history.push("/app/perfil-tratamientos");
  };
  const handelFichaCompleta = () => {
    history.push("/app/ficha-completa");
  };
  const handelAseguradora = () => {
    history.push("/app/aseguradora");
  };
  const handelDiscapacidad = () => {
    history.push("/app/discapacidad");
  };
  const handelContactoEmergencia = () => {
    history.push("/app/contacto-emergencia");
  };
  const handelMisMedicos = () => {
    history.push("/app/mis-medicos");
  };
  const handelMisMedicamentos = () => {
    history.push("/app/mis-medicamentos");
  };
  const handelSoporte = () => {
    history.push("/app/soporte");
  };
  const handleEditar = () => {
    history.push("/app/perfil-editar");
  };
  const handelCompartir = () => {
    history.push("/app/perfil-compartir");
  };
  const handleLogout = () => {
    dispatch(logout());
    signOutWithGoogle();
  };

  useEffect(() => {
    Promise.all([getPerfil(user.idpaciente), getPerfiles(user.id)])
      .then((rsp: any) => {
        const [prfil, prfiles] = rsp;
        setPerfil(prfil.data.data);
        setPerfiles(prfiles.data.data);
      })
      .catch((error) => {
        console.error("Error en triple peticion" + error);
      });
  }, [user]);

  const handleClicPerfil = (nombre: string, item: any) => {
    if (nombre === "nuevo-perfil") {
      history.push("/app/perfil-crear");
    } else {
      present({
        message: "Cargando perfil...",
        duration: 3000,
      });
      dispatch(storeLocal(item));
    }
  };

  const FOTO = imgPerfil(perfil.imagen, user.idpaciente);
  return (
    <IonPage className="fondo">
      <IonHeader>
        <div className="p-perfil bg-info-alt border-radius-bottom">
          <IonToolbar>
            <IonTitle className="fs-20 font-w600 text-center">
              Perfil
              <span className="position-absolute mr-3" style={{ right: "0px" }}>
                <IonImg
                  src={"./images/compartir-light.svg"}
                  className="filter-white cursor-pointer"
                  onClick={handelCompartir}
                />
              </span>
            </IonTitle>
          </IonToolbar>
          <div className="mx-3 pb-2 text-white d-flex">
            <div className="">
              <img src={FOTO} alt="imagen" />
            </div>

            <div className="w-100 ml-3 float-right d-grid">
              <p className="fs-16 font-w500 mb-1">{perfil?.nombre}</p>
              <div className="">
                <span className="fs-14 float-left">Edad:</span>
                <span className="fs-14 float-right">{perfil?.edad} años</span>
              </div>
              <div className="">
                <span className="fs-14 float-left">Cédula:</span>
                <span className="fs-14 float-right">{perfil?.cedula}</span>
              </div>
              <div className="pb-2 border-bottom">
                <span className="fs-14 float-left">
                  Grupo Sangu&iacute;neo:
                </span>
                <span className="fs-14 float-right text-uppercase">
                  {perfil?.gruposangre}
                </span>
              </div>
              <div className="pt-2">
                <span
                  className="fs-12 float-left text-underline cursor-pointer"
                  onClick={handelFichaCompleta}
                >
                  Ver ficha completa
                </span>
                <span
                  className="fs-12 float-right text-underline cursor-pointer"
                  onClick={handleEditar}
                >
                  Editar
                </span>
              </div>
            </div>
          </div>
          <IonRow className="mt-2 pb-3">
            <IonCol size="12" className="px-3">
              <IonSlides pager={false} options={SLIDEOPTS}>
                <IonSlide>
                  <IonCard
                    className="m-0 card-slide px-3 py-1 box-op"
                    onClick={handelAseguradora}
                  >
                    <IonCardContent className="card-content-slide d-flex flex-column align-items-center fs-12 py-2">
                      <span>
                        <IonImg
                          src={"./images/aseguradora-light.svg"}
                          className="w-24-p"
                        />
                      </span>
                      <span className="d-block">Aseguradora</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard
                    className="m-0 card-slide px-3 py-1 box-op"
                    onClick={handelMisMedicamentos}
                  >
                    <IonCardContent className="card-content-slide d-flex flex-column align-items-center fs-12 py-2">
                      <span>
                        <IonImg
                          src={"./images/capsulas-light.svg"}
                          className="w-24-p"
                        />
                      </span>
                      <span className="d-block">Medicamentos</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard
                    className="m-0 card-slide px-3 py-1 box-op"
                    onClick={handelContactoEmergencia}
                  >
                    <IonCardContent className="card-content-slide d-flex flex-column align-items-center fs-12 py-2">
                      <span>
                        <IonImg
                          src={"./images/contacto-light.svg"}
                          className="w-24-p"
                        />
                      </span>
                      <span className="d-block">C. Emergencia</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard
                    className="m-0 card-slide px-3 py-1 box-op"
                    onClick={handelDiscapacidad}
                  >
                    <IonCardContent className="card-content-slide d-flex flex-column align-items-center fs-12 py-2">
                      <span>
                        <IonImg
                          src={"./images/discapacidad-light.svg"}
                          className="w-24-p"
                        />
                      </span>
                      <span className="d-block">Discapacidad</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard
                    className="m-0 card-slide px-3 py-1 box-op"
                    onClick={handelMisMedicos}
                  >
                    <IonCardContent className="card-content-slide d-flex flex-column align-items-center fs-12 py-2">
                      <span>
                        <IonImg
                          src={"./images/mis-medicos-light.svg"}
                          className="w-24-p"
                        />
                      </span>
                      <span className="d-block">Mis m&eacute;dicos</span>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
              </IonSlides>
            </IonCol>
          </IonRow>
        </div>
      </IonHeader>

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w600 fs-16 text-info-dark mb-2">
                    Información personal
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slide">
                  {/*<IonList>
                    <IonItem button >
                      <IonLabel className="font-w500">Alergías</IonLabel>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className="mr-0 float-right fs-18 text-info"
                        onClick={handelPerfilAlergias}
                        style={{ cursor: "pointer" }}
                      />
                    </IonItem>
                  </IonList>*/}

                  <div
                    className="pt-1 pb-3 px-1 border-bottom cursor-pointer"
                    onClick={handelPerfilAlergias}
                  >
                    <IonLabel className="font-w500">Alergías</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div
                    className="py-3 px-1 border-bottom cursor-pointer"
                    onClick={handelPerfilEnfermedades}
                  >
                    <IonLabel className="font-w500">Enfermedades</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div
                    className="pt-3 pb-1 px-1 cursor-pointer"
                    onClick={handelPerfilTratamientos}
                  >
                    <IonLabel className="font-w500">
                      Tratamientos activos
                    </IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                </IonCardContent>
              </IonCard>

              <IonRow className="mt-4">
                <IonCol size="12">
                  <h5 className="font-w600 fs-16 text-info-dark mb-2">
                    Mi familia
                  </h5>
                </IonCol>
                <IonCol size="12">
                  <IonSlides
                    pager={false}
                    options={SLIDEOPTS}
                    className="slide-perfiles"
                  >
                    {perfiles.map((item: any, index: number) => (
                      <IonSlide
                        key={index}
                        onClick={() => handleClicPerfil(item.nombre, item)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-grid">
                          {item.nombre === "nuevo-perfil" ? (
                            <div className="perfil-nuevo-lista p-2">
                              <img
                                src="./images/perfil-nuevo.svg"
                                alt={item.imagen}
                                className="imagen_perfil_default p-3 m-0"
                              />
                            </div>
                          ) : (
                            <div className="perfil-lista mb-1">
                              <img
                                src={imgPerfil(item.imagen, item.idpaciente)}
                                className="m-0"
                                alt={item.imagen}
                              />
                            </div>
                          )}
                          {item.nombre !== "nuevo-perfil" && (
                            <span className="fs-12 text-body font-w500">
                              {item.nombre}
                            </span>
                          )}
                        </div>
                      </IonSlide>
                    ))}
                  </IonSlides>
                </IonCol>
              </IonRow>

              <IonRow className="mt-4">
                <IonCol size="12">
                  <h5 className="font-w600 fs-16 text-info-dark mb-2">
                    Configuración
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slidex">
                  <div
                    className="pt-1 pb-3 px-1 border-bottom cursor-pointer"
                    onClick={handelSoporte}
                  >
                    <IonImg
                      src={"./images/soporte-light.svg"}
                      className="w-24-p mr-2 float-left"
                    />
                    <IonLabel className="font-w500">Soporte</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div
                    className="py-3 px-1 border-bottom cursor-pointer"
                    onClick={handelSoporte}
                  >
                    <IonImg
                      src={"./images/terminos-light.svg"}
                      className="w-24-p mr-2 float-left"
                    />
                    <IonLabel className="font-w500">
                      T&eacute;rminos y condiciones
                    </IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div
                    className="py-3 px-1 border-bottom cursor-pointer"
                    onClick={handelSoporte}
                  >
                    <IonImg
                      src={"./images/seguridad-light.svg"}
                      className="w-24-p mr-2 float-left"
                    />
                    <IonLabel className="font-w500">Seguridad</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                  <div
                    className="pt-3 pb-1 px-1 cursor-pointer"
                    onClick={handelSoporte}
                  >
                    <IonImg
                      src={"./images/cuenta-light.svg"}
                      className="w-24-p mr-2 float-left"
                    />
                    <IonLabel className="font-w500">Mi cuenta</IonLabel>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mr-0 float-right fs-18 text-info"
                    />
                  </div>
                </IonCardContent>
              </IonCard>
              <div className="mt-4 text-center">
                <IonButton
                  className="btn-outline text-info"
                  fill="outline"
                  onClick={handleLogout}
                >
                  <IonImg
                    src={"./images/cerrar-sesion.svg"}
                    className="w-24-p mr-2 float-left"
                  />
                  Cerrar sesión
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
