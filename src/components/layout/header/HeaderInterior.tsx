import {
  IonRow,
  IonCol,
  IonImg,
  IonThumbnail,
  IonSearchbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
export const HeaderInterior: React.FC = () => {
  const history = useHistory();
  const user = useSelector((state: any) => state.reducerAuth.user);

  const handelNotificaciones = () => {
    history.push("/app/notificaciones");
  };

  return (
    <IonRow className="pt-4 pb-4 mb-2">
      <IonCol size="2" className="px-3 fs-14 text-white">
        <div className="d-inline">
          <img
            src="./images/logo-bieni.svg"
            alt="imagen"
            className="d-inline"
            width={25}
          />
          <p className="ml-3 fs-20 font-w600 text-info d-inline">Bieni</p>
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
        <div
          className="float-right fs-14 d-flex flex-row"
          onClick={handelNotificaciones}
          style={{ cursor: "pointer" }}
        >
          <div className="align-self-center">
            <IonImg src={"./images/notificaciones.svg"} className="w-24-p" />
          </div>
          <div className="ml-5 p-perfil-sub">
            <IonThumbnail slot="start" class="">
              <img src="./images/sandra.jpg" alt="Laura" />
            </IonThumbnail>
          </div>
          <div className="ml-3 mr-2">
            <span className="fs-15 font-w700 text-info d-block">
              Dra. {}
              {user.nombre}
            </span>
            <span className="text-info font-w600">Ginecología</span>
          </div>
        </div>
      </IonCol>
    </IonRow>
  );
};
