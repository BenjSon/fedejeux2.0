 var CONNEXION = new Vue({
	el: "#connexion",
	data: {
		showConnexion: true,
        user: {identifiant: "", mdp: ""}
	},
	methods:{
        // fonction qui redirige vers l'accueil si l'utilisateur existe.
        seConnecter:function(){
            console.log(this.user);
            // on vérifie si quelqu'un est déjà connecté
            if (firebase.auth().currentUser) {
                //si quelqu'un est connecté on le déconnecte
                firebase.auth().signOut();
            }
             var identifiant = this.user.identifiant;
             var mdp = this.user.mdp;
                //on se connecte
                firebase.auth().signInWithEmailAndPassword(identifiant, mdp)
                                .catch(function(error) {
                                    //on gère les erreurs ici
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    //on affiche les erreurs possibles
                                   /* if (errorCode === 'auth/wrong-password') {
                                        alert('Mauvais mot de passe');
                                    } else {
                                        alert(errorMessage);
                                    }
                                    //console.log(error);*/
                                });
                if (firebase.auth().currentUser){
                    return NAV.toAccueil();
                }                
        },
        // Permet de reset le mot de passe mais pour cela
        // il faut rentrer un mail dans l'identifiant pour 
        // que le mot de passe soit envoyé
        resetMdp: function(){
            /*var emailAddress = this.user.identifiant;
            firebase.auth().sendPasswordResetEmail(emailAddress)
                        .then(function() {
                              alert('Email envoyé !');
                            })
                        .catch(function(error) {
                            console.log(error);
                            alert('Une erreur s'est produite : Ecrire une adresse mail dans l'identifiant')
            });*/
        }
    }
});
