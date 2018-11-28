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
	methods:{}
});