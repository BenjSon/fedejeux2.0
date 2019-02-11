var NAV = new Vue({
	el: "#navigation",
	data: {

	},
	methods:{
		toAccueil:function(){
            if (firebase.auth().currentUser){
                CONNEXION.showConnexion = false,
                ACCUEIL.showAccueil = true,
                ADMIN.showAdmin = false,
                SALLES.showSalles = false,
                HEADER.showHeader = true
            }
		},
		toAdmin:function(){
            if (firebase.auth().currentUser){
                CONNEXION.showConnexion = false,
                ACCUEIL.showAccueil = false,
                ADMIN.showAdmin = true,
                SALLES.showSalles = false,
                HEADER.showHeader = true
            }
		},
		toConnexion:function(){
            CONNEXION.showConnexion = true,
            ACCUEIL.showAccueil = false,
            ADMIN.showAdmin = false,
            SALLES.showSalles = false,
            HEADER.showHeader = false
		},
		toSalles:function(){
            if (firebase.auth().currentUser){
                CONNEXION.showConnexion = false,
                ACCUEIL.showAccueil = false,
                ADMIN.showAdmin = false,
                SALLES.showSalles = true,
                HEADER.showHeader = true
            }
		}
	}
});