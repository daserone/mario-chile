import { IonCol } from "@ionic/react";
import "./info.css";
interface Props {
  value: string;
  title: string;
}

export const Info: React.FC<Props> = ({ value, title }) => (
  <IonCol size="4" className="figure">
    <h6>{title}</h6>
    <p>{value}</p>
  </IonCol>
);
