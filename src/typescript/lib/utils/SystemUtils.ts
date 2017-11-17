class SystemUtils
{
	public static OS_IOS:string = 'iOS';
	public static OS_ANDROID:string = 'Android';
	public static OS_MAC:string = 'Mac';
	public static OS_WINDOWS:string = 'Windows';
	public static OS_WINDOWS_PHONE:string = 'WindowsPhone';
	public static OS_LINUX:string = 'Linux';
	public static OS_UNKNOWN:string = 'unknown';

	public static getOS():string
	{
		var userAgent = navigator.userAgent || navigator.vendor || window[ 'opera' ];

		// Windows Phone must come first because its UA also contains "Android"
		if ( /windows phone/i.test( userAgent ) )
			return SystemUtils.OS_WINDOWS_PHONE;
		else if ( /android/i.test( userAgent ) )
			return SystemUtils.OS_ANDROID;
		else if ( /macintosh/i.test( userAgent ) )
			return SystemUtils.OS_MAC;
		else if ( /windows/i.test( userAgent ) )
			return SystemUtils.OS_WINDOWS;
		else if ( /linux/i.test( userAgent ) )
			return SystemUtils.OS_LINUX;
		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		else if ( /iPad|iPhone|iPod/.test( userAgent ) && !window[ 'MSStream' ] )
			return SystemUtils.OS_IOS;

		return SystemUtils.OS_UNKNOWN;
	}
}