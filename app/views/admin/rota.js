'use strict';

module.exports = ['admin', {
	url: '/admin',
	templateProvider: function ($q) {
		return $q(function (resolve) {
			// lazy load the view
			require.ensure([], function () {
				require("./DesktopLayout.css");
				resolve(require('./DesktopLayout.html'));
			});
		});
	},
	controller: 'ctrAdmin',
	resolve: {
		load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
			return $q(function (resolve) {
				require.ensure([], function () {
					// load whole module
					var modulo = require('./admin.js');
					$ocLazyLoad.load({ name: modulo.name });
					resolve(modulo.controller);
				});
			});
		}]
	}
}];