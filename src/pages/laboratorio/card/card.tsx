import { IonCard, IonCardContent } from "@ionic/react";
import { BoxfullGeneral } from "../../../components";
import "./card.css";

interface ContainerProps {
  item: any;
}

export const Card: React.FC<ContainerProps> = ({ item }) => {
  return (
    <IonCard
      className="m-0 mt-2 card-slide shadow-full"
      style={{ height: "auto" }}
    >
      <IonCardContent className="card-content-slide">
        <BoxfullGeneral
          title={item.servicio}
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
          linkIr={`/app/laboratorio-examen/${item.id}`}
          tipo=""
          textoUrlExternaLeft="Ver informe"
          urlExternaLeft={item.url}
        />
      </IonCardContent>
    </IonCard>
  );
};
