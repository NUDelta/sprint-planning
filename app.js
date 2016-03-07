var app = angular.module('miniapp', []);

app.filter('ceil', function() {
  return function(input) {
    return Math.ceil(input);
  };
});

function Ctrl($scope) {
	
	$scope.Math = window.Math;
}