import { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  useIonViewDidEnter,
  IonLabel,
} from "@ionic/react";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { getConsultaDetalle } from "../../servicios/servicios";
import { Header, Boxfull } from "../../components";
import { INITIALCONSULTA } from "../../helpers";
import "../../style/tema.css";

const DetalleConsulta = () => {
  const { id }: any = useParams();
  const [load, setLoad] = useState<Boolean>(true);
  const [detalle, setDetalle] = useState<any>(INITIALCONSULTA);
  const [tratamientos, setTratamientos] = useState<any>([]);
  const [diagnosticos, setDiagnosticos] = useState<any>([]);

  useIonViewDidEnter(() => {
    setLoad(true);
    getConsultaDetalle(id)
      .then((rsp) => {
        const { data, status } = rsp;
        if (status === 200) {
          if (data) {
            setLoad(false);
            const [consulta] = data.data;
            setDetalle(consulta);
            let d = JSON.parse(consulta.diagnosticos);
            let t = JSON.parse(consulta.tratamientos);
            setDiagnosticos(d?.diagnosticos);
            setTratamientos(t?.tratamientos);
          } else {
            setDetalle(INITIALCONSULTA);
            setTratamientos([]);
            setDiagnosticos([]);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  });

  return (
    <IonPage className="fondo">
      <Header title="Consultas" isbotton={true} isBuger={false} />

      <IonContent fullscreen className="bg-light">
        <IonGrid className="pb-4">
          <IonRow className="mt-2 px-3">
            <IonCol size="12" className="pb-3 border-bottom">
              <h5 className="font-w700 fs-15 text-info-dark mb-3">Histórico</h5>
              <IonCard
                className="m-0 card-slide shadow-full"
                style={{ height: "auto" }}
              >
                <IonCardContent className="card-content-slide">
                  <Boxfull
                    title={detalle.centro}
                    imageTitle=""
                    iconTop=""
                    fechaTop={detalle.fecha}
                    horaTop=""
                    yearTop={detalle.year}
                    iconTextoUno="centro-light"
                    textoUno={detalle.centro}
                    iconTextoDos="doctor-light"
                    textoDos={detalle.profesionalsalud}
                    iconTextoTres={faLocationDot}
                    textoTres=""
                    iconTextoCuatro={faPhone}
                    textoCuatro=""
                    linkBottomLeft=""
                    linkBottomRight=""
                    textLinkBottomLeft=""
                    textLinkBottomRight=""
                    ir={false}
                    linkIr="#"
                    tipo=""
                  />

                  <div>
                    <div className="fs-15 font-w600 text-info my-3">
                      Resumen de consulta
                    </div>
                    <div className="mb-3">
                      <span className="fs-13 font-w600 d-block">
                        Motivo de la visita:{" "}
                      </span>
                      {detalle?.motivo}
                    </div>
                    <div className="mb-3">
                      <span className="fs-13 font-w600 d-block">
                        Observaciones del diagnósticos:{" "}
                      </span>
                      {detalle?.observaciones}
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="fs-13 font-w600 d-block">
                      Lista de afecciones o diagnósticos:{" "}
                    </span>
                    {load
                      ? "Cargando..."
                      : diagnosticos.length === 0
                      ? "Sin registro de tratamientos"
                      : diagnosticos.map((item: any) => (
                          <div key={item.id}>
                            <ul className="content__frecuencia">
                              <li className="item__frecuencia fs-13 font-w500 active">
                                Primera vez
                              </li>
                              <li className="item__frecuencia fs-13 font-w500">
                                Subsecuente
                              </li>
                              <li className="item__frecuencia fs-13 font-w500">
                                Orient.Diagnóstica
                              </li>
                            </ul>
                            <div>
                              <IonLabel>{item.text}</IonLabel>
                            </div>
                          </div>
                        ))}
                  </div>
                  <div className="mb-3">
                    <span className="fs-13 font-w600 d-block">
                      Tratamientos:
                    </span>
                    {load
                      ? "Cargando..."
                      : tratamientos.length === 0
                      ? "Sin registro de tratamientos"
                      : tratamientos.map((item: any, index: any) => (
                          <div key={index}>
                            <div>{item.textmedicamento}</div>
                            <div>
                              <span className="fs-13 font-w600">Desde: </span>
                              {item.fechaini}
                            </div>
                            <div>
                              <span className="fs-13 font-w600">Hasta: </span>
                              {item.fechafin}
                            </div>
                            <div>
                              {item.dosis}{" "}
                              <span className="fs-13 font-w600">cada </span>{" "}
                              {item.cadah}
                              horas{" "}
                              <span className="fs-13 font-w600">durante </span>
                              {item.duracion}
                            </div>
                          </div>
                        ))}
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

export default DetalleConsulta;
