module.exports = function(config) {

	// apply base config
	require('./karma.conf.js')(config);

	// disable coverage
	config.set({
		preprocessors: {
			'test/*.coffee': 'coffee'
		},

		coffeePreprocessor: {
			options: {
				bare: true,
				sourceMap: true
			}
		},

		reporters: ['dots'],
		autoWatch: true,
		browsers: ['Chrome']
	});
};
