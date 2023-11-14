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
  apiKey: "AIzaSyCCYDth5Sem4sEGnofHS6cj7447-vQBfPc",
  authDomain: "bieni-health.firebaseapp.com",
  projectId: "bieni-health",
  storageBucket: "bieni-health.appspot.com",
  messagingSenderId: "762358975378",
  appId: "1:762358975378:web:fa38463d10336c9e930f4b",
  measurementId: "G-XF00T0YFME",
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

