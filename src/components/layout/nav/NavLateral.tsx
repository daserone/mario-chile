import { IonCol, IonImg, IonLabel, IonItem } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logout } from "../../../store";
import { dataMenu } from "../../../data";

interface location {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: any;
}

export const NavLateral: React.FC = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const handleLogout = (event: any) => {
    dispatch(logout());
  };

  const handleLink = (url: string) => {
    history.push(url);
  };

  return (
    <IonCol size="2" className="pl-0 pr-3">
      <div className="px-3 py-5 bg-info-alt border-menu menu-principal height-vh-content">
        {dataMenu
          .filter((item: any) => item.estado === "activo")
          .map((item: any, index: number) => (
            <IonItem
              lines="none"
              button
              onClick={() => {
                handleLink(item.ruta);
              }}
              className={`mb-3 ${item.ruta === pathname ? "active" : ""}`}
              key={index}
            >
              <IonImg
                src={item.img}
                className="mr-2"
                style={{ width: "26px" }}
              />
              <IonLabel>{item.nombre}</IonLabel>
            </IonItem>
          ))}

        <IonItem lines="none" button onClick={handleLogout} className="mb-3">
          <IonImg
            src={"./images/cerrar-sesion.svg"}
            className="mr-3"
            style={{ width: "20px" }}
          />
          <IonLabel>Cerrar sesi&oacute;n</IonLabel>
        </IonItem>
      </div>
    </IonCol>
  );
};
