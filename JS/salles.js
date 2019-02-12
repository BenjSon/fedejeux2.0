

var SALLES = new Vue({
      el:'#salles',
      
      data: {
        showSalles: false,
        nomSalle: "" ,
        imageDeLaSalle: "" ,
        affluence: "" ,
       	total: "",
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
          getDataSalle(salle);
          SALLES.styleSalle = ACCUEIL.myStyle(salle);
          SALLES.total = ACCUEIL.affSalles.salle1+ACCUEIL.affSalles.salle2+ACCUEIL.affSalles.salle3;
        },

        setDataSalle: function(nomData,data){
          SALLES[nomData] = data;
        }

      },

   	  watch: {
    		BDD: function(){
    			this.valeur="";
  		  }
      }

});
