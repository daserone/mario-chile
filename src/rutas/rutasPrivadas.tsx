import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabBar, IonTabs } from "@ionic/react";
import {
  Home,
  Niveles,
  Nivel,
  Usuarios,
  Usuario,
  Afiliados,
  CuentasValidar,
  DependientesValidar,
  Notificaciones,
  Paciente,
  Pacientes,
} from "../pages";
import "../style/tema.css";

const RutasPrivadas: React.FC = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet id="navApp">
          <Route exact path="/app/home">
            <Home />
          </Route>
          <Route exact path="/app/validacion-cuentas">
            <CuentasValidar />
          </Route>
          <Route exact path="/app/validacion-dependientes">
            <DependientesValidar />
          </Route>
          <Route exact path="/app/notificaciones">
            <Notificaciones />
          </Route>
          <Route exact path="/app/niveles">
            <Niveles />
          </Route>
          <Route exact path="/app/nivel/:id">
            <Nivel />
          </Route>
          <Route exact path="/app/usuarios">
            <Usuarios />
          </Route>
          <Route exact path="/app/usuario/:id">
            <Usuario />
          </Route>
          <Route exact path="/app/afiliados">
            <Afiliados />
          </Route>
          <Route exact path="/app/pacientes">
            <Pacientes />
          </Route>
          <Route exact path="/app/paciente/:idu/:idp">
            <Paciente />
          </Route>
          <Route exact path="/app">
            <Redirect to="/app/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className="d-none"></IonTabBar>
      </IonTabs>
    </>
  );
};
export default RutasPrivadas;
