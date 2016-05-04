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
     plotOptions: {
	    series: {
	        animation: false
	    }
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
    },
    {
        name: 'Option 2',
        data: [],
        pointPlacement: 'on'
    },
    {
        name: 'Option 3',
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
			var tabDataArr = chartOptions.series[tabNum].data;
			
			//Remove all sliders from other tabs
			$('.collection').empty();

			//Remove all watched values
			watchArray = []

			for (var i = 0; i < tabDataArr.length; i++) {
				appendTabClaims(tabNum, (i+1), claimNames[i])

				var newTab = "tab" + tabNum + "claim" + (i+1) + "Val";
				if(watchArray.indexOf(newTab) == -1) {
					watchArray.push("tab" + tabNum + "claim" + (i+1) + "Val");
				}
			}
			watchAll()
		}

	  function addClaimVal(claimCount) {
	    //Add category
	    var newChartOptions = chartOptions.xAxis.categories.concat(['Claim ' + claimCount]);
	    chartOptions.xAxis.categories = newChartOptions;
   		
   		//Add a new value to account for the new category to all series data
   		for (var i = 0; i < chartOptions.series.length; i++) {
	    	chartOptions.series[i].data.push(claimStart)
	    }  

	    //Get Current Tab Number
	    var tabNum = $("a.active").parent().attr('id').match(/\d+/)[0];

	    //Load the tab
	    loadTab(tabNum)

	    //Refresh the graph
	    resetGraph()

	  }

	  function watchAll() {
		    var claims = (angular.element(document.getElementsByClassName('collection')));
		    $compile(claims)($scope);

		    $scope.$watchGroup(watchArray, function(newVals, oldVals) {
	    		//Get Current Tab Number
	   			var tabNum = $("a.active").parent().attr('id').match(/\d+/)[0];

	   			//Replace undefines with zeros
	   			newVals = newVals.map(function(x) { 
	   				if(typeof(x) == "undefined") {
	   					return(0)
	   				}
	   				else {
	   					return(x)
	   				}
	   			});


	    		var dataVals = chartOptions.series[tabNum].data;
	    		
	    		console.log(watchArray)
	    		console.log(newVals);

	    		idx = newVals.length-1;
		    	if(newVals.length == dataVals.length) {
		    		dataVals = newVals.map(function(x) { return((x+claimStart));});;
		    	}
		    	else {
		    		dataVals[idx] = newVals[idx] + claimStart
		    	}
		    	chartOptions.series[tabNum].data = dataVals;
		    	console.log(chartOptions.series[tabNum].data)
		    	resetGraph();

			    $scope.total = dataVals.reduce((a, b) => a + b, 0);
			    
			});
		}


	  function resetGraph() {
	  	if(claimCount > 1) {
			$('#chart').highcharts().destroy();
		}
	    var chart = new Highcharts.Chart(chartOptions)
	  }

	}
});
