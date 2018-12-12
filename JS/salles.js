var SALLES = new Vue({
      el:'#salles',
      
      data: {
          showAccueil: false,
//  		  showSalles:{
//          salle1:false, salle2:false, salle3:false
//        },
//      salles: "" ,
        imageDeLaSalle: "" ,
        affluence: "" ,
       	limite: "",
        valeurMax : "" ,
        valeurAlerte:""
      },

      methods: {
        myStyle: function(salle){
          color='green';
          if (salle.affluence>=parametres.salle.capacité) color='red';
          else if(salle.affluence>=parametres.salle.seuil) color='orange';
          return {backgroundColor: color}
      },

      computed: {
  		  salle:function(){
     			this.salle="";
    			this.imageDeLaSalle="";
     			this.affluence="";
    			this.valeurMax="";
    			this.valeurAlerte="";
     		} 
     	},

   	  watch: {
    		BDD: function(){
    			this.valeur="";
  		  }
      }

});
