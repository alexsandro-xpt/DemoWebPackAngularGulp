var main = angular.module('main', []);


main.controller('ctrMain', ['$scope',function($scope){
	$scope.titulo = "usando gulp, angular 1.4.x com webpack!";
}])


module.exports = main;


/*
module.exports = angular.controller('ctrMain', ['$scope',function($scope){
	$scope.titulo = "ao estudo de caso usando gulp, angular 1.4.x com webpack!";
}]);
*/