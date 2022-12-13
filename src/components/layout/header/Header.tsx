import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonMenuButton,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
export const Header: React.FC<{
  title: string;
  isbotton: boolean;
  isBuger: boolean;
}> = ({ title, isbotton, isBuger }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="fs-20 font-w700 text-info-dark text-center py-4">
            {title}
          </IonTitle>
          {isbotton && (
            <IonButtons slot="start">
              <IonBackButton
                icon={chevronBackOutline}
                className="custom-back text-gray-medium"
              />
            </IonButtons>
          )}
          {isBuger && (
            <IonButtons slot="start">
              <IonMenuButton color="dark" />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
    </>
  );
};
