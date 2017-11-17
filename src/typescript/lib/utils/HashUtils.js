var URLUtils = (function () {
    function URLUtils() {
    }
    URLUtils.clearAllHashParams = function () {
        window.location.hash = '';
    };
    URLUtils.getAllHashParams = function () {
        var lHash = window.location.hash;
        // No hash params
        if (lHash.indexOf('?') < 0)
            return null;
        var lReturnParams = {};
        var lParams = [];
        // Only parse string after '?' to still allow for using anchors
        var lHashParams = lHash.substr(lHash.indexOf('?'));
        // Split params
        if (lHashParams.indexOf('&') >= 0)
            lParams = lHashParams.split('&');
        else
            lParams.push(lHashParams);
        // Split values
        for (var i in lParams) {
            var lValue = lParams[i].split('=');
            lReturnParams[lValue[0]] = lValue[1];
        }
        return lReturnParams;
    };
    URLUtils.setHashParam = function (pHash, pValue) {
    };
    URLUtils.getHashParam = function (pHash) {
        return '';
    };
    return URLUtils;
}());
