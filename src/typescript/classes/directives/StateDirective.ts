class StateDirective //implements ng.IDirective
{
	public restrict:string = 'E';
	public replace:boolean = true;
	public transclude:any = {
		'hotspots': '?hotspots'
	}

	public scope:any = {
		imageURL: '@pkImageUrl' ,
		showStates: '@pkShowStates' ,
		offsetX: '@offsetX' ,
		offsetY: '@offsetY' ,
		height: '@height' ,
		width: '@width' ,
		cropBottom: '@cropBottom' ,
		cropTop: '@cropTop' ,
		cropLeft: '@cropLeft' ,
		cropRight: '@cropRight' ,
	};
	public bindToDirective:boolean = true;

	public template:string = '<div class="state imageContainer screenshot" ng-show="showStates.indexOf(screen.currentState) != -1 || showStates.length == 0"><div class="hotspotsContainer" ng-transclude="hotspots"></div><ng-transclude /><img ng-src="{{ imageURL }}" /></div>';

	constructor(private $timeout:any)
	{
	}

	public compile:any = ( element:ng.IAugmentedJQuery , attrs:any ) =>
	{
		// attrs.pkShowStates = attrs.pkShowStates || '*';
		// console.log( '[StateDirective] compile() >> attrs.pkShowStates: ' , attrs.pkShowStates );

		return {
			pre: this.link ,
			post: null
		}
	};

	public link:any/*ng.IDirectiveLinkFn*/ = ( scope:any , element:ng.IAugmentedJQuery , attrs:any , ctrl:any ) =>
	{
		// HACK: This is a hacked way of storing a reference to the screen controller
		scope.screen = scope.$parent.$parent.vc;
		if ( attrs.pkShowStates )
			scope.showStates = attrs.pkShowStates.split(',');
		else
			scope.showStates = [];

		if ( !scope.imageURL )
			scope.imageURL = 'assets/images/blank.png';

		element.css({
			'background-image': 'url('+scope.imageURL+')' ,
			'background-position-x': scope.offsetX ,
			'background-position-y': scope.offsetY ,
			'margin-top': '-' + scope.cropTop ,
			'margin-bottom': '-' + scope.cropBottom ,
			'margin-left': '-' + scope.cropLeft ,
			'margin-right': '-' + scope.cropRight ,
			height: scope.height ,
			width: scope.width
		});
	};

	public static factory():any //:ng.IDirectiveFactory
	{
		const directive = ($timeout) => new StateDirective($timeout);
		directive.$inject = ['$timeout'];
		return directive;
	}
}