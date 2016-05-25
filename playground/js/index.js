/*
See http://www.greensock.com/draggable/ for details. 
This demo uses ThrowPropsPlugin which is a membership benefit of Club GreenSock, http://www.greensock.com/club/
*/

var $snap = $("#snap"),
  $liveSnap = $("#liveSnap"),
	$container = $("#container"),
	gridWidth = 196,
	gridHeight = 70,
	gridRows = 7,
	gridColumns = 5,
	num_boxes = 0,
	i, x, y;

//loop through and create the grid (a div for each cell). Feel free to tweak the variables above
for (i = 0; i < gridRows * gridColumns; i++) {
	y = Math.floor(i / gridColumns) * gridHeight;
	x = (i * gridWidth) % (gridColumns * gridWidth);
	if (x == 0) {
		$("<div/>").css({position:"absolute", border:"1px solid #454545", "border-right":"3px solid #454545", width:gridWidth-1, height:gridHeight-1, top:y, left:x}).prependTo($container);
	} else if (x == gridWidth) {
		$("<div/>").css({position:"absolute", border:"1px solid #454545", "border-left":"3px solid #454545", width:gridWidth-1, height:gridHeight-1, top:y, left:x}).prependTo($container);
	} else {
		$("<div/>").css({position:"absolute", border:"1px solid #454545", width:gridWidth-1, height:gridHeight-1, top:y, left:x}).prependTo($container);
	}
}

//set the container's size to match the grid, and ensure that the box widths/heights reflect the variables above
TweenLite.set($container, {height: gridRows * gridHeight + 1, width: gridColumns * gridWidth + 1});
TweenLite.set(".box", {width:gridWidth, height:gridHeight, lineHeight:gridHeight + "px"});

//the update() function is what creates the Draggable according to the options selected (snapping).
function update() {
  var snap = $snap.prop("checked"),
      liveSnap = $liveSnap.prop("checked"),
      b;
    $(".box").each(function(i, obj){
    	console.log($(this).attr("id"));
		b = Draggable.create("#" + $(obj).attr("id"), {
			bounds:$container,
			edgeResistance:0.65,
			type:"x,y",
			throwProps:true,
	    autoScroll:true,
			liveSnap:liveSnap,
			snap:{
				x: function(endValue) {
					return (snap || liveSnap) ? Math.round(endValue / gridWidth) * gridWidth : endValue;
				},
				y: function(endValue) {
					return (snap || liveSnap) ? Math.round(endValue / gridHeight) * gridHeight : endValue;
				}
			},
			onDragEnd: addNewDraggable()
		});
    });
    function addNewDraggable(){
    	console.log(b.x);
    	if(b == 0){
    		$("#container").append(
    			'<div class="box" style="top:' + y + 'px">' +  $("#new-task input").val() + 
    			'</br><span class="text-center"><i class="fa fa-arrow-down" aria-hidden="true"></i></span></div>'
    		);
    		update();
    	}
    }
}


//when the user toggles one of the "snap" modes, make the necessary updates...
$snap.on("change", applySnap);
$liveSnap.on("change", applySnap);

function applySnap() {
	if ($snap.prop("checked") || $liveSnap.prop("checked")) {
		$(".box").each(function(index, element) {
			TweenLite.to(element, 0.5, {
				x:Math.round(element._gsTransform.x / gridWidth) * gridWidth,
				y:Math.round(element._gsTransform.y / gridHeight) * gridHeight,
				delay:0.1,
				ease:Power2.easeInOut
			});
		});
	}
	update();
}
$("#new-task input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        if(num_boxes < gridRows) {
	        $("#container").append(
	        	'<div class="box" id="box-' + num_boxes + '"style="top:' + (gridHeight * num_boxes) + 'px">' +  $("#new-task input").val() + 
	        	'</br><span class="text-center"><i class="fa fa-arrow-down" aria-hidden="true"></i></span></div>'
	        );
	        update();
	        num_boxes += 1;
	    }
	    $("#new-task input").val('');
    }
});
update();

