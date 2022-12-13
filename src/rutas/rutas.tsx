import React from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
import { Login, Registro, Registros } from "../pages";
import RutasPrivadas from "./rutasPrivadas";
import { Autenticadas } from "./HOC";
const Rutas: React.FC = () => {
  return (
    <IonApp>
      <IonRouterOutlet>
        <Route exact path="/">
          <Redirect to="/app/home" />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/registros" component={Registros} />
        <Autenticadas path="/app" component={RutasPrivadas} />
      </IonRouterOutlet>
    </IonApp>
  );
};

export default Rutas;
