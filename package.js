Package.describe({
	name: "sergeyt:jquery-bootswatch",
	summary: "jQuery bootswatch theme selector.",
	git: "https://github.com/sergeyt/jquery-bootswatch",
	version: "0.0.8"
});

Package.onUse(function(api) {
	var client = ['client'];
	api.versionsFrom('METEOR@0.9.1');
	api.use('jquery', client);
	api.addFiles('jquery.bootswatch.js', client);
	api.addFiles('meteor.bootswatch.js', client);
});

