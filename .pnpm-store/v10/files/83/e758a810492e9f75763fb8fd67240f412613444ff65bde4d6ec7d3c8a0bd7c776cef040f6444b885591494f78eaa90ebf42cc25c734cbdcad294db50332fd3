"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divCeil = exports.divFloor = exports.mulCeil = exports.mulFloor = exports.toFloat = exports.toFixed = exports.SCALAR_12 = exports.SCALAR_9 = exports.SCALAR_7 = void 0;
exports.SCALAR_7 = BigInt(10000000);
exports.SCALAR_9 = BigInt(1000000000);
exports.SCALAR_12 = BigInt(1000000000000);
function toFixed(x, decimals = 7) {
    return BigInt(Math.floor(x * 10 ** decimals));
}
exports.toFixed = toFixed;
function toFloat(x, decimals = 7) {
    return Number(x) / 10 ** decimals;
}
exports.toFloat = toFloat;
function mulFloor(x, y, denominator) {
    return mulDivFloor(x, y, denominator);
}
exports.mulFloor = mulFloor;
function mulCeil(x, y, denominator) {
    return mulDivCeil(x, y, denominator);
}
exports.mulCeil = mulCeil;
function divFloor(x, y, denominator) {
    return mulDivFloor(x, denominator, y);
}
exports.divFloor = divFloor;
function divCeil(x, y, denominator) {
    return mulDivCeil(x, denominator, y);
}
exports.divCeil = divCeil;
// Performs floor(x * y / z)
function mulDivFloor(x, y, z) {
    const r = x * y;
    return r / z;
}
// Performs ceil(x * y / z)
function mulDivCeil(x, y, z) {
    const r = x * y;
    const remainder = r % z;
    return r / z + (remainder > 0n ? 1n : 0n);
}
