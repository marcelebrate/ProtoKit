// DEFINITIONS /////////////////////////////////////////////////////////////////////////////////////////////////////////

///<reference path="typings/index.d.ts" />
///<reference path="node_modules/@types/angular/index.d.ts" />

// CLASSES /////////////////////////////////////////////////////////////////////////////////////////////////////////////

///<reference path="lib/data/Dictionary.ts" />
///<reference path="lib/event/EventDispatcher.ts" />
///<reference path="lib/services/EventService.ts" />
///<reference path="lib/utils/SystemUtils.ts" />
///<reference path="lib/utils/HashUtils.ts" />
///<reference path="lib/view/BaseViewController.ts" />
///<reference path="lib/view/ViewManager.ts" />

///<reference path="classes/AppController.ts" />
///<reference path="classes/DesktopAppController.ts" />
///<reference path="classes/directives/ChangeClassOnScrollDirective.ts" />
///<reference path="classes/directives/TouchCursorDirective.ts" />
///<reference path="classes/directives/HotspotDirective.ts" />
///<reference path="classes/directives/ModalDirective.ts" />
///<reference path="classes/directives/NavbarDirective.ts" />
///<reference path="classes/directives/ScreenDirective.ts" />
///<reference path="classes/directives/StateDirective.ts" />
///<reference path="classes/views/IPKViewController.ts" />
///<reference path="classes/views/IModalManager.ts" />
///<reference path="classes/views/IScreenManager.ts" />
///<reference path="classes/views/ScreenController.ts" />
///<reference path="classes/views/ModalController.ts" />
///<reference path="classes/views/ModalManager.ts" />
///<reference path="classes/views/PreloaderController.ts" />
///<reference path="classes/views/MobileScreenController.ts" />
///<reference path="classes/views/ScreenManager.ts" />

declare var Draggable:any;
declare var FastClick:any;
declare var OPTIONS:any;

// Set default tweens
TweenLite.defaultEase = Quint.easeOut;

// Disable mobile zoom gestures
document.addEventListener('gesturestart', function (e) {
	e.preventDefault();
});
document.body.addEventListener('touchmove', function(event) {
	// console.log(event['source']);
	if (event['source'] == document.body)
		event.preventDefault();
}, false);