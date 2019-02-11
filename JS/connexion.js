var CONNEXION = new Vue({
	el: "#connexion",
	data: {
		showConnexion: true,
        user: {identifiant: "", mdp: "",connect: ""}
	},
	methods:{
        // fonction qui redirige vers l'accueil si l'utilisateur existe en cliquant sur le bouton.
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
                                //on modifie le message d'erreur en cas de mot de passe erroné
                                if (errorCode === 'auth/wrong-password') {
                                    alert('Mauvais mot de passe');
                                } else {
                                    alert(errorMessage);
                                }
                            });
            if (firebase.auth().currentUser){
                this.user.connect = firebase.auth().currentUser;
                this.user.connect.freeze;
                NAV.toAccueil();
            }                
        },
        // fonction qui redirige vers l'accueil si l'utilisateur existe en appuyant sur "Entrée".
        connection:function(event){
            if (event.keyCode == 13) {
                CONNEXION.seConnecter();
            } 
        },
        // fonction de déconnexion de l'utilisateur  
        deconnexion: function(){
            // déconnexion de l'utilisateur puis redirection
            firebase.auth().signOut();
            NAV.toConnexion();
            alert("Vous avez été déconnecté")
        },
        // fonction de réinitialisation du mot de passe grâce à un lien envoyé par e-mail (adresse qui est saisie dan sl'identifiant).
        resetMdp:function(){
            var emailAddress = this.user.identifiant;
            //on envoire l'e-mail avec une fonction implantée dans le framework firebase-auth
            firebase.auth().sendPasswordResetEmail(emailAddress)
                        .then(function() {
                              alert('Email envoyé !');
                            })
                        .catch(function(error) {
                            alert("Une erreur s'est produite : Ecrire une adresse e-mail valide dans l'identifiant")
            });
        }
    }
});
