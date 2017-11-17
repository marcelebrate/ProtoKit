class ViewManager
{
	public static $inject = [
		'EventService'
	];

	protected viewDict:Dictionary<string,BaseViewController>;

	public currentViewID:string;
	protected currentView:BaseViewController;

	protected nextViewID:string;
	protected nextView:BaseViewController;

	public backStack:BackStackInstance[] = [];

	constructor()
	{
		this.viewDict = new Dictionary<string,BaseViewController>();
		// console.log( '[ViewManager] constructor()' );
	}

	public registerView( pID:string , pView:BaseViewController ):void
	{
		this.viewDict.add( pID , pView );

		// console.log( '[ViewManager] registerView() >> id: ' + pID + ', view: ' , pView );
	}

	public deregisterView( pID:string ):void
	{
		this.viewDict.remove( pID );
	}

	public back():void
	{
		var lLastView:BackStackInstance = this.backStack.pop();
		this.change( lLastView.viewID , false );
	}

	public change( pViewID:string , pPushToBackStack:boolean = true ):void
	{
		// console.log( '[ViewManager] goto() >> views ID: ' + pViewID + ' // currentViewID: ' + this.currentViewID );

		this.nextViewID = pViewID;
		this.nextView = this.viewDict.getValue( this.nextViewID );

		if ( !this.currentViewID )
		{
			this._view_hideComplete();
			return;
		}

		if ( pPushToBackStack )
			this.backStack.push( new BackStackInstance( this.currentViewID ) );

		// Hide current views, listening for hideComplete event to proceed
		// this.currentView.bind( BaseViewController.EVENT_HIDE_COMPLETE , ()=>this._view_hideComplete() );
		this.currentView.hide();
		this.nextView.show();
	}

	private _view_hideComplete():void
	{
		if ( this.currentView )
			this.currentView.unbind( BaseViewController.EVENT_HIDE_COMPLETE , () => this._view_hideComplete() );

		// Add current views to back stack
		this.currentViewID = this.nextViewID;
		this.currentView = this.nextView;

		console.log( '[ViewManager] _view_hideComplete() >> currentViewID: ' + this.currentViewID );
		// this.update();

		// Show next views
		if ( this.currentView )
			this.currentView.show();
	}
}

class BackStackInstance
{
	public viewID:string;
	public data:any;

	constructor( pViewID:string , pData:any = null )
	{
		this.viewID = pViewID;
		this.data = pData;
	}

	public toString():string
	{
		return 'View ID: "' + this.viewID + '" // data: "' + this.data + '"';
	}
}