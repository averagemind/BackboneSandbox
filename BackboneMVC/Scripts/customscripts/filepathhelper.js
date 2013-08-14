var fullFilePathToFileParentPath = function (fullFilePath) {

    var fileParentPath = "";
    if (fullFilePath) {

        fileParentPath = fullFilePath.substring(0, fullFilePath.lastIndexOf("/") + 1);
    }
    else {

        fileParentPath = null;
    }

    return fileParentPath;
};

var exceptionToFullFilePath = function (e) {

    var fullFilePath = "";

    if (e.fileName) {

        // firefox
        fullFilePath = e.fileName;
    }
    else if (e.stacktrace) {

        // opera
        var tempStackTrace = e.stacktrace;
        tempStackTrace = tempStackTrace.substr(tempStackTrace.indexOf("http"));
        tempStackTrace = tempStackTrace.substr(0, tempStackTrace.indexOf("Dummy Exception"));
        tempStackTrace = tempStackTrace.substr(0, tempStackTrace.lastIndexOf(":"));
        fullFilePath = tempStackTrace;
    }
    else if (e.stack) {

        // firefox, opera, chrome
        (function () {

            var str = e.stack;
            var tempStr = str;

            var strProtocolSeparator = "://";
            var idxProtocolSeparator = tempStr.indexOf(strProtocolSeparator) + strProtocolSeparator.length;

            var tempStr = tempStr.substr(idxProtocolSeparator);
            if (tempStr.charAt(0) == "/") {
                tempStr = tempStr.substr(1);
                idxProtocolSeparator++;
            }

            var idxHostSeparator = tempStr.indexOf("/");
            tempStr = tempStr.substr(tempStr.indexOf("/"));

            var idxFileNameEndSeparator = tempStr.indexOf(":");
            var finalStr = (str.substr(0, idxProtocolSeparator + idxHostSeparator + idxFileNameEndSeparator));
            finalStr = finalStr.substr(finalStr.indexOf("http"));
            fullFilePath = finalStr;
        }());
    }
    else {

        // internet explorer
        fullFilePath = null;
    }

    return fullFilePath;
};

var exceptionToFileParentPath = function (e) {

    return fullFilePathToFileParentPath(exceptionToFullFilePath(e));
};

var getjspath = function () {

    try {

        throw new Error("dummy exception");
    }
    catch (e) {

        return exceptionToFileParentPath(e);
    }
};