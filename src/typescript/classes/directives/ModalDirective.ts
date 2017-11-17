class ModalDirective // implements ng.IDirective
{
	public static TEMPLATE_URL:string = 'assets/partials/modal.html';

	public restrict:string = 'E';
	public replace:boolean = true;
	public transclude:any = {
		'hotspots': '?hotspots' ,
		'states': '?states' ,
		'navbar': '?navbar'
	};
	public scope:any = {
		pkName: '@pkName'
	};
	public bindToDirective:boolean = true;
	public controller:string = '@';
	public name:string = 'pkController';
	public controllerAs:string = 'vc';

	public templateUrl:any = ( element:ng.IAugmentedJQuery , attrs:any ) =>
	{
		return attrs.templateUrl || ModalDirective.TEMPLATE_URL;
	};

	public link:any/*ng.IDirectiveLinkFn*/ = (
		scope:any , element:ng.IAugmentedJQuery , attrs:ng.IAttributes , ctrl:any ) =>
	{
		ctrl.init( scope.pkName );
	};

	constructor()
	{
	}

	public static factory():any //:ng.IDirectiveFactory
	{
		const directive = () => new ModalDirective();
		directive.$inject = [];
		return directive;
	}
}