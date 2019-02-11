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
                                //on affiche les erreurs possibles
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
        connection:function(){
            var input = document.getElementById("passe");
            input.addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    CONNEXION.seConnecter();
                }
            }) 
        },
        deconnexion: function(){
            // on déconnecte l'utilisateur
            firebase.auth().signOut();
            NAV.toConnexion();
            alert("Vous avez été déconnecté")
        },
        resetMdp:function(){
            // renvoie un mot de passe à l'adresse e-mail inscrite dans l'identifiant
            var emailAddress = this.user.identifiant;
            firebase.auth().sendPasswordResetEmail(emailAddress)
                        .then(function() {
                              alert('Email envoyé !');
                            })
                        .catch(function(error) {
                            console.log(error);
                            alert("Une erreur s'est produite : Ecrire une adresse e-mail dans l'identifiant")
            });
        }
    }
});
