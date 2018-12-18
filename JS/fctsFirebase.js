var db = firebase.database();
var CurrentRef = db.ref("HistoriqueSalles/current");

// ----- Variables de ref() ----- //

// C'est vraiment pas très beau d'écrire le même code, on améliorera quand ça marchera
var dataAffluence1 = firebase.database().ref('HistoriqueSalles/current/salle1').limitToLast(1);
dataAffluence1.on('child_added', function(snapshot){
		var aff = snapshot.child('nbr').val();
		// console.log('aff',aff);
		ACCUEIL.getAffluence(aff,'salle1');
	})

var dataAffluence2 = firebase.database().ref('HistoriqueSalles/current/salle2').limitToLast(1);
dataAffluence2.on('child_added', function(snapshot){
		var aff = snapshot.child('nbr').val();
		// console.log('aff',aff);
		ACCUEIL.getAffluence(aff,'salle2');
	})

var dataAffluence3 = firebase.database().ref('HistoriqueSalles/current/salle3').limitToLast(1);
dataAffluence3.on('child_added', function(snapshot){
		var aff = snapshot.child('nbr').val();
		// console.log('aff',aff);
		ACCUEIL.getAffluence(aff,'salle3');
	})

var dataParametres = db.ref('Paramètres');
dataParametres.once('value')
	.then(function(snapshot){
		var dataParametres = snapshot.val();
//		var data = snapshot..child('salle1/seuil').val();
//		console.log('dataparametres:',dataParametres);
		ADMIN.getParametres(dataParametres);
	})




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

modifParametres = function(){
	console.log(ADMIN.parametres);
	db.ref('Paramètres').set(ADMIN.parametres);
}
