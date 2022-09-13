import React from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";
import { Login, Registro, Registros } from "../pages";
import RutasPrivadas from "./rutasPrivada";
import { Autenticadas } from "./HOC";
const RootRutas: React.FC = () => {
  const isAuth: any = useSelector<any>((state) => state.reducerAuth.stdAuth);
  return (
    <IonApp>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/registros" component={Registros} />
        <Autenticadas path="/app" Auth={isAuth} component={RutasPrivadas} />
        <Route exact path="/">
          <Redirect to="/registros" />
        </Route>
      </IonRouterOutlet>
    </IonApp>
  );
};

export default RootRutas;
