

function activeLastPointToolip(chart) {
    var points = chart.series[0].points;
    chart.tooltip.refresh(points[points.length -1]); //Permet d'obtenir des indications sur le dernier point placé sur le graphe
}

	                

function setGrapheOptions(idSalle,nomSalle){
	Vue.use(VueHighcharts);
	var capacite = ADMIN.parametres[idSalle].capacité,
		seuil = ADMIN.parametres[idSalle].seuil;

	var databaseRef = firebase.database().ref("HistoriqueSalles/current");
	Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
	var optionsDuGraphe = {
		
            type: 'spline',
            marginRight: 10,
            marginleft:0,
        chart:{
            events: {

                load: function () {
                //Load permet d'attendre de charger toutes les données

                    var series = this.series[0],
                    	serieSeuil = this.series[2],
                    	serieCapacite = this.series[1],
                        chart = this;
                    activeLastPointToolip(chart);
                    // setInterval(function () {
                    //     var x = (new Date()).getTime(), 
                    //         y = random();          
                    //     series.addPoint([x, y], true, true);
                    //     activeLastPointToolip(chart);
                    // }, 1000);



                    databaseRef.child(idSalle).on('child_added', function(snap1) {
                        var x1 = snap1.val().temps,
                            y1 = snap1.val().nbr;
                        console.log('x1:',x1,',y1:',y1);
                        series.addPoint([x1, y1], true, true);
                        // serieCapacite.addPoint([x1,capacite], true, true);
                        // serieSeuil.addPoint([x1,seuil], true, true);
                        activeLastPointToolip(chart);
                    });
                }
            }
        },
        
        title: {
            text: 'Nombre de personne dans la salle'
        },
        xAxis: {
            type: 'linear',
            startOnTick: true,
            endOnTick: true
        },
        yAxis: {
            title: {
                text: null
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 0);
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Nombre de personne dans la salle',
            // data: (function () {
            //     var data = [];
            //     data.push({
            //             x: 0,
            //             y: 0
            //         });
            //     console.log('initialData:', data)
            //     return data;
            // }())

            data: (function () {
                var data = [],
                    i;
                for (i = -100; i <= 0; i += 1) {
                    data.push({
                        x: null,
                        y: null
                    });
                }
                return data;
            }())

        },
        // {	
        // 	type: 'line',
        // 	data:[[capacite,0], [capacite,]],
        // 	color: 'red'
        // },
        // {	
        // 	type: 'line',
        // 	data:[[seuil,0], [seuil,]],
        // 	color: 'orange'
        // }
        ]
      };

	return optionsDuGraphe;
};
// var test= setOptions();
// console.log(test);
function setLimitsLines(){


}


