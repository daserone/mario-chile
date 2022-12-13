import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabBar, IonTabs } from "@ionic/react";
import {
  Cuentas,
  Home,
  Niveles,
  Nivel,
  Usuarios,
  Usuario,
  ValidacionIngresos,
} from "../pages";
import "../style/tema.css";

const RutasPrivadas: React.FC = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet id="navApp">
          <Route exact path="/app/cuentas">
            <Cuentas />
          </Route>
          <Route exact path="/app/home">
            <Home />
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
          <Route exact path="/app/validacion-ingresos">
            <ValidacionIngresos />
          </Route>
          <Route exact path="/app">
            <Redirect to="/app/cuentas" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className="d-none"></IonTabBar>
      </IonTabs>
    </>
  );
};
export default RutasPrivadas;
