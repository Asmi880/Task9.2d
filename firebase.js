import { initializeApp } from "firebase/app";

import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC9YIcmduOmHx50rJkVnQZwfNxxcDSWrzg",
  authDomain: "task-7-2d-firestore.firebaseapp.com",
  projectId: "task-7-2d-firestore",
  storageBucket: "task-7-2d-firestore.appspot.com",
  messagingSenderId: "1061814395413",
  appId: "1:1061814395413:web:929a5442f523171b8de41c",
  measurementId: "G-VMXPLNMGV5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const imageDb=getStorage(app)
export const firestoreDb = getFirestore(app);