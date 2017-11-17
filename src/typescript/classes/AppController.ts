class AppController
{
	public static $inject = [
		'$scope' ,
		'$timeout' ,
		'$window' ,
		'EventService' ,
		'ScreenManager' ,
		'ModalManager'
	];

	public osName:string = SystemUtils.OS_UNKNOWN;
	public isWebApp:boolean = false;

	public appScale:number = 1;

	// dependencies are injected via AngularJS $injector
	// controller's name is registered in main-protokit.ts and specified from ng-controller attribute in index.html
	constructor(
		public $scope:any ,
		public $timeout:any ,
		public $window:any ,
		public eventService:EventService ,
		public screenManager:IScreenManager ,
		public modalManager:IModalManager )
	{
		// HACK: Make sure this is called when the DOM is fully built
		$timeout( () => this.init() , 100 );

		this.eventService.bind( PreloaderController.EVENT_LOAD_COMPLETE , ()=>this.preloader_loadCompleteHandler() );
	}

	protected init():void
	{
		this.setBrowserDetails();
		this.initHotspots();
		this.setScreenDimensions();

		this.window_resizeHandler();
		angular.element( this.$window ).bind('resize' , ()=>this.window_resizeHandler() );

		// this.screenManager.goto( this.screenManager.startScreenName );
	}

	protected window_resizeHandler():void
	{
		var lWindowWidth = $(window).width();

		if ( OPTIONS.scaleToFitOnMobile && lWindowWidth <= 600 )
		{
			this.appScale = lWindowWidth / OPTIONS.screenWidth;
		}
		else
		{
			this.appScale = 1;
		}

		$('#app-wrapper').css('zoom',this.appScale);

		this.$scope.$digest();

		// console.log( '[AppController] window_resizeHandler() >> appScale: ' + this.appScale );
	}

	protected showPreloader():void
	{

	}

	protected preloader_assetLoadedHandler():void
	{
	}

	protected preloader_loadCompleteHandler():void
	{
		console.log( '[AppController] preloader_loadCompleteHandler()' );

		this.initHashQuery();

		this.screenManager.goto( this.screenManager.startScreenName );
	}

	protected setScreenDimensions():void
	{
		// Set widths/heights
		$('#app-wrapper').width( OPTIONS.screenWidth );

		if ( OPTIONS.screenHeight && ( SystemUtils.getOS() == SystemUtils.OS_MAC || SystemUtils.getOS() == SystemUtils.OS_WINDOWS ) )
			$( '#app-wrapper' ).height( OPTIONS.screenHeight );
	}

	protected setBrowserDetails():void
	{
		this.osName = SystemUtils.getOS();

		if ( this.osName == SystemUtils.OS_IOS )
			this.isWebApp = window.navigator[ 'standalone' ] == true;
		else if ( this.osName == SystemUtils.OS_ANDROID )
			this.isWebApp = window.matchMedia( '(display-mode: standalone)' ).matches
		else
			this.isWebApp = false;

		// console.log( '[AppController] setBrowserDetails() >> osName: ' + this.osName + ' // isWebApp: ' + this.isWebApp );
	}

	protected initHashQuery():void
	{
		$(window).on('hashchange',()=>this.window_hashchangeHandler() );

		var lParams = HashUtils.getAllParams();
		// this.screenManager.currentFlow = lParams.f || 'default';
		this.screenManager.currentFlow = OPTIONS.flow || 'default';
		this.screenManager.startScreenName = lParams.s || 'default';

		// lParams.f = this.screenManager.currentFlow;
		lParams.s = this.screenManager.startScreenName;

		HashUtils.updateParams( lParams );
	}

	protected initHotspots():void
	{
		FastClick.attach( document.body );

		// Ignore if hints are disabled
		if ( !OPTIONS.hotspotHintsEnabled )
			return;

		// Check for users not clicking on a hotspot
		var lRef = this;
		$( '*' ).click( function ( event )
		{
			event.stopPropagation();

			// HACK: disable pointer events for a split second to prevent accident clicks
			let lNodeName = event.target.nodeName.toLowerCase();
			let lIsAcceptedType:boolean = lNodeName == 'a' || lNodeName == 'button' || lNodeName == 'input';

			if ( $( event.target ).hasClass( 'hotspot' ) || lIsAcceptedType )
				return;

			lRef.flashHotspots();
		} );

	}

	protected flashHotspots()
	{
		var lFromVars:any = {
			filter: { brightness: 100 }
		};
		var lToVars:any = {
			filter: { brightness: 150 } ,
			yoyo: true ,
			repeat: 3 ,
			overwrite: 1
		};
		TweenMax.fromTo( 'a' , .1 , lFromVars , lToVars );
		TweenMax.fromTo( 'input' , .1 , lFromVars , lToVars );
		TweenMax.fromTo( 'button' , .1 , lFromVars , lToVars );
		TweenMax.fromTo( 'textarea' , .1 , lFromVars , lToVars );

		lFromVars = {
			opacity: 0
		};
		lToVars = {
			opacity: .2 ,
			yoyo: true ,
			repeat: 3 ,
			overwrite: 1
		};

		TweenMax.fromTo( '.hotspot' , .1 , lFromVars , lToVars );
	}

	protected update():void
	{
		try
		{ this.$scope.$digest(); }
		catch ( pError )
		{}
	}

	protected window_hashchangeHandler():void
	{
		var lParams = HashUtils.getAllParams();
		// this.screenManager.currentFlow = lParams.f;
		this.screenManager.goto( lParams.s , null , true , false );
	}

}