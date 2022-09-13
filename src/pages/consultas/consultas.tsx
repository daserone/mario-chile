import React, { useState, useEffect } from "react";
import {
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonSearchbar,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
  IonModal,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonLabel,
  IonInput,
  IonImg,
  IonCard,
  IonCardContent,
  useIonViewDidEnter,
  IonThumbnail,
  IonBadge,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { HeaderEstudios, InfoPaciente } from "../../components";
import { Card } from "./Card";
import {
  getComboAfiliados,
  serviciosConsultas,
  getConsultas,
  getConsultasUltimoRg,
  getFichaCompleta,
  URLPERFIL
} from "../../servicios/servicios";
//import Examen from "./examen";
import { formtFechaCorta, INITIALPERFIL, fechaPerfil } from "../../helpers";

const Consultas: React.FC = () => {
  const [perfil, setPerfil] = useState(INITIALPERFIL);
  const [alergias, setAlergias] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);
  const [discapacidades, setDiscapacidades] = useState([]);
  const user = useSelector((state: any) => state.reducerAuth.user);
  
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState<any>(1);
  const [afiliados, setAfiliados] = useState<any>([]);
  const [afiliado, setAfiliado] = useState<any>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [listado, setListado] = useState("");
  const history = useHistory();

  const fecthInitial = (cancelToken: any = null) => {
    getConsultas("", user.idpaciente, "", "", "", 1, "", cancelToken)
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            setData(data.data);
            setPage(2);
            setTotalResults(data.totalResults);
          } else {
            setLoad(false);
            setData([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const utlimoRegistros = (cancelToken: any = null) => {
    getConsultasUltimoRg("", user.idpaciente, user.cedula, cancelToken)
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            if (data.data.length > 0) {
              setListado(data.listado);
              setData((prev: any) => [...data.data, ...prev]);
              setTotalResults(data.totalResults + totalResults);
            }
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const fecth = (cancelToken: any) => {
    let dsd = desde !== "" ? formtFechaCorta(desde) : "";
    let hst = hasta !== "" ? formtFechaCorta(hasta) : "";
    getConsultas(
      "",
      user.idpaciente,
      searchTerm,
      dsd,
      hst,
      page,
      listado,
      cancelToken
    )
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            setData((prev: any) => [...prev, ...data.data]);
            setPage(page + 1);
            setTotalResults(data.totalResults);
          } else {
            setLoad(false);
            setData([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const getafiliados = () => {
    getComboAfiliados()
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setAfiliados(data.data);
          } else {
            setAfiliados([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    fecthInitial(source);
    utlimoRegistros(source);
    getafiliados();
    return () => {
      source.cancel("Canceled");
    };
  }, [user]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setLoad(true);
    let formDa = new FormData();
    formDa.append("op", "listado-consultas-interna");
    formDa.append("busqueda", searchTerm);
    formDa.append("idpaciente", user.idpaciente);
    if (desde !== "") {
      let d = formtFechaCorta(desde) || "";
      formDa.append("desde", d);
    }
    if (hasta !== "") {
      let h = formtFechaCorta(hasta) || "";
      formDa.append("hasta", h);
    }
    serviciosConsultas(formDa)
      .then(function (response) {
        const { data, status } = response;
        if (status === 200) {
          setData(data.data);
          setLoad(false);
          setPage(data.current_page + 1);
          setTotalResults(data.totalResults);
        } else {
          setData([]);
          setLoad(false);
        }
      })
      .catch(function (err) {
        console.warn("Error:" + err);
      });
  };

  const loadData = (ev: any) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setTimeout(() => {
      ev.target.complete();
      if (data.length === totalResults) {
        setInfiniteDisabled(true);
      } else {
        fecth(source);
      }
    }, 500);
  };

  const handleClear = () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setSearchTerm("");
    setDesde("");
    setHasta("");
    fecthInitial(source);
  };

  const handelImagenes = () => {
    history.push("/app/imagenologia");
  };
  const handelLaboratorios = () => {
    history.push("/app/laboratorio");
  };
  const handelConsultas = () => {
    history.push("/app/consultas");
  };
  const handelHome = () => {
    history.push("/app/home");
  };

  useIonViewDidEnter(() => {
    getFichaCompleta(user.idpaciente)
      .then((rsp: any) => {
        const { data } = rsp;
        setPerfil(data.data);
        if (data.discapacidades) {
          setDiscapacidades(data.discapacidades);
        }
        if (data.alergias) {
          setAlergias(data.alergias);
        }
        if (data.enfermedades) {
          setEnfermedades(data.enfermedades);
        }
      })
      .catch((error) => {
        console.error("Error en get perfiles" + error);
      });
  });

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light">
          <IonRow className="pt-4 pb-4 mb-2">
            <IonCol size="2" className="px-3 fs-14 text-white">              
                <div className="d-inline">
                  <img src="./images/logo-bieni.svg" alt="imagen" className="d-inline" width={25} />
                  <p className="ml-3 fs-20 font-w600 text-blue-medium d-inline">Bieni</p>
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
                  
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <IonImg src={"./images/notificaciones.svg"} className="w-24-p" />
                  </div>
                  <div className="ml-5 p-perfil-sub">
                    <IonThumbnail slot="start" class="">
                      <img src="./images/sandra.jpg" alt="Laura" />
                    </IonThumbnail>
                  </div>
                  <div className="ml-3 mr-2">
                    <span className="font-w600 text-info d-block">{}{user.nombre}</span>
                    <span className="text-info">Ginecolog&iacute;a</span>
                  </div>
                </div>
            </IonCol>
          </IonRow>

          <IonRow className="mt-0">
            <IonCol size="2" className="pl-0 pr-3">              
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
              <IonRow>
                <IonCol size="12" className="mb-4">
                  <div className="cursor-pointer float-left" onClick={handelHome}>
                    <IonImg
                      src={"./images/volver.svg"}
                      className="mr-2 float-left"
                      style={{ width: "20px" }}
                    />
                    <span className="fs-12 text-blue-light">Volver al tablero</span>
                  </div>
                </IonCol>
                <IonCol size="3" className="pr-3">
                  <IonCard className="m-0 card-slide shadow-full">
                    <IonCardContent className="card-content-slide height-vh-content-right">
                      <InfoPaciente
                        idpaciente="1"
                      />
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol size="9" className="height-vh-content-right">
                  <div className="pb-2">
                    <IonButton
                      className="button-deg no-active fs-12 mr-2"
                      fill="outline"
                      onClick={handelImagenes}
                    >
                      <IonImg
                        src={"./images/estudios-light.svg"}
                        className="mr-2 filter-white"
                        style={{ width: "16px" }}
                      />
                      Im&aacute;genes
                    </IonButton>
                    <IonButton
                      className="button-deg no-active fs-12 mr-2"
                      fill="outline"
                      onClick={handelLaboratorios}
                    >
                      <IonImg
                        src={"./images/laboratorio.svg"}
                        className="mr-2 filter-white"
                        style={{ width: "20px" }}
                      />
                      Laboratorios
                    </IonButton>
                    <IonButton
                      className="button-deg fs-12"
                      fill="outline"
                      onClick={handelConsultas}
                    >
                      <IonImg
                        src={"./images/estetoscopio-light.svg"}
                        className="mr-2 filter-white"
                        style={{ width: "20px" }}
                      />
                      Consultas
                    </IonButton>
                  
                    <div className="float-right">
                      <IonButton
                        className="btn-outline text-info fs-12"
                        fill="outline"
                      >
                        <IonImg
                          src={"./images/descargar.svg"}
                          className="mr-2"
                          style={{ width: "20px" }}
                        />
                        Exportar (Excel)
                      </IonButton>
                    </div>
                  </div>
                  <div className="scroll-y-list pr-3">
                    <h5 className="font-w700 fs-15 text-info-dark mb-2">
                      Reciente
                    </h5>
                    <IonCard className="m-0 mb-3 card-slide shadow-full">
                      <IonCardContent className="card-content-slide">
                        2
                      </IonCardContent>
                    </IonCard>
                    <h5 className="font-w700 fs-15 text-info-dark mb-2">
                      Anteriores
                    </h5>
                    
                    {load ? (
                      "Cargando..."
                    ) : data.length === 0 ? (
                      <IonCard className="m-0 mb-4 card-slide w-100">
                        <IonCardContent className="card-content-slide">
                          <div className="my-2 text-center">
                            Sin resultados disponibles
                          </div>
                        </IonCardContent>
                      </IonCard>
                    ) : (
                      data.map((item: any, index: any) => (
                        <Card item={item} key={index} />
                      ))
                    )}
                  </div>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Consultas;