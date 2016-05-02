var story_number = 0,
    colors = ['#e67e22','#3498db','#9b59b6','#f1c40f','#27ae60','#e74c3c','#95a5a6'],
    data = [[0.5, 0.5, 7],
            [0.75, 0.25, 7],
            [-0.25, 0.25, 7],
            [-0.5, 0.5, 7],
            [0.75, -0.25, 7],
            [-0.25, -0.25, 7],
            [-0.25, -0.75, 7]],
    delieverables_list = [],
    chart = function(title,renderLocation,story_number){
        new_data = data.slice(0,delieverables_list[story_number])
        console.log(new_data);
        new Highcharts.Chart({
            chart: {
                renderTo: renderLocation,
                animation: false
            },
            
            title: {
                text: title
            },
            legend: {
                enabled: false
            },
            xAxis:{
                title: {
                    text: 'Difficulty'
                },
                min:-1,
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

                min:-1,
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

            series: [{
                type: 'bubble',
                cursor: 'move',
                draggableX: true,
                draggableY: true,
                data: new_data
            }]


        });
},
delieverables = function(){
    var new_story = $('#new-story input');
    if(new_story.val()){
        story_number += 1;
        //Add story Link
        $('#new-story').before(
            '<div class="col-xs-12 link-story"><a href="#story-' + story_number + 
            '">'+ story_number + '. '+new_story.val() + '</div>');
        //Add the chart container
        $(".container").append('<h3 id="story-' + story_number + '">'+ story_number + '. ' + new_story.val() + '</h3>');
        
        //Add the textareas
        $(".container").append(
        '<div class="col-xs-6" id="col-left-' + story_number + '">'+
        '<form class="col-xs-12">' + 
        	'<div class="form-group">' +
            '<label for="basic-url">What are possible delieverables for this story?</label>' + 
        	'<div class="input-group">' +
            '<input type="text" id="input-delieverable-' + story_number + '" '+
            'class="form-control" placeholder="Write in your Delieverable (Press Enter)"><span class="input-group-btn"><button class="btn btn-success" type="button">+</button></span></div></div>' +
        '</form>'+
        //End of form
        '<h5 class="col-xs-12">Delieverables List</h5>'+
        '<ul id="deliverable-list-' + story_number + '" class="list-group col-xs-12"></ul>' +
        '</div>' + 
        //Make chart container
        '<div id="chart-' + story_number + '" class="col-xs-6"></div>' +
        '<div class="clearfix"></div>'
        );
        //Make delieverable dictionary entry
        delieverables_list[story_number] = 0;
        $('#input-delieverable-' + story_number).keypress(function(event) {
            if (event.which == 13) {
                event.preventDefault();
                add_deliverables(story_number)
            }
        });
        //Clear the new story value
        new_story.val('');
    }
},
add_deliverables = function(story_number) {
    var new_deliverable = $('#input-delieverable-' + story_number);
    if(new_deliverable.val()){
         delieverables_list[story_number] += 1; 
        $('#deliverable-list-' + story_number).append(
            '<li class="list-group-item">' + 
                new_deliverable.val() +
                '<span class="pull-right"><i class="fa fa-circle circle-' +  delieverables_list[story_number] + '" aria-hidden="true"></i></span>' + 
            '</li>'
        );
        new_deliverable.val('');
        if (delieverables_list[story_number] == 1) {
            $('#col-left-' + story_number).append(
                '<button type="button" class="btn btn-primary" id="btn-make-chart-' + story_number + '">Make Chart</button>'
            );
            $('#btn-make-chart-' + story_number).click( function(){
                chart('title','chart-' + story_number,story_number)
            });
        }
    }
};
$("#new-story input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        delieverables();
    }
});
$('#new-story button').click(delieverables);
chart('test','container');
