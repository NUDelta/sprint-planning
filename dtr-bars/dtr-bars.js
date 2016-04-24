var question_number = 0,
    chart = function(title,renderLocation){
        new Highcharts.Chart({
            chart: {
                renderTo: renderLocation,
                animation: false
            },
            
            title: {
                text: title
            },

            xAxis: {
                categories: ['Design', 'Technology', 'Research']
            },
            yAxis:{
                title: {
                    text: 'Knowledge'
                },
                min:0,
                max:100
            },
            legend: {
                    reversed: true
            },
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
                data: [10, 30, 20],
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
},
researchQuestions = function(){
    var new_question = $('#new-question input');
    if(new_question.val()){
        question_number += 1;
        $('#new-question').before(
            '<div class="col-xs-12"><div id=question-' + question_number + 
            '" class="input-group"> <input type="text" class="form-control" ' +
            'value="' + new_question.val() +  
            '"><span class="input-group-btn"> <button class="btn btn-danger" type="button">-</button></span></div></div>');
        new_question.val('');
    }
};
$('#new-question button').click(researchQuestions);
chart('test','container');
