'use strict';

require("angular");

var modulo = angular.module('app.rotas', []);

modulo.config(['$provide', function($provide){
	
	var rotas = [];
	
	var req = require.context("../../template", true, /^.*rota\.js$/igm);///^(.*rota\.(js$))[^.]*$/igm
	req.keys().forEach(function(key){
		rotas.push(req(key));
	});
	
	
/*

		require("../template/main/rota"),
		require("../template/404/rota"),
		require("../template/about/rota"),
		require("../template/admin/rota")
 */

	
	$provide.constant('rotas', rotas);
}]);


module.exports = modulo;