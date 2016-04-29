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
                stacking: 'normal',
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
            type: 'column',
            data: [] 
            
        }]};
var count = 0
var claims = []

$(function() {        
    $("#button").click( function() {
        if(count != 0) {
            $('#container').highcharts().destroy();
        }
       
        count++;

        //Push Data In
        claims.push("Objective " + count);
        data.push(2)

        chartOptions.xAxis.categories = claims;
        chartOptions.series[0].data = data;

        var chart = new Highcharts.Chart(chartOptions)

        console.log("Categories: " + chart.axes[0].categories);
        console.log("Chart Data: " + chart.series[0].data);

    }); 

});