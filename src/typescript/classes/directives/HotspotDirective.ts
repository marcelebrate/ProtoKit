class HotspotDirective /*implements ng.IDirective*/
{
	public restrict:string = 'E';
	public replace:boolean = true;
	public scope:any = {
		left: '@' ,
		right: '@' ,
		top: '@' ,
		bottom: '@' ,
		width: '@' ,
		height: '@' ,
		position: '@' ,
		action: '&'
	};

	public template:string = '<div class="hotspot"></div>';

	public link:any/*ng.IDirectiveLinkFn*/ = (
		scope:any , element:ng.IAugmentedJQuery , attrs:ng.IAttributes , ctrl:any ) =>
	{
		element.unbind('click');
		element.bind( 'click' , scope.action );

		element.css({
			left: scope.left ,
			right: scope.right ,
			top: scope.top ,
			bottom: scope.bottom ,
			height: scope.height ,
			width: scope.width ,
			position: scope.position
		});
	};

	constructor()
	{
	}

	public static factory():any //:ng.IDirectiveFactory
	{
		const directive = () => new HotspotDirective();
		directive.$inject = [];
		return directive;
	}
}