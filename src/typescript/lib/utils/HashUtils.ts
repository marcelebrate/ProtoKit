class HashUtils
{
	public static clearAllParams():any
	{
		window.location.hash = '';
	}

	public static getAllParams():any
	{
		let lHash:string = window.location.hash;

		let lReturnParams:any = {};
		let lParams:any[] = [];

		// Only parse string after '?' to still allow for using anchors
		let lHashParams:string = lHash.substr( lHash.indexOf('#')+1 );

		// Split params
		if ( lHashParams.indexOf('&') >= 0 )
			lParams = lHashParams.split( '&' );
		else
			lParams.push( lHashParams );

		// Split values
		for( var i in lParams )
		{
			let lValue = lParams[i].split('=');
			lReturnParams[ lValue[0] ] = lValue[1];
		}

		return lReturnParams;
	}

	public static setParam( pHash:string , pValue:string ):void
	{
		if ( !pHash || pHash.length <= 0 )
			return;

		var lParams = this.getAllParams();
		if ( pValue )
			lParams[pHash] = pValue;
		else
			delete lParams[pHash];

		window.location.hash = this._buildHashString( lParams );
	}

	public static updateParams( pParams:any ):void
	{
		window.location.hash = this._buildHashString( pParams );
	}

	public static getParam( pVariable:string ):string
	{
		var lParams = this.getAllParams();
		return lParams[ pVariable ];
	}

	private static _buildHashString( pValues:any ):string
	{
		var lString = '';
		for ( var key in pValues )
		{
			if ( key.length <= 0 )
				continue;

			lString += '&' + key + '=' + pValues[key];
		}
		// Remove first '&'
		lString = lString.substr( 1 );

		return lString;
	}
}