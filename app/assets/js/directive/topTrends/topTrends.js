'use strict';


var modulo = angular.module(require('../ui.alex').name);

modulo.directive('topTrends',['$http', function($http){
	return {
        restrict: 'E',
        replace: true,
        template: '<ul><li ng-repeat="item in itens">{{item.fname}} {{item.lname}}</li></ul>',
        //templateUrl: templatePath + 'upload.html',
        scope: {
            ngModel: '=',
        },
        link: function (scope, element, attrs) {

			$http.
            get('http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&tel={phone|format}&address={streetAddress}&city={city}&state={usState|abbr}&cep={zip}').
            success(function(data, status, headers, config) {
                scope.itens = data;
            }).
            error(function(data, status, headers, config) {
                console.log("Error");
            });

        }
    };
}]);









module.exports = modulo;