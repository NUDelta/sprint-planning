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

                            // drag: function (e) {
                            //     // Returning false stops the drag and drops. Example:
                            //     /*
                            //     if (e.newY > 300) {
                            //         this.y = 300;
                            //         return false;
                            //     }
                            //     */

                            //     $('#drag').html(
                            //         'Dragging <b>' + this.series.name + '</b>, <b>' + this.category + '</b> to <b>' + Highcharts.numberFormat(e.y, 2) + '</b>');
                            // },
                            // drop: function () {
                            //     $('#drop').html(
                            //         'In <b>' + this.series.name + '</b>, <b>' + this.category + '</b> was set to <b>' + Highcharts.numberFormat(this.y, 2) + '</b>');
                            // }
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
                data: [30, 30, 30],
                //draggableX: true,
                draggableY: true,
                dragMinY: 0,
                type: 'column',
                minPointLength: 2,
                name: 'Knowledge You Want to Learn This Week',
                color: '#74B8E6'
            }, {
                data: [10, 10, 10],
                draggableY: true,
                dragMinY: 0,
                type: 'column',
                minPointLength: 2,
                name: 'Knowledge You Have',
                color: '#2980b9'
            }]

        });
},
researchQuestions = function(){
    var new_question = $('#new-question input');
    if(new_question.val()){
        question_number += 1;
        //Add Question Link
        $('#new-question').before(
            '<div class="col-xs-12 link-question"><a href="#question-' + question_number + 
            '">'+ question_number + '. '+new_question.val() + '</div>');
        //Add the chart container
        $(".container").append('<h3 id="question-' + question_number + '">'+ question_number + '. ' + new_question.val() + '</h3><div id="chart-' + question_number + '" class="col-xs-6"></div>');
        //Insert the chart
        chart(new_question.val(),'chart-'+question_number);
        //Add the textareas
        $(".container").append(
        '<form class="col-xs-6">' + 
        	'<div class="form-group">' +
        	'<label for="What you have done">What you have done</label>' + 
        	'<textarea class="form-control" id="What you have done" placeholder="Your work"></textarea></div>' +
        	'<div class="form-group">' +
        	'<label for="What you want to learn this week">What you want to learn this week?</label>' + 
        	'<textarea class="form-control" id="What you want to learn this week" placeholder="Your desired learning"></textarea></div>'+
        	'<div class="form-group">' + 
        	'<a href="#">Back to the top</a></div>'+
        '</form><div class="clearfix"></div>'
        );
        //Clear the new question value
        new_question.val('');
    }
};
$("#new-question input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        researchQuestions();
    }
});
$('#new-question button').click(researchQuestions);
chart('test','container');
