interface IPKViewController extends IEventDispatcher
{
	// get jq():JQuery;
	init( pID:string ):void;
	reset():void;
	resume():void;
	pause():void;
	changeState( pState:string ):void;
	show( pBack:boolean ):void;
	hide( pBack:boolean ):void;
}