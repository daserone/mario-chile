import {
  IonContent,
  IonPage,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter,
  IonToast,
} from "@ionic/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Action, CustomField } from "../../components";
import { storeLocal } from "../../store/action/aut";
import { authentication } from "../../servicios/servicios";
import "./login.css";
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [usuario, setUsuario] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [toast, setToast] = useState(false);
  const [notificacion, setNotificacion] = useState(false);

  const handleLogin = (event: any) => {
    event.preventDefault();
    if (usuario !== "" && cedula !== "") {
      let formDa = new FormData();
      formDa.append("op", "dologinWithCredencial");
      formDa.append("correo", usuario);
      formDa.append("cedula", cedula);
      authentication(formDa)
        .then(function (response) {
          const { data, status } = response;
          if (status === 200) {
            if (data.rsp === 1) {
              dispatch(storeLocal(data.data));
              history.push("/app");
              setUsuario("");
              setCedula("");
            } else {
              setToast(true);
              setUsuario("");
              setCedula("");
            }
          }
        })
        .catch(function (err) {
          console.warn("Error:" + err);
        });
    } else {
      setNotificacion(true);
    }
  };

  return (
    <IonPage className="loginPage">
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol
              size="12"
              className="headingText text-center mt-5 pt-5 mb-3"
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
          <IonRow>
            <IonCol className="mx-4 mb-3 form-login">
              <form>
                <CustomField
                  label="Correo"
                  name={usuario}
                  setName={setUsuario}
                  placeholder="correo@gmail.com"
                  tipo="text"
                />
                <CustomField
                  label="Cedula"
                  name={cedula}
                  setName={setCedula}
                  placeholder="********"
                  tipo="password"
                />
              </form>
            </IonCol>
          </IonRow>
          <IonRow className="mx-4">
            <IonCol size="12">
              <IonButton
                className="button-central-deg fs-14 font-w100"
                expand="block"
                type="submit"
                fill="clear"
                onClick={handleLogin}
              >
                Iniciar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <Action
            message="No tienes una cuenta?"
            text=" Regístrate"
            link="/registros"
          />
        </IonGrid>
      </IonFooter>
      <IonToast
        isOpen={toast}
        onDidDismiss={() => setToast(false)}
        message="Usuario o clave incorrecta"
        duration={200}
      />
      <IonToast
        isOpen={notificacion}
        onDidDismiss={() => setNotificacion(false)}
        message="Por favor ingrese los valores usuario o clave"
        duration={200}
      />
    </IonPage>
  );
};

export default Login;
