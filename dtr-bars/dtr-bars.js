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
    done_list = [],
    todo_list = [],
    chart = function(title,renderLocation,question_number){
        increment = 20;
        //Make data
        done_data = [];
        done_data[0] = done_list[question_number]['Design'].length * increment;
        done_data[1] = done_list[question_number]['Technology'].length * increment;
        done_data[2] = done_list[question_number]['Research'].length * increment;


        todo_data = [];
        todo_data[0] = todo_list[question_number]['Design'].length * increment / 2;
        todo_data[1] = todo_list[question_number]['Technology'].length * increment / 2;
        todo_data[2] = todo_list[question_number]['Research'].length * increment / 2;

        // console.log(new_data);
        var current_chart = new Highcharts.Chart({
            chart: {
                renderTo: renderLocation,
                animation: false
            },
            title: {
                text: done_list[question_number]['title']
            },
            xAxis: {
                categories: ['Design', 'Technology', 'Research']
            },
            yAxis:{
                title: {
                    text: 'Knowledge'
                },
                min:0,
                max:100,
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                   
                   labels: {
                       enabled: false
                   },
                   minorTickLength: 0,
                   tickLength: 0
            },
            legend: {
                    reversed: true
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                },
                line: {
                    cursor: 'ns-resize'
                }
            },

            tooltip: {
                enabled:false
            },

            series: [{
                data: todo_data,
                type: 'column',
                minPointLength: 2,
                name: 'Knowledge You Want to Learn This Week',
                color: '#74B8E6'
            }, {
                data: done_data,
                type: 'column',
                minPointLength: 2,
                name: 'Knowledge You Have',
                color: '#2980b9'
            }]


        });
        // for(var i = 0; i < done_list[question_number]['number']; i += 1){
        //     var new_data = data.slice(i,i+1)
        //     current_chart.addSeries({  
        //         name: i,                      
        //         type: 'bubble',
        //         cursor: 'move',
        //         draggableX: true,
        //         draggableY: true,
        //         data: new_data,
        //         color: colors[i]
        //     });    
        // }
        current_chart.redraw();
        
},
add_done_questions = function(){
    var new_question = $('#new-question input');
    if(new_question.val()){
        question_number += 1;
        //Add question Link
        $('#new-question').before(
            '<div class="col-xs-12 link-question"><a href="#question-' + question_number + 
            '">'+ question_number + '. '+new_question.val() + '</div>');
        //Add the chart container
        $(".container").append('<h3 id="question-' + question_number + '">'+ question_number + '. ' + new_question.val() + '</h3>');
        
        //Add form on left side with DTR dropdown and input
        $(".container").append(
        '<div class="col-xs-6" id="col-done-left-' + question_number + '">'+
        '<form class="col-xs-12">' + 
        	'<div class="form-group">' +
            '<h5>Work done towards this question/claim:</h5>' + 
        	'<div class="input-group" id="input-done-' + question_number + '">' +
            '<div class="input-group-btn">' + 
        '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Design <span class="caret"></span></button>' +
        '<ul class="dropdown-menu">' +
          '<li><a href="#">Design</a></li>' +
          '<li><a href="#">Technology</a></li>' +
          '<li><a href="#">Research</a></li>'  +
        '</ul>' +
      '</div>'+
            '<input type="text" '+
            'class="form-control input-text" placeholder="Write in what you have done (Press Enter)"><span class="input-group-btn"><button class="btn btn-success" type="button">+</button></span></div></div>' +
        '</form>'+
        //End of form
        '<ul id="done-list-' + question_number + '" class="list-group col-xs-12 ul-delieverables"></ul>' +
        '</div>' + 
        //Make chart container
        '<div id="chart-' + question_number + '" class="col-xs-6"></div>' +
        '<div class="clearfix"></div>'
        );
        //Make dropdown change based off input
        $(".dropdown-menu li a").click(function(){

            //5/9/16 - very jank way of doing this, but works for everything

            //a>li>ul -prev-> btn to change the value
            $(this).parent().parent().prev().html($(this).text()+' <span class="caret"></span>');
            //Close dropdown
            $(this).parent().parent().parent().removeClass('open');
            return false;
        });
        //Make delieverable dictionary entry
        done_list[question_number] = {
            'number':0,
            'Design':[],
            'Research':[],
            'Technology':[],
            'title':new_question.val()
        };
        $('.input-text').keypress(function(event) {
            if (event.which == 13) {
                event.preventDefault();
                var id = $(this).parent().attr('id');
                //console.log(id);
                add_done(id.substring(id.length - 1, id.length))
            }
        });
        add_todo_questions();
        //Clear the new question value
        new_question.val('');
    }
},
add_todo_questions = function(){    
    //Add form on left side with DTR dropdown and input
    $("#col-done-left-" + question_number).append(
    '<div id="todo-left' + question_number + '">'+
    '<form class="col-xs-12">' + 
        '<div class="form-group">' +
        '<h5>Work you will do towards this question/claim:</h5>' + 
        '<div class="input-group" id="input-todo-' + question_number + '">' +
        '<div class="input-group-btn">' + 
    '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Design <span class="caret"></span></button>' +
    '<ul class="dropdown-menu">' +
      '<li><a href="#">Design</a></li>' +
      '<li><a href="#">Technology</a></li>' +
      '<li><a href="#">Research</a></li>'  +
    '</ul>' +
  '</div>'+
        '<input type="text" '+
        'class="form-control input-text" placeholder="Write in what you want to do (Press Enter)"><span class="input-group-btn"><button class="btn btn-success" type="button">+</button></span></div></div>' +
    '</form>'+
    //End of form
    '<ul id="todo-list-' + question_number + '" class="list-group col-xs-12 ul-delieverables"></ul>' +
    '</div>' 
    );
    //Make dropdown change based off input
    $(".dropdown-menu li a").click(function(){
       
        //5/9/16 - very jank way of doing this, but works for everything

        //a>li>ul -prev-> btn to change the value
        $(this).parent().parent().prev().html($(this).text()+' <span class="caret"></span>');

        //Close dropdown
        $(this).parent().parent().parent().removeClass('open');
         return false;
    });
    //Make delieverable dictionary entry
    todo_list[question_number] = {
        'number':0,
        'Design':[],
        'Research':[],
        'Technology':[]
    };
    $('.input-text').keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            var id = $(this).parent().attr('id');
            //  console.log(id);
            add_todo(id.substring(id.length - 1, id.length));
        }
    });

},
add_done = function(question_number) {
    var new_done_text = $('#input-done-' + question_number + ' .input-text'),new_done_type = $('#input-done-' + question_number + ' .btn'),
        type = new_done_type.text().substring(0,new_done_type.text().length-2);
        //console.log(type);
    if(new_done_text.val()){
        done_list[question_number]['number'] += 1;
        done_list[question_number][type].push(new_done_text.val());
        // console.log(done_list[question_number]);

        $('#done-list-' + question_number).append(
            '<li class="list-group-item">' +
                done_list[question_number]['number'] + '. ' + 
               type + ': '  +
                new_done_text.val() +
                '<span class="pull-right"><i class="fa fa-circle circle-' +  type + '" aria-hidden="true"></i></span>' + 
            '</li>'
        );
        new_done_text.val('');
    }
},
add_todo = function(question_number) {
    var new_done_text = $('#input-todo-' + question_number + ' .input-text'),new_done_type = $('#input-todo-' + question_number + ' .btn'),
        type = new_done_type.text().substring(0,new_done_type.text().length-2);
    if(new_done_text.val()){
        todo_list[question_number]['number'] += 1;
        todo_list[question_number][type].push(new_done_text.val());
        // console.log(todo_list[question_number]);

        $('#todo-list-' + question_number).append(
            '<li class="list-group-item">' +
                todo_list[question_number]['number'] + '. ' + 
               type + ': '  +
                new_done_text.val() +
                '<span class="pull-right"><i class="fa fa-circle circle-' +  type + '" aria-hidden="true"></i></span>' + 
            '</li>'
        );
        new_done_text.val('');
        if (todo_list[question_number]['number'] == 1) {

            $('#todo-left' + question_number).append(
                '<button type="button" class="btn btn-primary btn-chart" id="btn-make-chart-' + question_number + '">Make DTR Bars</button>'
            );
            $('#todo-left' + question_number).append(

                '<form class="col-xs-12"><div class="form-group">' +
                    '<label for="Why">Which things did you choose to do and why?</label>' + 
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
        add_done_questions();
    }
});
$('#new-question button').click(add_done_questions);
chart('test','container');
