import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración personalizada de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCUUQO4j5A0DbQEjpdBaArik7cMLs4e82U",
  authDomain: "apinosqlgot.firebaseapp.com",
  projectId: "apinosqlgot",
  storageBucket: "apinosqlgot.firebasestorage.app",
  messagingSenderId: "61359679288",
  appId: "1:61359679288:web:fcf4218ed568ba62c9c3cd"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa servicios que vas a usar
const auth = getAuth(app);
const db = getFirestore(app); // Base de datos NoSQL

// Exporta para usarlos en otros archivos
export { auth, db };
