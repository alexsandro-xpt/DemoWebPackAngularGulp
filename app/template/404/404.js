'use strict';


require([], function() {
  require('./../../js/directive/date/date');
});

var modulo = angular.module('404', ['ui.alex']);
//var modulo = angular.module('404', [require('./../../js/directive/date/date').name]);


modulo.controller('ctr404', ['$scope',function($scope){

}]);


module.exports = modulo;


/*
module.exports = angular.controller('ctrMain', ['$scope',function($scope){
	$scope.titulo = "ao estudo de caso usando gulp, angular 1.4.x com webpack!";
}]);
*/