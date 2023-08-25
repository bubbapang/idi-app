// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJ-39_0OIaQnKDnFHG6CVnyPnfuBrbNRw",
    authDomain: "idi-online.firebaseapp.com",
    projectId: "idi-online",
    storageBucket: "idi-online.appspot.com",
    messagingSenderId: "633681615172",
    appId: "1:633681615172:web:27c08ef28c3e7d737b5f11",
    measurementId: "G-5NGL2BX4GR"
};

// Initializing
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

// exporting
// export { analytics };
export { auth };
export default app;
