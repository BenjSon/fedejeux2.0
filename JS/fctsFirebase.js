var dataAffluence = firebase.database().ref('Affluence');
dataAffluence.on('child_added', function(snapshot){
		var fort = snapshot.child(salle1).val();
		var montaigne = snapshot.child(salle2).val();
		var chapiteau = snapshot.child(salle3).val();
	})

var dataParametres = db.ref('Paramètres');
dataParametres.once('value')
	.then(function(snapshot){
		var parametres = snapshot.val();
//		console.log(parametres);
	})

getHistory = function(salle){
	
	return historique;
};

getLastofH = function(historique){
	var taille = historique.length;
	return historique[taille-1];
};

ResetToZero = function(nombreSalles){
	// 3 salles étant la base initiale du projet 
	if((nombreSalles === undefined)){
		var nombreSalles = 3;
	}
	//var test = db.collection("Salle1").doc("48u1lLAZdYND9XAgYRRX").get().then(function(doc){console.log(doc)});
	//console.log(test);
	//db.collection("historiqueSalles").doc("décompte1").add();
	for(var i = 1; i<=nombreSalles;i++){
		db.ref("HistoriqueSalles/current/salle"+i+"/mesure"+i+"0").set({
			"nbr": 0,
			"temps": 0
		});
		// db.collection("HistoriqueSalles").doc("current").collection("Salle"+i).add({
		// 	"nbr": 0,
		// 	"temps": 0
		// });
	}
}

modifParametres = function(){
//		console.log(parametres);
	db.ref('Paramètres').set(parametres);
}
