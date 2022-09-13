import React, { useEffect } from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  IonImg,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
//import { Nav } from "../components";
import {
  Cuentas,
  Home,
  CitaCrear,
  Datos,
  EditDatos,
  Consultas,
  Imagenologia,
  Laboratorio,
  ExamenLab,
  Afiliados,
  Afiliado,
  Perfil,
  Perfiles,
  PerfilAlergias,
  PerfilCrear,
  PerfilEditar,
  PerfilEnfermedades,
  FichaCompleta,
  PerfilCompartir,
  Aseguradora,
  ContactoEmergencia,
  MisMedicos,
  MisMedicamentos,
  MiMedicamentoDetail,
  Discapacidad,
  PerfilTratamientos,
  Notificaciones,
  ProximasCitas,
  DetalleCita,
  DetalleConsulta,
  Soporte,
} from "../pages";
import { tabActive, NOTAB } from "../helpers";
import "../style/tema.css";

const RutasPrivadas: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const isAuth: any = useSelector<any>((state) => state.reducerAuth.stdAuth);
  const history = useHistory();

  useEffect(() => {
    if (!isAuth) {
      history.replace("/");
    }
  }, [history, isAuth]);

  return (
    <>
      <IonTabs>
        <IonRouterOutlet id="navApp">
          <Route exact path="/app/cuentas">
            <Cuentas />
          </Route>
          <Route exact path="/app/cuenta-crear">
            <PerfilCrear />
          </Route>
          <Route exact path="/app/home">
            <Home />
          </Route>
          <Route exact path="/app/crear-cita">
            <CitaCrear />
          </Route>
          <Route exact path="/app/datos">
            <Datos />
          </Route>
          <Route exact path="/app/datos-editar">
            <EditDatos />
          </Route>
          <Route exact path="/app/consultas">
            <Consultas />
          </Route>
          <Route path="/app/imagenologia">
            <Imagenologia />
          </Route>
          <Route path="/app/laboratorio">
            <Laboratorio />
          </Route>
          <Route path="/app/laboratorio-examen/:id">
            <ExamenLab />
          </Route>
          <Route exact path="/app/afiliados">
            <Afiliados />
          </Route>
          <Route exact path="/app/afiliado/:id">
            <Afiliado />
          </Route>
          <Route exact path="/app/perfil">
            <Perfil />
          </Route>
          <Route exact path="/app/perfiles">
            <Perfiles />
          </Route>
          <Route exact path="/app/perfil-crear">
            <PerfilCrear />
          </Route>
          <Route exact path="/app/perfil-editar">
            <PerfilEditar />
          </Route>
          <Route exact path="/app/perfil-enfermedades">
            <PerfilEnfermedades />
          </Route>
          <Route exact path="/app/ficha-completa">
            <FichaCompleta />
          </Route>
          <Route exact path="/app/perfil-compartir">
            <PerfilCompartir />
          </Route>
          <Route exact path="/app/discapacidad">
            <Discapacidad />
          </Route>
          <Route exact path="/app/aseguradora">
            <Aseguradora />
          </Route>
          <Route exact path="/app/contacto-emergencia">
            <ContactoEmergencia />
          </Route>
          <Route exact path="/app/mis-medicos">
            <MisMedicos />
          </Route>
          <Route exact path="/app/mis-medicamentos">
            <MisMedicamentos />
          </Route>
          <Route exact path="/app/mis-medicamentos-detalle/:id">
            <MiMedicamentoDetail />
          </Route>
          <Route exact path="/app/perfil-alergias">
            <PerfilAlergias />
          </Route>
          <Route exact path="/app/perfil-tratamientos">
            <PerfilTratamientos />
          </Route>
          <Route exact path="/app/notificaciones">
            <Notificaciones />
          </Route>
          <Route exact path="/app/proximas-citas">
            <ProximasCitas />
          </Route>
          <Route exact path="/app/detalle-cita">
            <DetalleCita />
          </Route>
          <Route exact path="/app/detalle-consulta/:id">
            <DetalleConsulta />
          </Route>
          <Route exact path="/app/soporte">
            <Soporte />
          </Route>
          <Route exact path="/app">
            <Redirect to="/app/cuentas" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar
          slot="bottom"
          className={`bar-menu ${NOTAB.includes(pathname) ? "d-none" : ""}`}
        >
          <IonTabButton tab="tab1" href="/app/home" className="text-info">
            <div
              className={`icon-menu d-flex flex-column align-items-center fs-12 ${tabActive(
                "/app/home",
                pathname
              )}`}
            >
              {/*<FontAwesomeIcon icon={faHome} className="fs-18 w-100" />*/}
              {tabActive("/app/home", pathname) ? (
                <IonImg
                  src={"./images/home-bold.svg"}
                  style={{ width: "24px" }}
                />
              ) : (
                <IonImg
                  src={"./images/home-light.svg"}
                  style={{ width: "24px" }}
                />
              )}
              Inicio
            </div>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/app/consultas" className="text-info">
            <div
              className={`icon-menu d-flex flex-column align-items-center fs-12 ${tabActive(
                "/app/consultas",
                pathname
              )}`}
            >
              {/*<FontAwesomeIcon icon={faClipboardList} className="fs-18 w-100" />*/}
              {tabActive("/app/consultas", pathname) ||
              tabActive("/app/laboratorio", pathname) ||
              tabActive("/app/imagenologia", pathname) ? (
                <IonImg
                  src={"./images/estudios-bold.svg"}
                  style={{ width: "24px" }}
                />
              ) : (
                <IonImg
                  src={"./images/estudios-light.svg"}
                  style={{ width: "24px" }}
                />
              )}
              Estudios
            </div>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/app/afiliados" className="text-info">
            <div
              className={`icon-menu d-flex flex-column align-items-center fs-12 ${tabActive(
                "/app/afiliados",
                pathname
              )}`}
            >
              {/*<FontAwesomeIcon icon={faDiagramProject} className="fs-18 w-100" />*/}
              {tabActive("/app/afiliados", pathname) ? (
                <IonImg
                  src={"./images/afiliados-bold.svg"}
                  style={{ width: "24px" }}
                />
              ) : (
                <IonImg
                  src={"./images/afiliados-light.svg"}
                  style={{ width: "24px" }}
                />
              )}
              Afiliados
            </div>
          </IonTabButton>
          <IonTabButton tab="tab5" href="/app/perfil" className="text-info">
            <div
              className={`icon-menu d-flex flex-column align-items-center fs-12 ${tabActive(
                "/app/perfil",
                pathname
              )}`}
            >
              {/*<FontAwesomeIcon icon={faUser} className="fs-18 w-100" />*/}
              {tabActive("/app/perfil", pathname) ? (
                <IonImg
                  src={"./images/perfil-bold.svg"}
                  style={{ width: "24px" }}
                />
              ) : (
                <IonImg
                  src={"./images/perfil-light.svg"}
                  style={{ width: "24px" }}
                />
              )}
              Perfil
            </div>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};
export default RutasPrivadas;
