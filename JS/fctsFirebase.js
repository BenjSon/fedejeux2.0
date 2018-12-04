var dataAffluence = firebase.database().ref('Affluence');
dataAffluence.on('value',function(snapshot){
	console.log(snapshot.key)
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
		db.collection("HistoriqueSalles").doc("current").collection("Salle"+i).add({
			"nbr": 0,
			"temps": 0
		});
	}
}
