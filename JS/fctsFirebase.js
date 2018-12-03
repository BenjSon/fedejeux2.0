
getHistory = function(salle){
	
	return historique;
};

getLastofH = function(historique){
	var taille = historique.length;
	return historique[taille-1];
};


ResetToZero = function(nombreSalles){
	// 3 salles étant la base initiale du projet 
	if((nombreSalles===undefined)){
		var nombreSalles = 3;
	}
	for(var i = 1; i<=nombreSalles;i++){
		db.collection("HistoriqueSalles").doc("décompte1").collection("Salle"+i).add({
			"nbr": 0,
			"temps": 0
		});
	}
	
}