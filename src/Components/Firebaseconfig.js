import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyAyrYTZ8xJD25fXDhj01bvs68h8TPwraig",
    authDomain: "fir-login-46b6d.firebaseapp.com",
    databaseURL: "https://fir-login-46b6d.firebaseio.com",
    projectId: "fir-login-46b6d",
    storageBucket: "",
    messagingSenderId: "884787080643",
    appId: "1:884787080643:web:160efb67035f7627"
  };
  // Initialize Firebase
  var Firebase = firebase.initializeApp(firebaseConfig);

  export default Firebase;