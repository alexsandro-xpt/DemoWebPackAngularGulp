'use strict';
var app = angular.module('app', ['ui.router', 'ngResource', 'oc.lazyLoad']);


app.config(['$urlRouterProvider','$stateProvider','$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider','$provide', function($urlRouterProvider, $stateProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
		
	$urlRouterProvider.otherwise('/404');

	$stateProvider
	.state('/', {
		url: '/',
        templateProvider: function($q) {
			return $q(function(resolve) {
				// lazy load the view
				require.ensure([], function() {
					resolve(require('../template/main/main.html'));
				});
			});
        },
		controller: 'ctrMain',
		resolve: {
			load: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
				return $q(function(resolve) {
					require.ensure([], function() {
						// load whole module
						var modulo = require('../template/main/main');
						$ocLazyLoad.load({name: modulo.name/*'main'*/});
						resolve(modulo.controller);
					});
				});
			}]
		}
	}).state('404', {
		url: '/404',
        templateProvider: function($q) {
			return $q(function(resolve) {
				// lazy load the view
				require.ensure([], function() {
					resolve(require('../template/404/404.html'));
				});
			});
        },
		controller: 'ctr404',
		resolve: {
			load: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
				return $q(function(resolve) {
					require.ensure([], function() {
						// load whole module
						var modulo = require('../template/404/404');
						$ocLazyLoad.load({name: modulo.name});
						resolve(modulo.controller);
					});
				});
			}]
		}
	});
	

	
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
	
	//store a reference to various provider functions
	/*window.app.components = {
		controller: $controllerProvider.register
		,service: $provide.service
	};*/

}]); 

app.controller('ctrApp', ['$scope', /*'$route', '$routeParams',*/ '$location', function ($scope, /*$route, $routeParams,*/ $location) {
     //$scope.$route = $route;
     $scope.$location = $location;
     //$scope.$routeParams = $routeParams;
}]);





module.exports = app;