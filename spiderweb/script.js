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
        name: 'Option 1',
        data: [],
        pointPlacement: 'on'
    }]
}

var claimCount = 0;
var claimStart = 10
var watchArray = []
var valsArray = []
var startArray = []
var claimNames = []
var tabData = [{
		"data": []
	},
	{
		"data": []
	},
	{
		"data": []
	},
	{
		"data": []
}];



function appendTabClaims(tabNum, claimNum, name) {
	console.log(name)
	var item = '<li class="collection-item">' +
	    '<p class="claim">Claim ' + claimNum + ': ' + name + '</p>' +
	    '<p>Increase by {{ (tab' + tabNum + 'claim' + claimNum + 'Val) || 0}} points</p>' +
	    '<md-slider flex="" md-discrete="" ng-model="tab' + tabNum + 'claim' + claimNum + 'Val" class="claimSlider" id="claim' + claimNum + '" step="1" min="0" max="10" aria-label="rating">'+
      	'</md-slider>'+
      	'</li>'

	    $('.collection').append(item)
	    $(".claimInput").val('');
}

var app = angular.module('spiderweb', ['ngMaterial']);
app.controller('MyCntrl', function($scope, $compile) {
	
	$scope.addClaim = function () {
	  
		var newClaim = $(".claimInput").val()
		insertClaim(newClaim)

		function insertClaim(newClaim) {
			if(claimCount == 0) {
				$('#chart').show()
				$('#message').hide()
			}
			claimCount++;

			//Add the claim's name to the list of names
			claimNames.push(newClaim);

			addClaimVal(claimCount)

		}

	  	$(".tab").click(function() {
			var tab = $(this).attr('id');
			var tabNum = tab.match(/\d+/)[0];
			loadTab(tabNum)
		})

		function loadTab(tabNum) {
			var tabDataArr = tabData[tabNum-1].data;
			$('.collection').empty();
			for (var i = 0; i < tabDataArr.length; i++) {
				appendTabClaims(tabNum, (i+1), claimNames[i])
				watchArray.push("tab" + tabNum + "claim" + (i+1) + "Val");
			}

			// valsArray.push(0);
		    startArray.push(claimStart);
		    var claimFlag = false;
		    updateChartData(claimCount, valsArray, claimFlag)
			watchAll()
		}

	  function addClaimVal(claimCount) {
	    //Add a value to each of the tab arrays
	    for (var i = 0; i < tabData.length; i++) {
	    	//Add a new claim to each tab object
	    	tabData[i].data.push(0)	
	    }

	    var tabNum = $("a.active").parent().attr('id').match(/\d+/)[0];
	    loadTab(tabNum)

	    console.log(tabData)

	    // valsArray.push(0);
	    // startArray.push(claimStart);
	    // var claimFlag = true;
	    // updateChartData(claimCount, valsArray, claimFlag)

	    watchAll()

	  }

	  function watchAll() {
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

	    console.log("Series Length: " + chartOptions.series.length + ". Vals Length: " + valsArray.length)
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
	    var claimFlag = false;
	    updateChartData(claimCount, valsArray, claimFlag)
	  }

	}
});
