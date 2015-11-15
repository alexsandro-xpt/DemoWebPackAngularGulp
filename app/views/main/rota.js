'use strict';

module.exports = ['index', {
	url: '',
	templateProvider: function ($q) {
		return $q(function (resolve) {
			// lazy load the view
			require.ensure([], function () {
				resolve(require('./main.html'));
			});
		});
	},
	controller: 'ctrMain',
	resolve: {
		load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
			return $q(function (resolve) {
				require.ensure([], function () {
					// load whole module
					var modulo = require('./main.js');
					$ocLazyLoad.load({ name: modulo.name });
					resolve(modulo.controller);
				});
			});
		}]
	}
}];