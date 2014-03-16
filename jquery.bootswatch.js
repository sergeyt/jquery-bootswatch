// jQuery bootswatch theme selector

(function ($) {

	$.fn.bootswatch = function() {

		var $this = $(this);
		var themes = 'amelia,cerulean,cosmo,cyborg,flatly,journal,lumen,readable,simplex,slate,spacelab,superhero,united,yeti'.split(',');

		// templates
		var link = '<link data-theme="$name" rel="stylesheet" href="http://bootswatch.com/$name/bootstrap.css" disabled="disabled"/>';
		var item = '<li><a href="#" data-theme="$name">$label</a></li>';

		themes.forEach(function(name) {
			var label = name.substr(0, 1).toUpperCase() + name.substr(1);
			$(link.replace(/\$name/g, name)).appendTo($('head'));
			$(item.replace(/\$name/g, name).replace(/\$label/g, label)).appendTo($this);
		});

		$this.find('a').click(function() {
			var theme = $(this).data('theme');
			$('link[data-theme]').attr('disabled', 'disabled');
			$('link[data-theme=' + theme + ']').removeAttr('disabled');
		});

		return this;
	};

})(jQuery);
