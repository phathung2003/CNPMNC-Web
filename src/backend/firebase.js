import {initializeApp} from 'firebase/app';
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDKzp7x1RyLw3s8rTtPSYFAFDMyL1gddE",
  authDomain: "thuexe-5b600.firebaseapp.com",
  projectId: "thuexe-5b600",
  storageBucket: "thuexe-5b600.appspot.com",
  messagingSenderId: "294754595337",
  appId: "1:294754595337:web:556e0b3849cb41ee127ed8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);