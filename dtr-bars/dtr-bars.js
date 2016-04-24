var chart = new Highcharts.Chart({
    chart: {
        renderTo: 'container',
        animation: false
    },
    
    title: {
        text: 'Highcharts draggable points demo'
    },

    xAxis: {
        categories: ['Design', 'Technology', 'Research']
    },
    // yAxis:{
    //     min:0,
    //     max:100
    // },
    plotOptions: {
        series: {
            point: {
                events: {

                    drag: function (e) {
                        // Returning false stops the drag and drops. Example:
                        /*
                        if (e.newY > 300) {
                            this.y = 300;
                            return false;
                        }
                        */

                        $('#drag').html(
                            'Dragging <b>' + this.series.name + '</b>, <b>' + this.category + '</b> to <b>' + Highcharts.numberFormat(e.y, 2) + '</b>');
                    },
                    drop: function () {
                        $('#drop').html(
                            'In <b>' + this.series.name + '</b>, <b>' + this.category + '</b> was set to <b>' + Highcharts.numberFormat(this.y, 2) + '</b>');
                    }
                }
            },
            stickyTracking: false
        },
        column: {
            stacking: 'normal'
        },
        line: {
            cursor: 'ns-resize'
        }
    },

    tooltip: {
        yDecimals: 2
    },

    series: [{
        data: [0, 30, 20],
        //draggableX: true,
        draggableY: true,
        dragMinY: 0,
        type: 'column',
        minPointLength: 2,
        name: 'Knowledge You Want to Gain'
    }, {
        data: [5, 10, 12],
        draggableY: true,
        dragMinY: 0,
        type: 'column',
        minPointLength: 2,
        name: 'Knowledge You Have'
    }]

});
