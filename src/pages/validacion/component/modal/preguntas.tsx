import { useState } from "react";
import {
  IonRow,
  IonCol,
  IonContent,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { getPreguntas } from "../../../../servicios/preguntas";
interface Props {
  modal: boolean;
  tipo: any;
  setModal: (param: boolean) => void;
}
export const ModalPreguntas: React.FC<Props> = ({ tipo, modal, setModal }) => {
  const { data: preguntas } = useQuery(["preguntas"], () => getPreguntas(tipo));

  return (
    <IonModal isOpen={modal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="p-3">Documento de identidad</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setModal(false)}>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="text-center">
        <IonRow>
          <IonCol size="5" className="px-3"></IonCol>
        </IonRow>
      </IonContent>
    </IonModal>
  );
};
