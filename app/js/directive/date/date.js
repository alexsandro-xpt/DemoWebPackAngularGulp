'use strict';

require('../ui.alex');

var modulo = angular.module(require('../ui.alex').name);

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