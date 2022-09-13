import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonSearchbar,
  IonButton,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faUserDoctor,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { Header, Boxfull } from "../../components";
import { Link } from "react-router-dom";
import "../../style/tema.css";

const ProximasCitas = () => {
  return (
    <IonPage className="fondo">
      {<Header title="Próximas citas" isbotton={true} isBuger={false} />}

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-2 px-3">
            <IonCol size="12" className="pb-3">
              <div
                className="searchContainer mt-1 mb-4 d-inline-block"
                style={{ width: "88%" }}
              >
                <IonSearchbar placeholder="Buscar..." slot="end" class="px-0" />
              </div>
              <div
                className="d-inline-block text-right"
                style={{ width: "12%" }}
              >
                <Link
                  to="proximas-citas"
                  className="bg-info-alt d-inline-block btn-filter fs-16 btn-shadow"
                >
                  <FontAwesomeIcon
                    icon={faSliders}
                    className="mr-0 float-right text-white"
                  />
                </Link>
              </div>

              <IonRow>
                <IonCol size="6">
                  <div className="fs-10 mb-3" style={{ lineHeight: "normal" }}>
                    Citas:{" "}
                    <span className="d-block text-info fs-12">
                      Pendientes 2
                    </span>
                  </div>
                </IonCol>
                <IonCol size="6" className="text-right">
                  <div className="fs-10 mb-3" style={{ lineHeight: "normal" }}>
                    Ordenar por:{" "}
                    <span className="d-block text-info fs-12">
                      Más próximo
                    </span>
                  </div>
                </IonCol>
              </IonRow>

              <IonCard
                className="m-0 card-slide shadow-full"
                style={{ height: "auto" }}
              >
                <IonCardContent className="card-content-slide">
                  <Boxfull
                    title="Traumatología"
                    imageTitle=""
                    iconTop=""
                    fechaTop="15 Jun"
                    horaTop="17:30"
                    yearTop=""
                    iconTextoUno="centro-light"
                    textoUno="Centro médico OSDE"
                    iconTextoDos="doctor-light"
                    textoDos="Juan Fernando"
                    iconTextoTres=""
                    textoTres=""
                    iconTextoCuatro=""
                    textoCuatro=""
                    linkBottomLeft=""
                    linkBottomRight=""
                    textLinkBottomLeft=""
                    textLinkBottomRight=""
                    ir={true}
                    linkIr="detalle-cita"
                    tipo=""
                  />
                </IonCardContent>
              </IonCard>
              <IonCard
                className="m-0 mt-2 card-slide shadow-full"
                style={{ height: "auto" }}
              >
                <IonCardContent className="card-content-slide">
                  <Boxfull
                    title="Odontología"
                    imageTitle=""
                    iconTop=""
                    fechaTop="20 Jun"
                    horaTop="09:00"
                    yearTop=""
                    iconTextoUno="centro-light"
                    textoUno="Centro médico OSDE"
                    iconTextoDos="doctor-light"
                    textoDos="Juan Fernando"
                    iconTextoTres=""
                    textoTres=""
                    iconTextoCuatro=""
                    textoCuatro=""
                    linkBottomLeft=""
                    linkBottomRight=""
                    textLinkBottomLeft=""
                    textLinkBottomRight=""
                    ir={true}
                    linkIr="detalle-cita"
                    tipo=""
                  />
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
            <IonCol>
                <div className="text-center mt-2">
                  <IonButton
                    className="button-central-deg"
                    fill="clear"
                  >
                    Registrar nueva cita
                  </IonButton>
                </div>
              </IonCol>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ProximasCitas;
