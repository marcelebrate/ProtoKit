class TouchCursor
{
	public static $inject = [
		'$scope' ,
		'$window'
	];

	public enabled:boolean = false;

	public showing:boolean = false;

	constructor(
		private $scope:any ,
		private $window:any ,
	)
	{
		angular.element( $window ).bind( 'touchstart mousedown' , (event)=>this.window_touchstartHandler(event) );
		angular.element( $window ).bind( 'touchend mouseup' , (event)=>this.window_touchendHandler(event) )
	}

	protected window_touchstartHandler( pEvent:any ):void
	{
		console.log( 'window_touchstartHandler()' , pEvent );

		this.showing = true;
	}

	protected window_touchendHandler( pEvent:any ):void
	{
		console.log( 'window_touchendHandler()' , pEvent );

		this.showing = false;
	}
}