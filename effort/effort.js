var data = [];
var defaultVal = 8
var claimCount = 0;
var chartOptions = {
        chart: {
            renderTo: 'container',
            type: 'column',
            animation: false
        },
        title: {
            text: 'Effort on Sprint Claims'
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Points'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Claim Points',
            draggableY: true,
            // type: 'column',
            data: [] 
            
        }]};
var count = 0
var claims = []

$(function() {        
    function updateGraph() {
        var oldData = [];

        if(count != 0) {
            for (var i = 0; i < chartOptions.series.length; i++) {
                dataArr = chartOptions.series[i].data;
                
                for (var i = 0; i < dataArr.length; i++) {

                    if(typeof(dataArr[i]) == 'object') {
                        oldData.push(dataArr[i].y)
                    }
                    else {
                        oldData.push(dataArr[i])
                    }
                }
                console.log(oldData);
            }
            
            $('#container').highcharts().destroy();
        }
       

        if(count == 0) {
            chartOptions.series[0].data = [defaultVal];
        }
        else {
            chartOptions.series[0].data = oldData.concat(defaultVal);
        }
        //Push Data In
        count++;
        claims.push("Claim " + count);
        chartOptions.xAxis.categories = claims;


        var chart = new Highcharts.Chart(chartOptions)

        console.log("Categories: " + chart.axes[0].categories);
        console.log("Chart Data: " + chart.series[0].data);

    }; 

    $(".addClaim").click( function() {
        insertClaim();
    });

    function insertClaim() {
        var newClaim = $(".claimInput").val();

        claimCount++;

        var item = '<li class="collection-item">' +
        '<p class="claim">Claim ' + claimCount + ': ' + newClaim + '</p>' +
        '</li>';

        $('.collection').append(item);

        updateGraph();

        $(".claimInput").val('');

    }

    $(".claimInput").keypress(function(event) {
       if (event.which == 13) {
           event.preventDefault();
           insertClaim();
       }
    });

});