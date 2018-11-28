var SALLES = new Vue({
      el:'#salles',
      
      data: {
  		  showAccueil: false,
        //salle: "" ,
        imageDeLaSalle: "" ,
        affluence: "" ,
       	limite: "",
        valeurMax : "" ,
        valeurAlerte:""
      },

      methods: {
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
