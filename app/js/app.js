'use strict';

require("angular");
require("angular-ui-router");
require("oclazyload");
require("angular-resource");
//require('jquery-1.11.3/index');
require("devextreme/css/dx.common.css");
//require("devextreme/css/dx.all");
//require("devextreme/js/dx.all");

var appModule = require('./index');  

angular.element(document).ready(function () {  
  angular.bootstrap(document, [appModule.name], {
    //strictDi: true
  });
});

