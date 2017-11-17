class ScreenController extends EventDispatcher
{
	public static $inject = [
		'$scope' ,
		'$timeout' ,
		'ScreenManager'
	];

	public static EVENT_SHOW:string = 'ScreenController-show';
	public static EVENT_SHOW_COMPLETE:string = 'ScreenController-showComplete';
	public static EVENT_HIDE:string = 'ScreenController-hide';
	public static EVENT_HIDE_COMPLETE:string = 'ScreenController-hideComplete';

	public static TWEEN_DURATION:number = .5;

	public id:string;

	public currentState:string = 'default';

	public showTimeline:TimelineLite;
	public hideTimeline:TimelineLite;

	public firstTime:boolean = true;

	public resetFlag:boolean = true;

	public resetOnHideCompleteFlag:boolean = false;
	public visible:boolean = false;
	public enabled:boolean = false;

	protected scrollPosition:number = 0;

	constructor(
		public $scope:any = null ,
		public $timeout:any = null ,
		public screenManager:IScreenManager = null )
	{
		super();

		if ( $scope )
			$scope.vc = this;

		// this.showTimeline = new TimelineLite({ paused:true , onComplete:() => this.showComplete() });
		// this.hideTimeline = new TimelineLite({ paused:true , onComplete:() => this.hideComplete() });
	}

	public get jqSelector():string
	{
		return '#pk-screen-' + this.id;
	}

	private _jq:JQuery;
	public get jq():JQuery
	{
		// TODO: Cache this rather than constantly recall it
		if ( !this._jq )
			this._jq = $( this.jqSelector );

		return this._jq;
	}

	public init( pID:string ):void
	{
		this.id = pID;

		this.screenManager.addScreen( this.id , this );
	}

	public reset():void
	{
		// console.log( '[ScreenController::' + this.id + '] reset()' );

		$( this.jqSelector ).find( '.scrollWrapper' ).scrollTop( 0 );

		this.currentState = 'default';
		this.resetFlag = false;
		this.resetOnHideCompleteFlag = false;
	}

	public resume():void
	{
	}

	public pause():void
	{
	}

	public changeState( pState:string , pScrollToTop:boolean = false ):void
	{
		// console.log( '[ScreenController::' + this.id + '] changeState() >> state: ' + pState );
		this.currentState = pState;

		if ( pScrollToTop )
			$( this.jqSelector ).find( '.scrollWrapper' ).scrollTop( 0 );

		this.render();
	}

	public show( pBack:boolean = false ):void
	{
		// console.log( '[ScreenController::' + this.id + '] show()' );

		this.trigger( ScreenController.EVENT_SHOW );

		// this.visible = true;
		this.firstTime = false;

		/*
		 // this.showTimeline.restart();
		 let lStartX:number = pBack ? -320 : 320;
		 TweenLite.set( this.jqSelector , { x:lStartX , autoAlpha:1 });
		 TweenLite.to( this.jqSelector , ScreenController.TWEEN_DURATION , { x:0 , onComplete:()=>this.showComplete() } );
		 */

		if ( this.resetFlag )
			this.reset();

		this.render();

		this.showComplete();
	}

	protected initShowTimeline():void
	{
		this.showTimeline.to( this.jqSelector , ScreenController.TWEEN_DURATION , { autoAlpha: 1 } );
	}

	// @protected
	protected showComplete():void
	{
		this.enabled = true;
		this.render();
		// console.log( '[ScreenController::' + this.id + '] showComplete()' );

		this.trigger( ScreenController.EVENT_SHOW_COMPLETE );
	}

	public hide( pBack:boolean = false ):void
	{
		// console.log( '[ScreenController::' + this.id + '] hide()' );

		this.trigger( ScreenController.EVENT_HIDE );

		this.enabled = false;
		this.render();
		this.hideComplete();

		/*
		 let lTargetX:number = pBack ? 320 : -320;
		 TweenLite.set( this.jqSelector , { x:0 , autoAlpha:1 });
		 TweenLite.to( this.jqSelector , ScreenController.TWEEN_DURATION , { x:lTargetX , onComplete:()=>this.hideComplete() } );
		 */
	}

	// @protected
	protected initHideTimeline():void
	{
		this.hideTimeline.to( this.jqSelector , ScreenController.TWEEN_DURATION , { autoAlpha: 0 } );
	}

	// @protected
	protected hideComplete():void
	{
		// console.log( '[ScreenController::' + this.id + '] hideComplete()' );

		this.trigger( ScreenController.EVENT_HIDE_COMPLETE );

		// this.visible = false;

		if ( this.resetOnHideCompleteFlag )
			this.reset();
	}

	public backToTop( pAnimate:boolean = true ):void
	{
		console.log( this.jq );

		$( this.jq.find( '.scrollWrapper' ) ).animate( {
			scrollTop: 0
		} , 400 , 'swing' );
	}

	public render():void
	{
		try
		{
			this.$scope.$digest();
		} catch( error )
		{
			// Ignore...
		}
	}

	public toString = ():string =>
	{
		return this.id;
	}
}