

// ----- Variables de ref() ----- //

getAffluence = function(){
	var dataAffluence1 = firebase.database().ref('HistoriqueSalles/current/salle1').limitToLast(1);
	dataAffluence1.on('child_added', function(snapshot){
		var aff = snapshot.child('nbr').val();
		ACCUEIL.setAffluence(aff,'salle1');
	});

	var dataAffluence2 = firebase.database().ref('HistoriqueSalles/current/salle2').limitToLast(1);
	dataAffluence2.on('child_added', function(snapshot){
			var aff = snapshot.child('nbr').val();
			ACCUEIL.setAffluence(aff,'salle2');
		})

	var dataAffluence3 = firebase.database().ref('HistoriqueSalles/current/salle3').limitToLast(1);
	dataAffluence3.on('child_added', function(snapshot){
			var aff = snapshot.child('nbr').val();
			ACCUEIL.setAffluence(aff,'salle3');
		})
};

getDataSalle = function(salle){
	var ref = firebase.database().ref('HistoriqueSalles/current/'+salle);
	ref.limitToLast(1).on('child_added', function(snapshot){
			var aff = snapshot.child('nbr').val();
			SALLES.setDataSalle('affluence', aff);
		});

	var refPar = firebase.database().ref('Paramètres/'+salle);
	refPar.on('value', function(snapshot){
			var seuil = snapshot.child('seuil').val();
			SALLES.setDataSalle('valeurAlerte', seuil);

			var capacité = snapshot.child('capacité').val();
			SALLES.setDataSalle('valeurMax',capacité);
		});
};

getParametres = function(){
	var dataParametres = db.ref('Paramètres');
	dataParametres.once('value', function(snapshot){
			var dataParametres = snapshot.val();
			ADMIN.setParametres(dataParametres);
	});
}

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
}

getNumHist = function(){
	db.ref("HistoriqueSalles").once('value', function(snapshot) {
		var num = snapshot.numChildren();
		ADMIN.setNumHist(num);
	});
}

resetToZero = function(){
	var numH = ADMIN.numHist;
	db.ref("HistoriqueSalles").limitToFirst(1).on('child_added',function(snap){
		var data = snap.val();
		db.ref("HistoriqueSalles/hist"+numH).set(data);
		db.ref("HistoriqueSalles/hist"+numH).update({IdHist:numH});
	});

	var d = new Date();
	d = d.setTime(d.getTime() + 1000 * 3600);
	var date = new Date(d);
	var temps = date.toISOString().replace('T',' ').slice(0,-5);

	for(var i = 1; i<=3;i++){
		var refSalle = db.ref("HistoriqueSalles/hist1/salle"+i)
		refSalle.set({'tempo':'tempo'});
		refSalle.push({
			"nbr": 0,
			"temps": temps,
			"ID": d
		});
		refSalle.child("tempo").remove();
	}
}

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

modifParametres = function(){
	db.ref('Paramètres').set(ADMIN.parametres);
}
