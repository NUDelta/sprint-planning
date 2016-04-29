var data = [];
var chartOptions = {
        chart: {
            renderTo: 'container',
            type: 'column',
            animation: false
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
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
            name: 'Story 1',
            draggableY: true,
            // type: 'column',
            data: [] 
            
        }]};
var count = 0
var claims = []

$(function() {        
    $("#button").click( function() {
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
            chartOptions.series[0].data = [2];
        }
        else {
            chartOptions.series[0].data = oldData.concat(2);
        }
        

        //Push Data In
        count++;
        claims.push("Objective " + count);
        chartOptions.xAxis.categories = claims;


        var chart = new Highcharts.Chart(chartOptions)

        console.log("Categories: " + chart.axes[0].categories);
        console.log("Chart Data: " + chart.series[0].data);

    }); 

});