import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from "@/firebase";

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
