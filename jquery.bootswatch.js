/* ========================================================================
 * jquery.bootswatch.js v0.0.7
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

		// insert link element
		this.$link = $('#' + this.options.selector);
		if (!this.$link.length) {
			this.$link = $('<link rel="stylesheet"/>').attr('id', this.options.selector).appendTo('head');
		}

		// insert menu items
		$.each(this.options.themes, function (name) {
			var label = name.substr(0, 1).toUpperCase() + name.substr(1);
			var html = self.options.roller
				.replace(/\$name/g, name)
				.replace(/\$label/g, label);
			$(html).appendTo(self.$element);
		});

		// set default theme
		if (this.options.default) {
			this.change(this.options.default);
		}

		this.$element.find('a').click(function () {
			var theme = $(this).data('theme');
			self.change(theme);
		});
	};

	function theme_url(name) {
		return 'http://netdna.bootstrapcdn.com/bootswatch/3.3.2/$name/bootstrap.min.css'.replace(/\$name/g, name);
	}

	var themes = {
		default: 'http://netdna.bootstrapcdn.com/bootstrap/3.1.2/css/bootstrap.min.css',
		cerulean: theme_url('cerulean'),
		cosmo: theme_url('cosmo'),
		cyborg: theme_url('cyborg'),
		darkly: theme_url('darkly'),
		flatly: theme_url('flatly'),
		journal: theme_url('journal'),
		lumen: theme_url('lumen'),
		paper: theme_url('paper'),
		readable: theme_url('readable'),
		sandstone: theme_url('sandstone'),
		simplex: theme_url('simplex'),
		slate: theme_url('slate'),
		spacelab: theme_url('spacelab'),
		superhero: theme_url('superhero'),
		united: theme_url('united'),
		yeti: theme_url('yeti')
	};

	Bootswatch.DEFAULTS = {
		default: 'default',
		themes: themes,
		selector: 'bootswatch',
		roller: '<li><a href="#" data-theme="$name"><span>$label</span>&nbsp;<span class="glyphicon"></span></a></li>',
		icon: 'glyphicon-ok'
	};

	Bootswatch.prototype.change = function (theme) {
		this.$link.attr('href', this.options.themes[theme]);

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
