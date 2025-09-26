let devMode = "false";

export function _checkDevMode() {
    if (devMode === "true") {
        devMode = "true";
        return devMode;
    } else {
        devMode = "false";
        return devMode;
    }
}