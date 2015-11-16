//Compila para appbundle.js

'use strict';

require("angular-sanitize");
require("angular-ui-router");
require("oclazyload");
require("angular-resource");



var jq = require('jquery');
var dx = require("DevExpress");


//Faz com que o css seja carregado de forma assíncrona.
require.ensure([], function() {
	require("../vendors/css/main.css");
});


var app = angular.module('app', ['ui.router', 'ngResource', 'oc.lazyLoad', 'ngSanitize', require('./app.rotas').name]);


app.config(['$urlRouterProvider','$stateProvider','$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider','$provide', 'rotas', function($urlRouterProvider, $stateProvider
, $locationProvider, $controllerProvider, $compileProvider
, $filterProvider, $provide, rotas) {


	
	for(var i=0, t = rotas.length; i < t; i++){
		$stateProvider.state.apply(this, rotas[i]);
	}


	$urlRouterProvider.otherwise('/404');

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