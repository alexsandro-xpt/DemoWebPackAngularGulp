'use strict';


var modulo = angular.module(require('../ui.alex').name);


modulo.directive('dxGrid',[function($http){
	return {
        restrict: 'A',
        replace: true,
        //templateUrl: templatePath + 'upload.html',
        scope: {
            ngModel: '=',
        },
        link: function (scope, element, attrs) {
            
            scope.ngModel = new Date(2004,7,25,10,45,0,0);

            var options = angular.extend({
                onValueChanged: function(data) {
                    scope.$apply(function() {
                        console.log(data);
                        scope.ngModel=data.value;
                    });
                },
                value: scope.ngModel
            }, scope.$eval(attrs.dxGrid));
            //var options = JSON.parse(attrs.dxGrid);
            /*
            options.onValueChanged = function(data) {
                scope.$apply(function() {
                    console.log(data);
                    scope.ngModel=data.value;
                });
            };*/

			$(element).dxDateBox(options);

        }
    };
}]);









module.exports = modulo;