'use strict';


var modulo = angular.module('404', []);


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



modulo.controller('ctr404', ['$scope',function($scope){

}]);


module.exports = modulo;

