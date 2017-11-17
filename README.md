# Prototyping Framework Documentation
*Updated 2017-02-22*

--------------------------------------------------------------------------------

## Overview 

The prototyping library is a TypeScript/Angular-based JavaScript library to ease development of rapid prototypes, from glorified screenshot click-thrus to more robust, high fidelity interactive prototypes.

## Requirements

### TypeScript 2

TypeScript was chosen for its simplicity and cleanliness in writing object-oriented code. In order to properly transpile the code, you will need to install TypeScript 2 on your machine and point it to `src/typescript/tsconfig.json` for transpilation. The JetBrains WebStorm IDE will automatically detect this file and transpile it to the correct place.

The main entry point for transpilation is `src/typescript/main.ts`

### SASS

Sass allows for building modular CSS and abstracting out repeated values to variables.

The main entry point for transpilation is `src/sass/main.scss`

### JQuery

In a perfect world, JQuery wouldn't be needed with Angular, instead relying on binding to manipulate the DOM. In the real world, and particularly the prototyping world, however, JQuery is sometimes the fastest/easiest option. Currently, some JQuery/DOM manipulation is sprinkled within the ViewControllers and Directives.

### Greensock Animation Platform (GSAP)

Greensock is a powerful animation/tweening library. It's currently being used for view-based transitions, however CSS transitions are also being used in some places for simplicity.

GSAP is also used to get native-feeling draggable scroll container functionality, complete with momentum and edge resistance rubberbanding. Safari on iOS has difficulty with momentum scrolling in nested containers, so this solution gives a native feeling experience.

### Angular 1.6.1

Angular was chosen for its power in databinding and in simplifying HTML by means of custom tags/directives. There are a number of custom directives in use to aid in rapidly creating working prototypes. 

## Usage

To use the library, include the following lines in your HTML:

	<link rel="stylesheet" type="text/css" href="protokit/styles/protokit.min.css" media="all" />
	<script type="text/javascript" src="protokit/scripts/protokit.min.js"></script>
	
You will also need the following JavaScript libraries:

* jQuery 2.1.1
* AngularJS 1.6.1
	* ngTouch Plugin
* GreenSock Animation Platform 1.19.1
	* TweenMax
	* Draggable Plugin
	* CSSPlugin
	* ThrowProps Plugin (requires Club GreenSock membership)
* FastClick

Refer to `dist/example.html` for sample usage and links to the above libraries.
	
NOTE: Due to JavaScript permissions, the site will not run standalone. You must run it from a webserver. You can use a local solution like NodeJS or upload it to a remote webserver.

### Directives

#### `<screen>`

Builds a UI screen using the template under `dist/assets/partials/screen.html`. Screens must consist of at least one `<state>`, wrapped in `<states>` tags. Screens and states are controlled by using the `ScreenManager` service.

	<screen pk-name="cart" pk-controller="ScreenController">
		<states>
			<state>
				<h1>Shopping Cart</h1>
			</state>
		</states>
	</screen>
	
##### Attributes

* `pk-name` : Unique identifier used to goto the screen via `app.screenManager.goto(...)`

#### `<navbar>`

Builds a "floating" navbar above the screen content. This is particularly useful for mobile-based applications, where a static navigation element is needed. This is positioned using Flexbox and, with CSS, can be easily modified to be at the top or bottom of the screen.

	<navbar pk-screen-name="cart" pk-scroll-classes="minimize">
		<states>
			<state>
				<h1>Cart</h1>
			</state>
		</states>
	</navbar>

##### Attributes

* `pk-screen-name` : Name of the screen which the nav is associated with. (i.e. the parent screen's name)
* `pk-scroll-classes` : Space-delimited list of classes to apply when the user has scroll the page. This can be used to shrink the navbar or hide/show elements when the user has scrolled.
	* Example: `<navbar pk-scroll-classes="minimize simple" />`
* `pk-height` : Height of the navbar in its default state. This can be overridden by pk-scroll-classes.


#### `<modal>`

Builds a UI modal. Modals are controlled by using the `ModalManager`
service.

##### Attributes

* `pk-name` : Unique identifier used to hide/show the modal via `app.modalManager.show()`

#### `<state>`

Defines a state within `<screen>`, `<modal>` or `<navbar>`. States can just be defined as an image with hotspots or they can contain standard HTML for building more robust prototypes.

Image-based state with hotspot:

	<state pk-image-url="assets/images/cart_01.png">
		<hotspots>
			<hotspot top="100px" left="100px" width="50px" height="50px" action="app.cartService.removeItem(item)" />
		</hotspots>
	</state>
	
##### Attributes

* `pk-image-url` : URL to an image to use as a background. This is generally used to show a screenshot for the given state.
* `pk-show-states` : Comma-delimited list of screen states that the current list should be shown in.
* `offset-x` : Offset the screenshot by the given value. This will start the screenshot at the given x value from the top left of the container. This is a string and can be in px, em or other CSS units.
* `offset-y` : Offset the screenshot by the given value. This is a string and can be in px, em or other CSS units.
* `crop-bottom` : Amount to crop off the bottom of the screenshot. Use this to remove any chrome or extra elements in your screenshot that you don't want to display. This is a string and can be in px, em or other CSS units.
* `crop-top` : Amount to crop off the top of the screenshot. Use this to remove any chrome or extra elements in your screenshot that you don't want to display. This is a string and can be in px, em or other CSS units.
* `crop-left` : Amount to crop off the left of the screenshot. Use this to remove any chrome or extra elements in your screenshot that you don't want to display. This is a string and can be in px, em or other CSS units.
* `crop-right` : Amount to crop off the right of the screenshot. Use this to remove any chrome or extra elements in your screenshot that you don't want to display. This is a string and can be in pxCSS units, em or other CSS units.

#### `<hotspot>`

Inserts a clickable hotspot with given positioning and sizing. Hotspots
must be wrapped in a `<hotspots>` tag. Hotspots can be nested within a `<state>` tag for state-specific hotspots or nested at the `<screen>` level for 'global' screen hotspots.

	<screen pk-name="sample">
		<states>
			<state pk-show-states="state1" pk-image-url="assets/images/cart_01.png">
				<hotspots>
					<!-- This hotspot will only be available in this state... -->
					<hotspot top="100px" left="100px" width="50px" height="50px" action="app.screenManager.changeScreenState('sample','state2')" />
				</hotspots>
			</state>
			<state pk-show-states="state2" pk-image-url="assets/images/cart_02.png" />
		</states>
		<hotspots>
			<!-- This hotspot will available on all screen states... -->
			<hotspot top="400px" left="100px" width="50px" height="50px" action="app.screenManager.goto('checkout')" />
		</hotspots>
	</screen>
	
##### Attributes
	
* `bottom` : Left position of the hotspot. This is a string and can be in px, em or other CSS units.
* `left` : Left position of the hotspot. This is a string and can be in px, em or other CSS units.
* `right` : Left position of the hotspot. This is a string and can be in px, em or other CSS units.
* `top` : Left position of the hotspot. This is a string and can be in px, em or other CSS units.
* `height` : Width of the hotspot. This is a string and can be in px, em or other CSS units.
* `width` : Width of the hotspot. This is a string and can be in px, em or other CSS units.
* `position` : CSS position (e.g. `absolute`, `fixed`, etc.). Default is `absolute`
* `action` : Code action to take when the user clicks on the hotspot. This can change states, screens or other actions.
