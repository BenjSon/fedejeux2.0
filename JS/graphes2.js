

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
            backgroundColor:'#2e778d',
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
                        var x1 = (new Date(snap1.val().temps)).getTime(),
                            y1 = snap1.val().nbr;
                        console.log('x1:',x1,',y1:',y1);
                        series.addPoint([x1, y1], true, true);
                        serieCapacite.addPoint([x1,capacite], true, true);
                        serieSeuil.addPoint([x1,seuil], true, true);
                        activeLastPointToolip(chart);
                    });
                }
            }
        },
        
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime',
            startOnTick: true,
            endOnTick: true,
            labels: {
                style: {
                    color: 'white',
                    font: '11px Lato'
                }
            }
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                style: {
                    color: 'white',
                    font: '11px Lato'
                }
            }
        },
        colors: [
                '#7cd63b'
                ],
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
                for (i = 0; i <= 20; i += 1) {
                    data.push({
                        x: (new Date('2019-01-30 11:59:0'+i)).getTime(),
                        y: null
                    });
                }
                return data;
            }())

        },

        {	
        	type: 'spline',
            dashStyle: 'shortdot',

        	data: (function () {
                var data = [],
                    i;
                for (i = 0; i <= 20; i += 1) {
                    data.push({
                        x: (new Date('2019-01-30 11:59:0'+i)).getTime(),
                        y: capacite
                    });
                }
                return data;
            }()),

        	color: 'red'
        },

        {	
        	type: 'spline',
            dashStyle: 'shortdot',

        	data: (function () {
                var data = [],
                    i;
                for (i = 0; i <= 20; i += 1) {
                    data.push({
                        x: (new Date('2019-01-30 11:59:0'+i)).getTime(),
                        y: seuil
                    });
                }
                return data;
            }()),

        	color: 'orange'
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
         },

      };

	return optionsDuGraphe;
};
// var test= setOptions();
// console.log(test);
function setGrapheSommeOptions(){
    Vue.use(VueHighcharts);
    var databaseRef = firebase.database().ref("HistoriqueSalles/current");
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    var OptionSomme = {
        chart: {
            type: 'spline',
            marginRight: 10,
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
                    databaseRef.child("salle1").on('child_added', function(snap1) {
                        var x1 = (new Date(snap1.val().temps)).getTime(),
                            y1 = snap1.val().nbr;

                        // console.log('x1:',x1,',y1:',y1);
                        databaseRef.child("salle2").orderByChild('temps').endAt(x1).limitToLast(1)
                            .on('child_added', function(snap2){
                            var x2 = (new Date(snap2.val().temps)).getTime();
                            var y2 = snap2.val().nbr;
                            // console.log('x2:',x2,',y2:',y2);

                            databaseRef.child("salle3").orderByChild('temps').endAt(x1).limitToLast(1)
                                .on('child_added', function(snap3){
                                var x3 = (new Date(snap3.val().temps)).getTime();
                                var y3 = snap3.val().nbr;
                                // console.log('x3:',x3,',y3:',y3);

                                y1 = y1 + y2 + y3;
                                // console.log('x1:',x1,',y1:',y1);
                                series.addPoint([x1, y1], true, true);
                            });
                        
                        activeLastPointToolip(chart);
                        });
                    });
                }
            }
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            labels: {
                style: {
                    color: 'white',
                    font: '11px Lato'
                }
            }
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                style: {
                    color: 'white',
                    font: '11px Lato'
                }
            }
        },
        colors: [
                '#7cd63b'
                ],

        chart: { polar: true, type: 'line', backgroundColor:'#2e778d' }, 

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
                for (i = 0; i <= 20; i += 1) {
                    data.push({
                        x: (new Date('2019-01-30 11:59:0'+i)).getTime(),
                        y: 0
                    });
                }
                return data;
            }())

        }]
    };
    return OptionSomme;

}


