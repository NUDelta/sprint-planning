$(function() {
	var w = 500,
		h = 500;

	var colorscale = d3.scale.category10();

	//Legend titles
	var LegendOptions = ['Things You Know','Things You Want To Know'];

	// var claim1 = $("#claim1").val()
	// console.log(claim1)

	//Data
	var claim1Start = 0.29; 
	var claim2Start = 0.24; 
	var claim3Start = 0.36; 
	var claim4Start = 0.35;

	var d = [
			  [
				{axis:"Claim 1",value:claim1Start},
				{axis:"Claim 2",value:claim2Start},
				{axis:"Claim 3",value:claim3Start}
			  ],[
				{axis:"Claim 1",value:claim1Start},
				{axis:"Claim 2",value:claim2Start},
				{axis:"Claim 3",value:claim3Start}
			  ]
			];

	//Options for the Radar chart, other than default
	var mycfg = {
	  w: w,
	  h: h,
	  maxValue: 0.6,
	  levels: 6,
	  ExtraWidthX: 300
	}

	//Call function to draw the Radar chart
	//Will expect that data is in %'s
	RadarChart.draw("#chart", d, mycfg);

	$('.claimSlider').change(function() {
		var claim1 = $("#claim1").val()
		var claim2 = $("#claim2").val()
		var claim3 = $("#claim3").val()
		var newData = [
		  [
			{axis:"Claim 1",value:claim1Start},
			{axis:"Claim 2",value:claim2Start},
			{axis:"Claim 3",value:claim3Start}
		  ],[
			{axis:"Claim 1",value:(claim1Start + (claim1/100))},
			{axis:"Claim 2",value:(claim2Start + (claim2/100))},
			{axis:"Claim 3",value:(claim3Start + (claim3/100))}
		  ]
		];
		RadarChart.draw("#chart", newData, mycfg);
	});


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