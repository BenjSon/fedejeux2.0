
var databaseRef = firebase.database().ref("Tests/");

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
    // function random() {
    //     var count = 0;
    //     return count;

    // }
    var chart = Highcharts.chart('container', {
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



                    // Jusqu'ici ce ne sont que des commentaires pour Fan, donc il n'utilise que ce qui vient : c'est le lien Firebase. 


                    databaseRef.on('child_added', function (snap, previousKey) {

                        var x = (new Date()).getTime(),
                            y = snap.val().count;

                            //le nom de sa valeur c'était count

                        series.addPoint([x, y], true, true);
                        activeLastPointToolip(chart);
                    })
                }
            }
        },
        title: {
            text: 'Nombre de personne dans la salle'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
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
            data: (function () {
                // 生成随机值
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            }())
        }]
    });