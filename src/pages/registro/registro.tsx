import { useState, useEffect } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonPage,
  IonRow,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonToast,
  IonInput,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Action, CustomField, Header } from "../../components";
import { serviciosPaciente } from "../../servicios";
import { grupoSanguineos, calcularEdad } from "../../helpers";
import { useForm } from "../../hook";
import { storeLocal } from "../../store/action/aut";
import "./registro.css";
const Registro = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sesion = useSelector((state: any) => state.reducerAuth.user);

  const initial = {
    cedula: "",
    fechaNacimiento: "",
    grupoSangre: "",
  };

  const [formulario, handleInputChange, handleInputReset] = useForm(initial);
  const { cedula, fechaNacimiento, grupoSangre } = formulario;
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [condicion, setCondicion] = useState(false);
  const [transition, setTransition] = useState(false);
  const [load, setLoad] = useState(false);
  const [notificacion, setNotificacion] = useState<any>({
    estado: false,
    msg: "",
  });
  const { estado, msg } = notificacion;

  useEffect(() => {
    setNombre(sesion.nombre);
    setCorreo(sesion.correo);
  }, []);

  const resetForm = () => {
    handleInputReset();
    setNombre("");
    setCorreo("");
    setCondicion(false);
  };

  const createAccount = () => {
    setLoad(true);
    if (condicion === true) {
      let formDa = new FormData();
      const { edad } = calcularEdad(fechaNacimiento);
      formDa.append("op", "addPaciente");
      formDa.append("idusuario", sesion.id);
      formDa.append(" nombre", nombre);
      formDa.append("cedula", cedula);
      formDa.append("fechanacimiento", fechaNacimiento);
      formDa.append("gruposangre", grupoSangre);
      formDa.append("edad", edad);
      formDa.append("imagen", sesion.imagen);
      formDa.append("numeroemergencia", "");
      formDa.append("nacionalidad", "");
      formDa.append("discapacidad", "");
      formDa.append("origen", "registro");
      serviciosPaciente(formDa)
        .then(function (response) {
          const { data, status } = response;
          if (status === 200) {
            if (data.rsp === 1) {
              setNotificacion({
                msg: data.msg,
                estado: true,
              });
              let clone = {
                ...sesion,
                idpaciente: data.id,
                idregex: data.idregex,
              };
              setLoad(true);
              let nueva = Object.assign({}, sesion, clone);
              dispatch(storeLocal(nueva));
              history.replace("/app/home");
              resetForm();
            } else {
              setNotificacion({
                msg: data.msg,
                estado: true,
              });
            }
          }
        })
        .catch(function (err) {
          console.warn("Error:" + err);
        });
    } else {
      console.log("Error");
    }
  };

  const handleSiguient = () => {
    if (!condicion) {
      setNotificacion({
        estado: true,
        msg: "Por favor acepte los términos y condiciones",
      });
      return null;
    }
    setTransition(true);
  };

  const photo =
    sesion.imagen !== "" ? sesion.imagen : "./images/perfil-nuevo.svg";
  return (
    <IonPage className="signupPage">
      {transition && (
        <Header title="Registros" isbotton={true} isBuger={false} />
      )}
      <IonContent fullscreen>
        <IonGrid className="ion-padding m-4">
          {!transition && (
            <IonRow className="logo">
              <IonCol
                size="12"
                className="headingText text-center mt-4 pt-5 mb-5"
                style={{
                  color: "#293f76",
                  fontSize: "18px",
                }}
              >
                <img
                  src="./images/logo-bieni.svg"
                  alt="imagen"
                  className=""
                  width={92}
                />
                <p className="mt-2 fs-36 text-info">Bieni</p>
              </IonCol>
            </IonRow>
          )}
          {!transition && (
            <IonRow className="registro-1">
              <IonCol>
                <form className="form-registro">
                  <CustomField
                    label="Nombre completo"
                    name={nombre}
                    setName={setNombre}
                    placeholder=""
                    tipo="text"
                  />
                  <CustomField
                    label="Correo electr&oacute;nico"
                    name={correo}
                    setName={setCorreo}
                    placeholder=""
                    tipo="text"
                  />
                  <div>
                    <IonCheckbox
                      className="float-left mr-2"
                      checked={condicion}
                      onIonChange={(e) => setCondicion(e.detail.checked)}
                    />
                    <IonLabel className="fs-13">
                      Acepto los t&eacute;rminos y condiciones
                    </IonLabel>
                  </div>
                </form>
              </IonCol>
            </IonRow>
          )}
          <IonRow className="cargando-1 d-none">
            <IonCol className="m-4">{transition && "Cargando..."}</IonCol>
          </IonRow>
          {transition && (
            <IonRow className="registro-2">
              <IonCol>
                <form className="form-registro">
                  <div className="text-center subir-perfil">
                    <button className="imagen__botton imagen_perfil_border">
                      <img
                        src={photo}
                        alt="imagen"
                        className="imagen_perfil_default p-4"
                      />
                    </button>
                  </div>
                  <IonItem>
                    <IonLabel position="stacked">
                      N° de documento <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      value={formulario.cedula}
                      onIonChange={(e: any) =>
                        handleInputChange(e.detail.value!, "cedula")
                      }
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Fecha de nacimiento <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      type="date"
                      value={formulario.fechaNacimiento}
                      onIonChange={(e: any) =>
                        handleInputChange(e.detail.value!, "fechaNacimiento")
                      }
                    ></IonInput>
                  </IonItem>
                  <IonList>
                    <IonItem>
                      <IonLabel position="stacked">
                        Grupo sanguíneo <span className="text-danger">*</span>
                      </IonLabel>
                      <IonSelect
                        interface="action-sheet"
                        placeholder="Tipo"
                        value={formulario.grupoSangre}
                        onIonChange={(e: any) =>
                          handleInputChange(e.detail.value!, "grupoSangre")
                        }
                      >
                        {grupoSanguineos.map((item: any, index: any) => (
                          <IonSelectOption value={item.value} key={index}>
                            {item.label}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </IonItem>
                  </IonList>
                </form>
              </IonCol>
            </IonRow>
          )}
          {!transition && (
            <IonRow className="mt-5 siguiente-1 text-center">
              <IonCol size="12">
                <IonButton
                  className="btn-outline text-info px-5"
                  fill="outline"
                  onClick={handleSiguient}
                >
                  Siguiente
                </IonButton>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>

      {transition && (
        <IonFooter className="registrarme-1">
          <IonRow className="mx-4 mb-4">
            <IonCol size="12">
              <IonButton
                className="button-central-deg"
                expand="block"
                fill="clear"
                onClick={createAccount}
              >
                {!load ? "Registrarme" : "Creando perfil"}
              </IonButton>
            </IonCol>
          </IonRow>
          <IonGrid className="ion-no-margin ion-no-padding d-none">
            <Action
              message="¿Ya tienes una cuenta?"
              text="Iniciar sesión"
              link="/login"
            />
          </IonGrid>
        </IonFooter>
      )}
      <IonToast
        isOpen={estado}
        onDidDismiss={() => setNotificacion({ ...notificacion, estado: false })}
        message={msg}
        duration={200}
      />
    </IonPage>
  );
};

export default Registro;
