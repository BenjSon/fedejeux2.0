// var dataAffluence = firebase.database().ref('HistoriqueSalles/current');
// dataAffluence.on('value')
// 	.then(function(snapshot){
// 		var fort = snapshot.child(salle1).val();
// 		var montaigne = snapshot.child(salle2).val();
// 		var chapiteau = snapshot.child(salle3).val();
// 	})
var db = firebase.database()
var dataAffluence = firebase.database().ref('HistoriqueSalles/current');
dataAffluence.on('value', test=>function(snapshot){
	console.log(snapshot);
	return snapshot.val();
})
//console.log(test());
var db = firebase.database();
var CurrentRef = db.ref("HistoriqueSalles/current");


getHistory = function(numSalle){
	CurrentRef.child("salle" + numSalle).on('child_added',snapshot=>{
		var historique = snapshot.val();
		console.log(historique);
		return historique;
	});
};

getLastofH = function(numSalle){
	var lastMesureFocus = db.ref("HistoriqueSalles/current/salle" + numSalle).orderByChild("id").limitToLast(1);
	lastMesureFocus.on('child_added', snapshot=>{
    		let LastMesure = snapshot.val();
    		console.log(LastMesure);
    		return LastMesure;
	});
	console.log(LastMesure);
};

GetNumberLastHist = function(){
	GetNumberLastHist.LastHistorique=null;
	var Placenumber = db.ref("HistoriqueSalles").orderByChild("idHist").limitToLast(1);
	Placenumber.once('value', function(snapshot) {
  		snapshot.forEach( function(childSnapshot) {
    		GetNumberLastHist.LastHistorique = childSnapshot.val();
    		console.log(GetNumberLastHist.LastHistorique.idHist);
    		// return LastHistorique.idHist;
    	});
	});
	return GetNumberLastHist.LastHistorique.idHist;
}
ResetToZero = function(nombreSalles){
	// 3 salles étant la base initiale du projet 
	if((nombreSalles === undefined)){
		var nombreSalles = 3;
	}

	db.ref("HistoriqueSalles/current3").set({"idHist":1});
	for(var i = 1; i<=nombreSalles;i++){
		db.ref("HistoriqueSalles/current3/salle"+i+"/mesure"+i+"0").set({
			"nbr": 0,
			"temps": 0,
			"id": 0
		});

		// db.collection("HistoriqueSalles").doc("current").collection("Salle"+i).add({
		// 	"nbr": 0,
		// 	"temps": 0
		// });
	}
}
