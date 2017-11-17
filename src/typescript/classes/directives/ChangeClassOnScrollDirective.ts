class ChangeClassOnScrollDirective /*implements ng.IDirective*/
{
	public restrict:string = 'A';
	public replace:boolean = true;
	public scope:any = {
		scrollSelector: "@" ,
		scrollOffset: "@",
		scrollClass: "@"
	};
	public link:any/*ng.IDirectiveLinkFn*/ = (
		scope:any , element:ng.IAugmentedJQuery , attrs:ng.IAttributes , ctrl:any ) =>
	{
		// HACK: Fix setTimeout hack
		this.$timeout( ()=>$(scope.scrollSelector).bind('scroll', function() {
			if (this.scrollTop >= parseInt(scope.scrollOffset))
				element.addClass(scope.scrollClass);
			else
				element.removeClass(scope.scrollClass);
		}) , 50 );
	};

	constructor( private $timeout:any )
	{
	}

	public static factory():any //:ng.IDirectiveFactorya
	{
		const directive = ($timeout) => new ChangeClassOnScrollDirective($timeout);
		directive.$inject = ['$timeout'];
		return directive;
	}
}