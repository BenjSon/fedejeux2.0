var ADMIN = new Vue({
	el: "#admin",
	data: {
		showAdmin: false,
		parametres: {
			salle1: {seuil:1, capacité:0},
			salle2: {seuil:1, capacité:0},
			salle3: {seuil:0, capacité:0}
		},
		alert: "Etes-vous sûr de vouloir faire cette modification?"
	},
	methods:{
		getParametres: function(myObject){
			//console.log('myObject',myObject);
			var compteur = 0;
			for (var salleBD in myObject){
				for (var salleAdmin in ADMIN.parametres){
					compteur++;
					//console.log('compteur',compteur);
					ADMIN.parametres[salleAdmin].capacité = myObject[salleBD].capacité;
					ADMIN.parametres[salleAdmin].seuil = myObject[salleBD].seuil;
				}
			}
			//console.log('parametres',ADMIN.parametres);
		}
//		parametresInForm: function(data,id){
//			var elmt = document.getElementById(id);
//			console.log(elmt);
//			var data = JSON.stringify(data);
//			console.log(data);
//			elmt.value = data;
//		}
	}
});