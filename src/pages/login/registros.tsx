import {
  IonContent,
  IonPage,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, signOutWithGoogle } from "../../firebase";
import { authentication } from "../../servicios";
import { storeLocal } from "../../store/action/aut";
import "./login.css";

const Registros: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = (event: any) => {
    history.push("./login");
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        let formDa = new FormData();
        let correo: any = result.user.email;
        formDa.append("op", "doLoginWithGoogle");
        formDa.append("correo", correo);
        authentication(formDa).then(function (response) {
          const { data, status } = response;
          if (status === 200) {
            if (data.rsp === 1) {
              let sesionGoogle = {
                nombre: result.user.displayName,
                correo: result.user.email,
                imagen: result.user.photoURL,
              };
              if (data.condiciones === "no") {
                const sesionServer = data.data;
                const conector = { ...sesionGoogle, ...sesionServer };
                dispatch(storeLocal(conector));
                history.push("/registro");
              } else {
                dispatch(storeLocal(data.data));
                history.push("/app");
              }
            }
          }
        });
      })
      .catch((error) => {
        // Manejar errores aquí.
        const errorCode = error.code;
        const errorMessage = error.message;
        // El correo electrónico de la cuenta de usuario utilizada.
        const email = error.customData.email;
        // El tipo AuthCredential que se utilizó.
        console.warn({ errorCode, errorMessage, email });
      });
  };

  const handleSignInWithPhone = () => {
    signOutWithGoogle();
  };

  return (
    <IonPage className="loginPage">
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="8" className="bg-info-alt">
              <p className="mt-5 pt-4 fs-36 text-white text-center">Bienvenido a <span className="font-w700">Bieni</span></p>
              <div className="text-center">
                <img src="./images/Doctors-panama.svg" alt="imagen" style={{maxWidth: '700px'}} />
              </div>
              <p className="mt-2 mb-0 fs-16 text-white text-center">Todos tus registros m&eacute;dicos</p>
              <p className="mt-0 mb-4 fs-16 text-white text-center">en un solo lugar</p>
            </IonCol>
            <IonCol size="4">
              <IonRow>
                <IonCol
                  size="12"
                  className="headingText text-center mt-5 pt-5 mb-5"
                  style={{
                    color: "#293f76",
                  }}
                >
                  <img
                    src="./images/logo-bieni.svg"
                    alt="imagen"
                    className=""
                    width={80}
                  />
                  <p className="mt-2 fs-30 font-w500 text-info">Bieni</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="mx-4 text-center">
                  <p className="fs-14 mx-5 mb-4">
                    Para acceder a tu información es necesario que te registres
                  </p>
                  <IonButton
                    className="button-central-deg fs-14 font-w100 mb-2"
                    expand="block"
                    type="submit"
                    fill="clear"
                    onClick={handleSignInWithGoogle}
                  >
                    Ingresa con tu correo electrónico
                    <img
                      src="./images/gmail.svg"
                      alt="imagen"
                      className="ml-2"
                      width={26}
                    />
                  </IonButton>
                  <IonButton
                    className="button-central-deg fs-14 font-w100"
                    expand="block"
                    type="submit"
                    fill="clear"
                    onClick={handleSignInWithPhone}
                  >
                    Ingresa con tu n&uacute;mero tel&eacute;fonico
                    <img
                      src="./images/telefono-login.svg"
                      alt="imagen"
                      className="ml-2"
                      width={26}
                    />
                  </IonButton>
                  <p
                    className="mt-4 fs-14 text-info cursor-pointer"
                    onClick={handleLogin}
                  >
                    O Iniciar sesión
                  </p>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Registros;
