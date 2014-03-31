Package.describe({
	summary: "jQuery bootswatch theme selector."
});

Package.on_use(function(api) {
	var client = ['client'];

	api.use('jquery', client);

	api.add_files('jquery.bootswatch.js', client);
	api.add_files('meteor.bootswatch.js', client);
});
