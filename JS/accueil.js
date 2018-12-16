var bouton ="";
function changerSalle(context){
	console.log("changement");
	bouton = context.id;
	return bouton;
};

var ACCUEIL = new Vue({
	el: "#accueil",
	data: {
		showAccueil: false
	},
	methods:{
//        salleStyle: function(data,salle,id){
// 			var elmt = document.getElementById(id);
// 			console.log(elmt);
// //			var data = JSON.stringify(data);
// 			console.log(data);
//         	if (data>=ADMIN.parametres[salle].capacité) elmt.style.backgroundColor='red';
//          	else if(data>=ADMIN.parametres[salle].seuil) elmt.style.backgroundColor='orange';
//        },
		getAffluence: function(affluence){}
	}
});