'use strict';

require("angular");
require("angular-ui-router");
require("oclazyload");
require("angular-resource");

var appModule = require('./index');  

angular.element(document).ready(function () {  
  angular.bootstrap(document, [appModule.name], {
    //strictDi: true
  });
});

