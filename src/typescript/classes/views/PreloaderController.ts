class PreloaderController extends ScreenController
{
	public static EVENT_ASSET_LOADED:string = 'PreloaderController-assetLoaded';
	public static EVENT_LOAD_COMPLETE:string = 'PreloaderController-loadComplete';

	public static $inject = [
		'$scope' ,
		'$timeout' ,
		'ScreenManager' ,
		'EventService'
	];

	private _loadPercent:number = 0;
	public get loadPercent():number
	{
		return this._loadPercent;
	}

	private _loadedCount:number = 0;
	public get loadedCount():number
	{
		return this._loadedCount;
	}

	public get assetCount():number
	{
		return this.imageURLs.length;
	}


	protected percentInterval:number;
	protected increment:number;

	protected imageURLs:string[] = [];

	protected jqProgressPercent:JQuery;
	protected jqProgressBar:JQuery;
	protected jqLoader:JQuery;

	constructor(
		public $scope:any = null ,
		public $timeout:any = null ,
		public screenManager:IScreenManager = null ,
	    public eventService:EventService = null
	)
	{
		super( $scope , $timeout , screenManager );
	}

	public init( pID:string ):void
	{
		super.init( pID );

		this.$timeout( ()=>this.start() , 200 );
	}

	protected start():void
	{
		this.parseAssets();
		this.loadAssets();

		$('body').show();
		$('#preloader').find('.loaderContainer').fadeIn( 300 );
	}

	protected parseAssets():void
	{
		this.imageURLs = [];

		let lImages:any = $('img');
		var i:number = lImages.length;
		while( i-- )
		{
			this.imageURLs.push( lImages[i].src );
		}
	}

	public loadAssets():void
	{
		// console.log( 'startPreload() >> ' , $('img') );

		this.jqProgressPercent = this.jq.find('.progress-percent');
		this.jqProgressBar = this.jq.find('.progress-bar');
		this.jqLoader = this.jq.find('.loader');

		this._loadPercent = 0;
		this._loadedCount = 0;

		var i:number = this.assetCount;
		while( i-- )
		{
			$('<img>').attr("src", this.imageURLs[i] ).load( (event)=>this.image_loadHandler(event));
		}
	}

	protected image_loadHandler( pEvent:any ):void
	{
		this._loadedCount++;

		this._loadPercent = this.loadedCount / this.assetCount;

		this.$scope.$digest();

		this.eventService.trigger( PreloaderController.EVENT_ASSET_LOADED );

		if ( this.loadedCount == this.assetCount )
		{
			this.eventService.trigger( PreloaderController.EVENT_LOAD_COMPLETE );
			$('#preloader').fadeOut( 300 , ()=>this.fadeOut_completeHandler() );
		}


		// console.log( '[PreloaderController] image_loadHandler()' , pEvent );

		// this.jqProgressBar.animate({
		// 	width: "+=" + this.increment + "%"
		// }, 100);
	}

	protected fadeOut_completeHandler():void
	{

	}

}
