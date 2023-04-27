// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYR4-IHxxE3mbhnRsa0SYqfXSGB1Az4qc",
  authDomain: "midjourney-fa5b3.firebaseapp.com",
  projectId: "midjourney-fa5b3",
  storageBucket: "midjourney-fa5b3.appspot.com",
  messagingSenderId: "573099469164",
  appId: "1:573099469164:web:fdca5935c79d0347426b49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
