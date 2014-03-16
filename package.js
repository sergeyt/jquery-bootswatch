Package.describe({
  summary: "jQuery bootswatch theme selector."
});

Package.on_use(function(api, where) {
  api.use('jquery', ['client']);
  api.add_files('./jquery.bootswatch.js', ['client']);
});
