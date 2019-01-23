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
		numHist: 0
	},
	methods:{
		setParametres: function(myObject){
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
			//console.log('parametres',ADMIN.parametres);
		},

		checkPositiveInt: function(){
			var check = true;
			var test = null;
			for (var salle in ADMIN.parametres){
				for (var par in ADMIN.parametres[salle]){
					test = ADMIN.parametres[salle][par];
					// console.log('test:',test);
					if(!Number.isInteger(test) | test<0){
						check = false;
					}
				}
			};
			return check
		},

		checkSeuil: function(){
			var check = true;
			for (var salle in ADMIN.parametres){
				if(ADMIN.parametres[salle].seuil >= ADMIN.parametres[salle].capacité)
				check = false;
			};
			return check
		},

		getNumHist: function(num){
			ADMIN.numHist = num;
			//console.log(ADMIN.numHist);
		}
	}
});