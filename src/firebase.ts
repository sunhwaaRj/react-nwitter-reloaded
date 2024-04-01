
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCOlp7aqwo_qZdPY2BAdoUgJlpnKBsK5to",
  authDomain: "react-nwitter-reloaded.firebaseapp.com",
  projectId: "react-nwitter-reloaded",
  storageBucket: "react-nwitter-reloaded.appspot.com",
  messagingSenderId: "294524181034",
  appId: "1:294524181034:web:9d08d450ac4ae9bfcc4153",
  measurementId: "G-H9LP1PBMH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);