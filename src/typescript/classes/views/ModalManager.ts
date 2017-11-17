class ModalManager implements IModalManager
{
	public static TRANSITION_SLIDE_RIGHT:string = 'transition-slideRight';
	public static TRANSITION_SLIDE_LEFT:string = 'transition-slideLeft';
	public static TRANSITION_FADE:string = 'transition-fade';

	public static $inject = [];

	protected modals:Dictionary<string,ModalController>;

	public currentModalID:string;
	protected currentModal:ModalController;

	protected nextModalID:string;
	protected nextModal:ModalController;

	constructor()
	{
		this.modals = new Dictionary<string,ModalController>();
	}

	public addModal( pID:string , pModal:ModalController ):void
	{
		this.modals.add( pID , pModal );

		// console.log( '[ModalManager] addModal() >> id: ' + pID + ', modal: ' , pModal );
	}

	public removeModal( pID:string ):void
	{
		this.modals.remove( pID );
	}

	// public goto( pModalID: string , pTransition:string = ModalManager.TRANSITION_SLIDE_LEFT ): void
	public show( pModalID:string ):void
	{
		console.log( '[ModalManager] show() >> id: ' + pModalID );

		if ( this.currentModal )
			this.currentModal.hide();

		this.currentModal = this.modals.getValue( pModalID );
		this.currentModal.show();
	}

	public hide(  ):void
	{
		if ( this.currentModal )
			this.currentModal.hide();

		this.currentModal = null;
	}

	private _modal_hideComplete():void
	{
		if ( this.currentModal )
			this.currentModal.unbind( ModalController.EVENT_HIDE_COMPLETE , () => this._modal_hideComplete() );

		// Add current modals to back stack
		this.currentModalID = this.nextModalID;
		this.currentModal = this.nextModal;

		// console.log( '[ModalManager] _modal_hideComplete() >> currentModalID: ' + this.currentModalID );
		// this.update();

		// Show next modals
		// if ( this.currentModal )
		// 	this.currentModal.show();
	}
}