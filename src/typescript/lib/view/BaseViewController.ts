class BaseViewController extends EventDispatcher
{
	public static EVENT_SHOW:string = 'ViewController-show';
	public static EVENT_SHOW_COMPLETE:string = 'ViewController-showComplete';
	public static EVENT_HIDE:string = 'ViewController-hide';
	public static EVENT_HIDE_COMPLETE:string = 'ViewController-hideComplete';

	public currentState:string;

	public showTimeline:TimelineLite;
	public hideTimeline:TimelineLite;

	public firstTime:boolean = true;

	public resetFlag:boolean = true;

	public viewSelector:string;

	public resetOnHideCompleteFlag:boolean = false;

	public static $inject = [
		'$scope' ,
		'ViewManager'
	];

	// dependencies are injected via AngularJS $injector
	// controller's name is registered in Main.ts and specified from ng-controller attribute in index.html
	constructor(
		public $scope:any = null ,
		public viewManager:ViewManager = null )
	{
		super();

		if ( $scope )
			$scope.vc = this;
	}

	private _jq:JQuery;
	public get jq():JQuery
	{
		// TODO: Cache this rather than constantly recall it
		return $( this.viewSelector );
	}

	public init( pSelector:string ):void
	{
		this.viewSelector = pSelector;

		// console.log( '[BaseViewController::' + pSelector + '] init() >> viewManager: ' , this.viewManager );

		this.viewManager.registerView( this.viewSelector , this );

		// this.initShowTimeline();
		// this.initHideTimeline();
	}

	public reset():void
	{
		this.resetFlag = false;
		this.resetOnHideCompleteFlag = false;
	}

	public resume():void
	{
	}

	public pause():void
	{
	}

	public changeState( pState:string ):void
	{
		this.currentState = pState;
		this.$scope.$digest();
	}

	public show():void
	{
		// console.log( '[BaseViewController::' + this.viewSelector + '] show()' );

		this.jq.show();
		this.trigger( BaseViewController.EVENT_SHOW );

		this.firstTime = false;

		//this.showTimeline.startTime(0);
		//this.showTimeline.time(0);
		//this.showTimeline.play();

		// this.showTimeline.restart();

		if ( this.resetFlag )
			this.reset();
	}

	protected _initShowTimeline():void
	{
		this.showTimeline.to( this.viewSelector , 0.5 , { autoAlpha: 1 } );
	}

	// @protected
	public _showComplete():void
	{
		// console.log( '[BaseViewController::' + this.viewSelector + '] showComplete()' );

		this.trigger( BaseViewController.EVENT_SHOW_COMPLETE );
	}

	public hide():void
	{
		// console.log( '[BaseViewController::' + this.viewSelector + '] hide()' );

		this.trigger( BaseViewController.EVENT_HIDE );

		//this.hideTimeline.startTime(0);
		//this.hideTimeline.time(0);
		// this.hideTimeline.restart();
	}

	// @protected
	protected _initHideTimeline():void
	{
		this.hideTimeline.to( this.viewSelector , 0.5 , { autoAlpha: 0 } );
	}

	// @protected
	public _hideComplete():void
	{
		// console.log( '[BaseViewController::' + this.viewSelector + '] hideComplete()' );

		this.jq.hide();
		this.trigger( BaseViewController.EVENT_HIDE_COMPLETE );

		if ( this.resetOnHideCompleteFlag )
			this.reset();
	}
}