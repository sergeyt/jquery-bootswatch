// jQuery bootswatch theme selector

(function ($) {

	$.fn.bootswatch = function() {

		var $this = $(this);
		var themes = 'default,amelia,cerulean,cosmo,cyborg,flatly,journal,lumen,readable,simplex,slate,spacelab,superhero,united,yeti'.split(',');

		// templates
		var link_template = '<link data-theme="$name" type="text/css" rel="stylesheet" href="http://bootswatch.com/$name/bootstrap.css" />';
		var item_template = '<li><a href="#" data-theme="$name"><span>$label</span>&nbsp;<span class="glyphicon"></span></a></li>';
		var selected_icon = 'glyphicon-ok';

		// insert theme menu items
		themes.forEach(function(name) {
			var label = name.substr(0, 1).toUpperCase() + name.substr(1);
			var html = item_template
				.replace(/\$name/g, name)
				.replace(/\$label/g, label);
			var item = $(html).appendTo($this);
			if (name == 'default') {
				item.find('.glyphicon').addClass(selected_icon);
			}
		});

		$this.find('a').click(function() {
			var theme = $(this).data('theme');

			// inject theme
			var link = $('link[data-theme]');
			if (link.length) {
				link.attr('href', "http://bootswatch.com/$name/bootstrap.css".replace(/\$name/g, theme))
					.attr("data-theme", theme);
			} else {
				$(link_template.replace(/\$name/g, theme)).appendTo($('head'));
			}

			// toggle icon
			$('a[data-theme] .' + selected_icon).removeClass(selected_icon);
			$('a[data-theme=' + theme + '] .glyphicon').addClass(selected_icon);

			$this.trigger('theme-changed', theme);
		});

		return this;
	};

})(jQuery);
