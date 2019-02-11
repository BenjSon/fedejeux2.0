

// ----- Variables de ref() ----- //

//On utilise la deuxième variable i car k vaut 4 dans la fonction

var i = 1;
for(var k = 1; k<=3;k++){
	//console.log(k);
	var dataAffluence = firebase.database().ref('HistoriqueSalles/current/salle'+k).limitToLast(1);
	dataAffluence.on('child_added', function(snapshot){
		var aff = snapshot.child('nbr').val();
		console.log('aff'+i,aff);
		ACCUEIL.setAffluence(aff,'salle'+i);
		i++;
	})
}

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

resetToZero = function(){
	db.ref("HistoriqueSalles").once('value', function(snapshot) {
		var numOfHist = snapshot.numChildren();
		ADMIN.getNumHist(numOfHist);
	});
	//console.log(ADMIN.numHist);
	var numH = ADMIN.numHist;
	var d = new Date();
	d = d.setTime(d.getTime() + 1000 * 3600);
	var date = new Date(d);
	var temps = date.toISOString().replace('T',' ').slice(0,-5);
	//console.log('date:',date,'temps:',temps);
	//console.log(numNewHist);
	db.ref("HistoriqueSalles").push({["hist"+numNewHist]:{}});
	db.ref("HistoriqueSalles").limitToFirst(1).on('child_added',function(snap){
		var data = snap.val();
		console.log(data);
		db.ref("HistoriqueSalles/hist"+numH).set(data);
		db.ref("HistoriqueSalles/hist"+numH).update({IdHist:numH});
	});
	for(var i = 1; i<=3;i++){
		var refSalle = db.ref("HistoriqueSalles/current/salle"+i)
		refSalle.set({'tempo':'tempo'});
		refSalle.push({
			"nbr": 0,
			"temps": temps
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

getParGraphe = function(salle){
	db.ref("HistoriqueSalles/current/"+salle).once('value',function(snap){
		var nbrdata = snap.numChildren();
		console.log(salle);
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

