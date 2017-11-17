class MobileScreenController extends ScreenController
{
	public static $inject = [
		'$scope' ,
		'ScreenManager'
	];

	public static TWEEN_DURATION:number = .5;

	protected draggable:any;

	constructor(
		public $scope:any = null ,
		public screenManager:IScreenManager = null )
	{
		super( $scope , screenManager );
	}

	public show( pBack:boolean = false ):void
	{
		super.show( pBack );

		if ( !this.draggable )
		{
			this.draggable = Draggable.create( this.jqSelector + ' .scrollWrapper' ,
				{
					type: 'scrollTop' ,
					edgeResistance: .8 ,
					throwProps: true ,
					onClick: function ( event )
					{
						// event.preventDefault();
						event.stopImmediatePropagation();
						return false;
					}
				}
			)[ 0 ];
		}
	}

	public reset():void
	{
		super.reset();

		// if ( this.draggable )
		// 	this.draggable.scrollProxy.scrollTop(0);
	}
}