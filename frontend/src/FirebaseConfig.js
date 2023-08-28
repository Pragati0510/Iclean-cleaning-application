// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtWYfcdWN1nan7Kw1eozv5jeYSWRyux0U",
  authDomain: "iclean-ab63e.firebaseapp.com",
  projectId: "iclean-ab63e",
  storageBucket: "iclean-ab63e.appspot.com",
  messagingSenderId: "151457748711",
  appId: "1:151457748711:web:9db2c572f7966d2e25b442"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase storage reference
const storage = getStorage(app);
export default storage;