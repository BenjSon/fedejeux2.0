var SALLES = new Vue({
      el:'#salles',
      
      data: {
        showSalles: false,
        salles: "" ,
        imageDeLaSalle: "" ,
        affluence: "" ,
       	limite: "",
        valeurMax : "" ,
        valeurAlerte:""
      },

      methods: {

        // myStyle: function(salle){
        //   color='green';
        //   // console.log("salle.affluence",salle.affluence)
        //   // console.log("ADMIN.parametres[salle].seuil",ADMIN.parametres[salle].seuil)
        //   // console.log("salle.affluence",salle.affluence)
        //   if(ACCUEIL.affSalles[salle]>=ADMIN.parametres[salle].seuil){
        //     if (ACCUEIL.affSalles[salle]>=ADMIN.parametres[salle].capacité) color='red';
        //     else color='orange';
        //   }
        //   return {backgroundColor: color}
        // }
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
