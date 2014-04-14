describe 'bootswatch', ->

	$.fn.simulateClick = ->
		return this.each ->
			e = document.createEvent 'MouseEvents'
			e.initEvent 'click', true, true
			this.dispatchEvent e

	describe 'plugin', ->

		it 'should expose $.fn.bootswatch function', ->
			$.fn.bootswatch.should.be.a.Function

		it 'should expose $.fn.bootswatch.noConflict function', ->
			$.fn.bootswatch.noConflict.should.be.a.Function

	describe 'single instance', ->

		beforeEach ->
			sandbox = $('<div id="sandbox"></div>').appendTo('body')
			$('<ul class="themes"></ul>').appendTo('#sandbox').bootswatch()

		afterEach ->
			$('#sandbox').remove()

		it 'should append link', ->
			$('#bootswatch').length.should.eql(1)

		it 'should load default theme', ->
			$('#bootswatch').attr('href').should.eql('http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css')

		it 'should append menu items', ->
			$('a[data-theme]').length.should.eql(15)

		it 'should have first item with selected icon', ->
			$('a[data-theme=default] .glyphicon-ok').length.should.eql(1)

		it 'should change theme on menu item click', (done) ->
			item = $('a[data-theme=amelia]')
			item.length.should.eql(1)
			$('.themes').on 'theme-changed', ->
				$('#bootswatch').attr('href').should.eql('http://netdna.bootstrapcdn.com/bootswatch/3.1.1/amelia/bootstrap.min.css')
				done()
			item.simulateClick()

		it 'should change icon of menu item', (done) ->
			item = $('a[data-theme=amelia]')
			item.length.should.eql(1)
			$('.themes').on 'theme-changed', ->
				$('a[data-theme=default] .glyphicon-ok').length.should.eql(0)
				$('a[data-theme=amelia] .glyphicon-ok').length.should.eql(1)
				done()
			item.simulateClick()

	describe 'multiple instances', ->

		beforeEach ->
			sandbox = $('<div id="sandbox"></div>').appendTo('body')
			$('<ul class="themes"></ul>').appendTo('#sandbox')
			$('<ul class="themes"></ul>').appendTo('#sandbox')
			$('.themes').bootswatch()

		afterEach ->
			$('#sandbox').remove()

		it 'should append only one link', ->
			$('#bootswatch').length.should.eql(1)
