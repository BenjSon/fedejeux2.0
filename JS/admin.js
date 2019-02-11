var ADMIN = new Vue({
	el: "#admin",
	data: {
		showAdmin: false,
		parametres: {
			salle1: {seuil:0, capacité:0},
			salle2: {seuil:0, capacité:0},
			salle3: {seuil:0, capacité:0}
		},
		alert: "Etes-vous sûr de vouloir faire cette modification?",
        connect: Object.freeze(CONNEXION.user.connect)
	},
	methods:{
		getParametres: function(myObject){
			//console.log('myObject',myObject);
			var compteur = 0;
			for (var salle in myObject){
				//for (var salleAdmin in ADMIN.parametres){
				compteur++;
				//console.log('compteur',compteur);
				// console.log("ADMIN.parametres[salleBD].capacité",ADMIN.parametres[salleBD].capacité);
				// console.log("ADMIN.parametres[salleBD].seuil",ADMIN.parametres[salleBD].seuil);
				// console.log("myObject[salleBD].capacité",myObject[salleBD].capacité);
				// console.log("myObject[salleBD].seuil",myObject[salleBD].seuil);
				ADMIN.parametres[salle].capacité = myObject[salle].capacité;
				ADMIN.parametres[salle].seuil = myObject[salle].seuil;
				//}
			}
			console.log('parametres',ADMIN.parametres);
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