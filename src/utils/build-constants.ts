declare const LFMPLAYR_VERSION: string;

const VERSION =
    typeof LFMPLAYR_VERSION !== "undefined"
        ? LFMPLAYR_VERSION
        : "dev";

export const BUILD_CONSTS = {
    VERSION
}

console.log("Build Constants", BUILD_CONSTS)