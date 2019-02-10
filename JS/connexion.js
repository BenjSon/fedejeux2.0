var CONNEXION = new Vue({
	el: "#connexion",
	data: {
		showConnexion: true,
        user: {identifiant: "", mdp: ""}
	},
	methods:{
        // fonction qui redirige vers l'accueil si l'utilisateur existe en cliquant sur le bouton.
        seConnecter:function(){
            // console.log(this.user);
            // on vérifie si quelqu'un est déjà connecté
            if (firebase.auth().currentUser) {
                //si quelqu'un est connecté on le déconnecte
                firebase.auth().signOut();
                //console.log("déconnection de l'utilisateur précédent");
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
                                // console.log(error);
                            });
            if (firebase.auth().currentUser){
                NAV.toAccueil();
            }                
        },
        // fonction qui redirige vers l'accueil si l'utilisateur existe en appuyant sur "Entrée".
        connection:function(){
            var input = document.getElementById("passe");
            input.addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    //console.log("appel de fct");
                    CONNEXION.seConnecter();
                }
            }) 
        },
        /* ----------------------------------Création du jeton de connexion--------------------------------------------------------
        // When the user signs in with email and password.
        firebase.auth().signInWithEmailAndPassword('user@example.com', 'password').then(user => {
          // Get the user's ID token as it is needed to exchange for a session cookie.
          return user.getIdToken().then(idToken = > {
            // Session login endpoint is queried and the session cookie is set.
            // CSRF protection should be taken into account.
            // ...
            const csrfToken = getCookie('csrfToken')
            return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
          });
        }).then(() => {
          // A page redirect would suffice as the persistence is set to NONE.
          return firebase.auth().signOut();
        }).then(() => {
          window.location.assign('/profile');
        });
        ------------------------------------------- Envoie du jeton de connexion au serveur peut-être -----------------------
        app.post('/sessionLogin', (req, res) => {
          // Get the ID token passed and the CSRF token.
          const idToken = req.body.idToken.toString();
          const csrfToken = req.body.csrfToken.toString();
          // Guard against CSRF attacks.
          if (csrfToken !== req.cookies.csrfToken) {
            res.status(401).send('UNAUTHORIZED REQUEST!');
            return;
          }
          // Set session expiration to 5 days.
          const expiresIn = 60 * 60 * 24 * 5 * 1000;
          // Create the session cookie. This will also verify the ID token in the process.
          // The session cookie will have the same claims as the ID token.
          // To only allow session cookie setting on recent sign-in, auth_time in ID token
          // can be checked to ensure user was recently signed in before creating a session cookie.
          admin.auth().createSessionCookie(idToken, {expiresIn}).then((sessionCookie) => {
            // Set cookie policy for session cookie.
            const options = {maxAge: expiresIn, httpOnly: true, secure: true};
            res.cookie('session', sessionCookie, options);
            res.end(JSON.stringify({status: 'success'});
          }, error => {
            res.status(401).send('UNAUTHORIZED REQUEST!');
          });
        });
        */
        deconnexion: function(){
            // on déconnecte l'utilisateur
            // console.log("Je déconnecte");
            firebase.auth().signOut();
            NAV.toConnexion();
            alert("Vous avez été déconnecté")
        },
        /*-------------------------------------------------- Suppression du jeton de connexion --------------------------------------------
        app.post('/sessionLogout', (req, res) => {
          res.clearCookie('session');
          res.redirect('/login');
        });
        */
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
