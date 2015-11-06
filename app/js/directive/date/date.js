'use strict';

var modulo = angular.module('ui.alex',[]);

modulo.directive('data',[function(){
	return {
        restrict: 'E',
        replace: true,
        template: '<span>{{datahora}}</span>',
        //templateUrl: templatePath + 'upload.html',
        scope: {
            ngModel: '=',
        },
        link: function (scope, element, attrs) {

			scope.datahora = new Date();

        }
    };
}]);









module.exports = modulo;