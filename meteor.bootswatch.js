// Injects bootswatch theme selector for given menu element
Meteor.bootswatch = function(element, options) {
	if (typeof options != 'object') {
		options = {};
	}

	function defaultCallback(theme){
		if (typeof Meteor.userId == 'function' && typeof UserSession != 'undefined') {
			UserSession.set('theme', theme);
		} else if (Session != 'undefined') {
			Session.set('theme', theme);
		}
	}

	var callback = typeof options.callback == 'function' ? options.callback : defaultCallback;

	$(element)
		.bootswatch()
		.on('theme-changed', function(event, theme){
			callback(theme);
		});
};
