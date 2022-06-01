import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCQyqbN6rDIljeUgdKo7-qhAOFGNwrIAms",
  authDomain: "matchandplay-9b795.firebaseapp.com",
  projectId: "matchandplay-9b795",
  storageBucket: "matchandplay-9b795.appspot.com",
  messagingSenderId: "293016028359",
  appId: "1:293016028359:web:49ddc21fa547dd6fa8eae2"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export default firebaseConfig;