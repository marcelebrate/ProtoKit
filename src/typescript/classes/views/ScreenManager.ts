class ScreenManager implements IScreenManager
{
	public static TRANSITION_SLIDE_RIGHT:string = 'transition-slideRight';
	public static TRANSITION_SLIDE_LEFT:string = 'transition-slideLeft';
	public static TRANSITION_FADE:string = 'transition-fade';

	public static TWEEN_DURATION:number = .5;

	public static $inject = [];

	public readonly backStack:string[] = [];

	public startScreenName:string = 'start';
	public currentFlow:string = 'default';

	protected screens:Dictionary<string,ScreenController>;

	protected currentScreen:ScreenController;
	protected nextScreen:ScreenController;

	private _HACK_clickDelay:number = 500;
	private _HACK_lastClickTime:number = 0;

	constructor()
	{
		this.screens = new Dictionary<string,ScreenController>();
	}

	public addScreen( pName:string , pScreen:ScreenController ):void
	{
		this.screens.add( pName , pScreen );

		// console.log( '[ScreenManager] addScreen() >> id: ' + pName + ', screen: ' , pScreen );
	}

	public removeScreen( pName:string ):void
	{
		this.screens.remove( pName );
	}

	public back():void
	{
		var lLastScreenID:string = this.backStack.pop();

		if ( !lLastScreenID )
			lLastScreenID = ( this.screens.values()[ 0 ] as ScreenController ).id;

		this.goto( lLastScreenID , null , true );
	}

	// protected changeInProgress:boolean = false;

	// public goto( pScreenName: string , pTransition:string = ScreenManager.TRANSITION_SLIDE_LEFT ): void
	public goto( pScreenName:string , pScreenState:string = null , pBack:boolean = false , pAddToBackStack:Boolean = true ):void
	{
		// HACK: Prevent double taps
		var lNow:number = Date.now();
		if ( lNow - this._HACK_lastClickTime < this._HACK_clickDelay )
			return;
		this._HACK_lastClickTime = lNow;

		// Check if target screenname is the previous in back stack, if so treat as back
		if ( pScreenName == this.backStack[this.backStack.length-1] )
		{
			// this.backStack.pop();
			// pAddToBackStack = false;
			// pBack = true;
		}

		// /HACK

		// Ignore unwanted gotos
		// if ( this.changeInProgress )
		// 	return;

		// this.changeInProgress = true;

		// Ignore if current screen is already the destination
		if ( this.currentScreen )
		{
			if ( this.currentScreen.id == pScreenName )
				return;
		}

		if ( !this.screens.containsKey( pScreenName ) )
		{
			console.error( '[ScreenManager] goto() >> Screen with ID "' + pScreenName + "' does not exist." );
			return;
		}

		this.nextScreen = this.screens.getValue( pScreenName );

		console.log( '[ScreenManager] goto() >> current screen: ' + this.currentScreen + ' // next screen: ' + this.nextScreen );

		if ( pScreenState )
		{
			this.nextScreen.currentState = pScreenState;
		}

		HashUtils.setParam( 't' , pScreenState );
		HashUtils.setParam( 's' , pScreenName );
		// window.location.hash = 's=' + pScreenName + '&t=' + pScreenState;

		if ( this.currentScreen && !pBack && pAddToBackStack )
			this.backStack.push( this.currentScreen.id );

		// Show next screen
		this.showScreen( this.nextScreen , pBack );
	}

	public changeScreenState( pScreenName:string , pStateName:string , pScrollToStop:boolean = false ):void
	{
		// HACK: Prevent double taps
		var lNow:number = Date.now();
		if ( lNow - this._HACK_lastClickTime < this._HACK_clickDelay )
			return;
		this._HACK_lastClickTime = lNow;
		// /HACK

		if ( !this.screens.containsKey( pScreenName ) )
		{
			console.error( '[ScreenManager] changeScreenState() >> Screen with ID "' + pScreenName + "' does not exist." );
			return;
		}

		HashUtils.setParam( 't' , pStateName );

		this.screens.getValue(pScreenName).changeState(pStateName,pScrollToStop);
	}

	public restart( pScreenName:string = null , pFlowName:string = 'default' ):void
	{
		if ( !pScreenName && OPTIONS.startScreen != null )
			pScreenName = OPTIONS.startScreen;

		// Reset all screens
		let lValues:ScreenController[] = this.screens.values();
		let i:number = lValues.length;
		while ( i-- )
		{
			lValues[ i ].reset();
		}

		this.goto( pScreenName , 'default' , true );
		this.currentFlow = pFlowName;
	}

	protected showScreen( pScreen:ScreenController , pBack:boolean = false ):void
	{
		// console.log( '[ScreenManager] showScreen() >> ' + pScreen.id );

		if ( this.currentScreen )
			this.hideScreen( this.currentScreen , pBack );

		pScreen.visible = true;
		pScreen.render();

		let lStart:any = {
			x: pBack ? -320 : 320 ,
			autoAlpha: 1 ,
			display: 'block'
		};
		let lTarget:any = {
			x: 0 ,
			onComplete: ( pScreen ) => this.screen_showCompleteHandler( pScreen ) ,
			onCompleteParams: [ pScreen ]
		};

		TweenLite.fromTo( pScreen.jqSelector , ScreenManager.TWEEN_DURATION , lStart , lTarget );

		this.currentScreen = pScreen;
	}

	protected screen_showCompleteHandler( pScreen:ScreenController ):void
	{
		// Call screen's local show
		pScreen.show();

		// this.changeInProgress = false;
	}

	protected hideScreen( pScreen:ScreenController , pBack:boolean = false ):void
	{
		// Call screen's local hide first
		pScreen.hide();

		let lStart:any = {
			x: 0
		};
		let lTarget:any = {
			x: pBack ? 320 : -320 ,
			autoAlpha: 1 ,
			display: 'block' ,
			onComplete: ( pScreen ) => this.hideScreen_completeHandler( pScreen ) ,
			onCompleteParams: [ pScreen ]
		};

		TweenLite.fromTo( pScreen.jqSelector , ScreenManager.TWEEN_DURATION , lStart , lTarget );
	}

	protected hideScreen_completeHandler( pScreen:ScreenController ):void
	{
		// console.log( '[ScreenManager] hideScreen_completeHandler() >> pScreen: ' , pScreen );
		pScreen.visible = false;
		pScreen.render();
	}

}