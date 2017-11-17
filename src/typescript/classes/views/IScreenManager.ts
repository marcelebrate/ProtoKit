interface IScreenManager
{
	readonly backStack:string[];
	currentFlow:string;
	startScreenName:string;
	addScreen( pName:string , pScreen:ScreenController ):void
	removeScreen( pName:string ):void;
	changeScreenState(pScreenName:string,pStateName:string):void;
	back():void;
	goto( pScreenName:string , pScreenState?:string , pBack?:boolean , pAddToBackStack?:Boolean ):void
	restart( pScreenName:string ):void
}