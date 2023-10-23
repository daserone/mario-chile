// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjTFxGCzzsFEPpsjtbSxsPnGgMz-fmwN4",
  authDomain: "bieniback.firebaseapp.com",
  projectId: "bieniback",
  storageBucket: "bieniback.appspot.com",
  messagingSenderId: "634797319286",
  appId: "1:634797319286:web:43c6837d67f15d9388eb57"
};
//-Initialize-Firebase------------------------
const app = initializeApp(firebaseConfig);
//-configuracion-autenticacion------------
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
//-funcion-autenticacion------------------
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Esto le da un token de acceso de Google. Puede usarlo para acceder a la API de Google.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // La información del usuario registrado.
    })
    .catch((error) => {
      // Manejar errores aquí.
      const errorCode = error.code;
      const errorMessage = error.message;
      // El correo electrónico de la cuenta de usuario utilizada.
      const email = error.customData.email;
      // El tipo AuthCredential que se utilizó.
      console.warn({ errorCode, errorMessage, email });
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const signOutWithGoogle = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.error("Problema al cerrar la sesión con google".error);
      // An error happened.
    });
};

/*
-data pcm-r6 24 info druid detectar el topico dode estoy agregando info, luego druid limpio la data para presentar y de druid a super set kaskat un canal streamen de dato archivo punto service
-topico:
-dataset:
*/
