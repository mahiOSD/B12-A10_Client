
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBtcf2hULtW_fjsI5B8_92W3T-2IcxwM2U",
  authDomain: "server-be351.firebaseapp.com",
  projectId: "server-be351",
  storageBucket: "server-be351.appspot.com",
  messagingSenderId: "155563845859",
  appId: "1:155563845859:web:8fbba395c41db39bfcfdd6"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
