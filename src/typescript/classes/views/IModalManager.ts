interface IModalManager
{
	addModal( pID:string , pModal:ModalController ):void
	removeModal( pID:string ):void;
	show( pScreenID:string ):void
	hide():void
}