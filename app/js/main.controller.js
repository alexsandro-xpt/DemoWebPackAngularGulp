var app = angular.module('app', ['ngRoute', 'ngResource']);


app.config(['$routeProvider','$locationProvider',
    '$controllerProvider',
    '$compileProvider',
    '$filterProvider',
    '$provide', function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
	
	$routeProvider
	.when('/', {
		templateUrl: '/template/main/main.html',
		controller: 'ctrMain'/*,
		resolve: {
			load: ['$q', '$rootScope', function ($q, $rootScope) {

				var deferred = $q.defer();

				// lazy load controllers, etc.
				require ([
					'main.controller.js'
				], function () {

					$rootScope.$apply(function () {
						deferred.resolve();
					});

				});

				return deferred.promise;
			}]
		}*/
	})
	.when('/404', {
		templateUrl: '/template/404/404.html'
	})
	.otherwise({
		redirectTo: '/404'
	});
	
	// configure html5 to get links working on jsfiddle
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

app.controller('ctrApp', ['$scope', '$route', '$routeParams', '$location', function ($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
}]);


app.controller('ctrMain', ['$scope',function($scope){
	$scope.titulo = "ao estudo de caso usando gulp, angular 1.4.x com webpack!";
}]);



module.exports = app;