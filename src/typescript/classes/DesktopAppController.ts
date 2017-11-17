class DesktopAppController extends AppController
{
	public static $inject = [
		'$scope' ,
		'$timeout' ,
		'$window' ,
		'EventService' ,
		'ScreenManager' ,
		'ModalManager'
	];

	constructor(
		public $scope:any ,
		public $timeout:any ,
		public $window:any ,
		public eventService:EventService ,
		public screenManager:IScreenManager ,
		public modalManager:IModalManager )
	{
		super( $scope , $timeout , $window , eventService , screenManager , modalManager );
	}

	protected setScreenDimensions():void
	{
		// Set widths/heights
		$('#app-wrapper').css({ width:OPTIONS.screenWidth+'px' });
		$('.modal .scrollWrapper').css({ width:OPTIONS.screenWidth+'px' });
	}
}