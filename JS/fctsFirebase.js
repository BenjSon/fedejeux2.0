var dataAffluence = firebase.database().ref('Affluence');
dataAffluence.on('value',function(snapshot){
	console.log(snapshot.key)
})

