
var ACCUEIL = new Vue({
	el: "#accueil",
	data: {
		showAccueil: false,
		affSalles:{
			salle1:0,
			salle2:0,
			salle3:0
		},
		chosenSalle: {},
        GrapheSomme:"",
        parGraphe:{
            nbrData:0,
            minTemps:"",
            maxTemps:""
        },
        connect: Object.freeze(CONNEXION.user.connect)
	},
	methods:{
		setAffluence: function(affluence,variable){
			ACCUEIL.affSalles[variable] = affluence;
		},

   		myStyle: function(salle){
    	  color='#5e8d57';
    	  if(ACCUEIL.affSalles[salle]>=ADMIN.parametres[salle].seuil){
    	  	if (ACCUEIL.affSalles[salle]>=ADMIN.parametres[salle].capacité) color='#ed1c24';
    	  	else color='#ff7f27';
    	  }
    	  return {backgroundColor: color}
    	},

    	pourcentage: function(salle){
    		return (ACCUEIL.affSalles[salle]*100/ADMIN.parametres[salle].capacité).toFixed(0)
    	},
    	affluenceTotale: function(){
    	    return ACCUEIL.affSalles.salle1+ACCUEIL.affSalles.salle2+ACCUEIL.affSalles.salle3
    	},
    	pourcentageTotal: function(){
    		return ((ACCUEIL.affSalles.salle1+ACCUEIL.affSalles.salle2+ACCUEIL.affSalles.salle3)*100/
    		(ADMIN.parametres.salle1.capacité+ADMIN.parametres.salle2.capacité+ADMIN.parametres.salle3.capacité)).toFixed(0)
    	},
      
        setParGraphe: function(nomPar,par){
            ACCUEIL.parGraphe[nomPar] = par;
        }
	}
});