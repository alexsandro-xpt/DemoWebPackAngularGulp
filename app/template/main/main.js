'use strict';

/*
var aaa = require.ensure([], function() {
	require('./../../js/directive/date/date');
	var modulo = angular.module('main', ['ui.alex']);
	modulo.controller('ctrMain', ['$scope',function($scope){
		$scope.titulo = "usando gulp, angular 1.4.x com webpack!";
	}])
	
	return modulo;
});

module.exports = aaa;

*/

var modulo = angular.module('main', [require('./../../js/directive/date/date').name]);


modulo.controller('ctrMain', ['$scope', '$ocLazyLoad', '$injector', function($scope, $ocLazyLoad, $injector){
	$scope.titulo = "usando gulp, angular 1.4.x com webpack!";

}]);

module.exports = modulo;



