

// ----- Variables de ref() ----- //

//On utilise la deuxième variable i car k vaut 4 dans la fonction
var i = 1;
for(var k = 1; k<=3;k++){
	//console.log(k);
	var dataAffluence = firebase.database().ref('HistoriqueSalles/current/salle'+k).limitToLast(1);
	dataAffluence.on('child_added', function(snapshot){
		var aff = snapshot.child('nbr').val();
		//console.log('aff'+i,aff);
		ACCUEIL.getAffluence(aff,'salle'+i);
		i++;
	})
}

// var dataAffluence2 = firebase.database().ref('HistoriqueSalles/current/salle2').limitToLast(1);
// dataAffluence2.on('child_added', function(snapshot){
// 		var aff = snapshot.child('nbr').val();
// 		// console.log('aff',aff);
// 		ACCUEIL.getAffluence(aff,'salle2');
// 	})

// var dataAffluence3 = firebase.database().ref('HistoriqueSalles/current/salle3').limitToLast(1);
// dataAffluence3.on('child_added', function(snapshot){
// 		var aff = snapshot.child('nbr').val();
// 		// console.log('aff',aff);
// 		ACCUEIL.getAffluence(aff,'salle3');
// 	})

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
}


modifParametres = function(){
	//console.log(ADMIN.parametres);
	db.ref('Paramètres').set(ADMIN.parametres);
}