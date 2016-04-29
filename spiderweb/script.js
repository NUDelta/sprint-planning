var w = 500,
h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Things You Know','Things You Want To Know'];

//Options for the Radar chart, other than default
var mycfg = {
w: w,
h: h,
maxValue: 0.6,
levels: 6,
ExtraWidthX: 300
}

// //Call function to draw the Radar chart
// //Will expect that data is in %'s
// RadarChart.draw("#chart", d, mycfg);

var claimCount = 0;
var claimStart = 10
var oldProgress = []
var newProgress = []
var watchArray = []
var valsArray = []

var app = angular.module('spiderweb', ['ngMaterial']);
app.controller('MyCntrl', function($scope, $compile) {
	
	$scope.addClaim = function () {
	  
	  function insertClaim(newClaim) {
	    if(claimCount == 0) {
	      $('#chart').show()
	      $('#message').hide()
	    }
	    claimCount++;

	    var item = '<li class="collection-item">' +
	    '<p class="claim">Claim ' + claimCount + ': ' + newClaim + '</p>' +
	    '<p>Increase by {{ (claim' + claimCount + 'Val) || 0}} points</p>' +
	    '<md-slider flex="" md-discrete="" ng-model="claim' + claimCount + 'Val" class="claimSlider" id="claim' + claimCount + '" step="1" min="0" max="10" aria-label="rating">'+
      	'</md-slider>'+
      	'</li>'

	    $('.collection').append(item)
	    $(".claimInput").val('');

	    addClaimVal(claimCount)
	  }

	  function addClaimVal(claimCount) {
	    oldProgress.push({axis:"Claim " + claimCount, value:claimStart});
	    newProgress.push({axis:"Claim " + claimCount, value:claimStart});
	    watchArray.push("claim" + claimCount + "Val");
	    valsArray.push(0);
	    resetGraph()
	    var claims = (angular.element(document.getElementsByClassName('collection')));
	    $compile(claims)($scope);
	    $scope.$watchGroup(watchArray, function(newVals, oldVals) {
    		console.log(valsArray) 
    		idx = newVals.length-1;
    		if(newVals[idx]) {
		    	if(newVals.length == valsArray.length) {
		    		valsArray = newVals;
		    	}
		    	else {
		    		
		    		valsArray[idx] = newVals[idx]
		    	}
		    	// if(newVal[watchArray.length-1]) {
			    captureChange(valsArray[idx], claimCount) 
			    
			    $scope.total = valsArray.reduce((a, b) => a + b, 0);
			    // }
			}
		    
		});
	  }

	  function resetGraph() {
	    updatedData = [oldProgress, newProgress]
	    RadarChart.draw("#chart", updatedData, mycfg);
	  }

	  function captureChange(claimVal, claimCount) {
	    // var sliderID = $(event.target).attr('id');
	    var newVal = claimVal
	    //....
	    for (var i = 0; i < newProgress.length; i++) {
	      if( newProgress[i]["axis"].indexOf(claimCount) != -1 ) {
	        newProgress[i]["value"] = oldProgress[i]["value"] + newVal;
	      }
	      // newProgress[i]["value"] = claimStart
	    }
	    resetGraph()
	  }
	  var newClaim = $(".claimInput").val()
	  insertClaim(newClaim)


	}
});

$(function() {
	////////////////////////////////////////////
	/////////// Initiate legend ////////////////
	////////////////////////////////////////////

	var svg = d3.select('#body')
		.selectAll('svg')
		.append('svg')
		.attr("width", w+300)
		.attr("height", h)

	//Create the title for the legend
	var text = svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)') 
		.attr("x", w - 70)
		.attr("y", 10)
		.attr("font-size", "12px")
		.attr("fill", "#404040")
		.text("What % of owners use a specific service in a week");
			
	//Initiate Legend	
	var legend = svg.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(90,20)') 
		;
		//Create colour squares
		legend.selectAll('rect')
		  .data(LegendOptions)
		  .enter()
		  .append("rect")
		  .attr("x", w - 65)
		  .attr("y", function(d, i){ return i * 20;})
		  .attr("width", 10)
		  .attr("height", 10)
		  .style("fill", function(d, i){ return colorscale(i);})
		  ;
		//Create text next to squares
		legend.selectAll('text')
		  .data(LegendOptions)
		  .enter()
		  .append("text")
		  .attr("x", w - 52)
		  .attr("y", function(d, i){ return i * 20 + 9;})
		  .attr("font-size", "11px")
		  .attr("fill", "#737373")
		  .text(function(d) { return d; })
		  ;	
});