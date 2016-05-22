var gridster;

$(function() {
  gridtster = $(".gridster > ul").gridster({
      widget_margins: [10, 10],
      widget_base_dimensions: [140, 140],
      min_cols: 6
  }).data('gridster');
});
// $(function(){ //DOM Ready

//    var gridster = $(".gridster ul").gridster().data('gridster');

// });
// // gridster.add_widget('<li class="new">The HTML of the widget...</li>', 2, 1);
