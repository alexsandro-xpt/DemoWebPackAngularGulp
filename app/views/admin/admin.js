'use strict';


require("./DesktopLayout.js");



var modulo = angular.module('admin', ['dx']);

modulo.controller('ctrAdmin', ['$scope','$http', '$q', 'dx', function($scope, $http, $q, dx){

        /*
        $http.get('http://www.filltext.com/?delay=3&rows=40&author={firstName}&title={lastName}&cep={phone|format}&genre={streetAddress}&format={city}&language={usState|abbr}&year={zip}').
        success(function(data, status, headers, config) {

        }).
        error(function(data, status, headers, config) {
                console.log("Error");
        });*/
        
       
        //http://js.devexpress.com/Documentation/ApiReference/Data_Layer/DataSource/Methods/?version=15_1
        //https://www.devexpress.com/Support/Center/Question/Details/T119195
        //http://js.devexpress.com/Documentation/Guide/UI_Widgets/Data_Grid/Data_Binding/?version=14_1#Provide_Data
        
        $scope.gridConfig = {
                dataSource: {
                        load: function(loadOptions){
                                //console.log('load', loadOptions);
                                var a = $q.defer();
                                $http.get('http://www.filltext.com/?rows=10&author={firstName}&title={lastName}&cep={phone|format}&genre={streetAddress}&format={city}&language={usState|abbr}&year={zip}')
                                .success(function(data){
                                        a.resolve(data);
                                }).error(function (err) {
                                        //http://js.devexpress.com/Demos/WidgetsGallery/#demo/dialogs_and_notifications-toast-overview
                                        dx.ui.notify("Grid erro: " + err, "error", 2000);
                                        console.error("Grid erro: ", err);
                                });;
                                return a.promise;
                        },
                        totalCount: function (loadOptions) {
                                //console.log('totalCount', loadOptions);
                                var def = $q.defer();
                                //Isto define a paginação.
                                def.resolve(40);
                                /*$http.get('')
                                .success(function (resolvedScreenshots) {
                                        def.resolve(resolvedScreenshots.length);
                                })
                                .error(function (err) {
                                        console.error(err);
                                });*/
                        
                                return def.promise;
                        }
                }
                ,
                columns: ['author', { dataField: 'title', width: 210 }, 'year', 'genre', 'language', 'format'],
                paging: { pageSize: 8 }
        };
        
        //$scope.data = new Date(2010,6,2);
        
        $scope.dataConfig = {
                format: "datetime", formatString: "dd/MM/yyyy",
                bindingOptions: {
                        value: "data"
                },
                placeholder: 'Hora publicação'
        };
        
        
        
        
                
        var dataItems = [
                {
                title: "Info",
                        data: {
                                firstName: "John",
                                lastName: "Smith",
                                birthYear: 1986,
                        }
                },
                {
                title: "Contacts",
                        data: {
                                phone: "(555)555-5555",
                                email: "John.Smith@example.com",
                        }
                },
                {
                title: "Address",
                        data: {
                                state: "CA",
                                city: "San Francisco",
                                street: "Stanford Ave",
                        }
                }
        ];        
        
        $scope.tabPanelItems = new dx.data.DataSource({
                store: dataItems,
                map: function (itemData) {
                itemData.text = itemData.title;
                itemData.dataArray = $.map(itemData.data, function (value, key) {
                        return {
                        propertyKey: key,
                        propertyValue: value
                        }
                });
                return itemData;
                }
        });
        
        
        dx.ui.notify("Página carregada!", "success", 2000);
}]);


module.exports = modulo;
