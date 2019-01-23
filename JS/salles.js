

var SALLES = new Vue({
      el:'#salles',
      
      data: {
        showSalles: false,
        nomSalle: "" ,
        imageDeLaSalle: "" ,
        affluence: "" ,
       	limite: "",
        valeurMax : "" ,
        valeurAlerte:"",
        styleSalle:"",
        Graphe:""
      },

      methods: {

        chooseSalle: function(salle){
          if (salle == 'salle1'){
            SALLES.nomSalle = 'Salle du Fort';
            SALLES.imageDeLaSalle = "./Ressources/sand-castle.png";
            SALLES.Graphe = setGrapheOptions(salle,SALLES.nomSalle);
          }
          else if (salle == 'salle2'){
            SALLES.nomSalle = 'Salle Montaigne';
            SALLES.imageDeLaSalle = './Ressources/students-cap.png';
            SALLES.Graphe = setGrapheOptions(salle,SALLES.nomSalle);
          }
          else{
            SALLES.nomSalle = 'Chapiteau';
            SALLES.imageDeLaSalle = './Ressources/park-tent-of-a-circus.png';
            SALLES.Graphe = setGrapheOptions(salle,SALLES.nomSalle);
          }
          //console.log('nomSalle',SALLES.nomSalle);
          SALLES.affluence = ACCUEIL.affSalles[salle];
          SALLES.valeurMax = ADMIN.parametres[salle].capacité;
          SALLES.valeurAlerte = ADMIN.parametres[salle].seuil;
          SALLES.styleSalle = ACCUEIL.myStyle(salle);
        }
      },

      // computed: {
  		  // salle:function(){
     	// 		this.salle="";
    		// 	this.imageDeLaSalle="";
     	// 		this.affluence="";
    		// 	this.valeurMax="";
    		// 	this.valeurAlerte="";
     	// // 	} 
     	// },

   	  watch: {
    		BDD: function(){
    			this.valeur="";
  		  }
      }

});
