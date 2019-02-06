

// ----- Variables de ref() ----- //

//On utilise la deuxième variable i car k vaut 4 dans la fonction
var i = 1;
for(var k = 1; k<=3;k++){
	//console.log(k);
	var dataAffluence = firebase.database().ref('HistoriqueSalles/current/salle'+k).limitToLast(1);
	dataAffluence.on('child_added', function(snapshot){
		var aff = snapshot.child('nbr').val();
		//console.log('aff'+i,aff);
		ACCUEIL.setAffluence(aff,'salle'+i);
		i++;
	})
}


getParametres = function(){
	var dataParametres = db.ref('Paramètres');
	dataParametres.on('value', function(snapshot){
			var dataParametres = snapshot.val();
//			var data = snapshot..child('salle1/seuil').val();
//			console.log('dataparametres:',dataParametres);
			ADMIN.setParametres(dataParametres);
		})
};

getParametres();



getHistory = function(numSalle){
	CurrentRef.child("salle" + numSalle).on('child_added',snapshot=>{
		var historique = snapshot.val();
		console.log(historique);
		TracerGraphe(LastMesure,)
		
	});
};

getLastofH = function(numSalle){
	var lastMesureFocus = db.ref("HistoriqueSalles/current/salle" + numSalle).orderByChild("id").limitToLast(1);
	lastMesureFocus.on('child_added', snapshot=>{
    		let LastMesure = snapshot.val();
    		console.log(LastMesure);
    		TracerGraphe(LastMesure,"containerGraphe");
    		
	});
	console.log(LastMesure);
};



db.ref("HistoriqueSalles").on('value', function(snapshot) {
	var numOfHist = snapshot.numChildren();
	ADMIN.getNumHist(numOfHist);
});

resetToZero = function(){
	//console.log(ADMIN.numHist);
	var numH = ADMIN.numHist;
	//console.log(numNewHist);
	//db.ref("HistoriqueSalles").push({["hist"+numNewHist]:{}});
	db.ref("HistoriqueSalles").limitToFirst(1).on('child_added',function(snap){
		var data = snap.val();
		console.log(data);
		db.ref("HistoriqueSalles/hist"+numH).set(data);
		db.ref("HistoriqueSalles/hist"+numH).update({IdHist:numH});
	});
	for(var i = 1; i<=3;i++){
		db.ref("HistoriqueSalles/current/salle"+i+"/mesure"+i+"0").set({
			"nbr": 0,
			"temps": 0,
			"id": 0
		});
	}
};


modifParametres = function(){
	//console.log(ADMIN.parametres);
	db.ref('Paramètres').set(ADMIN.parametres);
};

checkParametres = function(){
	if (ADMIN.checkPositiveInt()){
		if(ADMIN.checkSeuil()){
			if(confirm("Cette action va réinitialiser les valeurs de seuil et de capacité. Souhaitez-vous continuer ?")){
				modifParametres();
			}
			else getParametres();
		}
		else{
			getParametres();
			alert("Le seuil d’alerte d’une salle doit être inférieur à la capacité maximale.");
		} 
	}
	else{
		getParametres();
		alert("Les valeurs doivent être des entiers positifs.");
	}
};
