class TouchCursorDirective //implements ng.IDirective
{
	public restrict:string = 'E';
	public replace:boolean = true;
	public transclude:any = {
	};
	public scope:any = {
	};
	public bindToDirective:boolean = true;
	public controllerAs:string = 'cursor';
	public template:string = '<div class="pk-touch-cursor" ng-show="vc.showing"></div>';

	public enabled:boolean = false;

	public showing:boolean = false;

	private $element:any;

	constructor(
		private $window:any
	)
	{
		angular.element( $window ).bind( 'touchstart mousedown pointerdown' , (event)=>this.window_touchstartHandler(event) );
		angular.element( $window ).bind( 'touchend mouseup pointerup' , (event)=>this.window_touchendHandler(event) )
	}

	public link:any/*ng.IDirectiveLinkFn*/ = ( $scope:any , $element:ng.IAugmentedJQuery , $attrs:ng.IAttributes , $ctrl:any ) =>
	{
		$scope.vc = this;
		this.$element = $element;
	};

	protected window_touchstartHandler( pEvent:any ):void
	{
		if ( pEvent.touches )
			console.log( 'TOUCH start' , pEvent );
		else
			console.log( 'MOUSE down' , pEvent );

		angular.element( this.$window ).bind( 'touchmove mousemove pointermove' , (event)=>this.window_touchmoveHandler(event) );

		this.showing = true;
	}

	protected window_touchmoveHandler( pEvent:any ):void
	{
		this.$element.offset({ left:pEvent.clientX , top:pEvent.clientY });

		if ( pEvent.touches )
			console.log( 'TOUCH move' , pEvent );
		else
			console.log( 'MOUSE move' , pEvent );
	}

	protected window_touchendHandler( pEvent:any ):void
	{
		if ( pEvent.touches )
			console.log( 'TOUCH end' , pEvent );
		else
			console.log( 'MOUSE up' , pEvent );

		angular.element( this.$window ).unbind( 'touchmove mousemove pointermove' );

		this.showing = false;
	}

	public static factory():any //:ng.IDirectiveFactory
	{
		var directive = ($window) => new TouchCursorDirective($window);
		directive.$inject = ['$window'];
		return directive;
	}
}