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
    var $this = this;
    this.$element = $(element);
    this.options  = $.extend({}, Bootswatch.DEFAULTS, this.$element.data(), options);

    this.$link = $("<link>").attr('rel', 'stylesheet').attr('id', this.options.selector);
    $('head').append(this.$link);

    if (this.options.default !== false) {
      this.change(this.options.default);
    }

    $.each(Bootswatch.THEMES, function(name, href) {
        var label = name.substr(0, 1).toUpperCase() + name.substr(1);
        var html = $this.options.roller
          .replace(/\$name/g, name)
          .replace(/\$label/g, label);
        $(html).appendTo($this.$element);
    });

    this.$element.find('a').click(function() {
      var theme = $(this).data('theme');

      $this.change(theme);
    });
  };

  Bootswatch.DEFAULTS = {
    default: 'default',
    selector: 'bootswatch',
    roller: '<li><a href="#" data-theme="$name"><span>$label</span>&nbsp;<span class="glyphicon"></span></a></li>',
    icon: 'glyphicon-ok'
  };

  Bootswatch.THEMES = {
    default: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css',
    amelia: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/amelia/bootstrap.min.css',
    cerulean: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/cerulean/bootstrap.min.css',
    cosmo: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/cosmo/bootstrap.min.css',
    cyborg: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/cyborg/bootstrap.min.css',
    flatly: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/flatly/bootstrap.min.css',
    journal: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/journal/bootstrap.min.css',
    lumen: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/lumen/bootstrap.min.css',
    readable: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/readable/bootstrap.min.css',
    simplex: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/simplex/bootstrap.min.css',
    slate: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/slate/bootstrap.min.css',
    spacelab: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/spacelab/bootstrap.min.css',
    superhero: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/superhero/bootstrap.min.css',
    united: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/united/bootstrap.min.css',
    yeti: '//netdna.bootstrapcdn.com/bootswatch/3.1.1/yeti/bootstrap.min.css'
  };

  Bootswatch.prototype.change = function(theme) {
    this.$link.attr('href', Bootswatch.THEMES[theme]);

    // toggle icon
    this.$element.find('a[data-theme] .' + this.options.icon).removeClass(this.options.icon);
    this.$element.find('a[data-theme=' + theme + '] .glyphicon').addClass(this.options.icon);

    this.$element.trigger('theme-changed', theme);
  };

  Bootswatch.prototype.setOptions = function(options) {
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
		  $this.data('bs.bootswatch', (data = new Bootswatch(this, options)));
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
