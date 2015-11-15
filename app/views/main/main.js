'use strict';


var modulo = angular.module('main', []);


modulo.run(['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
	return $q(function(resolve) {

		require.ensure([], function() {
			var modulo = require('./../../assets/js/directive/topTrends/topTrends');
			$ocLazyLoad.load({name: modulo.name});
			resolve(modulo.directive);
			
			var modulo1 = require('./../../assets/js/directive/date/date');
			$ocLazyLoad.load({name: modulo1.name});
			resolve(modulo1.directive);
		});
		/*
		require.ensure([], function() {

		});*/

	});
}]);




modulo.controller('ctrMain', ['$scope', '$ocLazyLoad', '$injector', function($scope, $ocLazyLoad, $injector){
	$scope.titulo = "usando gulp, angular 1.4.x com webpack!";
}]);


module.exports = modulo;