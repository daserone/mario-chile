import { IonCard, IonCardContent } from "@ionic/react";
import { faHospital, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { Boxfull } from "../../components";
import "./consultas.css";

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
        <Boxfull
          title={item.consulta}
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
          linkIr={`detalle-consulta/${item.id}`}
          tipo=""
        />
      </IonCardContent>
    </IonCard>
  );
};
