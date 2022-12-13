import { IonCol, IonImg, IonLabel, IonItem } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logout } from "../../../store";

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
    if (url === "/app/validacion-ingresos") {
      history.push("/app/validacion-ingresos");
    }
    if (url === "/app/niveles") {
      history.push("/app/niveles");
    }
    if (url === "/app/usuarios") {
      history.push("/app/usuarios");
    }
  };

  let rutas = [
    {
      img: "./images/afiliados-light.svg",
      nombre: "Mis pacientes",
      ruta: "/app/mis-pacientes",
    },
    {
      img: "./images/doctor-light.svg",
      nombre: "Perfil",
      ruta: "/app/perfil",
    },
    {
      img: "./images/configuracion.svg",
      nombre: "Validaciones",
      ruta: "/app/validacion-ingresos",
    },
    {
      img: "./images/configuracion.svg",
      nombre: "Soporte",
      ruta: "/app/soporte",
    },
    {
      img: "./images/configuracion.svg",
      nombre: "Niveles",
      ruta: "/app/niveles",
    },
    {
      img: "./images/configuracion.svg",
      nombre: "Usuarios",
      ruta: "/app/usuarios",
    },
  ];

  return (
    <IonCol size="2" className="pl-0 pr-3">
      <div className="px-3 py-5 bg-info-alt border-menu menu-principal height-vh-content">
        {rutas.map((item: any, index: number) => (
          <IonItem
            lines="none"
            button
            onClick={() => {
              handleLink(item.ruta);
            }}
            className={`mb-3 ${item.ruta === pathname ? "active" : ""}`}
            key={index}
          >
            <IonImg src={item.img} className="mr-2" style={{ width: "26px" }} />
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
