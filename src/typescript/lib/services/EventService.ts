/**
 * A basic event service for binding to and handling events. This
 * solution will not scale well, but can serve simple use cases.
 */
class EventService
{
	private _listeners:any;

	constructor()
	{
		this._listeners = [];
	}

	public bind( pEvent:string , pHandler:Function ):void
	{
		this._listeners[ pEvent ] = this._listeners[ pEvent ] || [];
		this._listeners[ pEvent ].push( pHandler );
	}

	public unbind( pEvent:string , pHandler:Function ):void
	{
		if ( pEvent in this._listeners === false ) return;
		this._listeners[ pEvent ].splice( this._listeners[ pEvent ].indexOf( pHandler ) , 1 );
	}

	public unbindEvent( pEvent:string ):void
	{
		this._listeners[ pEvent ] = [];
	}

	public unbindAll():void
	{
		for ( var iEvent in this._listeners )
			this._listeners[ iEvent ] = false;
	}

	public trigger( pEvent , ...pArguments:any[] ):void
	{
		if ( pEvent in this._listeners === false ) return;
		for ( var i = 0 ; i < this._listeners[ pEvent ].length ; i++ )
		{
			this._listeners[ pEvent ][ i ].apply( this , Array.prototype.slice.call( arguments , 1 ) )
		}
	}

	public registerEvent( pEvent ):void
	{
		this[ pEvent ] = function ( pCallback , pReplace )
		{

			if ( typeof pCallback == 'function' )
			{
				if ( pReplace ) this.unbindEvent( pEvent );

				this.bind( pEvent , pCallback );
			}

			return this;
		}
	}
}