import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = initializeApp({
    apiKey: "AIzaSyDlnvWnH1o2ZDDecActeWSYoLhIgucmymQ",
    authDomain: "store-b087e.firebaseapp.com",
    projectId: "store-b087e",
    storageBucket: "store-b087e.appspot.com",
    messagingSenderId: "901228643851",
    appId: "1:901228643851:web:8870e0555b3d42c4f0690e",
    measurementId: "G-5GMHCTMM9L"
});

export const authentication = getAuth(firebaseConfig);

