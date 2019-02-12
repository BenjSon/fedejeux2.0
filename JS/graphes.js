

function activeLastPointToolip(chart) {
    var points = chart.series[0].points;
    chart.tooltip.refresh(points[points.length -1]); //Permet d'obtenir des indications sur le dernier point placé sur le graphe
}

function dateToString(date){
    date+= (1000*60*60) //une heure de décalage
    var d = new Date();
    d.setTime(date);
    dateString = d.toISOString();
    //console.log (dateString);
    var newDate = dateString.replace('T',' ').slice(0,-5)
    //console.log(newDate);
    return newDate
};            

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

                    serieCapacite.name = capacite;
                    serieSeuil.name = seuil;

                    var nbrSamples = 40; //nbr de points attribué à l'initialisation du graphe
                    
                    if(nbrSamples >= ACCUEIL.parGraphe.nbrData){
                        databaseRef.child(idSalle).on('child_added', function(snap) {
                            var x = (new Date(snap.val().temps)).getTime(),
                                y = snap.val().nbr;
                            //console.log('x:',x,',y:',y);
                            series.addPoint([x, y], true, false);
                            serieCapacite.addPoint([x,capacite], true, false);
                            serieSeuil.addPoint([x,seuil], true, false);
                            activeLastPointToolip(chart);
                        });
                    }
                    else{
                        var tickSample = parseInt((ACCUEIL.parGraphe.maxTemps-ACCUEIL.parGraphe.minTemps)/nbrSamples);
                        var i=0;
                        for(i=ACCUEIL.parGraphe.minTemps; i<=ACCUEIL.parGraphe.maxTemps; i+=tickSample){
                            iString = dateToString(i);
                            //console.log(i);
                            databaseRef.child(idSalle).orderByChild('temps').endAt(iString)
                            .limitToLast(1).once('child_added', function(snap) {
                                var x = (new Date(snap.val().temps)).getTime(),
                                    y = snap.val().nbr;
                                //console.log('x:',x,',y:',y);
                                series.addPoint([x, y], true, false);
                                serieCapacite.addPoint([x,capacite], true, false);
                                serieSeuil.addPoint([x,seuil], true, false);                           
                                activeLastPointToolip(chart);
                            });
                        }
                        databaseRef.child(idSalle).limitToLast(1).on('child_added', function(snap) {
                            var x = (new Date(snap.val().temps)).getTime(),
                                y = snap.val().nbr;
                            //console.log('x:',x,',y:',y);
                            series.addPoint([x, y], true, false);
                            serieCapacite.addPoint([x,capacite], true, false);
                            serieSeuil.addPoint([x,seuil], true, false);
                            activeLastPointToolip(chart);
                        });
                    }
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
            data: (function () {
                var data = [],
                    i;
                for (i = 0; i <= 20; i += 1) {
                    data.push({
                        x: null,
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
                        x: null,
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
                        x: null,
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

function setGraphe(idGraphe, chart, nomSeries){
    var databaseRef = firebase.database().ref("HistoriqueSalles/current");
    console.log("je suis la");
    var nbrSamples = 40; //nbr de points attribué à l'initialisation du graphe
    if(nbrSamples >= ACCUEIL.parGraphe.nbrData){
        databaseRef.child(idGraphe).on('child_added', function(snap) {
            var x = (new Date(snap.val().temps)).getTime(),
                y = snap.val().nbr;
            //console.log('x:',x,',y:',y);
            nomSeries.addPoint([x, y], true, false);
            activeLastPointToolip(chart);
        });
    }

    else{
        var tickSample = parseInt((ACCUEIL.parGraphe.maxTemps-ACCUEIL.parGraphe.minTemps)/nbrSamples);
        var i=0;

        for(i=ACCUEIL.parGraphe.minTemps; i<=ACCUEIL.parGraphe.maxTemps; i+=tickSample){
            iString = dateToString(i);
            //console.log(i);
            databaseRef.child(idGraphe).orderByChild('temps').endAt(iString)
            .limitToLast(1).once('child_added', function(snap) {
                var x = (new Date(snap.val().temps)).getTime(),
                    y = snap.val().nbr;
                nomSeries.addPoint([x, y], true, false);                     
                activeLastPointToolip(chart);
            });
        }

        databaseRef.child(idGraphe).limitToLast(1).on('child_added', function(snap) {
            var x = (new Date(snap.val().temps)).getTime(),
                y = snap.val().nbr;
            nomSeries.addPoint([x, y], true, false);
            console.log(nomSeries);
            activeLastPointToolip(chart);
        });
    }
}


function setGrapheSommeOptions(){
    Vue.use(VueHighcharts);
    var databaseRef = firebase.database().ref("HistoriqueSalles/current");
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    var OptionSomme = {
        marginRight: 10,
        type: 'spline',
        chart: {
            backgroundColor:'#2e778d',
            events: {
                load: function () {
                //Load permet d'attendre de charger toutes les données
                    var series1 = this.series[0],
                        series2 = this.series[1],
                        series3 = this.series[2],
                        chart = this;
                    
                    setGraphe("salle1", chart, series1);
                    setGraphe("salle2", chart, series2);
                    setGraphe("salle3", chart, series3);
                    activeLastPointToolip(chart);
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
        series: [
            {
                data: (function () {
                    var data = [],
                        i;
                    for (i = 0; i <= 20; i += 1) {
                        data.push({
                            x: null,
                            y: null
                        });
                    }
                    return data;
                }()),
                color: "#f8c100",
                name: 'Nombre de personne dans la salle1'
         
            },
            {   
         
                data: (function () {
                    var data = [],
                        i;
                    for (i = 0; i <= 20; i += 1) {
                        data.push({
                            x: null,
                            y: null
                        });
                    }
                    return data;
                }()),
                colors: '#7cd63b',
                name: 'Nombre de personne dans la salle2'
            },
            {
                data: (function () {
                    var data = [],
                        i;
                    for (i = 0; i <= 20; i += 1) {
                        data.push({
                            x: null,
                            y: null
                        });
                    }
                    return data;
                }()),
                color: "#7cd63b",
                name: 'Nombre de personne dans la salle3'
            }
        ]
    };
    return OptionSomme;

}


