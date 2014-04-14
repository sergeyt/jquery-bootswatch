/* ========================================================================
 * jquery.bootswatch.js v0.0.6
 * https://github.com/sergeyt/jquery-bootswatch
 * ========================================================================
 * Copyright 2014 Sergey Todyshev
 * Licensed under MIT (https://github.com/sergeyt/jquery-bootswatch/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
	'use strict';

	// BOOTSWATCH CLASS DEFINITION
	// ===========================

	var Bootswatch = function (element, options) {
		var self = this;
		this.$element = $(element);
		this.options = $.extend({}, Bootswatch.DEFAULTS, this.$element.data(), options);

		this.$link = $('#' + this.options.selector);
		if (!this.$link.length) {
			this.$link = $('<link rel="stylesheet"/>').attr('id', this.options.selector).appendTo('head');
		}

		$.each(Bootswatch.THEMES, function (name) {
			var label = name.substr(0, 1).toUpperCase() + name.substr(1);
			var html = self.options.roller
				.replace(/\$name/g, name)
				.replace(/\$label/g, label);
			$(html).appendTo(self.$element);
		});

		if (this.options.default) {
			this.change(this.options.default);
		}

		this.$element.find('a').click(function () {
			var theme = $(this).data('theme');
			self.change(theme);
		});
	};

	Bootswatch.DEFAULTS = {
		default: 'default',
		selector: 'bootswatch',
		roller: '<li><a href="#" data-theme="$name"><span>$label</span>&nbsp;<span class="glyphicon"></span></a></li>',
		icon: 'glyphicon-ok'
	};

	function theme_url(name) {
		return 'http://netdna.bootstrapcdn.com/bootswatch/3.1.1/$name/bootstrap.min.css'.replace(/\$name/g, name);
	}

	var themes = 'amelia,cerulean,cosmo,cyborg,flatly,journal,lumen,readable,simplex,slate,spacelab,superhero,united,yeti'
		.split(',')
		.map(function(name){
			var obj = {};
			obj[name] = theme_url(name);
			return obj;
		});
	var default_theme = {default: 'http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css'};

	Bootswatch.THEMES = $.extend.apply($, [default_theme].concat(themes));

	Bootswatch.prototype.change = function (theme) {
		this.$link.attr('href', Bootswatch.THEMES[theme]);

		// toggle icon
		this.$element.find('a[data-theme] .' + this.options.icon).removeClass(this.options.icon);
		this.$element.find('a[data-theme=' + theme + '] .glyphicon').addClass(this.options.icon);

		this.$element.trigger('theme-changed', theme);
	};

	Bootswatch.prototype.setOptions = function (options) {
		if (typeof options == 'object') {
			this.options = $.extend({}, this.options, options);
		}
	};

	// BOOTSWATCH PLUGIN DEFINITION
	// =========================

	var old = $.fn.bootswatch;

	$.fn.bootswatch = function (option, arg) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('bs.bootswatch');
			var isNew = (typeof data == 'object');
			var options = typeof option == 'object' && option;

			if (!data) {
				data = new Bootswatch(this, options);
				$this.data('bs.bootswatch', data);
			}

			if (typeof option == 'object' && isNew === false) {
				data.setOptions(option);
			} else if (typeof option == 'string') {
				data[option](arg);
			}
		});
	};

	$.fn.bootswatch.Constructor = Bootswatch;

	// BOOTSWATCH NO CONFLICT
	// ======================

	$.fn.bootswatch.noConflict = function () {
		$.fn.bootswatch = old;
		return this;
	};

}(jQuery);
