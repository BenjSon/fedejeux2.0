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
		numHist: 0,
        connect: Object.freeze(CONNEXION.user.connect)
	},
	methods:{
		setParametres: function(myObject){
			var compteur = 0;
			for (var salle in myObject){
				ADMIN.parametres[salle].capacité = myObject[salle].capacité;
				ADMIN.parametres[salle].seuil = myObject[salle].seuil;
			}
		},

		checkPositiveInt: function(){
			var check = true;
			var test = null;
			for (var salle in ADMIN.parametres){
				for (var par in ADMIN.parametres[salle]){
					test = ADMIN.parametres[salle][par];
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

		setNumHist: function(num){
			ADMIN.numHist = num;
		}
	}
});