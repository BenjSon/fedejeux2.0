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
			HEADER.showHeader = true,
			FOOTER.showFooter = true
		},
		toAdmin:function(){
			CONNEXION.showConnexion = false,
			ACCUEIL.showAccueil = false,
			ADMIN.showAdmin = true,
			SALLES.showSalles = false,
			HEADER.showHeader = true,
			FOOTER.showFooter = true
		},
		toConnexion:function(){
			CONNEXION.showConnexion = true,
			ACCUEIL.showAccueil = false,
			ADMIN.showAdmin = false,
			SALLES.showSalles = false,
			HEADER.showHeader = false
			FOOTER.showFooter = false
		},
		toSalles:function(){
			CONNEXION.showConnexion = false,
			ACCUEIL.showAccueil = false,
			ADMIN.showAdmin = false,
			SALLES.showSalles = true,
			HEADER.showHeader = true,
			FOOTER.showFooter = true
		}
	}
});