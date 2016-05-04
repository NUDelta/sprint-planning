var question_number = 0,
    colors = ['#e67e22','#3498db','#9b59b6','#f1c40f','#27ae60','#e74c3c','#95a5a6',"#2c3e50"],
    // data = [[0.5, 0.5, 7],
    //         [0.75, 0.25, 7],
    //         [-0.25, 0.25, 7],
    //         [-0.5, 0.5, 7],
    //         [0.75, -0.25, 7],
    //         [-0.25, -0.25, 7],
    //         [-0.25, -0.75, 7]],
    data = [{x:0.25, y:0.5, z:7, name: '1'},
            {x:0.375, y:0.625, z:7, name: '2'},
            {x:0.375, y:0.375, z:7, name: '3'},
            {x:0.5, y:0.75, z:7, name: '4'},
            {x:0.5, y:0.25, z:7, name: '5'},
            {x:0.625, y:0.625, z:7, name: '6'},
            {x:0.625, y:0.375, z:7, name: '7'},
            {x:0.75, y:0.5, z:7, name: '8'}],
    delieverables_list = [],
    chart = function(title,renderLocation,question_number){
       
        // console.log(new_data);
        var current_chart = new Highcharts.Chart({
            chart: {
                renderTo: renderLocation,
                animation: false
            },
            
            title: {
                text: 'Essential vs. Difficulty'
            },
            legend: {
                enabled: false
            },
            xAxis:{
                title: {
                    text: 'Difficulty'
                },
                min:0,
                max:1,
                lineWidth: 0,
                minorGridLineWidth: 10,
                lineColor: 'transparent',
                labels: {
                    enabled: true
                },
                minorTickLength: 10,
                tickLength: 10,
                endOnTick: true,
            },
            yAxis:{
                title: {
                    text: 'Essential'
                },

                min:0,
                max:1,
                lineWidth: 1,
                minorGridLineWidth: 10,
                lineColor: 'transparent',
                   
                   labels: {
                       enabled: true
                   },
                   minorTickLength: 10,
                   tickLength: 10,
                    endOnTick: true,

            },
            tooltip: {
                enabled:false
            },
            plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        }
                    },

            // series: [{
            //     type: 'bubble',
            //     cursor: 'move',
            //     draggableX: true,
            //     draggableY: true,
            //     data: new_data
            // }]


        });
        for(var i = 0; i < delieverables_list[question_number]; i += 1){
            var new_data = data.slice(i,i+1)
            current_chart.addSeries({  
                name: i,                      
                type: 'bubble',
                cursor: 'move',
                draggableX: true,
                draggableY: true,
                data: new_data,
                color: colors[i]
            });    
        }
        current_chart.redraw();
        
},
add_questions = function(){
    var new_question = $('#new-question input');
    if(new_question.val()){
        question_number += 1;
        //Add question Link
        $('#new-question').before(
            '<div class="col-xs-12 link-question"><a href="#question-' + question_number + 
            '">'+ question_number + '. '+new_question.val() + '</div>');
        //Add the chart container
        $(".container").append('<h3 id="question-' + question_number + '">'+ question_number + '. ' + new_question.val() + '</h3>');
        
        //Add the textareas
        $(".container").append(
        '<div class="col-xs-6" id="col-left-' + question_number + '">'+
        '<form class="col-xs-12">' + 
        	'<div class="form-group">' +
            '<h5>What work have you done towards this question/claim?</h5>' + 
        	'<div class="input-group">' +
            '<div class="input-group-btn">' + 
        '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span class="caret"></span></button>' +
        '<ul class="dropdown-menu">' +
          '<li><a href="#">Action</a></li>' +
          '<li><a href="#">Another action</a></li>' +
          '<li><a href="#">Something else here</a></li>' +
          '<li role="separator" class="divider"></li>' +
          '<li><a href="#">Separated link</a></li>' +
        '</ul>' +
      '</div>'+
            '<input type="text" id="input-delieverable-' + question_number + '" '+
            'class="form-control" placeholder="Write in your Delieverable (Press Enter)"><span class="input-group-btn"><button class="btn btn-success" type="button">+</button></span></div></div>' +
        '</form>'+
        //End of form
        '<ul id="deliverable-list-' + question_number + '" class="list-group col-xs-12 ul-delieverables"></ul>' +
        '</div>' + 
        //Make chart container
        '<div id="chart-' + question_number + '" class="col-xs-6"></div>' +
        '<div class="clearfix"></div>'
        );
        //Make delieverable dictionary entry
        delieverables_list[question_number] = 0;
        $('#input-delieverable-' + question_number).keypress(function(event) {
            if (event.which == 13) {
                event.preventDefault();
                add_deliverables(question_number)
            }
        });
        //Clear the new question value
        new_question.val('');
    }
},
add_deliverables = function(question_number) {
    var new_deliverable = $('#input-delieverable-' + question_number);
    if(new_deliverable.val()){
        delieverables_list[question_number] += 1; 
        $('#deliverable-list-' + question_number).append(
            '<li class="list-group-item">' + 
                delieverables_list[question_number] + '. ' + 
                new_deliverable.val() +
                '<span class="pull-right"><i class="fa fa-circle circle-' +  delieverables_list[question_number] + '" aria-hidden="true"></i></span>' + 
            '</li>'
        );
        new_deliverable.val('');
        if (delieverables_list[question_number] == 1) {
            $('#col-left-' + question_number).append(
                '<button type="button" class="btn btn-primary btn-chart" id="btn-make-chart-' + question_number + '">Make Evaluation Chart</button>'
            );
            $('#col-left-' + question_number).append(

                '<form class="col-xs-12"><div class="form-group">' +
                    '<label for="Why">Which delieverable(s) did you choose and why?</label>' + 
                    '<textarea class="form-control" placeholder=""></textarea></div></form>'
            );
            $('#btn-make-chart-' + question_number).click( function(){
                chart('title','chart-' + question_number,question_number)
            });
        }
    }
};
$("#new-question input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        add_questions();
    }
});
$('#new-question button').click(add_questions);
chart('test','container');
