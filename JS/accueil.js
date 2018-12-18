
var ACCUEIL = new Vue({
	el: "#accueil",
	data: {
		showAccueil: false
	},
	methods:{
//        myStyle: function(salle){
//          color='green';
//          if (salle.affluence>=parametres.salle.capacité) color='red';
//          else if(salle.affluence>=parametres.salle.seuil) color='orange';
//          return {backgroundColor: color}
//        }
		fct: function(){
			return getLastofH();
		}
	}
});