"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorTypes = exports.Version = exports.I128MAX = exports.TokenMetadata = exports.FixedMath = void 0;
const buffer_1 = require("buffer");
__exportStar(require("./backstop/index.js"), exports);
__exportStar(require("./emitter/index.js"), exports);
__exportStar(require("./pool/index.js"), exports);
__exportStar(require("./pool_factory/index.js"), exports);
__exportStar(require("./base_event.js"), exports);
__exportStar(require("./emissions.js"), exports);
exports.FixedMath = require("./math.js");
__exportStar(require("./oracle.js"), exports);
__exportStar(require("./response_parser.js"), exports);
var token_js_1 = require("./token.js");
Object.defineProperty(exports, "TokenMetadata", { enumerable: true, get: function () { return token_js_1.TokenMetadata; } });
exports.I128MAX = BigInt('170141183460469231731687303715884105727');
var Version;
(function (Version) {
    Version["V1"] = "V1";
    Version["V2"] = "V2";
})(Version || (exports.Version = Version = {}));
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["LedgerEntryParseError"] = "LedgerEntryParseError";
})(ErrorTypes || (exports.ErrorTypes = ErrorTypes = {}));
if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Buffer exists
    window.Buffer = window.Buffer || buffer_1.Buffer;
}
