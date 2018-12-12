var NAV = new Vue({
	el: "#navigation",
	data: {

	},
	methods:{
		toAccueil:function(){
			CONNEXION.showConnexion = false,
			ACCUEIL.showAccueil = true,
			ADMIN.showAdmin = false,
			SALLES.showSalles = false,
			HEADER.showHeader = true
		},
		toAdmin:function(){
			CONNEXION.showConnexion = false,
			ACCUEIL.showAccueil = false,
			ADMIN.showAdmin = true,
			SALLES.showSalles = false,
			HEADER.showHeader = true
		},
		toConnexion:function(){
			CONNEXION.showConnexion = true,
			ACCUEIL.showAccueil = false,
			ADMIN.showAdmin = false,
			SALLES.showSalles = false,
			HEADER.showHeader = true
		},
		toSalles:function(salle){
			CONNEXION.showConnexion = false,
			ACCUEIL.showAccueil = false,
			ADMIN.showAdmin = false,
//On passe toutes les salles en false pour s'assurer qu'il n'y en a pas en true
//avant de changer seulement la salle modifier
			SALLES.showSalles = false,
			HEADER.showHeader = true
		}
	}
});