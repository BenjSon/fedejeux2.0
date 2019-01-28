Vue.use(VueHighcharts);

Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

function activeLastPointToolip(chart) {
    var points = chart.series[0].points;
    chart.tooltip.refresh(points[points.length -1]); //Permet d'obtenir des indications sur le dernier point placé sur le graphe
}
function setGrapheOptions(idSalle,nomSalle){
	var optionsDuGraphe = {
		title: {
		    text: nomSalle,
		    x: -20 //center
		},
		subtitle: {
		    text: idSalle,
		    x: -20
		},
		xAxis: {
		    type: 'datetime',
	        tickPixelInterval: 150
		},
		yAxis: {
		    title: {
		      text: 'nombre de personnes'
		    },
		    plotLines: [{
		      value: 0,
		      width: 1,
		      color: '#808080'
		    }]
		},
		tooltip: {
	        formatter: function () {
	            return '<b>' + this.series.name + '</b><br/>' +
	                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' 
	            	Highcharts.numberFormat(this.y, 0);
	        }
	    },
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
		    borderWidth: 0
		},
		series: [{
            name: 'Nombre de personne dans la salle',
            data: [0,12,21,20,13,12]
	    }],
	    events: {
	        load: function () {
	            //Load permet d'attendre de charger toutes les données
	                var series = this.series[0],
	                    chart = this;
	                activeLastPointToolip(chart);
	                // setInterval(function () {
	                //     var x = (new Date()).getTime(), 
	                //         y = random();          
	                //     series.addPoint([x, y], true, true);
	                //     activeLastPointToolip(chart);
	                // }, 1000);



	                // Jusqu'ici ce ne sont que des commentaires pour Fan, donc il n'utilise que ce qui vient : c'est le lien Firebase. 
	                dataRef = db.ref("current/"+idSalle);

	                dataRef.on('child_added', function (snap, previousKey) {

	                    var x = (new Date()).getTime(),
	                        y = snap.val().count;
	                    console.log(y);

	                        //le nom de sa valeur c'était count

	                    series.addPoint([x, y], true, true);
	                    activeLastPointToolip(chart);
	                })

            }
	    }
      };

	return optionsDuGraphe;
};
// var test= setOptions();
// console.log(test);



