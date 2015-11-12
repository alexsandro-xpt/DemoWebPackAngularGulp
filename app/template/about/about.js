'use strict';


var modulo = angular.module('about', []);


modulo.run(['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
	return $q(function(resolve) {
		require.ensure([], function() {
			// load whole module
			var modulo = require('./../../assets/js/directive/date/date');
			$ocLazyLoad.load({name: modulo.name});
			resolve(modulo.directive);
		});
	});
}]);



modulo.controller('ctrAbout', ['$scope',function($scope){

}]);


module.exports = modulo;
