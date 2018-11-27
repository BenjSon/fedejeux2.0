var bouton ="";
function changerSalle(context){
	console.log("changement");
	bouton = context.id;
	return bouton;
};

var SALLES = new Vue({
	el: "#salles",
	data: {
		showSalles: false
	},
	methods:{}
});