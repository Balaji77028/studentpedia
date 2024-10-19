import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIDtWtMPJ1PPVEQ2vv9FBJxzC16udfa1c",
    authDomain: "studentpedia-d787d.firebaseapp.com",
    projectId: "studentpedia-d787d",
    storageBucket: "studentpedia-d787d.appspot.com",
    messagingSenderId: "773540842392",
    appId: "1:773540842392:web:f0dedb7f690dcad7c239ed"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
