'use strict';

module.exports = ['404', {
	url: '/404',
	templateProvider: function ($q) {
		return $q(function (resolve) {
			// lazy load the view
			require.ensure([], function () {
				resolve(require('./404.html'));
			});
		});
	},
	controller: 'ctr404',
	resolve: {
		load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
			return $q(function (resolve) {
				require.ensure([], function () {
					// load whole module
					var modulo = require('./404.js');
					$ocLazyLoad.load({ name: modulo.name });
					resolve(modulo.controller);
				});
			});
		}]
	}
}];