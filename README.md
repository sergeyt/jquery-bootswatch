[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Build Status](https://drone.io/github.com/sergeyt/jquery-bootswatch/status.png)](https://drone.io/github.com/sergeyt/jquery-bootswatch/latest)
                                                                                 
[![Deps Status](https://david-dm.org/sergeyt/jquery-bootswatch.png)](https://david-dm.org/sergeyt/jquery-bootswatch)
[![DevDeps Status](https://david-dm.org/sergeyt/jquery-bootswatch/dev-status.png)](https://david-dm.org/sergeyt/jquery-bootswatch#info=devDependencies)

# jquery-bootswatch

jQuery bootswatch themes switcher.

[![NPM version](https://badge.fury.io/js/jquery-bootswatch.png)](http://badge.fury.io/js/jquery-bootswatch)
[![Bower version](https://badge.fury.io/bo/jquery-bootswatch.png)](http://badge.fury.io/bo/jquery-bootswatch)

[![NPM](https://nodei.co/npm/jquery-bootswatch.png?downloads=true&stars=true)](https://nodei.co/npm/jquery-bootswatch/)

## Usage Example

```html
<div class="btn-group">
	<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
		Themes <span class="caret"></span>
	</button>
	<ul class="dropdown-menu themes" role="menu"></ul>
</div>
```

```javascript
$('.themes').bootswatch();
```
