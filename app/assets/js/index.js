'use strict';

require("angular");

var appModule = require('./app');  

angular.element(document).ready(function () {  
  angular.bootstrap(document, [appModule.name], {
    //strictDi: true
  });
});
