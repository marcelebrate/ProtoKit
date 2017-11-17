class ModalController extends EventDispatcher
{
	public static EVENT_SHOW:string = 'ModalController-show';
	public static EVENT_SHOW_COMPLETE:string = 'ModalController-showComplete';
	public static EVENT_HIDE:string = 'ModalController-hide';
	public static EVENT_HIDE_COMPLETE:string = 'ModalController-hideComplete';

	public static TWEEN_DURATION:number = .5;

	public id:string;

	public currentState:string;

	public showTimeline:TimelineLite;
	public hideTimeline:TimelineLite;

	public firstTime:boolean = true;

	public resetFlag:boolean = true;


	public resetOnHideCompleteFlag:boolean = false;

	public static $inject = [
		'$scope' ,
		'ModalManager'
	];

	// dependencies are injected via AngularJS $injector
	// controller's name is registered in Main.ts and specified from ng-controller attribute in index.php
	constructor(
		public $scope:any = null ,
		public modalManager:ModalManager )
	{
		super();

		if ( $scope )
			$scope.vc = this;

		// this.showTimeline = new TimelineLite({ paused:true , onComplete:() => this._showComplete() });
		// this.hideTimeline = new TimelineLite({ paused:true , onComplete:() => this._hideComplete() });
	}

	public get jqSelector():string
	{
		return '#pk-modal-' + this.id;
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

		this.modalManager.addModal( this.id , this );

		// console.log( '[ModalController::' + pID + '] init() >> modalManager: ' , this.modalManager );

		// this._initShowTimeline();
		// this._initHideTimeline();
	}

	public changeState( pState:string ):void
	{
		this.currentState = pState;
		this.$scope.$digest();
	}

	public show( pBack:boolean = false ):void
	{
		// console.log( '[ModalController::' + this.id + '] show()' );

		this.jq.show();
		this.trigger( ModalController.EVENT_SHOW );

		this.firstTime = false;

		TweenLite.fromTo(
			this.jqSelector ,
			ModalController.TWEEN_DURATION ,
			{ autoAlpha: .5 } ,
			{ autoAlpha: 1 , onComplete: () => this._showComplete() }
		);
	}

	protected _initShowTimeline():void
	{
		this.showTimeline.to( this.jqSelector , 0.5 , { autoAlpha: 1 } );
	}

	// @protected
	protected _showComplete():void
	{
		// console.log( '[ModalController::' + this.id + '] _showComplete()' );

		this.trigger( ModalController.EVENT_SHOW_COMPLETE );
	}

	public hide( pBack:boolean = false ):void
	{
		// console.log( '[ModalController::' + this.id + '] hide()' );

		this.trigger( ModalController.EVENT_HIDE );

		TweenLite.fromTo(
			this.jqSelector ,
			ModalController.TWEEN_DURATION ,
			{ autoAlpha: 1 } ,
			{ autoAlpha: 0 , onComplete: () => this._hideComplete() }
		);

		//this.hideTimeline.startTime(0);
		//this.hideTimeline.time(0);
		// this.hideTimeline.restart();
	}

	// @protected
	protected _initHideTimeline():void
	{
		this.hideTimeline.to( this.jqSelector , 0.5 , { autoAlpha: 0 } );
	}

	// @protected
	protected _hideComplete():void
	{
		// console.log( '[ModalController::' + this.id + '] _hideComplete()' );

		this.jq.hide();
		this.trigger( ModalController.EVENT_HIDE_COMPLETE );
	}
}