'use strict';

require("angular-sanitize");
require("angular-ui-router");
require("oclazyload");
require("angular-resource");
var jq = require('jquery');/*
require("../vendors/css/dx.common.css");
require("../vendors/css/dx.light.css");*/
require("../vendors/css/main.css");
var dx = require("DevExpress");


var app = angular.module('app', ['ui.router', 'ngResource', 'oc.lazyLoad', 'ngSanitize', require('./app.rotas').name]);


app.config(['$urlRouterProvider','$stateProvider','$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider','$provide', 'rotas', function($urlRouterProvider, $stateProvider
, $locationProvider, $controllerProvider, $compileProvider
, $filterProvider, $provide, rotas) {


	$urlRouterProvider.otherwise('/404');
	
	for(var i=0, t = rotas.length; i < t; i++){
		$stateProvider.state.apply(this, rotas[i]);
	}


	/*$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});*/

}]); 

app.controller('ctrApp', ['$scope', /*'$route', '$routeParams',*/ '$location', function ($scope, /*$route, $routeParams,*/ $location) {
     //$scope.$route = $route;
     $scope.$location = $location;
     //$scope.$routeParams = $routeParams;
}]);


app.factory('dx', function(){
	return dx;//window.DevExpress;
})




module.exports = app;