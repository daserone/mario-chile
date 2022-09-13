import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import "./perfil.css";
import "../../style/tema.css";
import { HeaderPerfil } from "../../components";

const ContactoEmergencia = () => { 
  return (
    <IonPage className="fondo">
      <HeaderPerfil title='Contacto de emergencia' />      

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-4 px-3">
            <IonCol size="12" className="pb-3">
              <IonRow>
                <IonCol size="12">
                  <h5 className="font-w600 fs-16 text-info-dark mb-2">
                    Contacto de emergencias
                  </h5>
                </IonCol>
              </IonRow>

              <IonCard className="m-0 card-slide shadow-full" style={{ height: "auto" }}>
                <IonCardContent className="card-content-slide">
                    <div className="w-100 pb-1">
                        <div className="fs-12">
                            <FontAwesomeIcon icon={faUserPlus} className="text-info-dark mr-2" /> 
                            Seleccionar de mi lista de contactos
                        </div>
                    </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ContactoEmergencia;
