var chartOptions = { 
	chart: {
		renderTo: 'chart',
        polar: true,
        type: 'line'
    },

    title: {
        text: 'Budget vs spending',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: [],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
    },

    series: [{
        name: 'Alternative 1',
        data: [],
        pointPlacement: 'on'
    }]
}

var claimCount = 0;
var claimStart = 10
var oldProgress = []
var newProgress = []
var watchArray = []
var valsArray = []

// var w = 500,
// h = 500;

// var colorscale = d3.scale.category10();

// //Legend titles
// var LegendOptions = ['Things You Know','Things You Want To Know'];

// //Options for the Radar chart, other than default
// var mycfg = {
// w: w,
// h: h,
// maxValue: 0.6,
// levels: 6,
// ExtraWidthX: 300
// }

// // //Call function to draw the Radar chart
// // //Will expect that data is in %'s
// // RadarChart.draw("#chart", d, mycfg);


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
	    // oldProgress.push({axis:"Claim " + claimCount, value:claimStart});
	    // newProgress.push({axis:"Claim " + claimCount, value:claimStart});
	    // watchArray.push("claim" + claimCount + "Val");
	    // valsArray.push(0);
	    var newChartOptions = chartOptions.xAxis.categories.concat(['Claim' + claimCount]);
	    var newChartData = chartOptions.series[0].data.concat([0]);
	    chartOptions.xAxis.categories = newChartOptions;
	    chartOptions.series[0].data = newChartData;
	    resetGraph()
	 //    var claims = (angular.element(document.getElementsByClassName('collection')));
	 //    $compile(claims)($scope);

	 //    var chart = new Highcharts.Chart(chartOptions)

	 //    $scope.$watchGroup(watchArray, function(newVals, oldVals) {
  //   		console.log(valsArray) 
  //   		idx = newVals.length-1;
  //   		if(newVals[idx]) {
		//     	if(newVals.length == valsArray.length) {
		//     		valsArray = newVals;
		//     	}
		//     	else {
		    		
		//     		valsArray[idx] = newVals[idx]
		//     	}
		//     	// if(newVal[watchArray.length-1]) {
		// 	    captureChange(valsArray[idx], claimCount) 
			    
		// 	    $scope.total = valsArray.reduce((a, b) => a + b, 0);
		// 	    // }
		// 	}
		    
		// });
	  }

	  function resetGraph() {
	  	if(claimCount > 1) {
			$('#chart').highcharts().destroy();
		}
	    var chart = new Highcharts.Chart(chartOptions)
	  }

	  // function captureChange(claimVal, claimCount) {
	  //   // var sliderID = $(event.target).attr('id');
	  //   var newVal = claimVal
	  //   //....
	  //   for (var i = 0; i < newProgress.length; i++) {
	  //     if( newProgress[i]["axis"].indexOf(claimCount) != -1 ) {
	  //       newProgress[i]["value"] = oldProgress[i]["value"] + newVal;
	  //     }
	  //     // newProgress[i]["value"] = claimStart
	  //   }
	  //   resetGraph()
	  // }

	  var newClaim = $(".claimInput").val()
	  insertClaim(newClaim)

	}
});
