import {
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonImg,
  IonButton,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";

const HeaderEstudios: React.FC<{
  title: string;
  handleReload: any;
}> = ({ title, handleReload }) => {
  const path = useLocation();
  const history = useHistory();
  const handleLink = (ruta: string) => {
    history.push(ruta);
  };

  return (
    <IonHeader>
      <div className="p-perfil bg-info-alt border-radius-bottom">
        <IonToolbar>
          <IonTitle className="fs-16 font-w600 text-center mt-2 pt-4 pb-3">
            {title}
          </IonTitle>
          {/*<IonButtons slot="start">
              <IonBackButton
                icon={chevronBackOutline}
                text=""
                className="custom-back text-white"
              />
          </IonButtons>*/}
        </IonToolbar>
        <IonRow className="py-3">
          <IonCol
            size="4"
            className="pl-2 pr-1"
            onClick={() => {
              handleLink("/app/imagenologia");
            }}
          >
            <IonCard
              className={`m-0 card-slide px-2 box-op ${
                path.pathname === "/app/imagenologia" ? "active" : ""
              }`}
            >
              <IonCardContent className="card-content-slide d-flex flex-column align-items-center fs-12 py-2 px-0">
                <span>
                  <IonImg
                    src={"./images/rayosx-light.svg"}
                    className="w-24-p mr-0"
                  />
                </span>
                <span className="d-block">Imagenología</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="4" className="px-2">
            <IonCard
              className={`m-0 card-slide px-2 box-op ${
                path.pathname === "/app/laboratorio" ? "active" : ""
              }`}
              onClick={() => {
                handleLink("/app/laboratorio");
              }}
            >
              <IonCardContent className="card-content-slide d-flex flex-column align-items-center fs-12 py-2 px-0">
                <span>
                  <IonImg
                    src={"./images/microscopio-light.svg"}
                    className="w-24-p mr-0"
                  />
                </span>
                <span className="d-block">Laboratorios</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol
            size="4"
            className="pl-1 pr-2"
            onClick={() => {
              handleLink("/app/consultas");
            }}
          >
            <IonCard
              className={`m-0 card-slide px-2 box-op ${
                path.pathname === "/app/consultas" ? "active" : ""
              }`}
            >
              <IonCardContent className="card-content-slide d-flex flex-column align-items-center fs-12 py-2 px-0">
                <span>
                  <IonImg
                    src={"./images/estetoscopio-light.svg"}
                    className="w-24-p mr-0"
                  />
                </span>
                <span className="d-block">Consultas</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-center">
          {" "}
          <IonButton onClick={handleReload} fill="clear">
            Actualizar
          </IonButton>
        </IonRow>
      </div>
    </IonHeader>
  );
};

export default HeaderEstudios;
