import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonBadge, IonItem, useIonViewDidEnter } from "@ionic/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { INITIALPERFIL, fechaPerfil, imgPerfil } from "../../helpers";
import { getFichaCompleta } from "../../servicios";

const InfoPaciente: React.FC<{
    idpaciente?: string;
  }> = ({
    idpaciente,
  }) => {
    const [perfil, setPerfil] = useState(INITIALPERFIL);
    const [alergias, setAlergias] = useState([]);
    const [enfermedades, setEnfermedades] = useState([]);
    const [discapacidades, setDiscapacidades] = useState([]);    

    useIonViewDidEnter(() => {
        getFichaCompleta(idpaciente)
        .then((rsp: any) => {
        const { data } = rsp;
        setPerfil(data.data);
        if (data.discapacidades) {
            setDiscapacidades(data.discapacidades);
        }
        if (data.alergias) {
            setAlergias(data.alergias);
        }
        if (data.enfermedades) {
            setEnfermedades(data.enfermedades);
        }
        })
        .catch((error) => {
        console.error("Error en get perfiles" + error);
        });
    });

    const FOTO = imgPerfil(perfil.imagen, '1');

    return (
      <>
        <div>
            <div className="text-center">
                <img src={FOTO} alt={perfil.imagen} className="border-radius mb-1" style={{width: '60px'}} />
                <div className="mb-1 font-w500">{perfil.nombre}</div>
                <IonBadge color="warning" className="px-2 py-1 fs-12 font-w100 border-badge">Agendado</IonBadge>
            </div>
            <div className="scroll-y-detail">
                <div className="px-2">
                    <p className="fs-12 mb-2">
                    <span className="font-w500">Edad:</span> <span className="float-right">{perfil.edad}</span>
                    </p>
                    <p className="fs-12 mb-2">
                    <span className="font-w500">C&eacute;dula:</span> <span className="float-right">{perfil.cedula}</span>
                    </p>
                    <p className="fs-12 mb-4">
                    <span className="font-w500">Grupo sangu&iacute;neo:</span> <span className="float-right">{perfil.gruposangre}</span>
                    </p>
                </div>
                <div className="px-2">
                    <IonItem>
                    <div className="w-100 pb-1">
                        <div className="fs-12">
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="text-info-dark mr-2 fs-6"
                        />
                        Fecha de nacimiento
                        </div>
                        <div className="fs-12 font-w500 pl-3">
                        {fechaPerfil(perfil.fechanacimiento)}
                        </div>
                    </div>
                    </IonItem>
                    <IonItem>
                    <div className="w-100 pt-3 pb-1">
                        <div className="fs-12">
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="text-info-dark mr-2 fs-6"
                        />
                        Discapacidad
                        </div>
                        <div className="fs-12 font-w500 pl-3">
                            {perfil.discapacidad}
                            {discapacidades.map((item: any, index: number) => (
                                <div key={index} className="float-left">
                                    <span>{item.nombre}</span>
                                </div>
                            ))}
                            <span className="fs-12 text-info-light text-underline float-right cursor-pointer">
                                Ver carnet de SENADIS
                            </span>
                        </div>
                    </div>
                    </IonItem>
                    <IonItem>
                    <div className="w-100 pt-3 pb-1">
                        <div className="fs-12">
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="text-info-dark mr-2 fs-6"
                        />
                        Enfermedades
                        </div>
                        <div className="fs-12 font-w500 pl-3">
                        <ul>
                            {enfermedades.map((item: any, index: number) => (
                            <div key={index}>
                                <span>{item.nombre}</span>
                            </div>
                            ))}
                        </ul>
                        </div>
                    </div>
                    </IonItem>
                    <IonItem>
                    <div className="w-100 pt-3 pb-1">
                        <div className="fs-12">
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="text-info-dark mr-2 fs-6"
                        />
                        Alergias
                        </div>
                        <div className="fs-12 font-w500 pl-3">
                        <ul>
                            {alergias.map((item: any, index: number) => (
                            <div key={index}>
                                <div>
                                {item.estado === "activa" ? (
                                    <FontAwesomeIcon
                                    icon={faCircle}
                                    className="text-info mr-2 fs-12"
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                    icon={faCircle}
                                    className="mr-2 fs-12"
                                    style={{ color: "#a1a1a1" }}
                                    />
                                )}
                                <span className="fs-13">
                                    {item.alergia} ({item.grupo})
                                </span>
                                </div>
                            </div>
                            ))}
                        </ul>
                        </div>
                    </div>
                    </IonItem>
                </div>
            </div>
        </div>
      </>
    );
  };
  
  export default InfoPaciente;