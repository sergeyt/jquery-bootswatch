// jQuery bootswatch theme selector

(function ($) {

	$.fn.bootswatch = function() {

		var $this = $(this);
		var themes = 'default,amelia,cerulean,cosmo,cyborg,flatly,journal,lumen,readable,simplex,slate,spacelab,superhero,united,yeti'.split(',');

		// templates
		var link_template = '<link data-theme="$name" rel="stylesheet" href="http://bootswatch.com/$name/bootstrap.css" disabled="disabled"/>';
		var item_template = '<li><a href="#" data-theme="$name"><span>$label</span>&nbsp;<span class="glyphicon"></span></a></li>';

		// insert theme links
		if (!$('link[data-theme]').length) {
			themes
				.filter(function(name) { return name != 'default'; })
				.forEach(function(name) {
					var html = link_template.replace(/\$name/g, name);
					$(html).appendTo($('head'));
				});
		}

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

			// toggle theme link
			$('link[data-theme]').attr('disabled', 'disabled');
			$('link[data-theme=' + theme + ']').removeAttr('disabled');

			// toggle icon
			$('a[data-theme] .' + selected_icon).removeClass(selected_icon);
			$('a[data-theme=' + theme + '] .glyphicon').addClass(selected_icon);

			$this.trigger('theme-changed', theme);
		});

		return this;
	};

})(jQuery);
