var DATA = new Vue({
	el: "#data",
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
		toSalles:function(){
			CONNEXION.showConnexion = false,
			ACCUEIL.showAccueil = false,
			ADMIN.showAdmin = false,
			SALLES.showSalles = true,
			HEADER.showHeader = true
		}
	}
});