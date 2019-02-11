

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
                            series.addPoint([x, y], true, true);
                            serieCapacite.addPoint([x,capacite], true, true);
                            serieSeuil.addPoint([x,seuil], true, true);
                            activeLastPointToolip(chart);
                            console.log(ACCUEIL.parGraphe.nbrData);
                        });
                    }

                    else{
                        var tickSample = parseInt((ACCUEIL.parGraphe.maxTemps-ACCUEIL.parGraphe.minTemps)/nbrSamples);
                        var i;

                        for(i=ACCUEIL.parGraphe.minTemps; i<=ACCUEIL.parGraphe.maxTemps; i+=tickSample){
                            iString = dateToString(i);
                            //console.log(i,iString);
                            databaseRef.child(idSalle).orderByChild('temps').endAt(iString)
                            .limitToLast(1).once('child_added', function(snap) {
                                var x = (new Date(snap.val().temps)).getTime(),
                                    y = snap.val().nbr;
                                console.log('x:',x,',y:',y);
                                series.addPoint([x, y], true, false);
                                serieCapacite.addPoint([x,capacite], true, false);
                                serieSeuil.addPoint([x,seuil], true, false);                           
                                activeLastPointToolip(chart);
                            });
                        }

                        databaseRef.child(idSalle).limitToLast(1).on('child_added', function(snap) {
                            var x = (new Date(snap.child('temps').val())).getTime(),
                                y = snap.child('nbr').val();
                            console.log('x:',x,',y:',y);
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
                for (i = 0; i <= 60; i += 1) {
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
                for (i = 0; i <= 60; i += 1) {
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
                for (i = 0; i <= 60; i += 1) {
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
// var test= setOptions();
// console.log(test);
function setGrapheSommeOptions(){
    //console.log("setGrapheSommeOptions");
    Vue.use(VueHighcharts);
    var databaseRef = firebase.database().ref("HistoriqueSalles/current");
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    var OptionSomme = {
            type: 'spline',
            marginRight: 10,
            marginleft:0,
            
        chart:{
            backgroundColor:'#2e778d',
        //     events: {
        //         load: function () {
        //             console.log("load");
        //             //Load permet d'attendre de charger toutes les données
        //             var series = this.series[0],
        //                 chart = this;
        //             activeLastPointToolip(chart);

        //             var nbrSamples = 40; //nbr de points attribué à l'initialisation du graphe
        //             getParGraphe(idSalle);

        //             if(nbrSamples >= ACCUEIL.parGraphe.nbrData){
        //                 databaseRef.child(idSalle).on('child_added', function(snap) {
        //                     var x = (new Date(snap.val().temps)).getTime(),
        //                         y = snap.val().nbr;
        //                     //console.log('x:',x,',y:',y);
        //                     series.addPoint([x, y], true, true);
        //                     serieCapacite.addPoint([x,capacite], true, true);
        //                     serieSeuil.addPoint([x,seuil], true, true);
        //                     activeLastPointToolip(chart);
        //                 });
        //             }

        //             else{
        //                 var tickSample = parseInt((ACCUEIL.parGraphe.maxTemps-ACCUEIL.parGraphe.minTemps)/nbrSamples);
        //                 var i;

        //                 for(i=ACCUEIL.parGraphe.minTemps; i<=ACCUEIL.parGraphe.maxTemps; i+=tickSample){
        //                     iString = dateToString(i);
        //                     //console.log(i,iString);
        //                     databaseRef.child(idSalle).orderByChild('temps').endAt(iString)
        //                     .limitToLast(1).once('child_added', function(snap) {
        //                         var x = (new Date(snap.val().temps)).getTime(),
        //                             y = snap.val().nbr;
        //                         console.log('x:',x,',y:',y);
        //                         series.addPoint([x, y], true, true);
        //                         serieCapacite.addPoint([x,capacite], true, true);
        //                         serieSeuil.addPoint([x,seuil], true, true);                           
        //                         activeLastPointToolip(chart);
        //                     });
        //                 }

        //                 databaseRef.child('salle1').limitToLast(1).on('child_added', function(snap) {
        //                     var x = (new Date(snap.child('temps').val())).getTime(),
        //                         y = snap.child('nbr').val();
        //                     console.log('x:',x,',y:',y);
        //                     series.addPoint([x, y], true, true);
        //                     //serieCapacite.addPoint([x,capacite], true, true);
        //                     //serieSeuil.addPoint([x,seuil], true, true);
        //                     activeLastPointToolip(chart);
        //                 });
        //             }
        //         }
        //     }
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime',
            startOnTick: true,
            endOnTick: true,
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
            // data: (function () {
            //         // console.log("initialisation data");
            //         // var series = this.series[0],
            //         //     chart = this;
            //         //activeLastPointToolip(chart);
            //         var data = [];
            //         databaseRef.child('salle1').limitToLast(20).on('child_added', function(snap) {
            //             data.push({
            //                 x : (new Date(snap.val().temps)).getTime(),
            //                 y : snap.val().nbr
            //             });
            //             console.log("data:",data);
            //             // var x = (new Date(snap.val().temps)).getTime(),
            //             //     y = snap.val().nbr;
            //             // //console.log('x:',x,',y:',y);
            //             // data.push([x,y]);
            //             //serieCapacite.addPoint([x,capacite], true, true);
            //             //serieSeuil.addPoint([x,seuil], true, true);
            //             //activeLastPointToolip(chart);
            //         });

            //         var nbrSamples = 40; //nbr de points attribué à l'initialisation du graphe
            //         getParGraphe('salle1');

            //         if(nbrSamples >= ACCUEIL.parGraphe.nbrData){
            //             databaseRef.child("salle1").on('child_added', function(snap1) {
            //                 var x1 = snap1.val().temps,
            //                     y1 = snap1.val().nbr;
            //                 // console.log('x1:',x1,',y1:',y1);

            //                 databaseRef.child("salle2").orderByChild('temps').endAt(x1).limitToLast(1)
            //                     .on('child_added', function(snap2){
            //                     //var x2 = (new Date(snap2.val().temps)).getTime();
            //                     var y2 = snap2.val().nbr;
            //                     // console.log('x2:',x2,',y2:',y2);

            //                     databaseRef.child("salle3").orderByChild('temps').endAt(x1).limitToLast(1)
            //                         .on('child_added', function(snap3){
            //                         //var x3 = (new Date(snap3.val().temps)).getTime();
            //                         var y3 = snap3.val().nbr;
            //                         // console.log('x3:',x3,',y3:',y3);

            //                         // y1 = y1 + y2 + y3;
            //                         // x1 = (new Date(x1)).getTime();
            //                         data.push({
            //                             x : (new Date(x1)).getTime(),
            //                             y : y1 + y2 + y3
            //                         });
            //                         console.log("data:",data);
            //                         //activeLastPointToolip(chart);
            //                     });
            //                 });
            //             });
            //         }

            //         else{
            //             var tickSample = parseInt((ACCUEIL.parGraphe.maxTemps-ACCUEIL.parGraphe.minTemps)/nbrSamples);
            //             var i;
            //             console.log('tickSample',tickSample)

            //             for(i=ACCUEIL.parGraphe.minTemps; i<=ACCUEIL.parGraphe.maxTemps; i+=tickSample){
            //                 iString = dateToString(i);
            //                 console.log(i,iString);

            //                 databaseRef.child("salle1").orderByChild('temps').endAt(iString)
            //                 .limitToLast(1).once('child_added', function(snap1) {
            //                     var x1 = (new Date(snap1.val().temps)).getTime();
            //                     var y1 = snap1.val().nbr;
            //                     // console.log('x1:',x1,',y1:',y1);

            //                     databaseRef.child("salle2").orderByChild('temps').endAt(iString)
            //                     .limitToLast(1).once('child_added', function(snap2){
            //                         var x2 = (new Date(snap2.val().temps)).getTime();
            //                         var y2 = snap2.val().nbr;
            //                         // console.log('x2:',x2,',y2:',y2);

            //                         databaseRef.child("salle3").orderByChild('temps').endAt(iString)
            //                         .limitToLast(1).once('child_added', function(snap3){
            //                             var x3 = (new Date(snap3.val().temps)).getTime();
            //                             var y3 = snap3.val().nbr;
            //                             // console.log('x3:',x3,',y3:',y3);

            //                             // y = y1 + y2 + y3;
            //                             // x = Math.max(x1, x2, x3);
            //                             data.push({
            //                                 x : Math.max(x1, x2, x3),
            //                                 y : y1 + y2 + y3
            //                             });
            //                             //console.log("data:",data);
            //                             //activeLastPointToolip(chart);
            //                         });
            //                     });
            //                 });
            //             }

            //             databaseRef.child("salle1").limitToLast(1).on('child_added', function(snap1) {
            //                 var x1 = (new Date(snap1.val().temps)).getTime();
            //                     y1 = snap1.val().nbr;
            //                 // console.log('x1:',x1,',y1:',y1);

            //                 databaseRef.child("salle2").limitToLast(1).on('child_added', function(snap2){
            //                     var x2 = (new Date(snap2.val().temps)).getTime();
            //                     var y2 = snap2.val().nbr;
            //                     // console.log('x2:',x2,',y2:',y2);

            //                     databaseRef.child("salle3").limitToLast(1).on('child_added', function(snap3){
            //                         var x3 = (new Date(snap3.val().temps)).getTime();
            //                         var y3 = snap3.val().nbr;
            //                         // console.log('x3:',x3,',y3:',y3);

            //                         // y = y1 + y2 + y3;
            //                         // x = Math.max(x1, x2, x3);
            //                         data.push({
            //                             x : Math.max(x1, x2, x3),
            //                             y : y1 + y2 + y3
            //                         });
            //                         //console.log("data:",data);
            //                         //activeLastPointToolip(chart);
            //                     });
            //                 });
            //             });
            //         }
                

 
            //     return data;
            // }())

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
    return OptionSomme;

}


