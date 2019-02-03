
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
        GrapheSomme:""
	},
	methods:{
		tracerGrapheSomme: function(){
                    },

		getAffluence: function(affluence,variable){
			ACCUEIL.affSalles[variable] = affluence;
			//console.log('affFort', ACCUEIL.affSalles[variable]);
		},

   		myStyle: function(salle){
    	  color='#5e8d57';
    	  // console.log("salle.affluence",salle.affluence)
    	  // console.log("ADMIN.parametres[salle].seuil",ADMIN.parametres[salle].seuil)
    	  // console.log("salle.affluence",salle.affluence)
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
            ACCUEIL.GrapheSomme = setGrapheSommeOptions();
    	    return ACCUEIL.affSalles.salle1+ACCUEIL.affSalles.salle2+ACCUEIL.affSalles.salle3
    	},
    	pourcentageTotal: function(){
    		return ((ACCUEIL.affSalles.salle1+ACCUEIL.affSalles.salle2+ACCUEIL.affSalles.salle3)*100/
    		(ADMIN.parametres.salle1.capacité+ADMIN.parametres.salle2.capacité+ADMIN.parametres.salle3.capacité)).toFixed(0)
    	}
      

    	// chooseSalle: function(salle){
    	// 	if (salle == 'salle1') chosenSalle = {salle1: 'Fort'};
    	// 	else if (salle == 'salle2') chosenSalle = {salle2: 'Montaigne'};
    	// 	else chosenSalle = {salle3: 'Chapiteau'};
    	// 	console.log(ACCUEIL.chosenSalle);
    	// }
	},

    computed:{

    }
});