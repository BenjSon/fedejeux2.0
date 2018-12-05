var dataAffluence = firebase.database().ref('Affluence');
dataAffluence.on('value')
	.then(function(snapshot){
		var fort = snapshot.child(salle1).val();
		var montaigne = snapshot.child(salle2).val();
		var chapiteau = snapshot.child(salle3).val();
	})


