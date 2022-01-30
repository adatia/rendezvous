import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA67hEzxGDWsF2WkX9CPWH2vAm5a545VDU",
  authDomain: "rendezvous-adatias.firebaseapp.com",
  projectId: "rendezvous-adatias",
  storageBucket: "rendezvous-adatias.appspot.com",
  messagingSenderId: "469726939964",
  appId: "1:469726939964:web:239ee20e2132a8d3476c39"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, db };
