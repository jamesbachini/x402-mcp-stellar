import { Buffer } from 'buffer';
export * from './backstop/index.js';
export * from './emitter/index.js';
export * from './pool/index.js';
export * from './pool_factory/index.js';
export * from './base_event.js';
export * from './emissions.js';
export * as FixedMath from './math.js';
export * from './oracle.js';
export * from './response_parser.js';
export { TokenMetadata } from './token.js';
export const I128MAX = BigInt('170141183460469231731687303715884105727');
export var Version;
(function (Version) {
    Version["V1"] = "V1";
    Version["V2"] = "V2";
})(Version || (Version = {}));
export var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["LedgerEntryParseError"] = "LedgerEntryParseError";
})(ErrorTypes || (ErrorTypes = {}));
if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
