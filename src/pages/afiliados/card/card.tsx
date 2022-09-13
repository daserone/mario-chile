import { IonAccordion, IonItem, IonLabel } from "@ionic/react";
import {
  faCircle,
  faHospital,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { BoxfullGeneral } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ContainerProps {
  item: any;
  value: any;
}

const ContentCard: React.FC<ContainerProps> = ({ item, value }) => {
  return (
    <div>
      {item.tipo === "consulta" && (
        <IonAccordion value={value}>
          <IonItem slot="header">
            <IonLabel className="text-body fs-14 d-flex">
              <FontAwesomeIcon icon={faCircle} className="fs-6 mr-2 mt-2" />
              Consulta - {item.consulta}
            </IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            <BoxfullGeneral
              title=""
              imageTitle=""
              iconTop=""
              fechaTop={item.fecha}
              horaTop=""
              yearTop={item.year}
              iconTextoUno="centro-light"
              textoUno={item.centro}
              iconTextoDos="doctor-light"
              textoDos={item.profesionalsalud}
              iconTextoTres=""
              textoTres=""
              iconTextoCuatro=""
              textoCuatro=""
              linkBottomLeft=""
              linkBottomRight=""
              textLinkBottomLeft=""
              textLinkBottomRight=""
              ir={true}
              linkIr={`/app/detalle-consulta/${item.id}`}
              tipo=""
              textoUrlExternaLeft=""
              urlExternaLeft=""
            />
          </div>
        </IonAccordion>
      )}
      {item.tipo === "laboratorio" && (
        <IonAccordion value={value}>
          <IonItem slot="header">
            <IonLabel className="text-body fs-14 d-flex">
              <FontAwesomeIcon icon={faCircle} className="fs-6 mr-2 mt-2" />
              Laboratorio - {item.servicio}
            </IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            <BoxfullGeneral
              title=""
              imageTitle=""
              iconTop=""
              fechaTop={item.fecha}
              horaTop=""
              yearTop={item.year}
              iconTextoUno="centro-light"
              textoUno={item.unidad}
              iconTextoDos="doctor-light"
              textoDos={item.medico}
              iconTextoTres=""
              textoTres=""
              iconTextoCuatro=""
              textoCuatro=""
              linkBottomLeft=""
              linkBottomRight=""
              textLinkBottomLeft=""
              textLinkBottomRight="Compartir"
              ir={false}
              linkIr=""
              tipo=""
              textoUrlExternaLeft="Ver informe"
              urlExternaLeft={item.url}
            />
          </div>
        </IonAccordion>
      )}
      {item.tipo === "imagenologia" && (
        <IonAccordion value={value}>
          <IonItem slot="header">
            <IonLabel className="text-body fs-14 d-flex">
              <FontAwesomeIcon icon={faCircle} className="fs-6 mr-2 mt-2" />
              Imagenología - {item.estudio}
            </IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            <BoxfullGeneral
              title=""
              imageTitle=""
              iconTop=""
              fechaTop={item.fecha}
              horaTop=""
              yearTop={item.year}
              iconTextoUno="centro-light"
              textoUno={item.unidad}
              iconTextoDos="doctor-light"
              textoDos=""
              iconTextoTres=""
              textoTres=""
              iconTextoCuatro=""
              textoCuatro=""
              linkBottomLeft=""
              linkBottomRight=""
              textLinkBottomLeft=""
              textLinkBottomRight=""
              ir={false}
              linkIr=""
              tipo=""
              textoUrlExternaLeft="Ver informe"
              urlExternaLeft={item.url}
            />
          </div>
        </IonAccordion>
      )}
    </div>
  );
};

export default ContentCard;
