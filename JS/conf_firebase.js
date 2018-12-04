
// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");


// Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyBo63Tx09gzjbjNgQ76neGSNHalvpLeorY",
  //   authDomain: "interface-ludinord.firebaseapp.com",
  //   databaseURL: "https://interface-ludinord.firebaseio.com",
  //   projectId: "interface-ludinord",
  //   storageBucket: "interface-ludinord.appspot.com",
  //   messagingSenderId: "965924361390"
  // };
  // firebase.initializeApp(config);
firebase.initializeApp({
  apiKey: "AIzaSyBo63Tx09gzjbjNgQ76neGSNHalvpLeorY",
  authDomain: "interface-ludinord.firebaseapp.com",
  projectId: "interface-ludinord"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

// db.collection("Affluence").add({"id": 2});
db.collection("nHFtNm97HRqWfRy8voeM").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});

// let data = firebase.database().ref("HistoriqueSalle/nHFtNm97HRqWfRy8voeM");
// console.log(data);
// firebase.database().ref("HistoriqueSalle/nHFtNm97HRqWfRy8voeM").update({"id": 2});