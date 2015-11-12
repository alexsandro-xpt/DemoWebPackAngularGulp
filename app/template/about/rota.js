'use strict';

module.exports = ['about', {
	url: '/about',
	templateProvider: function ($q) {
		return $q(function (resolve) {
			// lazy load the view
			require.ensure([], function () {
				resolve(require('./about.html'));
			});
		});
	},
	controller: 'ctrAbout',
	resolve: {
		load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
			return $q(function (resolve) {
				require.ensure([], function () {
					// load whole module
					var modulo = require('./about.js');
					$ocLazyLoad.load({ name: modulo.name });
					resolve(modulo.controller);
				});
			});
		}]
	}
}];