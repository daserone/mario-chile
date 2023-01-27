import { IonGrid, IonRow, IonContent, IonPage } from "@ionic/react";

interface Props {
  texto: string;
}

export const InfoPeticion: React.FC<Props> = ({ texto }) => {
  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light">
          <IonRow
            className="pt-4 pb-4 mb-2 ion-justify-content-center"
            style={{
              height: "100vh",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span className="spinner-border mb-4"></span>
              <h1>{texto}</h1>
            </div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
