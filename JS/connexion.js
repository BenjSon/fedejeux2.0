 var CONNEXION = new Vue({
	el: "#connexion",
	data: {
		showConnexion: true,
        user: {identifiant: "", mdp: ""}
	},
	methods:{
        // fonction qui redirige vers l'accueil si l'utilisateur existe.
        seConnecter:function(){
            // on vérifie si quelqu'un est déjà connecté
            if (firebase.auth().currentUser) {
                //si quelqu'un est connecté on le déconnecte
                firebase.auth().signOut();
            }
            var identifiant = this.user.identifiant;
            var mdp = this.user.mdp;
            //on se connecte avec une fonction implantée dans le framework firebase-auth
            firebase.auth().signInWithEmailAndPassword(identifiant, mdp)
                            .catch(function(error) {
                                //on gère les erreurs ici
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                //on affiche les erreurs possibles
                                if (errorCode === 'auth/wrong-password') {
                                    alert('Mauvais mot de passe');
                                } else {
                                    alert(errorMessage);
                                }
                            });
            if (firebase.auth().currentUser){
                getParametres();
                getAffluence();
                getParGraphe('salle1');
                
                setTimeout(function(){
                    ACCUEIL.GrapheSomme = setGrapheSommeOptions();
                    NAV.toAccueil();
                }, 2000)
                
            }                
        },
        // fonction de déconnexion de l'utilisateur  
        deconnexion: function(){
            // on déconnecte l'utilisateur
            firebase.auth().signOut();
            NAV.toConnexion();
            alert("Vous avez été déconnecté")
        },
        resetMdp:function(){
            // renvoie un mot de passe à l'adresse e-mail
            var emailAddress = this.user.identifiant;
            firebase.auth().sendPasswordResetEmail(emailAddress)
                        .then(function() {
                              alert('Email envoyé !');
                            })
                        .catch(function(error) {
                            alert("Une erreur s'est produite : Ecrire une adresse e-mail dans l'identifiant")
            });
        }
    }
});
