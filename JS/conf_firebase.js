
//Initialize Firebase
  var config = {
    apiKey: "AIzaSyBo63Tx09gzjbjNgQ76neGSNHalvpLeorY",
    authDomain: "interface-ludinord.firebaseapp.com",
    databaseURL: "https://interface-ludinord.firebaseio.com",
    projectId: "interface-ludinord",
    storageBucket: "interface-ludinord.appspot.com",
    messagingSenderId: "965924361390"
  };
  firebase.initializeApp(config);
  
var db = firebase.database();
var CurrentRef = db.ref("HistoriqueSalles/current");