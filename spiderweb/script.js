var chartOptions = { 
	chart: {
		renderTo: 'chart',
        polar: true,
        type: 'line'
    },

    title: {
        text: 'Sprint Progress On Claims',
        x: -80
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
        name: "Work You've Done So Far",
        data: [],
        pointPlacement: 'on'
    },
    {
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
var startArray = []

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
	    startArray.push(claimStart);
	    var claimFlag = true;
	    updateChartData(claimCount, valsArray, claimFlag)

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

			    captureChange(valsArray[idx], claimCount) 
			    $scope.total = valsArray.reduce((a, b) => a + b, 0);
			}
		    
		});
	  }

	  function updateChartData(claimCount, valsArray, claimFlag) {
	  	//Update the data in the charts
	 	if(claimFlag) {
	 		console.log("Added a new claim")
		    var newChartOptions = chartOptions.xAxis.categories.concat(['Claim ' + claimCount]);
		    chartOptions.xAxis.categories = newChartOptions;
		}

	    console.log("Series Length: " + chartOptions.series.length + " .Vals Length: " + valsArray.length)
	    //Iterate through series data and add the new point
	    for (var i = 0; i < chartOptions.series.length; i++) {
	    	if (i == 0) {
	    		var newChartData = startArray
	    		chartOptions.series[i].data = newChartData;
	    	}
	    	else {
	    		var newChartData = valsArray.map(function(x) { return((x+claimStart));});
	    		chartOptions.series[i].data = newChartData;
	    	}
	    }  

	    //Reset the graph
	    resetGraph()
	  }

	  function resetGraph() {
	  	if(claimCount > 1) {
			$('#chart').highcharts().destroy();
		}
	    var chart = new Highcharts.Chart(chartOptions)
	  }

	  function captureChange(claimVal, claimCount) {
	    var newVal = claimVal
	    console.log(chartOptions)
	    // for (var i = 0; i < newProgress.length; i++) {
	    //   if( newProgress[i]["axis"].indexOf(claimCount) != -1 ) {
	    //     newProgress[i]["value"] = oldProgress[i]["value"] + newVal;
	    //   }
	    // }
	    var claimFlag = false;
	    updateChartData(claimCount, valsArray, claimFlag)
	  }

	  var newClaim = $(".claimInput").val()
	  insertClaim(newClaim)

	}
});
