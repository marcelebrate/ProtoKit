class NavbarDirective //implements ng.IDirective
{
	public restrict:string = 'E';
	public replace:boolean = true;
	public transclude:any = {
		'hotspots': '?hotspots' ,
		'states': '?states'
	};

	public scope:any = {
		screenName: '@pkScreenName' ,
		scrollClasses: '@pkScrollClasses' ,
		height: '@pkHeight'
	};
	public bindToDirective:boolean = true;

	public template:string = '<div class="navbar"><div class="stateContainer" ng-transclude="states"></div><div class="hotspotsContainer" ng-transclude="hotspots"></div></div>';

	constructor( private $timeout:any )
	{
	}

	public link:any/*ng.IDirectiveLinkFn*/ = ( $scope:any , $element:ng.IAugmentedJQuery , $attrs:ng.IAttributes , $ctrl:any ) =>
	{
		// HACK: Fix setTimeout hack
		this.$timeout( ()=>this.init($scope,$element,$attrs,$ctrl) , 50 );

		$element.css({
			height: $scope.height
		});
	};

	public init( $scope:any , $element:any , $attrs:any , $ctrl:any ):void
	{
		$('#pk-screen-'+$scope.screenName+' .scrollWrapper').bind('scroll', function() {
			if (this.scrollTop >= 2)
				$element.addClass('float ' + $scope.scrollClasses);
			else
				$element.removeClass('float ' + $scope.scrollClasses);
		});

		var lNavbar:JQuery = $('#pk-screen-'+$scope.screenName).find('.navbar');
		var lOverlay:JQuery = $('#pk-screen-'+$scope.screenName).find('.navbar-overlay');

		// Add white overlay on top of screen
		lOverlay.show();
		lOverlay.height( lNavbar.height() );
	}

	public static factory():any //:ng.IDirectiveFactory
	{
		var directive = ($timeout) => new NavbarDirective($timeout);
		directive.$inject = ['$timeout'];
		return directive;
	}
}