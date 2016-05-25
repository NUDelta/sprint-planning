var story_number = 0,
    // colors = ['#e67e22','#3498db','#9b59b6','#f1c40f','#27ae60','#e74c3c','#95a5a6',"#2c3e50"],
    // data = [[0.5, 0.5, 7],
    //         [0.75, 0.25, 7],
    //         [-0.25, 0.25, 7],
    //         [-0.5, 0.5, 7],
    //         [0.75, -0.25, 7],
    //         [-0.25, -0.25, 7],
    //         [-0.25, -0.75, 7]],
    data = [],
    delieverables_list = [],
    typeList = ["lo-fi", "medium-fi", "hi-fi"],
    chart = function(){
       
        // console.log(new_data);
        var current_chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart',
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
                    text: 'Realistic'
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
                    text: 'Value-Delivering'
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
                    }

            // series: [{
            //     type: 'bubble',
            //     cursor: 'move',
            //     draggableX: true,
            //     draggableY: true,
            //     data: []
            // }]


        });
        var sumDeliverables = delieverables_list.reduce(function(a,b) {return a+b});
        for(var i = 0; i < sumDeliverables; i++ ){
            var currentType = typeList[i%3]

            console.log(data[i])
            var color;
            if(data[i].name[0] == "L") {
                color = "orange"
            }
            else if (data[i].name[0] == "M"){
                color = "blue"
            }
            else {
                color = "red"
            }

            current_chart.addSeries({  
                name: i,                      
                type: 'bubble',
                cursor: 'move',
                draggableX: true,
                draggableY: true,
                data: [data[i]],
                color: color
            });       
        }
        current_chart.redraw();
        
},
delieverables = function(){
    var new_story = $('#new-story input');
    if(new_story.val()){
        story_number += 1;

        // //Add story Link
        // $('#new-story').before(
        //     '<div class="col-xs-12 link-story"><a href="#story-' + story_number + 
        //     '">'+ story_number + '. '+new_story.val() + '</div>');

        //Add the chart container
        // $(".container").append('<h3 id="story-' + story_number + '">'+ story_number + '. ' + new_story.val() + '</h3>');
        
        //Add the textareas
        $("#stories-col").append(
            '<div class="row" id="col-left-' + story_number + '">' +  
            '<h3 id="story-' + story_number + '">'+ story_number + '. ' + new_story.val() + '</h3>' +
            '<form class="col-xs-12">' + 
            	'<div class="form-group">' +
                '<h5 id="input-header-' + story_number +'">What is your <span id="type-'+ story_number + '" class="lo-fi">lo-fi</span> delieverable for this story?</h5>' + 
            	'<div class="input-group">' +
                '<span class="input-group-addon" id="option-name-' + story_number +'">L'+ story_number +'</span>' +
                '<input type="text" id="input-delieverable-' + story_number + '" '+
                'class="form-control delieverable-input" placeholder="Write in your Delieverable (Press Enter)"><span class="input-group-btn"><button class="btn btn-success" type="button">+</button></span></div></div>' +
            '</form>'+
            //End of form
            '<h5 class="col-xs-12">Delieverables List</h5>'+
            '<ul id="deliverable-list-' + story_number + '" class="list-group col-xs-12 ul-delieverables"></ul>' +
            '</div>'
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
    console.log("Story Number: " + story_number)
    var new_deliverable = $('#input-delieverable-' + story_number);
    if(new_deliverable.val()){
        //Get the name for the dot
        var currentType = typeList[(delieverables_list[story_number])]
        var name = currentType[0].toUpperCase() + story_number

        $('#deliverable-list-' + story_number).append(
            '<li class="list-group-item">' + 
                name + '. ' + 
                new_deliverable.val() +
                '<span class="pull-right"><i class="fa fa-circle circle-' +  currentType + '" aria-hidden="true"></i></span>' + 
            '</li>'
        );

        //Add Option to Data List
        var newOption = {
            name: name,
            z: 7,
            x: getRandomInclusive(0.1, 0.9),
            y: getRandomInclusive(0.1, 0.9) 
        }
        data.push(newOption);

        var currentNum = delieverables_list[story_number]
        if((currentNum+1) != 3) {
             //Change the type in the input header text
            var nextType = typeList[(delieverables_list[story_number]+1)]
            $("#type-" + story_number).removeClass().addClass(nextType)
            $("#type-" + story_number).text(nextType);

            //Change the input group addon text
            var newName = nextType[0].toUpperCase() + story_number
            $("#option-name-" + story_number).text(newName)

            //Clear Input Box
            new_deliverable.val('');
        }
        else {
            //Stop the user from entering more in this story
            new_deliverable.prop("disabled", true);
            $("#input-header-" + story_number).text("All done! Move on to the next story.")

            // $('#col-left-' + story_number).append(
            //     '<button type="button" class="btn btn-primary btn-chart" id="btn-make-chart-' + story_number + '">Make Evaluation Chart</button>'
            // );
            // $('#col-left-' + story_number).append(

            //     '<form class="col-xs-12"><div class="form-group">' +
            //         '<label for="Why">Which delieverable(s) did you choose and why?</label>' + 
            //         '<textarea class="form-control" placeholder=""></textarea></div></form>'
            // );
            // $('#btn-make-chart-' + story_number).click( function(){
            //     chart('title','chart-' + story_number,story_number)
            // });
        }

        delieverables_list[story_number] += 1;
    }
    

};

 $('#done').click( function() {
    chart()
});

$("#new-story input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        delieverables();
    }
});
$('#new-story button').click(delieverables);

function getRandomInclusive(min, max) {
  return parseFloat(((Math.random() * (max - min)) + min).toFixed(2));
}
