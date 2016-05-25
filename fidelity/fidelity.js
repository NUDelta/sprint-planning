var story_number = 0,
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
    typeList = ["lo-fi", "medium-fi", "hi-fi"],
    chart = function(title,renderLocation,story_number){
       
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
        for(var i = 0; i < delieverables_list[story_number]; i += 1){
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
            '<h5 id="input-header">What is your <span id="type" class="lo-fi">lo-fi</span> delieverable for this story?</h5>' + 
        	'<div class="input-group">' +
            '<span class="input-group-addon" id="option-name">L'+ story_number +'</span>' +
            '<input type="text" id="input-delieverable-' + story_number + '" '+
            'class="form-control delieverable-input" placeholder="Write in your Delieverable (Press Enter)"><span class="input-group-btn"><button class="btn btn-success" type="button">+</button></span></div></div>' +
        '</form>'+
        //End of form
        '<h5 class="col-xs-12">Delieverables List</h5>'+
        '<ul id="deliverable-list-' + story_number + '" class="list-group col-xs-12 ul-delieverables"></ul>' +
        '</div>' + 
        //Make chart container
        '<div id="chart-' + story_number + '" class="col-xs-6"></div>' +
        '<div class="clearfix"></div>'
        );
        //Make delieverable dictionary entry
        delieverables_list[story_number] = 0;
        $('.delieverable-input').keypress(function(event) {
            if (event.which == 13) {
                event.preventDefault();
                var id = $(this).attr('id');
                add_deliverables(id.substring(id.length - 1, id.length));
            }
        });
        //Clear the new story value
        new_story.val('');
    }
},
add_deliverables = function(story_number) {
    console.log(delieverables_list[story_number])
    var new_deliverable = $('#input-delieverable-' + story_number);
    if(new_deliverable.val()){
        $('#deliverable-list-' + story_number).append(
            '<li class="list-group-item">' + 
                (delieverables_list[story_number]+1) + '. ' + 
                new_deliverable.val() +
                '<span class="pull-right"><i class="fa fa-circle circle-' +  (delieverables_list[story_number]+1) + '" aria-hidden="true"></i></span>' + 
            '</li>'
        );

        //Clear Input Box
        new_deliverable.val('');

        if((delieverables_list[story_number]+1) != 3) {
            //Change the type in the input header text
            var currentType = typeList[(delieverables_list[story_number]+1)]
            $("#type").removeClass().addClass(currentType)
            $("#type").text(currentType);

            //Change the input group addon text
            $("#option-name").text(currentType[0].toUpperCase() + story_number)
        }
        else {
            //Stop the user from entering more in this story
            new_deliverable.prop("disabled", true);
            $("#input-header").text("All done! Move on to the next story.")

            //Determine if the Make Chart Button and Add It
            $('#col-left-' + story_number).append(
                '<button type="button" class="btn btn-primary btn-chart" id="btn-make-chart-' + story_number + '">Make Evaluation Chart</button>'
            );
            $('#col-left-' + story_number).append(

                '<form class="col-xs-12"><div class="form-group">' +
                    '<label for="Why">Which delieverable(s) did you choose and why?</label>' + 
                    '<textarea class="form-control" placeholder=""></textarea></div></form>'
            );
            $('#btn-make-chart-' + story_number).click( function(){
                chart('title','chart-' + story_number,story_number)
            });
        }

        delieverables_list[story_number] += 1;
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