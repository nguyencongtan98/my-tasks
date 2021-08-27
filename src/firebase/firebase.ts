import firebase from "firebase";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAOv_OpEob1jmHeTJVzuibBUOgMHd_2yw",
  authDomain: "example-1b332.firebaseapp.com",
  projectId: "example-1b332",
  storageBucket: "example-1b332.appspot.com",
  messagingSenderId: "715215332219",
  appId: "1:715215332219:web:8fd13802d86680827193de",
  measurementId: "G-DLRHSHX21T",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// export { firestore };
export default firebase;
