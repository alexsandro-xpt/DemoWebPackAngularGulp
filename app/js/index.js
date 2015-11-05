'use strict';

require("angular");
require("angular-route");
require("angular-resource");


var app = angular.module('app', ['ngRoute', 'ngResource']);


app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
	
	$routeProvider
	.when('/', {
		templateUrl: '/template/main.html',
		controller: 'ctrIndex'
	})
	.when('/404', {
		templateUrl: '/template/404.html'
	})
	.otherwise({
		redirectTo: '/404'
	});
	
	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
}]); 

app.controller('ctrApp', ['$scope', '$route', '$routeParams', '$location', function ($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
}]);

app.controller('ctrIndex', ['$scope',function($scope){
	$scope.titulo = "ao estudo de caso usando gulp, angular 1.4.x com webpack!";
}]);