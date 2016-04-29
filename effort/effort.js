var data = [];

$(function () {
    var chart = new Highcharts.Chart(chartOptions = {
        chart: {
            renderTo: 'container',
            type: 'column'
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
            // draggableY: true,
            data: data 
            
        }]
    }, function() {
        var count = 0
        $("#button").click( function() {
            count++;
            var newClaims = chart.axes[0].categories;
            newClaims.push("Objective " + count);
            data.push(2)
            chart.isDirty = true;
            chart.yAxis[0].isDirty = true;
            chart.xAxis[0].isDirty = true;
            chart.series[0].isDirty = true;
            chart.axes[0].categories = newClaims;
            chart.series[0].setData(data, true)
            console.log("Categories: " + chart.axes[0].categories);
            console.log("Chart Data: " + chart.series[0].data);
        }); 
    });

});