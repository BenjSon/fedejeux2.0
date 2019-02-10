

// ----- Variables de ref() ----- //

//On utilise la deuxième variable i car k vaut 4 dans la fonction
// var i = 1;
// for(var k = 1; k<=3;k++){
// 	//console.log(k);
// 	var dataAffluence = firebase.database().ref('HistoriqueSalles/current/salle'+k).limitToLast(1);
// 	dataAffluence.on('child_added', function(snapshot){
// 		var aff = snapshot.child('nbr').val();
// 		console.log('aff'+i,aff);
// 		ACCUEIL.getAffluence(aff,'salle'+i);
// 		i++;
// 	})
// }

getDataSalle = function(salle){
	var ref = firebase.database().ref('HistoriqueSalles/current/'+salle);
	ref.limitToLast(1).on('child_added', function(snapshot){
			var aff = snapshot.child('nbr').val();
			//console.log('aff',aff);
			SALLES.setDataSalle('affluence', aff);
		});

	var refPar = firebase.database().ref('Paramètres/'+salle);
	refPar.once('value', function(snapshot){
			var seuil = snapshot.child('seuil').val();
			//console.log('seuil',seuil);
			SALLES.setDataSalle('valeurAlerte', seuil);

			var capacité = snapshot.child('capacité').val();
			SALLES.setDataSalle('valeurMax',capacité);
		});
};


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

getParGraphe = function(salle){
	db.ref("HistoriqueSalles/current/"+salle).once('value',function(snap){
		var nbrdata = snap.numChildren();
		ACCUEIL.setParGraphe('nbrData',nbrdata);
	});
	db.ref("HistoriqueSalles/current/"+salle).limitToFirst(1).once('child_added',function(snap){
		var mintemps = snap.child('temps').val();
		ACCUEIL.setParGraphe('minTemps',(new Date(mintemps)).getTime());
	});	
	db.ref("HistoriqueSalles/current/"+salle).limitToLast(1).once('child_added',function(snap){
		var maxtemps = snap.child('temps').val();
		ACCUEIL.setParGraphe('maxTemps',(new Date(maxtemps)).getTime());
	});
	console.log(ACCUEIL.parGraphe);
}